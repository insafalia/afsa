// Synthesises a soft, royalty-free ambient loop (no vocals) into /public/music/nikkah.wav.
// Replace the file with any track you prefer; keep the same name or update wedding.ts.
import { mkdirSync, writeFileSync } from "node:fs";

const RATE = 22050;
const SECONDS = 48;
const N = RATE * SECONDS;
const buf = new Float32Array(N);

const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
// Gentle progression around D (Dm - Bb - Gm - A), 12s each.
const chords = [
  [50, 57, 62, 65],
  [46, 53, 58, 62],
  [43, 50, 55, 58],
  [45, 52, 57, 61],
];
const bar = SECONDS / chords.length;

chords.forEach((notes, ci) => {
  const start = ci * bar;
  notes.forEach((m) => {
    const f = hz(m);
    for (let i = Math.floor(start * RATE); i < Math.min(N, Math.floor((start + bar + 2) * RATE)); i++) {
      const t = i / RATE - start;
      const env = Math.min(1, t / 2.5) * Math.min(1, Math.max(0, (bar + 2 - t) / 3));
      const s = Math.sin(2 * Math.PI * f * t) + 0.5 * Math.sin(2 * Math.PI * f * 1.003 * t) + 0.15 * Math.sin(4 * Math.PI * f * t);
      buf[i] += 0.035 * env * s;
    }
  });
});

// Soft bell melody in D Hijaz (D Eb F# G A Bb C).
const scale = [62, 63, 66, 67, 69, 70, 72, 74];
const phrase = [4, 3, 2, 3, 1, 2, 0, -1, 4, 5, 4, 3, 2, 3, 2, 0];
const step = SECONDS / (phrase.length * 2);
phrase.forEach((deg, k) => {
  if (deg < 0) return;
  const f = hz(scale[deg]);
  const t0 = (k * 2 + 0.5) * step;
  for (let i = Math.floor(t0 * RATE); i < Math.min(N, Math.floor((t0 + 4) * RATE)); i++) {
    const t = i / RATE - t0;
    const env = Math.min(1, t / 0.02) * Math.exp(-t * 1.3);
    buf[i] += 0.11 * env * (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t));
  }
});

// Circular feedback delay so the tail wraps and the loop is seamless.
const out = new Float32Array(N);
const d1 = Math.floor(0.42 * RATE), d2 = Math.floor(0.73 * RATE);
for (let pass = 0; pass < 2; pass++) {
  for (let i = 0; i < N; i++) {
    out[i] = buf[i] + 0.32 * out[(i - d1 + N) % N] + 0.2 * out[(i - d2 + N) % N];
  }
}
let peak = 0;
for (const v of out) peak = Math.max(peak, Math.abs(v));
const gain = 0.8 / peak;

const data = Buffer.alloc(N * 2);
for (let i = 0; i < N; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, out[i] * gain)) * 32767), i * 2);
const header = Buffer.alloc(44);
header.write("RIFF", 0); header.writeUInt32LE(36 + data.length, 4); header.write("WAVE", 8);
header.write("fmt ", 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
header.writeUInt32LE(RATE, 24); header.writeUInt32LE(RATE * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
header.write("data", 36); header.writeUInt32LE(data.length, 40);

mkdirSync("public/music", { recursive: true });
writeFileSync("public/music/nikkah.wav", Buffer.concat([header, data]));
console.log("wrote public/music/nikkah.wav");

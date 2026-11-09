"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding as w, weddingDate } from "@/data/wedding";

const BRUSH = 32;
const THRESHOLD = 0.58;
const WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function monthCells(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const lead = (first + 6) % 7;
  const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (number | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= count; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return { highlight: day, cells };
}

function SaveTheDate() {
  const { highlight, cells } = monthCells(w.date);
  return (
    <div
      className="flex h-full flex-col items-center justify-center px-5 py-6 text-center text-[#f6e7d4]"
      style={{
        background:
          "radial-gradient(circle, rgba(232,211,162,.28) 1px, transparent 1.15px) 0 0 / 13px 13px, linear-gradient(180deg, #6b1c28, #4a1018)",
      }}
    >
      <p className="font-script text-[42px] leading-none text-[#f3e2b8]">Save the Date</p>
      <p className="mt-3 text-[13px] font-semibold tracking-[.55em] text-[#f6e7d4]">DECEMBER</p>
      <div className="mt-3 grid w-full max-w-[280px] grid-cols-7 gap-y-1 text-[11px]">
        {WEEK.map((d) => (
          <span key={d} className="text-[9px] tracking-[.12em] text-[#e8d3a2]/80">{d}</span>
        ))}
        {cells.map((day, i) => (
          <span key={i} className="relative grid h-7 place-items-center">
            {day === highlight && (
              <svg viewBox="0 0 24 22" className="absolute h-7 w-7 text-[#e8d3a2]" aria-hidden>
                <path fill="currentColor" d="M12 21 C 5 15, 1 11, 1 7 C 1 3.5, 3.6 1, 7 1 C 9.2 1, 11 2.2, 12 4.2 C 13 2.2, 14.8 1, 17 1 C 20.4 1, 23 3.5, 23 7 C 23 11, 19 15, 12 21Z" />
              </svg>
            )}
            <span className={day === highlight ? "relative text-[11px] font-bold text-[#4a1018]" : "text-[#f6e7d4]"}>
              {day ?? ""}
            </span>
          </span>
        ))}
      </div>
      <p dir="rtl" lang="ar" className="mt-3 font-arabic text-[26px] leading-none">{w.couple.brideArabic} و {w.couple.groomArabic}</p>
      <p className="mt-1 text-[12px] tracking-[.28em]">{weddingDate.day} {weddingDate.month.slice(0, 3).toUpperCase()} {weddingDate.year}</p>
      <p className="mt-1 text-[13px] italic text-[#e8d3a2]">Insha Allah · {w.timingText}</p>
      <p className="mt-3 text-[12px] italic text-[#e8d3a2]/90">{w.sharedBy.label}</p>
      <p className="text-[14px] font-semibold">{w.sharedBy.names}<br />{w.sharedBy.place}</p>
    </div>
  );
}

type Heart = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; spin: number; color: string };
const HEARTS = ["#f7c5c8", "#e8d3a2", "#fff6ea", "#e39aa0", "#c9a45c"];

function drawHeart(x: CanvasRenderingContext2D, s: number) {
  x.beginPath();
  x.moveTo(0, s * 0.3);
  x.bezierCurveTo(-s, -s * 0.25, -s * 0.35, -s * 0.95, 0, -s * 0.4);
  x.bezierCurveTo(s * 0.35, -s * 0.95, s, -s * 0.25, 0, s * 0.3);
  x.fill();
}

export default function ScratchCard() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const hearts = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const done = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const bits = useRef<Heart[]>([]);
  const frame = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  const paint = useCallback(() => {
    const c = canvas.current;
    const box = wrap.current;
    if (!c || !box || done.current) return;
    const { width, height } = box.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    const x = c.getContext("2d");
    if (!x) return;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = x.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#8a6a32");
    g.addColorStop(0.45, "#e8d3a2");
    g.addColorStop(1, "#a7843e");
    x.fillStyle = g;
    x.fillRect(0, 0, width, height);
    x.fillStyle = "rgba(92,20,32,.18)";
    for (let i = 0; i < 70; i++) {
      x.beginPath();
      x.arc((i * 47) % width, (i * 29) % height, 1.2, 0, Math.PI * 2);
      x.fill();
    }
    x.strokeStyle = "rgba(255,248,230,.35)";
    x.lineWidth = 1;
    x.strokeRect(14, 14, width - 28, height - 28);
    x.fillStyle = "#5c1420";
    x.textAlign = "center";
    x.font = "600 13px Georgia, serif";
    x.fillText("A SEALED NOTE", width / 2, height / 2 - 18);
    x.font = "italic 28px Georgia, serif";
    x.fillText(w.scratch.cover, width / 2, height / 2 + 16);
    x.font = "13px Georgia, serif";
    x.fillText(w.scratch.hint, width / 2, height / 2 + 44);
  }, []);

  const tick = useCallback(() => {
    const c = hearts.current;
    const box = wrap.current;
    if (!c || !box) return;
    const { width, height } = box.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== Math.round(width * dpr)) {
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
    }
    const x = c.getContext("2d");
    if (!x) return;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.clearRect(0, 0, width, height);
    bits.current = bits.current.filter((h) => h.life < h.max);
    for (const h of bits.current) {
      h.life++;
      h.vy += 0.04;
      h.vx *= 0.99;
      h.x += h.vx;
      h.y += h.vy;
      const k = 1 - h.life / h.max;
      x.save();
      x.globalAlpha = Math.max(0, k);
      x.fillStyle = h.color;
      x.translate(h.x, h.y);
      x.rotate(h.life * h.spin);
      drawHeart(x, h.size * (0.7 + k * 0.5));
      x.restore();
    }
    frame.current = bits.current.length ? requestAnimationFrame(tick) : 0;
  }, []);

  const spread = (p: { x: number; y: number }, n: number) => {
    if (reduced) return;
    for (let i = 0; i < n && bits.current.length < 90; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 0.8 + Math.random() * 2.4;
      bits.current.push({
        x: p.x, y: p.y,
        vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2,
        life: 0, max: 26 + Math.random() * 18,
        size: 4 + Math.random() * 5,
        spin: (Math.random() - 0.5) * 0.2,
        color: HEARTS[(Math.random() * HEARTS.length) | 0],
      });
    }
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    paint();
    const ro = new ResizeObserver(paint);
    if (wrap.current) ro.observe(wrap.current);
    return () => { ro.disconnect(); cancelAnimationFrame(frame.current); };
  }, [paint]);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setRevealed(true);
    setProgress(1);
  };

  const check = () => {
    const c = canvas.current;
    if (!c || done.current) return;
    const data = c.getContext("2d")?.getImageData(0, 0, c.width, c.height).data;
    if (!data) return;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      total++;
      if (data[i] < 128) clear++;
    }
    const ratio = total ? clear / total : 0;
    setProgress(Math.min(1, ratio / THRESHOLD));
    if (ratio > THRESHOLD) finish();
  };

  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current || done.current || !canvas.current) return;
    const r = canvas.current.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top };
    const x = canvas.current.getContext("2d");
    if (!x) return;
    const l = last.current ?? p;
    x.globalCompositeOperation = "destination-out";
    x.lineWidth = BRUSH;
    x.lineCap = "round";
    x.lineJoin = "round";
    x.beginPath();
    x.moveTo(l.x, l.y);
    x.lineTo(p.x + 0.01, p.y);
    x.stroke();
    last.current = p;
    spread(p, 2);
    if (++moves.current % 6 === 0) check();
  };

  return (
    <section aria-label="Scratch to reveal the save the date" className="relative px-5 py-10">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[.42em] text-muted">{w.scratch.eyebrow}</p>
      <div ref={wrap} className="panel relative mx-auto mt-4 h-[460px] max-w-[360px] overflow-hidden rounded-[28px]">
        <div className={revealed ? "h-full" : "invisible h-full"} aria-hidden={!revealed}>
          <SaveTheDate />
        </div>
        <canvas
          ref={canvas}
          aria-label="Scratch the gold note to reveal the save the date"
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${revealed ? "pointer-events-none opacity-0" : "cursor-crosshair opacity-100"}`}
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            last.current = null;
            scratch(e);
            const r = e.currentTarget.getBoundingClientRect();
            spread({ x: e.clientX - r.left, y: e.clientY - r.top }, 8);
          }}
          onPointerMove={scratch}
          onPointerUp={() => { drawing.current = false; last.current = null; check(); }}
          onPointerCancel={() => { drawing.current = false; last.current = null; }}
        />
        <canvas ref={hearts} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-[16px] leading-none text-[#f7c5c8]"
                  style={{ left: "50%", top: "46%" }}
                  initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                  animate={{
                    x: Math.cos((i / 14) * Math.PI * 2) * (70 + (i % 3) * 24),
                    y: Math.sin((i / 14) * Math.PI * 2) * (70 + (i % 3) * 24),
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                >
                  ♥
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!revealed && (
        <div className="mx-auto mt-4 h-1.5 w-40 overflow-hidden rounded-full bg-white/50" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Scratch progress">
          <div className="h-full rounded-full bg-gold transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
      {reduced && !revealed && (
        <button type="button" className="btn-outline mx-auto mt-4" onClick={finish}>Reveal the date</button>
      )}
    </section>
  );
}

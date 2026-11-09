// Generates /public/images assets from the original printed card.
// Usage: node scripts/build-assets.mjs "<path to card.jpeg>"
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const src = process.argv[2] ?? "C:/Users/SPLPT 1468/Downloads/Afsa marrage Invitation.jpeg";
const out = "public/images";
mkdirSync(`${out}/gallery`, { recursive: true });

const meta = await sharp(src).metadata();
const S = meta.width / 683; // polygons below were traced on a 683px-wide preview

const maskSvg = (w, h, points, ox, oy, blur) => {
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x * S - ox},${y * S - oy}`).join(" ") + " Z";
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><filter id="f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${blur}"/></filter></defs>
      <path d="${d}" fill="#fff" filter="url(#f)"/>
    </svg>`,
  );
};

async function corner(name, box, points) {
  const { left, top, width, height } = box;
  const mask = await sharp(maskSvg(width, height, points, left, top, 12)).png().toBuffer();
  await sharp(src)
    .extract(box)
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(`${out}/${name}.webp`);
  console.log("wrote", name);
}

await corner(
  "roses-top-left",
  { left: 0, top: 0, width: Math.round(600), height: Math.round(560) },
  [[0, 0], [335, 0], [345, 40], [240, 95], [170, 138], [108, 172], [72, 250], [52, 330], [0, 352]],
);

await corner(
  "roses-bottom-right",
  { left: 535, top: 1035, width: meta.width - 535, height: meta.height - 1035 },
  [[683, 690], [683, 1024], [374, 1024], [386, 978], [452, 968], [515, 952], [585, 926], [618, 872], [634, 830], [646, 760], [652, 700]],
);

await sharp(src).jpeg({ quality: 90, mozjpeg: true }).toFile(`${out}/invitation-card.jpg`);
console.log("wrote invitation-card.jpg");

// Open Graph 1200x630: blurred card as backdrop, sharp card centred.
const bg = await sharp(src).resize(1200, 630, { fit: "cover" }).blur(28).modulate({ brightness: 1.05 }).toBuffer();
const fg = await sharp(src).resize({ height: 590 }).toBuffer();
const fgMeta = await sharp(fg).metadata();
await sharp(bg)
  .composite([{ input: fg, left: Math.round((1200 - fgMeta.width) / 2), top: 20 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${out}/og.jpg`);
console.log("wrote og.jpg");

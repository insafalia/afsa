"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = { position: "top-left" | "bottom-right"; className?: string; delay?: number };

const cfg = {
  "top-left": { src: "/images/roses-top-left.webp", w: 600, h: 560, cls: "left-0 top-0 origin-top-left", from: { x: -30, y: -30 } },
  "bottom-right": { src: "/images/roses-bottom-right.webp", w: 489, h: 501, cls: "bottom-0 right-0 origin-bottom-right", from: { x: 30, y: 30 } },
};

export default function RoseCorner({ position, className = "", delay = 0 }: Props) {
  const c = cfg[position];
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute z-20 ${c.cls} ${className}`}
      initial={{ opacity: 0, scale: 0.92, ...c.from }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`sway ${c.cls}`} style={{ ["--deg" as string]: position === "top-left" ? "1.4deg" : "-1.4deg" }}>
        <Image src={c.src} alt="" width={c.w} height={c.h} priority className="h-auto w-full select-none" />
      </div>
    </motion.div>
  );
}

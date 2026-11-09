"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const archPath = (w: number, h: number, inset: number, R: number, r: number) => {
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset;
  const Rt = Math.max(0, R - inset), rb = Math.max(0, r - inset / 2);
  return [
    `M ${x0} ${y1 - rb}`,
    `L ${x0} ${y0 + Rt}`,
    `A ${Rt} ${Rt} 0 0 1 ${x0 + Rt} ${y0}`,
    `L ${x1 - Rt} ${y0}`,
    `A ${Rt} ${Rt} 0 0 1 ${x1} ${y0 + Rt}`,
    `L ${x1} ${y1 - rb}`,
    `A ${rb} ${rb} 0 0 1 ${x1 - rb} ${y1}`,
    `L ${x0 + rb} ${y1}`,
    `A ${rb} ${rb} 0 0 1 ${x0} ${y1 - rb}`,
    "Z",
  ].join(" ");
};

/** Double gold arch border that draws itself in, sized to its parent. */
export default function ArchFrame({ delay = 0.2 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const R = size ? Math.min(size.w * 0.42, 190) : 0;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {size && (
        <svg width={size.w} height={size.h} className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="arch-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b38a46" />
              <stop offset=".35" stopColor="#ecd7a4" />
              <stop offset=".65" stopColor="#c9a45c" />
              <stop offset="1" stopColor="#e8d3a2" />
            </linearGradient>
          </defs>
          <path d={archPath(size.w, size.h, 0.75, R, 18)} fill="rgba(253,246,242,.55)" stroke="none" />
          <motion.path
            d={archPath(size.w, size.h, 0.75, R, 18)}
            fill="none" stroke="url(#arch-gold)" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay, ease: "easeInOut" }}
          />
          <motion.path
            d={archPath(size.w, size.h, 7, R, 18)}
            fill="none" stroke="url(#arch-gold)" strokeWidth=".7" opacity=".7"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, delay: delay + 0.2, ease: "easeInOut" }}
          />
        </svg>
      )}
    </div>
  );
}

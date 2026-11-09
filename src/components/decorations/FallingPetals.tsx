"use client";
import { useEffect, useState } from "react";

type Item = { left: number; size: number; dur: number; delay: number; sway: number; color: string; kind: "petal" | "sparkle"; top?: number };
const COLORS = ["#a3283a", "#c2455a", "#e39aa0", "#f0b8b8", "#8e1f30"];

const Petal = ({ color, size }: { color: string; size: number }) => (
  <svg viewBox="0 0 20 24" width={size} height={size * 1.2}>
    <path d="M10 1 C 18 6, 19 16, 10 23 C 1 16, 2 6, 10 1Z" fill={color} opacity=".85" />
    <path d="M10 3 C 12 9, 12 15, 10 21" stroke="#fff" strokeOpacity=".25" strokeWidth=".8" fill="none" />
  </svg>
);

/** Slowly falling rose petals with twinkling gold dust. Disabled under prefers-reduced-motion (see globals.css). */
export default function FallingPetals({ petals = 12, sparkles = 14, fixed = true }: { petals?: number; sparkles?: number; fixed?: boolean }) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    const r = (a: number, b: number) => a + Math.random() * (b - a);
    setItems([
      ...Array.from({ length: petals }, () => ({
        kind: "petal" as const, left: r(0, 95), size: r(10, 20), dur: r(14, 24), delay: -r(0, 24), sway: r(-60, 60),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })),
      ...Array.from({ length: sparkles }, () => ({
        kind: "sparkle" as const, left: r(2, 98), top: r(2, 98), size: r(3, 7), dur: r(2.5, 5), delay: -r(0, 5), sway: 0, color: "",
      })),
    ]);
  }, [petals, sparkles]);

  return (
    <div aria-hidden className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 z-30 mx-auto max-w-[480px] overflow-hidden`}>
      {items.map((p, i) =>
        p.kind === "petal" ? (
          <span key={i} className="petal" style={{ left: `${p.left}%`, ["--dur" as string]: `${p.dur}s`, ["--delay" as string]: `${p.delay}s`, ["--sway" as string]: `${p.sway}px` }}>
            <Petal color={p.color} size={p.size} />
          </span>
        ) : (
          <span key={i} className="sparkle" style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, ["--dur" as string]: `${p.dur}s`, ["--delay" as string]: `${p.delay}s` }} />
        ),
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { wedding as w, weddingDate } from "@/data/wedding";
import RoseCorner from "@/components/decorations/RoseCorner";
import GoldDivider from "@/components/decorations/GoldDivider";

type Props = { guest: string | null; onStart: () => void; onDone: () => void };

const ease = [0.22, 1, 0.36, 1] as const;

function WaxSeal() {
  return (
    <div className="seal-pulse relative grid h-[68px] w-[68px] place-items-center rounded-full"
      style={{ background: "radial-gradient(circle at 35% 30%, #b4414f, #7a1f2b 55%, #4e101a)" }}>
      <div className="absolute inset-[5px] rounded-full border border-[#e8d3a2]/80" />
      <div className="absolute inset-[9px] rounded-full border border-dashed border-[#e8d3a2]/40" />
      <span className="font-script text-[26px] leading-none text-[#f3e2b8] drop-shadow">
        {w.couple.monogram[0]}<span className="mx-0.5 text-[15px]">&amp;</span>{w.couple.monogram[1]}
      </span>
    </div>
  );
}

export default function EnvelopeOpening({ guest, onStart, onDone }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening">("idle");
  const [flapBehind, setFlapBehind] = useState(false);

  const open = () => {
    if (phase !== "idle") return;
    onStart();
    setPhase("opening");
    setTimeout(() => setFlapBehind(true), 450);
    setTimeout(onDone, 2300);
  };
  const opening = phase === "opening";

  return (
    <motion.section
      key="envelope"
      aria-label="Invitation envelope"
      className="fixed inset-0 z-50 mx-auto flex max-w-[480px] flex-col items-center justify-center overflow-hidden px-6"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.8, ease }}
    >
      <RoseCorner position="top-left" className="w-[62%] max-w-[300px]" />
      <RoseCorner position="bottom-right" className="w-[58%] max-w-[280px]" delay={0.2} />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={opening ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={opening ? { duration: 0.5, ease } : { duration: 1, delay: 0.3, ease }}
      >
        <p dir="rtl" lang="ar" className="font-arabic text-[26px] font-bold leading-[1.6] text-maroon" aria-label={w.card.bismillahLabel}>{w.card.bismillah}</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[.42em] text-muted">{w.envelope.eyebrow}</p>
        <h1 className="mt-2 font-script text-[40px] leading-[1.1] text-maroon">
          {w.couple.bride}
          <span className="block py-0.5 text-[26px] text-gold">&amp;</span>
          {w.couple.groom}
        </h1>
        <p className="mt-2 text-[15px] tracking-[.2em] text-wine">
          {weddingDate.day} · {weddingDate.month.toUpperCase()} · {weddingDate.year}
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={open}
        aria-label={`${w.envelope.cta}: open the invitation`}
        className="relative z-10 mt-8 h-[200px] w-[290px] [perspective:1100px]"
        initial={{ opacity: 0, y: 30 }}
        animate={opening ? { opacity: 1, y: 40 } : { opacity: 1, y: [0, -6, 0] }}
        transition={opening ? { duration: 1.2, ease } : { opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 } }}
      >
        {/* back */}
        <div className="absolute inset-0 rounded-[10px] border border-gold/70 shadow-[0_24px_40px_-18px_rgba(92,20,32,.55)]"
          style={{ background: "linear-gradient(160deg,#f3d5cc,#e9bfb3)" }} />

        {/* card that slides out */}
        <motion.div
          className="absolute inset-x-4 top-3 flex h-[175px] flex-col items-center justify-center rounded-md border border-gold/80 bg-cream px-3 text-center shadow-md"
          style={{ zIndex: 2 }}
          animate={opening ? { y: -150 } : { y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease }}
        >
          <GoldDivider variant="heart" className="w-full" />
          <p className="mt-2 font-script text-[22px] leading-tight text-maroon">
            {w.couple.bride}<span className="block text-[16px] text-gold">&amp;</span>{w.couple.groom}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[.3em] text-muted">Nikkah · Insha Allah</p>
        </motion.div>

        {/* front pocket */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 290 200" preserveAspectRatio="none" style={{ zIndex: 3 }} aria-hidden>
          <defs>
            <linearGradient id="env-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6dcd4" />
              <stop offset="1" stopColor="#efc9be" />
            </linearGradient>
          </defs>
          <path d="M0 10 L145 118 L290 10 L290 190 Q290 200 280 200 L10 200 Q0 200 0 190 Z" fill="url(#env-front)" />
          <path d="M0 10 L145 118 L290 10" fill="none" stroke="#c9a45c" strokeWidth="1" opacity=".8" />
          <path d="M0 200 L120 100 M290 200 L170 100" stroke="#c9a45c" strokeWidth=".6" opacity=".45" />
        </svg>

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[118px] origin-top [transform-style:preserve-3d]"
          style={{ zIndex: flapBehind ? 1 : 4 }}
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg className="h-full w-full" viewBox="0 0 290 118" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f9e5de" />
                <stop offset="1" stopColor="#f0cfc5" />
              </linearGradient>
            </defs>
            <path d="M0 10 Q0 0 10 0 L280 0 Q290 0 290 10 L145 118 Z" fill="url(#env-flap)" stroke="#c9a45c" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* seal */}
        <motion.div
          className="absolute left-1/2 top-[118px] -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 5 }}
          animate={opening ? { scale: 0.4, opacity: 0, rotate: -25 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease }}
        >
          <WaxSeal />
        </motion.div>
      </motion.button>

      <motion.div className="relative z-10 mt-10 text-center" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.4 }}>
        <p className="text-[15px] italic text-muted">
          {w.envelope.greeting}{" "}
          <span className="font-semibold not-italic text-maroon">{guest || w.envelope.defaultGuest}</span>,
        </p>
        <button type="button" onClick={open} className="btn-gold mt-4 uppercase">{w.envelope.cta}</button>
      </motion.div>
    </motion.section>
  );
}

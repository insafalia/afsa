"use client";
import { motion, type Variants } from "framer-motion";
import { wedding as w } from "@/data/wedding";
import ArchFrame from "@/components/decorations/ArchFrame";
import RoseCorner from "@/components/decorations/RoseCorner";
import GoldDivider from "@/components/decorations/GoldDivider";
import DetailsPanel from "./DetailsPanel";

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function InvitationCard() {
  return (
    <section aria-label="Nikkah invitation" className="relative px-3 pb-24 pt-8">
      <RoseCorner position="top-left" className="w-[52%] max-w-[250px]" delay={0.1} />
      <RoseCorner position="bottom-right" className="w-[46%] max-w-[220px]" delay={0.3} />

      <div className="relative mx-auto max-w-[440px]">
        <ArchFrame />
        <motion.div variants={list} initial="hidden" animate="show" className="relative z-10 px-4 pb-8 pt-14 text-center sm:px-6">
          <motion.p variants={item} dir="rtl" lang="ar" className="font-arabic text-[clamp(26px,8vw,34px)] font-bold leading-[1.6] text-maroon" aria-label={w.card.bismillahLabel}>
            {w.card.bismillah}
          </motion.p>
          <motion.p variants={item} className="mt-2 text-[14.5px] italic text-wine/85">{w.card.bismillahMeaning}</motion.p>
          <motion.div variants={item}><GoldDivider variant="heart" className="mt-3" /></motion.div>

          <motion.p variants={item} className="mx-auto mt-3 max-w-[360px] text-[17px] italic leading-snug text-maroon">
            {w.card.invite.join(" ")}
          </motion.p>

          <motion.h1 variants={item} className="mt-4">
            <span className="shimmer block whitespace-nowrap font-script text-[clamp(42px,12.5vw,58px)] leading-[1.2]">{w.couple.bride}</span>
            <span className="sr-only"> and </span>
            <GoldDivider variant="glossy-heart" className="my-1 px-2" />
            <span className="shimmer block whitespace-nowrap font-script text-[clamp(30px,9vw,48px)] leading-[1.2]">{w.couple.groom}</span>
          </motion.h1>

          <motion.div variants={item}><GoldDivider variant="flourish" className="mt-3" /></motion.div>
          <motion.p variants={item} className="mt-3 text-[22px] font-semibold tracking-wide text-wine">{w.card.inshaAllah}</motion.p>

          <motion.div variants={item} className="mt-3"><DetailsPanel /></motion.div>

          <motion.div variants={item} className="mt-6">
            <GoldDivider variant="sprig" />
            <div className="mt-2 flex items-center justify-center gap-3">
              <span aria-hidden className="hidden h-px w-6 bg-gold/70 min-[460px]:block" />
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-wine min-[460px]:tracking-[.2em]">{w.card.footer}</p>
              <span aria-hidden className="hidden h-px w-6 bg-gold/70 min-[460px]:block" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-6 z-30 flex flex-col items-center text-[10px] uppercase tracking-[.35em] text-muted"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
      >
        Scroll
        <motion.span className="mt-1 block h-6 w-px bg-gold" animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}

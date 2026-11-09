"use client";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

export default function MusicControl({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 mx-auto flex max-w-[480px] justify-end px-5">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        className="pointer-events-auto relative grid h-12 w-12 place-items-center rounded-full text-[#f3e2b8] shadow-[0_8px_20px_-6px_rgba(92,20,32,.6)]"
        style={{ background: "radial-gradient(circle at 35% 30%, #a83a49, #7a1f2b 60%, #4e101a)" }}
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      >
        <span aria-hidden className="absolute inset-[3px] rounded-full border border-[#e8d3a2]/70" />
        {playing && <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-gold/60 [animation-duration:2.4s]" />}
        <motion.span animate={playing ? { rotate: 360 } : { rotate: 0 }} transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}>
          {playing ? <Music2 size={19} /> : <VolumeX size={19} />}
        </motion.span>
      </motion.button>
    </div>
  );
}

"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Download } from "lucide-react";
import { eventEnd, eventStart, longDate, wedding as w } from "@/data/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const start = eventStart(), end = eventEnd();

function Tile({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="panel relative h-[74px] w-[66px] overflow-hidden rounded-xl [perspective:400px]">
        <span aria-hidden className="absolute inset-x-0 top-1/2 z-10 h-px bg-gold/40" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            className="absolute inset-0 grid place-items-center text-[34px] font-bold text-maroon"
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10.5px] font-semibold uppercase tracking-[.28em] text-muted">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const c = useCountdown(start, end);
  return (
    <section aria-label="Countdown" className="relative px-6 py-16">
      <Reveal><SectionHeading eyebrow={w.countdown.eyebrow} title={w.countdown.title} /></Reveal>

      <Reveal delay={0.15} className="mt-8">
        {c.state === "future" || c.state === "loading" ? (
          <div className="flex justify-center gap-3" role="timer" aria-live="off">
            <Tile value={c.days} label="Days" />
            <Tile value={c.hours} label="Hours" />
            <Tile value={c.minutes} label="Mins" />
            <Tile value={c.seconds} label="Secs" />
          </div>
        ) : (
          <p className="mx-auto max-w-[340px] text-center font-script text-[32px] leading-snug text-maroon">
            {c.state === "today" ? w.countdown.today : w.countdown.past}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.25} className="mt-7 text-center">
        <p className="text-[17px] font-semibold text-wine">{longDate}</p>
        <p className="text-[14px] italic text-muted">{w.hijri.line1} {w.hijri.line2} · {w.timingText}</p>
      </Reveal>

      {c.state !== "past" && (
        <Reveal delay={0.35} className="mt-6 flex flex-wrap justify-center gap-3">
          <a className="btn-gold" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
            <CalendarPlus size={17} aria-hidden /> Google Calendar
          </a>
          <button type="button" className="btn-outline" onClick={() => downloadIcs()}>
            <Download size={16} aria-hidden /> Apple / Outlook
          </button>
        </Reveal>
      )}
    </section>
  );
}

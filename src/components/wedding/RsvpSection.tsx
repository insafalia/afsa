"use client";
import { useEffect, useState } from "react";
import { Minus, Plus, Send } from "lucide-react";
import { longDate, wedding as w } from "@/data/wedding";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

type Answer = "yes" | "no";

export default function RsvpSection({ guest }: { guest: string | null }) {
  const [name, setName] = useState(guest ?? "");
  const [answer, setAnswer] = useState<Answer>("yes");
  const [count, setCount] = useState(2);
  const [note, setNote] = useState("");
  useEffect(() => { if (guest) setName(guest); }, [guest]);

  const couple = `${w.couple.bride} & ${w.couple.groom}`;
  const message = [
    "Assalamu Alaikum,",
    answer === "yes"
      ? `Insha Allah, ${count === 1 ? "I" : `we (${count} people)`} will attend the Nikkah of ${couple} on ${longDate} at ${w.venue.name}.`
      : `JazakAllah Khair for the invitation. Unfortunately I won't be able to attend the Nikkah of ${couple}, but my duas are with you.`,
    note.trim() && `\n${note.trim()}`,
    `\n— ${name.trim() || "A well-wisher"}`,
  ].filter(Boolean).join("\n");

  const href = `https://wa.me/${w.rsvp.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const choice = (a: Answer, label: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={answer === a}
      onClick={() => setAnswer(a)}
      className={`flex-1 rounded-full px-4 py-2.5 text-[15px] font-semibold transition ${answer === a ? "bg-maroon text-white shadow-md" : "text-maroon hover:bg-white/60"}`}
    >
      {label}
    </button>
  );

  return (
    <section aria-label="RSVP" className="relative px-5 py-16">
      <Reveal><SectionHeading eyebrow={w.rsvp.eyebrow} title={w.rsvp.title} /></Reveal>

      <Reveal delay={0.1} className="panel mx-auto mt-8 max-w-[400px] rounded-[28px] px-5 py-6">
        <label className="block text-[12px] font-semibold uppercase tracking-[.25em] text-muted" htmlFor="rsvp-name">Your name</label>
        <input
          id="rsvp-name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 60))}
          placeholder="Enter your name"
          className="mt-2 w-full rounded-xl border border-gold/60 bg-white/70 px-4 py-3 text-[16px] text-maroon outline-none placeholder:text-muted/60 focus:border-gold focus:bg-white"
        />

        <div role="radiogroup" aria-label="Attendance" className="mt-5 flex gap-1 rounded-full border border-gold/60 bg-white/50 p-1">
          {choice("yes", "Joyfully Attending")}
          {choice("no", "Regretfully Decline")}
        </div>

        {answer === "yes" && (
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-[.25em] text-muted">Guests</span>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Fewer guests" onClick={() => setCount((c) => Math.max(1, c - 1))} className="grid h-9 w-9 place-items-center rounded-full border border-gold/70 text-maroon hover:bg-white/70"><Minus size={16} /></button>
              <span className="w-6 text-center text-[22px] font-bold text-maroon" aria-live="polite">{count}</span>
              <button type="button" aria-label="More guests" onClick={() => setCount((c) => Math.min(20, c + 1))} className="grid h-9 w-9 place-items-center rounded-full border border-gold/70 text-maroon hover:bg-white/70"><Plus size={16} /></button>
            </div>
          </div>
        )}

        <label className="mt-5 block text-[12px] font-semibold uppercase tracking-[.25em] text-muted" htmlFor="rsvp-note">Duas & wishes (optional)</label>
        <textarea
          id="rsvp-note"
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 300))}
          rows={3}
          placeholder="Barakallahu lakuma…"
          className="mt-2 w-full resize-none rounded-xl border border-gold/60 bg-white/70 px-4 py-3 text-[16px] text-maroon outline-none placeholder:text-muted/60 focus:border-gold focus:bg-white"
        />

        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 w-full">
          <Send size={16} aria-hidden /> Send on WhatsApp
        </a>
      </Reveal>
    </section>
  );
}

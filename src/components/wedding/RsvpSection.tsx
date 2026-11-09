"use client";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { wedding as w } from "@/data/wedding";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function RsvpSection({ guest }: { guest: string | null }) {
  const [name, setName] = useState(guest ?? "");
  const [note, setNote] = useState("");
  useEffect(() => { if (guest) setName(guest); }, [guest]);

  const couple = `${w.couple.bride} & ${w.couple.groom}`;
  const message = [
    "Assalamu Alaikum,",
    note.trim() || `Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. Wishing ${couple} a blessed Nikkah.`,
    `\n— ${name.trim() || "A well-wisher"}`,
  ].join("\n");

  const href = `https://wa.me/${w.rsvp.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <section aria-label="Send a dua" className="relative px-5 py-16">
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

        <label className="mt-5 block text-[12px] font-semibold uppercase tracking-[.25em] text-muted" htmlFor="rsvp-note">Duas & wishes</label>
        <textarea
          id="rsvp-note"
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 300))}
          rows={4}
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

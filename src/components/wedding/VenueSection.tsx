"use client";
import { useState } from "react";
import { Navigation, MapPin, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { wedding as w } from "@/data/wedding";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function VenueSection() {
  const [copied, setCopied] = useState(false);
  const address = `${w.venue.name}, ${w.venue.addressLines.join(" ")}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <section aria-label="Venue" className="relative px-5 py-16">
      <Reveal><SectionHeading eyebrow="Join Us At" title="The Venue" /></Reveal>

      <Reveal delay={0.1} className="panel mt-8 overflow-hidden rounded-[28px] p-2">
        <div className="relative overflow-hidden rounded-[22px] border border-gold/50">
          <iframe
            title={`Map showing ${w.venue.name}`}
            src={w.venue.embedUrl}
            className="block h-[240px] w-full grayscale-[25%] sepia-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="px-3 pb-3 pt-5 text-center">
          <MapPin className="mx-auto text-gold" size={26} strokeWidth={1.4} aria-hidden />
          <h3 className="mt-1 text-[24px] font-semibold text-maroon">{w.venue.name}</h3>
          <p className="text-[15px] leading-snug text-wine/90">{w.venue.addressLines.join(" ")}</p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a className="btn-gold" href={w.venue.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} aria-hidden /> Get Directions
            </a>
            <button type="button" className="btn-outline" onClick={copy} aria-live="polite">
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />} {copied ? "Copied" : "Copy Address"}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="rounded-md border border-gold/80 bg-white p-1.5">
              <QRCodeSVG value={w.venue.mapsUrl} size={72} fgColor="#3a0d14" level="M" />
            </span>
            <p className="text-left text-[14px] italic leading-snug text-muted">
              {w.venue.qrLabel}<br />
              <span className="not-italic text-[12px] uppercase tracking-[.2em]">share with family</span>
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

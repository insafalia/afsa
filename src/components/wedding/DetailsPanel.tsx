import { Clock3, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { wedding as w } from "@/data/wedding";

const GoldHeart = () => (
  <svg viewBox="0 0 20 18" width="12" height="11" aria-hidden>
    <path d="M10 17 C 4 12.5, .5 9, .5 5.2 C .5 2.6, 2.6 .5, 5.2 .5 C 7.2 .5, 9 1.7, 10 3.5 C 11 1.7, 12.8 .5, 14.8 .5 C 17.4 .5, 19.5 2.6, 19.5 5.2 C 19.5 9, 16 12.5, 10 17Z" fill="#c9a45c" />
  </svg>
);

const VLine = () => (
  <span aria-hidden className="w-px self-stretch bg-gradient-to-b from-transparent via-gold to-transparent" />
);

function VenueColumn({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <MapPin className="text-gold" size={compact ? 22 : 26} strokeWidth={1.4} aria-hidden />
      <p className={`mt-1.5 whitespace-nowrap font-semibold leading-tight text-maroon ${compact ? "text-[16px]" : "text-[19px]"}`}>{w.venue.name}</p>
      <p className={`mt-1 leading-snug text-wine/90 ${compact ? "text-[11.5px]" : "text-[13px]"}`}>
        {w.venue.addressLines.map((l) => (<span key={l} className="block">{l}</span>))}
      </p>
      <span aria-hidden className="my-2.5 h-px w-3/4 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="flex items-center gap-1.5">
        <Clock3 className="shrink-0 text-gold" size={compact ? 20 : 24} strokeWidth={1.4} aria-hidden />
        <div className="text-left">
          <p className={`whitespace-nowrap font-semibold leading-tight text-maroon ${compact ? "text-[14.5px]" : "text-[17px]"}`}>{w.timingLabel}</p>
          <p className={`whitespace-nowrap text-wine/90 ${compact ? "text-[11.5px]" : "text-[13px]"}`}>{w.timingText}</p>
        </div>
      </div>
    </div>
  );
}

function QrBlock({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <a
      href={w.venue.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open venue location in Google Maps"
      className={`group flex items-center justify-center ${horizontal ? "flex-row gap-4" : "flex-col gap-1.5"}`}
    >
      <span className="rounded-md border border-gold/80 bg-white p-1.5 shadow-[0_4px_14px_-6px_rgba(92,20,32,.4)] transition group-hover:scale-[1.03]">
        <QRCodeSVG value={w.venue.mapsUrl} size={horizontal ? 76 : 72} fgColor="#3a0d14" bgColor="#ffffff" level="M" />
      </span>
      <span className={`flex flex-col gap-1 ${horizontal ? "items-start" : "items-center"}`}>
        <GoldHeart />
        <span className="text-[14px] italic leading-tight text-wine">{w.venue.qrLabel}</span>
        {horizontal && <span className="text-[11px] uppercase tracking-[.2em] text-muted">or tap to open map</span>}
      </span>
    </a>
  );
}

export default function DetailsPanel() {
  return (
    <div className="panel relative rounded-2xl px-3 py-4">
      <div className="flex items-center justify-center gap-4">
        <VenueColumn />
        <VLine />
        <QrBlock />
      </div>
    </div>
  );
}

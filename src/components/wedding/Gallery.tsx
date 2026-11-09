"use client";
import Image from "next/image";
import { useState } from "react";
import { wedding as w } from "@/data/wedding";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GalleryLightbox from "./GalleryLightbox";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const photos = w.gallery.photos;
  return (
    <section aria-label="Photo gallery" className="relative py-16">
      <Reveal className="px-6"><SectionHeading eyebrow={w.gallery.eyebrow} title={w.gallery.title} /></Reveal>

      <Reveal delay={0.1} className="mt-8">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
              className="panel group relative aspect-[3/4] w-[68%] shrink-0 snap-center overflow-hidden rounded-t-[999px] rounded-b-2xl p-1.5"
            >
              <span className="relative block h-full w-full overflow-hidden rounded-t-[999px] rounded-b-xl">
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 480px) 68vw, 320px" className="object-cover transition duration-700 group-hover:scale-105" />
              </span>
              {p.caption && (
                <span className="absolute inset-x-0 bottom-3 text-center font-script text-[24px] text-white drop-shadow">{p.caption}</span>
              )}
            </button>
          ))}
        </div>
        <p className="text-center text-[11px] uppercase tracking-[.3em] text-muted">Swipe · Tap to view</p>
      </Reveal>

      <GalleryLightbox photos={photos} index={index} onChange={setIndex} />
    </section>
  );
}

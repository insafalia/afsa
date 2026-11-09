import { ImageDown } from "lucide-react";
import { wedding as w } from "@/data/wedding";
import GoldDivider from "@/components/decorations/GoldDivider";
import RoseCorner from "@/components/decorations/RoseCorner";
import Reveal from "@/components/ui/Reveal";
import ShareButton from "./ShareButton";

export default function ClosingSection() {
  return (
    <section aria-label="With love and duas" className="relative overflow-hidden px-6 pb-56 pt-16 text-center">
      <Reveal>
        <p dir="rtl" lang="ar" className="mx-auto max-w-[360px] font-arabic text-[clamp(19px,5.6vw,24px)] leading-[1.9] text-maroon">{w.closing.dua}</p>
        <p className="mx-auto mt-3 max-w-[360px] text-[15px] italic text-wine/85">{w.closing.duaMeaning}</p>
      </Reveal>

      <Reveal delay={0.1}><GoldDivider variant="flourish" className="mt-8" /></Reveal>

      <Reveal delay={0.15} className="mt-6">
        <p className="text-[18px] font-semibold text-maroon">{w.welcome.title}</p>
        <p className="mx-auto mt-1 max-w-[320px] text-[14px] leading-snug text-wine/85">{w.welcome.place}</p>
        <p className="mt-5 text-[12px] font-semibold uppercase tracking-[.35em] text-muted">{w.closing.signoff}</p>
        <p className="mt-1 font-script leading-[1.2] text-maroon">
          <span className="block text-[40px]">{w.couple.shortBride}</span>
          <span className="block text-[28px] text-gold">&amp;</span>
          <span className="block whitespace-nowrap text-[clamp(30px,9vw,40px)]">{w.couple.shortGroom}</span>
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-8"><ShareButton /></Reveal>

      <Reveal delay={0.25} className="mt-4">
        <a href={w.printedCard} download="Nikkah-Invitation-Hafsana-Nishad.jpg" className="inline-flex items-center gap-2 text-[14px] font-semibold text-maroon underline decoration-gold/70 underline-offset-4">
          <ImageDown size={16} aria-hidden /> Download the printed invitation card
        </a>
      </Reveal>

      <Reveal delay={0.3} className="mt-10">
        <GoldDivider variant="sprig" />
        <p className="mx-auto mt-3 max-w-[300px] text-[10.5px] font-semibold uppercase leading-relaxed tracking-[.16em] text-wine">{w.card.footer}</p>
      </Reveal>

      <RoseCorner position="bottom-right" className="w-[52%] max-w-[250px]" />
    </section>
  );
}

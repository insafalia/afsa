import GoldDivider from "@/components/decorations/GoldDivider";

export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[.42em] text-muted">{eyebrow}</p>
      <h2 className="mt-1 font-script text-[42px] leading-tight text-maroon">{title}</h2>
      <GoldDivider variant="heart" className="mt-1" />
    </div>
  );
}

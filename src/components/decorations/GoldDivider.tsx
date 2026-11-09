type Variant = "heart" | "glossy-heart" | "flourish" | "sprig";

const Line = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <span
    className={`block h-px flex-1 ${className}`}
    style={{ background: `linear-gradient(${flip ? "270deg" : "90deg"}, transparent, #c9a45c 70%, #e8d3a2)` }}
  />
);

const Leaf = ({ flip = false }: { flip?: boolean }) => (
  <svg viewBox="0 0 40 20" width="34" height="17" className={flip ? "-scale-x-100" : ""} aria-hidden>
    <defs>
      <linearGradient id="leaf-g" x1="0" x2="1">
        <stop offset="0" stopColor="#b38a46" />
        <stop offset="1" stopColor="#e8d3a2" />
      </linearGradient>
    </defs>
    <path d="M2 10 H38" stroke="url(#leaf-g)" strokeWidth="1" />
    <path d="M14 10 C 16 3, 24 2, 27 4 C 24 8, 19 10, 14 10Z" fill="url(#leaf-g)" />
    <path d="M14 10 C 16 17, 24 18, 27 16 C 24 12, 19 10, 14 10Z" fill="url(#leaf-g)" />
    <path d="M24 10 C 27 6, 32 6, 34 7 C 32 9, 28 10, 24 10Z" fill="url(#leaf-g)" />
    <circle cx="37" cy="10" r="1.6" fill="#c9a45c" />
  </svg>
);

const GlossyHeart = () => (
  <svg viewBox="0 0 40 36" width="38" height="34" aria-hidden className="drop-shadow-[0_3px_4px_rgba(122,31,43,.35)]">
    <defs>
      <radialGradient id="gh" cx=".35" cy=".3" r=".8">
        <stop offset="0" stopColor="#fbd3d3" />
        <stop offset=".45" stopColor="#e7979b" />
        <stop offset="1" stopColor="#b5545f" />
      </radialGradient>
    </defs>
    <path d="M20 34 C 8 25, 1 18, 1 10.5 C 1 5, 5 1, 10.5 1 C 14.5 1, 18 3.5, 20 7 C 22 3.5, 25.5 1, 29.5 1 C 35 1, 39 5, 39 10.5 C 39 18, 32 25, 20 34Z" fill="url(#gh)" />
    <ellipse cx="12" cy="9" rx="5" ry="3" fill="#fff" opacity=".55" transform="rotate(-30 12 9)" />
  </svg>
);

const SmallHeart = () => (
  <svg viewBox="0 0 20 18" width="14" height="13" aria-hidden>
    <path d="M10 17 C 4 12.5, .5 9, .5 5.2 C .5 2.6, 2.6 .5, 5.2 .5 C 7.2 .5, 9 1.7, 10 3.5 C 11 1.7, 12.8 .5, 14.8 .5 C 17.4 .5, 19.5 2.6, 19.5 5.2 C 19.5 9, 16 12.5, 10 17Z" fill="#c9a45c" />
  </svg>
);

const Flourish = () => (
  <svg viewBox="0 0 120 30" width="96" height="24" aria-hidden fill="none" stroke="#c9a45c" strokeWidth="1.3" strokeLinecap="round">
    <path d="M60 4 C 56 10, 56 18, 60 26 C 64 18, 64 10, 60 4Z" fill="#c9a45c" stroke="none" />
    <path d="M54 15 C 44 4, 30 6, 30 15 C 30 21, 38 22, 40 17 C 41 14, 38 12, 36 14" />
    <path d="M66 15 C 76 4, 90 6, 90 15 C 90 21, 82 22, 80 17 C 79 14, 82 12, 84 14" />
    <path d="M54 15 C 46 24, 36 26, 26 20" />
    <path d="M66 15 C 74 24, 84 26, 94 20" />
    <circle cx="60" cy="15" r="2" fill="#fff6dc" stroke="none" />
  </svg>
);

export default function GoldDivider({ variant = "heart", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-2 ${className}`}>
      {variant === "heart" && (<><Line className="max-w-[110px]" /><SmallHeart /><Line flip className="max-w-[110px]" /></>)}
      {variant === "glossy-heart" && (<><Line /><Leaf flip /><GlossyHeart /><Leaf /><Line flip /></>)}
      {variant === "flourish" && (<><Line className="max-w-[90px]" /><Flourish /><Line flip className="max-w-[90px]" /></>)}
      {variant === "sprig" && (<><Line className="max-w-[60px]" /><Leaf flip /><SmallHeart /><Leaf /><Line flip className="max-w-[60px]" /></>)}
    </div>
  );
}

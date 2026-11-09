/** Blush marble with soft clouds and gold veins, fixed behind the invitation column. */
export default function MarbleBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 right-0 z-0 mx-auto max-w-[480px] overflow-hidden">
      <svg className="h-full w-full" viewBox="0 0 480 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mb-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbefea" />
            <stop offset=".45" stopColor="#f7e4dd" />
            <stop offset="1" stopColor="#f2d6cc" />
          </linearGradient>
          <filter id="mb-cloud" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".006 .012" numOctaves="4" seed="7" />
            <feColorMatrix values="0 0 0 0 .86  0 0 0 0 .58  0 0 0 0 .56  0 0 0 1.4 -.55" />
          </filter>
          <linearGradient id="mb-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b38a46" stopOpacity="0" />
            <stop offset=".25" stopColor="#d8b56f" />
            <stop offset=".6" stopColor="#f1dca8" />
            <stop offset="1" stopColor="#b38a46" stopOpacity="0" />
          </linearGradient>
          <filter id="mb-glow"><feGaussianBlur stdDeviation="1.2" /></filter>
        </defs>
        <rect width="480" height="1000" fill="url(#mb-base)" />
        <rect width="480" height="1000" filter="url(#mb-cloud)" opacity=".55" />
        <g fill="none" stroke="url(#mb-gold)" strokeLinecap="round">
          <g opacity=".5" filter="url(#mb-glow)" strokeWidth="3">
            <path d="M-20 420 C 40 380, 30 300, 90 250 S 160 140, 140 40" />
            <path d="M500 520 C 430 560, 450 640, 400 700 S 330 820, 360 1020" />
          </g>
          <g strokeWidth="1.1" opacity=".85">
            <path d="M-20 420 C 40 380, 30 300, 90 250 S 160 140, 140 40" />
            <path d="M10 900 C 60 840, 20 760, 70 700 S 60 600, 20 560" />
            <path d="M500 520 C 430 560, 450 640, 400 700 S 330 820, 360 1020" />
            <path d="M470 60 C 430 120, 470 180, 430 240 S 440 330, 500 360" />
            <path d="M-10 640 C 30 650, 50 700, 30 760" strokeWidth=".7" />
            <path d="M480 820 C 450 850, 460 900, 420 940" strokeWidth=".7" />
          </g>
        </g>
      </svg>
    </div>
  );
}

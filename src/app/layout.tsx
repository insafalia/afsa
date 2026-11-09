import type { Metadata, Viewport } from "next";
import { wedding as w } from "@/data/wedding";
import "./globals.css";

// Loaded by the browser instead of next/font/google, whose build-time download
// breaks when Google returns font URLs without a file extension.
const fontsHref =
  "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Great+Vibes&display=swap";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: w.seo.title,
  description: w.seo.description,
  openGraph: {
    title: w.seo.title,
    description: w.seo.description,
    images: [{ url: w.seo.image, width: 1200, height: 630, alt: w.seo.title }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: w.seo.title,
    description: w.seo.description,
    images: [w.seo.image],
  },
};

export const viewport: Viewport = {
  themeColor: w.theme.blush,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = w.theme;
  const vars = {
    "--color-maroon": t.maroon,
    "--color-wine": t.wine,
    "--color-gold": t.gold,
    "--color-gold-light": t.goldLight,
    "--color-blush": t.blush,
    "--color-cream": t.cream,
    "--color-rose": t.rose,
    "--color-text": t.text,
    "--color-muted": t.muted,
    "--font-script": "'Great Vibes', cursive",
    "--font-serif": "'Cormorant Garamond', Georgia, serif",
    "--font-arabic": "'Amiri', 'Times New Roman', serif",
  } as React.CSSProperties;
  return (
    <html lang="en" style={vars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body>{children}</body>
    </html>
  );
}

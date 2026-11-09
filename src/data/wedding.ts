/**
 * THE ONLY FILE YOU NEED TO EDIT for content changes.
 * (Images live in /public/images, music in /public/music.)
 */
const venueQuery = "Aysha Mahal No.1, Palakkad Main Road, Kuniyamuthur, Coimbatore 641008";

export const wedding = {
  couple: {
    bride: "N. Hafsana",
    groom: "S. Mohamed Nishad",
    monogram: ["H", "N"] as const,
  },

  envelope: {
    eyebrow: "Wedding Invitation",
    greeting: "Dear",
    defaultGuest: "Honoured Guest",
    cta: "Tap to Open",
  },

  card: {
    bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    bismillahLabel: "Bismillah ir-Rahman ir-Rahim",
    bismillahMeaning: "“In the name of Allah, the Most Beneficent and Most Merciful”",
    invite: [
      "Cordially invite your esteemed presence with your family",
      "and friends on the auspicious occasion of the Wedding (Nikkah)",
    ],
    inshaAllah: "Insha Allah",
    footer: "Your presence will make our day more special",
  },

  /** Gregorian date (YYYY-MM-DD) and start time (24h HH:mm), in the venue's time zone */
  date: "2026-12-06",
  time: "11:30",
  endTime: "14:30",
  timeZoneOffset: "+05:30",
  hijri: { line1: "Hijri 1448,", line2: "Jumada Al-Thani, 26th" },
  timingLabel: "Nikkah Timing",
  timingText: "11:30 am onwards",

  venue: {
    name: "Aysha Mahal No.1",
    addressLines: ["Palakkad Main Road,", "Kuniyamuthur,", "Coimbatore - 641008."],
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueQuery)}`,
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(venueQuery)}&output=embed`,
    qrLabel: "Scan for Location",
  },

  countdown: {
    eyebrow: "Counting the Days",
    title: "Until Our Nikkah",
    today: "Today is the Nikkah, Alhamdulillah!",
    past: "Alhamdulillah, the Nikkah was beautifully celebrated. JazakAllah Khair for your duas.",
  },

  gallery: {
    /** Set to true once real photos are added to /public/images/gallery */
    enabled: false,
    eyebrow: "Moments",
    title: "Our Journey",
    photos: [
      { src: "/images/gallery/01.jpg", alt: "Couple photo 1", caption: "" },
      { src: "/images/gallery/02.jpg", alt: "Couple photo 2", caption: "" },
      { src: "/images/gallery/03.jpg", alt: "Couple photo 3", caption: "" },
      { src: "/images/gallery/04.jpg", alt: "Couple photo 4", caption: "" },
    ],
  },

  rsvp: {
    enabled: true,
    eyebrow: "With Love",
    title: "Send Your Dua",
    /** WhatsApp number with country code, digits only (e.g. "919876543210"). Leave empty to let the guest pick a contact. */
    whatsapp: "918637650722",
  },

  closing: {
    dua: "بَارَكَ ٱللَّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaMeaning:
      "“May Allah bless you both, shower His blessings upon you, and unite you in goodness.”",
    thanks: "Your duas and presence mean the world to us and our families.",
    signoff: "With love & duas",
  },

  music: { src: "/music/nikkah.mp3", volume: 0.5 },

  seo: {
    title: "N. Hafsana & S. Mohamed Nishad — Nikkah Invitation",
    description:
      "Insha Allah, join us for the Nikkah on Sunday, 06 December 2026 at 11:30 am, Aysha Mahal No.1, Kuniyamuthur, Coimbatore.",
    image: "/images/og.jpg",
  },

  printedCard: "/images/invitation-card.jpg",

  theme: {
    maroon: "#7A1F2B",
    wine: "#5C1420",
    gold: "#C9A45C",
    goldLight: "#E8D3A2",
    blush: "#F6E3DC",
    cream: "#FBF3EE",
    rose: "#D98C8C",
    text: "#5C1420",
    muted: "#8A5A5A",
  },
};

export type Wedding = typeof wedding;

/* ---------- helpers (no need to edit) ---------- */
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const p2 = (n: number) => String(n).padStart(2, "0");

export const eventStart = (w: Wedding = wedding) => new Date(`${w.date}T${w.time}:00${w.timeZoneOffset}`);
export const eventEnd = (w: Wedding = wedding) => new Date(`${w.date}T${w.endTime}:00${w.timeZoneOffset}`);

const dateParts = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, day)).getUTCDay();
  return { year: y, month: MONTHS[m - 1], day: p2(day), weekday: DAYS[weekday] };
};
export const weddingDate = dateParts(wedding.date);
export const longDate = `${weddingDate.weekday}, ${weddingDate.day} ${weddingDate.month} ${weddingDate.year}`;

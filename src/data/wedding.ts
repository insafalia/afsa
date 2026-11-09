/**
 * THE ONLY FILE YOU NEED TO EDIT for content changes.
 * (Images live in /public/images, music in /public/music.)
 */
const venueQuery =
  "Aysha Mahal No.1, Palakkad - Coimbatore Rd, Coimbatore, Kuniyamuthur, Tamil Nadu 641008";

export const wedding = {
  couple: {
    bride: "N. Hafsana",
    groom: "S. Mohamed Nishad",
    brideArabic: "حفصة",
    groomArabic: "نيشاد",
    shortBride: "Hafsa",
    shortGroom: "Nishad",
    brideLine: "Grand D/o. (late) Ibrahim & Mr. Mohamed Kutty",
    groomLine: "S/o. Mr. Sharfudeen & Mrs. Rameeja",
    groomPlace: "M.V. Garden, Challapatha, Kazhinjampara",
    monogram: ["H", "N"] as const,
  },

  hosts: {
    names: "Mr. Noor Mohamed & Mrs. Haseena",
    address: "7/24, Sugunapuram East, Mailkal Kuniyamuthur, Coimbatore - 08.",
  },

  sharedBy: {
    label: "Sharing the Happiness from:",
    names: "Mr. Ashik & Mrs. Hisana,",
    place: "Afsaf",
  },

  welcome: {
    title: "Noor and Family welcome you",
    place: "MMA Market, Stall No 104, South Ukkadam, Cbe - 01.",
    phones: ["9894121151", "7708670803"],
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
      "Cordially invite your esteemed presence with family and friends",
      "on the auspicious occasion of The Wedding (Nikkah) of our Daughter",
    ],
    inshaAllah: "Insha Allah",
    footer: "Your presence will make our day more special",
  },

  /** Gregorian date (YYYY-MM-DD) and start time (24h HH:mm), in the venue's time zone */
  date: "2026-12-06",
  time: "11:30",
  endTime: "14:30",
  timeZoneOffset: "+05:30",
  hijri: { line1: "(Hijri 1448,", line2: "Jamaadhul Aakhir, 26th)" },
  timingLabel: "Nikkah Timing",
  timingText: "11.30 am Onwards",

  venue: {
    name: "Aysha Mahal No.1",
    addressLines: ["Palakkad Main Road,", "Kuniyamuthur,", "Coimbatore - 641008."],
    /** Exact pin from https://maps.app.goo.gl/9CmX5yxpgW3JbZbLA (XXC4+H3G Aysha Mahal) */
    mapsUrl:
      "https://www.google.com/maps/place/XXC4%2BH3G+Aysha+Mahal,+10,+Palakkad+-+Coimbatore+Rd,+Kasthuri+Nagar,+Sunnambu+kalvai,+Kumuram+Garden,+Coimbatore,+Kuniyamuthur,+Tamil+Nadu+641008/data=!4m2!3m1!1s0x3ba8597d18336405:0x1528322c91b7c1a7",
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent("XXC4+H3G Aysha Mahal, " + venueQuery)}&output=embed`,
    qrLabel: "Nikkah Location",
  },

  scratch: {
    eyebrow: "A sealed note",
    cover: "Scratch gently",
    hint: "A save-the-date is hidden underneath",
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
    duaMeaning: "“May Allah bless you and send blessings upon you, and bring goodness between you.”",
    thanks: "Noor and Family welcome you",
    signoff: "With love & duas",
  },

  music: { src: "/music/nikkah.mp3", volume: 0.5 },

  seo: {
    title: "N. Hafsana & S. Mohamed Nishad — Nikkah Invitation",
    description:
      "Insha Allah, join us for the Nikkah on Sunday, 06 December 2026 at 11:30 am, Aysha Mahal No.1, Kuniyamuthur, Coimbatore.",
    image: "/images/og.jpg",
  },

  /** Text sent when guests tap "Share on WhatsApp" or "Share" (the invitation link is added automatically) */
  shareMessage:
    "I am incredibly happy to announce that I will be getting married on December 6, 2026.\n\n" +
    "As this special day approaches, I wanted to share my happiness with all of you. Please keep us in your thoughts and bless us as we begin this wonderful journey together.\n\n" +
    "With love\nHafsa 🫶💞",

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

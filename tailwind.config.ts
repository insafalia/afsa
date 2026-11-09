import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "var(--color-maroon)",
        wine: "var(--color-wine)",
        gold: "var(--color-gold)",
        goldlight: "var(--color-gold-light)",
        blush: "var(--color-blush)",
        cream: "var(--color-cream)",
        rose: "var(--color-rose)",
        ink: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "serif"],
        sans: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

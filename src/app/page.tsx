"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { wedding as w } from "@/data/wedding";
import { useScrollLock } from "@/hooks/useScrollLock";
import MarbleBackground from "@/components/decorations/MarbleBackground";
import FallingPetals from "@/components/decorations/FallingPetals";
import GoldDivider from "@/components/decorations/GoldDivider";
import EnvelopeOpening from "@/components/wedding/EnvelopeOpening";
import InvitationCard from "@/components/wedding/InvitationCard";
import Countdown from "@/components/wedding/Countdown";
import VenueSection from "@/components/wedding/VenueSection";
import Gallery from "@/components/wedding/Gallery";
import RsvpSection from "@/components/wedding/RsvpSection";
import ClosingSection from "@/components/wedding/ClosingSection";
import MusicControl from "@/components/wedding/MusicControl";

const readGuest = () => {
  const raw = new URLSearchParams(window.location.search).get("to");
  const name = raw?.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 40);
  return name || null;
};

export default function Page() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [guest, setGuest] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  useScrollLock(!opened);

  useEffect(() => {
    setGuest(readGuest());
    window.scrollTo(0, 0);
  }, []);

  const startMusic = () => {
    const a = audio.current;
    if (!a) return;
    a.volume = w.music.volume;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="shell">
      <audio ref={audio} src={w.music.src} loop preload="auto" />
      <MarbleBackground />
      <FallingPetals petals={opened ? 10 : 14} sparkles={opened ? 12 : 18} />

      <AnimatePresence>
        {!opened && <EnvelopeOpening key="envelope" guest={guest} onStart={startMusic} onDone={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <motion.div className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <MusicControl playing={playing} onToggle={toggle} />
          {guest && (
            <motion.p className="relative z-30 pt-6 text-center text-[15px] italic text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Dear <span className="font-semibold not-italic text-maroon">{guest}</span>, with joy we invite you
            </motion.p>
          )}
          <InvitationCard />
          <GoldDivider variant="flourish" />
          <Countdown />
          <GoldDivider variant="sprig" />
          <VenueSection />
          {w.gallery.enabled && (<><GoldDivider variant="sprig" /><Gallery /></>)}
          {w.rsvp.enabled && (<><GoldDivider variant="sprig" /><RsvpSection guest={guest} /></>)}
          <ClosingSection />
        </motion.div>
      )}
    </main>
    </MotionConfig>
  );
}

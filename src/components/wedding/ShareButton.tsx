"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { wedding as w } from "@/data/wedding";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.2 5.4.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.3z" />
  </svg>
);

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const text = w.shareMessage;
  const url = () => window.location.origin + window.location.pathname;

  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: w.seo.title, text, url: url() }); } catch { /* dismissed */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url()}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a
        className="btn-gold"
        href={`https://wa.me/?text=${encodeURIComponent(text)}`}
        onClick={(e) => { e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url()}`)}`; }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon /> Share on WhatsApp
      </a>
      <button type="button" className="btn-outline" onClick={nativeShare} aria-live="polite">
        {copied ? <Check size={16} aria-hidden /> : <Share2 size={16} aria-hidden />} {copied ? "Link Copied" : "Share"}
      </button>
    </div>
  );
}

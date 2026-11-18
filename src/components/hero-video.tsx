"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Background video for phones only (the clip is vertical). Wider screens never download it. */
export function HeroVideo({ src }: { src: string }) {
  const phone = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  if (!phone || !src) return null;
  return (
    <>
      <video className="absolute inset-0 -z-20 h-full w-full object-cover" src={src} autoPlay muted loop playsInline preload="auto" aria-hidden />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso/75 via-espresso/45 to-espresso/80" />
    </>
  );
}

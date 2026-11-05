import type { SVGProps } from "react";
import { contact } from "@/data/site";

export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** One big floating Instagram logo, used on the home page and the contact page. */
export function SocialOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <a
        href={contact.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Platter on Instagram"
        className="social-orb flex h-20 w-20 items-center justify-center rounded-full text-white transition hover:scale-105 md:h-24 md:w-24"
        style={{ background: "linear-gradient(45deg,#f9a03f,#e1306c 55%,#7b3fe4)" }}
      >
        <InstagramIcon width={38} height={38} />
      </a>
    </div>
  );
}

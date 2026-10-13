import type { SVGProps } from "react";
import { contact } from "@/data/site";

export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  </svg>
);

/** Two big floating logos, used on the home page and the contact page. */
export function SocialOrbs({ className = "" }: { className?: string }) {
  const orb = "social-orb flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-110 md:h-24 md:w-24";
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Platter on Instagram" className={orb} style={{ background: "linear-gradient(45deg,#f9a03f,#e1306c 55%,#7b3fe4)" }}>
        <InstagramIcon width={38} height={38} />
      </a>
      <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Platter on Facebook" className={orb} style={{ background: "#1877f2" }}>
        <FacebookIcon width={40} height={40} />
      </a>
    </div>
  );
}

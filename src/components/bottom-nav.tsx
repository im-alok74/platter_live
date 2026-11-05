"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NAV } from "@/data/site";

const icon = (d: string) => (
  <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ICONS: Record<string, ReactNode> = {
  "/": icon("M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"),
  "/menu": icon("M6 3v7a3 3 0 0 0 3 3v8M9 3v7M12 3v7a3 3 0 0 1-3 3M17 3c-2 2-3 5-3 8h3v10"),
  "/about": icon("M12 8v.01M11 12h1v5h1M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z"),
  "/location": icon("M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"),
  "/contact": icon("M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"),
};

const useActive = () => {
  const path = usePathname();
  return (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
};

/** Links in the floating header pill (desktop). The current page gets a soft pill behind it. */
export function NavLinks() {
  const active = useActive();
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {NAV.map((l) => (
        <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active(l.href) ? "bg-foreground/15 text-foreground" : "text-foreground/75 hover:bg-foreground/10 hover:text-foreground"}`}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

/** Thumb-reach navigation on phones: a floating rounded bar with an icon and a label per page. */
export function BottomNav() {
  const active = useActive();
  return (
    <nav aria-label="Main" className="fixed inset-x-3 bottom-3 z-50 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-full border border-border bg-espresso/90 p-1.5 shadow-[0_10px_40px_rgb(0_0_0/0.45)] backdrop-blur-md">
        {NAV.map((l) => {
          const on = active(l.href);
          return (
            <li key={l.href}>
              <Link href={l.href} aria-current={on ? "page" : undefined} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition active:scale-95 ${on ? "bg-brand text-brand-foreground" : "text-foreground/75"}`}>
                {ICONS[l.href]}
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

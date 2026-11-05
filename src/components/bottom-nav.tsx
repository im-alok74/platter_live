"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav({ links }: { links: readonly (readonly [string, string])[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-espresso pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {links.map(([h, l]) => {
          const active = h === "/" ? path === "/" : path.startsWith(h);
          return (
            <li key={h}>
              <Link href={h} aria-current={active ? "page" : undefined} className={`flex min-h-14 items-center justify-center text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors active:scale-95 ${active ? "text-gold" : "text-foreground/60"}`}>{l}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

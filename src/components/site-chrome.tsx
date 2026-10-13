import Link from "next/link";
import { contact, hours, legal } from "@/data/site";
import { telHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";
import { OpenBadge } from "./open-badge";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

const links = [["/", "Home"], ["/menu", "Menu"], ["/#location", "Location"], ["/#contact", "Contact"]] as const;

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" aria-label="Platter home" className="text-4xl leading-none"><Wordmark /></Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {links.map(([h, l]) => (
              <Link key={h} href={h} className="inline-flex min-h-11 items-center text-sm font-medium transition-colors hover:text-brand">{l}</Link>
            ))}
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-2 lg:hidden"><ThemeToggle /><OpenBadge hours={hours} compact /></div>
        </div>
      </header>
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <ul className="mx-auto grid max-w-xl grid-cols-4">
          {links.map(([h, l]) => (
            <li key={h}><Link href={h} className="flex min-h-14 items-center justify-center text-xs font-medium text-muted transition-colors active:scale-95">{l}</Link></li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-espresso pb-28 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark className="text-5xl !text-white" />
          <p className="mt-2 text-sm text-white/60">{legal.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">Every day, {formatTime(hours.open)} to {formatTime(hours.close)}. Jhalana, Jaipur.</p>
        </div>
        <p className="text-sm"><a className="inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline" href={telHref(contact.phone)}>{contact.phone.replace("+91", "+91 ")}</a></p>
      </div>
      <div className="mx-auto max-w-6xl border-t border-white/10 px-4 pt-6 text-xs leading-relaxed text-white/50">
        FSSAI Lic. No. {legal.fssai} · GST {legal.gst_number} · {legal.entity}. Menu prices as shown in the cafe; taxes as applicable.
      </div>
    </footer>
  );
}

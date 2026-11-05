import Link from "next/link";
import { NAV, contact, credit, hours, legal } from "@/data/site";
import { telHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";
import { BottomNav, NavLinks } from "./bottom-nav";
import { OpenBadge } from "./open-badge";
import { InstagramIcon } from "./social";
import { Wordmark } from "./wordmark";

const phoneText = contact.phone.replace("+91", "+91 ");
const stackfox = (
  <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline-offset-4 hover:underline">{credit.name}</a>
);

/** A floating rounded bar: links on the left, the logo in the middle, status and actions on the right. On phones the links move to the bottom bar. */
export function SiteHeader() {
  return (
    <>
      <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full border border-border bg-espresso/80 py-2 pl-3 pr-2 shadow-[0_10px_40px_rgb(0_0_0/0.35)] backdrop-blur-md md:pl-5">
          <div className="flex items-center">
            <NavLinks />
            <p className="text-[11px] leading-tight text-foreground/70 lg:hidden">Built by<br />{stackfox}</p>
          </div>
          <Link href="/" aria-label="Platter home" className="flex items-center justify-center"><Wordmark className="h-9 w-auto md:h-10" /></Link>
          <div className="flex items-center justify-end gap-2">
            <span className="hidden xl:block"><OpenBadge hours={hours} compact /></span>
            <p className="hidden whitespace-nowrap text-xs text-foreground/70 xl:block">Built by {stackfox}</p>
            <Link href="/location" className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full bg-brand px-4 text-sm font-semibold text-brand-foreground transition hover:bg-foreground">Find us</Link>
            <Link href="/menu" aria-label="See the menu" className="hidden h-10 w-10 items-center justify-center rounded-full bg-gold text-espresso transition hover:scale-105 sm:flex">→</Link>
          </div>
        </div>
      </header>
      <div aria-hidden className="h-20 bg-espresso" />
      <BottomNav />
    </>
  );
}

const col = "text-sm font-semibold text-gold";
const a = "inline-flex min-h-11 items-center hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-espresso pb-28 text-foreground lg:pb-0">
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <Wordmark className="h-20 w-auto md:h-28" />
        <p className="mt-4 text-sm text-foreground/60">{legal.tagline}</p>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer" className="flex flex-col text-sm text-foreground/70">
            <h2 className={col}>Explore</h2>
            <div className="mt-3 flex flex-col">{NAV.map((l) => <Link key={l.href} href={l.href} className={a}>{l.label}</Link>)}</div>
          </nav>
          <div className="text-sm leading-relaxed text-foreground/70">
            <h2 className={col}>Visit</h2>
            <p className="mt-3">{contact.address}</p>
            <p className="mt-3">Every day, {formatTime(hours.open)} to {formatTime(hours.close)}</p>
            <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={`${a} text-gold underline-offset-4 hover:underline`}>Get directions</a>
          </div>
          <div className="flex flex-col text-sm text-foreground/70">
            <h2 className={col}>Contact</h2>
            <div className="mt-3 flex flex-col">
              <a className={a} href={telHref(contact.phone)}>{phoneText}</a>
              <a className={`${a} break-all`} href={`mailto:${contact.email}`}>{contact.email}</a>
              <a className={a} href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <div>
            <h2 className={col}>Follow</h2>
            <div className="mt-3 flex gap-3">
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition hover:bg-foreground/10"><InstagramIcon /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-border px-4 py-6 text-xs leading-relaxed text-foreground/50 md:flex-row md:items-center md:justify-between">
        <p>FSSAI Lic. No. {legal.fssai} · GST {legal.gst_number} · {legal.entity}. Menu prices as shown in the cafe; taxes as applicable.</p>
        <p className="whitespace-nowrap text-sm text-foreground/70">Built by {stackfox}</p>
      </div>
    </footer>
  );
}

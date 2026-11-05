import Link from "next/link";
import { contact, credit, hours, legal } from "@/data/site";
import { telHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";
import { BottomNav } from "./bottom-nav";
import { OpenBadge } from "./open-badge";
import { FacebookIcon, InstagramIcon } from "./social";
import { Wordmark } from "./wordmark";

const links = [["/", "Home"], ["/menu", "Menu"], ["/about", "About"], ["/location", "Location"], ["/contact", "Contact"]] as const;
const phoneText = contact.phone.replace("+91", "+91 ");
const stackfox = (
  <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline-offset-4 hover:underline">{credit.name}</a>
);

export function SiteHeader() {
  return (
    <>
      <div className="border-b border-border bg-espresso text-[11px] uppercase tracking-[0.14em] text-foreground/70">
        <div className="mx-auto flex min-h-9 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-4">
            <OpenBadge hours={hours} compact className="!text-[11px]" />
            <span className="hidden md:inline">Rajasthan International Centre, Jaipur</span>
            <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className="hidden underline-offset-4 hover:text-foreground hover:underline md:inline">Get directions</a>
            <a href={telHref(contact.phone)} className="hidden underline-offset-4 hover:text-foreground hover:underline md:inline">{phoneText}</a>
          </div>
          <p className="whitespace-nowrap">Built by {stackfox}</p>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" aria-label="Platter home" className="flex items-center"><Wordmark className="h-10 w-auto" /></Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map(([h, l]) => (
              <Link key={h} href={h} className="inline-flex min-h-11 items-center border-b border-transparent text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-gold hover:text-gold">{l}</Link>
            ))}
            <Link href="/menu" className="inline-flex min-h-11 items-center bg-brand px-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-foreground transition hover:bg-foreground">See the menu</Link>
          </nav>
        </div>
      </header>
      <BottomNav links={links} />
    </>
  );
}

const col = "text-xs font-semibold uppercase tracking-[0.3em] text-gold";
const a = "inline-flex min-h-11 items-center hover:text-foreground";
const tile = "flex h-12 w-12 items-center justify-center border border-border transition hover:bg-foreground/10";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-espresso pb-28 text-foreground lg:pb-0">
      <div className="mx-auto max-w-6xl px-4 pt-16">
        <Wordmark className="h-20 w-auto md:h-28" />
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-foreground/60">{legal.tagline}</p>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer" className="flex flex-col text-sm text-foreground/70">
            <h2 className={col}>Explore</h2>
            <div className="mt-3 flex flex-col">{links.map(([h, l]) => <Link key={h} href={h} className={a}>{l}</Link>)}</div>
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
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={tile}><InstagramIcon /></a>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={tile}><FacebookIcon /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-border px-4 py-6 text-xs leading-relaxed text-foreground/50 md:flex-row md:items-center md:justify-between">
        <p>FSSAI Lic. No. {legal.fssai} · GST {legal.gst_number} · {legal.entity}. Menu prices as shown in the cafe; taxes as applicable.</p>
        <p className="whitespace-nowrap text-sm uppercase tracking-[0.14em] text-foreground/70">Built by {stackfox}</p>
      </div>
    </footer>
  );
}

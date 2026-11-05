import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { OpenBadge } from "@/components/open-badge";
import { PageHeader } from "@/components/page-header";
import { contact, gallery, hours } from "@/data/site";
import { telHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Location",
  description: "Platter is on the Lower Ground Floor of Rajasthan International Centre, Sansthan Path, JLN Marg, Jhalana Doongri, Jaipur. Open every day 11 AM to 10:30 PM.",
  alternates: { canonical: "/location" },
};

const wrap = "mx-auto w-full max-w-6xl px-4";
const eyebrow = "text-sm font-medium text-gold";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-foreground active:scale-[0.98]";
const ghost = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-foreground/40 px-7 text-sm font-semibold transition hover:bg-foreground/10 active:scale-[0.98]";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const addressLines = ["Platter 9, Lower Ground Floor", "Rajasthan International Centre", "Sansthan Path, JLN Marg", "Jhalana Doongri, Jaipur 302017"];

const steps = [
  ["Head to Rajasthan International Centre", "RIC is on Sansthan Path, off JLN Marg, near Jhalana Doongri in Jaipur."],
  ["Go to the Lower Ground Floor", "Platter 9 is on the Lower Ground Floor of the centre."],
  ["Walk in and pick a table", "No booking needed for regular visits. For a large group, give us a call first."],
];

export default function Location() {
  return (
    <main>
      <PageHeader eyebrow="Find us" title="Location">Lower Ground Floor, Rajasthan International Centre, Jaipur.</PageHeader>

      <section className={`${wrap} grid gap-12 py-16 md:grid-cols-2 md:py-24`}>
        <Reveal>
          <p className={eyebrow}>Address</p>
          <ol className="mt-6 border-t border-border">
            {addressLines.map((l) => (
              <li key={l} className="flex items-baseline gap-4 border-b border-border py-4">
                <span className="display text-2xl md:text-3xl">{l}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6"><OpenBadge hours={hours} /></div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={primary}>Get directions</a>
            <a href={telHref(contact.phone)} className={ghost}>Call {contact.phone.replace("+91", "+91 ")}</a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className={eyebrow}>Opening hours</p>
          <ul className="mt-6 border-t border-border text-sm">
            {days.map((d) => (
              <li key={d} className="flex justify-between border-b border-border py-3"><span>{d}</span><span className="text-gold">{formatTime(hours.open)} to {formatTime(hours.close)}</span></li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className={`${wrap} py-16 md:py-24`}>
          <Reveal>
            <h2 className="display text-5xl md:text-7xl">On the <em>map</em></h2>
            <iframe title="Platter on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-8 h-80 w-full overflow-hidden rounded-2xl border border-border md:h-[28rem]" src={`https://www.google.com/maps?q=${encodeURIComponent("Rajasthan International Centre, JLN Marg, Jaipur")}&output=embed`} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className={`${wrap} py-16 md:py-24`}>
          <Reveal>
            <p className={eyebrow}>Getting here</p>
            <h2 className="display mt-3 text-5xl md:text-7xl">How to <em>reach us</em></h2>
          </Reveal>
          <ol className="mt-10 border-t border-border">
            {steps.map(([t, d]) => (
              <li key={t}>
                <Reveal className="grid gap-3 border-b border-border py-8 md:grid-cols-[6rem_1fr_1.2fr] md:gap-8">
                  <h3 className="display text-2xl md:text-3xl">{t}</h3>
                  <p className="leading-relaxed text-muted">{d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {gallery.length > 4 && (
        <section className={`${wrap} pb-16 md:pb-24`}>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.slice(4, 8).map((g) => (
              <li key={g.url} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
                <Image src={g.url} alt="Inside Platter" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

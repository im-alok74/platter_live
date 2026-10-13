import type { Metadata } from "next";
import Image from "next/image";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/icons";
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
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-brand-foreground shadow-card transition hover:brightness-110 active:scale-95";
const ghost = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-foreground/25 px-7 text-base font-semibold transition hover:bg-foreground/5 active:scale-95";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const steps = [
  ["Head to Rajasthan International Centre", "RIC is on Sansthan Path, off JLN Marg, near Jhalana Doongri in Jaipur."],
  ["Go to the Lower Ground Floor", "Platter 9 is on the Lower Ground Floor of the centre."],
  ["Walk in and pick a table", "No booking needed for regular visits. For a large group, give us a call first."],
];

export default function Location() {
  const row = "flex items-start gap-3";
  return (
    <main>
      <PageHeader eyebrow="Find us" title="Location">Lower Ground Floor, Rajasthan International Centre, Jhalana, Jaipur.</PageHeader>

      <section className={`${wrap} grid gap-4 pt-12 md:grid-cols-2`}>
        <Reveal>
          <div className="h-full space-y-5 rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
            <OpenBadge hours={hours} />
            <p className={row}><PinIcon className="mt-0.5 shrink-0 text-brand" /><span className="leading-relaxed">{contact.address}</span></p>
            <p className={row}><PhoneIcon className="mt-0.5 shrink-0 text-brand" /><a className="inline-flex min-h-11 items-center font-medium text-brand" href={telHref(contact.phone)}>{contact.phone.replace("+91", "+91 ")}</a></p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={primary}>Get directions</a>
              <a href={telHref(contact.phone)} className={ghost}>Call us</a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <iframe title="Platter on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-3xl border border-border md:h-full md:min-h-80" src={`https://www.google.com/maps?q=${encodeURIComponent("Rajasthan International Centre, JLN Marg, Jaipur")}&output=embed`} />
        </Reveal>
      </section>

      <section className={`${wrap} grid gap-4 pt-16 md:grid-cols-2`}>
        <Reveal>
          <div className="h-full rounded-3xl bg-espresso p-6 text-[#fbf6ef] md:p-8">
            <h2 className="flex items-center gap-2 font-display text-2xl"><ClockIcon className="text-gold" /> Opening hours</h2>
            <ul className="mt-5 divide-y divide-white/10 text-sm">
              {days.map((d) => (
                <li key={d} className="flex justify-between py-2.5"><span>{d}</span><span className="text-gold">{formatTime(hours.open)} to {formatTime(hours.close)}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
            <h2 className="font-display text-2xl">How to reach us</h2>
            <ol className="mt-5 space-y-5">
              {steps.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-xl text-[#2a1d17]">{i + 1}</span>
                  <div><h3 className="font-semibold">{t}</h3><p className="mt-0.5 text-sm text-muted">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      {gallery.length > 2 && (
        <section className={`${wrap} pt-16`}>
          <Reveal><h2 className="display text-4xl md:text-5xl">A look <em className="text-brand">inside.</em></h2></Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.slice(4, 8).map((g) => (
              <li key={g.url} className="tilt relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-sand">
                <Image src={g.url} alt="Inside Platter" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

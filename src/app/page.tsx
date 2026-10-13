import Image from "next/image";
import Link from "next/link";
import { DishPhoto } from "@/components/dish-photo";
import { Beans, CoffeeHero, SpinBadge, SplitText, Wave } from "@/components/fx/fx";
import { CountUp, Magnetic } from "@/components/fx/fx-client";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { OpenBadge } from "@/components/open-badge";
import { contact, gallery, hours, menu, type MenuItem } from "@/data/site";
import { formatPrice, telHref, waHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";

const wrap = "mx-auto w-full max-w-6xl px-4";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-brand-foreground shadow-card transition hover:brightness-110 active:scale-95";
const ghost = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-foreground/25 px-7 text-base font-semibold transition hover:bg-foreground/5 active:scale-95";
const ghostLight = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#fbf6ef]/60 px-7 text-base font-semibold text-[#fbf6ef] transition hover:bg-[#fbf6ef]/10 active:scale-95";
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")";
const tiles = ["bg-brand text-brand-foreground", "bg-gold text-[#2a1d17]", "bg-espresso text-[#fbf6ef]", "bg-sand text-foreground"];

function Hero() {
  return (
    <>
      <p className="bg-espresso px-4 py-2 text-center text-xs font-medium tracking-wide text-gold">Open every day, {formatTime(hours.open)} to {formatTime(hours.close)} · Dine in · Takeaway</p>
      <section className="relative isolate overflow-hidden bg-espresso text-[#fbf6ef]">
        <Beans count={6} />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen" style={{ backgroundImage: GRAIN }} />
        <div className={`${wrap} relative grid min-h-[calc(100svh-6rem)] items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.35fr_1fr]`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Jhalana · Jaipur · Cafe &amp; Restro</p>
            <h1 className="display mt-4 text-[clamp(4.2rem,15vw,9rem)] leading-[0.98] tracking-tight sm:leading-[0.85]">
              <span className="block"><SplitText text="Sip." /></span>
              <span className="stroke-text stroke-light block italic"><SplitText text="Bite." delay={260} /></span>
              <span className="block text-gold"><SplitText text="Stay." delay={520} /></span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#d9cbbd] md:text-lg">Good coffee, good food and a table that&apos;s waiting.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic><Link href="/menu" className={primary}>See the menu <ArrowIcon width={20} height={20} /></Link></Magnetic>
              <Magnetic><Link href="/#location" className={ghostLight}>Find us</Link></Magnetic>
            </div>
            <div className="mt-7"><OpenBadge hours={hours} /></div>
          </div>
          <div className="relative mx-auto w-full max-w-[24rem]">
            <CoffeeHero className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[2.5rem] border-4 border-gold/50 bg-sand shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]" />
            <SpinBadge id="badge-hero" text="OPEN DAILY • DINE IN • TAKEAWAY • OPEN DAILY • " className="absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-espresso text-gold shadow-xl md:-left-8 md:h-32 md:w-32">
              <Link href="/menu" aria-label="See the menu" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground transition hover:scale-110 md:h-14 md:w-14"><ArrowIcon width={22} height={22} /></Link>
            </SpinBadge>
          </div>
        </div>
      </section>
    </>
  );
}

function Ticker() {
  const words = ["Coffee", "Breakfast", "Pizza", "Pasta", "Indian mains", "Chinese", "Desserts", "Cold brew", "Shakes"];
  const run = (cls: string) => (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`marquee flex w-max gap-10 font-display text-6xl md:text-8xl ${cls}`}>
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10">{w} <span className="text-3xl">✦</span></span>
        ))}
      </div>
    </div>
  );
  return (
    <div aria-hidden className="-mt-px overflow-hidden bg-espresso pb-12 pt-4">
      <div className="-rotate-2 scale-105 space-y-2">
        <div className="bg-brand py-2 text-brand-foreground">{run("")}</div>
        <div className="bg-gold py-2 text-espresso">{run("marquee-rev italic")}</div>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section className={`${wrap} pt-20`}>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">The menu</p>
        <h2 className="display mt-2 text-5xl leading-[0.95] md:text-7xl">What are you <em className="text-brand">craving?</em></h2>
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {menu.slice(0, 12).map((c, i) => (
          <li key={c.id} className="tilt">
            <Link href={`/menu#${c.slug}`} className={`group relative flex min-h-36 flex-col justify-between gap-2 overflow-hidden rounded-[2rem] p-4 md:aspect-square md:p-5 ${c.image ? "bg-espresso text-white" : tiles[i % tiles.length]}`}>
              {c.image && (
                <>
                  <Image src={c.image.url} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-110" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                </>
              )}
              <span aria-hidden className={`display relative text-6xl leading-none md:text-8xl ${c.image ? "opacity-0" : "opacity-40"}`}>{c.name.charAt(0)}</span>
              <span className="relative">
                <span className="block text-lg font-semibold leading-tight">{c.name}</span>
                <span className="text-xs opacity-80">{c.items.length} items</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {menu.length > 12 && (
        <Link href="/menu" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-foreground/25 px-6 text-base font-semibold transition hover:bg-foreground/5 active:scale-95">
          See all {menu.length} sections <ArrowIcon width={18} height={18} />
        </Link>
      )}
    </section>
  );
}

function Picks() {
  const flagged = menu.flatMap((c) => c.items).filter((i) => (i.is_special || i.badges.includes("Bestseller")) && !i.sold_out);
  // Until favourites are flagged: one dish per category, preferring ones with a photo.
  const taste = menu.map((c) => c.items.find((i) => !i.sold_out && i.image) ?? c.items.find((i) => !i.sold_out)).filter((i): i is MenuItem => !!i);
  const picks = (flagged.length >= 4 ? flagged : taste).slice(0, 8);
  return (
    <section className="mt-16 bg-sand py-14">
      <div className={wrap}>
        <Reveal><h2 className="display text-4xl md:text-5xl">A taste of the menu</h2></Reveal>
        <ul className="-mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {picks.map((i) => (
            <li key={i.id} className="tilt w-44 shrink-0 snap-start md:w-auto">
              <div className="group h-full rounded-3xl border border-border bg-surface p-2.5 shadow-card">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand">
                  <DishPhoto name={i.name} image={i.image} sizes="(min-width: 1024px) 25vw, 176px" className="transition duration-700 ease-out group-hover:scale-110" />
                </div>
                <p className="mt-2.5 line-clamp-2 min-h-10 px-1 text-sm font-semibold leading-snug">{i.name}</p>
                <p className="mt-1 px-1 pb-0.5 font-bold tabular-nums">{formatPrice(i.price)}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/menu" className={`${primary} mt-4`}>See the full menu <ArrowIcon width={20} height={20} /></Link>
      </div>
    </section>
  );
}

function Stats() {
  const dishes = menu.reduce((n, c) => n + c.items.length, 0);
  const mins = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));
  const open = mins(hours.close) - mins(hours.open);
  const stats = [
    { n: dishes, label: "dishes on the menu" },
    { n: menu.length, label: "menu sections" },
    { n: Math.floor(open / 60), suffix: open % 60 >= 30 ? "½" : "", label: "hours open, every day" },
  ];
  return (
    <section className="mt-24 bg-brand text-brand-foreground">
      <Wave className="-mb-px text-background" />
      <ul className={`${wrap} grid grid-cols-2 gap-8 py-14 md:grid-cols-3`}>
        {stats.map((x) => (
          <li key={x.label}>
            <CountUp to={x.n} suffix={x.suffix} className="display block text-7xl leading-none md:text-8xl" />
            <span className="mt-2 block text-sm font-medium opacity-90">{x.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Reel() {
  if (gallery.length < 4) return null;
  const shots = gallery.filter((_, i) => i !== 3 && i !== 5);
  const row = (rev: boolean) => (
    <div className="overflow-hidden">
      <div className={`marquee flex w-max gap-4 ${rev ? "marquee-rev" : ""}`} style={{ animationDuration: "70s" }}>
        {[...shots, ...shots, ...shots].map((g, i) => (
          <Image key={i} src={g.url} alt="" width={g.width ?? 720} height={g.height ?? 1280} sizes="260px" className="tilt h-60 w-48 shrink-0 rounded-[2rem] object-cover md:h-80 md:w-60" />
        ))}
      </div>
    </div>
  );
  return (
    <section className="pt-20" aria-label="Photos of the cafe">
      <div className={wrap}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">Inside Platter</p>
          <h2 className="display mt-2 text-5xl leading-[0.95] md:text-7xl">Come sit <em className="text-brand">with us.</em></h2>
        </Reveal>
      </div>
      <div className="mt-10 space-y-4">{row(false)}{row(true)}</div>
    </section>
  );
}

function Location() {
  const row = "flex items-start gap-3";
  return (
    <section id="location" className={`${wrap} scroll-mt-24 pt-20`}>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">Location</p>
        <h2 className="display mt-2 text-5xl leading-[0.95] md:text-7xl">Find <em className="text-brand">us.</em></h2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="h-full space-y-5 rounded-3xl border border-border bg-surface p-6 shadow-card">
            <p className={row}><PinIcon className="mt-0.5 shrink-0 text-brand" /><span className="leading-relaxed">{contact.address}</span></p>
            <p className={row}><ClockIcon className="mt-0.5 shrink-0 text-brand" /><span>Every day, {formatTime(hours.open)} to {formatTime(hours.close)}. No weekly off.</span></p>
            <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={primary}>Get directions</a>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <iframe title="Platter on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full rounded-3xl border border-border md:h-full md:min-h-72" src={`https://www.google.com/maps?q=${encodeURIComponent("Rajasthan International Centre, JLN Marg, Jaipur")}&output=embed`} />
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${wrap} scroll-mt-24 pt-20`}>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">Contact</p>
        <h2 className="display mt-2 text-5xl leading-[0.95] md:text-7xl">Say <em className="text-brand">hello.</em></h2>
      </Reveal>
      <Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={telHref(contact.phone)} className={primary}><PhoneIcon width={20} height={20} /> {contact.phone.replace("+91", "+91 ")}</a>
          <a href={waHref(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className={ghost}>WhatsApp</a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className={ghost}>Instagram</a>
          <a href={`mailto:${contact.email}`} className={ghost}>{contact.email}</a>
        </div>
      </Reveal>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative mt-24 overflow-hidden bg-espresso text-[#fbf6ef]">
      <Wave className="-mb-px text-background" />
      <Beans fall />
      <div className={`${wrap} relative flex min-h-[60svh] flex-col items-start justify-center gap-8 py-20`}>
        <h2 className="display text-[clamp(3.6rem,15vw,10rem)] leading-[0.88]">
          <span className="block"><SplitText text="See you" /></span>
          <span className="block text-gold italic"><SplitText text="at the table." delay={300} /></span>
        </h2>
        <Magnetic><Link href="/menu" className={primary}>See the menu <ArrowIcon width={20} height={20} /></Link></Magnetic>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <div className="scroll-bar" aria-hidden />
      <Hero />
      <Ticker />
      <Categories />
      <Picks />
      <Stats />
      <Reel />
      <Location />
      <Contact />
      <Closing />
    </main>
  );
}

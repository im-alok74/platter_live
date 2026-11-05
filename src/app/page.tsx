import Image from "next/image";
import Link from "next/link";
import { Beans, CoffeeHero, SplitText } from "@/components/fx/fx";
import { Magnetic } from "@/components/fx/fx-client";
import { Reveal } from "@/components/motion";
import { contact, gallery, heroVideo, hours, menu } from "@/data/site";
import { telHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";

const wrap = "mx-auto w-full max-w-6xl px-4";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.3em] text-gold";
const h2 = "display mt-3 text-5xl md:text-7xl";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-7 text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition hover:bg-foreground active:scale-[0.98]";
const ghost = "inline-flex min-h-12 items-center justify-center gap-2 border border-foreground/40 px-7 text-sm font-semibold uppercase tracking-[0.14em] transition hover:bg-foreground/10 active:scale-[0.98]";
const num = "font-display text-xl text-gold";

const cat = (slug: string) => menu.find((c) => c.slug === slug);
const pic = (i: number) => gallery[i % gallery.length];

function Hero() {
  const tiles = [
    { n: "01", t: "The menu", href: "/menu", img: cat("breakfast")?.image?.url },
    { n: "02", t: "Coffee & shakes", href: "/menu#hot-coffee", img: cat("hot-coffee")?.image?.url },
    { n: "03", t: "Visit us", href: "/location", img: pic(1)?.url },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      {/* Video part is pending: set heroVideo in src/data/site.ts and it plays here behind the headline. */}
      {heroVideo ? (
        <video className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" src={heroVideo} autoPlay muted loop playsInline aria-hidden />
      ) : (
        <Beans count={6} />
      )}
      <div className={`${wrap} relative grid min-h-[calc(100svh-9rem)] items-center gap-10 pb-40 pt-14 md:grid-cols-[1.35fr_1fr] md:pb-44`}>
        <div>
          <p className={eyebrow}>Cafe &amp; Restro · Jaipur</p>
          <h1 className="display mt-5 text-[clamp(4.6rem,17vw,11.5rem)] leading-[0.88]">
            <span className="block"><SplitText text="Coffee," /></span>
            <span className="block"><SplitText text="food &" delay={240} /></span>
            <span className="block text-gold"><SplitText text="friends." delay={480} /></span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Platter is an all-day cafe and restro at Rajasthan International Centre. Fresh coffee, breakfast, pizza, pasta and Indian mains, every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic><Link href="/menu" className={primary}>See the menu →</Link></Magnetic>
            <Magnetic><Link href="/location" className={ghost}>Plan your visit</Link></Magnetic>
          </div>
        </div>
        {!heroVideo && (
          <div className="relative mx-auto hidden w-full max-w-sm md:block">
            <CoffeeHero className="aspect-[4/5] w-full border border-border bg-sand" />
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border bg-background/80 backdrop-blur-sm">
        <ul className={`${wrap} grid grid-cols-3`}>
          {tiles.map((t) => (
            <li key={t.n} className="border-r border-border last:border-r-0">
              <Link href={t.href} className="group flex items-center gap-3 px-2 py-3 md:gap-4 md:px-4">
                <span className="relative hidden h-14 w-14 shrink-0 overflow-hidden bg-sand sm:block md:h-16 md:w-16">
                  {t.img && <Image src={t.img} alt="" fill sizes="64px" className="object-cover transition duration-500 group-hover:scale-110" />}
                </span>
                <span>
                  <span className={`${num} block text-base`}>{t.n}</span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] md:text-sm">{t.t}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Intro() {
  const items = [
    ["The room", pic(0)], ["Coffee corner", pic(2)], ["A quiet table", pic(4)], ["Evening light", pic(6)], ["Along the wall", pic(8)], ["Come as you are", pic(10)],
  ] as const;
  return (
    <section className={`${wrap} grid gap-12 py-24 md:grid-cols-[1fr_1.1fr]`}>
      <Reveal>
        <p className={eyebrow}>At Rajasthan International Centre</p>
        <h2 className={h2}>Everyday food, <em>proper coffee.</em></h2>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          One menu for every part of the day: a cup of chai at 11, a pizza with friends at 3, a full Indian dinner at 9. Dishes are cooked to order, and vegetarian and non-vegetarian plates are clearly marked.
        </p>
        <Link href="/about" className={`${ghost} mt-8`}>Our story</Link>
      </Reveal>
      <ul className="grid grid-cols-3 gap-px bg-border">
        {items.map(([cap, g], i) => (
          <li key={cap} className="group bg-background">
            <Reveal delay={i * 0.05}>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image src={g.url} alt={cap} fill sizes="(min-width: 768px) 20vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]"><span className="text-gold">0{i + 1}</span> {cap}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

const steps = [
  ["Pick a table", "Walk in, sit anywhere you like and take your time with the menu."],
  ["Choose", "Coffee, breakfast, pizza, pasta, Chinese, tandoori and Indian mains. Veg and non-veg are marked."],
  ["Made to order", "Every plate is cooked when you order it, so it reaches you hot and fresh."],
  ["Enjoy", "Stay for one cup or a long meal with friends. Dine in or take it away."],
];

function Journey() {
  return (
    <section className="border-y border-border bg-sand">
      <div className={`${wrap} py-24`}>
        <Reveal>
          <p className={eyebrow}>From table to plate</p>
          <h2 className={h2}>How it <em>works</em></h2>
        </Reveal>
        <ol className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-sand p-6 md:p-8">
              <Reveal delay={i * 0.08}>
                <span className="display block text-6xl text-gold md:text-7xl">0{i + 1}</span>
                <h3 className="display mt-6 text-3xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const counter: [slug: string, title: string, text: string][] = [
  ["hot-coffee", "Hot coffee", "Espresso, americano, cappuccino, latte, flat white and mocha."],
  ["cold-brew", "Cold brew & iced", "Cold cups for long Jaipur afternoons."],
  ["shakes", "Shakes & frappes", "Chocolate, Nutella, Biscoff, Oreo and more."],
  ["breakfast", "Breakfast", "Poha, parathas, dosa, uttapam, toast and eggs."],
  ["pizzas", "Pizzas", "Margherita, paneer tikka, fungi and four cheese."],
  ["main-course", "Indian mains", "Dal, paneer, kofta and curries with fresh breads and rice."],
  ["desserts", "Desserts", "Brownies, waffles, kulfi and gulab jamun."],
];

function Counter() {
  return (
    <section className={`${wrap} py-24`}>
      <Reveal>
        <p className={eyebrow}>The menu, by section</p>
        <h2 className={h2}>On the <em>counter</em></h2>
      </Reveal>
      <ol className="mt-12 border-t border-border">
        {counter.map(([slug, title, text], i) => {
          const c = cat(slug);
          return (
            <li key={slug} className="border-b border-border">
              <Link href={`/menu#${slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:gap-8 md:py-6">
                <span className="display text-3xl text-gold md:text-5xl">0{i + 1}</span>
                <span>
                  <span className="display block text-3xl leading-none transition group-hover:text-gold md:text-6xl">{title}</span>
                  <span className="mt-2 block max-w-lg text-sm text-muted">{text}</span>
                </span>
                <span className="relative h-20 w-20 overflow-hidden bg-sand md:h-32 md:w-44">
                  {c?.image && <Image src={c.image.url} alt="" fill sizes="176px" className="object-cover transition duration-700 group-hover:scale-110" />}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="mt-10"><Link href="/menu" className={primary}>See the full menu →</Link></div>
    </section>
  );
}

function Gallery() {
  const shots = gallery.slice(0, 8);
  return (
    <section className="border-t border-border">
      <div className={`${wrap} py-24`}>
        <Reveal>
          <p className={eyebrow}>Inside Platter</p>
          <h2 className={h2}>Come sit <em>with us</em></h2>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {shots.map((g, i) => (
            <li key={g.url} className="group bg-background">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image src={g.url} alt="Inside Platter" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" priority={i < 2} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const faq = [
  ["When are you open?", `Every day, ${formatTime(hours.open)} to ${formatTime(hours.close)}. There is no weekly off.`],
  ["Where is Platter?", "Platter 9, Lower Ground Floor, Rajasthan International Centre, Sansthan Path, JLN Marg, Jaipur."],
  ["Do you have vegetarian food?", "Yes. Vegetarian and non-vegetarian dishes are marked on every menu card."],
  ["Is takeaway available?", "Yes. You can dine in or take your order away."],
  ["Can I book a table for a group?", "For bigger groups, please call or WhatsApp us first so we can keep a table ready."],
];

function Faq() {
  return (
    <section className="border-t border-border bg-sand">
      <div className={`${wrap} grid gap-10 py-24 md:grid-cols-[1fr_1.4fr]`}>
        <Reveal>
          <p className={eyebrow}>Good to know</p>
          <h2 className={h2}>Questions, <em>answered</em></h2>
        </Reveal>
        <div className="border-t border-border">
          {faq.map(([q, a], i) => (
            <details key={q} className="group border-b border-border py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 text-lg font-semibold">
                <span className={num}>0{i + 1}</span>
                <span className="flex-1">{q}</span>
                <span aria-hidden className="text-2xl text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-10 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const lines = ["Platter 9, Lower Ground Floor", "Rajasthan International Centre", "Sansthan Path, JLN Marg", "Jhalana Doongri, Jaipur 302017"];
  return (
    <section className={`${wrap} grid gap-12 py-24 md:grid-cols-2`}>
      <Reveal>
        <p className={eyebrow}>Find us</p>
        <h2 className={h2}>Come in <em>for a cup</em></h2>
        <ol className="mt-8 space-y-1">
          {lines.map((l, i) => (
            <li key={l} className="flex items-baseline gap-4 border-b border-border py-3 text-lg">
              <span className={num}>0{i + 1}</span>{l}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-muted">Every day, {formatTime(hours.open)} to {formatTime(hours.close)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={primary}>Get directions</a>
          <a href={telHref(contact.phone)} className={ghost}>Call {contact.phone.replace("+91", "+91 ")}</a>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <iframe title="Platter on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border border-border md:h-full md:min-h-96" src={`https://www.google.com/maps?q=${encodeURIComponent("Rajasthan International Centre, JLN Marg, Jaipur")}&output=embed`} />
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Journey />
      <Counter />
      <Gallery />
      <Faq />
      <Visit />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Beans, CoffeeHero, SplitText } from "@/components/fx/fx";
import { Magnetic } from "@/components/fx/fx-client";
import { Reveal } from "@/components/motion";
import { contact, gallery, heroVideo, hours, menu } from "@/data/site";
import { telHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";

const wrap = "mx-auto w-full max-w-6xl px-4";
const eyebrow = "text-sm font-medium text-gold";
const h2 = "display mt-3 text-5xl md:text-7xl";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-foreground active:scale-[0.98]";
const ghost = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-foreground/40 px-7 text-sm font-semibold transition hover:bg-foreground/10 active:scale-[0.98]";

const cat = (slug: string) => menu.find((c) => c.slug === slug);
const pic = (i: number) => gallery[i % gallery.length];

function Hero() {
  const tiles = [
    { t: "The menu", href: "/menu", img: cat("breakfast")?.image?.url },
    { t: "Coffee & shakes", href: "/menu#hot-coffee", img: cat("hot-coffee")?.image?.url },
    { t: "Visit us", href: "/location", img: pic(1)?.url },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      {/* Video part is pending: set heroVideo in src/data/site.ts and it plays here behind the headline. */}
      {heroVideo ? (
        <video className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" src={heroVideo} autoPlay muted loop playsInline aria-hidden />
      ) : (
        <Beans count={6} />
      )}
      <div className={`${wrap} relative grid min-h-[calc(100svh-9rem)] items-center gap-10 pb-40 pt-8 md:grid-cols-[1.35fr_1fr] md:pb-44`}>
        <div>
          <p className={eyebrow}>Cafe &amp; Restro · Jaipur</p>
          <h1 className="display mt-5 text-[clamp(4rem,14vw,9rem)] leading-[0.9]">
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
            <CoffeeHero className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-sand" />
          </div>
        )}
      </div>
      <div className="absolute inset-x-4 bottom-4 z-10 mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur md:bottom-6">
        <ul className="grid grid-cols-3">
          {tiles.map((t) => (
            <li key={t.t} className="border-r border-border last:border-r-0">
              <Link href={t.href} className="group flex items-center gap-3 px-2 py-3 md:gap-4 md:px-4">
                <span className="relative hidden h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand sm:block md:h-16 md:w-16">
                  {t.img && <Image src={t.img} alt="" fill sizes="64px" className="object-cover transition duration-500 group-hover:scale-110" />}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.t}</span>
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
      <ul className="grid grid-cols-3 gap-3">
        {items.map(([cap, g], i) => (
          <li key={cap} className="group overflow-hidden rounded-2xl bg-surface">
            <Reveal delay={i * 0.05}>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image src={g.url} alt={cap} fill sizes="(min-width: 768px) 20vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="px-3 py-2 text-xs font-medium">{cap}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const steps: [string, string, string][] = [
  ["Pick a table", "Walk in, sit anywhere you like and take your time with the menu.", "M8 20h32M12 20v18M36 20v18M16 20c0-6 4-10 8-10s8 4 8 10"],
  ["Choose", "Coffee, breakfast, pizza, pasta, Chinese, tandoori and Indian mains. Veg and non-veg are marked.", "M14 6h20v36H14zM19 14h10M19 21h10M19 28h6"],
  ["Made to order", "Every plate is cooked when you order it, so it reaches you hot and fresh.", "M24 6c4 6 8 9 8 15a8 8 0 0 1-16 0c0-3 2-5 4-7 1 3 2 4 4 4-1-4-1-8 0-12zM14 42h20"],
  ["Enjoy", "Stay for one cup or a long meal with friends. Dine in or take it away.", "M10 18h24v10a10 10 0 0 1-10 10 10 10 0 0 1-14-10zM34 20h4a4 4 0 0 1 0 8h-4M16 6c-2 3 2 4 0 8M22 6c-2 3 2 4 0 8"],
];

function Journey() {
  return (
    <section className="relative border-y border-border bg-sand">
      <div className={`${wrap} py-24`}>
        <Reveal className="text-center">
          <p className={eyebrow}>From table to plate</p>
          <h2 className={h2}>How it <em>works</em></h2>
        </Reveal>
        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden className="journey-line absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-gold/40 lg:block" />
          {steps.map(([t, d, icon], i) => (
            <li key={t} className="relative text-center">
              <Reveal delay={i * 0.12}>
                <span className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/60 bg-sand text-gold transition duration-500 hover:scale-110 hover:bg-gold hover:text-espresso"><Icon d={icon} /></span>
                <h3 className="display mt-6 text-3xl">{t}</h3>
                <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{d}</p>
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
        {counter.map(([slug, title, text]) => {
          const c = cat(slug);
          return (
            <li key={slug} className="border-b border-border">
              <Link href={`/menu#${slug}`} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5 md:gap-8 md:py-6">
                <span>
                  <span className="display block text-3xl leading-none transition group-hover:text-gold md:text-6xl">{title}</span>
                  <span className="mt-2 block max-w-lg text-sm text-muted">{text}</span>
                </span>
                <span className="relative h-20 w-20 overflow-hidden rounded-full bg-sand md:h-28 md:w-28">
                  {c?.image && <Image src={c.image.url} alt="" fill sizes="112px" className="object-cover transition duration-700 group-hover:scale-110" />}
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
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {shots.map((g, i) => (
            <li key={g.url} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
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
  ["Where is Platter?", "Platter Cafe, Lower Ground Floor, Rajasthan International Centre, Sansthan Path, JLN Marg, Jaipur."],
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
          {faq.map(([q, a]) => (
            <details key={q} className="group border-b border-border py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 text-lg font-semibold">
                <span className="flex-1">{q}</span>
                <span aria-hidden className="text-2xl text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-xl text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const lines = ["Platter Cafe, Lower Ground Floor", "Rajasthan International Centre", "Sansthan Path, JLN Marg", "Jhalana Doongri, Jaipur 302017"];
  return (
    <section className={`${wrap} grid gap-12 py-24 md:grid-cols-2`}>
      <Reveal>
        <p className={eyebrow}>Find us</p>
        <h2 className={h2}>Come in <em>for a cup</em></h2>
        <ol className="mt-8 space-y-1">
          {lines.map((l) => (
            <li key={l} className="flex items-baseline gap-4 border-b border-border py-3 text-lg">
              {l}
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
        <iframe title="Platter on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full overflow-hidden rounded-2xl border border-border md:h-full md:min-h-96" src={`https://www.google.com/maps?q=${encodeURIComponent("Rajasthan International Centre, JLN Marg, Jaipur")}&output=embed`} />
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

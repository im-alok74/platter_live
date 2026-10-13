import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wave } from "@/components/fx/fx";
import { CountUp } from "@/components/fx/fx-client";
import { ArrowIcon, ClockIcon, CoffeeIcon, FlameIcon, UtensilsIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/page-header";
import { gallery, hours, legal, menu } from "@/data/site";
import { formatTime } from "@/lib/hours";

export const metadata: Metadata = {
  title: "About",
  description: "Platter is a cafe and restro at Rajasthan International Centre, Jhalana, Jaipur. Coffee, breakfast, pizza, pasta, Indian mains and desserts, every day.",
  alternates: { canonical: "/about" },
};

const wrap = "mx-auto w-full max-w-6xl px-4";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-brand-foreground shadow-card transition hover:brightness-110 active:scale-95";

const values = [
  { Icon: CoffeeIcon, title: "Coffee first", text: "From a quick espresso to cold brews, frappes and shakes. The coffee counter is where Platter started and where many of our regulars begin." },
  { Icon: UtensilsIcon, title: "A menu for every mood", text: "Breakfast, pizza, pasta, Chinese, tandoori starters, Indian mains and desserts. Vegetarian and non-vegetarian dishes are clearly marked." },
  { Icon: FlameIcon, title: "Made fresh to order", text: "Dishes are cooked when you order them, so a table of friends can each have something different and still eat together." },
  { Icon: ClockIcon, title: "Open all day", text: `Walk in any day of the week between ${formatTime(hours.open)} and ${formatTime(hours.close)}. No weekly off.` },
];

export default function About() {
  const dishes = menu.reduce((n, c) => n + c.items.length, 0);
  const stats = [{ n: dishes, label: "dishes" }, { n: menu.length, label: "menu sections" }, { n: 7, label: "days a week" }];
  return (
    <main>
      <PageHeader eyebrow="Our story" title="About Platter">A cafe and restro in the heart of Jhalana, Jaipur, for coffee, long meals and easy conversations.</PageHeader>

      <section className={`${wrap} grid items-center gap-10 pt-16 md:grid-cols-2`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">Who we are</p>
          <h2 className="display mt-2 text-4xl leading-[1.02] md:text-6xl">Good food, <em className="text-brand">no fuss.</em></h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            <p>Platter is a cafe and restaurant on the lower ground floor of the Rajasthan International Centre on JLN Marg. We started with a simple idea: one place where you can have a coffee at 11 in the morning, a pizza with friends in the afternoon and a full Indian dinner at night.</p>
            <p>Our menu runs from breakfast classics like poha, parathas and dosa to pastas, pizzas, Chinese, kebabs, curries, biryani and desserts. Whatever you are craving, there is probably a plate for it.</p>
          </div>
          <Link href="/menu" className={`${primary} mt-8`}>Explore the menu <ArrowIcon width={20} height={20} /></Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {gallery.slice(0, 4).map((g, i) => (
              <div key={g.url} className={`tilt relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-sand ${i % 2 ? "mt-8" : ""}`}>
                <Image src={g.url} alt="Inside Platter" fill sizes="(min-width: 768px) 25vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-20 bg-sand py-16">
        <div className={wrap}>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">What we care about</p>
            <h2 className="display mt-2 text-4xl md:text-6xl">The Platter way</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.08} className="h-full rounded-3xl border border-border bg-surface p-6 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand"><Icon width={26} height={26} /></span>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand text-brand-foreground">
        <Wave className="-mb-px text-sand" />
        <ul className={`${wrap} grid grid-cols-3 gap-6 py-14`}>
          {stats.map((x) => (
            <li key={x.label}>
              <CountUp to={x.n} className="display block text-6xl leading-none md:text-8xl" />
              <span className="mt-2 block text-sm font-medium opacity-90">{x.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${wrap} pt-16`}>
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface p-6 text-sm leading-relaxed text-muted shadow-card md:p-8">
            <h2 className="font-display text-2xl text-foreground">The details</h2>
            <p className="mt-3">Platter Cafe &amp; Restro is {legal.tagline.toLowerCase()}. FSSAI Lic. No. {legal.fssai}. GST {legal.gst_number}.</p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

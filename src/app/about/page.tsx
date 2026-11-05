import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/fx/fx-client";
import { ArrowIcon } from "@/components/icons";
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
const eyebrow = "text-xs font-semibold uppercase tracking-[0.3em] text-gold";
const primary = "inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-7 text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground transition hover:bg-foreground active:scale-[0.98]";

const values = [
  { title: "Coffee first", text: "From a quick espresso to cold brews, frappes and shakes. The coffee counter is where Platter started and where many of our regulars begin." },
  { title: "A menu for every mood", text: "Breakfast, pizza, pasta, Chinese, tandoori starters, Indian mains and desserts. Vegetarian and non-vegetarian dishes are clearly marked." },
  { title: "Made fresh to order", text: "Dishes are cooked when you order them, so a table of friends can each have something different and still eat together." },
  { title: "Open all day", text: `Walk in any day of the week between ${formatTime(hours.open)} and ${formatTime(hours.close)}. No weekly off.` },
];

export default function About() {
  const dishes = menu.reduce((n, c) => n + c.items.length, 0);
  const stats = [{ n: dishes, label: "dishes" }, { n: menu.length, label: "menu sections" }, { n: 7, label: "days a week" }];
  return (
    <main>
      <PageHeader eyebrow="Our story" title="About Platter">A cafe and restro in Jaipur, for coffee, long meals and easy conversations.</PageHeader>

      <section className={`${wrap} grid items-center gap-12 py-16 md:grid-cols-2 md:py-24`}>
        <Reveal>
          <p className={eyebrow}>Who we are</p>
          <h2 className="display mt-3 text-5xl leading-[0.95] md:text-7xl">Good food, <em>no fuss.</em></h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>Platter is a cafe and restaurant on the lower ground floor of the Rajasthan International Centre on JLN Marg. We started with a simple idea: one place where you can have a coffee at 11 in the morning, a pizza with friends in the afternoon and a full Indian dinner at night.</p>
            <p>Our menu runs from breakfast classics like poha, parathas and dosa to pastas, pizzas, Chinese, kebabs, curries, biryani and desserts. Whatever you are craving, there is probably a plate for it.</p>
          </div>
          <Link href="/menu" className={`${primary} mt-8`}>Explore the menu <ArrowIcon width={20} height={20} /></Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {gallery.slice(0, 4).map((g, i) => (
              <div key={g.url} className={`relative aspect-[3/4] overflow-hidden border border-border bg-sand ${i % 2 ? "mt-8" : ""}`}>
                <Image src={g.url} alt="Inside Platter" fill sizes="(min-width: 768px) 25vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className={`${wrap} py-16 md:py-24`}>
          <Reveal>
            <p className={eyebrow}>What we care about</p>
            <h2 className="display mt-3 text-5xl md:text-7xl">The Platter <em>way</em></h2>
          </Reveal>
          <ol className="mt-12 border-t border-border">
            {values.map(({ title, text }, i) => (
              <li key={title}>
                <Reveal className="grid gap-3 border-b border-border py-8 md:grid-cols-[6rem_1fr_1.2fr] md:gap-8">
                  <span className="display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display text-3xl md:text-4xl">{title}</h3>
                  <p className="leading-relaxed text-muted">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-espresso">
        <ul className={`${wrap} grid grid-cols-3`}>
          {stats.map((x, i) => (
            <li key={x.label} className={`px-2 py-10 text-center md:py-16 ${i ? "border-l border-border" : ""}`}>
              <CountUp to={x.n} className="display block text-5xl leading-none text-gold md:text-8xl" />
              <span className="mt-3 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted md:text-sm">{x.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border">
        <div className={`${wrap} py-16 md:py-24`}>
          <Reveal>
            <p className={eyebrow}>On the menu</p>
            <h2 className="display mt-3 text-5xl md:text-7xl">What is <em>on the menu</em></h2>
          </Reveal>
          <ul className="mt-10 border-t border-border">
            {menu.slice(0, 8).map((c) => (
              <li key={c.slug} className="border-b border-border">
                <Link href={`/menu#${c.slug}`} className="display flex min-h-14 items-center justify-between gap-4 py-3 text-3xl transition hover:pl-3 hover:text-gold md:text-5xl">
                  {c.name}
                  <ArrowIcon width={24} height={24} className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-espresso">
        <div className={`${wrap} py-16 text-center md:py-24`}>
          <Reveal>
            <h2 className="display text-5xl md:text-7xl">Hungry? <em>Come hungry.</em></h2>
            <Link href="/menu" className={`${primary} mt-8`}>See the menu</Link>
            <p className="mx-auto mt-12 max-w-xl text-xs leading-relaxed text-muted">Platter Cafe &amp; Restro is {legal.tagline.toLowerCase()}. FSSAI Lic. No. {legal.fssai}. GST {legal.gst_number}.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

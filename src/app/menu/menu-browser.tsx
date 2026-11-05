"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { DishPhoto } from "@/components/dish-photo";
import { formatPrice } from "@/lib/format";
import type { MenuCategory, MenuItem } from "@/data/site";

function VegMark({ veg }: { veg: boolean }) {
  const c = veg ? "border-veg" : "border-nonveg";
  return (
    <span role="img" aria-label={veg ? "Vegetarian" : "Non-vegetarian"} className={`inline-flex h-4 w-4 shrink-0 items-center justify-center border-[1.5px] ${c}`}>
      <span className={`h-2 w-2 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

const CameraIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" />
  </svg>
);

/** Letters rise out of a mask one by one, like a title card. */
function RiseTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`title-rise inline-flex overflow-hidden pb-[0.06em] ${className}`} aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden style={{ animationDelay: `${i * 55}ms` }}>{c === " " ? " " : c}</span>
      ))}
    </span>
  );
}

const PLATES: { slug: string; cls: string; style: Record<string, string> }[] = [
  { slug: "breakfast", cls: "left-[-1%] top-[8%] h-32 w-32 lg:h-40 lg:w-40", style: { "--dx": "14px", "--dy": "-16px", "--t": "9s" } },
  { slug: "hot-coffee", cls: "right-[3%] top-[6%] h-28 w-28 lg:h-36 lg:w-36", style: { "--dx": "-12px", "--dy": "16px", "--dr": "-5deg", "--t": "11s", "--delay": "-3s" } },
  { slug: "pizzas", cls: "left-[4%] bottom-[10%] h-24 w-24 lg:h-28 lg:w-28", style: { "--dx": "10px", "--dy": "14px", "--t": "8s", "--delay": "-2s" } },
  { slug: "desserts", cls: "right-[7%] bottom-[6%] h-28 w-28 lg:h-32 lg:w-32", style: { "--dx": "-14px", "--dy": "-12px", "--t": "10s", "--delay": "-5s" } },
  { slug: "shakes", cls: "left-[34%] top-[2%] hidden h-16 w-16 md:block", style: { "--dx": "8px", "--dy": "12px", "--t": "7s", "--delay": "-1s" } },
  { slug: "main-course", cls: "right-[30%] bottom-[2%] hidden h-20 w-20 md:block", style: { "--dx": "-8px", "--dy": "-12px", "--t": "9.5s", "--delay": "-4s" } },
];

function Plate({ item, onOpen }: { item: MenuItem; onOpen: (i: MenuItem) => void }) {
  return (
    <span className="group/plate relative block h-24 w-24 shrink-0">
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View ${item.name}`}
        className="relative block h-24 w-24 overflow-hidden rounded-full border border-foreground/25 bg-sand outline-offset-4 transition duration-500 group-hover/plate:scale-95 focus-visible:scale-95"
      >
        <DishPhoto name={item.name} image={item.image} sizes="96px" label={false} />
      </button>
      <span aria-hidden className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background"><CameraIcon /></span>
      {/* Rolling the cursor over the plate opens the photo. */}
      {item.image && (
        <span aria-hidden className="pointer-events-none absolute left-0 top-0 z-30 h-64 w-64 origin-top-left scale-[0.375] overflow-hidden rounded-full border-2 border-gold opacity-0 shadow-[0_24px_60px_rgb(0_0_0/0.55)] transition duration-500 ease-out group-hover/plate:scale-100 group-hover/plate:opacity-100 group-focus-within/plate:scale-100 group-focus-within/plate:opacity-100 max-md:hidden">
          <Image src={item.image.url} alt="" fill sizes="256px" className="object-cover" />
        </span>
      )}
    </span>
  );
}

function Dish({ item, onOpen }: { item: MenuItem; onOpen: (i: MenuItem) => void }) {
  const [variantId, setVariantId] = useState<string | null>(item.variants[0]?.id ?? null);
  const price = item.variants.find((v) => v.id === variantId)?.price ?? item.price;
  return (
    <li className={`flex gap-4 ${item.sold_out ? "opacity-60" : ""}`}>
      <Plate item={item} onOpen={onOpen} />
      <div className="min-w-0 flex-1">
        <h4 className="flex items-start gap-2 text-base font-semibold leading-snug"><span>{item.name}</span><span className="mt-1"><VegMark veg={item.is_veg} /></span></h4>
        <p className="font-display text-2xl leading-none text-gold">{formatPrice(price)}{item.sold_out && <span className="ml-2 font-sans text-[10px] font-semibold text-muted">Sold out</span>}</p>
        {item.description && <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">{item.description}</p>}
        {item.badges.length > 0 && <p className="mt-1.5 text-[10px] font-semibold text-gold">{item.badges.join(" · ")}</p>}
        {item.variants.length > 0 && (
          <div role="group" aria-label={`Options for ${item.name}`} className="mt-2 flex flex-wrap gap-1.5">
            {item.variants.map((v) => (
              <button key={v.id} type="button" aria-pressed={variantId === v.id} onClick={() => setVariantId(v.id)} className={`min-h-9 rounded-full border px-3 text-xs font-medium transition ${variantId === v.id ? "border-brand bg-brand text-brand-foreground" : "border-border text-muted hover:text-foreground"}`}>
                {v.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function DishDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      className="dish m-auto w-[min(92vw,56rem)] max-w-none border border-border bg-background p-0 text-foreground"
    >
      {item && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-sand md:aspect-auto md:min-h-[26rem]">
            <DishPhoto name={item.name} image={item.image} sizes="(min-width: 768px) 28rem, 92vw" />
          </div>
          <div className="relative p-6 md:p-10">
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-border text-xl transition hover:bg-foreground hover:text-background">×</button>
            <p className="flex items-center gap-2 text-xs font-semibold text-gold"><VegMark veg={item.is_veg} />{item.is_veg ? "Vegetarian" : "Non-vegetarian"}</p>
            <h3 className="display mt-4 text-4xl md:text-5xl">{item.name}</h3>
            <p className="mt-3 font-display text-4xl text-gold">{formatPrice(item.price)}</p>
            {item.variants.length > 0 && (
              <ul className="mt-4 divide-y divide-border border-y border-border text-sm">
                {item.variants.map((v) => <li key={v.id} className="flex justify-between py-2"><span>{v.name}</span><span className="text-gold">{formatPrice(v.price)}</span></li>)}
              </ul>
            )}
            {item.description && <p className="mt-5 leading-relaxed text-muted">{item.description}</p>}
            {item.ingredients && <p className="mt-4 text-sm leading-relaxed text-muted"><b className="font-semibold text-foreground">Ingredients </b>{item.ingredients}</p>}
            {item.method && <p className="mt-3 text-sm leading-relaxed text-muted"><b className="font-semibold text-foreground">How it is made </b>{item.method}</p>}
          </div>
        </div>
      )}
    </dialog>
  );
}

export function MenuBrowser({ categories, summary }: { categories: MenuCategory[]; summary?: string }) {
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const [open, setOpen] = useState<MenuItem | null>(null);
  const chipRow = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = categories
      .map((c) => ({ ...c, items: c.items.filter((i) => (!vegOnly || i.is_veg) && (!q || i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q))) }))
      .filter((c) => c.items.length > 0);
    // Today's specials also get their own section at the top, like a board by the counter.
    const specials = filtered.flatMap((c) => (c.slug === "favourites" ? [] : c.items)).filter((i) => i.is_special);
    return specials.length ? [{ id: "specials", name: "Today's Special", slug: "specials", image: null, items: specials }, ...filtered] : filtered;
  }, [categories, query, vegOnly]);

  // Scroll-spy: highlight the category nearest the top.
  useEffect(() => {
    const els = shown.map((c) => document.getElementById(c.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-170px 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [shown]);

  useEffect(() => {
    chipRow.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const total = shown.filter((c) => c.slug !== "specials").reduce((n, c) => n + c.items.length, 0);
  const plates = PLATES.map((p) => ({ ...p, url: categories.find((c) => c.slug === p.slug)?.image?.url })).filter((p) => p.url);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-espresso">
        {plates.map((p) => (
          <span key={p.slug} aria-hidden className={`plate absolute ${p.cls}`} style={p.style as React.CSSProperties}>
            <span className="relative block h-full w-full overflow-hidden rounded-full border border-foreground/20 opacity-90">
              <Image src={p.url!} alt="" fill sizes="160px" className="object-cover" />
            </span>
          </span>
        ))}
        <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center md:min-h-[40rem]">
          <p className="flex items-center gap-3 text-xs font-semibold text-muted"><span aria-hidden className="h-px w-8 bg-gold" />From the coffee bar and the kitchen</p>
          <h2 className="display mt-6 text-[clamp(5rem,20vw,15rem)] leading-[0.85]">
            <RiseTitle text="The menu" />
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Coffee and cold brews, breakfast, pizza and pasta, tandoori starters, Indian mains and desserts. {total} dishes, cooked fresh every day.
          </p>
          <a href="#menu-list" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-foreground">Browse the menu <span aria-hidden>↓</span></a>
          {summary && <p className="mt-8 font-serif text-lg italic text-muted">{summary}</p>}
        </div>
      </section>

      <div id="menu-list" className="sticky top-[76px] z-30 mx-auto max-w-6xl scroll-mt-28 px-4 pt-4 md:top-[80px]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div ref={chipRow} className="flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-full border border-border bg-espresso/95 p-1.5 backdrop-blur [scrollbar-width:none]">
            {shown.map((c) => (
              <a
                key={c.id}
                data-slug={c.slug}
                href={`#${c.slug}`}
                aria-current={active === c.slug ? "true" : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center rounded-full px-4 text-sm font-semibold transition ${active === c.slug ? "bg-brand text-brand-foreground" : "text-foreground hover:bg-foreground/10"}`}
              >
                {c.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a dish: latte, pizza, dosa…"
              aria-label="Search the menu"
              className="min-h-12 min-w-0 flex-1 rounded-full border border-border bg-espresso/95 px-5 text-base outline-none backdrop-blur placeholder:text-muted focus:border-gold md:w-72 md:flex-none"
            />
            <label className="flex min-h-12 shrink-0 cursor-pointer items-center gap-2 text-sm font-medium">
              <input type="checkbox" role="switch" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} className="peer sr-only" />
              <span className="relative h-6 w-10 rounded-full bg-border transition-colors peer-checked:bg-veg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
              Veg
            </label>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-28">
        {shown.length === 0 && (
          <div className="py-24 text-center">
            <p className="display text-4xl">Nothing matches that</p>
            <p className="mt-2 text-muted">Try a different word, or clear the filters.</p>
            <button onClick={() => { setQuery(""); setVegOnly(false); }} className="mt-6 min-h-12 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground">Clear filters</button>
          </div>
        )}
        {shown.map((c) => (
          <section key={c.id} id={c.slug} className="scroll-mt-44 pt-14">
            <div className="mb-8 flex items-baseline gap-5">
              <h3 className="font-serif text-4xl italic leading-none md:text-5xl">{c.name}</h3>
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted">{c.items.length} {c.items.length === 1 ? "dish" : "dishes"}</span>
            </div>
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {c.items.map((i) => <Dish key={`${c.id}-${i.id}`} item={i} onOpen={setOpen} />)}
            </ul>
          </section>
        ))}
      </div>
      <DishDialog item={open} onClose={() => setOpen(null)} />
    </>
  );
}

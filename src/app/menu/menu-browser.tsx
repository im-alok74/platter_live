"use client";
import { DishPhoto } from "@/components/dish-photo";
import { SplitText } from "@/components/fx/fx";
import { Reveal } from "@/components/motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import type { MenuCategory, MenuItem } from "@/data/site";

const badgeStyle: Record<string, string> = {
  Bestseller: "bg-brand text-brand-foreground",
  "Must Try": "bg-foreground text-background",
  "Student Favourite": "bg-info text-background",
};

function VegMark({ veg }: { veg: boolean }) {
  const c = veg ? "border-veg" : "border-nonveg";
  return (
    <span role="img" aria-label={veg ? "Vegetarian" : "Non-vegetarian"} className={`inline-flex h-5 w-5 items-center justify-center border-2 bg-surface/90 ${c}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [variantId, setVariantId] = useState<string | null>(item.variants[0]?.id ?? null);
  const variant = item.variants.find((v) => v.id === variantId) ?? null;
  const price = variant?.price ?? item.price;

  const head = (
    <>
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-border">
        <DishPhoto name={item.name} image={item.image} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="transition duration-700 ease-out group-hover:scale-105" />
        <span className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {item.badges.map((b) => (
            <span key={b} className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeStyle[b] ?? "bg-foreground text-background"}`}>{b}</span>
          ))}
        </span>
        <span className="absolute right-2 top-2"><VegMark veg={item.is_veg} /></span>
        {item.sold_out && <span className="absolute inset-0 flex items-center justify-center bg-background/70 text-sm font-semibold uppercase tracking-wide">Sold out</span>}
      </span>
      <span className="block px-3.5 pt-3">
        <span className="block text-base font-semibold leading-snug">{item.name}</span>
        {item.description && <span className="mt-1 line-clamp-2 block text-sm text-muted">{item.description}</span>}
      </span>
      {(item.ingredients || item.method) && (
        <details className="px-3.5 pt-1.5 text-sm">
          <summary className="inline-flex min-h-8 cursor-pointer items-center text-xs font-semibold uppercase tracking-[0.14em] text-gold">Details</summary>
          {item.ingredients && <p className="mt-1 text-muted"><b className="font-semibold text-foreground">Ingredients:</b> {item.ingredients}</p>}
          {item.method && <p className="mt-1 text-muted"><b className="font-semibold text-foreground">Made:</b> {item.method}</p>}
        </details>
      )}
    </>
  );

  const frame = `group flex h-full flex-col overflow-hidden border border-border bg-surface ${item.sold_out ? "opacity-70" : ""}`;
  const inner = (
    <>
        <div>{head}</div>

        <div className="mt-auto px-3.5 pb-3.5 pt-2.5">
          {item.variants.length > 0 && (
            <div role="group" aria-label={`Options for ${item.name}`} className="mb-2 flex flex-wrap gap-1.5">
              {item.variants.map((v) => (
                <button key={v.id} type="button" aria-pressed={variantId === v.id} onClick={() => setVariantId(v.id)} className={`min-h-11 border px-2.5 text-xs font-medium transition active:scale-95 ${variantId === v.id ? "border-brand bg-brand/10 text-brand" : "border-border text-muted"}`}>
                  {v.name}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-xl tabular-nums text-gold">{formatPrice(price)}</span>
          </div>
        </div>
    </>
  );

  return <li><Reveal delay={(index % 4) * 0.06} className={frame}>{inner}</Reveal></li>;
}

export function MenuBrowser({ categories, summary }: { categories: MenuCategory[]; summary?: string }) {
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const chipRow = useRef<HTMLDivElement>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) =>
            (!vegOnly || i.is_veg) &&
            (!q || i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)),
        ),
      }))
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
      { rootMargin: "-130px 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [shown]);

  useEffect(() => {
    chipRow.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const total = shown.filter((c) => c.slug !== "specials" && c.slug !== "favourites").reduce((n, c) => n + c.items.length, 0);

  return (
    <>
      <div className="border-b border-border bg-espresso">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 md:pb-14 md:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Eat &amp; drink</p>
          <h2 className="display mt-3 text-6xl md:text-8xl"><SplitText text="Our menu" /></h2>
          <p className="mt-4 text-sm text-muted">{summary ?? "Pick what you like."} · {total} {total === 1 ? "item" : "items"}</p>
        </div>
      </div>

      <div className="sticky top-[104px] z-30 md:top-[108px] border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 pt-3">
          <div className="flex items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the menu"
              aria-label="Search the menu"
              className="min-h-11 min-w-0 flex-1 rounded-none border border-border bg-surface px-4 text-base outline-none focus:border-brand"
            />
            <label className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 text-sm font-medium">
              <input type="checkbox" role="switch" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} className="peer sr-only" />
              <span className="relative h-6 w-10 bg-border transition-colors peer-checked:bg-veg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:bg-foreground after:transition-transform peer-checked:after:translate-x-4" />
              Veg
            </label>
          </div>
          <div ref={chipRow} className="-mx-4 flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
            {shown.map((c) => (
              <a
                key={c.id}
                data-slug={c.slug}
                href={`#${c.slug}`}
                aria-current={active === c.slug ? "true" : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 border px-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition active:scale-95 ${active === c.slug ? "border-foreground bg-foreground text-background" : "border-border bg-surface"}`}
              >
                {c.name}
                <span className={`text-xs ${active === c.slug ? "opacity-80" : "text-muted"}`}>{c.items.length}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-28">
        {shown.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-xl">Nothing matches that</p>
            <p className="mt-1 text-muted">Try a different word, or clear the filters.</p>
            <button onClick={() => { setQuery(""); setVegOnly(false); }} className="mt-4 min-h-11 bg-brand px-5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-foreground">Clear filters</button>
          </div>
        )}
        {shown.map((c, si) => (
          <section key={c.id} id={c.slug} className="scroll-mt-56 pt-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-display text-xl text-gold">{String(si + 1).padStart(2, "0")}</span>
              <h3 className="display text-3xl">{c.name}</h3>
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted">{c.items.length} {c.items.length === 1 ? "item" : "items"}</span>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {c.items.map((i, n) => (
                <MenuCard key={`${c.id}-${i.id}`} item={i} index={n} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

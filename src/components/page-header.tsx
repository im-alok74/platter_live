import { SplitText } from "@/components/fx/fx";

/** Full-width espresso band at the top of every inner page: eyebrow, huge uppercase title, lead, hairline. */
export function PageHeader({ eyebrow, title, narrow, children }: { eyebrow: string; title: string; narrow?: boolean; children?: React.ReactNode }) {
  return (
    <header className="border-b border-border bg-espresso">
      <div className={`mx-auto w-full ${narrow ? "max-w-2xl" : "max-w-6xl"} px-4 pb-12 pt-14 md:pb-20 md:pt-24`}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h1 className="display mt-4 text-[clamp(3.5rem,14vw,9rem)] leading-[0.9]">
          <SplitText text={title} />
        </h1>
        {children && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{children}</p>}
      </div>
    </header>
  );
}

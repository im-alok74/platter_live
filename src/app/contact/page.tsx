import type { Metadata } from "next";
import { ClockIcon, PinIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PageHeader } from "@/components/page-header";
import { SocialOrbs } from "@/components/social";
import { contact, hours } from "@/data/site";
import { telHref, waHref } from "@/lib/format";
import { formatTime } from "@/lib/hours";
import { MessageForm } from "./message-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, WhatsApp or email Platter Cafe & Restro, Jhalana, Jaipur. Find us on Instagram and Facebook.",
  alternates: { canonical: "/contact" },
};

const wrap = "mx-auto w-full max-w-6xl px-4";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.3em] text-gold";
const ghost = "inline-flex min-h-12 items-center justify-center gap-2 border border-foreground/40 px-7 text-sm font-semibold uppercase tracking-[0.14em] transition hover:bg-foreground/10 active:scale-[0.98]";

const faqs = [
  ["What are your opening hours?", `We are open every day, ${formatTime(hours.open)} to ${formatTime(hours.close)}. No weekly off.`],
  ["Do you take table bookings?", "Walk-ins are welcome. For large groups, please call or WhatsApp us first."],
  ["Is there veg and non-veg?", "Yes. Vegetarian and non-vegetarian dishes are clearly marked on the menu."],
  ["Can I order takeaway?", "Yes, takeaway is available."],
  ["Where exactly are you?", "Platter 9, Lower Ground Floor, Rajasthan International Centre, Sansthan Path, JLN Marg, Jhalana Doongri, Jaipur 302017."],
  ["How do I reach you?", "Call or WhatsApp us on the number above, or send an email. We usually reply fastest on WhatsApp."],
];

export default function Contact() {
  const ways = [
    { title: "Call", text: contact.phone.replace("+91", "+91 "), href: telHref(contact.phone) },
    { title: "WhatsApp", text: "Ask about tables or timings", href: waHref(contact.whatsapp) },
    { title: "Email", text: contact.email, href: `mailto:${contact.email}` },
  ];
  return (
    <main>
      <PageHeader eyebrow="Say hello" title="Contact">Questions, a big booking or just a hello. We usually reply fastest on WhatsApp.</PageHeader>

      <section className="border-b border-border">
        <ul className={`${wrap} grid md:grid-cols-3`}>
          {ways.map(({ title, text, href }, i) => (
            <li key={title} className={i ? "border-t border-border md:border-l md:border-t-0" : ""}>
              <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex h-full min-h-44 flex-col justify-between gap-8 p-6 transition hover:bg-foreground hover:text-background md:p-8">
                <span className="display text-xl text-gold group-hover:text-background">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="display block text-5xl md:text-6xl">{title}</span>
                  <span className="mt-2 block break-words text-sm text-muted group-hover:text-background/70">{text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${wrap} grid gap-12 py-16 md:grid-cols-2 md:py-24`}>
        <Reveal>
          <p className={eyebrow}>Write to us</p>
          <h2 className="display mt-3 text-4xl md:text-6xl">Send a <em>message</em></h2>
          <p className="mb-6 mt-3 text-sm text-muted">It opens in WhatsApp with your message ready to send.</p>
          <MessageForm />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full border border-border bg-espresso p-6 md:p-8">
            <p className={eyebrow}>Visit us</p>
            <p className="mt-6 flex items-start gap-3"><PinIcon className="mt-0.5 shrink-0 text-gold" /><span className="leading-relaxed text-muted">{contact.address}</span></p>
            <p className="mt-4 flex items-start gap-3"><ClockIcon className="mt-0.5 shrink-0 text-gold" /><span className="text-muted">Every day, {formatTime(hours.open)} to {formatTime(hours.close)}</span></p>
            <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className={`${ghost} mt-8`}>Get directions</a>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className={`${wrap} py-16 md:py-24`}>
          <Reveal>
            <p className={eyebrow}>Good to know</p>
            <h2 className="display mt-3 text-5xl md:text-7xl">Quick <em>answers</em></h2>
          </Reveal>
          <div className="mt-10 border-t border-border">
            {faqs.map(([q, a], i) => (
              <details key={q} className="group border-b border-border">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="display text-xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display flex-1 text-xl md:text-3xl">{q}</span>
                  <span className="display text-3xl text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pl-12 leading-relaxed text-muted md:pl-14">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className={`${wrap} pb-8 pt-16 md:pt-24`}>
          <Reveal>
            <p className={eyebrow}>Follow along</p>
            <h2 className="display mt-3 text-5xl md:text-7xl">Find us <em>online</em></h2>
            <SocialOrbs className="mt-8" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

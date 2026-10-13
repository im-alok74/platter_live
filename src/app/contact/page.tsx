import type { Metadata } from "next";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/icons";
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
const card = "flex h-full flex-col justify-between gap-4 rounded-3xl border border-border bg-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-brand";

export default function Contact() {
  const ways = [
    { title: "Call", text: contact.phone.replace("+91", "+91 "), href: telHref(contact.phone), cta: "Call now", Icon: PhoneIcon },
    { title: "WhatsApp", text: "Chat with us, ask about tables or timings", href: waHref(contact.whatsapp), cta: "Open WhatsApp", Icon: PhoneIcon },
    { title: "Email", text: contact.email, href: `mailto:${contact.email}`, cta: "Send email", Icon: PinIcon },
  ];
  return (
    <main>
      <PageHeader eyebrow="Say hello" title="Contact">Questions, a big booking or just a hello. We usually reply fastest on WhatsApp.</PageHeader>

      <section className={`${wrap} pt-12`}>
        <ul className="grid gap-4 md:grid-cols-3">
          {ways.map(({ title, text, href, cta, Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={card}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand"><Icon width={26} height={26} /></span>
                  <span><span className="block text-xl font-semibold">{title}</span><span className="mt-1 block break-words text-sm text-muted">{text}</span></span>
                  <span className="text-sm font-semibold text-brand">{cta} →</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${wrap} grid gap-4 pt-12 md:grid-cols-2`}>
        <Reveal>
          <div className="h-full rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
            <h2 className="font-display text-2xl">Send us a message</h2>
            <p className="mb-5 mt-1 text-sm text-muted">It opens in WhatsApp with your message ready to send.</p>
            <MessageForm />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full space-y-5 rounded-3xl bg-espresso p-6 text-[#fbf6ef] md:p-8">
            <h2 className="font-display text-2xl">Visit us</h2>
            <p className="flex items-start gap-3"><PinIcon className="mt-0.5 shrink-0 text-gold" /><span className="leading-relaxed text-[#d9cbbd]">{contact.address}</span></p>
            <p className="flex items-start gap-3"><ClockIcon className="mt-0.5 shrink-0 text-gold" /><span className="text-[#d9cbbd]">Every day, {formatTime(hours.open)} to {formatTime(hours.close)}</span></p>
            <a href={contact.maps_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border-2 border-[#fbf6ef]/60 px-6 font-semibold transition hover:bg-[#fbf6ef]/10">Get directions</a>
          </div>
        </Reveal>
      </section>

      <section className={`${wrap} pb-4 pt-16`}>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-text">Follow along</p>
          <h2 className="display mt-2 text-4xl md:text-6xl">Find us <em className="text-brand">online.</em></h2>
          <SocialOrbs className="mt-8" />
        </Reveal>
      </section>
    </main>
  );
}

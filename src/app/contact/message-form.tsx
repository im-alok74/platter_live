"use client";
import { useState } from "react";
import { contact } from "@/data/site";
import { waHref } from "@/lib/format";

const field = "min-h-12 w-full border border-border bg-surface px-4 text-base font-normal text-foreground outline-none focus:border-gold";
const label = "block text-sm font-medium text-muted";

/** No server: the message opens in WhatsApp, pre-filled, so the cafe gets it on the number they already use. */
export function MessageForm() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waHref(contact.whatsapp, `Hi Platter, I'm ${name.trim()}. ${text.trim()}`), "_blank", "noopener,noreferrer");
  };
  return (
    <form onSubmit={send} className="space-y-5">
      <label className={label}>Your name
        <input required value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-2 rounded-full`} autoComplete="name" />
      </label>
      <label className={label}>Message
        <textarea required rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Table for 6 on Saturday evening…" className={`${field} mt-2 rounded-3xl py-3`} />
      </label>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition hover:bg-foreground active:scale-[0.98]">Send on WhatsApp</button>
    </form>
  );
}

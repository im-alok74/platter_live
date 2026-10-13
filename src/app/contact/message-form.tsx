"use client";
import { useState } from "react";
import { contact } from "@/data/site";
import { waHref } from "@/lib/format";

const field = "min-h-12 w-full rounded-2xl border border-border bg-background px-4 text-base outline-none focus:border-brand";

/** No server: the message opens in WhatsApp, pre-filled, so the cafe gets it on the number they already use. */
export function MessageForm() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waHref(contact.whatsapp, `Hi Platter, I'm ${name.trim()}. ${text.trim()}`), "_blank", "noopener,noreferrer");
  };
  return (
    <form onSubmit={send} className="space-y-4">
      <label className="block text-sm font-medium">Your name
        <input required value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-1.5`} autoComplete="name" />
      </label>
      <label className="block text-sm font-medium">Message
        <textarea required rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Table for 6 on Saturday evening…" className={`${field} mt-1.5 py-3`} />
      </label>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-brand-foreground shadow-card transition hover:brightness-110 active:scale-95">Send on WhatsApp</button>
    </form>
  );
}

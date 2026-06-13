"use client";

import { useState } from "react";
import { Imambara, MughalArch } from "@/components/Heritage";
import { SectionHeading } from "@/components/SectionHeading";
import { formatINR } from "@/lib/utils";
import { Check, Building2, Package, FileText, Boxes } from "lucide-react";

const TIERS = [
  { name: "Boutique Partner", moq: 25, discount: "15%", note: "For curated retail boutiques" },
  { name: "Wholesale Partner", moq: 100, discount: "30%", note: "For multi-store retailers" },
  { name: "Export Partner", moq: 250, discount: "40%", note: "For international buyers" },
];

export default function BusinessPage() {
  const [form, setForm] = useState({ company: "", contact: "", email: "", gst: "", tier: "Wholesale Partner", qty: "100", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const estTier = TIERS.find((t) => t.name === form.tier)!;
  const qtyNum = parseInt(form.qty) || 0;
  const estValue = qtyNum * 4500; // indicative avg unit value

  return (
    <div>
      <section className="relative overflow-hidden bg-maroon py-20 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-white/[0.05]"><Imambara className="w-full max-w-4xl" /></div>
        <div className="relative px-6">
          <p className="font-deco uppercase tracking-[0.4em] text-gold-light text-sm">For retailers, exporters & boutiques</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Business Partnerships</h1>
          <p className="mt-3 font-deco text-lg italic text-ivory/80">Authentic Awadhi craft, at scale, on your terms.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* value props */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Building2, "Corporate Onboarding", "GST-verified accounts with dedicated relationship managers."],
            [Boxes, "MOQ Flexibility", "From 25-piece boutique runs to 250+ export consignments."],
            [Package, "Private Label", "Your label, our karigars — full white-label production."],
            [FileText, "Quotes & POs", "Request quotations, samples and raise purchase orders."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Building2;
            return (
              <div key={t as string} className="rounded-lg border border-gold/20 bg-ivory p-6">
                <I className="h-7 w-7 text-gold" />
                <h3 className="mt-3 font-display text-lg text-maroon">{t as string}</h3>
                <p className="mt-1 text-sm text-maroon/70">{d as string}</p>
              </div>
            );
          })}
        </div>

        {/* tiers */}
        <div className="mt-16">
          <SectionHeading eyebrow="Partnership tiers" title="Wholesale Pricing" urdu="تھوک قیمتیں" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div key={t.name} className="relative overflow-hidden rounded-lg border border-gold/30 bg-maroon p-6 text-ivory">
                <MughalArch className="absolute right-4 top-4 h-14 text-gold-light/20" />
                <h3 className="font-display text-xl">{t.name}</h3>
                <p className="text-sm text-ivory/70">{t.note}</p>
                <p className="mt-4 font-display text-3xl text-gold-light">{t.discount} <span className="text-base font-normal text-ivory/70">off retail</span></p>
                <p className="mt-2 text-sm">Minimum order: <strong>{t.moq} pieces</strong></p>
                <ul className="mt-4 space-y-1 text-sm">
                  {["Dedicated manager", "Sample request", "Manufacturing tracking", "Net-30 terms"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-ivory/85"><Check className="h-4 w-4 text-gold-light" />{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* inquiry form */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-gold/20 bg-ivory p-6 sm:p-8">
            <h2 className="font-display text-2xl text-maroon">Request a Quotation</h2>
            <p className="text-sm text-maroon/60">Tell us about your business and we&apos;ll respond within two working days.</p>
            {submitted ? (
              <div className="mt-6 rounded-md bg-maroon/10 p-6 text-center">
                <Check className="mx-auto h-10 w-10 text-gold" />
                <p className="mt-2 font-display text-xl text-maroon">Inquiry received</p>
                <p className="text-sm text-maroon/70">Reference #B2B{Date.now().toString().slice(-6)} — our partnerships team will be in touch.</p>
              </div>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Inp label="Company Name" v={form.company} on={set("company")} />
                <Inp label="Contact Person" v={form.contact} on={set("contact")} />
                <Inp label="Business Email" v={form.email} on={set("email")} />
                <Inp label="GST Number" v={form.gst} on={set("gst")} />
                <div>
                  <label className="text-sm text-maroon/70">Partnership Tier</label>
                  <select value={form.tier} onChange={set("tier")} className="mt-1 w-full rounded-md border border-maroon/30 bg-white px-3 py-2.5 text-sm outline-none">
                    {TIERS.map((t) => <option key={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <Inp label="Estimated Quantity" v={form.qty} on={set("qty")} />
                <div className="sm:col-span-2">
                  <label className="text-sm text-maroon/70">Message</label>
                  <textarea value={form.message} onChange={set("message")} rows={3} className="mt-1 w-full rounded-md border border-maroon/30 bg-white px-3 py-2.5 text-sm outline-none" />
                </div>
                <button onClick={() => setSubmitted(true)} className="sm:col-span-2 rounded-md bg-gold py-3 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition">Submit Inquiry</button>
              </div>
            )}
          </div>

          {/* live estimate */}
          <aside className="h-fit rounded-lg border border-gold/20 bg-maroon p-6 text-ivory">
            <h3 className="font-display text-lg">Indicative Estimate</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ivory/70">Tier</dt><dd>{estTier.name}</dd></div>
              <div className="flex justify-between"><dt className="text-ivory/70">MOQ</dt><dd>{estTier.moq} pcs</dd></div>
              <div className="flex justify-between"><dt className="text-ivory/70">Trade discount</dt><dd>{estTier.discount}</dd></div>
              <div className="flex justify-between"><dt className="text-ivory/70">Quantity</dt><dd>{qtyNum} pcs</dd></div>
              <div className="mt-2 flex justify-between border-t border-gold/20 pt-2 font-display text-lg"><dt>Est. order value</dt><dd className="text-gold-light">{formatINR(estValue)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-ivory/50">Indicative only. Final pricing confirmed on quotation.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Inp({ label, v, on }: { label: string; v: string; on: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="text-sm text-maroon/70">{label}</label>
      <input value={v} onChange={on} className="mt-1 w-full rounded-md border border-maroon/30 bg-white px-3 py-2.5 text-sm outline-none focus:border-maroon" />
    </div>
  );
}

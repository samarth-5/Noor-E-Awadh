import { SectionHeading } from "@/components/SectionHeading";
import { RumiDarwaza } from "@/components/Heritage";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata = { title: "Our Boutiques · Noor-e-Awadh" };

const STORES = [
  ["Hazratganj Flagship", "12 Mahatma Gandhi Marg, Hazratganj, Lucknow 226001", "+91 522 400 1100", "10am – 9pm daily"],
  ["Khan Market Atelier", "9 Khan Market, New Delhi 110003", "+91 11 4400 2200", "11am – 8pm daily"],
  ["Bandra Linking Road", "24 Linking Road, Bandra West, Mumbai 400050", "+91 22 4400 3300", "11am – 9pm daily"],
];

export default function BoutiquesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-maroon py-16 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]"><RumiDarwaza className="h-[150%]" /></div>
        <div className="relative px-6">
          <h1 className="font-display text-4xl sm:text-5xl">Our Boutiques</h1>
          <p className="mt-2 font-royal text-gold-light" dir="rtl">ہمارے بوتیک</p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Experience in person" title="Visit a House of Awadh" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STORES.map(([name, addr, phone, hours]) => (
            <div key={name} className="rounded-lg border border-gold/20 bg-ivory p-6">
              <h3 className="font-display text-xl text-maroon">{name}</h3>
              <p className="mt-3 flex items-start gap-2 text-sm text-maroon/70"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{addr}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-maroon/70"><Phone className="h-4 w-4 text-gold" />{phone}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-maroon/70"><Clock className="h-4 w-4 text-gold" />{hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

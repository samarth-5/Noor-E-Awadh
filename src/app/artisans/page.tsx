import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { RumiDarwaza } from "@/components/Heritage";

export const metadata = { title: "Our Artisans · Noor-e-Awadh" };

const ARTISANS = [
  ["Ustad Imran Ali", "Master of Bakhiya shadow work", "45 years at the needle, Imran leads our atelier in Chowk, Lucknow.", "photo-1610030469983-98e550d6193c"],
  ["Razia Begum", "Jaali cutwork specialist", "Razia's jaali is so fine it is mistaken for lace. She trains the next generation of women karigars.", "photo-1594633312681-425c7b97ccd1"],
  ["Mohammad Yusuf", "Zardozi & mukaish", "A third-generation karigar whose metalwork once adorned Nawabi sherwanis.", "photo-1617137968427-85924c800a22"],
];

export default function ArtisansPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-maroon py-16 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]"><RumiDarwaza className="h-[150%]" /></div>
        <div className="relative px-6">
          <p className="font-deco uppercase tracking-[0.4em] text-gold-light text-sm">The hands behind the thread</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Meet Our Artisans</h1>
          <p className="mt-2 font-royal text-lg text-gold-light" dir="rtl">ہمارے کاریگر</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading eyebrow="Karigars of Awadh" title="Keepers of a Living Craft" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {ARTISANS.map(([name, role, bio, img]) => (
            <figure key={name} className="overflow-hidden rounded-lg border border-gold/20 bg-ivory">
              <div className="relative aspect-[4/3]"><Image src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=600&q=80`} alt={name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
              <figcaption className="p-5">
                <h3 className="font-display text-xl text-maroon">{name}</h3>
                <p className="text-sm font-semibold text-gold">{role}</p>
                <p className="mt-2 text-sm text-maroon/70 leading-relaxed">{bio}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-center font-deco text-xl italic text-maroon/70">Not stitched — crafted with heritage.</p>
      </div>
    </div>
  );
}

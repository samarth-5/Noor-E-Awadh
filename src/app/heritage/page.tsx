import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Imambara, RumiDarwaza, MughalArch } from "@/components/Heritage";

export const metadata = { title: "The Heritage · Noor-e-Awadh" };

export default function HeritagePage() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-maroon text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-white/[0.06]"><Imambara className="w-full" /></div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.05]"><RumiDarwaza className="h-[120%]" /></div>
        <div className="relative px-6">
          <p className="font-deco uppercase tracking-[0.4em] text-gold-light text-sm">Lucknow · Awadh</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl">The Heritage</h1>
          <p className="mt-3 font-royal text-xl text-gold-light" dir="rtl" lang="ur">لکھنؤ کی وراثت آپ کے لباس میں</p>
          <p className="mt-2 font-deco text-lg italic text-ivory/80">Lucknow Ki Virasat Aapke Libaas Mein</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading eyebrow="The Origin" title="A Craft Born in the Nawabi Court" urdu="نوابی دربار" />
        <div className="mt-8 space-y-5 font-deco text-lg leading-relaxed text-maroon/85">
          <p>In the 18th century, under the patronage of the Nawabs of Awadh, Lucknow became the beating heart of refinement — a city of poets, courtesans, mehfils and an unhurried elegance the world came to call <em>tehzeeb</em>.</p>
          <p>It was here that <strong>chikankari</strong> — the delicate art of white-on-white shadow embroidery — flourished. Legend traces it to a traveller taught the craft by a Nawabi queen; history records generations of karigars perfecting its thirty-six distinct stitches in the bylanes of Old Lucknow.</p>
          <p>Noor-e-Awadh is our love letter to that legacy. We work directly with the families who have carried these needles for centuries, bringing their work — unhurried, imperfect in the way only the handmade can be — to a new generation.</p>
        </div>
      </article>

      <section className="relative overflow-hidden bg-maroon py-16 text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-white/[0.05]"><Imambara className="w-full max-w-4xl" /></div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gold/30">
            <Image src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80" alt="Heritage architecture" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <MughalArch className="h-16 text-gold-light/50" />
            <h2 className="mt-3 font-display text-3xl">Where Heritage Becomes Luxury</h2>
            <p className="mt-4 font-deco text-lg leading-relaxed text-ivory/85">Every Noor-e-Awadh piece begins as a sketch inspired by the jaali screens of the Imambara, the cusped arches of the Rumi Darwaza, and the floral gardens of forgotten palaces. The architecture of Lucknow lives in the very motifs we embroider.</p>
            <p className="mt-3 font-royal text-gold-light text-lg" dir="rtl">اودھ کی تہذیب ہر بُنائی میں</p>
          </div>
        </div>
      </section>
    </div>
  );
}

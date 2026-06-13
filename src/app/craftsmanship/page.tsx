import { SectionHeading } from "@/components/SectionHeading";
import { Imambara, MughalArch } from "@/components/Heritage";

export const metadata = { title: "Craftsmanship · Noor-e-Awadh" };

const STITCHES = [
  ["Tepchi", "A delicate running stitch that outlines the design."],
  ["Bakhiya", "The signature shadow work, embroidered from the reverse."],
  ["Phanda & Murri", "Tiny knots forming grain-of-rice millet motifs."],
  ["Jaali", "Threads teased apart to create a net without cutting cloth."],
  ["Keel Kangan", "Decorative edging that frames a motif."],
  ["Hool", "A fine eyelet stitch, often the heart of a flower."],
];

export default function CraftsmanshipPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-maroon py-16 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-white/[0.06]"><Imambara className="w-full" /></div>
        <div className="relative px-6">
          <h1 className="font-display text-4xl sm:text-5xl">Craftsmanship</h1>
          <p className="mt-2 font-deco text-lg italic text-ivory/80">The Poetry of Threads</p>
          <p className="mt-1 font-royal text-gold-light" dir="rtl">کاریگری</p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="The 36 stitches" title="The Language of Chikankari" urdu="چکن کاری کی زبان" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STITCHES.map(([name, desc]) => (
            <div key={name} className="rounded-lg border border-gold/20 bg-ivory p-6 text-center">
              <MughalArch className="mx-auto h-14 text-gold/50" />
              <h3 className="mt-2 font-display text-lg text-maroon">{name}</h3>
              <p className="mt-1 text-sm text-maroon/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

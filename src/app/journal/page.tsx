import { SectionHeading } from "@/components/SectionHeading";
import { Imambara } from "@/components/Heritage";

export const metadata = { title: "Journal of Awadh · Noor-e-Awadh" };

const POSTS = [
  ["The Thirty-Six Stitches of Chikankari", "A field guide to the vocabulary of Lucknowi whitework.", "Craft"],
  ["How to Care for Hand Embroidery", "Gentle washing, folding and storage for heirloom pieces.", "Care"],
  ["A Walk Through Old Lucknow", "From Chowk to the Imambara, where our motifs are born.", "Heritage"],
  ["Styling the Nawabi Edit", "Modern ways to wear centuries-old craft.", "Style"],
];

export default function JournalPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-maroon-dark py-16 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-gold/[0.08]"><Imambara className="w-full" /></div>
        <div className="relative px-6">
          <h1 className="font-display text-4xl sm:text-5xl">Journal of Awadh</h1>
          <p className="mt-2 font-royal text-gold-light" dir="rtl">اودھ کا روزنامچہ</p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading eyebrow="Stories & guides" title="From the House of Awadh" />
        <div className="mt-10 space-y-4">
          {POSTS.map(([title, excerpt, tag]) => (
            <article key={title} className="rounded-lg border border-gold/20 bg-ivory p-6 transition hover:border-gold/50">
              <span className="rounded-full bg-maroon/10 px-3 py-1 text-xs font-semibold text-gold">{tag}</span>
              <h2 className="mt-3 font-display text-xl text-maroon">{title}</h2>
              <p className="mt-1 text-sm text-maroon/70">{excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

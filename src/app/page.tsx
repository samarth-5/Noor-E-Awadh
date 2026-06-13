import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { Imambara, RumiDarwaza } from "@/components/Heritage";
import { PRODUCTS, CATEGORIES, REVIEWS } from "@/data/products";
import { Star, MapPin } from "lucide-react";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 8);
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);
  const nawabi = PRODUCTS.filter((p) => p.nawabiEdit).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Categories ribbon */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <SectionHeading eyebrow="The House of Awadh" title="Explore Our Collections" urdu="ہمارے مجموعے" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              href={`/collections?category=${encodeURIComponent(c.name)}`}
              className="group relative overflow-hidden rounded-lg border border-gold/30 bg-ivory p-6 text-center transition hover:border-gold hover:shadow-lg hover:shadow-maroon/5"
            >
              <RumiDarwaza className="mx-auto h-16 text-gold/50 transition group-hover:text-gold" />
              <h3 className="mt-3 font-display text-maroon text-sm">{c.name}</h3>
              <p className="font-royal text-gold text-sm mt-0.5" dir="rtl">{c.urdu}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <SectionHeading eyebrow="Hand-picked" title="Featured Collection" urdu="منتخب لباس" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Nawabi Edit banner */}
      <section className="relative my-16 overflow-hidden bg-maroon py-20 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-ivory/[0.06]">
          <Imambara className="w-full max-w-5xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="font-deco uppercase tracking-[0.4em] text-gold-light text-sm">The Nawabi Edit</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">The Art of Nawabi Elegance</h2>
          <p className="mt-4 font-deco text-xl italic text-ivory/80">Nazakat Se Buna Hua</p>
          <Link href="/collections?edit=nawabi" className="mt-7 inline-block rounded-md bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition">
            Enter the Edit
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {nawabi.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <SectionHeading eyebrow="Most Loved" title="Best Sellers" urdu="مقبول ترین" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Legacy of Lucknow */}
      <section className="relative overflow-hidden bg-maroon-dark py-20 text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.05]">
          <RumiDarwaza className="h-[120%]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="font-deco uppercase tracking-[0.3em] text-gold-light text-sm">Since the courts of Awadh</p>
            <h2 className="mt-3 font-display text-4xl">The Legacy of Lucknow</h2>
            <p className="mt-5 font-deco text-lg leading-relaxed text-ivory/85">
              Born in the shadow of the Bara Imambara and the Rumi Darwaza, chikankari
              was once the pride of the Nawabi court. Each motif — the jaali, the phanda,
              the murri — is a verse in a centuries-old poem written in white thread.
            </p>
            <p className="mt-3 font-royal text-gold-light text-lg" dir="rtl" lang="ur">
              اودھ کی تہذیب ہر بُنائی میں
            </p>
            <Link href="/heritage" className="mt-6 inline-block rounded-md border border-gold-light/60 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-ivory/10 transition">
              Read Our Story
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gold/30">
            <Image src="https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=900&q=80" alt="Lucknowi craftsmanship" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Craftsmanship timeline */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="From thread to heirloom" title="The Craftsmanship Journey" urdu="کاریگری کا سفر" />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Naqsha", "The design is hand-blocked onto fabric using washable indigo.", "نقشہ"],
            ["Tarkashi", "Master karigars embroider each motif by hand over many days.", "ترکشی"],
            ["Dhulai", "The cloth is washed in the Gomti tradition to reveal the whitework.", "دھلائی"],
            ["Taiyaari", "Finishing, pressing and the final inspection before it reaches you.", "تیاری"],
          ].map(([t, d, u], i) => (
            <li key={t} className="relative rounded-lg border border-gold/20 bg-ivory p-5">
              <span className="font-royal text-3xl text-gold/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 font-display text-lg text-maroon">{t}</h3>
              <p className="font-royal text-gold text-sm" dir="rtl">{u}</p>
              <p className="mt-2 text-sm text-maroon/70 leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Business Partnerships */}
      <section className="relative overflow-hidden bg-maroon py-20 text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center text-white/[0.05]">
          <Imambara className="w-full max-w-5xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="font-deco uppercase tracking-[0.3em] text-gold-light text-sm">For retailers, exporters & boutiques</p>
          <h2 className="mt-3 font-display text-4xl">Business Partnerships</h2>
          <p className="mt-4 font-deco text-lg text-ivory/80 leading-relaxed">
            Wholesale, private label and export — built on the same handcrafted standard.
            We work with premium retail houses to bring authentic Awadhi craft to the world.
          </p>
          <Link href="/business" className="mt-7 inline-block rounded-md bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition">
            Explore Partnerships
          </Link>
        </div>
      </section>

      {/* Boutiques */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="Visit us" title="Our Boutiques" urdu="ہمارے بوتیک" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Hazratganj Flagship", "Hazratganj, Lucknow", "The original house, steps from the heart of old Lucknow."],
            ["Khan Market", "New Delhi", "Our capital atelier for bespoke Nawabi couture."],
            ["Bandra Linking Road", "Mumbai", "Coastal flagship bringing Awadh to the west."],
          ].map(([name, loc, desc]) => (
            <div key={name} className="rounded-lg border border-gold/20 bg-ivory p-6">
              <MapPin className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-display text-xl text-maroon">{name}</h3>
              <p className="text-sm font-semibold text-gold">{loc}</p>
              <p className="mt-2 text-sm text-maroon/70">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-maroon-dark py-20 text-ivory">
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading light eyebrow="From our patrons" title="Voices of Awadh" urdu="ہمارے گاہکوں کی آواز" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure key={r.name} className="rounded-lg border border-gold/20 bg-white/5 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-3 font-deco text-lg italic leading-relaxed text-ivory/85">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-gold-light">— {r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

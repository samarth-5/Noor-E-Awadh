"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Star, Truck, RotateCcw, ShieldCheck, Check } from "lucide-react";
import type { Product } from "@/data/types";
import { PRODUCTS, REVIEWS } from "@/data/products";
import { useStore } from "@/store/useStore";
import { ProductCard } from "./../../../components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { MughalArch, Imambara } from "@/components/Heritage";
import { formatINR, cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);

  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));
  const viewProduct = useStore((s) => s.viewProduct);

  useEffect(() => { viewProduct(product.id); }, [product.id, viewProduct]);

  const off = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const handleBuyNow = () => {
    addToCart(product, size, color, qty);
    router.push("/checkout");
  };

  return (
    <div className="relative">
      {/* faded Imambara behind gallery */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden text-maroon/[0.04]">
        <Imambara className="w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <nav className="mb-6 text-sm text-maroon/60">
          <Link href="/" className="hover:text-maroon">Home</Link> /{" "}
          <Link href={`/collections?category=${encodeURIComponent(product.category)}`} className="hover:text-maroon">{product.category}</Link> /{" "}
          <span className="text-maroon">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-gold/20 bg-ivory cursor-zoom-in"
              onClick={() => setZoom((z) => !z)}
            >
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className={cn("object-cover transition-transform duration-500", zoom ? "scale-150" : "scale-100")}
              />
              {off > 0 && <span className="absolute left-4 top-4 rounded bg-maroon px-2.5 py-1 text-xs font-bold text-ivory">{off}% OFF</span>}
            </div>
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={cn("relative h-20 w-16 overflow-hidden rounded border-2 transition", activeImg === i ? "border-gold" : "border-transparent opacity-70")}>
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-deco uppercase tracking-[0.2em] text-sm text-gold">{product.category}</p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl text-maroon">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-maroon/70">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{product.rating}</span>
              <span className="text-maroon/40">·</span>
              <span>{product.reviewCount} reviews</span>
              <span className="text-maroon/40">·</span>
              <span className="font-mono text-xs">{product.sku}</span>
            </div>

            <div className="mt-4 flex items-end gap-3">
              <span className="font-display text-3xl text-maroon">{formatINR(product.price)}</span>
              {off > 0 && <><span className="text-lg text-maroon/40 line-through">{formatINR(product.mrp)}</span><span className="text-sm font-semibold text-gold">Save {off}%</span></>}
            </div>
            <p className="text-xs text-maroon/50">Inclusive of all taxes</p>

            <p className="mt-5 font-deco text-lg leading-relaxed text-maroon/80">{product.description}</p>

            {/* fabric & embroidery */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border border-gold/20 bg-ivory p-3">
                <p className="text-maroon/50">Fabric</p>
                <p className="font-semibold text-maroon">{product.fabric}</p>
              </div>
              <div className="rounded-md border border-gold/20 bg-ivory p-3">
                <p className="text-maroon/50">Embroidery</p>
                <p className="font-semibold text-maroon">{product.embroidery}</p>
              </div>
            </div>

            {/* color */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-maroon">Color: <span className="font-normal">{color}</span></p>
              <div className="mt-2 flex gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={cn("rounded-full border px-3 py-1 text-xs transition", color === c ? "border-maroon bg-maroon text-ivory" : "border-maroon/30 text-maroon hover:border-maroon")}>{c}</button>
                ))}
              </div>
            </div>

            {/* size */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-maroon">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={cn("min-w-[3rem] rounded-md border px-3 py-2 text-sm transition", size === s ? "border-maroon bg-maroon text-ivory" : "border-maroon/30 text-maroon hover:border-maroon")}>{s}</button>
                ))}
              </div>
            </div>

            {/* qty */}
            <div className="mt-4 flex items-center gap-3">
              <p className="text-sm font-semibold text-maroon">Quantity</p>
              <div className="flex items-center rounded-md border border-maroon/30">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-maroon">−</button>
                <span className="w-8 text-center text-maroon">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="px-3 py-1.5 text-maroon">+</button>
              </div>
              {product.stock > 0 && product.stock <= 5 && <span className="text-xs text-maroon">Only {product.stock} left</span>}
            </div>

            {/* actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={cn("flex flex-1 items-center justify-center gap-2 rounded-md py-3.5 text-sm font-semibold uppercase tracking-wider transition", product.stock === 0 ? "cursor-not-allowed bg-maroon/30 text-ivory" : "border border-maroon bg-transparent text-maroon hover:bg-maroon hover:text-ivory")}
              >
                {added ? <><Check className="h-4 w-4" /> Added</> : product.stock === 0 ? "Sold Out" : "Add to Cart"}
              </button>
              <button onClick={handleBuyNow} disabled={product.stock === 0} className="flex-1 rounded-md bg-gold py-3.5 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition disabled:opacity-40">Buy Now</button>
              <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist" className="flex items-center justify-center rounded-md border border-maroon/30 px-4 py-3.5 hover:border-maroon transition">
                <Heart className={cn("h-5 w-5", wished ? "fill-maroon text-maroon" : "text-maroon")} />
              </button>
            </div>

            {/* trust */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-maroon/70">
              <div className="flex flex-col items-center gap-1"><Truck className="h-5 w-5 text-gold" />Free shipping over ₹2,999</div>
              <div className="flex flex-col items-center gap-1"><RotateCcw className="h-5 w-5 text-gold" />7-day returns</div>
              <div className="flex flex-col items-center gap-1"><ShieldCheck className="h-5 w-5 text-gold" />Handcrafted promise</div>
            </div>
          </div>
        </div>

        {/* Craft story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative mt-16 overflow-hidden rounded-xl border border-gold/20 bg-maroon p-8 text-ivory sm:p-12"
        >
          <MughalArch className="absolute right-6 top-6 h-20 text-gold-light/20" />
          <p className="font-deco uppercase tracking-[0.3em] text-gold-light text-sm">The Craft Story</p>
          <h2 className="mt-2 font-display text-2xl">Woven by the hands of Awadh</h2>
          <p className="mt-4 max-w-3xl font-deco text-lg leading-relaxed text-ivory/85">{product.craftStory}</p>
          <p className="mt-3 font-royal text-gold-light" dir="rtl" lang="ur">نزاکت سے بُنا ہوا</p>
        </motion.section>

        {/* Reviews */}
        <section className="mt-16">
          <SectionHeading eyebrow="What patrons say" title="Reviews & Ratings" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => (
              <div key={r.name} className="rounded-lg border border-gold/20 bg-ivory p-5">
                <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <p className="mt-2 font-deco text-maroon/80 italic">“{r.text}”</p>
                <p className="mt-2 text-sm font-semibold text-maroon">— {r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mt-16">
          <SectionHeading eyebrow="You may also love" title="Related Pieces" />
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

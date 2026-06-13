"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { RumiDarwaza } from "@/components/Heritage";

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <div className="relative overflow-hidden bg-maroon py-12 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]">
          <RumiDarwaza className="h-[160%]" />
        </div>
        <div className="relative">
          <h1 className="font-display text-3xl sm:text-4xl">Your Wishlist</h1>
          <p className="mt-1 font-royal text-gold-light" dir="rtl">پسندیدہ</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-maroon/30 py-20 text-center">
            <Heart className="mx-auto h-10 w-10 text-maroon/40" />
            <p className="mt-3 font-display text-xl text-maroon">Nothing saved yet</p>
            <p className="text-sm text-maroon/60">Tap the heart on any piece to keep it here.</p>
            <Link href="/collections" className="mt-5 inline-block rounded-md bg-maroon px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition">Explore Collections</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

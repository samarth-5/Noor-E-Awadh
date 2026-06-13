"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/types";
import { useStore } from "@/store/useStore";
import { formatINR, cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));
  const addToCart = useStore((s) => s.addToCart);

  const off = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ivory">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width:640px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          {off > 0 && (
            <span className="absolute left-3 top-3 rounded bg-maroon px-2 py-1 text-[10px] font-bold tracking-wide text-ivory">
              {off}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="absolute right-3 top-3 rounded bg-gold/90 px-2 py-1 text-[10px] font-bold text-maroon-dark">
              BESTSELLER
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-maroon-dark/55">
              <span className="font-royal tracking-widest text-ivory text-sm">SOLD OUT</span>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label="Toggle wishlist"
        className="absolute right-3 top-3 z-10 rounded-full bg-ivory/90 p-2 shadow transition hover:scale-110 group-[.sold]:hidden"
        style={off > 0 ? { top: "2.75rem" } : undefined}
      >
        <Heart className={cn("h-4 w-4 transition", wished ? "fill-maroon text-maroon" : "text-maroon/70")} />
      </button>

      <div className="mt-3 px-0.5">
        <p className="font-deco text-xs uppercase tracking-wider text-gold">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-0.5 font-display text-[15px] leading-snug text-maroon line-clamp-1 hover:text-maroon-dark">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-maroon/60">
          <Star className="h-3 w-3 fill-gold text-gold" />
          {product.rating} <span className="text-maroon/40">({product.reviewCount})</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-display text-base text-maroon">{formatINR(product.price)}</span>
          {off > 0 && <span className="text-sm text-maroon/40 line-through">{formatINR(product.mrp)}</span>}
        </div>

        {product.stock > 0 && (
          <button
            onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
            className="mt-2 w-full rounded-md border border-maroon/30 py-2 text-xs font-semibold uppercase tracking-wider text-maroon opacity-0 transition-all duration-300 hover:bg-maroon hover:text-ivory group-hover:opacity-100 max-lg:opacity-100"
          >
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
}

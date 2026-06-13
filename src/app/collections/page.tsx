"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { RumiDarwaza } from "@/components/Heritage";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

function CollectionsInner() {
  const params = useSearchParams();
  const initialCat = params.get("category") || "All";
  const q = (params.get("q") || "").toLowerCase();
  const edit = params.get("edit");

  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(70000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (edit === "nawabi") list = list.filter((p) => p.nawabiEdit);
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (q) list = list.filter((p) =>
      (p.name + p.category + p.fabric + p.embroidery).toLowerCase().includes(q)
    );
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.reverse(); break;
    }
    return list;
  }, [category, sort, maxPrice, q, edit]);

  const title = edit === "nawabi" ? "The Nawabi Edit" : category === "All" ? "All Collections" : category;

  return (
    <div className="relative">
      {/* heritage banner */}
      <div className="relative overflow-hidden bg-maroon py-14 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]">
          <RumiDarwaza className="h-[160%]" />
        </div>
        <div className="relative">
          <SectionHeading light eyebrow="The House of Awadh" title={title}
            urdu={edit === "nawabi" ? "شاہی انتخاب" : CATEGORIES.find((c) => c.name === category)?.urdu} />
          {q && <p className="mt-2 text-ivory/70">Results for “{q}”</p>}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {/* controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setShowFilters((v) => !v)} className="flex items-center gap-2 rounded-md border border-maroon/30 px-4 py-2 text-sm text-maroon lg:hidden">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <p className="text-sm text-maroon/60">{filtered.length} pieces</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border border-maroon/30 bg-ivory px-3 py-2 text-sm text-maroon outline-none">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* sidebar */}
          <aside className={cn("space-y-6", showFilters ? "block" : "hidden lg:block")}>
            <div>
              <h3 className="font-display text-maroon mb-2">Category</h3>
              <ul className="space-y-1 text-sm">
                {["All", ...CATEGORIES.map((c) => c.name)].map((c) => (
                  <li key={c}>
                    <button onClick={() => setCategory(c)} className={cn("text-left transition hover:text-maroon", category === c ? "font-semibold text-maroon" : "text-maroon/60")}>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-maroon mb-2">Max Price</h3>
              <input type="range" min={1500} max={70000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-maroon" />
              <p className="text-sm text-maroon/70 mt-1">Up to ₹{maxPrice.toLocaleString("en-IN")}</p>
            </div>
          </aside>

          {/* grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-maroon/30 py-20 text-center">
                <X className="mx-auto h-8 w-8 text-maroon/40" />
                <p className="mt-3 font-display text-lg text-maroon">No pieces match your search</p>
                <p className="text-sm text-maroon/60">Try widening the price or clearing the category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center font-deco text-maroon">Loading the collection…</div>}>
      <CollectionsInner />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";
import { RumiDarwaza } from "@/components/Heritage";
import { formatINR } from "@/lib/utils";
import { Package, Clock } from "lucide-react";

const STEPS = ["Confirmed", "Packed", "Shipped", "Delivered"] as const;

export default function AccountPage() {
  const orders = useStore((s) => s.orders);
  const cancelOrder = useStore((s) => s.cancelOrder);
  const recentlyViewed = useStore((s) => s.recentlyViewed);
  const recent = recentlyViewed.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <div>
      <div className="relative overflow-hidden bg-maroon py-12 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]">
          <RumiDarwaza className="h-[160%]" />
        </div>
        <div className="relative">
          <h1 className="font-display text-3xl sm:text-4xl">My Account</h1>
          <p className="mt-1 font-royal text-gold-light" dir="rtl">میرا کھاتہ</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <h2 className="font-display text-2xl text-maroon">Order History</h2>

        {orders.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-maroon/30 py-16 text-center">
            <Package className="mx-auto h-10 w-10 text-maroon/40" />
            <p className="mt-3 font-display text-lg text-maroon">No orders yet</p>
            <Link href="/collections" className="mt-4 inline-block rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-ivory">Start Shopping</Link>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {orders.map((o) => {
              const stepIdx = STEPS.indexOf(o.status as typeof STEPS[number]);
              const cancelled = o.status === "Cancelled";
              return (
                <div key={o.id} className="rounded-lg border border-gold/20 bg-ivory p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-mono text-sm font-semibold text-maroon">{o.id}</p>
                      <p className="flex items-center gap-1 text-xs text-maroon/50"><Clock className="h-3 w-3" />{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cancelled ? "bg-red-100 text-red-600" : "bg-maroon/10 text-gold"}`}>{o.status}</span>
                  </div>

                  {/* tracker */}
                  {!cancelled && (
                    <div className="mt-4 flex items-center">
                      {STEPS.map((s, i) => (
                        <div key={s} className="flex flex-1 items-center last:flex-none">
                          <div className="flex flex-col items-center">
                            <div className={`h-3 w-3 rounded-full ${i <= stepIdx ? "bg-gold" : "bg-maroon/20"}`} />
                            <span className={`mt-1 text-[10px] ${i <= stepIdx ? "text-maroon" : "text-maroon/40"}`}>{s}</span>
                          </div>
                          {i < STEPS.length - 1 && <div className={`mx-1 h-0.5 flex-1 ${i < stepIdx ? "bg-gold" : "bg-maroon/20"}`} />}
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 border-t border-maroon/10 pt-3">
                    {o.items.map((it, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded">
                          <Image src={it.image} alt={it.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="text-maroon">{it.name}</p>
                          <p className="text-xs text-maroon/50">{it.color} · {it.size} · Qty {it.qty}</p>
                        </div>
                        <span className="text-sm text-maroon">{formatINR(it.price * it.qty)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex items-center justify-between border-t border-maroon/10 pt-3">
                    <span className="font-display text-maroon">Total {formatINR(o.total)}</span>
                    {!cancelled && o.status === "Confirmed" && (
                      <button onClick={() => cancelOrder(o.id)} className="text-sm text-red-500 underline">Cancel order</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {recent.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-maroon">Recently Viewed</h2>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {recent.map((p) => p && (
                <Link key={p.id} href={`/product/${p.slug}`} className="w-32 shrink-0">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image src={p.images[0]} alt={p.name} fill sizes="128px" className="object-cover" />
                  </div>
                  <p className="mt-1 truncate text-xs text-maroon">{p.name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

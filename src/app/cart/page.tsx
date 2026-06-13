"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Tag } from "lucide-react";
import { useStore, keyOf } from "@/store/useStore";
import { RumiDarwaza } from "@/components/Heritage";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const updateQty = useStore((s) => s.updateQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const subtotal = useStore((s) => s.subtotal());
  const discount = useStore((s) => s.discountAmount());
  const shipping = useStore((s) => s.shipping());
  const total = useStore((s) => s.total());
  const coupon = useStore((s) => s.coupon);
  const applyCoupon = useStore((s) => s.applyCoupon);
  const clearCoupon = useStore((s) => s.clearCoupon);

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const apply = () => {
    const r = applyCoupon(code);
    setMsg(r.message);
  };

  return (
    <div>
      <div className="relative overflow-hidden bg-maroon py-12 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]">
          <RumiDarwaza className="h-[160%]" />
        </div>
        <div className="relative">
          <h1 className="font-display text-3xl sm:text-4xl">Your Cart</h1>
          <p className="mt-1 font-royal text-gold-light" dir="rtl">آپ کا تھیلا</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {cart.length === 0 ? (
          <div className="rounded-lg border border-dashed border-maroon/30 py-20 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-maroon/40" />
            <p className="mt-3 font-display text-xl text-maroon">Your cart is empty</p>
            <p className="text-sm text-maroon/60">The threads of Awadh await you.</p>
            <Link href="/collections" className="mt-5 inline-block rounded-md bg-maroon px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition">Explore Collections</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* items */}
            <div className="space-y-4">
              {cart.map((item) => {
                const k = keyOf(item);
                return (
                  <div key={k} className="flex gap-4 rounded-lg border border-gold/20 bg-ivory p-3">
                    <Link href={`/product/${item.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded">
                      <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link href={`/product/${item.slug}`} className="font-display text-maroon hover:text-maroon-dark">{item.name}</Link>
                        <button onClick={() => removeFromCart(k)} aria-label="Remove"><Trash2 className="h-4 w-4 text-maroon/50 hover:text-maroon" /></button>
                      </div>
                      <p className="text-xs text-maroon/60">{item.color} · Size {item.size}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-maroon/30">
                          <button onClick={() => updateQty(k, item.qty - 1)} className="px-2.5 py-1 text-maroon">−</button>
                          <span className="w-7 text-center text-sm text-maroon">{item.qty}</span>
                          <button onClick={() => updateQty(k, item.qty + 1)} className="px-2.5 py-1 text-maroon">+</button>
                        </div>
                        <span className="font-display text-maroon">{formatINR(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* summary */}
            <aside className="h-fit rounded-lg border border-gold/20 bg-ivory p-5">
              <h2 className="font-display text-xl text-maroon">Order Summary</h2>

              {/* coupon */}
              <div className="mt-4">
                {coupon ? (
                  <div className="flex items-center justify-between rounded-md bg-gold/10 px-3 py-2 text-sm">
                    <span className="flex items-center gap-2 text-gold"><Tag className="h-4 w-4" />{coupon} applied</span>
                    <button onClick={() => { clearCoupon(); setMsg(""); }} className="text-maroon/60 underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="w-full rounded-md border border-maroon/30 bg-white px-3 py-2 text-sm outline-none" />
                    <button onClick={apply} className="rounded-md bg-maroon px-4 py-2 text-sm font-semibold text-ivory">Apply</button>
                  </div>
                )}
                {msg && <p className="mt-1.5 text-xs text-maroon/70">{msg}</p>}
                {!coupon && <p className="mt-1 text-xs text-maroon/50">Try AWADH10, NAWABI15, LUCKNOW20</p>}
              </div>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-maroon/70">Subtotal</dt><dd className="text-maroon">{formatINR(subtotal)}</dd></div>
                {discount > 0 && <div className="flex justify-between"><dt className="text-gold">Discount</dt><dd className="text-gold">− {formatINR(discount)}</dd></div>}
                <div className="flex justify-between"><dt className="text-maroon/70">Shipping</dt><dd className="text-maroon">{shipping === 0 ? "Free" : formatINR(shipping)}</dd></div>
                <div className="mt-2 flex justify-between border-t border-maroon/15 pt-2 font-display text-lg"><dt className="text-maroon">Total</dt><dd className="text-maroon">{formatINR(total)}</dd></div>
              </dl>

              <Link href="/checkout" className="mt-5 block rounded-md bg-gold py-3 text-center text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition">
                Proceed to Checkout
              </Link>
              <Link href="/collections" className="mt-2 block text-center text-sm text-maroon/60 underline">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore, type Address } from "@/store/useStore";
import { RumiDarwaza } from "@/components/Heritage";
import { formatINR } from "@/lib/utils";
import { CreditCard, Smartphone, Building2, Wallet, Lock } from "lucide-react";

const EMPTY: Address = { name: "", phone: "", email: "", line1: "", city: "", state: "", pincode: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((s) => s.cart);
  const subtotal = useStore((s) => s.subtotal());
  const discount = useStore((s) => s.discountAmount());
  const shipping = useStore((s) => s.shipping());
  const total = useStore((s) => s.total());
  const placeOrder = useStore((s) => s.placeOrder);

  const [addr, setAddr] = useState<Address>(EMPTY);
  const [pay, setPay] = useState("upi");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="font-display text-xl text-maroon">Your cart is empty.</p>
        <Link href="/collections" className="mt-4 inline-block rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-ivory">Explore Collections</Link>
      </div>
    );
  }

  const set = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => setAddr((a) => ({ ...a, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!addr.name.trim()) e.name = "Enter your name";
    if (!/^\d{10}$/.test(addr.phone)) e.phone = "Enter a 10-digit phone";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(addr.email)) e.email = "Enter a valid email";
    if (!addr.line1.trim()) e.line1 = "Enter your address";
    if (!addr.city.trim()) e.city = "Enter your city";
    if (!addr.state.trim()) e.state = "Enter your state";
    if (!/^\d{6}$/.test(addr.pincode)) e.pincode = "Enter a 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlace = () => {
    if (!validate()) return;
    setProcessing(true);
    // Simulated payment gateway. Swap for Razorpay checkout in production.
    setTimeout(() => {
      const order = placeOrder(addr);
      router.push(`/order-success?id=${order.id}`);
    }, 1400);
  };

  const payOptions = [
    { id: "upi", label: "UPI", icon: Smartphone, note: "GPay, PhonePe, Paytm" },
    { id: "card", label: "Credit / Debit Card", icon: CreditCard, note: "Visa, Mastercard, RuPay" },
    { id: "netbanking", label: "Net Banking", icon: Building2, note: "All major banks" },
    { id: "wallet", label: "Wallets", icon: Wallet, note: "Paytm, Mobikwik" },
  ];

  return (
    <div>
      <div className="relative overflow-hidden bg-maroon py-10 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]">
          <RumiDarwaza className="h-[180%]" />
        </div>
        <h1 className="relative font-display text-3xl">Secure Checkout</h1>
        <p className="relative mt-1 flex items-center justify-center gap-1 text-sm text-ivory/70"><Lock className="h-3 w-3" /> Your details are protected</p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            {/* Address */}
            <section>
              <h2 className="font-display text-xl text-maroon">Delivery Address</h2>
              <p className="text-xs text-maroon/50">Checking out as a guest — no account needed.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" value={addr.name} onChange={set("name")} error={errors.name} />
                <Field label="Phone" value={addr.phone} onChange={set("phone")} error={errors.phone} />
                <Field label="Email" value={addr.email} onChange={set("email")} error={errors.email} className="sm:col-span-2" />
                <Field label="Address" value={addr.line1} onChange={set("line1")} error={errors.line1} className="sm:col-span-2" />
                <Field label="City" value={addr.city} onChange={set("city")} error={errors.city} />
                <Field label="State" value={addr.state} onChange={set("state")} error={errors.state} />
                <Field label="Pincode" value={addr.pincode} onChange={set("pincode")} error={errors.pincode} />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-display text-xl text-maroon">Payment Method</h2>
              <div className="mt-4 space-y-2">
                {payOptions.map((o) => {
                  const Icon = o.icon;
                  return (
                    <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${pay === o.id ? "border-maroon bg-maroon/5" : "border-maroon/20"}`}>
                      <input type="radio" name="pay" checked={pay === o.id} onChange={() => setPay(o.id)} className="accent-maroon" />
                      <Icon className="h-5 w-5 text-gold" />
                      <div>
                        <p className="text-sm font-semibold text-maroon">{o.label}</p>
                        <p className="text-xs text-maroon/50">{o.note}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-maroon/50">Razorpay-ready: connect your keys in production to accept live payments. This build simulates a successful payment.</p>
            </section>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-lg border border-gold/20 bg-ivory p-5">
            <h2 className="font-display text-xl text-maroon">Your Order</h2>
            <ul className="mt-3 max-h-60 space-y-2 overflow-y-auto text-sm">
              {cart.map((i, idx) => (
                <li key={idx} className="flex justify-between gap-2">
                  <span className="text-maroon/80">{i.name} <span className="text-maroon/40">× {i.qty}</span></span>
                  <span className="text-maroon">{formatINR(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-maroon/15 pt-3 text-sm">
              <div className="flex justify-between"><dt className="text-maroon/70">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between text-gold"><dt>Discount</dt><dd>− {formatINR(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-maroon/70">Shipping</dt><dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd></div>
              <div className="flex justify-between border-t border-maroon/15 pt-2 font-display text-lg text-maroon"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
            </dl>
            <button onClick={handlePlace} disabled={processing} className="mt-5 w-full rounded-md bg-gold py-3 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition disabled:opacity-60">
              {processing ? "Processing…" : `Pay ${formatINR(total)}`}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, className = "" }: {
  label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm text-maroon/70">{label}</label>
      <input value={value} onChange={onChange} className={`mt-1 w-full rounded-md border bg-white px-3 py-2.5 text-sm outline-none transition ${error ? "border-red-400" : "border-maroon/30 focus:border-maroon"}`} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

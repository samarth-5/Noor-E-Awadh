"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { formatINR } from "@/lib/utils";
import { CheckCircle2, Download } from "lucide-react";

function SuccessInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const order = useStore((s) => s.orders.find((o) => o.id === id));

  const downloadInvoice = () => {
    if (!order) return;
    const lines = [
      "NOOR-E-AWADH — Tax Invoice",
      "The Radiance of Awadh",
      "================================",
      `Order ID: ${order.id}`,
      `Date: ${new Date(order.date).toLocaleString("en-IN")}`,
      `Customer: ${order.address.name}`,
      `Address: ${order.address.line1}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`,
      "--------------------------------",
      ...order.items.map((i) => `${i.name} (${i.color}/${i.size}) x${i.qty}   ${formatINR(i.price * i.qty)}`),
      "--------------------------------",
      `Subtotal: ${formatINR(order.subtotal)}`,
      `Discount: -${formatINR(order.discount)}`,
      `Shipping: ${order.shipping === 0 ? "Free" : formatINR(order.shipping)}`,
      `TOTAL: ${formatINR(order.total)}`,
      "================================",
      "Har Dhaage Mein Awadh Ki Rooh",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative mx-auto max-w-2xl px-6 py-20 text-center">
      {/* golden animated arch */}
      <motion.svg viewBox="0 0 100 120" className="mx-auto h-32 text-gold"
        initial="hidden" animate="visible" aria-hidden>
        <motion.path d="M15 120 V55 a35 35 0 0 1 70 0 V120"
          fill="none" stroke="currentColor" strokeWidth="2"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 1.4, ease: "easeInOut" }} />
        <motion.path d="M50 20 l5 12 l13 1 l-10 9 l3 13 l-11 -7 l-11 7 l3 -13 l-10 -9 l13 -1z"
          fill="currentColor"
          variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 0.6, scale: 1 } }}
          transition={{ delay: 1.2, duration: 0.5 }} style={{ transformOrigin: "50px 35px" }} />
      </motion.svg>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h1 className="mt-3 font-display text-3xl text-maroon">Your order has become a part of Awadh&apos;s story.</h1>
        <p className="mt-2 font-deco text-lg italic text-maroon/70">Shukriya. We are preparing your handcrafted treasures.</p>

        {order ? (
          <div className="mt-8 rounded-lg border border-gold/20 bg-ivory p-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-maroon/50">Order ID</p>
                <p className="font-mono font-semibold text-maroon">{order.id}</p>
              </div>
              <button onClick={downloadInvoice} className="flex items-center gap-1.5 rounded-md border border-maroon/30 px-3 py-2 text-sm text-maroon hover:bg-maroon hover:text-ivory transition">
                <Download className="h-4 w-4" /> Invoice
              </button>
            </div>
            <ul className="mt-4 space-y-1 border-t border-maroon/10 pt-4 text-sm">
              {order.items.map((i, idx) => (
                <li key={idx} className="flex justify-between"><span className="text-maroon/80">{i.name} × {i.qty}</span><span className="text-maroon">{formatINR(i.price * i.qty)}</span></li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-maroon/10 pt-3 font-display text-lg text-maroon"><span>Total Paid</span><span>{formatINR(order.total)}</span></p>
          </div>
        ) : (
          <p className="mt-6 text-maroon/60">Order details are no longer available in this session.</p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/account" className="rounded-md bg-maroon px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition">Track Order</Link>
          <Link href="/collections" className="rounded-md border border-maroon/30 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-maroon hover:border-maroon transition">Keep Shopping</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-maroon">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { RumiDarwaza } from "@/components/Heritage";
import { formatINR } from "@/lib/utils";
import { LayoutDashboard, Boxes, ScrollText, TrendingUp, Lock } from "lucide-react";

export default function AdminPage() {
  const orders = useStore((s) => s.orders);
  const [tab, setTab] = useState<"overview" | "inventory" | "orders">("overview");
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");

  const stats = useMemo(() => {
    const live = orders.filter((o) => o.status !== "Cancelled");
    const revenue = live.reduce((s, o) => s + o.total, 0);
    const units = live.reduce((s, o) => s + o.items.reduce((n, i) => n + i.qty, 0), 0);
    const counts: Record<string, number> = {};
    live.forEach((o) => o.items.forEach((i) => { counts[i.name] = (counts[i.name] || 0) + i.qty; }));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { revenue, units, orderCount: live.length, top, aov: live.length ? revenue / live.length : 0 };
  }, [orders]);

  if (!authed) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center px-6 py-24 text-center">
        <RumiDarwaza className="h-16 text-gold" />
        <h1 className="mt-4 font-display text-2xl text-maroon">Admin Access</h1>
        <p className="mt-1 text-sm text-maroon/60">Demo panel — enter any password to continue.</p>
        <div className="mt-6 w-full">
          <div className="flex items-center gap-2 rounded-md border border-maroon/30 px-3">
            <Lock className="h-4 w-4 text-maroon/50" />
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" className="w-full bg-transparent py-2.5 text-sm outline-none" />
          </div>
          <button onClick={() => setAuthed(true)} className="mt-3 w-full rounded-md bg-maroon py-3 text-sm font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition">Enter Dashboard</button>
        </div>
      </div>
    );
  }

  const lowStock = PRODUCTS.filter((p) => p.stock <= 5);

  return (
    <div>
      <div className="relative overflow-hidden bg-maroon py-10 text-center text-ivory">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]"><RumiDarwaza className="h-[180%]" /></div>
        <div className="relative">
          <h1 className="font-display text-3xl">Admin Dashboard</h1>
          <p className="mt-1 font-royal text-gold-light" dir="rtl">انتظامیہ</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* tabs */}
        <div className="flex gap-2 border-b border-maroon/15">
          {[["overview", "Overview", LayoutDashboard], ["inventory", "Inventory", Boxes], ["orders", "Orders", ScrollText]].map(([id, label, Icon]) => {
            const I = Icon as typeof Boxes;
            return (
              <button key={id as string} onClick={() => setTab(id as typeof tab)} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${tab === id ? "border-maroon text-maroon" : "border-transparent text-maroon/50"}`}>
                <I className="h-4 w-4" />{label as string}
              </button>
            );
          })}
        </div>

        {tab === "overview" && (
          <div className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Revenue", formatINR(stats.revenue), TrendingUp],
                ["Orders", String(stats.orderCount), ScrollText],
                ["Units Sold", String(stats.units), Boxes],
                ["Avg Order Value", formatINR(Math.round(stats.aov)), TrendingUp],
              ].map(([label, val, Icon]) => {
                const I = Icon as typeof Boxes;
                return (
                  <div key={label as string} className="rounded-lg border border-gold/20 bg-ivory p-5">
                    <I className="h-6 w-6 text-gold" />
                    <p className="mt-2 text-sm text-maroon/60">{label as string}</p>
                    <p className="font-display text-2xl text-maroon">{val as string}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-gold/20 bg-ivory p-5">
                <h3 className="font-display text-lg text-maroon">Top Products</h3>
                {stats.top.length === 0 ? <p className="mt-3 text-sm text-maroon/50">No sales yet. Place an order to see analytics.</p> : (
                  <ul className="mt-3 space-y-2">
                    {stats.top.map(([name, qty]) => (
                      <li key={name} className="flex items-center justify-between text-sm">
                        <span className="text-maroon/80">{name}</span>
                        <span className="font-semibold text-maroon">{qty} sold</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="rounded-lg border border-gold/20 bg-ivory p-5">
                <h3 className="font-display text-lg text-maroon">Catalog by Category</h3>
                <ul className="mt-3 space-y-2">
                  {CATEGORIES.map((c) => (
                    <li key={c.name} className="flex items-center justify-between text-sm">
                      <span className="text-maroon/80">{c.name}</span>
                      <span className="font-semibold text-maroon">{PRODUCTS.filter((p) => p.category === c.name).length} products</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === "inventory" && (
          <div className="mt-6">
            {lowStock.length > 0 && (
              <div className="mb-4 rounded-md bg-maroon/5 px-4 py-3 text-sm text-maroon">
                <strong>{lowStock.length}</strong> products are low or out of stock.
              </div>
            )}
            <div className="overflow-x-auto rounded-lg border border-gold/20">
              <table className="w-full text-sm">
                <thead className="bg-maroon text-ivory">
                  <tr>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">SKU</th>
                    <th className="p-3 text-right">Price</th>
                    <th className="p-3 text-right">Stock</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.id} className="border-t border-maroon/10">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="relative h-10 w-8 overflow-hidden rounded"><Image src={p.images[0]} alt="" fill sizes="32px" className="object-cover" /></div>
                          <span className="text-maroon">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-xs text-maroon/60">{p.sku}</td>
                      <td className="p-3 text-right text-maroon">{formatINR(p.price)}</td>
                      <td className="p-3 text-right text-maroon">{p.stock}</td>
                      <td className="p-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.stock === 0 ? "bg-red-100 text-red-600" : p.stock <= 5 ? "bg-amber-100 text-amber-700" : "bg-maroon/10 text-gold"}`}>
                          {p.stock === 0 ? "Out of stock" : p.stock <= 5 ? "Low" : "In stock"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-6">
            {orders.length === 0 ? (
              <p className="py-16 text-center text-maroon/50">No orders yet. Complete a checkout to populate this table.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-gold/20">
                <table className="w-full text-sm">
                  <thead className="bg-maroon text-ivory">
                    <tr>
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-right">Items</th>
                      <th className="p-3 text-right">Total</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-t border-maroon/10">
                        <td className="p-3 font-mono text-xs text-maroon">{o.id}</td>
                        <td className="p-3 text-maroon">{o.address.name}</td>
                        <td className="p-3 text-maroon/60">{new Date(o.date).toLocaleDateString("en-IN")}</td>
                        <td className="p-3 text-right text-maroon">{o.items.reduce((n, i) => n + i.qty, 0)}</td>
                        <td className="p-3 text-right text-maroon">{formatINR(o.total)}</td>
                        <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${o.status === "Cancelled" ? "bg-red-100 text-red-600" : "bg-maroon/10 text-gold"}`}>{o.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

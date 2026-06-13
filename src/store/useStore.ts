"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered" | "Cancelled";
  address: Address;
  coupon?: string;
};

export type Address = {
  name: string;
  phone: string;
  email: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
};

const COUPONS: Record<string, number> = {
  AWADH10: 10,
  NAWABI15: 15,
  LUCKNOW20: 20,
};

type Store = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  recentlyViewed: string[];
  coupon: string | null;

  addToCart: (p: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;

  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;

  viewProduct: (id: string) => void;

  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;

  placeOrder: (address: Address) => Order;
  cancelOrder: (id: string) => void;

  subtotal: () => number;
  discountAmount: () => number;
  shipping: () => number;
  total: () => number;
  cartCount: () => number;
};

const keyOf = (i: { id: string; size: string; color: string }) =>
  `${i.id}__${i.size}__${i.color}`;

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      orders: [],
      recentlyViewed: [],
      coupon: null,

      addToCart: (p, size, color, qty = 1) =>
        set((s) => {
          const k = keyOf({ id: p.id, size, color });
          const existing = s.cart.find((c) => keyOf(c) === k);
          if (existing) {
            return {
              cart: s.cart.map((c) =>
                keyOf(c) === k ? { ...c, qty: c.qty + qty } : c
              ),
            };
          }
          return {
            cart: [
              ...s.cart,
              {
                id: p.id,
                slug: p.slug,
                name: p.name,
                price: p.price,
                image: p.images[0],
                size,
                color,
                qty,
              },
            ],
          };
        }),

      removeFromCart: (k) =>
        set((s) => ({ cart: s.cart.filter((c) => keyOf(c) !== k) })),

      updateQty: (k, qty) =>
        set((s) => ({
          cart: s.cart
            .map((c) => (keyOf(c) === k ? { ...c, qty: Math.max(1, qty) } : c))
            .filter((c) => c.qty > 0),
        })),

      clearCart: () => set({ cart: [], coupon: null }),

      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),

      inWishlist: (id) => get().wishlist.includes(id),

      viewProduct: (id) =>
        set((s) => ({
          recentlyViewed: [id, ...s.recentlyViewed.filter((r) => r !== id)].slice(
            0,
            8
          ),
        })),

      applyCoupon: (code) => {
        const up = code.trim().toUpperCase();
        if (COUPONS[up]) {
          set({ coupon: up });
          return { ok: true, message: `Coupon ${up} applied — ${COUPONS[up]}% off.` };
        }
        return { ok: false, message: "That code isn't valid. Try AWADH10." };
      },

      clearCoupon: () => set({ coupon: null }),

      subtotal: () => get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),

      discountAmount: () => {
        const c = get().coupon;
        if (!c) return 0;
        return Math.round((get().subtotal() * (COUPONS[c] ?? 0)) / 100);
      },

      shipping: () => {
        const after = get().subtotal() - get().discountAmount();
        return after >= 2999 || after === 0 ? 0 : 99;
      },

      total: () =>
        get().subtotal() - get().discountAmount() + get().shipping(),

      cartCount: () => get().cart.reduce((n, i) => n + i.qty, 0),

      placeOrder: (address) => {
        const s = get();
        const order: Order = {
          id: "NEA" + Date.now().toString().slice(-8),
          date: new Date().toISOString(),
          items: s.cart,
          subtotal: s.subtotal(),
          discount: s.discountAmount(),
          shipping: s.shipping(),
          total: s.total(),
          status: "Confirmed",
          address,
          coupon: s.coupon ?? undefined,
        };
        set({ orders: [order, ...s.orders], cart: [], coupon: null });
        return order;
      },

      cancelOrder: (id) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id ? { ...o, status: "Cancelled" } : o
          ),
        })),
    }),
    { name: "noor-e-awadh-store" }
  )
);

export { COUPONS, keyOf };

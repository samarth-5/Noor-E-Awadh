"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, Home, LayoutGrid } from "lucide-react";
import { RumiDarwaza } from "./Heritage";
import { useStore } from "@/store/useStore";
import { CATEGORIES } from "@/data/types";
import { cn } from "@/lib/utils";

// Primary links shown inline on desktop
const NAV_PRIMARY = [
  { label: "Collections", href: "/collections" },
  { label: "The Heritage", href: "/heritage" },
  { label: "Artisans", href: "/artisans" },
  { label: "Nawabi Edit", href: "/collections?edit=nawabi" },
  { label: "Craftsmanship", href: "/craftsmanship" },
];

// Secondary links — reachable via the hamburger drawer
const NAV_SECONDARY = [
  { label: "Business Partnerships", href: "/business" },
  { label: "Our Boutiques", href: "/boutiques" },
  { label: "Journal of Awadh", href: "/journal" },
];

// Full list for the drawer menu
const NAV = [...NAV_PRIMARY, ...NAV_SECONDARY];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const cartCount = useStore((s) => s.cartCount());
  const wishCount = useStore((s) => s.wishlist.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawer(false);
    setSearchOpen(false);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/collections?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl bg-maroon/90 shadow-lg shadow-black/20"
            : "backdrop-blur-md bg-maroon/80"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <RumiDarwaza className="h-8 text-gold-light" />
              <span className="font-royal text-lg sm:text-xl tracking-[0.18em] text-ivory whitespace-nowrap">
                NOOR-E-AWADH
              </span>
            </Link>

            {/* Desktop nav — primary links only */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-5 xl:gap-7 shrink min-w-0">
              <div
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                className="relative"
              >
                <Link
                  href="/collections"
                  className="thread-link font-body text-sm text-ivory/90 hover:text-gold-light transition whitespace-nowrap"
                >
                  Collections
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                    >
                      <div className="w-[460px] rounded-lg border border-gold/30 bg-ivory p-5 shadow-2xl">
                        <div className="grid grid-cols-2 gap-3 text-left">
                          {CATEGORIES.map((c) => (
                            <Link
                              key={c.name}
                              href={`/collections?category=${encodeURIComponent(c.name)}`}
                              className="group rounded-md p-3 hover:bg-ivory/60 transition"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-display text-maroon">{c.name}</span>
                                <span className="font-royal text-sm text-gold" dir="rtl">{c.urdu}</span>
                              </div>
                              <p className="font-deco italic text-sm text-maroon/60">{c.tagline}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_PRIMARY.slice(1).map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="thread-link font-body text-sm text-ivory/90 hover:text-gold-light transition whitespace-nowrap"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
              <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search" className="p-2 text-ivory hover:text-gold-light transition focus-ring rounded">
                <Search className="h-5 w-5" />
              </button>
              <Link href="/wishlist" aria-label="Wishlist" className="relative hidden lg:flex p-2 text-ivory hover:text-gold-light transition focus-ring rounded">
                <Heart className="h-5 w-5" />
                {wishCount > 0 && <Badge n={wishCount} />}
              </Link>
              <Link href="/cart" aria-label="Cart" className="relative hidden lg:flex p-2 text-ivory hover:text-gold-light transition focus-ring rounded">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && <Badge n={cartCount} />}
              </Link>
              <Link href="/account" aria-label="Account" className="relative hidden lg:flex p-2 text-ivory hover:text-gold-light transition focus-ring rounded">
                <User className="h-5 w-5" />
              </Link>
              <button onClick={() => setDrawer(true)} aria-label="Menu" className="p-2 text-ivory focus-ring rounded">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* gold embroidery stitch line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />

        {/* Search drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-maroon/95 backdrop-blur-xl"
            >
              <form onSubmit={submitSearch} className="mx-auto max-w-3xl px-4 py-4">
                <div className="flex items-center gap-3 border-b border-gold/40 pb-2">
                  <Search className="h-5 w-5 text-gold-light" />
                  <input
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search chikankari, sarees, the Nawabi Edit…"
                    className="w-full bg-transparent text-ivory placeholder:text-ivory/50 outline-none font-deco text-lg"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Drawer menu — works at all screen sizes */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-[60] bg-black/50"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 z-[70] h-full w-[80%] max-w-sm bg-maroon text-ivory overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gold/30">
                <div className="flex items-center gap-2">
                  <RumiDarwaza className="h-7 text-gold-light" />
                  <span className="font-royal tracking-widest">NOOR-E-AWADH</span>
                </div>
                <button onClick={() => setDrawer(false)} aria-label="Close"><X className="h-6 w-6" /></button>
              </div>
              <nav className="flex flex-col p-2">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="px-4 py-3 font-deco text-lg border-b border-white/5 hover:text-gold-light">
                    {n.label}
                  </Link>
                ))}
                <Link href="/wishlist" className="px-4 py-3 font-deco text-lg border-b border-white/5 hover:text-gold-light">Wishlist</Link>
                <Link href="/cart" className="px-4 py-3 font-deco text-lg border-b border-white/5 hover:text-gold-light">Cart</Link>
                <Link href="/account" className="px-4 py-3 font-deco text-lg hover:text-gold-light">My Account</Link>
              </nav>
              <p className="px-4 py-6 font-royal text-gold-light text-center tracking-[0.3em]" dir="rtl">نورِ اودھ</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <BottomNav cartCount={cartCount} wishCount={wishCount} />

      {/* spacer */}
      <div className="h-16" />
    </>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-maroon-dark">
      {n}
    </span>
  );
}

function BottomNav({ cartCount, wishCount }: { cartCount: number; wishCount: number }) {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/collections", label: "Collections", icon: LayoutGrid },
    { href: "/wishlist", label: "Wishlist", icon: Heart, badge: wishCount },
    { href: "/cart", label: "Cart", icon: ShoppingBag, badge: cartCount },
    { href: "/account", label: "Profile", icon: User },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-gold/30 bg-maroon/95 backdrop-blur-xl">
      <div className="flex items-stretch justify-around">
        {items.map((it) => {
          const active = pathname === it.href;
          const Icon = it.icon;
          return (
            <Link key={it.href} href={it.href} className={cn("relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px]", active ? "text-gold-light" : "text-ivory/70")}>
              <Icon className="h-5 w-5" />
              {!!it.badge && it.badge > 0 && (
                <span className="absolute right-[22%] top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-maroon-dark">{it.badge}</span>
              )}
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
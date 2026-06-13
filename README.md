# NOOR-E-AWADH — The Radiance of Awadh

A production-grade, Vercel-deployable luxury e-commerce storefront for a fictional
Lucknowi chikankari & Nawabi couture house. Built to feel like *a digital palace of
Lucknowi craftsmanship* — Rumi Darwaza and Bara Imambara motifs recur across every
page, with a branded loading screen, Urdu branding, and a fully working shopping flow.

**Self-contained:** no database, no API keys, no environment variables required to run.
Cart, wishlist, orders, coupons and recently-viewed all persist in the browser via
`localStorage`, so it works the moment it deploys.

## Tech stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (custom Awadh palette)
- Framer Motion (hero parallax, loading screen, reveals)
- Zustand + persist (cart / orders / wishlist state)
- lucide-react icons

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com → **New Project** → import the repo.
3. Framework preset auto-detects **Next.js**. No env vars needed.
4. Click **Deploy**. Done.

(Or run `npx vercel` from this directory.)

## What works
- 50-product catalogue across 5 categories, individual product pages (SSG)
- Search, category filter, price filter, sort
- Add to cart, quantity changes, remove, persistent cart
- Wishlist (add/remove, persisted)
- Coupons: **AWADH10** (10%), **NAWABI15** (15%), **LUCKNOW20** (20%)
- Checkout with form validation + simulated payment
- Order placement, order history, 4-step order tracking, cancel order
- Downloadable text invoice on the order-success page
- B2B Business Partnerships portal with quotation inquiry form + live estimate
- Admin dashboard at **/admin** (any password): analytics, inventory, orders
- Branded loading screen, custom 404, fully responsive + mobile bottom nav

## Heritage design system
- **Rumi Darwaza** silhouette: logo, loading screen, and the header banner of nearly
  every page (collections, cart, checkout, wishlist, account, 404, order success…).
- **Bara Imambara** silhouette: footer, hero depth layer, and large luxury sections.
- Palette: maroon `#4A0F1A`, royal blue `#153E75`, emerald `#0B3D2E`, ivory `#F8F4EE`,
  gold `#B8860B` / `#D4AF37`.
- Type: Playfair Display + Cinzel (display/royal), Inter (body), Cormorant (decorative).

## Wiring a real backend later
This build is structured so real integrations slot in cleanly:
- **Payments:** `src/app/checkout/page.tsx` has a simulated `setTimeout` payment step —
  replace it with a Razorpay order + checkout handler. `.env.example` lists the keys.
- **Database/auth:** swap the Zustand store (`src/store/useStore.ts`) reads/writes for
  API routes (e.g. Prisma + Postgres, NextAuth). The store method names map 1:1 to
  typical endpoints (`placeOrder`, `addToCart`, etc.).
- **Catalogue:** `src/data/products.ts` is a seed array — point `getProduct` /
  `getByCategory` at your DB.
- **Images:** currently Unsplash; `next.config.mjs` lists allowed remote hosts.

## Project structure
```
src/
  app/            routes (home, collections, product, cart, checkout,
                  order-success, wishlist, account, admin, business,
                  heritage, artisans, craftsmanship, boutiques, journal,
                  not-found)
  components/     Header, Footer, Hero, LoadingScreen, ProductCard,
                  SectionHeading, Heritage (Rumi Darwaza / Imambara SVGs)
  store/          Zustand store (persisted)
  data/           types + 50-product seed catalogue
  lib/            utils (cn, INR formatter)
```

*Har Dhaage Mein Awadh Ki Rooh — in every thread, the soul of Awadh.*

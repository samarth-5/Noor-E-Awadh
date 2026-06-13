"use client";

import Link from "next/link";
import { useState } from "react";
import { Imambara, ChikanDivider } from "./Heritage";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const cols = [
    {
      title: "Discover",
      links: [
        ["Collections", "/collections"],
        ["The Nawabi Edit", "/collections?edit=nawabi"],
        ["The Heritage", "/heritage"],
        ["Journal of Awadh", "/journal"],
      ],
    },
    {
      title: "The House",
      links: [
        ["Our Artisans", "/artisans"],
        ["Craftsmanship", "/craftsmanship"],
        ["Our Boutiques", "/boutiques"],
        ["Business Partnerships", "/business"],
      ],
    },
    {
      title: "Care",
      links: [
        ["My Account", "/account"],
        ["Track Order", "/account"],
        ["Returns & Refunds", "/journal"],
        ["Contact", "/boutiques"],
      ],
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden bg-maroon-dark text-ivory pb-20 lg:pb-0">
      {/* faded Imambara silhouette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-gold/10">
        <Imambara className="w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16">
        {/* Urdu branding */}
        <div className="text-center">
          <p className="font-royal text-4xl tracking-[0.3em] text-gold-light" dir="rtl" lang="ur">
            نورِ اودھ
          </p>
          <p className="mt-2 font-deco italic text-ivory/70">( The Light of Awadh )</p>
          <p className="mt-3 font-deco text-lg text-gold/80" dir="rtl" lang="ur">
            جہاں ہر دھاگہ ایک داستان کہتا ہے
          </p>
          <ChikanDivider className="mx-auto mt-6 w-64 text-gold/60" />
        </div>

        {/* Newsletter */}
        <div className="mx-auto mt-10 max-w-md text-center">
          <h3 className="font-display text-xl">Join the Mehfil</h3>
          <p className="mt-1 text-sm text-ivory/70">
            Early access to new collections and the stories behind every thread.
          </p>
          {done ? (
            <p className="mt-4 font-deco text-gold-light">
              Shukriya. You are now part of Awadh&apos;s story.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-md border border-gold/40 bg-transparent px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 outline-none focus:border-gold-light"
              />
              <button className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-dark hover:bg-gold-light transition whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Link columns */}
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="font-royal tracking-widest text-gold-light text-sm">NOOR-E-AWADH</h4>
            <p className="mt-3 font-deco text-sm leading-relaxed text-ivory/70">
              A digital palace of Lucknowi craftsmanship. Every garment carries the
              soul of Awadh — hand-embroidered, never machine-made.
            </p>
            <div className="mt-4 flex gap-3">
              <Instagram className="h-5 w-5 text-ivory/70 hover:text-gold-light transition cursor-pointer" />
              <Facebook className="h-5 w-5 text-ivory/70 hover:text-gold-light transition cursor-pointer" />
              <Youtube className="h-5 w-5 text-ivory/70 hover:text-gold-light transition cursor-pointer" />
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-gold-light">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-ivory/70 hover:text-gold-light transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-gold/20 py-6 text-center text-xs text-ivory/50">
          © {new Date().getFullYear()} Noor-e-Awadh · Developed by Samarth
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Imambara, RumiDarwaza } from "./Heritage";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[88vh] min-h-[560px] items-center justify-center overflow-hidden">
      {/* Layer 1: deep maroon gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #5a1320 0%, #4a0f1a 45%, #300a12 100%)" }}
      />

      {/* Layer 2: faded Rumi Darwaza */}
      <motion.div style={{ y: yBack }} className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/[0.06]">
        <RumiDarwaza className="h-[80vh]" />
      </motion.div>

      {/* Layer 3: Imambara depth */}
      <motion.div style={{ y: yMid }} className="pointer-events-none absolute inset-x-0 bottom-0 text-white/[0.05]">
        <Imambara className="w-full" />
      </motion.div>

      {/* embroidery thread shimmer lines */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {[20, 40, 60, 80].map((t) => (
          <div
            key={t}
            className="absolute h-px w-full animate-shimmer"
            style={{
              top: `${t}%`,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
              backgroundSize: "200% 100%",
            }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <motion.div style={{ y: yText, opacity: fade }} className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="font-royal text-3xl sm:text-5xl tracking-wide text-gold-light"
          dir="rtl" lang="hi"
        >
          जहाँ हर धागा एक दास्ताँ कहता है
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 font-display text-4xl sm:text-6xl leading-tight text-ivory"
        >
          Crafted in Lucknow.<br />Woven with Heritage.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-4 font-deco text-xl italic text-ivory/80"
        >
          Har Dhaage Mein Awadh Ki Rooh
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/collections" className="rounded-md bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition shadow-lg">
            Explore Collections
          </Link>
          <Link href="/heritage" className="rounded-md border border-gold-light/60 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ivory hover:bg-ivory/10 transition">
            Discover Our Heritage
          </Link>
          <Link href="/business" className="rounded-md border border-gold-light/60 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-ivory hover:bg-ivory/10 transition">
            Become a Partner
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

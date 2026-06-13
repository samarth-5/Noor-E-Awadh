"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only show on first load of the session.
    if (sessionStorage.getItem("nea-loaded")) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("nea-loaded", "1");
      setShow(false);
    }, 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(circle at 50% 40%, #5a1320 0%, #4a0f1a 55%, #2a080f 100%)" }}
        >
          <svg viewBox="0 0 240 320" className="w-40 sm:w-48 text-gold-light" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="2.5" className="trace">
              <rect x="10" y="300" width="220" height="18" />
              <rect x="20" y="120" width="40" height="180" />
              <path d="M20 120 q20 -30 40 0" />
              <rect x="180" y="120" width="40" height="180" />
              <path d="M180 120 q20 -30 40 0" />
              <path d="M60 300 V150 q60 -120 120 0 V300" />
              <path d="M82 300 V160 q38 -84 76 0 V300" opacity="0.7" />
              <path d="M104 70 q16 -28 32 0" />
              <line x1="120" y1="70" x2="120" y2="34" />
              <circle cx="120" cy="30" r="6" />
              <circle cx="40" cy="74" r="6" />
              <circle cx="200" cy="74" r="6" />
            </g>
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="font-royal text-3xl tracking-[0.3em] text-gold-light" dir="rtl" lang="ur">
              نورِ اودھ
            </p>
            <p className="mt-3 font-deco text-lg italic text-ivory/80">
              Preparing the elegance of Awadh…
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

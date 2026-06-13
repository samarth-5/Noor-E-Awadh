import Link from "next/link";
import { RumiDarwaza } from "@/components/Heritage";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-maroon text-center text-ivory">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/[0.06]">
        <RumiDarwaza className="h-[120%]" />
      </div>
      <div className="relative px-6">
        <p className="font-royal text-7xl tracking-widest text-gold-light">404</p>
        <h1 className="mt-4 font-display text-3xl">This path leads nowhere in Awadh</h1>
        <p className="mt-2 font-deco text-lg italic text-ivory/80">The gateway you seek has not been built — yet.</p>
        <p className="mt-1 font-royal text-gold-light" dir="rtl" lang="ur">یہ راستہ کہیں نہیں جاتا</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-md bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-maroon-dark hover:bg-gold-light transition">Return Home</Link>
          <Link href="/collections" className="rounded-md border border-gold-light/60 px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-ivory/10 transition">Explore Collections</Link>
        </div>
      </div>
    </div>
  );
}

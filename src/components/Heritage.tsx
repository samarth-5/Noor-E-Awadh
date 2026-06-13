import { cn } from "@/lib/utils";

/**
 * Bara Imambara silhouette — the signature heritage motif of the brand.
 * Rendered as a faded architectural overlay across hero, footer, and dividers.
 * Stylized vector of the central facade with its arched gateways and minarets.
 */
export function Imambara({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 360"
      preserveAspectRatio="xMidYMax meet"
      className={cn("w-full h-auto", className)}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {/* ground line */}
        <rect x="0" y="350" width="1200" height="10" />

        {/* left minaret */}
        <rect x="120" y="150" width="26" height="200" />
        <path d="M133 110 q20 25 0 40 q-20 -15 0 -40z" />
        <circle cx="133" cy="104" r="7" />

        {/* right minaret */}
        <rect x="1054" y="150" width="26" height="200" />
        <path d="M1067 110 q20 25 0 40 q-20 -15 0 -40z" />
        <circle cx="1067" cy="104" r="7" />

        {/* main facade base */}
        <rect x="250" y="200" width="700" height="150" />

        {/* central large arch */}
        <path d="M520 350 V250 a80 80 0 0 1 160 0 V350z" fill="rgba(0,0,0,0)" />
        <path d="M510 350 V250 a90 90 0 0 1 180 0 V350 h-22 V255 a68 68 0 0 0 -136 0 V350z" />

        {/* central dome */}
        <path d="M520 200 q80 -120 160 0z" />
        <rect x="592" y="70" width="16" height="22" />
        <circle cx="600" cy="64" r="9" />

        {/* flanking arches left */}
        <path d="M300 350 V255 a40 40 0 0 1 80 0 V350 h-14 V258 a26 26 0 0 0 -52 0 V350z" />
        <path d="M410 350 V260 a32 32 0 0 1 64 0 V350 h-12 V263 a20 20 0 0 0 -40 0 V350z" />

        {/* flanking arches right */}
        <path d="M820 350 V255 a40 40 0 0 1 80 0 V350 h-14 V258 a26 26 0 0 0 -52 0 V350z" />
        <path d="M726 350 V260 a32 32 0 0 1 64 0 V350 h-12 V263 a20 20 0 0 0 -40 0 V350z" />

        {/* side domes */}
        <path d="M340 200 q40 -55 80 0z" />
        <path d="M780 200 q40 -55 80 0z" />

        {/* parapet detailing */}
        <g>
          {Array.from({ length: 28 }).map((_, i) => (
            <rect key={i} x={258 + i * 24} y="190" width="10" height="12" />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Rumi Darwaza — accurate silhouette of the Awadhi gateway (Lucknow).
 * Tall central cusped archway, three-tier arched windows in the upper screen,
 * the crowning octagonal kiosk with its small dome and finial, flanking wings
 * with rows of arched openings, and chhatri kiosks along the rooflines.
 * Drawn as line art so it reads as the real monument, not a generic arch.
 */
export function RumiDarwaza({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 320"
      preserveAspectRatio="xMidYMax meet"
      className={cn("h-auto", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* ground */}
      <line x1="8" y1="306" x2="352" y2="306" />

      {/* ===== LEFT WING ===== */}
      <rect x="20" y="196" width="92" height="110" />
      {/* wing cornice */}
      <line x1="16" y1="196" x2="116" y2="196" />
      {/* arched openings, lower row */}
      <path d="M30 306 V250 a10 10 0 0 1 20 0 V306" />
      <path d="M58 306 V250 a10 10 0 0 1 20 0 V306" />
      <path d="M86 306 V250 a10 10 0 0 1 20 0 V306" />
      {/* arched openings, upper row */}
      <path d="M32 196 V224 M44 208 a8 8 0 0 0 -16 0" transform="translate(0 -2)" />
      <path d="M34 196 a8 8 0 0 1 16 0" />
      <path d="M60 196 a8 8 0 0 1 16 0" />
      <path d="M86 196 a8 8 0 0 1 16 0" />
      {/* chhatri kiosks on left wing roof */}
      <g>
        <path d="M40 196 v-14 a7 7 0 0 1 14 0 v14" />
        <path d="M38 182 q9 -12 18 0" />
        <line x1="47" y1="170" x2="47" y2="164" />
        <path d="M78 196 v-14 a7 7 0 0 1 14 0 v14" />
        <path d="M76 182 q9 -12 18 0" />
        <line x1="85" y1="170" x2="85" y2="164" />
      </g>

      {/* ===== RIGHT WING (mirror) ===== */}
      <rect x="248" y="196" width="92" height="110" />
      <line x1="244" y1="196" x2="344" y2="196" />
      <path d="M258 306 V250 a10 10 0 0 1 20 0 V306" />
      <path d="M286 306 V250 a10 10 0 0 1 20 0 V306" />
      <path d="M314 306 V250 a10 10 0 0 1 20 0 V306" />
      <path d="M262 196 a8 8 0 0 1 16 0" />
      <path d="M288 196 a8 8 0 0 1 16 0" />
      <path d="M314 196 a8 8 0 0 1 16 0" />
      <g>
        <path d="M268 196 v-14 a7 7 0 0 1 14 0 v14" />
        <path d="M266 182 q9 -12 18 0" />
        <line x1="275" y1="170" x2="275" y2="164" />
        <path d="M306 196 v-14 a7 7 0 0 1 14 0 v14" />
        <path d="M304 182 q9 -12 18 0" />
        <line x1="313" y1="170" x2="313" y2="164" />
      </g>

      {/* ===== CENTRAL GATEWAY BLOCK ===== */}
      <rect x="112" y="86" width="136" height="220" />

      {/* grand cusped (multi-lobed) central arch */}
      <path d="M132 306 V172
               q0 -26 13 -42
               q15 -20 35 -20
               q20 0 35 20
               q13 16 13 42
               V306" />
      {/* pointed apex of the central arch */}
      <path d="M150 150 q30 -34 60 0" strokeWidth="1.6" opacity="0.75" />
      {/* inner cusping of the arch (scalloped lobes) */}
      <path d="M150 206
               q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0 q5 -9 10 0"
            strokeWidth="1.5" opacity="0.85" />
      {/* arch reveal / inner outline */}
      <path d="M146 306 V178 q0 -22 11 -36 q13 -18 23 -18 q10 0 23 18 q11 14 11 36 V306"
            strokeWidth="1.4" opacity="0.65" />

      {/* upper screen: tiers of small arched windows above the arch */}
      <path d="M124 150 a7 7 0 0 1 14 0 M222 150 a7 7 0 0 1 14 0" />
      <line x1="124" y1="150" x2="124" y2="162" /><line x1="138" y1="150" x2="138" y2="162" />
      <line x1="222" y1="150" x2="222" y2="162" /><line x1="236" y1="150" x2="236" y2="162" />
      <path d="M124 128 a7 7 0 0 1 14 0 M222 128 a7 7 0 0 1 14 0" />
      <line x1="124" y1="128" x2="124" y2="140" /><line x1="138" y1="128" x2="138" y2="140" />
      <line x1="222" y1="128" x2="222" y2="140" /><line x1="236" y1="128" x2="236" y2="140" />
      {/* cornice line above central block */}
      <line x1="108" y1="98" x2="252" y2="98" />

      {/* small corner chhatris on central block roofline */}
      <path d="M120 86 v-12 a6 6 0 0 1 12 0 v12" />
      <path d="M118 74 q8 -10 16 0" />
      <line x1="126" y1="64" x2="126" y2="59" />
      <path d="M228 86 v-12 a6 6 0 0 1 12 0 v12" />
      <path d="M226 74 q8 -10 16 0" />
      <line x1="234" y1="64" x2="234" y2="59" />

      {/* ===== CROWNING OCTAGONAL KIOSK (the umbrella lantern) ===== */}
      {/* kiosk base / railing */}
      <rect x="150" y="78" width="60" height="8" />
      {/* eight slender columns */}
      <g strokeWidth="1.8">
        <line x1="158" y1="78" x2="158" y2="50" />
        <line x1="172" y1="78" x2="172" y2="46" />
        <line x1="188" y1="78" x2="188" y2="46" />
        <line x1="202" y1="78" x2="202" y2="50" />
      </g>
      {/* kiosk arches */}
      <path d="M158 50 a14 14 0 0 1 14 -4 M188 46 a14 14 0 0 1 14 4" strokeWidth="1.5" />
      {/* kiosk entablature */}
      <line x1="150" y1="46" x2="210" y2="46" />
      {/* the chhatri dome on top */}
      <path d="M152 46 q28 -40 56 0" />
      {/* finial */}
      <line x1="180" y1="14" x2="180" y2="6" />
      <circle cx="180" cy="4" r="3" />
    </svg>
  );
}

/** A single Mughal-style arch, used as a framing device and divider. */
export function MughalArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={cn("h-auto", className)} aria-hidden="true">
      <path
        d="M10 140 V60 a40 40 0 0 1 80 0 V140"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M50 22 l6 14 l15 1 l-11 10 l4 15 l-14 -8 l-14 8 l4 -15 l-11 -10 l15 -1z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

/** Chikankari-inspired floral divider line. */
export function ChikanDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" className={cn("h-6", className)} aria-hidden="true">
      <line x1="0" y1="12" x2="160" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="240" y1="12" x2="400" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <g transform="translate(200 12)" fill="currentColor">
        <path d="M0 -10 q6 6 0 12 q-6 -6 0 -12z" />
        <path d="M0 10 q6 -6 0 -12 q-6 6 0 12z" />
        <path d="M-10 0 q6 6 12 0 q-6 -6 -12 0z" opacity="0.7" />
        <path d="M10 0 q-6 6 -12 0 q6 -6 12 0z" opacity="0.7" />
        <circle cx="0" cy="0" r="2.5" />
      </g>
    </svg>
  );
}

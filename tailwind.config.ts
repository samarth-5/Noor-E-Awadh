import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#4A0F1A", dark: "#300A12" },
        royal: "#153E75",
        emerald: "#0B3D2E",
        ivory: "#F8F4EE",
        gold: { DEFAULT: "#B8860B", light: "#D4AF37" },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        royal: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        deco: ["var(--font-cormorant)", "serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

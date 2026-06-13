import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Noor-e-Awadh — The Radiance of Awadh | Luxury Lucknowi Chikankari",
  description:
    "A digital palace of Lucknowi craftsmanship. Premium hand-embroidered chikankari, sarees and Nawabi couture, woven with the heritage of Awadh.",
  keywords: ["chikankari", "lucknow", "awadh", "luxury ethnic wear", "hand embroidery"],
  openGraph: {
    title: "Noor-e-Awadh — The Radiance of Awadh",
    description: "Har Dhaage Mein Awadh Ki Rooh.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <LoadingScreen />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samuraj-luban.pl"),
  title: {
    default: "Samuraj Lubań - Szkoła Sztuk Walki",
    template: "%s | Samuraj Lubań",
  },
  description:
    "Dołącz do klubu Samuraj Lubań i trenuj karate, judo lub ju-jitsu. Buduj pewność siebie, siłę i szacunek pod okiem doświadczonych trenerów.",
  keywords: ["Sztuki walki", "Lubań", "Karate", "Judo", "Ju-jitsu", "Trening", "Klub sportowy"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuraj-luban.pl",
    siteName: "Samuraj Lubań",
    title: "Samuraj Lubań - Szkoła Sztuk Walki",
    description:
      "Dołącz do klubu Samuraj Lubań i trenuj karate, judo lub ju-jitsu. Buduj pewność siebie, siłę i szacunek.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samuraj Lubań Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuraj Lubań - Szkoła Sztuk Walki",
    description:
      "Dołącz do klubu Samuraj Lubań i trenuj karate, judo lub ju-jitsu. Buduj pewność siebie, siłę i szacunek.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={cn("antialiased", "h-full snap-y snap-mandatory", inter.variable, notoSerifJP.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-surface text-brand-950">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

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
  metadataBase: new URL("https://dojoacademy.com"),
  title: {
    default: "Dojo Academy - Premier Martial Arts Training",
    template: "%s | Dojo Academy",
  },
  description:
    "Join Dojo Academy for professional martial arts training, discipline, and physical fitness for all ages. Discover our courses and world-class instructors.",
  keywords: ["Martial Arts", "Dojo", "Karate", "Judo", "BJJ", "Training", "Fitness"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dojoacademy.com",
    siteName: "Dojo Academy",
    title: "Dojo Academy - Premier Martial Arts Training",
    description:
      "Join Dojo Academy for professional martial arts training, discipline, and physical fitness for all ages.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dojo Academy Logo and Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dojo Academy - Premier Martial Arts Training",
    description:
      "Join Dojo Academy for professional martial arts training, discipline, and physical fitness for all ages.",
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
    <html lang="en" className={cn("antialiased", "h-full snap-y snap-mandatory", inter.variable, notoSerifJP.variable, "font-sans", geist.variable)}>
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

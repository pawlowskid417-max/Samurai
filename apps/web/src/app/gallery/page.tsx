import prisma from "database";
import { FadeIn } from "@/components/ui/FadeIn";
import { GalleryGrid } from "@/components/ui/GalleryGrid";

export const metadata = {
  title: "Galeria - Samuraj Lubań",
  description: "Zobacz zdjęcia z naszych treningów, zgrupowań i egzaminów na stopnie.",
};

export default async function GalleryPage() {
  const galleryItems = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { image: true },
  });

  // Serialize BigInt to string for Client Component
  const items = galleryItems.map((item: any) => ({
    id: item.id.toString(),
    url: item.image.url,
    alt: item.caption || item.albumName || "Samuraj Lubań",
    caption: item.caption || item.albumName || null,
  }));

  return (
    <div className="bg-brand-950 min-h-screen">
      {/* Page hero */}
      <section className="py-14 md:py-20 bg-brand-950 relative overflow-hidden">
        {/* Seigaiha subtle pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0 0, transparent 24%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.04) 28%, transparent 29%),
              radial-gradient(circle at 20px 0, transparent 24%, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.04) 28%, transparent 29%)
            `,
            backgroundSize: "40px 20px",
            backgroundPosition: "0 0, 20px 0",
          }}
        />
        {/* Kanji watermark */}
        <span
          aria-hidden="true"
          className="absolute -bottom-4 right-6 md:right-16 font-display font-bold text-[clamp(5rem,15vw,12rem)] text-white/[0.04] leading-none select-none pointer-events-none"
        >
          型
        </span>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-3">
              Galeria
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Nasza galeria
            </h1>
            <p className="text-brand-300/70 mt-3 text-lg max-w-xl">
              Zdjęcia z naszych ostatnich treningów, zawodów i wydarzeń klubowych.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery grid */}
      <div className="container mx-auto px-4 max-w-7xl pb-20 pt-8">
        {items.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center border border-brand-800 rounded-3xl">
              <p className="font-display text-5xl text-brand-700 mb-4" aria-hidden="true">型</p>
              <p className="text-brand-500 text-lg">Galeria jest jeszcze pusta — zdjęcia pojawią się wkrótce.</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <GalleryGrid items={items} />
          </FadeIn>
        )}
      </div>
    </div>
  );
}



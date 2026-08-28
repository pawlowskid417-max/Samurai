import prisma from "database";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export const metadata = {
  title: "Galeria - Samuraj Lubań",
  description: "Zobacz zdjęcia z naszych treningów, zgrupowań i egzaminów na stopnie.",
};

export default async function GalleryPage() {
  const galleryItems = await prisma.galleryItem.findMany({
    orderBy: { eventDate: "desc" },
    include: { image: true },
  });

  return (
    <div className="bg-surface">
      {/* Page hero */}
      <section className="py-16 md:py-24 bg-brand-950">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
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
      <div className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
        {galleryItems.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center border border-neutral-200 rounded-3xl">
              <p className="font-display text-5xl text-brand-200 mb-4" aria-hidden="true">型</p>
              <p className="text-neutral-500 text-lg">Galeria jest jeszcze pusta — zdjęcia pojawią się wkrótce.</p>
            </div>
          </FadeIn>
        ) : (
          <div className="w-full relative px-4 md:px-12 py-8 md:py-12 bg-brand-950 rounded-[32px] border border-brand-800/40 shadow-2xl">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {galleryItems.map((item: any, index: number) => (
                  <CarouselItem key={item.id || index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <div className="overflow-hidden rounded-[24px] relative aspect-[3/4] group border border-brand-700/20 shadow-lg">
                        <img
                          src={item.image.url}
                          alt={item.caption || item.albumName || "Samuraj Lubań"}
                          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="text-white font-semibold text-lg drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {item.caption || item.albumName || "Samuraj Lubań"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 md:-left-12 bg-brand-900 border-brand-700 text-white hover:bg-brand-800" />
              <CarouselNext className="hidden md:flex -right-4 md:-right-12 bg-brand-900 border-brand-700 text-white hover:bg-brand-800" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

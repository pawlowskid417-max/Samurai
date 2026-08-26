import prisma from "database";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
/**
 * GallerySection — homepage gallery preview
 * Server Component: fetches latest 9 published GalleryItems from Prisma.
 * 
 * Layout: 3-column masonry-style grid (CSS columns).
 * Falls back to empty state if no items.
 */
export async function GallerySection() {
  // Fetch up to 50 recent images
  const recentItems = await prisma.galleryItem.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    take: 50,
    include: { image: true },
  });

  // Shuffle and pick 15 for a varied DriftWall
  const galleryItems = [...recentItems].sort(() => 0.5 - Math.random()).slice(0, 15);

  return (
    <section className="relative py-12 md:py-16 bg-brand-950 overflow-hidden min-h-[100dvh] flex flex-col justify-center snap-start snap-always" aria-label="Gallery preview">
      {/* Subtle gradient top edge to blend from hero */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-brand-950 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-brand-950 to-transparent" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <FadeIn>
            <div>
              {/* Japanese accent — 型 (kata) */}
              <p aria-hidden="true" className="font-display text-5xl text-brand-800/60 leading-none mb-2 select-none">型</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Life at the Dojo
              </h2>
              <p className="text-brand-300/70 mt-2 max-w-md">
                A glimpse into our training sessions, competitions, and community.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-brand-300 font-semibold hover:text-white transition-colors duration-200"
            >
              See full gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </FadeIn>
        </div>

        {/* Gallery grid */}
        {galleryItems.length === 0 ? (
          <FadeIn>
            <div className="py-20 text-center border border-brand-800/40 rounded-3xl">
              <p className="text-brand-400 text-lg">No gallery photos yet.</p>
              <p className="text-brand-600 text-sm mt-1">Check back soon.</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="w-full relative mt-8 px-4 md:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {galleryItems.map((item, index) => (
                    <CarouselItem key={item.id || index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="overflow-hidden rounded-[24px] relative aspect-[4/5] group border border-brand-700/20 shadow-lg bg-brand-950">
                          <img
                            src={item.image.url}
                            alt={item.caption || item.albumName || "Dojo Academy"}
                            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <span className="text-white font-semibold text-xl drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              {item.caption || item.albumName || "Dojo Academy"}
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
          </FadeIn>
        )}

        {/* CTA */}
        <FadeIn delay={0.2} className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-brand-600 text-brand-300 font-semibold hover:bg-brand-800 hover:text-white transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group"
          >
            View all photos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

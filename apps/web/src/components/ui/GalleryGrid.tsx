"use client";

import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  caption?: string | null;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  }, [lightboxIndex, items.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  }, [lightboxIndex, items.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goNext, goPrev]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const handleImgError = (index: number) => {
    setImgErrors((prev) => new Set(prev).add(index));
  };

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 md:gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
            aria-label={`Otwórz zdjęcie: ${item.alt}`}
          >
            {imgErrors.has(index) ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-brand-900 text-brand-700">
                <span className="font-display text-3xl select-none">武</span>
                <span className="text-xs mt-1 opacity-50">Brak zdjecia</span>
              </div>
            ) : (
              <img
                src={item.url}
                alt={item.alt}
                onError={() => handleImgError(index)}
                className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
              {item.caption && (
                <span className="w-full px-2 pb-2 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                  {item.caption}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Podglad zdjecia"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Zamknij podglad"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 md:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Poprzednie zdjecie"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.url}
              alt={currentItem.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            {currentItem.caption && (
              <p className="mt-3 text-white/70 text-sm text-center max-w-md">{currentItem.caption}</p>
            )}
            <p className="mt-1 text-white/30 text-xs">{lightboxIndex + 1} / {items.length}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 md:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Nastepne zdjecie"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}

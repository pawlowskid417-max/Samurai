import prisma from "database";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/ui/FadeIn";

export async function LatestFeed() {
  const posts = await prisma.newsPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      featuredImage: true,
    },
  });

  return (
    <section className="relative py-24 md:py-32 bg-surface overflow-hidden snap-start" aria-label="Latest news">
      {/* Asanoha pattern — subtle, low opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cg fill='none' stroke='%233b72e8' stroke-width='0.5'%3E%3Cpolygon points='20,2 38,11 38,29 20,38 2,29 2,11'/%3E%3Cline x1='20' y1='2' x2='20' y2='38'/%3E%3Cline x1='2' y1='11' x2='38' y2='29'/%3E%3Cline x1='2' y1='29' x2='38' y2='11'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <FadeIn>
            <div>
              {/* Kanji decoration — 型 (kata) */}
              <p aria-hidden="true" className="font-display text-4xl text-brand-200 leading-none mb-1 select-none">
                型
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-950 tracking-tight">
                Najnowsze aktualności
              </h2>
              <p className="text-neutral-500 mt-2 max-w-md text-base">
                Bądź na bieżąco z egzaminami na stopnie, zgrupowaniami i ogłoszeniami klubu.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-brand-500 font-semibold hover:text-brand-700 transition-colors duration-200"
            >
              Zobacz wszystkie
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </FadeIn>
        </div>

        {/* News cards */}
        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post: any) => (
            <StaggerItem key={post.id.toString()}>
              <Link
                href={`/news/${post.slug}`}
                className="group flex flex-col h-full rounded-xl overflow-hidden bg-white border-t-4 border-brand-500 shadow-sm hover:shadow-[0_8px_28px_rgba(59,114,232,0.13)] hover:-translate-y-1 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                {/* Image 16:9 */}
                <div className="w-full aspect-[16/9] overflow-hidden bg-brand-50">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop"
                      alt="Trening sztuk walki"
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-4">
                  <span className="text-[10px] font-semibold tracking-widest text-brand-500 uppercase mb-1.5">
                    Aktualność
                  </span>
                  <h3 className="text-base font-semibold text-brand-950 mb-1.5 line-clamp-1 group-hover:text-brand-700 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-3 line-clamp-2 flex-grow leading-relaxed">
                    {post.excerpt || post.body}
                  </p>
                  <div className="flex items-center justify-between">
                    <time
                      dateTime={post.publishedAt?.toISOString()}
                      className="text-xs text-neutral-400"
                    >
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("pl-PL", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </time>
                    <span className="text-xs font-semibold text-brand-500 group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      Czytaj →
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}

          {posts.length === 0 && (
            <p className="col-span-full text-center py-12 text-neutral-400">
              Brak najnowszych aktualności. Zaglądaj częściej!
            </p>
          )}
        </FadeInStagger>
      </div>
    </section>
  );
}

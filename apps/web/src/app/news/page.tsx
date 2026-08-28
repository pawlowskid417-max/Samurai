import prisma from "database";
import Link from "next/link";
import { Metadata } from "next";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Aktualności - Samuraj Lubań",
  description: "Najnowsze wiadomości, wydarzenia i wyniki zawodników klubu Samuraj Lubań.",
};

export default async function NewsPage() {
  const posts = await prisma.newsPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: {
      featuredImage: true,
    },
  });

  return (
    <div className="bg-surface">
      {/* Page hero */}
      <section className="py-16 md:py-24 bg-brand-950 relative overflow-hidden">

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-3">Aktualności</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Aktualności klubu
            </h1>
            <p className="text-brand-300/70 mt-3 text-lg max-w-xl">
              Najnowsze ogłoszenia, wydarzenia i wyniki zawodników naszego klubu.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Posts grid */}
      <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
        <FadeInStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post: any) => (
            <StaggerItem key={post.id.toString()}>
              <Link
                href={`/news/${post.slug}`}
                className="group flex flex-col h-full rounded-xl overflow-hidden bg-white border-t-4 border-brand-500 shadow-sm hover:shadow-[0_8px_28px_rgba(59,114,232,0.13)] hover:-translate-y-1 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                {/* Image 16:9 */}
                <div className="w-full aspect-[16/9] bg-brand-50 overflow-hidden">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop"
                      alt="Trening sztuk walki"
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-[10px] font-semibold tracking-widest text-brand-500 uppercase mb-1.5">
                    Aktualność
                  </span>
                  <h2 className="text-base font-semibold text-brand-950 mb-1.5 group-hover:text-brand-700 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-neutral-500 text-sm mb-3 line-clamp-2 flex-grow leading-relaxed">
                    {post.excerpt || post.body}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <time
                      dateTime={post.publishedAt?.toISOString()}
                      className="text-xs text-neutral-400 font-medium"
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
            <div className="col-span-full py-16 text-center border border-neutral-200 rounded-3xl">
              <p className="text-neutral-400 text-lg">Nie opublikowano jeszcze żadnych aktualności.</p>
            </div>
          )}
        </FadeInStagger>
      </div>
    </div>
  );
}

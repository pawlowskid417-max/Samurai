import prisma from "database";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/FadeIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.newsPost.findUnique({
    where: { slug },
    include: { featuredImage: true },
  });

  if (!post) {
    return { title: "News Not Found - Dojo Academy" };
  }

  const description = post.excerpt || post.body.substring(0, 160) + "...";
  const imageUrl = post.featuredImage
    ? `https://dojoacademy.com${post.featuredImage.url}`
    : "https://dojoacademy.com/og-image.jpg";

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.newsPost.findUnique({
    where: { slug, publishedAt: { not: null } },
    include: { featuredImage: true },
  });

  if (!post || !post.publishedAt) {
    notFound();
  }

  return (
    <div className="bg-surface">
      <article className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-700 transition-colors duration-200 mb-10"
          >
            <span aria-hidden="true">←</span>
            Back to news
          </Link>
        </FadeIn>

        {/* Article header */}
        <FadeIn delay={0.05}>
          <header className="mb-10">
            <div className="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-4">
              News
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-950 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-neutral-400 text-sm">
              <time dateTime={post.publishedAt.toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {/* Thin divider */}
              <span className="h-4 w-px bg-neutral-200" />
              <span>Dojo Academy</span>
            </div>
          </header>
        </FadeIn>

        {/* Featured image */}
        {post.featuredImage && (
          <FadeIn delay={0.1}>
            <div className="mb-12 rounded-2xl overflow-hidden border border-neutral-200 aspect-video">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        )}

        {/* Article body */}
        <FadeIn delay={0.15}>
          <div className="prose prose-lg max-w-none text-neutral-700 prose-headings:text-brand-950 prose-a:text-brand-500 prose-a:no-underline hover:prose-a:underline prose-hr:border-neutral-200">
            {post.body.split("\n").map((paragraph: any, idx: number) =>
              paragraph.trim() ? (
                <p key={idx} className="mb-5 leading-relaxed">
                  {paragraph}
                </p>
              ) : null
            )}
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.2}>
          <div className="mt-16 pt-8 border-t border-neutral-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-700 transition-colors"
            >
              <span aria-hidden="true">←</span>
              More news
            </Link>
          </div>
        </FadeIn>
      </article>
    </div>
  );
}

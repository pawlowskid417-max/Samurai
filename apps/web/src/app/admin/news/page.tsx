import prisma from "database";
import { NewsList } from "@/components/ui/NewsList";
import Link from "next/link";

export const metadata = {
  title: "Zarządzaj aktualnościami - Panel admina",
};

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, publishedAt: true },
  });

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Aktualności</h1>
          <p className="text-neutral-500 text-sm mt-0.5">Łącznie {posts.length} wpisów</p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(59,114,232,0.3)] hover:bg-brand-600 active:scale-[0.97] transition-all duration-200"
        >
          + Dodaj wpis
        </Link>
      </div>

      <NewsList posts={posts} />
    </div>
  );
}

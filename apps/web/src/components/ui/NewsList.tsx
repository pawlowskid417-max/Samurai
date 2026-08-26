"use client";

import { useTransition } from "react";
import { deleteNews } from "@/app/admin/news/actions";
import Link from "next/link";

type NewsPost = {
  id: bigint;
  title: string;
  slug: string;
  publishedAt: Date | null;
};

export function NewsList({ posts }: { posts: NewsPost[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: bigint) => {
    if (confirm("Are you sure you want to delete this post?")) {
      startTransition(() => {
        deleteNews(Number(id));
      });
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-neutral-200 rounded-2xl bg-white text-neutral-400">
        No news posts yet. Create your first post above.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <table className="min-w-full divide-y divide-neutral-100 text-sm text-left">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-6 py-3.5 font-semibold text-neutral-600 text-xs tracking-wider uppercase">Title</th>
            <th className="px-6 py-3.5 font-semibold text-neutral-600 text-xs tracking-wider uppercase">Status</th>
            <th className="px-6 py-3.5 font-semibold text-neutral-600 text-xs tracking-wider uppercase">Date</th>
            <th className="px-6 py-3.5 font-semibold text-neutral-600 text-xs tracking-wider uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-neutral-50/60 transition-colors">
              <td className="px-6 py-4 font-medium text-brand-950 max-w-xs">
                <span className="line-clamp-1">{post.title}</span>
              </td>
              <td className="px-6 py-4">
                {post.publishedAt ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Draft
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-neutral-500 text-xs">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
              </td>
              <td className="px-6 py-4 text-right space-x-4">
                <Link
                  href={`/admin/news/${Number(post.id)}`}
                  className="text-brand-500 hover:text-brand-700 font-semibold text-xs transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={isPending}
                  className="text-red-400 hover:text-red-600 font-semibold text-xs transition-colors disabled:opacity-40"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

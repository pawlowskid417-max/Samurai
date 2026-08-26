"use client";

import { useTransition, useState } from "react";
import { createNews, updateNews } from "@/app/admin/news/actions";
import { useRouter } from "next/navigation";

type NewsPost = {
  id?: bigint;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  publishedAt: Date | null;
  featuredImageId?: bigint | null;
};

export function NewsForm({ initialData }: { initialData?: NewsPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isUploading, setIsUploading] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!initialData) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    const formData = new FormData(e.currentTarget);

    const imageFile = formData.get("imageFile") as File;
    let featuredImageId = initialData?.featuredImageId
      ? String(initialData.featuredImageId)
      : null;

    if (imageFile && imageFile.size > 0) {
      setIsUploading(true);
      try {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (uploadResult.success) {
          featuredImageId = uploadResult.media.id;
        } else {
          throw new Error(uploadResult.error || "Upload failed");
        }
      } catch (err: unknown) {
        setIsUploading(false);
        const message = err instanceof Error ? err.message : "Upload failed";
        setStatus({ type: "error", message: `Image upload failed: ${message}` });
        return;
      }
      setIsUploading(false);
    }

    if (featuredImageId) {
      formData.append("featuredImageId", featuredImageId);
    }

    startTransition(async () => {
      let result;
      if (initialData?.id) {
        result = await updateNews(Number(initialData.id), formData);
      } else {
        result = await createNews(formData);
      }

      if (result?.error) {
        setStatus({ type: "error", message: result.error });
      } else if (result?.success) {
        router.push("/admin/news");
      }
    });
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-brand-950 placeholder:text-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all duration-200 text-sm";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      {status.type === "error" && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className={labelClass}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={handleTitleChange}
            className={inputClass}
            placeholder="Post title"
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>Slug (URL)</label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClass}
            placeholder="post-url-slug"
          />
        </div>
      </div>

      <div>
        <label htmlFor="imageFile" className={labelClass}>Featured image</label>
        <input
          type="file"
          id="imageFile"
          name="imageFile"
          accept="image/*"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-brand-950 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100"
        />
        {initialData?.featuredImageId && (
          <p className="mt-1.5 text-xs text-neutral-400">Leave empty to keep existing image.</p>
        )}
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>Excerpt (short summary)</label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={initialData?.excerpt || ""}
          className={`${inputClass} resize-none`}
          placeholder="Brief description for cards and SEO…"
        />
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>Content body</label>
        <textarea
          id="body"
          name="body"
          required
          rows={14}
          defaultValue={initialData?.body || ""}
          className={`${inputClass} font-mono text-xs leading-relaxed`}
          placeholder="Full post content…"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          defaultChecked={!!initialData?.publishedAt}
          className="h-4 w-4 rounded border-neutral-300 text-brand-500 focus:ring-brand-100 bg-white accent-brand-500"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-neutral-700">
          Publish this post immediately
        </label>
      </div>

      <div className="pt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="rounded-full px-5 py-2 text-sm font-semibold text-neutral-600 border border-neutral-200 hover:bg-neutral-50 transition-all duration-150"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(59,114,232,0.3)] hover:bg-brand-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-50"
        >
          {isUploading
            ? "Uploading image…"
            : isPending
            ? "Saving…"
            : initialData
            ? "Update post"
            : "Create post"}
        </button>
      </div>
    </form>
  );
}

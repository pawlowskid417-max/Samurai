"use server";

import prisma from "database";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createNews(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const body = formData.get("body") as string;
  const isPublished = formData.get("isPublished") === "on";
  const featuredImageIdStr = formData.get("featuredImageId") as string;
  const featuredImageId = featuredImageIdStr ? BigInt(featuredImageIdStr) : null;

  if (!title || !slug || !body) {
    return { error: "Title, slug, and body are required." };
  }

  try {
    await prisma.newsPost.create({
      data: {
        title,
        slug,
        excerpt,
        body,
        featuredImageId,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("Failed to create news:", error);
    return { error: "Failed to create news. Make sure slug is unique." };
  }
}

export async function updateNews(id: number, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const body = formData.get("body") as string;
  const isPublished = formData.get("isPublished") === "on";
  const featuredImageIdStr = formData.get("featuredImageId") as string;
  const featuredImageId = featuredImageIdStr ? BigInt(featuredImageIdStr) : undefined;

  if (!title || !slug || !body) {
    return { error: "Title, slug, and body are required." };
  }

  try {
    const existing = await prisma.newsPost.findUnique({ where: { id } });
    
    // Only update publishedAt if status changed to published
    let publishedAt = existing?.publishedAt;
    if (isPublished && !existing?.publishedAt) {
      publishedAt = new Date();
    } else if (!isPublished) {
      publishedAt = null;
    }

    const dataToUpdate: any = {
      title,
      slug,
      excerpt,
      body,
      publishedAt,
    };
    
    if (featuredImageId !== undefined) {
      dataToUpdate.featuredImageId = featuredImageId;
    }

    await prisma.newsPost.update({
      where: { id },
      data: dataToUpdate,
    });

    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("Failed to update news:", error);
    return { error: "Failed to save changes. Make sure slug is unique." };
  }
}

export async function deleteNews(id: number) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    await prisma.newsPost.delete({ where: { id } });
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete news:", error);
    return { error: "Failed to delete." };
  }
}

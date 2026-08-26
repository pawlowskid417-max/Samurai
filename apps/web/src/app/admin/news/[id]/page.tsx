import prisma from "database";
import { NewsForm } from "@/components/ui/NewsForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit News Post - Admin Dashboard",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  
  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.newsPost.findUnique({
    where: { id: postId }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/news" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
          &larr; Back to News
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Edit Post: {post.title}</h1>
      
      <NewsForm initialData={post} />
    </div>
  );
}

import { NewsForm } from "@/components/ui/NewsForm";
import Link from "next/link";

export const metadata = {
  title: "Create News Post - Admin Dashboard",
};

export default function NewNewsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/news" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
          &larr; Back to News
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Create New Post</h1>
      
      <NewsForm />
    </div>
  );
}

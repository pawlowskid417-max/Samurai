import { Metadata } from "next";
import prisma from "database";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard - Dojo Academy",
};

const CARDS = [
  {
    title: "News & updates",
    desc: "Manage news posts, announcements, and articles shown on the public feed.",
    href: "/admin/news",
    cta: "Manage news",
  },
  {
    title: "Contact messages",
    desc: "Review and respond to messages submitted through the contact form.",
    href: "/admin/contact",
    cta: "View messages",
  },
  {
    title: "About us",
    desc: "Edit the Dojo's history, philosophy, and contact details shown publicly.",
    href: "/admin/about",
    cta: "Edit information",
  },
];

export default async function AdminDashboardPage() {
  const newsCount = await prisma.newsPost.count();
  const unreadMessagesCount = await prisma.contactSubmission.count({
    where: { status: "new" },
  });

  const badges: Record<string, React.ReactNode> = {
    "News & updates": (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
        {newsCount} total
      </span>
    ),
    "Contact messages":
      unreadMessagesCount > 0 ? (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
          {unreadMessagesCount} new
        </span>
      ) : (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
          All read
        </span>
      ),
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-950">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage your Dojo Academy content.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col hover:border-brand-200 hover:shadow-[0_4px_20px_rgba(59,114,232,0.07)] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3 gap-2">
              <h2 className="font-semibold text-brand-950">{card.title}</h2>
              {badges[card.title]}
            </div>
            <p className="text-neutral-500 text-sm mb-6 flex-grow leading-relaxed">{card.desc}</p>
            <Link
              href={card.href}
              className="text-sm font-semibold text-brand-500 hover:text-brand-700 transition-colors inline-flex items-center gap-1"
            >
              {card.cta} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

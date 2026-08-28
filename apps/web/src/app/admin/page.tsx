import { Metadata } from "next";
import prisma from "database";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pulpit trenera - Samuraj Lubań",
};

const CARDS = [
  {
    title: "Aktualności",
    desc: "Zarządzaj postami, ogłoszeniami i artykułami na stronie głównej.",
    href: "/admin/news",
    cta: "Zarządzaj wpisami",
  },
  {
    title: "Wiadomości",
    desc: "Przeglądaj zapytania wysłane przez formularz kontaktowy.",
    href: "/admin/contact",
    cta: "Wyświetl wiadomości",
  },
  {
    title: "O klubie",
    desc: "Edytuj historię, wartości i dane kontaktowe klubu.",
    href: "/admin/about",
    cta: "Edytuj informacje",
  },
];

export default async function AdminDashboardPage() {
  const newsCount = await prisma.newsPost.count();
  const unreadMessagesCount = await prisma.contactSubmission.count({
    where: { status: "new" },
  });

  const badges: Record<string, React.ReactNode> = {
    "Aktualności": (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
        Łącznie {newsCount}
      </span>
    ),
    "Wiadomości":
      unreadMessagesCount > 0 ? (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
          {unreadMessagesCount} nowe
        </span>
      ) : (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-100">
          Wszystkie przeczytane
        </span>
      ),
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-950">Pulpit trenera</h1>
        <p className="text-neutral-500 text-sm mt-1">Zarządzaj treściami klubu Samuraj Lubań.</p>
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

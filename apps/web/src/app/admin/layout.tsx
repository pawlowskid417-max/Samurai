import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const ADMIN_NAV = [
  { href: "/admin",         label: "Pulpit" },
  { href: "/admin/news",    label: "Aktualności" },
  { href: "/admin/about",   label: "O klubie" },
  { href: "/admin/contact", label: "Wiadomości" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-neutral-50 text-brand-950 flex flex-col">
      {/* Admin navbar */}
      {session && (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-6xl">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/admin" className="flex items-center gap-1.5 font-semibold text-lg text-brand-950">
                <span className="text-brand-600">Samuraj</span>
                <span>Admin</span>
                <span aria-hidden="true" className="ml-0.5 w-[6px] h-[6px] rounded-full bg-accent flex-shrink-0" />
              </Link>

              {/* Nav links */}
              <nav className="hidden md:flex gap-1 text-sm" aria-label="Admin navigation">
                {ADMIN_NAV.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 rounded-lg text-neutral-600 hover:text-brand-700 hover:bg-brand-50 transition-all duration-150 font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-neutral-400 hidden md:block text-xs">{session.user?.email}</span>
              <Link
                href="/"
                className="text-neutral-500 hover:text-brand-600 transition-colors text-xs font-medium"
                target="_blank"
              >
                Zobacz stronę ↗
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-neutral-500 hover:text-red-500 transition-colors font-medium text-sm"
                >
                  Wyloguj się
                </button>
              </form>
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

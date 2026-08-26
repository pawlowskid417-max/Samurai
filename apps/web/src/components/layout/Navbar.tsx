"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/news",    label: "News"     },
  { href: "/gallery", label: "Gallery"  },
  { href: "/about",   label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? "py-2"
            : "py-4"
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div
            className={`flex h-14 items-center px-5 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(6,14,48,0.08)] border border-neutral-200/80"
                : "bg-white/70 backdrop-blur-md border border-neutral-200/60"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 group" aria-label="Dojo Academy — go home">
              <span className="font-display text-lg font-semibold tracking-tight text-brand-950 group-hover:text-brand-700 transition-colors duration-200">
                Dojo
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-brand-600 group-hover:text-brand-500 transition-colors duration-200">
                Academy
              </span>
              {/* Hanko — red seal accent (印) */}
              <span
                aria-hidden="true"
                className="ml-0.5 w-[7px] h-[7px] rounded-full bg-accent flex-shrink-0 mt-px"
                title="Hanko seal"
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="ml-auto hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group ${
                      isActive
                        ? "text-brand-600 bg-brand-50"
                        : "text-neutral-600 hover:text-brand-700 hover:bg-brand-50"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500" />
                    )}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-brand-500 rounded-full hover:bg-brand-600 active:scale-[0.97] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_2px_8px_rgba(59,114,232,0.35)] hover:shadow-[0_4px_16px_rgba(59,114,232,0.45)]"
              >
                Join Now
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="ml-auto md:hidden p-2 rounded-lg text-neutral-600 hover:bg-brand-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="relative w-5 h-4">
                <span
                  className={`absolute left-0 block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "top-[7px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block w-5 h-[2px] bg-current rounded-full transition-all duration-200 ${
                    mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${
                    mobileOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-brand-950/20 backdrop-blur-sm" />
          <nav
            className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-[0_8px_40px_rgba(6,14,48,0.15)] border border-neutral-200 p-4 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-brand-600 bg-brand-50"
                      : "text-neutral-700 hover:text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 pt-2 border-t border-neutral-100">
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-3 text-base font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition-all"
              >
                Join Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

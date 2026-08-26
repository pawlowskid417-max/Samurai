import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-950 text-white">
      {/* Kōshi (格子) decorative top border — shoji grid pattern */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(59,114,232,0.5) 0px, rgba(59,114,232,0.5) 1px, transparent 1px, transparent 20px)",
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-display text-xl font-semibold tracking-tight text-white">Dojo</span>
              <span className="font-display text-xl font-semibold tracking-tight text-brand-300">Academy</span>
              {/* Hanko dot */}
              <span aria-hidden="true" className="ml-0.5 w-[7px] h-[7px] rounded-full bg-accent flex-shrink-0 mt-px" />
            </div>
            <p className="text-brand-300/70 text-sm max-w-xs leading-relaxed">
              Premier martial arts training. Building discipline, strength, and respect since 2014.
            </p>
            {/* Decorative kanji */}
            <p
              aria-hidden="true"
              className="mt-4 font-display text-6xl font-semibold text-brand-800/60 select-none leading-none"
            >
              武
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">Explore</p>
              <ul className="space-y-2">
                {[
                  { href: "/",        label: "Home"    },
                  { href: "/about",   label: "About"   },
                  { href: "/news",    label: "News"    },
                  { href: "/gallery", label: "Gallery" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-300/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">Contact</p>
              <ul className="space-y-2">
                {[
                  { href: "/contact", label: "Get in touch" },
                  { href: "/privacy", label: "Privacy policy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-300/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-brand-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-brand-400/60 text-xs">
          <p>© {year} Dojo Academy. All rights reserved.</p>
          <p className="font-display text-brand-700/60">道</p>
        </div>
      </div>
    </footer>
  );
}

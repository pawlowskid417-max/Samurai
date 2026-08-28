import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-950 text-white">
      {/* Separator-pędzel SVG zamiast prostej krawędzi */}
      <div aria-hidden="true" className="w-full overflow-hidden">
        <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-3 text-brand-700/50">
          <path
            d="M0 6 Q 150 2 300 6 T 600 6 T 900 6 T 1200 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d="M0 6 Q 150 10 300 6 T 600 6 T 900 6 T 1200 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-display text-xl font-semibold tracking-tight text-white">Samuraj</span>
              <span className="font-display text-xl font-semibold tracking-tight text-brand-300">Lubań</span>
              {/* Hanko dot */}
              <span aria-hidden="true" className="ml-0.5 w-[7px] h-[7px] rounded-full bg-accent flex-shrink-0 mt-px" />
            </div>
            <p className="text-brand-300/70 text-sm max-w-xs leading-relaxed">
              Klub sportowy Samuraj Lubań. Karate, judo i ju-jitsu — trening dyscypliny, siły i szacunku dla dzieci, młodzieży i dorosłych.
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
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">Nawigacja</p>
              <ul className="space-y-2">
                {[
                  { href: "/",        label: "Strona główna" },
                  { href: "/about",   label: "O klubie"      },
                  { href: "/news",    label: "Aktualności"   },
                  { href: "/gallery", label: "Galeria"       },
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
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-3">Kontakt</p>
              <ul className="space-y-2">
                {[
                  { href: "/contact", label: "Skontaktuj się" },
                  { href: "/privacy", label: "Polityka prywatności" },
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
          <p>© {year} Samuraj Lubań. Wszelkie prawa zastrzeżone.</p>
          <p className="font-display text-brand-700/60">道</p>
        </div>
      </div>
    </footer>
  );
}

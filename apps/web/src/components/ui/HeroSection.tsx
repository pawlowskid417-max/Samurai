import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import Grainient from "@/components/Grainient";

export function HeroSection() {
  return (
    <section
      id="main-content"
      className="relative overflow-hidden min-h-[100dvh] flex items-center py-16 md:py-24 lg:py-28 snap-start"
    >
      {/* Grainient WebGL background */}
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#5c8ef0"
          color2="#1a3fa0"
          color3="#060e30"
          grainAmount={0.055}
          timeSpeed={0.35}
          warpStrength={1.6}
        />
      </div>

      {/* Seigaiha wave pattern overlay — 6% opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0 0, transparent 24%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.06) 28%, transparent 29%),
            radial-gradient(circle at 20px 0, transparent 24%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.06) 28%, transparent 29%)
          `,
          backgroundSize: "40px 20px",
          backgroundPosition: "0 0, 20px 0",
        }}
      />

      {/* Kanji watermark — 武 (bu, martial/discipline) */}
      <span
        aria-hidden="true"
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12 font-display font-bold text-[clamp(6rem,18vw,16rem)] text-white/20 leading-none select-none pointer-events-none z-[1]"
      >
        武
      </span>

      {/* Vertical kanji label — left side, desktop only */}
      <span
        aria-hidden="true"
        className="vertical-label absolute left-6 top-1/2 -translate-y-1/2 text-white/30 font-display z-[1] hidden lg:block"
      >
        空手 · 柔道 · 柔術
      </span>

      <div className="container relative z-10 mx-auto px-4 max-w-6xl text-center flex flex-col items-center">

        {/* Enso circle decoration */}
        <FadeIn delay={0.05}>
          <svg
            viewBox="0 0 200 200"
            className="w-12 h-12 text-white/25 mb-4 mx-auto"
            aria-hidden="true"
          >
            <circle
              cx="100" cy="100" r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="470 60"
              transform="rotate(-100 100 100)"
            />
          </svg>
        </FadeIn>

        {/* H1 */}
        <FadeIn delay={0.15}>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-4xl mb-6 leading-[1.05]">
            Poznaj{" "}
            <span className="font-display text-brand-200 italic">Sztukę</span>
            {" "}Dyscypliny
          </h1>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="mt-2 text-lg leading-8 text-white/70 max-w-2xl mx-auto mb-12 md:text-xl font-light">
            Dołącz do klubu Samuraj Lubań i trenuj karate, judo lub ju-jitsu pod okiem doświadczonych trenerów.
            Buduj pewność siebie, siłę i szacunek — bez względu na wiek i poziom.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:bg-brand-50 active:scale-[0.97] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Rozpocznij trening
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-100 group-hover:bg-brand-200 group-hover:translate-x-0.5 transition-all duration-200">
                →
              </span>
            </Link>
            <Link
              href="/about"
              className="text-base font-semibold text-white/80 hover:text-white transition-colors duration-200 group"
            >
              Dowiedz się więcej{" "}
              <span aria-hidden="true" className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

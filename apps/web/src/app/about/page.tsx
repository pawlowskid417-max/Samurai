import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "About Us - Dojo Academy",
  description:
    "Learn about the history, philosophy, and values of Dojo Academy — a premier martial arts school built on discipline, respect, and continuous growth.",
};

export default function AboutPage() {
  return (
    <div className="bg-surface">
      {/* Page hero */}
      <section className="relative py-20 md:py-28 bg-brand-950 overflow-hidden">
        {/* Seigaiha pattern */}

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-4">
              About us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              The Way of <span className="font-display italic text-brand-200">Dojo Academy</span>
            </h1>
            <p className="text-brand-300/70 text-lg max-w-2xl">
              Rooted in tradition. Driven by purpose. Built for every stage of your martial arts journey.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 max-w-4xl py-20 md:py-28 space-y-24">

        {/* History */}
        <FadeIn>
          <section aria-labelledby="history-heading">
            <div className="flex items-start gap-6">
              {/* Kanji — 道 (dō — the Way) */}
              <div
                aria-hidden="true"
                className="hidden md:flex flex-shrink-0 w-20 items-center justify-center"
              >
                <span className="font-display text-6xl font-semibold text-brand-200 leading-none select-none">
                  道
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    aria-hidden="true"
                    className="md:hidden font-display text-3xl font-semibold text-brand-300 leading-none"
                  >
                    道
                  </span>
                  <h2
                    id="history-heading"
                    className="text-2xl md:text-3xl font-bold text-brand-950"
                  >
                    Our history
                  </h2>
                </div>
                <div className="h-px w-12 bg-brand-200 mb-6" />
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Founded with the belief that discipline shapes character, Dojo Academy has been
                  teaching traditional martial arts for over a decade. Our facility is designed to
                  foster a focused and respectful environment for practitioners of all levels — from
                  complete beginners to seasoned competitors.
                </p>
                <p className="text-neutral-600 leading-relaxed text-lg mt-4">
                  What began as a small community class has grown into a thriving school where
                  hundreds of students have discovered not just fighting techniques, but a way of
                  life.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Horizontal rule */}
        <div aria-hidden="true" className="h-px bg-neutral-200" />

        {/* Philosophy */}
        <FadeIn>
          <section aria-labelledby="philosophy-heading">
            <div className="flex items-start gap-6">
              {/* Kanji — 礼 (rei — respect/courtesy) */}
              <div
                aria-hidden="true"
                className="hidden md:flex flex-shrink-0 w-20 items-center justify-center"
              >
                <span className="font-display text-6xl font-semibold text-brand-200 leading-none select-none">
                  礼
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    aria-hidden="true"
                    className="md:hidden font-display text-3xl font-semibold text-brand-300 leading-none"
                  >
                    礼
                  </span>
                  <h2
                    id="philosophy-heading"
                    className="text-2xl md:text-3xl font-bold text-brand-950"
                  >
                    Our philosophy
                  </h2>
                </div>
                <div className="h-px w-12 bg-brand-200 mb-6" />
                <p className="text-neutral-600 leading-relaxed text-lg">
                  We believe in kaizen — continuous improvement. Training is not just about physical
                  strength, but mental fortitude, respect, and humility. Every bow before stepping
                  onto the mat is a reminder that we enter to learn, and we leave to grow.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Values */}
        <FadeIn>
          <section aria-labelledby="values-heading">
            <h2 id="values-heading" className="text-2xl md:text-3xl font-bold text-brand-950 mb-10">
              Core values
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { kanji: "礼", label: "Rei",       en: "Respect",    desc: "Respect for instructors, fellow students, and the art itself." },
                { kanji: "誠", label: "Makoto",    en: "Sincerity",  desc: "Genuine effort in every practice, every day." },
                { kanji: "道", label: "Dō",        en: "The Way",    desc: "A lifelong path of learning, not just a martial skill." },
              ].map((val) => (
                <div
                  key={val.kanji}
                  className="p-6 bg-white border border-neutral-200 rounded-2xl hover:border-brand-300 hover:shadow-[0_4px_20px_rgba(59,114,232,0.08)] transition-all duration-300"
                >
                  <p aria-hidden="true" className="font-display text-5xl text-brand-200 leading-none mb-4 select-none">
                    {val.kanji}
                  </p>
                  <p className="text-xs font-semibold tracking-widest uppercase text-brand-500 mb-1">
                    {val.label} — {val.en}
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}

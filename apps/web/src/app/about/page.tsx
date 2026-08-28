import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import prisma from "database";

export const metadata: Metadata = {
  title: "O klubie - Samuraj Lubań",
  description:
    "Poznaj historię, filozofię i wartości klubu Samuraj Lubań...",
};

export default async function AboutPage() {
  const aboutUs = await prisma.aboutUs.findUnique({
    where: { id: 1 }
  });

  const historyText = aboutUs?.history || "Klub Samuraj Lubań powstał z przekonania, że dyscyplina kształtuje charakter. Od lat uczymy tradycyjnych sztuk walki — karate, judo i ju-jitsu — dbając o to, by każdy trening odbywał się w atmosferze skupienia i wzajemnego szacunku. Nasze zajęcia są dostosowane do wszystkich poziomów zaawansowania — od pierwszych kroków na macie po starty w zawodach ogólnopolskich.\n\nTo, co zaczęło się jako niewielka grupa treningowa w Lubaniu, z czasem przerodziło się w prężnie działający klub, w którym setki zawodniczek i zawodników odkryły nie tylko techniki walki, ale też sposób na życie oparty na wytrwałości i szacunku.";

  const philosophyText = aboutUs?.philosophy || "Wierzymy w zasadę kaizen — ciągłego doskonalenia się. Trening to nie tylko rozwój fizyczny, ale też hart ducha, szacunek i pokora. Każdy ukłon przed wejściem na matę przypomina, że wchodzimy tam, by się uczyć, a schodzimy z niej trochę lepsi niż wcześniej.";

  return (
    <div className="bg-surface">
      {/* Page hero */}
      <section className="relative py-20 md:py-28 bg-brand-950 overflow-hidden">
        {/* Seigaiha pattern */}

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-4">
              O klubie
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Droga <span className="font-display italic text-brand-200">Samuraj Lubań</span>
            </h1>
            <p className="text-brand-300/70 text-lg max-w-2xl">
              Zakorzenieni w tradycji. Napędzani pasją. Dla każdego etapu Twojej przygody ze sztukami walki.
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
                    Nasza historia
                  </h2>
                </div>
                <div className="h-px w-12 bg-brand-200 mb-6" />
                <div className="text-neutral-600 leading-relaxed text-lg whitespace-pre-wrap space-y-4">
                  {historyText}
                </div>
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
                    Nasza filozofia
                  </h2>
                </div>
                <div className="h-px w-12 bg-brand-200 mb-6" />
                <div className="text-neutral-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {philosophyText}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Values */}
        <FadeIn>
          <section aria-labelledby="values-heading">
            <h2 id="values-heading" className="text-2xl md:text-3xl font-bold text-brand-950 mb-10">
              Nasze wartości
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { kanji: "礼", label: "Rei",       en: "Szacunek",    desc: "Szacunek dla trenerów, kolegów z maty oraz samej sztuki walki." },
                { kanji: "誠", label: "Makoto",    en: "Szczerość",  desc: "Prawdziwe zaangażowanie na każdym treningu, każdego dnia." },
                { kanji: "道", label: "Dō",        en: "Droga",    desc: "Sztuki walki jako droga rozwoju na całe życie, nie tylko umiejętność." },
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

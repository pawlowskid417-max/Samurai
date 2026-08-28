import prisma from "database";
import { ContactForm } from "@/components/ui/ContactForm";
import { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Kontakt - Samuraj Lubań",
  description: "Skontaktuj się z klubem Samuraj Lubań w sprawie zajęć, zapisów lub wydarzeń.",
};

export default async function ContactPage() {
  const contactInfo = await prisma.contactInfo.findUnique({
    where: { id: 1 },
  });

  const details = contactInfo
    ? [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          label: "Adres",
          value: contactInfo.address,
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          ),
          label: "Telefon",
          value: contactInfo.phone,
        },
        {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          label: "E-mail",
          value: contactInfo.email,
        },
        ...(contactInfo.hours
          ? [
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Godziny",
                value: contactInfo.hours,
              },
            ]
          : []),
      ]
    : [];

  return (
    <div className="bg-surface">
      {/* Page hero */}
      <section className="py-16 md:py-20 bg-brand-950 relative overflow-hidden">

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-400 mb-3">Kontakt</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Skontaktuj się z nami</h1>
            <p className="text-brand-300/70 mt-3 text-lg max-w-xl">
              Masz pytania o zajęcia, grafik treningów lub zapisy? Chętnie odpowiemy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <FadeIn>
            <div>
              {details.length > 0 && (
                <div className="space-y-5">
                  {details.map((d) => (
                    <div key={d.label} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-500">
                        {d.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-0.5">
                          {d.label}
                        </p>
                        <p className="text-neutral-700 whitespace-pre-line">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

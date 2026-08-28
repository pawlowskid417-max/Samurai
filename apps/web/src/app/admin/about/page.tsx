import prisma from "database";
import { AboutForms } from "@/components/ui/AboutForms";

export const metadata = {
  title: "O klubie - Ustawienia - Panel admina",
};

export default async function AdminAboutPage() {
  const aboutUs = await prisma.aboutUs.findUnique({ where: { id: 1 } });
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: 1 } });

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-950">Ustawienia: O klubie</h1>
        <p className="text-neutral-500 text-sm mt-0.5">
          Zarządzaj historią klubu i publicznymi danymi kontaktowymi.
        </p>
      </div>

      <AboutForms aboutUs={aboutUs} contactInfo={contactInfo} />
    </div>
  );
}

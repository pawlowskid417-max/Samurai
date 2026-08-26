import prisma from "database";
import { AboutForms } from "@/components/ui/AboutForms";

export const metadata = {
  title: "About Us Settings - Admin Dashboard",
};

export default async function AdminAboutPage() {
  const aboutUs = await prisma.aboutUs.findUnique({ where: { id: 1 } });
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: 1 } });

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-950">About Us settings</h1>
        <p className="text-neutral-500 text-sm mt-0.5">
          Manage the Dojo's public information, history, and contact details.
        </p>
      </div>

      <AboutForms aboutUs={aboutUs} contactInfo={contactInfo} />
    </div>
  );
}

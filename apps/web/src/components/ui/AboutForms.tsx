"use client";

import { useTransition, useState } from "react";
import { updateAboutInfo, updateContactInfo } from "@/app/admin/about/actions";

type AboutUs = { history: string | null; philosophy: string | null };
type ContactInfo = { address: string; phone: string; email: string; hours: string | null };

export function AboutForms({
  aboutUs,
  contactInfo,
}: {
  aboutUs: AboutUs | null;
  contactInfo: ContactInfo | null;
}) {
  const [isPendingAbout, startTransitionAbout] = useTransition();
  const [isPendingContact, startTransitionContact] = useTransition();

  const [aboutStatus, setAboutStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [contactStatus, setContactStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleAboutSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAboutStatus({ type: null, message: "" });
    const formData = new FormData(e.currentTarget);

    startTransitionAbout(async () => {
      const result = await updateAboutInfo(formData);
      if (result?.error) {
        setAboutStatus({ type: "error", message: result.error });
      } else if (result?.success) {
        setAboutStatus({ type: "success", message: "About Us information updated." });
      }
    });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus({ type: null, message: "" });
    const formData = new FormData(e.currentTarget);

    startTransitionContact(async () => {
      const result = await updateContactInfo(formData);
      if (result?.error) {
        setContactStatus({ type: "error", message: result.error });
      } else if (result?.success) {
        setContactStatus({ type: "success", message: "Contact information updated." });
      }
    });
  };

  const inputClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-brand-950 placeholder:text-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all duration-200 text-sm";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5";

  const StatusBanner = ({
    status,
  }: {
    status: { type: "success" | "error" | null; message: string };
  }) =>
    status.type ? (
      <div
        className={`mb-5 p-3.5 rounded-xl text-sm ${
          status.type === "success"
            ? "bg-green-50 border border-green-100 text-green-700"
            : "bg-red-50 border border-red-100 text-red-600"
        }`}
      >
        {status.message}
      </div>
    ) : null;

  return (
    <div className="space-y-8">
      {/* About Us Form */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-semibold text-brand-950 mb-6">Philosophy &amp; history</h2>

        <StatusBanner status={aboutStatus} />

        <form onSubmit={handleAboutSubmit} className="space-y-5">
          <div>
            <label htmlFor="history" className={labelClass}>History</label>
            <textarea
              id="history"
              name="history"
              required
              rows={5}
              defaultValue={aboutUs?.history || ""}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label htmlFor="philosophy" className={labelClass}>Philosophy</label>
            <textarea
              id="philosophy"
              name="philosophy"
              required
              rows={4}
              defaultValue={aboutUs?.philosophy || ""}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPendingAbout}
              className="rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(59,114,232,0.3)] hover:bg-brand-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-50"
            >
              {isPendingAbout ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>

      {/* Contact Info Form */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-semibold text-brand-950 mb-6">Contact information</h2>

        <StatusBanner status={contactStatus} />

        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-full">
            <label htmlFor="address" className={labelClass}>Address</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              defaultValue={contactInfo?.address || ""}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              defaultValue={contactInfo?.phone || ""}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={contactInfo?.email || ""}
              className={inputClass}
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="hours" className={labelClass}>Operating hours</label>
            <textarea
              id="hours"
              name="hours"
              required
              rows={3}
              defaultValue={contactInfo?.hours || ""}
              className={`${inputClass} resize-none`}
              placeholder={"Mon–Fri: 09:00–21:00\nSat: 09:00–16:00"}
            />
          </div>
          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              disabled={isPendingContact}
              className="rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(59,114,232,0.3)] hover:bg-brand-600 active:scale-[0.97] transition-all duration-200 disabled:opacity-50"
            >
              {isPendingContact ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

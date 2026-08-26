"use client";

import { useTransition, useState } from "react";
import { submitContactForm } from "@/app/contact/actions";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result?.error) {
        setStatus({ type: "error", message: result.error });
      } else if (result?.success) {
        setStatus({
          type: "success",
          message: "Thank you for reaching out. We'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  /* Input / label shared classes */
  const inputClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-brand-950 placeholder:text-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5";

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-[0_2px_16px_rgba(59,114,232,0.06)]">
      {status.type === "success" ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border border-green-100 text-green-600 mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-brand-950 mb-2">Message sent</h3>
          <p className="text-neutral-500 leading-relaxed">{status.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status.type === "error" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {status.message}
            </div>
          )}

          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="bot_field">Don&apos;t fill this out if you&apos;re human:</label>
            <input type="text" id="bot_field" name="bot_field" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="name" className={labelClass}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder="How can we help you?"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(59,114,232,0.3)] hover:bg-brand-600 hover:shadow-[0_4px_16px_rgba(59,114,232,0.4)] active:scale-[0.98] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}

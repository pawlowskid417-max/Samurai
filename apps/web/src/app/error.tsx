"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center min-h-[70vh] bg-surface">
      <div className="max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-100 text-red-500 mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-brand-950 mb-3">Coś poszło nie tak</h1>
        <p className="text-neutral-500 mb-10 leading-relaxed">
          Wystąpił nieoczekiwany błąd. Nasz zespół został o tym poinformowany.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 active:scale-[0.97] transition-all duration-200 w-full sm:w-auto shadow-[0_2px_12px_rgba(59,114,232,0.3)]"
          >
            Spróbuj ponownie
          </button>
          <button
            onClick={() => { window.location.href = "/"; }}
            className="px-6 py-3 border border-neutral-200 text-brand-700 font-semibold rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all duration-200 w-full sm:w-auto"
          >
            Wróć na stronę główną
          </button>
        </div>
      </div>
    </div>
  );
}

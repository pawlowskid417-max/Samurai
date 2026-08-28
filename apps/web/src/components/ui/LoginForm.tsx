"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/admin/login/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const inputClass =
    "block w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-brand-950 placeholder:text-neutral-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all duration-200";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5" htmlFor="email">
          E-mail
        </label>
        <input
          className={inputClass}
          id="email"
          type="email"
          name="email"
          placeholder="trener@samuraj-luban.pl"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5" htmlFor="password">
          Hasło
        </label>
        <input
          className={inputClass}
          id="password"
          type="password"
          name="password"
          placeholder="Wprowadź hasło"
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-brand-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(59,114,232,0.3)] hover:bg-brand-600 active:scale-[0.98] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        disabled={isPending}
      >
        {isPending ? "Logowanie…" : "Zaloguj się"}
      </button>

      {errorMessage && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
          <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}

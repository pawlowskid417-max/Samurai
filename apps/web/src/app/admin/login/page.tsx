import { LoginForm } from "@/components/ui/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Dojo Academy",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 bg-neutral-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <span className="font-display text-2xl font-semibold text-brand-950">Dojo</span>
            <span className="font-display text-2xl font-semibold text-brand-600">Academy</span>
            <span aria-hidden="true" className="ml-0.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
          </div>
          <h1 className="text-xl font-semibold text-brand-950 mt-1">Admin sign in</h1>
          <p className="text-neutral-400 text-sm mt-1">Enter your credentials to access the dashboard</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_2px_16px_rgba(59,114,232,0.06)]">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}

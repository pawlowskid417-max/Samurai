import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 text-center min-h-[70vh] bg-surface">
      <div className="max-w-md w-full">
        {/* Kanji 道 watermark */}
        <p
          aria-hidden="true"
          className="font-display text-[8rem] md:text-[10rem] font-bold text-brand-100 leading-none mb-0 select-none"
        >
          道
        </p>

        {/* 404 */}
        <h1 className="text-6xl font-black text-brand-950 -mt-4 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-brand-800 mb-4">Page not found</h2>
        <p className="text-neutral-500 mb-10 leading-relaxed">
          We couldn't find the page you're looking for. It may have been moved, or you may have mistyped the URL.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 active:scale-[0.97] transition-all duration-200 w-full sm:w-auto shadow-[0_2px_12px_rgba(59,114,232,0.3)]"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-neutral-200 text-brand-700 font-semibold rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all duration-200 w-full sm:w-auto group inline-flex items-center justify-center gap-2"
          >
            Contact us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}

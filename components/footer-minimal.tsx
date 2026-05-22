'use client';
import { trackPhoneClick } from '@/lib/analytics';

export function FooterMinimal() {
  return (
    <footer className="bg-espresso text-heather/70 py-8 text-center">
      <div className="max-w-site mx-auto px-6 lg:px-12 font-body text-[11px] uppercase tracking-caps flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <a href="tel:7205991664" onClick={trackPhoneClick} className="text-camel border-b border-camel">720-599-1664</a>
        <span className="text-camel/40">·</span>
        <span>Licensed &amp; insured</span>
        <span className="text-camel/40">·</span>
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-camel" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          5.0 stars on Google
        </span>
      </div>
    </footer>
  );
}

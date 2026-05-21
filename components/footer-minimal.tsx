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
        <span>5.0 on Google</span>
      </div>
    </footer>
  );
}

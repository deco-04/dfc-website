'use client';
import Link from 'next/link';
import { trackPhoneClick } from '@/lib/analytics';

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function BottomCta() {
  return (
    <section className="bg-linen-warm py-24 lg:py-36 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="display text-sage text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04] mb-10 max-w-[18ch] mx-auto">
          <span className="italic">Two ways</span> to start.
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-sage text-linen px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-sage-deep transition-all"
          >
            Book a free on-site estimate
            <ArrowRightIcon />
          </Link>
          <Link
            href="/remote-estimate"
            className="inline-flex items-center gap-3 border-2 border-flatiron text-flatiron px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-flatiron hover:text-linen transition-all"
          >
            Get an estimate from photos
          </Link>
        </div>
        <p className="font-body text-sm text-onyx/60 mt-8">
          Free estimate. Written line-item quote. 1-year workmanship warranty in writing.
        </p>
        <p className="font-body text-[12px] uppercase tracking-caps text-onyx/60 mt-4">
          Call or text <a href="tel:7205991664" onClick={trackPhoneClick} className="text-sage-deep border-b border-sage-deep">720-599-1664</a>
          <span className="mx-2 text-walnut-deep/40">·</span>
          Mon&ndash;Fri 8a&ndash;6p
          <span className="mx-2 text-walnut-deep/40">·</span>
          Denver Metro
        </p>
      </div>
    </section>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackPhoneClick } from '@/lib/analytics';

// Mobile-only persistent call/book bar. Appears once the visitor scrolls
// past ~80% of the first viewport (past the hero CTAs), so it never
// competes with the hero on first paint. Fixed overlay animated with
// transform only: zero layout shift. Hidden on routes where it would be
// redundant noise.
const SUPPRESSED = ['/book', '/thanks'];

export function StickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (SUPPRESSED.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      data-testid="sticky-cta"
      data-visible={visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-[transform,visibility] duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none invisible'
      }`}
    >
      <div
        className="grid grid-cols-2 gap-px bg-walnut-deep/20 border-t border-walnut-deep/20"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a
          href="tel:7205991664"
          onClick={trackPhoneClick}
          className="flex items-center justify-center gap-2 bg-linen text-sage-deep font-body text-[13px] font-semibold tracking-caps uppercase py-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call
        </a>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 bg-sage text-linen font-body text-[13px] font-semibold tracking-caps uppercase py-4"
        >
          Book estimate
        </Link>
      </div>
    </div>
  );
}

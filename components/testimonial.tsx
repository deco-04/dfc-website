import Image from 'next/image';
import Link from 'next/link';
import { ReviewWidget } from './review-widget';

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function Testimonial() {
  return (
    <section className="relative bg-espresso text-linen py-24 lg:py-36 overflow-hidden isolate">
      <Image
        src="/photos/basement-kallie-shower--landscape_16x9.jpg"
        alt=""
        fill
        className="object-cover opacity-15 saturate-50 -z-10"
        aria-hidden
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center reveal">
        {/* Was text-camel which fails WCAG AA against espresso (3.8:1).
            Lichen passes (4.5:1+) and stays on-brand. */}
        <div className="eyebrow text-lichen mb-6">A letter from Kallianne</div>
        <div className="font-display text-camel/35 text-9xl leading-none mb-[-3rem] select-none" aria-hidden>&ldquo;</div>
        <blockquote className="font-display italic text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug text-linen max-w-[30ch] mx-auto">
          Denver Flooring Collective did a <em className="text-camel">fantastic job</em> with our basement remodel.
          We replaced carpet with LVP and redid the shower tile. They had really competitive pricing, were great at communicating,
          and did <em className="text-camel">gorgeous work</em>. Andrew was very helpful during the initial planning phase and
          throughout the project. His team was great to work with. <em className="text-camel">We would use them again for future projects.</em>
        </blockquote>
        <footer className="mt-10 flex flex-col items-center gap-1.5">
          <span className="text-camel text-base tracking-wider">★★★★★</span>
          <span className="font-display text-2xl">Kallianne Watson</span>
          <span className="font-body text-[11px] uppercase tracking-caps text-heather/70">Google Review · May 2026</span>
        </footer>

        <hr className="border-camel/20 my-16" />

        <div className="text-left">
          <h3 className="font-display text-camel text-2xl mb-6 text-center">Read every recent review</h3>
          <ReviewWidget />
        </div>

        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 mt-10 font-body text-[13px] uppercase tracking-caps font-semibold text-camel border-b border-camel pb-1 hover:text-linen hover:border-linen transition-colors"
        >
          Read every review
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { FadeDiv, FadeFigure } from './motion-fade';

// IMPORTANT: lucide-react@1.x has an SSR/hydration bug in Next 15 (see Task 9 nav.tsx).
// Use inline SVGs for icons in this project until a downgrade or upstream fix lands.
function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="max-w-site mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-20">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
        <FadeDiv>
          <div className="eyebrow mb-6">Denver Metro · Front Range</div>
          <h1 className="display text-sage text-[clamp(3.5rem,9vw,9rem)] leading-[0.95]">
            Flooring,
            <br />
            <span className="italic text-sage-deep">installed just right</span>.
          </h1>
          {/*
            Copy refreshed 2026-05-23 per Liza:
            - Headline: 'Flooring, installed just right.'
            - Sub-deck (kept the original two-line, italic-second-line design
              treatment): craftsmanship-driven lasting install + expert
              guidance line.
          */}
          <p className="font-body text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed mt-8 max-w-prose">
            Craftsmanship-driven, lasting flooring installation, refinishing, and repairs.
          </p>
          <p className="font-body italic text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed mt-3 text-walnut-deep max-w-prose">
            Expert guidance for your home, floors, and lifestyle.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
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
              Send us your floorplan
            </Link>
          </div>
          {/*
            Mobile-first tagline layout. On mobile the previous horizontal-
            rule separators between phrases wrapped to mid-line dashes that
            read like broken em-dashes. Now: stacked phrases on mobile with
            tight leading; inline with sage-dot separators on sm and up.
          */}
          <div className="mt-10 font-display italic text-walnut-deep text-lg leading-snug">
            <span className="block sm:inline">Crafted floors.</span>
            <span aria-hidden className="hidden sm:inline mx-3 text-walnut-deep/40">&middot;</span>
            <span className="block sm:inline">Thoughtful process.</span>
            <span aria-hidden className="hidden sm:inline mx-3 text-walnut-deep/40">&middot;</span>
            <span className="block sm:inline">Built to last.</span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-walnut-deep/20">
            {[
              { big: '600+', label: 'Projects' },
              { big: '14',   label: 'Front Range cities' },
              { big: '1 yr', label: 'Warranty' },
              { big: '5.0',  label: 'stars · Google', star: true },
            ].map((t) => (
              <li key={t.label} className="flex flex-col">
                <strong className="display text-sage text-2xl leading-none flex items-center gap-1.5">
                  {t.big}
                  {t.star && (
                    <svg className="w-5 h-5 text-flatiron shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  )}
                </strong>
                <span className="font-body text-[10px] uppercase tracking-caps text-onyx/70 mt-1">{t.label}</span>
              </li>
            ))}
          </ul>
        </FadeDiv>

        <FadeFigure delayed className="bg-linen-warm p-4">
          <Image
            src="/photos/staircases-walnut-after--portrait_3x4.jpg"
            alt="Walnut-stained staircase recently installed by Denver Flooring Collective"
            width={720}
            height={960}
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="w-full h-auto"
          />
          <figcaption className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="eyebrow">No. 01</span>
            <span className="font-display italic text-xl text-espresso">Walnut stair remodel</span>
            <span className="ml-auto font-body text-[10px] uppercase tracking-caps text-onyx/60">Denver Metro · 2026</span>
          </figcaption>
        </FadeFigure>
      </div>
    </section>
  );
}

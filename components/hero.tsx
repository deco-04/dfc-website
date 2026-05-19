'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="eyebrow mb-6">Denver · Aurora · Front Range</div>
          <h1 className="display text-sage text-[clamp(3.5rem,9vw,9rem)] leading-[0.95]">
            Flooring,
            <br />
            <span className="italic text-sage-deep pl-8">installed right</span>
            <br />
            the first time.
          </h1>
          <p className="font-body text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed mt-8 max-w-prose">
            A Denver and Aurora install crew for hardwood, LVP, laminate, and tile.{' '}
            <em className="text-walnut-deep">You choose the materials. We do the install and make it last.</em>
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
          <div className="flex flex-wrap items-center gap-3 mt-10 font-display italic text-walnut-deep text-lg">
            <span>Crafted floors</span>
            <span className="inline-block w-9 h-px bg-walnut-deep/40" />
            <span>Thoughtful process</span>
            <span className="inline-block w-9 h-px bg-walnut-deep/40" />
            <span>Built to last</span>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-walnut-deep/20">
            {[
              { big: '600+', label: 'Projects' },
              { big: '1 yr',  label: 'Warranty' },
              { big: '5.0',   label: 'Google' },
              { big: 'L&I',   label: 'Licensed, insured' },
            ].map((t) => (
              <li key={t.label} className="flex flex-col">
                <strong className="display text-sage text-2xl leading-none">{t.big}</strong>
                <span className="font-body text-[10px] uppercase tracking-caps text-onyx/70 mt-1">{t.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="bg-linen-warm p-4"
        >
          <Image
            src="/photos/staircases-walnut-after--portrait_3x4.jpg"
            alt="Walnut-stained staircase recently installed by Denver Flooring Collective"
            width={900}
            height={1200}
            priority
            className="w-full h-auto"
          />
          <figcaption className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="eyebrow">No. 01</span>
            <span className="font-display italic text-xl text-espresso">Walnut stair remodel</span>
            <span className="ml-auto font-body text-[10px] uppercase tracking-caps text-onyx/60">Denver Metro · 2026</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

import Link from 'next/link';

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function SplitCards() {
  return (
    <section id="commercial" className="max-w-site mx-auto px-6 lg:px-12 py-12 lg:py-20 grid lg:grid-cols-2 gap-4">
      <article className="bg-linen-warm border-l-4 border-sage p-10 lg:p-14">
        <div className="eyebrow mb-4">Commercial work</div>
        <h2 className="display text-sage text-3xl lg:text-4xl">
          Offices, retail, and <span className="italic text-sage-deep">short-term rentals</span>.
        </h2>
        <p className="font-body text-onyx/85 mt-4 max-w-prose">
          Smaller commercial floors where the work has to be done right and done fast. Offices between leases.
          Retail buildouts with a hard opening date. Restaurants and short-term rentals where the floor takes a
          beating from day one. Same install crew, same warranty, same direct line to Andrew.
        </p>
        <Link href="/book" className="inline-flex items-center gap-2 mt-8 font-body text-[13px] uppercase tracking-caps font-semibold text-sage-deep border-b border-sage-deep pb-1 hover:text-flatiron hover:border-flatiron transition-colors">
          Get a commercial estimate
          <ArrowRightIcon />
        </Link>
      </article>

      <article className="bg-espresso text-linen border-l-4 border-flatiron p-10 lg:p-14">
        <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-flatiron mb-4">Refer a neighbor</div>
        <h2 className="display text-linen text-3xl lg:text-4xl">
          Get <span className="italic text-camel">$50</span>, then $100 more.
        </h2>
        <p className="font-body text-linen/85 mt-4 max-w-prose">
          Pass our name to a neighbor, designer, or contractor. When they request an estimate we send you a $50 gift card.
          When their project completes you choose another $100 gift card or 10% credit toward a future DFC project.
          No referral limit.
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 mt-8 font-body text-[13px] uppercase tracking-caps font-semibold text-flatiron border-b border-flatiron pb-1 hover:text-linen hover:border-linen transition-colors">
          See how it works
          <ArrowRightIcon />
        </a>
      </article>
    </section>
  );
}

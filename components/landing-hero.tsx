'use client';
import { GhlForm } from './ghl-form';
import type { UtmPayload } from '@/lib/utm';
import { trackPhoneClick } from '@/lib/analytics';

function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>);
}

export function LandingHero({ defaultsUtm }: { defaultsUtm: UtmPayload }) {
  const formId = process.env.NEXT_PUBLIC_GHL_FORM_REMOTE || 'THPaKoZtHXFieIRS9zE2';
  return (
    <section className="max-w-site mx-auto px-6 lg:px-12 py-10 lg:py-16">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <div className="eyebrow mb-4">Denver &middot; Aurora &middot; Front Range</div>
          <h1 className="display text-sage text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98]">
            Flooring,
            <br />
            <span className="italic text-sage-deep">installed right</span>
            <br />
            the first time.
          </h1>
          <p className="font-body text-onyx/85 mt-6 max-w-prose">
            A Denver and Aurora install crew for hardwood, LVP, laminate, and tile.
          </p>
          <p className="font-body italic text-walnut-deep mt-2 max-w-prose">
            You choose the materials. We install and warrant the work.
          </p>
          <a
            href="tel:7205991664"
            onClick={trackPhoneClick}
            className="inline-flex items-center gap-2 mt-6 font-body text-lg font-semibold text-sage hover:text-flatiron transition-colors"
          >
            <PhoneIcon /> Call or text 720-599-1664
          </a>
          <p className="font-display italic text-walnut-deep text-lg mt-8">
            Free estimate. No on-site visit required. 1-year warranty.
          </p>
        </div>
        <div className="bg-linen-warm p-6 lg:p-8">
          <h2 className="display text-sage text-2xl mb-4">Tell us about your space</h2>
          <GhlForm
            formId={formId}
            formName="Remote Estimate Lead Form"
            height="1583"
            defaultsUtm={defaultsUtm}
          />
        </div>
      </div>
    </section>
  );
}

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { GhlForm } from '@/components/ghl-form';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Work with us',
  description:
    'Hire on as a crew member, partner as a supplier or designer, or build a long-term referral relationship with Denver Flooring Collective.',
  path: '/work-with-us',
  image: OG_IMAGES.partner,
});

// Dedicated 'Work With Us Form' in GHL — provided by Andre 2026-05-25.
// Form name in GHL: "Work With Us Form". Andre confirmed height 1718.
// NEXT_PUBLIC_GHL_FORM_PARTNER overrides for staging/preview if needed,
// otherwise the dedicated form ID is used.
const PARTNER_FORM_ID =
  process.env.NEXT_PUBLIC_GHL_FORM_PARTNER || 'J4l5h2Lf5vXDLzMZJ0cG';

export default function WorkWithUsPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Work with us', path: '/work-with-us' }])} />
      <Nav />
      <main className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <div className="eyebrow mb-4">Work with us</div>
          <h1 className="display text-sage text-[clamp(2.75rem,7vw,6rem)] leading-[0.98]">
            Build the crew.
            <br />
            <span className="italic text-sage-deep">Build the network.</span>
          </h1>
          <p className="font-body text-onyx/85 mt-8 max-w-prose mx-auto text-lg leading-relaxed">
            Three ways to work with Denver Flooring Collective. Pick the one that fits and we will follow up within 24 hours.
          </p>
        </header>

        {/* Three-card layout */}
        <section className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto mb-20">
          <article className="bg-linen-warm border-l-4 border-sage p-8 lg:p-10">
            <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-walnut-deep mb-3">
              For installers
            </div>
            <h2 className="display text-sage text-2xl lg:text-3xl mb-3">
              Join the <span className="italic">crew</span>.
            </h2>
            <p className="font-body text-onyx/80 text-sm leading-relaxed">
              Skilled hardwood, LVP, tile, and refinishing installers. Year-round Denver work, paid on time, no chasing per-square-foot pennies.
            </p>
            <p className="font-body text-walnut-deep text-xs uppercase tracking-caps mt-5">
              Hiring continuously
            </p>
          </article>

          <article className="bg-linen-warm border-l-4 border-walnut-deep p-8 lg:p-10">
            <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-walnut-deep mb-3">
              For suppliers
            </div>
            <h2 className="display text-sage text-2xl lg:text-3xl mb-3">
              Become a <span className="italic">partner</span>.
            </h2>
            <p className="font-body text-onyx/80 text-sm leading-relaxed">
              Local flooring distributors, tile yards, finishing-supply houses. We move volume across hardwood, LVP, laminate, and tile every month. We expect contractor pricing and we pass it through.
            </p>
            <p className="font-body text-walnut-deep text-xs uppercase tracking-caps mt-5">
              Always open to new suppliers
            </p>
          </article>

          <article className="bg-espresso text-linen border-l-4 border-flatiron p-8 lg:p-10">
            <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-flatiron mb-3">
              For designers &amp; contractors
            </div>
            <h2 className="display text-linen text-2xl lg:text-3xl mb-3">
              Build a <span className="italic text-camel">referral</span> line.
            </h2>
            <p className="font-body text-linen/80 text-sm leading-relaxed">
              Interior designers, GCs, remodelers, real estate agents. Send us flooring jobs we are right for, get a $100 referral on each project that lands. Standing line of communication with Andrew.
            </p>
            <p className="font-body text-flatiron text-xs uppercase tracking-caps mt-5">
              $100 per landed referral
            </p>
          </article>
        </section>

        {/* Form */}
        <section className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <div className="eyebrow mb-3">Tell us about you</div>
            <h2 className="display text-sage text-3xl lg:text-4xl">
              One form. <span className="italic">Three paths</span>.
            </h2>
            <p className="font-body text-onyx/75 mt-3 max-w-prose mx-auto">
              Fill the form below. Andrew reviews every submission personally and follows up within 24 hours.
            </p>
          </header>

          {/*
            Dedicated 'Work With Us Form' in GHL. Form ID + 1718 height
            confirmed by Andre 2026-05-25.

            <GhlForm> (not a raw iframe) gives us UTM postMessage,
            loading="lazy", deduped form_embed.js script, and consistent
            styling with every other GHL embed in the site.
          */}
          <div className="bg-linen-warm p-6 lg:p-8">
            <GhlForm
              formId={PARTNER_FORM_ID}
              formName="Work With Us Form"
              height="1718"
              defaultsUtm={{ utm_source: 'work-with-us', landing_page: '/work-with-us' }}
            />
          </div>

          <p className="font-body text-[11px] uppercase tracking-caps text-onyx/55 mt-6 text-center">
            Prefer a direct line? Text or call{' '}
            <a href="tel:7205991664" className="text-sage-deep border-b border-sage-deep">
              720-599-1664
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

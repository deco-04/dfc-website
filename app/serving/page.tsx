import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ServiceAreaMap } from '@/components/service-area-map';
import { JsonLd } from '@/components/json-ld';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';
import { CITIES_INDEX } from '@/components/cities.data';

export const metadata = pageMetadata({
  title: 'Where we serve',
  description:
    'Denver Flooring Collective serves the Denver Metro and the Colorado Front Range. Hardwood, LVP, tile, and refinishing across 14 cities.',
  path: '/serving',
  image: OG_IMAGES.home,
});

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ServingPage() {
  const withDetail = CITIES_INDEX.filter((c) => c.hasDetailPage);
  const others = CITIES_INDEX.filter((c) => !c.hasDetailPage);

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Where we serve', path: '/serving' },
        ])}
      />
      <Nav />
      <main>
        {/* Hero */}
        <section className="max-w-site mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-20 lg:pb-16 text-center">
          <div className="eyebrow mb-4">Where we serve</div>
          <h1 className="display text-sage text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] max-w-[18ch] mx-auto">
            Denver Metro
            <br />
            <span className="italic text-sage-deep">and the Front Range</span>.
          </h1>
          <p className="font-body text-onyx/85 mt-8 max-w-prose mx-auto text-lg leading-relaxed">
            14 Front Range cities. Newer master-planned subdivisions, mid-century
            ranches, downtown Denver bungalows, mountain-foothills homes. Our crews
            stay focused on one project at a time and we travel by default within the
            Denver Metro.
          </p>
        </section>

        {/* Map */}
        <section className="max-w-site mx-auto px-6 lg:px-12 pb-16">
          <ServiceAreaMap />
        </section>

        {/* Cities with dedicated pages */}
        <section className="bg-linen-warm py-16 lg:py-24">
          <div className="max-w-site mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-10">
              <div className="eyebrow mb-3">Top markets</div>
              <h2 className="display text-sage text-3xl lg:text-5xl">
                Three cities, <span className="italic">deep coverage</span>.
              </h2>
              <p className="font-body text-onyx/85 mt-4 max-w-prose">
                We have enough project history in these three cities to know what the housing
                stock looks like, what the original builders cut corners on, and what
                material every era of construction wants.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
              {withDetail.map((c) => (
                <Link
                  key={c.slug}
                  href={`/serving/${c.slug}`}
                  className="block bg-linen border border-walnut-deep/15 p-6 lg:p-8 hover:border-sage transition-colors group"
                >
                  <div className="font-body text-[11px] uppercase tracking-caps text-walnut-deep mb-2">Detail page</div>
                  <h3 className="font-display text-sage text-2xl lg:text-3xl mb-3">{c.name}</h3>
                  <p className="font-body text-onyx/75 text-sm leading-relaxed">{c.blurb}</p>
                  <span className="inline-flex items-center gap-2 mt-4 font-body text-[12px] uppercase tracking-caps font-semibold text-sage-deep group-hover:text-flatiron transition-colors">
                    Read more <ArrowRightIcon className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All other cities */}
        <section className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl mb-10">
            <div className="eyebrow mb-3">Also serving</div>
            <h2 className="display text-sage text-3xl lg:text-5xl">
              Eleven <span className="italic">more cities</span>.
            </h2>
            <p className="font-body text-onyx/85 mt-4 max-w-prose">
              We work in these cities regularly but have not yet written dedicated pages.
              Same warranty, same install discipline. Reach out and we will
              walk your space.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((c) => (
              <li key={c.slug} className="bg-linen-warm p-5 border-l-4 border-walnut-deep/40">
                <h3 className="font-display text-sage text-xl">{c.name}</h3>
                <p className="font-body text-onyx/75 text-sm mt-2">{c.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom CTA */}
        <section className="bg-forest text-linen py-16 lg:py-24 text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-heather mb-3">Ready when you are</div>
            <h2 className="display text-4xl lg:text-6xl leading-[1.04]">
              Free estimate, <span className="italic">anywhere on the Front Range</span>.
            </h2>
            <p className="font-body text-linen/85 mt-6 max-w-prose mx-auto">
              On-site visit or remote review. Either way, a written quote within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link
                href="/book"
                className="inline-flex items-center gap-3 bg-camel text-espresso px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-linen transition-all"
              >
                Book a free on-site estimate
                <ArrowRightIcon />
              </Link>
              <Link
                href="/remote-estimate"
                className="inline-flex items-center gap-3 border-2 border-camel text-camel px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-camel hover:text-espresso transition-all"
              >
                Get an estimate from photos
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

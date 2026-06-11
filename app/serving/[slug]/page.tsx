import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { CITY_PAGES, getCityBySlug } from '@/components/cities.data';
import { FLOORS } from '@/components/floors.data';

export function generateStaticParams() {
  return CITY_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return pageMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/serving/${slug}`,
  });
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return notFound();

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Where we serve', path: '/serving' },
          { name: city.name, path: `/serving/${city.slug}` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: `${city.name}, Colorado`,
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Denver Metro' },
        }}
      />
      <Nav />
      <main>
        <section className="max-w-site mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4">{city.eyebrow}</div>
            <h1 className="display text-sage text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98]">
              Flooring in
              <br />
              <span className="italic text-sage-deep">{city.name}</span>.
            </h1>
            <p className="font-body text-onyx/85 mt-8 text-lg leading-relaxed">
              {city.lead}
            </p>
          </div>
        </section>

        <section className="bg-linen-warm py-16 lg:py-24">
          <div className="max-w-site mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="eyebrow mb-3">The housing</div>
              <h2 className="display text-sage text-3xl lg:text-4xl mb-6">
                What homes in {city.name} <span className="italic">look like</span>.
              </h2>
              <p className="font-body text-onyx/85 leading-relaxed text-lg">
                {city.housingNotes}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="eyebrow mb-3">Material picks</div>
            <h2 className="display text-sage text-3xl lg:text-4xl mb-6">
              What we usually <span className="italic">recommend</span> in {city.name}.
            </h2>
            <p className="font-body text-onyx/85 leading-relaxed text-lg">
              {city.flooringNotes}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
              {FLOORS.map((f) => (
                <Link
                  key={f.slug}
                  href={`/floors/${f.slug}`}
                  className="block bg-linen-warm p-4 border border-walnut-deep/15 hover:border-sage transition-colors"
                >
                  <div className="font-body text-[11px] uppercase tracking-caps text-walnut-deep">{f.eyebrow}</div>
                  <h3 className="font-display text-sage text-lg">{f.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-forest text-linen py-16 lg:py-24">
          <div className="max-w-site mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-heather mb-3">Recent {city.name} work</div>
              <h2 className="display text-3xl lg:text-4xl mb-8">
                A few <span className="italic">typical projects</span>.
              </h2>
              <ul className="space-y-5">
                {city.recentProjects.map((project, i) => (
                  <li key={i} className="flex gap-5 border-l-2 border-camel/40 pl-5">
                    <span className="font-display italic text-camel text-2xl shrink-0">{i + 1}</span>
                    <p className="font-body text-linen/90 leading-relaxed">{project}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <div className="eyebrow mb-3">Ready when you are</div>
          <h2 className="display text-sage text-4xl lg:text-6xl leading-[1.04] max-w-3xl mx-auto">
            Free {city.name} flooring <span className="italic">estimate</span>.
          </h2>
          <p className="font-body text-onyx/80 mt-6 max-w-prose mx-auto">
            On-site visit or remote review. Written quote within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
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
        </section>
      </main>
      <Footer />
    </>
  );
}

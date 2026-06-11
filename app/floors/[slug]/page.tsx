import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { FLOORS, getFloorBySlug } from '@/components/floors.data';

// Static params: one page per material slug.
export function generateStaticParams() {
  return FLOORS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const floor = getFloorBySlug(slug);
  if (!floor) return {};
  return pageMetadata({
    title: floor.metaTitle,
    description: floor.metaDescription,
    path: `/floors/${slug}`,
    image: {
      url: floor.ogImage,
      width: 1200,
      height: 630,
      alt: floor.photoAlt,
    },
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

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default async function FloorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFloorBySlug(slug);
  if (!f) return notFound();

  // Other floors for the cross-link list at the bottom.
  const others = FLOORS.filter((other) => other.slug !== f.slug);

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      {/* Two-level breadcrumb (Home -> Material). Google's
          BreadcrumbList docs treat URLs with only a fragment
          (e.g. /#services) as the same page as their parent,
          which makes the middle crumb ambiguous in Rich Results.
          Skipping the middle step keeps the trail unambiguous. */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: f.name, path: `/floors/${f.slug}` },
        ])}
      />
      <JsonLd data={buildFaqSchema(f.faqs)} />
      <Nav />
      <main>
        {/* Hero */}
        <section className="max-w-site mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
            <div>
              <div className="eyebrow mb-4">{f.eyebrow}</div>
              <h1 className="display text-sage text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98]">
                <span className="italic text-sage-deep">{f.headlineAccent}</span>
                <br />
                {f.headlineAfter}
              </h1>
              <p className="font-body text-onyx/85 mt-8 max-w-prose text-lg leading-relaxed">
                {f.lead}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-3 bg-sage text-linen px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-sage-deep transition-all"
                >
                  Book a free estimate
                  <ArrowRightIcon />
                </Link>
                <Link
                  href="/remote-estimate"
                  className="inline-flex items-center gap-3 border-2 border-flatiron text-flatiron px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-flatiron hover:text-linen transition-all"
                >
                  Get an estimate from photos
                </Link>
              </div>
            </div>
            <figure className="bg-linen-warm p-4">
              <Image
                src={f.photo}
                alt={f.photoAlt}
                width={1200}
                height={675}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full h-auto aspect-[16/9] object-cover"
              />
            </figure>
          </div>
        </section>

        {/* Best for / not for */}
        <section className="bg-linen-warm py-16 lg:py-24">
          <div className="max-w-site mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-10">
            <div>
              <div className="eyebrow mb-3">Best for</div>
              <h2 className="display text-sage text-3xl lg:text-4xl mb-6">
                Where {f.shortName} <span className="italic">shines</span>.
              </h2>
              <ul className="space-y-3 font-body text-onyx/85">
                {f.bestFor.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-sage mt-1 shrink-0"><CheckIcon /></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3">Not for</div>
              <h2 className="display text-walnut-deep text-3xl lg:text-4xl mb-6">
                Where it&rsquo;s <span className="italic">not the right call</span>.
              </h2>
              <ul className="space-y-3 font-body text-onyx/85">
                {f.notFor.map((n, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-walnut-deep mt-1 shrink-0"><MinusIcon /></span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Colorado notes */}
        <section className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="eyebrow mb-3">Built for Colorado</div>
            <h2 className="display text-sage text-3xl lg:text-4xl mb-6">
              What <span className="italic">Denver</span> does to {f.shortName.toLowerCase()}.
            </h2>
            <p className="font-body text-onyx/85 leading-relaxed text-lg">
              {f.coloradoNotes}
            </p>
          </div>
        </section>

        {/* Install steps */}
        <section className="bg-forest text-linen py-16 lg:py-24">
          <div className="max-w-site mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-10">
              <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-heather mb-3">How we install it</div>
              <h2 className="display text-3xl lg:text-4xl">
                The <span className="italic">install</span>, step by step.
              </h2>
            </div>
            <ol className="space-y-6 max-w-3xl">
              {f.install.map((step, i) => (
                <li key={i} className="flex gap-5 border-l-2 border-camel/40 pl-5">
                  <span className="font-display italic text-camel text-2xl shrink-0">{i + 1}</span>
                  <p className="font-body text-linen/90 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <p className="font-body text-heather text-sm mt-10 max-w-3xl border-t border-camel/20 pt-6">
              <span className="font-display italic text-camel">Timeline:</span> {f.timeline}
            </p>
          </div>
        </section>

        {/* FAQ rider */}
        <section className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="eyebrow mb-3 text-center">Plain questions</div>
            <h2 className="display text-sage text-3xl lg:text-4xl text-center mb-10">
              About {f.shortName.toLowerCase()} <span className="italic">specifically</span>.
            </h2>
            <div className="divide-y divide-walnut-deep/15 border-t border-b border-walnut-deep/15">
              {f.faqs.map((qa, i) => (
                <details key={i} className="group py-5">
                  <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                    <h3 className="font-display text-onyx text-lg lg:text-xl">{qa.q}</h3>
                    <span aria-hidden className="font-display text-walnut-deep text-2xl shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="font-body text-onyx/85 mt-4 leading-relaxed">{qa.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-link to other materials */}
        <section className="bg-linen-warm py-16 lg:py-24">
          <div className="max-w-site mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mb-8">
              <div className="eyebrow mb-3">Other categories</div>
              <h2 className="display text-sage text-3xl lg:text-4xl">
                We install <span className="italic">five</span> other floors too.
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/floors/${o.slug}`}
                    className="block bg-linen border border-walnut-deep/15 p-5 hover:border-sage transition-colors"
                  >
                    <div className="font-body text-[11px] uppercase tracking-caps text-walnut-deep mb-2">{o.eyebrow}</div>
                    <h3 className="font-display text-sage text-xl">{o.name}</h3>
                    <p className="font-body text-onyx/70 text-sm mt-2 line-clamp-2">{o.lead}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <div className="eyebrow mb-3">Ready when you are</div>
          <h2 className="display text-sage text-4xl lg:text-6xl leading-[1.04] max-w-3xl mx-auto">
            Free estimate for your <span className="italic">{f.shortName.toLowerCase()}</span> project.
          </h2>
          <p className="font-body text-onyx/80 mt-6 max-w-prose mx-auto">
            On-site visit or remote review. Either way, a written quote within 24 hours.
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

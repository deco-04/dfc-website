import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ReviewWidget } from '@/components/review-widget';
import { BottomCta } from '@/components/bottom-cta';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema, buildReviewSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Reviews',
  description: 'Real Google reviews from real Denver homeowners and business owners. 5.0 stars on Google, 600+ projects, 1-year workmanship warranty.',
  path: '/reviews',
  image: OG_IMAGES.reviews,
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildReviewSchema()} />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }])} />
      <Nav />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <header className="mb-12 text-center">
          <div className="eyebrow mb-3">Reviews</div>
          <h1 className="display text-sage text-5xl lg:text-7xl leading-[1.04]">
            <span className="italic">5.0 stars</span> on Google.
          </h1>
          {/* Visual 5-star row immediately below the H1. Stars use the same
              flatiron orange as the brand accents so they don't fight the
              sage headline. role="img" + aria-label gives screen readers a
              single readable rating instead of five 'star' announcements. */}
          <div role="img" aria-label="Rated 5 out of 5 stars" className="flex items-center justify-center gap-1 mt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} className="w-6 h-6 text-flatiron" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="font-body text-onyx/85 mt-4 max-w-prose mx-auto">
            Every project carries a 1-year workmanship warranty. Every install is a dedicated crew on your project.
            Below: every review, live from our Google Business Profile.
          </p>
        </header>
        <ReviewWidget />
        {/* Direct link to the GBP reviews page. Andre provided the
            canonical URL 2026-05-25 (place_id ChIJyfAeyyh9bIcROn-MDdfKru4). */}
        <div className="text-center mt-12">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJyfAeyyh9bIcROn-MDdfKru4"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 font-body text-[13px] uppercase tracking-caps font-semibold text-sage-deep border-b border-sage-deep pb-1 hover:text-flatiron hover:border-flatiron transition-colors"
          >
            Read every review on Google
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </main>
      <BottomCta />
      <Footer />
    </>
  );
}

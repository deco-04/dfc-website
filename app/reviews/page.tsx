import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ReviewWidget } from '@/components/review-widget';
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
      </main>
      <Footer />
    </>
  );
}

import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ReviewWidget } from '@/components/review-widget';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema, buildReviewSchema } from '@/lib/schema';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Reviews',
  description: 'Real Google reviews from real Denver homeowners and business owners. 5.0 average, 600+ projects, 1-year workmanship warranty.',
  path: '/reviews',
  image: OG_IMAGES.reviews,
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildReviewSchema()} />
      <Nav />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <header className="mb-12 text-center">
          <div className="eyebrow mb-3">Reviews</div>
          <h1 className="display text-sage text-5xl lg:text-7xl leading-[1.04]">
            <span className="italic">5.0</span> on Google.
          </h1>
          <p className="font-body text-onyx/85 mt-4 max-w-prose mx-auto">
            Every project carries a 1-year workmanship warranty. Every install is the same crew that walked your house.
            Below: every review, live from our Google Business Profile.
          </p>
        </header>
        <ReviewWidget />
      </main>
      <Footer />
    </>
  );
}

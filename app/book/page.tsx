import Link from 'next/link';
import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { GhlCalendar } from '@/components/ghl-calendar';
import { BookingTracker } from '@/components/booking-tracker';
import { RatingChip } from '@/components/rating-chip';
import { TrackedPhoneLink } from '@/components/tracked-phone-link';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a free on-site estimate',
  description: 'Pick a time. Our crew lead walks the space with you and gives you a written quote, no charge, no pressure.',
  path: '/book',
  image: OG_IMAGES.book,
});

export default function BookPage() {
  const calendarId = process.env.NEXT_PUBLIC_GHL_CALENDAR_BOOK || 'aEgakNOq8nqb7Iz4ag0z';
  return (
    <>
      <BookingTracker />
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Book a free estimate', path: '/book' }])} />
      <NavMinimal />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <header className="mb-10 text-center">
          <div className="eyebrow mb-3">Book your visit</div>
          <h1 className="display text-sage text-5xl lg:text-6xl leading-[1.04]">
            Pick a <span className="italic">time</span> that works.
          </h1>
          <p className="font-body text-onyx/85 mt-4 max-w-prose mx-auto">
            We&rsquo;ll walk your space, take measurements, and send you a written quote within 24 hours.
            Free, no obligation, no pressure.
          </p>
          <div className="mt-5 flex justify-center">
            <RatingChip />
          </div>
          <p className="font-body text-sm text-onyx/60 mt-3">
            Licensed and insured. Every install carries a 1-year workmanship warranty in writing.
          </p>
        </header>
        <GhlCalendar calendarId={calendarId} />

        {/* Fallback and escape hatch — serves slow/blocked iframes and no-time-fits cases */}
        <div className="mt-10 border-t border-walnut-deep/10 pt-8">
          <div className="eyebrow mb-2">No time that fits, or calendar not loading?</div>
          <p className="font-body text-sm text-onyx/75">
            <TrackedPhoneLink className="underline underline-offset-2 hover:text-sage transition-colors">
              Call or text 720-599-1664
            </TrackedPhoneLink>{' '}
            and we will set it up. Or send photos and measurements for a{' '}
            <Link href="/remote-estimate" className="underline underline-offset-2 hover:text-sage transition-colors">
              remote estimate
            </Link>
            . Same written quote, no visit needed.
          </p>
        </div>

        {/* What happens at the visit */}
        <div className="mt-10 border-t border-walnut-deep/10 pt-8">
          <div className="eyebrow mb-4">What happens at the visit</div>
          <ul className="grid md:grid-cols-3 gap-4 font-body text-sm text-onyx/75">
            <li>We measure, check the subfloor, and answer your questions.</li>
            <li>We do not sell materials, so there is nothing to upsell. You get straight advice and a written, line-item quote.</li>
            <li>Free, no obligation, no pressure.</li>
          </ul>
        </div>
      </main>
      <FooterMinimal />
    </>
  );
}

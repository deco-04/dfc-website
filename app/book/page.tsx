import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { GhlCalendar } from '@/components/ghl-calendar';
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
        </header>
        <GhlCalendar calendarId={calendarId} />
      </main>
      <FooterMinimal />
    </>
  );
}

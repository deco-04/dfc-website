import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { GhlCalendar } from '@/components/ghl-calendar';

export const metadata = {
  title: 'Book a free on-site estimate',
  description: 'Pick a time. The same crew that will install your floor walks the space with you and gives you a written quote, no charge, no pressure.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  const calendarId = process.env.NEXT_PUBLIC_GHL_CALENDAR_BOOK || 'aEgakNOq8nqb7Iz4ag0z';
  return (
    <>
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

'use client';
import Script from 'next/script';
import { useUtmCapture } from '@/lib/use-utm-capture';

export function GhlCalendar({ calendarId }: { calendarId: string }) {
  useUtmCapture();

  return (
    <>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${calendarId}`}
        loading="lazy"
        style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '900px' }}
        scrolling="no"
        id={`booking-${calendarId}`}
        title="Book a free on-site estimate"
      />
      <Script id="ghl-form-embed" src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}

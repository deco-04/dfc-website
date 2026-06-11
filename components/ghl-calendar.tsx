'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useUtmCapture } from '@/lib/use-utm-capture';
import { buildFormSrc } from '@/components/ghl-form';

export function GhlCalendar({ calendarId }: { calendarId: string }) {
  const utm = useUtmCapture();
  // Gate the iframe render until after hydration so server and client
  // first-render match (avoids hydration mismatch from sessionStorage read).
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const baseSrc = `https://api.leadconnectorhq.com/widget/booking/${calendarId}`;
  const src = mounted ? buildFormSrc(baseSrc, utm) : baseSrc;

  return (
    <>
      {!mounted && (
        <div style={{ width: '100%', minHeight: '900px' }} aria-hidden />
      )}
      {mounted && (
        <iframe
          src={src}
          loading="lazy"
          style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '900px' }}
          scrolling="no"
          id={`booking-${calendarId}`}
          title="Book a free on-site estimate"
        />
      )}
      <Script id="ghl-form-embed" src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}

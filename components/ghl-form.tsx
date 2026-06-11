'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useUtmCapture } from '@/lib/use-utm-capture';
import type { UtmPayload } from '@/lib/utm';

/**
 * Builds the final iframe src by appending non-empty UTM keys as query params.
 * Exported as a pure helper so it can be unit-tested without rendering.
 */
export function buildFormSrc(baseSrc: string, utm: UtmPayload | null): string {
  if (!utm) return baseSrc;
  const url = new URL(baseSrc);
  for (const [k, v] of Object.entries(utm)) {
    if (v) url.searchParams.set(k, v);
  }
  return url.toString();
}

export function GhlForm({
  formId,
  formName,
  height = '1600',
  defaultsUtm = {},
}: {
  formId: string;
  formName: string;
  height?: string;
  defaultsUtm?: UtmPayload;
}) {
  const utm = useUtmCapture(defaultsUtm);
  // Gate the iframe render until after hydration so that server and client
  // first-render match (avoids hydration mismatch from sessionStorage read).
  // Rendering the iframe only after mount also ensures the final src (with
  // UTM params already appended) is used on the very first load, so GHL's
  // hidden fields receive the values before the form script initialises.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const baseSrc = `https://api.leadconnectorhq.com/widget/form/${formId}`;
  const src = mounted ? buildFormSrc(baseSrc, utm) : baseSrc;

  return (
    <>
      {/* min-height placeholder prevents CLS while the iframe defers to mount */}
      {!mounted && (
        <div style={{ width: '100%', minHeight: `${height}px` }} aria-hidden />
      )}
      {mounted && (
        <iframe
          src={src}
          // loading="lazy" defers the iframe's 300KB+ widget bundle until the
          // user scrolls within ~1 viewport of it. Cuts LCP and TBT meaningfully
          // on form-bearing pages (book, remote-estimate, contact, work-with-us).
          loading="lazy"
          style={{ width: '100%', height: '100%', minHeight: `${height}px`, border: 'none', borderRadius: '20px' }}
          id={`inline-${formId}`}
          data-layout='{"id":"INLINE"}'
          data-trigger-type="alwaysShow"
          data-activation-type="alwaysActivated"
          data-deactivation-type="neverDeactivate"
          data-form-name={formName}
          data-height={height}
          data-layout-iframe-id={`inline-${formId}`}
          data-form-id={formId}
          title={formName}
        />
      )}
      {/* id dedupes the script tag across multiple <GhlForm> instances on the
          same page (e.g. a future page that renders contact + remote forms). */}
      <Script id="ghl-form-embed" src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}

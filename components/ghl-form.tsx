'use client';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useUtmCapture } from '@/lib/use-utm-capture';
import type { UtmPayload } from '@/lib/utm';

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const utm = useUtmCapture(defaultsUtm);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handler = () => {
      iframe.contentWindow?.postMessage(
        { type: 'dfc_utm', payload: utm },
        'https://api.leadconnectorhq.com'
      );
    };
    iframe.addEventListener('load', handler);
    return () => iframe.removeEventListener('load', handler);
  }, [utm]);

  return (
    <>
      <iframe
        ref={iframeRef}
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
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
      {/* id dedupes the script tag across multiple <GhlForm> instances on the
          same page (e.g. a future page that renders contact + remote forms). */}
      <Script id="ghl-form-embed" src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </>
  );
}

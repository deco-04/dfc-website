'use client';
import { useEffect, useState } from 'react';
import { captureUtmFromSearch, UtmPayload } from './utm';

export function useUtmCapture(defaults: UtmPayload = {}): UtmPayload {
  const [utm, setUtm] = useState<UtmPayload>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured = captureUtmFromSearch(params, {
      ...defaults,
      landing_page: window.location.pathname,
      referrer: document.referrer || undefined,
    });
    setUtm(captured);
    interface WindowWithDataLayer extends Window { dataLayer?: Record<string, unknown>[] }
    const w = window as WindowWithDataLayer;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'landing_page_view', ...captured });
  }, [defaults]);
  return utm;
}

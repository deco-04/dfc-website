'use client';
import { useEffect, useRef } from 'react';
import { readUtmFromStorage } from '@/lib/utm';
import { trackEvent } from '@/lib/analytics';

interface Props {
  /** The source key resolved by the /thanks page (e.g. 'default', 'calendar', 'remote-estimate'). */
  source: string;
}

/**
 * Fires one 'lead_submit' event to dataLayer on mount.
 * Renders nothing visible.
 * Guards against double-push with a ref so React StrictMode double-invoke
 * or re-renders do not duplicate the event.
 */
export function LeadTracker({ source }: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const utm = readUtmFromStorage();
    trackEvent('lead_submit', {
      lead_source: source,
      ...(utm ?? {}),
    });
  }, [source]);

  return null;
}

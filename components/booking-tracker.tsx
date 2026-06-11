'use client';
import { useEffect } from 'react';
import { trackCalendarBook } from '@/lib/analytics';
import { readUtmFromStorage } from '@/lib/utm';

// NOTE: The exact postMessage shape that GHL emits after a successful
// appointment booking has NOT been verified against a live booking session.
// This listener uses a defensive regex to match any message containing
// the words "appointment", "booked", or "booking_confirmed" from a known
// GHL origin. If the event never fires, the /thanks?source=calendar route
// (via LeadTracker) is the reliable fallback signal for lead_submit.
// Verify the real shape using the Network/Console tab after a test booking
// on a live environment and update the regex accordingly.

const GHL_ORIGINS = ['leadconnectorhq.com', 'msgsndr.com'];
const BOOKING_SIGNAL = /appointment|booked|booking_confirmed/i;

export function BookingTracker() {
  useEffect(() => {
    let fired = false;

    function handleMessage(event: MessageEvent) {
      if (fired) return;
      // Only process messages from known GHL origins.
      if (!GHL_ORIGINS.some((o) => event.origin.includes(o))) return;

      const raw = typeof event.data === 'string' ? event.data : JSON.stringify(event.data ?? '');
      if (!BOOKING_SIGNAL.test(raw)) return;

      fired = true;
      window.removeEventListener('message', handleMessage);

      const utm = readUtmFromStorage();
      trackCalendarBook({ ...(utm ?? {}) });
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return null;
}

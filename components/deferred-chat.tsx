'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Hold the GHL LeadConnector chat widget until the first user
 * interaction (or a 5s idle fallback). Identical pattern to
 * <DeferredAnalytics />, with a longer idle window because chat is
 * lower-priority than analytics — most visitors never click the chat
 * bubble at all, so the ~80KB widget bundle should not compete with
 * LCP / TBT for the average session.
 *
 * Why interaction-gating instead of plain lazyOnload:
 *   - lazyOnload still fires shortly after the load event, which on
 *     low-end mobile is still inside the LCP measurement window. The
 *     widget then pulls in ~80KB of JS plus a websocket connection,
 *     which inflates TBT and competes with main-thread work that
 *     actually matters (hydration, image decode).
 *   - Holding until interaction means the chat bubble appears within
 *     ~5s of page arrival OR the moment the visitor shows any signal
 *     of engagement (scroll, tap, mouse-move). Both are sufficient
 *     for the chat to be useful while keeping it out of the critical
 *     paint path.
 *   - Visitors who came to call the phone number (the dominant
 *     conversion path for DFC) will never trigger interaction, so
 *     the chat bubble never loads for them at all. That's fine —
 *     they did not need it.
 */
export function DeferredChat({
  widgetId = '691bcb73183503cc8a90af51',
}: {
  widgetId?: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const trigger = () => setShouldLoad(true);
    const events = ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'] as const;
    events.forEach((e) =>
      window.addEventListener(e, trigger, { once: true, passive: true })
    );
    const idleTimer = window.setTimeout(trigger, 5000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      window.clearTimeout(idleTimer);
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <Script
      id="ghl-chat-widget"
      src="https://widgets.leadconnectorhq.com/loader.js"
      strategy="lazyOnload"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={widgetId}
    />
  );
}

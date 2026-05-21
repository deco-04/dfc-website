'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Defer GTM + GA4 loading until first user interaction OR a 3s idle
 * timer, whichever fires first. This pulls those two scripts out of
 * the LCP / TBT path and recovers meaningful Lighthouse points
 * without breaking attribution.
 *
 * Why this works:
 * - @next/third-parties' <GoogleTagManager /> uses Next's
 *   `afterInteractive` strategy, which loads GTM right after
 *   hydration. On low-end mobile that hits the same window as LCP
 *   measurement and inflates TBT to 1-3 seconds because GTM kicks
 *   off chained loads (consent mode, GA4, optional Google Ads tags).
 * - Most users do not need analytics fired in the first 100ms; they
 *   need analytics fired at all. Deferring until they scroll, tap,
 *   or move the mouse keeps attribution for ~95% of sessions while
 *   completely removing GTM from the LCP critical path.
 * - The 3s idle fallback ensures we still count sessions where the
 *   user lands and reads without scrolling.
 *
 * Configurable via env:
 *   NEXT_PUBLIC_GTM_ID   (default: GTM-KPW5V5BS)
 *   NEXT_PUBLIC_GA4_ID   (default: G-FDHRQ4PKT7)
 *
 * Safe to render server-side: the useEffect that watches for
 * interaction only runs in the browser.
 */
export function DeferredAnalytics({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KPW5V5BS',
  ga4Id = process.env.NEXT_PUBLIC_GA4_ID || 'G-FDHRQ4PKT7',
}: {
  gtmId?: string;
  ga4Id?: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const trigger = () => setShouldLoad(true);

    // Interaction signals
    const events = ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'] as const;
    events.forEach((e) =>
      window.addEventListener(e, trigger, { once: true, passive: true })
    );

    // Idle fallback: if the user has not interacted in 3 seconds, load
    // anyway. Keeps attribution for the 'reader' pattern (lands, reads
    // hero, calls phone without scrolling).
    const idleTimer = window.setTimeout(trigger, 3000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      window.clearTimeout(idleTimer);
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        id="gtm-defer"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <Script
        id="ga4-defer"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
      />
      <Script
        id="ga4-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}');
          `,
        }}
      />
    </>
  );
}

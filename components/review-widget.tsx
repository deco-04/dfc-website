'use client';
import Script from 'next/script';

// GHL widget IDs ship in the public bundle (NEXT_PUBLIC_ prefix), so we
// safely hardcode the production values as fallbacks when the Cloudflare
// env vars are not configured. The env vars still take precedence so
// staging/preview can override with test IDs.
const FALLBACK_LOCATION_ID = 'I2MlUYbmAZIuOBANuXp4';
const FALLBACK_WIDGET_ID = '6a0b62ffa01ac8417c67e5ef';

export function ReviewWidget() {
  const locationId = process.env.NEXT_PUBLIC_GHL_LOCATION_ID || FALLBACK_LOCATION_ID;
  const widgetId = process.env.NEXT_PUBLIC_GHL_REVIEW_WIDGET || FALLBACK_WIDGET_ID;

  return (
    <>
      <iframe
        className="lc_reviews_widget"
        src={`https://reputationhub.site/reputation/widgets/review_widget/${locationId}?widgetId=${widgetId}`}
        loading="lazy"
        frameBorder={0}
        scrolling="no"
        style={{ minWidth: '100%', width: '100%', minHeight: '500px' }}
        title="Google reviews for Denver Flooring Collective"
      />
      {/* Use next/script with id-based dedupe instead of manual
          document.appendChild. Strategy lazyOnload defers until after
          first paint so the script does not block LCP on /reviews. */}
      <Script
        id="ghl-review-widget"
        src="https://reputationhub.site/reputation/assets/review-widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}

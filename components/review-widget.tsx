'use client';
import { useEffect } from 'react';

export function ReviewWidget() {
  useEffect(() => {
    if (document.querySelector('script[data-ghl-review-widget]')) return;
    const s = document.createElement('script');
    s.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    s.async = true;
    s.dataset.ghlReviewWidget = 'true';
    document.body.appendChild(s);
  }, []);

  // GHL widget IDs ship in the public bundle (NEXT_PUBLIC_ prefix), so we
  // safely hardcode the production values as fallbacks when the Cloudflare
  // env vars are not configured. The env vars still take precedence so
  // staging/preview can override with test IDs.
  const locationId = process.env.NEXT_PUBLIC_GHL_LOCATION_ID || 'I2MlUYbmAZIuOBANuXp4';
  const widgetId = process.env.NEXT_PUBLIC_GHL_REVIEW_WIDGET || '6a0b62ffa01ac8417c67e5ef';

  return (
    <iframe
      className="lc_reviews_widget"
      src={`https://reputationhub.site/reputation/widgets/review_widget/${locationId}?widgetId=${widgetId}`}
      frameBorder={0}
      scrolling="no"
      style={{ minWidth: '100%', width: '100%', minHeight: '500px' }}
      title="Google reviews for Denver Flooring Collective"
    />
  );
}

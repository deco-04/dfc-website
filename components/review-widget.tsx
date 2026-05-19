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

  const locationId = process.env.NEXT_PUBLIC_GHL_LOCATION_ID!;
  const widgetId = process.env.NEXT_PUBLIC_GHL_REVIEW_WIDGET!;

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

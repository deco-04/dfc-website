export const GOOGLE_REVIEWS_URL =
  'https://search.google.com/local/reviews?placeid=ChIJyfAeyyh9bIcROn-MDdfKru4';

function StarIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Small proof line for decision points (booking page). Links out to the
// real Google reviews so the claim is verifiable in one tap.
export function RatingChip({ className = '' }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-caps text-onyx/80 hover:text-sage-deep transition-colors ${className}`}
    >
      <StarIcon className="w-4 h-4 text-flatiron shrink-0" />
      <span>5.0 on Google</span>
      <span aria-hidden className="text-onyx/40">&middot;</span>
      <span>600+ floors installed</span>
    </a>
  );
}

import type { Metadata } from 'next';

/**
 * Single source of truth for the site's canonical base URL.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL env var (set this in Cloudflare to point at the
 *      live host before launch e.g. https://denverflooringcollective.com)
 *   2. Fallback to the current workers.dev preview URL so OG share images
 *      resolve correctly during pre-launch review.
 *
 * When the production domain is connected (Task 40), set NEXT_PUBLIC_SITE_URL
 * to `https://denverflooringcollective.com` in Cloudflare Pages env vars and
 * the override takes effect on the next deploy.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dfc-website.deco-f30.workers.dev';

const DEFAULT_OG_IMAGE = {
  url: '/og/dfc-share-1200x630.jpg',
  width: 1200,
  height: 630,
  alt: 'Denver Flooring Collective. Install-only crew for hardwood, LVP, laminate, and tile. Licensed, insured, 5.0 stars on Google. 720-599-1664.',
};

/**
 * Per-route OG image overrides. Each maps the page path to a generated
 * landscape share image with copy specific to that route. All are produced
 * by `pnpm run og` (scripts/build_og.py).
 *
 * Use:
 *   pageMetadata({ ..., image: OG_IMAGES.reviews })
 */
export const OG_IMAGES = {
  home: DEFAULT_OG_IMAGE,
  reviews: {
    url: '/og/dfc-reviews-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Real Denver flooring reviews. 5.0 stars on Google. 600+ projects completed.',
  },
  book: {
    url: '/og/dfc-book-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Book a free Denver flooring estimate. On-site or remote. Crew lead walks the space.',
  },
  remote: {
    url: '/og/dfc-remote-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Send your floorplan. Get a written Denver flooring quote within 24 hours.',
  },
  partner: {
    url: '/og/dfc-partner-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Work with Denver Flooring Collective. Installers, suppliers, referral partners.',
  },
  lpMeta: {
    url: '/og/dfc-lp-meta-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Free Denver flooring estimate. 600+ projects, 1-year warranty, licensed and insured.',
  },
  lpGoogle: {
    url: '/og/dfc-lp-google-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Free Denver flooring estimate. 600+ projects, 1-year warranty, licensed and insured.',
  },
  contact: {
    url: '/og/dfc-contact-1200x630.jpg',
    width: 1200,
    height: 630,
    alt: 'Text or call Denver Flooring Collective at 720-599-1664. We pick up.',
  },
} as const;

type PageMetadataInput = {
  /** Page-specific title (no need to include " · Denver Flooring Collective" suffix — template adds it). */
  title: string;
  description: string;
  /** Path under the site root, e.g. "/book". Used for canonical and og:url. */
  path: string;
  /** Override the default OG image if the page has its own. */
  image?: typeof DEFAULT_OG_IMAGE;
  /** Set true to noindex (e.g. /thanks, /lp/*). */
  noindex?: boolean;
};

/**
 * Build a consistent per-page Metadata object. Pages should call this in
 * their own `export const metadata = pageMetadata({ ... })` so og:title,
 * og:description, twitter:title and og:url all match the page itself
 * instead of cascading the default homepage values from layout.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Denver Flooring Collective',
      locale: 'en_US',
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
    // noindex pages (thanks, /lp/*) should still allow link-following so any
    // outbound links on them (e.g. phone/email/sister-page CTAs) pass link
    // equity. The previous ternary was a typo that emitted nofollow,nofollow.
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

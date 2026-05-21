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
  alt: 'A completed white-oak hardwood floor in a Denver-area home, installed by Denver Flooring Collective',
};

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

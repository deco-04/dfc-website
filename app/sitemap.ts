import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { FLOORS } from '@/components/floors.data';
import { CITY_PAGES } from '@/components/cities.data';

// Sitemap is built from SITE_URL so swapping the canonical domain only
// requires updating NEXT_PUBLIC_SITE_URL in CI. Routes intentionally exclude
// noindex pages (/thanks, /lp/*) — those should never appear in search.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const floorPages = FLOORS.map((f) => ({
    url: `${SITE_URL}/floors/${f.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));
  const cityPages = CITY_PAGES.map((c) => ({
    url: `${SITE_URL}/serving/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: now,
  }));
  return [
    { url: `${SITE_URL}/`,                changeFrequency: 'weekly',  priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/book`,            changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/remote-estimate`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    ...floorPages,
    { url: `${SITE_URL}/serving`,         changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    ...cityPages,
    { url: `${SITE_URL}/contact`,         changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/reviews`,         changeFrequency: 'weekly',  priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/work-with-us`,    changeFrequency: 'monthly', priority: 0.6, lastModified: now },
  ];
}

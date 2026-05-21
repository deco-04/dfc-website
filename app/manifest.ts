import type { MetadataRoute } from 'next';

// PWA manifest. Not because we want an installable PWA per se, but because:
// 1. iOS Safari uses the manifest's icon as the home-screen icon when a
//    visitor uses "Add to Home Screen".
// 2. Android Chrome uses theme_color for the URL bar tint, sage-on-linen
//    matches the brand.
// 3. Lighthouse PWA category checks for manifest presence; without it the
//    Best Practices score is capped lower than it could be.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Denver Flooring Collective',
    short_name: 'DFC',
    description:
      'Install-only flooring crew in Denver and Aurora. Hardwood, LVP, laminate, tile. 600+ projects. 1-year warranty.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F2EFE9',
    theme_color: '#567360',
    icons: [
      {
        src: '/logo/favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}

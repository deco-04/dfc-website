export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'] as string[],
    '@id': 'https://denverflooringcollective.com/#business',
    name: 'Denver Flooring Collective',
    legalName: 'Denver Flooring Collective LLC',
    url: 'https://denverflooringcollective.com/',
    description:
      'Install-only flooring crew serving the Denver metro from Aurora, Colorado. Hardwood, engineered hardwood, luxury vinyl plank, laminate, and tile installation. Customers buy materials; we install with no markup.',
    telephone: '+1-720-599-1664',
    priceRange: '$$',
    image: [
      'https://denverflooringcollective.com/og/dfc-share-1200x630.jpg',
      'https://denverflooringcollective.com/og/dfc-square-1200x1200.jpg',
    ],
    logo: 'https://denverflooringcollective.com/logo/logo-black.svg',
    sameAs: [
      'https://www.facebook.com/denverflooringcollective',
      'https://www.instagram.com/denver_flooring',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11068 E Louisiana Pl',
      addressLocality: 'Aurora',
      addressRegion: 'CO',
      postalCode: '80012',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 39.7034, longitude: -104.8634 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      'Denver',
      'Aurora',
      'Lakewood',
      'Littleton',
      'Centennial',
      'Westminster',
      'Arvada',
      'Broomfield',
      'Parker',
      'Lone Tree',
      'Highlands Ranch',
      'Boulder',
      'Cherry Hills Village',
      'Englewood',
    ].map((name) => ({ '@type': 'City', name })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    founder: { '@type': 'Person', name: 'Andrew Dean', jobTitle: 'Owner' },
    slogan: 'Crafted floors. Thoughtful process. Built to last.',
  };
}

export function buildFaqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function buildReviewSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': 'https://denverflooringcollective.com/#business' },
    author: { '@type': 'Person', name: 'Kallianne Watson' },
    datePublished: '2026-05',
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody:
      'Denver Flooring Collective did a fantastic job with our basement remodel. We replaced carpet with LVP and redid the shower tile in our bathroom. They had really competitive pricing, were great at communicating, and did gorgeous work. Andrew was very helpful during the initial planning phase and throughout the project. His team was great to work with. We would use them again for future projects!',
  };
}

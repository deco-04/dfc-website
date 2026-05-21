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
    // No streetAddress on purpose. DFC is install-only with no showroom or
    // walk-in location, and we keep the warehouse address off public
    // surfaces. The locality/region/postal triplet is enough for Google to
    // attach this LocalBusiness to the right service area in Knowledge Graph
    // without exposing the warehouse to inbound foot traffic or scrapers.
    address: {
      '@type': 'PostalAddress',
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

/**
 * Service catalog — one schema.org/Service node per install category.
 * Returned as a graph so it can be embedded alongside LocalBusiness on
 * the home page. Each Service references the business via @id so
 * Google can attach the offering to the right entity.
 */
export type ServiceSpec = {
  slug: string;
  name: string;
  description: string;
};

export function buildServiceCatalogSchema(services: ServiceSpec[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': services.map((s) => ({
      '@type': 'Service',
      '@id': `https://denverflooringcollective.com/#service-${s.slug}`,
      name: s.name,
      description: s.description,
      provider: { '@id': 'https://denverflooringcollective.com/#business' },
      serviceType: 'Flooring installation',
      areaServed: [
        { '@type': 'City', name: 'Denver' },
        { '@type': 'City', name: 'Aurora' },
        { '@type': 'City', name: 'Lakewood' },
        { '@type': 'City', name: 'Centennial' },
        { '@type': 'City', name: 'Boulder' },
        { '@type': 'City', name: 'Highlands Ranch' },
        { '@type': 'City', name: 'Parker' },
        { '@type': 'AdministrativeArea', name: 'Denver metro' },
        { '@type': 'AdministrativeArea', name: 'Colorado Front Range' },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free written estimate (on-site or remote).',
        availability: 'https://schema.org/InStock',
      },
    })),
  };
}

/**
 * BreadcrumbList for inner pages. Pass an array of crumbs in order
 * from home to current page.
 */
export type Breadcrumb = { name: string; path: string };

export function buildBreadcrumbSchema(crumbs: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `https://denverflooringcollective.com${c.path}`,
    })),
  };
}

/**
 * Standalone Person node for Andrew. Currently nested as `founder` inside
 * LocalBusiness, but a top-level Person with worksFor binding helps EEAT
 * signals (Google increasingly looks for the human behind the business).
 */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://denverflooringcollective.com/#andrew',
    name: 'Andrew Dean',
    jobTitle: 'Owner',
    worksFor: { '@id': 'https://denverflooringcollective.com/#business' },
    description:
      'Founder and owner of Denver Flooring Collective. Hands-on flooring installer with a focus on Denver-area residential and small commercial work.',
    knowsAbout: [
      'Hardwood flooring installation',
      'Engineered hardwood',
      'Luxury vinyl plank installation',
      'Tile installation',
      'Subfloor preparation',
      'Hardwood refinishing',
    ],
  };
}

/**
 * HowTo schema for the 5-step process on the home page.
 * Eligible for rich result on Google. Steps mirror components/process.tsx.
 */
export function buildProcessHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Denver Flooring Collective installs your floor',
    description:
      'The 5-step process Denver Flooring Collective follows on every install, from free estimate to 1-year workmanship warranty.',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
      description: 'Free written estimate (on-site or remote).',
    },
    step: [
      {
        '@type': 'HowToStep',
        name: 'Free estimate',
        text: 'On-site visit or remote review of photos and measurements. A written quote with labor, prep, and timeline broken out, line by line.',
        url: 'https://denverflooringcollective.com/book',
      },
      {
        '@type': 'HowToStep',
        name: 'Material selection',
        text: 'You buy your own flooring. We pass along contractor discounts at trusted local suppliers with no markup, no kickback. Optional pickup at cost.',
      },
      {
        '@type': 'HowToStep',
        name: 'Prep and protection',
        text: 'Subfloor checked, leveled, and moisture-tested. Doorways plastic-zipped. HVAC vents covered. Furniture protected.',
      },
      {
        '@type': 'HowToStep',
        name: 'Install',
        text: 'Same crew, every day. Manufacturer-spec installation. Daily updates so you always know what is happening tomorrow.',
      },
      {
        '@type': 'HowToStep',
        name: 'Final walkthrough',
        text: 'We walk every room with you. Anything not right gets fixed before the invoice closes. 1-year workmanship warranty in writing.',
      },
    ],
  };
}

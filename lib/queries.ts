import groq from 'groq';

export const HOMEPAGE_QUERY = groq`*[_type == 'homepage'][0]`;
export const FAQ_QUERY = groq`*[_type == 'faqItem'] | order(displayOrder asc){question, answer}`;
export const REVIEWS_FEATURED_QUERY = groq`*[_type == 'review' && featured == true] | order(date desc)[0..2]`;
export const SERVICE_CATEGORIES_QUERY = groq`*[_type == 'serviceCategory'] | order(displayOrder asc)`;
export const SERVICE_AREAS_QUERY = groq`*[_type == 'serviceArea'] | order(displayOrder asc){city}`;
export const SITE_SETTINGS_QUERY = groq`*[_type == 'siteSettings'][0]`;

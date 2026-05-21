import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'phone', type: 'string', title: 'Phone' }),
    defineField({ name: 'addressStreet', type: 'string', title: 'Street address' }),
    defineField({ name: 'addressCity', type: 'string', title: 'City' }),
    defineField({ name: 'addressState', type: 'string', title: 'State' }),
    defineField({ name: 'addressZip', type: 'string', title: 'Postal code' }),
    defineField({ name: 'hoursWeekday', type: 'string', title: 'Hours (weekdays)' }),
    defineField({ name: 'hoursWeekend', type: 'string', title: 'Hours (weekends)' }),
    defineField({ name: 'instagramUrl', type: 'url', title: 'Instagram URL' }),
    defineField({ name: 'facebookUrl', type: 'url', title: 'Facebook URL' }),
    defineField({ name: 'gbpReviewsUrl', type: 'url', title: 'Google reviews URL' }),
    defineField({ name: 'tagline', type: 'string', title: 'Brand tagline' }),
    defineField({ name: 'googleRating', type: 'string', title: 'Google rating (e.g. "5.0")' }),
    defineField({ name: 'reviewCount', type: 'number', title: 'Total Google review count' }),
    defineField({ name: 'projectsCount', type: 'string', title: 'Projects completed (e.g. "600+")' }),
    defineField({ name: 'warrantyYears', type: 'string', title: 'Workmanship warranty (e.g. "1 yr")' }),
  ],
});

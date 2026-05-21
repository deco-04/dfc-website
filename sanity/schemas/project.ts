import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project photo',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'string', title: 'Slug' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'serviceCategory' }], title: 'Category' }),
    defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
    defineField({ name: 'neighborhood', type: 'string', title: 'Neighborhood (optional)' }),
    defineField({ name: 'year', type: 'string', title: 'Year' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured' }),
  ],
});

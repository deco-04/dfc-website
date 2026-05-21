import { defineType, defineField } from 'sanity';

export const serviceCategory = defineType({
  name: 'serviceCategory',
  title: 'Service category',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'string', title: 'Slug (e.g. hardwood)' }),
    defineField({ name: 'label', type: 'string', title: 'Display label' }),
    defineField({ name: 'displayOrder', type: 'number', title: 'Display order' }),
    defineField({ name: 'swatch', type: 'string', title: 'Swatch hex color' }),
    defineField({ name: 'tag', type: 'string', title: 'Short tag (e.g. "Solid · Site-Finished")' }),
    defineField({ name: 'body', type: 'text', title: 'Body description' }),
  ],
});

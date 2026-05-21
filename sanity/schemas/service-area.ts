import { defineType, defineField } from 'sanity';

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service area',
  type: 'document',
  fields: [
    defineField({ name: 'city', type: 'string', title: 'City' }),
    defineField({ name: 'displayOrder', type: 'number', title: 'Display order' }),
  ],
});

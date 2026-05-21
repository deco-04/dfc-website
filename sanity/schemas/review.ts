import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({ name: 'author', type: 'string', title: 'Author' }),
    defineField({ name: 'rating', type: 'number', title: 'Rating', validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: 'body', type: 'text', title: 'Body' }),
    defineField({ name: 'date', type: 'date', title: 'Date' }),
    defineField({ name: 'source', type: 'string', title: 'Source (Google, etc.)' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured on homepage' }),
  ],
});

import { defineType, defineField } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', title: 'Question' }),
    defineField({ name: 'answer', type: 'text', title: 'Answer' }),
    defineField({ name: 'displayOrder', type: 'number', title: 'Display order' }),
  ],
});

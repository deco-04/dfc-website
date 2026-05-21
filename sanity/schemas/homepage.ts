import { defineType, defineField } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', type: 'string', title: 'Hero eyebrow' }),
    defineField({ name: 'heroHeadlineLine1', type: 'string', title: 'Hero headline · line 1' }),
    defineField({ name: 'heroHeadlineLine2Italic', type: 'string', title: 'Hero headline · italic middle line' }),
    defineField({ name: 'heroHeadlineLine3', type: 'string', title: 'Hero headline · line 3' }),
    defineField({ name: 'heroLede', type: 'text', title: 'Hero lede paragraph' }),
    defineField({ name: 'heroLedeEmphasis', type: 'text', title: 'Hero italic emphasis line (under lede)' }),
    defineField({ name: 'manifestoHeadline', type: 'string', title: 'Manifesto headline' }),
    defineField({ name: 'manifestoBody', type: 'array', title: 'Manifesto body', of: [{ type: 'block' }] }),
    defineField({ name: 'climateHeadline', type: 'string', title: 'Climate section headline' }),
    defineField({ name: 'climateBody', type: 'text', title: 'Climate body' }),
  ],
});

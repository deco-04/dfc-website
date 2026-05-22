import { describe, expect, it } from 'vitest';
import { buildLocalBusinessSchema, buildFaqSchema, buildReviewSchema } from '@/lib/schema';

describe('schema builders', () => {
  it('localBusiness has correct address and aggregate rating', () => {
    const s = buildLocalBusinessSchema();
    expect(s['@type']).toContain('LocalBusiness');
    expect(s.address.addressLocality).toBe('Aurora');
    expect(s.address.postalCode).toBe('80012');
    expect(s.aggregateRating.ratingValue).toBe('5.0');
    expect(s.founder.name).toBe('Andrew Dean');
  });

  it('localBusiness nests the Kallianne review in review[]', () => {
    // Reviews moved from a standalone Review node into LocalBusiness.review[]
    // on 2026-05-22 per Google's Rich Results guidance. The standalone
    // buildReviewSchema() now returns null; the canonical source of truth
    // is the nested array on the business entity.
    // Cast because the inline-object literal return type does not preserve
    // the review field shape — this is only a test, runtime is fine.
    const s = buildLocalBusinessSchema() as unknown as {
      review: { author: { name: string }; reviewRating: { ratingValue: string } }[];
    };
    expect(s.review).toBeDefined();
    expect(s.review[0].author.name).toBe('Kallianne Watson');
    expect(s.review[0].reviewRating.ratingValue).toBe('5');
  });

  it('faq schema mirrors the source questions', () => {
    const s = buildFaqSchema([{ q: 'Test?', a: 'Yes.' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.mainEntity[0].name).toBe('Test?');
    expect(s.mainEntity[0].acceptedAnswer.text).toBe('Yes.');
  });

  it('buildReviewSchema returns null (deprecated, kept for back-compat)', () => {
    // Will be removed once every page stops importing it.
    expect(buildReviewSchema()).toBeNull();
  });
});

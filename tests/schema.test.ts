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

  it('faq schema mirrors the source questions', () => {
    const s = buildFaqSchema([{ q: 'Test?', a: 'Yes.' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.mainEntity[0].name).toBe('Test?');
    expect(s.mainEntity[0].acceptedAnswer.text).toBe('Yes.');
  });

  it('review schema includes the Kallianne Watson quote', () => {
    const s = buildReviewSchema();
    expect(s.author.name).toBe('Kallianne Watson');
    expect(s.reviewRating.ratingValue).toBe('5');
  });
});

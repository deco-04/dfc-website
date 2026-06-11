import { describe, expect, it } from 'vitest';
import { buildFormSrc } from '@/components/ghl-form';

const BASE = 'https://api.leadconnectorhq.com/widget/form/abc123';

describe('buildFormSrc', () => {
  it('returns the base src unchanged when utm is null', () => {
    expect(buildFormSrc(BASE, null)).toBe(BASE);
  });

  it('returns the base src unchanged when utm is empty', () => {
    expect(buildFormSrc(BASE, {})).toBe(BASE);
  });

  it('appends utm_source and utm_medium as query params', () => {
    const result = buildFormSrc(BASE, { utm_source: 'google', utm_medium: 'cpc' });
    const url = new URL(result);
    expect(url.searchParams.get('utm_source')).toBe('google');
    expect(url.searchParams.get('utm_medium')).toBe('cpc');
  });

  it('skips keys with empty string values', () => {
    const result = buildFormSrc(BASE, { utm_source: 'meta', utm_campaign: '' });
    const url = new URL(result);
    expect(url.searchParams.get('utm_source')).toBe('meta');
    expect(url.searchParams.has('utm_campaign')).toBe(false);
  });

  it('does not append undefined values', () => {
    const result = buildFormSrc(BASE, { utm_source: 'fb', utm_term: undefined });
    const url = new URL(result);
    expect(url.searchParams.has('utm_term')).toBe(false);
  });

  it('appends all 5 utm keys when all are present', () => {
    const utm = {
      utm_source: 'meta',
      utm_medium: 'paid',
      utm_campaign: 'spring26',
      utm_content: 'ad1',
      utm_term: 'hardwood floor',
    };
    const result = buildFormSrc(BASE, utm);
    const url = new URL(result);
    expect(url.searchParams.get('utm_source')).toBe('meta');
    expect(url.searchParams.get('utm_campaign')).toBe('spring26');
  });
});

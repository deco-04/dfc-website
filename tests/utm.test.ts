import { describe, expect, it, beforeEach } from 'vitest';
import { captureUtmFromSearch, readUtmFromStorage, UTM_KEYS } from '@/lib/utm';

describe('captureUtmFromSearch', () => {
  beforeEach(() => sessionStorage.clear());

  it('extracts known utm and click-id keys from a query string', () => {
    const params = new URLSearchParams(
      'utm_source=meta&utm_medium=cpc&utm_campaign=foo&fbclid=ABC&irrelevant=x'
    );
    const result = captureUtmFromSearch(params);
    expect(result.utm_source).toBe('meta');
    expect(result.utm_medium).toBe('cpc');
    expect(result.utm_campaign).toBe('foo');
    expect(result.fbclid).toBe('ABC');
    expect((result as unknown as Record<string, string>).irrelevant).toBeUndefined();
  });

  it('writes captured data into sessionStorage under dfc_utm', () => {
    const params = new URLSearchParams('utm_source=google');
    captureUtmFromSearch(params);
    expect(readUtmFromStorage()?.utm_source).toBe('google');
  });

  it('returns null from storage when nothing has been captured', () => {
    expect(readUtmFromStorage()).toBeNull();
  });

  it('UTM_KEYS contains the 9 expected attribution fields', () => {
    expect([...UTM_KEYS].sort()).toEqual(
      ['fbclid','gclid','landing_page','referrer','utm_campaign','utm_content','utm_medium','utm_source','utm_term'].sort()
    );
  });

  it('URL params win over extras when the same key is present in both', () => {
    // extras = defaults supplied by the /lp page (e.g. utm_source:'meta').
    // When a real ad URL also carries utm_source, the ad value must survive.
    const params = new URLSearchParams('utm_source=facebook');
    const result = captureUtmFromSearch(params, { utm_source: 'meta', utm_medium: 'paid' });
    expect(result.utm_source).toBe('facebook'); // URL wins over default
    expect(result.utm_medium).toBe('paid');      // extras fill gap when URL has no value
  });
});

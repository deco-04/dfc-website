export const UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'gclid', 'landing_page', 'referrer',
] as const;

export type UtmKey = typeof UTM_KEYS[number];
export type UtmPayload = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = 'dfc_utm';

export function captureUtmFromSearch(params: URLSearchParams, extras: UtmPayload = {}): UtmPayload {
  // Apply extras as defaults first, then let URL params overwrite.
  // This ensures a real ad URL (utm_source=facebook) is never clobbered
  // by page-level defaults (utm_source:'meta' passed via defaultsUtm).
  const out: UtmPayload = { ...extras };
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) out[k] = v;
  }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(out));
  }
  return out;
}

export function readUtmFromStorage(): UtmPayload | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as UtmPayload) : null;
}

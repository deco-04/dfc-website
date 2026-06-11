import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia. Components use it to gate
// phone-only behavior; in tests it reports no match so those branches
// stay inert unless a test overrides it.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

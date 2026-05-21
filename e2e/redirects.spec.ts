import { test, expect } from '@playwright/test';

const PAIRS = [
  { from: '/calendar-website-onsite-free-estimate', to: '/book' },
  { from: '/remote-estimate-form',                  to: '/remote-estimate' },
];

for (const { from, to } of PAIRS) {
  test(`301: ${from} -> ${to} (preserves query)`, async ({ page }) => {
    const url = `${from}?utm_source=meta&utm_campaign=test`;
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    expect(page.url()).toContain(to);
    expect(page.url()).toContain('utm_source=meta');
  });
}

import { test, expect } from '@playwright/test';

test('homepage responds with 200 and Linen background', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(242, 239, 233)');
});

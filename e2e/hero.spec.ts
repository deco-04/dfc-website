import { test, expect } from '@playwright/test';

test('hero renders headline and two CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Flooring');
  await expect(page.getByRole('link', { name: /book a free on-site estimate/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /send us your floorplan/i })).toBeVisible();
});

import { test, expect } from '@playwright/test';

test('hero renders headline and two CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Flooring');
  await expect(page.getByRole('link', { name: /book a free on-site estimate/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /get an estimate from photos/i }).first()).toBeVisible();
});

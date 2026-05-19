import { test, expect } from '@playwright/test';

test('nav renders logo and phone CTA on homepage', async ({ page }) => {
  await page.goto('/');
  const logo = page.locator('[data-testid="nav-logo"]');
  await expect(logo).toBeVisible();
  await expect(page.locator('a[href^="tel:"]').first()).toContainText('720-599-1664');
});

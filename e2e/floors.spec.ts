import { test, expect } from '@playwright/test';

// Coverage for /floors/[slug] routes. Six static pages, one per material.
// Tests are intentionally shallow but broad: every floor returns 200,
// has the right H1, and ships the FAQ schema.

const FLOORS = [
  { slug: 'hardwood', expectedH1: /Hardwood/i },
  { slug: 'engineered', expectedH1: /Engineered/i },
  { slug: 'lvp', expectedH1: /LVP/i },
  { slug: 'laminate', expectedH1: /Laminate/i },
  { slug: 'tile', expectedH1: /Tile/i },
  { slug: 'refinishing', expectedH1: /Refinishing/i },
];

test.describe('Floor pages', () => {
  for (const floor of FLOORS) {
    test(`/floors/${floor.slug} renders correctly`, async ({ page }) => {
      const response = await page.goto(`/floors/${floor.slug}`);
      expect(response?.status()).toBe(200);

      // Single H1 with the expected material name
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
      const h1Text = await page.locator('h1').textContent();
      expect(h1Text).toMatch(floor.expectedH1);

      // FAQ schema present in JSON-LD
      const faqSchemaCount = await page
        .locator('script[type="application/ld+json"]')
        .count();
      expect(faqSchemaCount).toBeGreaterThanOrEqual(3); // LocalBusiness + Breadcrumb + FAQ

      // Breadcrumb link back to home is in the DOM via the next link list
      const homeLinks = await page.locator('a[href="/"]').count();
      expect(homeLinks).toBeGreaterThan(0);

      // CTA buttons present
      await expect(page.locator('a[href="/book"]').first()).toBeVisible();
      await expect(page.locator('a[href="/remote-estimate"]').first()).toBeVisible();
    });
  }

  test('Invalid floor slug returns 404', async ({ page }) => {
    const response = await page.goto('/floors/marble-which-we-do-not-install');
    expect(response?.status()).toBe(404);
  });

  test('Home services list links to all 6 floor pages', async ({ page }) => {
    await page.goto('/');
    for (const floor of FLOORS) {
      const link = page.locator(`a[href="/floors/${floor.slug}"]`).first();
      await expect(link).toHaveCount(1);
    }
  });
});

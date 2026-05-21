import { test, expect } from '@playwright/test';

// Coverage for /serving index + city sub-pages.

test.describe('Serving area pages', () => {
  test('/serving index renders + lists all 14 cities', async ({ page }) => {
    const response = await page.goto('/serving');
    expect(response?.status()).toBe(200);

    // H1 + key copy
    const h1 = await page.locator('h1').first().textContent();
    expect(h1).toMatch(/Denver metro/i);

    // All 14 cities should appear somewhere on the index (case-insensitive).
    // Cities span both the "top markets" cards and the "also serving" grid.
    const expectedCities = [
      'Denver', 'Aurora', 'Lakewood', 'Boulder', 'Broomfield',
      'Westminster', 'Arvada', 'Centennial', 'Highlands Ranch',
      'Parker', 'Lone Tree', 'Englewood', 'Cherry Hills Village',
      'Littleton',
    ];
    const body = await page.locator('body').textContent();
    for (const city of expectedCities) {
      expect(body).toContain(city);
    }
  });

  const detailCities = [
    { slug: 'denver', expectedName: 'Denver' },
    { slug: 'aurora', expectedName: 'Aurora' },
    { slug: 'lakewood', expectedName: 'Lakewood' },
  ];

  for (const city of detailCities) {
    test(`/serving/${city.slug} renders correctly`, async ({ page }) => {
      const response = await page.goto(`/serving/${city.slug}`);
      expect(response?.status()).toBe(200);

      const h1 = await page.locator('h1').first().textContent();
      expect(h1).toContain(city.expectedName);

      // Breadcrumb + Place schema present
      const ldJsonCount = await page
        .locator('script[type="application/ld+json"]')
        .count();
      expect(ldJsonCount).toBeGreaterThanOrEqual(3);

      // Cross-links to floor pages
      const floorLinks = await page.locator('a[href^="/floors/"]').count();
      expect(floorLinks).toBeGreaterThan(0);
    });
  }

  test('Invalid city slug returns 404', async ({ page }) => {
    const response = await page.goto('/serving/colorado-springs');
    expect(response?.status()).toBe(404);
  });
});

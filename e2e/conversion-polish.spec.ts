import { test, expect } from '@playwright/test';

test.describe('sticky mobile CTA', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 1440) > 767, 'mobile only');

  test('appears after scrolling past the hero and hides again at top', async ({ page }) => {
    await page.goto('/');
    const bar = page.getByTestId('sticky-cta');
    await expect(bar).toHaveAttribute('data-visible', 'false');
    // Use evaluate-based scroll as fallback since mouse.wheel may not fire
    // scroll events reliably on the mobile-iphone project viewport.
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
    await expect(bar).toHaveAttribute('data-visible', 'true');
    await expect(bar.getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:7205991664');
    await expect(bar.getByRole('link', { name: /book/i })).toHaveAttribute('href', '/book');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
    await expect(bar).toHaveAttribute('data-visible', 'false');
  });

  test('absent on /book', async ({ page }) => {
    await page.goto('/book');
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
    await expect(page.getByTestId('sticky-cta')).toHaveCount(0);
  });
});

test.describe('gallery lightbox', () => {
  test('opens, navigates, and closes', async ({ page }) => {
    await page.goto('/');
    const firstTile = page.locator('#projects button[aria-label^="View larger"]').first();
    await firstTile.scrollIntoViewIfNeeded();
    await firstTile.click();
    const dialog = page.locator('#projects dialog[open]').first();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('#projects dialog[open]')).toHaveCount(0);
  });
});

test.describe('proof links', () => {
  test('book page shows the rating chip linking to Google reviews', async ({ page }) => {
    await page.goto('/book');
    const chip = page.getByRole('link', { name: /5\.0 on Google/i });
    await expect(chip).toHaveAttribute('href', /search\.google\.com\/local\/reviews/);
  });
});

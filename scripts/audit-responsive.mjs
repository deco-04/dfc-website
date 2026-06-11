// Responsive overflow audit. Loads every public route at common device
// widths and reports any horizontal overflow plus the elements causing it.
// Usage: node scripts/audit-responsive.mjs  (expects the production server
// on http://localhost:3000; start it with: pnpm build && pnpm start)
import { chromium } from '@playwright/test';

const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const WIDTHS = [320, 360, 375, 414, 768, 1024, 1440];
const ROUTES = [
  '/',
  '/book',
  '/remote-estimate',
  '/contact',
  '/reviews',
  '/work-with-us',
  '/floors/hardwood',
  '/floors/engineered',
  '/floors/lvp',
  '/floors/laminate',
  '/floors/tile',
  '/floors/refinishing',
  '/serving',
  '/serving/denver',
  '/serving/aurora',
  '/serving/lakewood',
  '/lp/meta',
  '/lp/google',
  '/thanks?source=default',
];

const browser = await chromium.launch();
const page = await browser.newPage();
let failures = 0;

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
    // Scroll through the page to trigger lazy content, then settle.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(150);

    const result = await page.evaluate(() => {
      const vw = window.innerWidth;
      const overflow = document.documentElement.scrollWidth - vw;
      if (overflow <= 1) return { overflow: 0, offenders: [] };
      // Find elements that extend past the viewport and are NOT clipped by
      // an overflow-hidden/clip ancestor (those cannot widen the page).
      const clipped = (el) => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const o = getComputedStyle(p).overflowX;
          if (o === 'hidden' || o === 'clip') return true;
        }
        return false;
      };
      const offenders = [];
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if ((r.right > vw + 1 || r.left < -1) && r.width > 0 && !clipped(el)) {
          const cls = (el.className && el.className.toString ? el.className.toString() : '').slice(0, 70);
          offenders.push(
            `${el.tagName.toLowerCase()}${cls ? '.' + cls.split(' ').slice(0, 3).join('.') : ''} ` +
              `[w=${Math.round(r.width)} r=${Math.round(r.right)}] "${(el.textContent || '').trim().slice(0, 35)}"`
          );
        }
      });
      return { overflow, offenders: [...new Set(offenders)].slice(0, 6) };
    });

    if (result.overflow > 1) {
      failures++;
      console.log(`FAIL ${route} @${width}px: +${result.overflow}px`);
      for (const o of result.offenders) console.log(`     ${o}`);
    }
  }
  console.log(`done ${route}`);
}

await browser.close();
console.log(failures === 0 ? '\nALL CLEAN: no horizontal overflow on any route at any width.' : `\n${failures} route/width combinations overflow.`);
process.exit(failures === 0 ? 0 : 1);

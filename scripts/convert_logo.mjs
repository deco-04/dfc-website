// Rasterize the DFC SVG logo to a high-resolution PNG so the Python OG
// image generator can composite the real artwork instead of a drawn-by-PIL
// look-alike. Run once (or whenever logo-black.svg changes):
//
//   node scripts/convert_logo.mjs
//
// Output:
//   scripts/og-assets/logo-mark-1024.png   (transparent background, sage tint)
//   scripts/og-assets/logo-white-1024.png  (transparent background, linen tint)
//
// Sharp is already in node_modules (pulled in by Sanity for image processing
// on the studio side). No new dependency needed.

import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'scripts', 'og-assets');
mkdirSync(OUT_DIR, { recursive: true });

const SIZE = 1024;

async function rasterize(srcRelative, outName, tintHex = null) {
  const svgPath = join(ROOT, srcRelative);
  let svg = readFileSync(svgPath, 'utf8');

  // The DFC SVG defaults to black fills (logo-black.svg). If a tint is
  // requested, swap any pure black fill/stroke for the tint colour before
  // rasterizing. This keeps the original svg untouched but lets us emit
  // a sage version for OG composites that need brand accent over linen.
  if (tintHex) {
    svg = svg
      .replace(/fill="#000000"/g, `fill="${tintHex}"`)
      .replace(/fill="#000"/g, `fill="${tintHex}"`)
      .replace(/stroke="#000000"/g, `stroke="${tintHex}"`)
      .replace(/stroke="#000"/g, `stroke="${tintHex}"`);
  }

  const outPath = join(OUT_DIR, outName);
  await sharp(Buffer.from(svg))
    .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);

  console.log(`  -> ${outPath}`);
}

await rasterize('public/logo/logo-black.svg', 'logo-mark-1024.png');           // black
await rasterize('public/logo/logo-black.svg', 'logo-mark-sage-1024.png',  '#567360'); // sage
await rasterize('public/logo/logo-white.svg', 'logo-mark-linen-1024.png');     // already light

// Small nav logo. The full SVG is the brush-ring badge with a 3150x3189
// viewBox and complex vector paths — heavy to fetch + parse for a tiny
// 64x64 slot in the navbar. Lighthouse on 2026-05-21 picked it as the
// LCP element (7.3s on mobile) because of that. Rasterizing once to a
// 192px PNG (Retina-ready for the 64px display size) makes it tiny,
// cacheable, and keeps it out of the LCP path. Output goes directly
// into /public so Next.js serves it at the canonical URL.
const navSvgBlack = readFileSync(join(ROOT, 'public/logo/logo-black.svg'), 'utf8');
await sharp(Buffer.from(navSvgBlack))
  .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(join(ROOT, 'public/logo/logo-nav-192.png'));
console.log(`  -> public/logo/logo-nav-192.png`);

const navSvgWhite = readFileSync(join(ROOT, 'public/logo/logo-white.svg'), 'utf8');
await sharp(Buffer.from(navSvgWhite))
  .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(join(ROOT, 'public/logo/logo-nav-white-192.png'));
console.log(`  -> public/logo/logo-nav-white-192.png`);

// Apple touch icon. 180x180 is the standard size for iOS home-screen
// shortcuts. Previously /logo/favicon.png (32x32) was being served as
// the apple icon and iOS upscaled it. This fixes that.
await sharp(Buffer.from(navSvgBlack))
  .flatten({ background: '#F2EFE9' }) // linen background since iOS rounds the corners
  .resize(180, 180, { fit: 'contain', background: '#F2EFE9' })
  .png({ quality: 90 })
  .toFile(join(ROOT, 'public/logo/apple-touch-icon-180.png'));
console.log(`  -> public/logo/apple-touch-icon-180.png`);

console.log('Logo rasterization complete.');

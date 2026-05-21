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

console.log('Logo rasterization complete.');

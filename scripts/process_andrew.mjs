// One-shot script: process the Andrew Dean portrait from
// scripts/photos-src/andrew-dean.png into the optimized JPG variants
// the manifesto + schema need. Re-run any time the source is updated.
//
//   node scripts/process_andrew.mjs

import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'scripts', 'photos-src', 'andrew-dean.png');
const OUT_DIR = join(ROOT, 'public', 'photos');

async function emit(size, suffix) {
  const out = join(OUT_DIR, `andrew-dean${suffix}.jpg`);
  await sharp(SRC)
    .rotate() // honor EXIF
    .resize(size, size, { fit: 'cover', position: sharp.strategy.attention })
    .modulate({ brightness: 1.02, saturation: 1.04 }) // subtle warmth
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(out);
  console.log(`  -> ${out}`);
}

await emit(1200, '@2x'); // Retina source
await emit(600,  '');    // 1x source for the manifesto slot
console.log('Andrew portrait processed.');

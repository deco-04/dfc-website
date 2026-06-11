import { describe, expect, it } from 'vitest';
import manifest from '../public/photos/manifest.json';
import lqip from '../public/photos/lqip.json';

type Item = { slug: string; src_4x3: string };
type Category = { label: string; items: Item[] };

describe('lqip.json', () => {
  const categories = manifest as unknown as Record<string, Category>;
  const placeholders = lqip as unknown as Record<string, string>;

  it('has a data-URI placeholder for every gallery tile in the manifest', () => {
    const missing: string[] = [];
    for (const cat of Object.values(categories)) {
      for (const item of cat.items) {
        if (!placeholders[item.src_4x3]) missing.push(item.src_4x3);
      }
    }
    expect(missing).toEqual([]);
  });

  it('placeholders are small base64 jpeg data URIs', () => {
    for (const value of Object.values(placeholders)) {
      expect(value.startsWith('data:image/jpeg;base64,')).toBe(true);
      expect(value.length).toBeLessThan(2500);
    }
  });
});

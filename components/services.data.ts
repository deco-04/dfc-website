export type Specimen = {
  slug: string;
  name: string;
  body: string;
  swatch: string; // hex
  tag: string;
};

export const SPECIMENS: Specimen[] = [
  {
    slug: 'hardwood',
    name: 'Hardwood',
    body: 'Solid oak, walnut, and other species over plywood or sleeper subfloors. Nailed, glued, or floated to manufacturer spec. Acclimated on site for Colorado humidity swings.',
    swatch: '#B07B4E',
    tag: 'Solid · Site-Finished',
  },
  {
    slug: 'engineered',
    name: 'Engineered Hardwood',
    body: 'Pre-finished and site-finished engineered planks. Stable for basements and concrete slabs where solid hardwood cannot go.',
    swatch: '#85532D',
    tag: 'Slab-Safe · Wide-Plank',
  },
  {
    slug: 'lvp',
    name: 'Luxury Vinyl Plank',
    body: 'Click-lock and glue-down LVP with the right underlayment and moisture barrier. Quiet, warm, and forgiving for kids and pets.',
    swatch: '#8AA699',
    tag: 'Waterproof · Pet-Friendly',
  },
  {
    slug: 'laminate',
    name: 'Laminate',
    body: 'Click-lock laminate with proper expansion gaps and seam alignment. A budget-friendly option that holds up to traffic, kids, and Colorado dryness.',
    swatch: '#D9C7B8',
    tag: 'Budget · Durable',
  },
  {
    slug: 'tile',
    name: 'Tile & Shower Tile',
    body: 'Porcelain, ceramic, and natural stone for kitchens, baths, entryways, and shower walls. Grout color, lippage, and pattern alignment dialed in.',
    swatch: '#274034',
    tag: 'Wet Areas · Hand-Set',
  },
  {
    slug: 'refinishing',
    name: 'Sanding & Refinishing',
    body: 'Bring tired hardwood back to life. Dustless sanding, custom stain matching, water-based or oil finishes.',
    swatch: '#2B1810',
    tag: 'Dustless · Custom Stain',
  },
];

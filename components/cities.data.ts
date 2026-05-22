// City data for /serving + /serving/<slug> pages.
// Index entries are short blurbs for the /serving overview page.
// Detail entries are longer pages with neighborhood/housing-stock specifics
// for the top markets where DFC has consistent project volume.
//
// Honest scope: writing 14 unique 400-word city pages would be doorway
// content. Three real city pages (Denver, Aurora, Lakewood) plus a
// substantive index that covers all 14 with linked sub-pages where the
// detail exists. Add more sub-pages later only when Andrew has truly
// differentiated story per city.

export type CityIndex = {
  slug: string;
  name: string;
  blurb: string; // 1-2 sentences for the index list
  hasDetailPage: boolean;
};

export type CityPage = {
  slug: string;
  name: string;
  eyebrow: string; // neighborhood/housing tag
  lead: string; // 2-3 sentences
  housingNotes: string; // what's typical in this city's homes
  flooringNotes: string; // material recommendations specific to this area
  recentProjects: string[]; // bullet list of typical project types
  metaTitle: string;
  metaDescription: string;
};

export const CITIES_INDEX: CityIndex[] = [
  { slug: 'denver',               name: 'Denver',               blurb: 'Bungalows, Victorians, mid-century ranches, and modern infill across the city core. Hardwood and refinishing volume is heaviest here.', hasDetailPage: true },
  { slug: 'aurora',               name: 'Aurora',               blurb: 'Newer construction with slab-on-grade and finished basements. Engineered hardwood, LVP, and tile carry most of the volume.', hasDetailPage: true },
  { slug: 'lakewood',             name: 'Lakewood',             blurb: 'Mix of mid-century ranches and newer townhomes near the Federal corridor. Refinishing and LVP volume is high.', hasDetailPage: true },
  { slug: 'boulder',              name: 'Boulder',              blurb: 'Older housing stock with character-grade hardwood floors; modern townhomes in north and east Boulder benefit from engineered + LVP.', hasDetailPage: false },
  { slug: 'broomfield',           name: 'Broomfield',           blurb: 'Newer master-planned neighborhoods. Engineered hardwood and LVP dominate. Slab-on-grade is common.', hasDetailPage: false },
  { slug: 'westminster',          name: 'Westminster',          blurb: 'A mix of 1970s ranches with finished basements and newer single-family construction. Tile + LVP common.', hasDetailPage: false },
  { slug: 'arvada',               name: 'Arvada',               blurb: 'Established neighborhoods, refinishing-rich. Old Town Arvada has true-grade hardwoods worth saving.', hasDetailPage: false },
  { slug: 'centennial',           name: 'Centennial',           blurb: 'Newer construction, lots of finished basements. Engineered hardwood, LVP, and bathroom tile.', hasDetailPage: false },
  { slug: 'highlands-ranch',      name: 'Highlands Ranch',      blurb: 'Master-planned community housing stock. LVP and engineered are the most-requested categories.', hasDetailPage: false },
  { slug: 'parker',               name: 'Parker',               blurb: 'Larger lots, newer construction. Tile-floor entries and engineered-throughout are common requests.', hasDetailPage: false },
  { slug: 'lone-tree',            name: 'Lone Tree',            blurb: 'Higher-end single-family homes. Wide-plank engineered hardwood and luxury tile work.', hasDetailPage: false },
  { slug: 'englewood',            name: 'Englewood',            blurb: 'Mid-century ranches with strong refinishing potential and newer infill.', hasDetailPage: false },
  { slug: 'cherry-hills-village', name: 'Cherry Hills Village', blurb: 'High-end estates. Site-finished hardwood, custom stain matching, and luxury tile.', hasDetailPage: false },
  { slug: 'littleton',            name: 'Littleton',            blurb: 'Range from older near-downtown homes to newer south-end builds. Refinishing + engineered.', hasDetailPage: false },
];

export const CITY_PAGES: CityPage[] = [
  {
    slug: 'denver',
    name: 'Denver',
    eyebrow: 'Bungalows · Victorians · Mid-century · Modern Infill',
    lead:
      'Denver is the most diverse housing stock we work in. We do hardwood refinishing in Park Hill and Wash Park bungalows, engineered installs in LoDo and RiNo condos, tile renovations in Highlands kitchens, and LVP in basement remodels across Stapleton, Berkeley, and Sloan Lake. Dedicated crew on your project.',
    housingNotes:
      'Denver homes split roughly four ways: pre-war bungalows and Victorians (Park Hill, Wash Park, Congress Park, Capitol Hill) with original oak and pine that refinish beautifully; mid-century ranches (Virginia Vale, Krisana Park, University Hills) often with red oak under carpet; modern condos and lofts (LoDo, RiNo, Cherry Creek) with concrete slab subfloors that need engineered or LVP; and newer infill construction (Stapleton, Lowry, Sloan Lake) typically built with engineered hardwood on plywood subfloor over a finished basement.',
    flooringNotes:
      'For older Denver homes with original wood, refinishing usually beats replacement on cost and outcome. We sand to bare wood, fill historical gaps with color-matched filler, and apply UV-resistant water-based or oil finish. For Denver condos and infill builds, engineered hardwood handles slab moisture and radiant heat better than solid. We always moisture-test slabs in basement remodels before recommending material.',
    recentProjects: [
      'Park Hill bungalow: refinished original red oak, matched the dining room stain to the existing built-ins',
      'RiNo loft: engineered hardwood directly glued to concrete slab, 7" wide-plank European white oak',
      'Cherry Creek condo: shower tile replacement with proper waterproofing, schluter membrane behind every wet wall',
      'Berkeley basement: LVP throughout the finished lower level, vapor barrier under the foam underlayment',
    ],
    metaTitle: 'Flooring installation in Denver, CO · DFC',
    metaDescription:
      'Hardwood, LVP, tile, and refinishing in Denver neighborhoods. Park Hill, Wash Park, RiNo, Stapleton, and beyond. Install-only crew, 1-year warranty.',
  },

  {
    slug: 'aurora',
    name: 'Aurora',
    eyebrow: 'Newer Construction · Slab-on-grade · Finished Basements',
    lead:
      'Aurora is one of our most-installed cities. Most of the city is post-1990 construction with slab-on-grade foundations or full finished basements, which means engineered hardwood, LVP, and tile cover most of what we install. We know which Aurora subdivisions came with the slab-moisture issues and which finishes the original builders cut corners on.',
    housingNotes:
      'Aurora housing is mostly two eras: 1970s-90s ranch and split-level homes in central Aurora (around Havana, near Buckley) with finished basements and older subfloor systems that often need leveling; and 2000s+ master-planned communities (Tallyn Reach, Saddle Rock, Painted Prairie, Murphy Creek) built on slab with engineered hardwood, LVP, or tile from the builder. The newer construction tends to ship with builder-grade engineered that wears through fast in high-traffic areas, so refinishing or replacement is common after 8-10 years.',
    flooringNotes:
      'For Aurora basements, we moisture-test the slab every time before recommending material. Solid hardwood does not go in basements here. LVP with a proper vapor barrier or engineered hardwood with moisture-blocking adhesive are the two right answers. For Aurora kitchens and entries, builder-grade tile often comes with no waterproofing membrane behind it; we tear out and redo with Schluter Kerdi when we replace.',
    recentProjects: [
      'Saddle Rock kitchen: replaced builder-grade tile with porcelain, redid the substrate with isolation membrane',
      'Painted Prairie basement: LVP throughout 1100 sq ft, vapor barrier verified before install',
      'Murphy Creek master bath: shower tile with Schluter Kerdi waterproofing and DITRA-HEAT under the floor',
      'Tallyn Reach main floor: engineered hardwood replacement after 12 years of the builder-grade original',
    ],
    metaTitle: 'Flooring installation in Aurora, CO · DFC',
    metaDescription:
      'Engineered hardwood, LVP, tile, and refinishing in Aurora. Tallyn Reach, Saddle Rock, Painted Prairie. Denver Metro crew, slab-tested, 1-year warranty.',
  },

  {
    slug: 'lakewood',
    name: 'Lakewood',
    eyebrow: 'Mid-century Ranches · Federal Corridor · Newer Townhomes',
    lead:
      'Lakewood splits between mid-century ranches with original or 1980s-era hardwoods and newer townhome construction along the Federal corridor and west Belmar. Refinishing volume is high here because the housing stock is the right age for second-cycle finish work, and the original red oak under the carpet is usually salvageable.',
    housingNotes:
      'Most Lakewood homes built before 1985 have red oak or fir hardwood under the original carpet. The carpet protected the wood from decades of UV and traffic, so pulling it usually reveals a floor that refinishes to a 9 out of 10 with no replacement needed. Newer Lakewood construction (Belmar, Solterra, Green Mountain) tends to ship with engineered hardwood or LVP from the start.',
    flooringNotes:
      'For Lakewood ranches, refinishing is almost always the right call before replacement. Even if the original boards are scratched, gapped, or partially water-damaged, a full sand-and-refinish costs a fraction of replacement and the result is a 50+ year floor. Newer Lakewood townhomes with builder-grade engineered tend to age out in 8-12 years; we replace those with thicker wear-layer engineered or wide-plank LVP.',
    recentProjects: [
      'Green Mountain ranch: refinished original red oak across the whole main floor, custom-matched the stain to the existing trim',
      'Belmar townhome: builder-grade engineered replaced with 7mm wear-layer engineered hardwood',
      'Federal corridor duplex: LVP throughout for a rental remodel, 20mil wear layer for dog-and-kid traffic',
      'Lakewood mid-century: refinished original fir floors in the dining room and living room, water-based finish for the faster turnaround',
    ],
    metaTitle: 'Flooring installation in Lakewood, CO · DFC',
    metaDescription:
      'Hardwood refinishing, LVP, engineered, and tile in Lakewood. Mid-century ranches and newer townhomes. 1-year workmanship warranty.',
  },
];

export function getCityBySlug(slug: string): CityPage | undefined {
  return CITY_PAGES.find((c) => c.slug === slug);
}

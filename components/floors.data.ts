// Long-form content per install category. Used by app/floors/[slug]/page.tsx
// to generate one SEO-friendly, Denver-specific page per material.
//
// Each page is ~400-500 words of genuinely useful content for someone
// deciding between materials, written in the editorial restrained-tradesman
// tone. Specific to Denver / Colorado conditions where it matters.

export type FloorPage = {
  slug: string;
  name: string;
  shortName: string; // 1-word marketing label
  // Hero block
  eyebrow: string;
  headlineAccent: string; // the italic word(s) in the H1
  headlineAfter: string; // text after the italic accent
  lead: string; // 2-3 sentence intro paragraph
  // Body sections
  bestFor: string[]; // bullets
  notFor: string[]; // bullets (be honest about limits)
  coloradoNotes: string; // climate + slab + moisture paragraph
  install: string[]; // 4-5 step paragraphs describing actual install
  timeline: string; // typical project length, plain English
  // Long-tail FAQ rider
  faqs: { q: string; a: string }[];
  // SEO + media
  metaTitle: string;
  metaDescription: string;
  photo: string; // 16x9 landscape photo path
  photoAlt: string;
  ogImage: string;
};

export const FLOORS: FloorPage[] = [
  {
    slug: 'hardwood',
    name: 'Hardwood',
    shortName: 'Hardwood',
    eyebrow: 'Solid + Site-Finished',
    headlineAccent: 'Hardwood',
    headlineAfter: 'in Denver homes.',
    lead:
      'Solid oak, walnut, hickory, and maple over plywood or sleeper subfloors. Nailed, glued, or floated to manufacturer spec. We acclimate every board on site so it expands and contracts with Colorado seasons, not against them.',
    bestFor: [
      'Above-grade rooms (main floor, upper levels)',
      'Long-term homes where you want a 50-year floor',
      'Refinishable later, multiple times',
      'High-end resale value',
    ],
    notFor: [
      'Basements (humidity + slab moisture wrecks solid hardwood)',
      'Bathrooms or kitchens with heavy water exposure',
      'Tight budgets — solid hardwood is the priciest tier',
    ],
    coloradoNotes:
      'Denver runs dry in winter (10-20% RH indoors), which makes solid hardwood prone to seasonal gapping if it was installed without proper acclimation. We measure moisture in the subfloor before delivery, leave the boards on site for 5-7 days to equalize, and use a humidifier in winter installs when conditions are too dry. The result: boards that move where they should move, not at the seams.',
    install: [
      'Subfloor moisture check, leveling, and any sleeper/plywood repair before delivery.',
      'Boards acclimate on site for 5-7 days. Humidifier in winter, dehumidifier in summer if needed.',
      'Layout planning: longest runs in line with the longest wall, joints staggered, transition strips at doorways.',
      'Nailed (3/4" solid) or glued (3/8" engineered-over-slab) per manufacturer spec.',
      'Sand, stain, and finish on site if site-finished. Pre-finished boards go straight to baseboards and trim.',
    ],
    timeline:
      'Most 800-1500 sq ft residential installs take 3-5 working days for pre-finished, or 5-8 days for site-finished (extra time for sanding, staining, and 2-3 finish coats with cure time).',
    faqs: [
      {
        q: 'Can I install solid hardwood in my basement?',
        a: 'No, and we will tell you that on the estimate. Solid hardwood needs to be above grade with stable humidity. Below grade, the slab pulls moisture from the ground year-round and the boards cup, crown, or gap. Engineered hardwood or LVP is the right call for basements.',
      },
      {
        q: 'Site-finished vs. pre-finished — which is better?',
        a: 'Site-finished gives you flush seams (no micro-bevel between boards), a smoother feel, and a custom stain match. Pre-finished is faster, less dusty, and the factory finish is harder. For a kitchen or main entry where it has to look new in 5 years, site-finished. For a guest room or office, pre-finished is fine.',
      },
      {
        q: 'How many times can hardwood be refinished?',
        a: 'A solid 3/4" hardwood floor can be sanded and refinished 6-8 times over its life (every 10-15 years if maintained). Engineered hardwood with a 4-6mm wear layer can usually be done 2-3 times.',
      },
      {
        q: 'Do you offer dustless sanding?',
        a: 'Yes. Commercial dust-containment vacuums on every sander, plastic-zipped doorways, HEPA air filtration. Your house stays livable through the sanding phase.',
      },
    ],
    metaTitle: 'Hardwood floor installation in Denver · DFC',
    metaDescription:
      'Solid + site-finished hardwood flooring in Denver and Aurora. Oak, walnut, hickory, maple. Acclimated on site for Colorado humidity. 1-year workmanship warranty.',
    photo: '/photos/staircases-walnut-after--landscape_16x9.jpg',
    photoAlt: 'Walnut hardwood staircase installed by Denver Flooring Collective',
    ogImage: '/og/dfc-share-1200x630.jpg',
  },

  {
    slug: 'engineered',
    name: 'Engineered Hardwood',
    shortName: 'Engineered',
    eyebrow: 'Slab-Safe + Wide-Plank',
    headlineAccent: 'Engineered',
    headlineAfter: 'where solid cannot go.',
    lead:
      'Pre-finished and site-finished engineered planks with a real hardwood wear layer over a stable core. Goes in basements, over slabs, and over radiant heat where solid hardwood would fail. Looks identical underfoot.',
    bestFor: [
      'Basements + below-grade rooms',
      'Concrete slabs (direct glue-down or click-lock)',
      'Over radiant in-floor heating',
      'Wide-plank looks (7-9" wide without cupping)',
    ],
    notFor: [
      'Heavy refinishing cycles (most wear layers handle 1-2 refinishes)',
      'Wet areas (bathrooms, mudrooms with snow)',
      'Bargain prices — high-quality engineered is close to solid hardwood pricing',
    ],
    coloradoNotes:
      'Engineered is built for the Denver basement: a stable HDF or plywood core that does not move with moisture the way solid hardwood does. We still moisture-test the slab before install (calcium chloride test or in-situ probe), and we use a proper vapor barrier when the reading is borderline. Slab-glued installs in basements where moisture is verified low. Floating installs over concrete with a foam-and-film underlayment when moisture is at the edge of spec.',
    install: [
      'Slab moisture testing. Reject the install (or use additional barriers) if the reading is over spec.',
      'Self-leveling compound where the slab is more than 1/8" out over 6 ft.',
      'Vapor barrier (6 mil poly + foam underlayment) for floating installs, or moisture-blocking adhesive for glue-down.',
      'Click-lock or full-spread glue per manufacturer recommendation for that specific product.',
      'Baseboards, transitions, and a final walkthrough before invoice closes.',
    ],
    timeline:
      'Typical engineered install: 2-4 working days for 800-1500 sq ft. Faster than solid hardwood because pre-finished boards skip the on-site sanding and finishing phases.',
    faqs: [
      {
        q: 'How do I know if engineered hardwood is the right call for my space?',
        a: 'If you have a slab (basement, condo, slab-on-grade home), engineered is the answer. If you have plywood subfloor on a main or upper floor, you can do solid hardwood OR engineered — engineered gets you to wide-plank widths without cupping risk.',
      },
      {
        q: 'Can engineered hardwood be refinished?',
        a: 'Depends on the wear layer. 4-6mm wear layers can be sanded 2-3 times. 2-3mm wear layers can be lightly screened and recoated but not full-sanded. Always check the spec sheet before assuming.',
      },
      {
        q: 'Will it work over my radiant heat?',
        a: 'Yes — engineered is the recommended hardwood for radiant. We follow the manufacturer maximum surface temperature (usually 81-84°F) and the gradual ramp-up requirements. We do not install solid hardwood over radiant.',
      },
    ],
    metaTitle: 'Engineered hardwood installation in Denver · DFC',
    metaDescription:
      'Engineered hardwood flooring for Denver basements, slabs, and wide-plank looks. Slab-safe, radiant-heat compatible. Same crew, manufacturer-spec installation, 1-year warranty.',
    photo: '/photos/hardwood-jason-entry--landscape_16x9.jpg',
    photoAlt: 'Wide-plank engineered hardwood entry installed by Denver Flooring Collective',
    ogImage: '/og/dfc-share-1200x630.jpg',
  },

  {
    slug: 'lvp',
    name: 'Luxury Vinyl Plank',
    shortName: 'LVP',
    eyebrow: 'Waterproof + Pet-Friendly',
    headlineAccent: 'LVP',
    headlineAfter: 'that holds up to real life.',
    lead:
      'Click-lock and glue-down luxury vinyl plank with the right underlayment, moisture barrier, and seam alignment. Waterproof through the wear layer. Quiet, warm, and forgiving for kids and pets.',
    bestFor: [
      'Basements, mudrooms, kitchens, bathrooms',
      'Households with dogs, cats, kids',
      'Rentals + investment properties (durable + cost-effective)',
      'Slab-on-grade homes',
    ],
    notFor: [
      'Resale-driven renovations where hardwood is the expected look',
      'Direct full-sun exposure for long stretches (some LVP fades or cups under UV without UV-resistant coating)',
      'Heated floor systems exceeding 85°F surface temp',
    ],
    coloradoNotes:
      'LVP is the most forgiving floor for Colorado homes. It does not gap in winter dryness, does not cup in basement moisture, and snowmelt at the entry wipes up without damage. The two LVP-specific Denver issues: south-facing windows can fade lower-grade LVP, so spec a UV-resistant wear layer in sun-heavy rooms. And LVP over a poorly-leveled slab telegraphs every dip — we self-level before install, every time.',
    install: [
      'Subfloor leveling: any dip over 3/16" in a 10 ft span gets self-leveling compound or feathered patch.',
      'Acclimation: 48 hours on site at the install temperature (LVP expands and contracts more than hardwood).',
      'Underlayment selection: integrated pad on the plank itself, or separate IXPE foam, depending on subfloor type.',
      'Click-lock with end joints staggered minimum 8", or full-spread glue for high-traffic commercial use.',
      'Transition strips, T-molds at doorways, baseboards, and a walkthrough.',
    ],
    timeline:
      'Most 800-1500 sq ft LVP installs take 2-3 working days. Subfloor leveling is the long pole — if a slab needs significant prep, add a day.',
    faqs: [
      {
        q: 'Is all LVP waterproof?',
        a: 'The plank itself is waterproof through the wear layer, yes. But the seams between planks are not — they are watertight against splash and spills, not against standing water for hours. A flooded basement with LVP usually survives; LVP under a leaky dishwasher running for 12 hours overnight does not.',
      },
      {
        q: 'Will LVP scratch from dog nails?',
        a: 'High-quality LVP (20mil+ wear layer) handles dog nails for years. Cheap LVP (8mil wear layer) shows scratches in 6 months. We spec wear layer thickness on every estimate and explain the price/longevity tradeoff.',
      },
      {
        q: 'Can LVP go over my existing tile?',
        a: 'Sometimes. The tile has to be solid (no cracked or loose pieces) and the grout lines have to be filled and feathered with a leveling compound. If the tile is more than 1/4" thick total install height, transitions to other rooms get awkward. We measure first.',
      },
    ],
    metaTitle: 'LVP (luxury vinyl plank) installation in Denver · DFC',
    metaDescription:
      'Waterproof, pet-friendly luxury vinyl plank flooring in Denver, Aurora, and the Front Range. Click-lock or glue-down, proper subfloor prep, 1-year warranty.',
    photo: '/photos/basement-david-bathroom--landscape_16x9.jpg',
    photoAlt: 'Luxury vinyl plank flooring in a Denver basement remodel by DFC',
    ogImage: '/og/dfc-share-1200x630.jpg',
  },

  {
    slug: 'laminate',
    name: 'Laminate',
    shortName: 'Laminate',
    eyebrow: 'Budget + Durable',
    headlineAccent: 'Laminate',
    headlineAfter: 'that lasts longer than you expect.',
    lead:
      'Click-lock laminate with proper expansion gaps, seam alignment, and the right underlayment. A budget-friendly hardwood look that holds up to traffic, kids, and Colorado dryness. We install it as carefully as we install solid wood.',
    bestFor: [
      'Bedrooms, hallways, living rooms with low water exposure',
      'Rental properties and flips',
      'Whole-floor budgets under hardwood pricing',
      'Households that want wood-look with low maintenance',
    ],
    notFor: [
      'Bathrooms, kitchens, mudrooms (most laminate cores swell with sustained moisture)',
      'Long-term refinishing — laminate is single-life, replace when worn',
      'Premium resale homes where buyers expect real wood',
    ],
    coloradoNotes:
      'Denver dryness can shrink laminate planks over the winter if the install skipped expansion gaps at the walls. We leave 5/16" expansion every wall, every doorway, every transition. Skip that step and the floor buckles by year two. Conversely, snowmelt at entry doors needs to be wiped up — laminate is not waterproof and the swelling shows fast.',
    install: [
      'Subfloor flatness check, same as LVP — any dip over 3/16" in 10 ft gets feathered.',
      '48-hour acclimation on site.',
      'Underlayment with attached vapor barrier on concrete, IXPE foam on plywood.',
      'Click-lock installation with planks staggered at least 12" at end joints, expansion gaps at every wall.',
      'Quarter-round or baseboard reinstalled OVER the floor (not pinching the laminate), transitions at room boundaries.',
    ],
    timeline:
      'Typical laminate install: 2-3 working days for 800-1500 sq ft. Comparable speed to LVP.',
    faqs: [
      {
        q: 'Is laminate worth it vs. LVP?',
        a: 'Laminate is usually 20-30% cheaper than equivalent-quality LVP. The tradeoffs: laminate handles dryness better but worse with moisture, LVP is the opposite. For dry rooms (bedrooms, living rooms), laminate is fine and cheaper. For kitchens, basements, and high-water-risk areas, LVP every time.',
      },
      {
        q: 'How long will laminate last?',
        a: 'A quality AC4-rated laminate with proper install: 15-25 years residential. Cheap AC3 laminate in a high-traffic area: 5-10 years before the wear layer shows. We spec AC-rating on every estimate.',
      },
      {
        q: 'Can I install laminate over my existing carpet?',
        a: 'No. The padding compresses unevenly under the planks and the click-lock joints fail within months. Carpet has to come up. Pad and tack strip too.',
      },
    ],
    metaTitle: 'Laminate floor installation in Denver · DFC',
    metaDescription:
      'Budget-friendly laminate flooring installation in Denver and Aurora. AC-rated planks, proper expansion gaps, no warped seams. Same crew, 1-year workmanship warranty.',
    photo: '/photos/laminate-irena-stairs--landscape_16x9.jpg',
    photoAlt: 'Laminate flooring installed on stairs in a Denver-area home',
    ogImage: '/og/dfc-share-1200x630.jpg',
  },

  {
    slug: 'tile',
    name: 'Tile & Shower Tile',
    shortName: 'Tile',
    eyebrow: 'Wet Areas + Hand-Set',
    headlineAccent: 'Tile',
    headlineAfter: 'set the right way.',
    lead:
      'Porcelain, ceramic, and natural stone for kitchens, baths, entryways, mudrooms, and shower walls. Hand-set with proper substrate prep, the right mortar, and pattern alignment dialed in board by board.',
    bestFor: [
      'Bathrooms, shower walls, shower pans',
      'Kitchen backsplashes + floors',
      'Mudrooms and entry transitions',
      'High-moisture commercial spaces',
    ],
    notFor: [
      'Whole-house bedroom installs (hard on feet, cold underfoot without radiant)',
      'Wood-look in budget projects (LVP wood-look is cheaper and warmer)',
      'Quick weekend projects — tile is slow done right',
    ],
    coloradoNotes:
      'The two Denver-specific tile failures we see most: cracked grout in bathroom floors with no isolation membrane (the slab shifts seasonally), and shower walls without a proper waterproofing membrane behind them (every shower will leak eventually without one). We use Schluter Kerdi or RedGard on every wet wall, isolation membranes in bathrooms with known slab movement.',
    install: [
      'Substrate prep: cement board, mud bed, or self-leveling depending on the application.',
      'Waterproofing on every wet wall and shower pan (Schluter Kerdi membrane, RedGard, or equivalent).',
      'Layout planning: cuts placed at inconspicuous edges, pattern alignment chosen before any tile is set.',
      'Thinset selection by tile type (porcelain vs natural stone vs glass need different mortars).',
      'Grout, seal natural stone, silicone changes of plane (corners, perimeters) instead of grout. Cleanup, walkthrough.',
    ],
    timeline:
      'A standard bathroom (60-80 sq ft floor + shower walls): 4-6 working days including cure time. Kitchen backsplash: 1-2 days. Large entry floor: 2-3 days. We do not rush tile.',
    faqs: [
      {
        q: 'Do you do shower waterproofing the right way?',
        a: 'Yes. We use Schluter Kerdi membrane or RedGard liquid waterproofing on every shower wall, plus a Kerdi-Shower or properly built mud-pan with PVC liner. No shortcut "tar paper behind cement board" approach. The shower has to be watertight before any tile goes on.',
      },
      {
        q: 'Heated tile floors — can you do it?',
        a: 'Yes. We install Schluter DITRA-HEAT or equivalent electric radiant under tile floors. Common in master bathrooms in Denver. The system goes under the tile, ties into a thermostat, and adds ~$8-12 per sq ft to the project.',
      },
      {
        q: 'How long until I can use the bathroom after install?',
        a: 'Grout needs 24 hours before light use, 72 hours before sealing (for natural stone) and full water exposure. Showers: 7 days minimum before regular use after a full tile install.',
      },
    ],
    metaTitle: 'Tile and shower installation in Denver · DFC',
    metaDescription:
      'Porcelain, ceramic, and stone tile installation in Denver and Aurora. Proper waterproofing, isolation membranes, and pattern alignment. Same crew, 1-year warranty.',
    photo: '/photos/basement-kallie-shower--landscape_16x9.jpg',
    photoAlt: 'Tile shower installation in a Denver-area home by DFC',
    ogImage: '/og/dfc-share-1200x630.jpg',
  },

  {
    slug: 'refinishing',
    name: 'Sanding & Refinishing',
    shortName: 'Refinishing',
    eyebrow: 'Dustless + Custom Stain',
    headlineAccent: 'Refinishing',
    headlineAfter: 'instead of replacement.',
    lead:
      'Bring tired hardwood back to life. Dustless sanding with commercial vacuums, custom stain matching, and your choice of water-based or oil polyurethane finishes. A fraction of the cost of a full replacement.',
    bestFor: [
      'Existing solid hardwood that is dull, scratched, or sun-faded',
      'Engineered hardwood with a 4-6mm wear layer',
      'Stain color changes (dark to light, light to dark)',
      'Pre-sale home prep',
    ],
    notFor: [
      'Engineered with under-3mm wear layer (the wear layer is too thin to sand)',
      'Water-damaged boards (those have to be replaced, not refinished)',
      'Floors with major board-level damage covering more than 10% of the area',
    ],
    coloradoNotes:
      'Denver hardwood gets two things rough: UV from the high-altitude sun fading the stain unevenly (rooms with south-facing windows go pale fast), and dry winters causing seasonal gapping that opens the existing finish at the seams. Refinishing addresses both: we sand to bare wood, refill the seam gaps with wood filler color-matched to the new stain, and apply UV-resistant water-based or oil finish. The floor comes out looking better than it has in years.',
    install: [
      'Furniture cleared (we move the heavy stuff if needed), HVAC vents covered, plastic-zipped doorways.',
      'Three-pass dustless sanding: 36 grit → 60 grit → 80-100 grit, with edger work along walls and obstacles.',
      'Hand-scrape and screen at transitions, stairs, and around obstacles.',
      'Stain application if changing color (24-48 hour dry depending on stain).',
      'Two to three coats of finish (water-based or oil polyurethane), with light screen between coats. Final cure 5-7 days for water-based, longer for oil.',
    ],
    timeline:
      '800-1500 sq ft refinish: 4-6 working days with water-based finish, 6-9 days with oil. Add 2 days if you are also changing stain color.',
    faqs: [
      {
        q: 'Water-based or oil polyurethane?',
        a: 'Water-based: dries faster (2-4 hours between coats), lower VOCs, stays clearer (no amber pull), cures fully in 5-7 days. Oil: deeper amber tone (favored on traditional oak), slower dry (12-24 hours between coats), harder cured film. Both are durable when done right. Most Denver clients pick water-based for the faster turnaround and lower smell.',
      },
      {
        q: 'Will the dust be bad?',
        a: 'Not as bad as you fear. Our sanders have commercial dust-collection vacuums attached, plus we plastic-zip doorways and run HEPA air filtration during sanding. Fine dust still settles on shelves and inside cabinets, but it is a fraction of what an old-style refinish would produce.',
      },
      {
        q: 'How many times can I refinish?',
        a: '3/4" solid hardwood: 6-8 times over the life of the floor. Engineered with 4-6mm wear layer: 2-3 times. Engineered with under 3mm wear layer: we recommend a screen-and-recoat (light surface refresh, no full sanding) instead.',
      },
    ],
    metaTitle: 'Hardwood sanding and refinishing in Denver · DFC',
    metaDescription:
      'Dustless hardwood refinishing and refinishing in Denver and Aurora. Custom stain matching, water-based or oil finish, 1-year workmanship warranty.',
    photo: '/photos/hardwood-petra-stairs--landscape_16x9.jpg',
    photoAlt: 'Refinished hardwood staircase in a Denver-area home',
    ogImage: '/og/dfc-share-1200x630.jpg',
  },
];

export function getFloorBySlug(slug: string): FloorPage | undefined {
  return FLOORS.find((f) => f.slug === slug);
}

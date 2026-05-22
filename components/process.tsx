const STEPS = [
  {
    num: '1',
    name: 'Free estimate',
    body: 'On-site visit or remote review of photos and measurements. A written quote with labor, prep, and timeline broken out, line by line. No upsells, no pressure.',
  },
  {
    num: '2',
    name: 'Material selection',
    body: 'You buy your own flooring. We help you choose. We pass along our contractor discounts at trusted local suppliers, no markup, no kickback. Optional pickup at cost.',
  },
  {
    num: '3',
    name: 'Prep & protection',
    body: 'Subfloor checked, leveled, and moisture-tested. Doorways plastic-zipped. HVAC vents covered. Furniture and adjacent rooms protected before the first board goes down.',
  },
  {
    num: '4',
    name: 'Install',
    body: 'Dedicated crew on your floor. Manufacturer-spec installation. Daily updates so you always know what is happening tomorrow.',
  },
  {
    num: '5',
    name: 'Final walkthrough',
    body: 'We walk every room with you. Anything not right gets fixed before the invoice closes. 1-year workmanship warranty in writing.',
  },
];

export function Process() {
  return (
    <section id="process" className="max-w-site mx-auto px-6 lg:px-12 py-24 lg:py-36">
      <header className="max-w-prose mb-12">
        <div className="eyebrow mb-4">How we work</div>
        <h2 className="display text-sage text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]">
          <span className="italic">Five movements.</span>
          <br />
          No surprises.
        </h2>
      </header>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
        <span className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-walnut-deep/20" aria-hidden />
        {STEPS.map((s) => (
          <li key={s.num} className="relative pt-0 lg:pt-14">
            <div className="absolute top-0 left-0 hidden lg:flex items-center gap-3 bg-linen pr-3">
              <span className="font-display italic text-2xl text-walnut-deep">{s.num}</span>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-sage ring-4 ring-linen" />
            </div>
            <div className="lg:hidden flex items-center gap-3 mb-3">
              <span className="font-display italic text-2xl text-walnut-deep">{s.num}</span>
              <span className="inline-block w-3 h-3 rounded-full bg-sage" />
              <h3 className="font-display text-sage text-xl">{s.name}</h3>
            </div>
            <h3 className="hidden lg:block font-display text-sage text-xl lg:text-2xl mb-3 mt-1">{s.name}</h3>
            <p className="font-body text-sm text-onyx/80 lg:mt-2">{s.body}</p>
          </li>
        ))}
      </ol>

      <p className="font-display italic text-walnut-deep text-center text-xl mt-16 max-w-prose mx-auto pt-8 border-t border-walnut-deep/20">
        We do not stock materials. We do not run a showroom. We do not subcontract the install.
        The whole job is the install, and that is what you are hiring us for.
      </p>
    </section>
  );
}

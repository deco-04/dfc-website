const STATS = [
  { big: '14',    label: 'Front Range cities served' },
  { big: '600+',  label: 'Floors installed to date' },
  { big: '1 yr',  label: 'Workmanship warranty' },
  { big: '5.0',   label: 'on Google' },
];

export function Climate() {
  return (
    <section className="bg-forest text-linen py-24 lg:py-36 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, rgba(138,166,153,0.2), transparent 55%), radial-gradient(circle at 12% 88%, rgba(215,159,112,0.1), transparent 60%)',
        }}
      />
      <div className="relative max-w-site mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-lichen mb-4">
              A note from the crew
            </div>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]">
              <span className="italic">Built for</span>
              <br />
              Colorado conditions.
            </h2>
            <p className="font-body text-linen/85 mt-6 max-w-prose">
              Dry winters. Strong UV. Snowmelt at the entry. Temperature swings between basement and main floor.
              Materials that survive Denver are not the same materials that survive Houston or Seattle.
              We test moisture before we quote and acclimate hardwood on site so your floor expands and contracts
              where it should, not where it shouldn't.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-linen/20 pt-5">
                <dt className="font-display text-camel text-[clamp(2.5rem,5vw,4rem)] leading-none">{s.big}</dt>
                <dd className="font-body text-[11px] uppercase tracking-caps text-lichen mt-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

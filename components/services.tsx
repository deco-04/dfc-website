import { SPECIMENS } from './services.data';

export function Services() {
  return (
    <section id="services" className="bg-linen-warm py-24 lg:py-36">
      <div className="max-w-site mx-auto px-6 lg:px-12">
        <header className="max-w-prose mb-12 lg:mb-16">
          <div className="eyebrow mb-4">What we install</div>
          <h2 className="display text-sage text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]">
            <span className="italic">Six</span> categories. <span className="italic">One</span> crew.
          </h2>
          <p className="font-body leading-relaxed text-onyx/85 mt-4">
            Each specimen below is something we install hand-on-tool, daily. We do not subcontract any of it.
            Pick what fits the room, the moisture, and the budget, and we will give you a straight line from quote to walkthrough.
          </p>
        </header>

        <ol className="border-t border-walnut-deep/20">
          {SPECIMENS.map((s) => (
            <li
              key={s.slug}
              className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_80px_1fr_240px] gap-4 md:gap-6 items-center py-8 border-b border-walnut-deep/20 hover:bg-sage/5 transition-colors"
            >
              <span
                className="w-16 h-16 border border-walnut-deep/20 shadow-inner hidden md:block"
                style={{ backgroundColor: s.swatch }}
                aria-hidden
              />
              <div className="col-span-1 md:col-start-3">
                <h3 className="display text-sage text-2xl md:text-3xl">{s.name}</h3>
                <p className="font-body text-onyx/85 mt-2 max-w-prose">{s.body}</p>
              </div>
              <span className="font-body text-[10px] uppercase tracking-caps text-walnut-deep md:text-right col-span-2 md:col-span-1">
                {s.tag}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 pt-6 border-t border-walnut-deep/20 border-dashed">
          <div className="font-display italic text-walnut-deep text-lg mb-3">
            Also in scope
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 font-body text-sm text-onyx/75">
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-walnut-deep" />Staircases</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-walnut-deep" />Baseboards &amp; trim</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-walnut-deep" />Subfloor &amp; concrete leveling</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-walnut-deep" />Demolition &amp; haul-away</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-walnut-deep" />Small repairs &amp; patchwork</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

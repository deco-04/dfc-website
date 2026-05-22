export function Manifesto() {
  return (
    <section id="manifesto" className="max-w-site mx-auto px-6 lg:px-12 py-24 lg:py-36">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
        <header className="lg:sticky lg:top-24">
          <div className="eyebrow mb-5">A note from the crew</div>
          {/*
            Positioning grounded in the GOS strategy docs + Andre's 2026-05-22
            correction. DFC is a multi-crew operation, not a solo installer.
            Crews stay dedicated to one project at a time (per Nurture
            Campaign 5). Andrew is the only named human; the rest is "our
            team" / "our crews" / "trusted partners" without making the
            partner layer a feature or a liability.
          */}
          <h2 className="display text-sage italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
            Specialists,
            <br />
            not generalists.
          </h2>
        </header>
        <div>
          <p className="font-body text-[clamp(1.1rem,1.3vw,1.3rem)] leading-relaxed text-onyx/90 max-w-prose">
            We install floors across the Denver Metro. <em className="text-walnut-deep">Hardwood, engineered, luxury vinyl, laminate, and tile.</em>{' '}
            That is the whole company. No materials store. No showroom. Flooring is what we do, and we do it every day.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            Most flooring companies will sell you the floor, hire someone else to install it,
            then disappear when the seams creep or the moisture bubbles. We do not sell materials.
            You buy the floor at the price you can find, with the contractor pricing we pass through
            to you. We measure, we prep, we install, we warrant the work in writing for a full year.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            Our crews stay focused on one project at a time. You get a dedicated crew on your floor,
            not a rotating cast jumping between sites. Andrew runs the company and stays close to
            every project, our team keeps the schedule clean, and the install gets the attention
            real craftsmanship needs.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            That is the whole job, and that is what you are hiring us for.
          </p>
          <div className="mt-10 pt-6 border-t border-walnut-deep/20 flex flex-col gap-1">
            <span className="font-display italic text-sage text-3xl">Andrew Dean</span>
            <span className="font-body text-[11px] uppercase tracking-caps text-walnut-deep font-medium">Owner · Denver Flooring Collective</span>
          </div>
        </div>
      </div>
    </section>
  );
}

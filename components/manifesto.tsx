export function Manifesto() {
  return (
    <section id="manifesto" className="max-w-site mx-auto px-6 lg:px-12 py-24 lg:py-36">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
        <header className="lg:sticky lg:top-24">
          <div className="eyebrow mb-5">A note from the crew</div>
          <h2 className="display text-sage italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
            Slow materials.
            <br />
            One job at a time.
          </h2>
        </header>
        <div>
          <p className="font-body text-[clamp(1.1rem,1.3vw,1.3rem)] leading-relaxed text-onyx/90 max-w-prose">
            We do one thing. We install floors. <em className="text-walnut-deep">Hardwood, engineered, luxury vinyl, laminate, and tile.</em>{' '}
            No materials store. No showroom. No subcontracting. No chasing every trade.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            Most contractors will sell you the floor, then hire someone else to install it,
            then disappear when the seams creep or the moisture bubbles. We don&rsquo;t sell anything.
            You buy the material at the price you can find, with the contractor discounts we pass through
            to you. We measure, we prep, we install, we warrant the work in writing.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            The crew that walked your house at the estimate is the crew on the floor.
            That is the whole job and that is what you are hiring us for.
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

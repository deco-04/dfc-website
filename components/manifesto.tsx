import Image from 'next/image';

export function Manifesto() {
  return (
    <section id="manifesto" className="max-w-site mx-auto px-6 lg:px-12 py-24 lg:py-36">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
        <header className="lg:sticky lg:top-24">
          <div className="eyebrow mb-5">A note from the crew</div>
          {/*
            Rewritten 2026-05-23 per Liza's brief. Headline 'Specialized
            Craftsmen' positioning. Multi-crew + Andrew-runs-it framing
            kept, "post-service cleans" + supplier-discount + virtual-or-
            in-person estimates added. No false same-crew-end-to-end claim.
            Andrew portrait added 2026-05-25 per Liza's note.
          */}
          <h2 className="display text-sage italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
            Specialized
            <br />
            Craftsmen.
          </h2>
          {/* Portrait of Andrew in the left sticky column on desktop.
              On mobile the column stacks so the photo sits between the
              headline and the body — keeping the human face close to
              the 'A note from the crew' eyebrow. */}
          <figure className="mt-10 max-w-[260px] lg:max-w-[300px]">
            <div className="bg-linen-warm p-3 border border-walnut-deep/15">
              <Image
                src="/photos/andrew-dean.jpg"
                alt="Portrait of Andrew Dean, owner of Denver Flooring Collective"
                width={600}
                height={600}
                sizes="(max-width: 1024px) 260px, 300px"
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
            <figcaption className="mt-3 flex flex-col gap-0.5">
              <span className="font-display italic text-sage text-xl">Andrew Dean</span>
              <span className="font-body text-[11px] uppercase tracking-caps text-walnut-deep font-medium">Owner · Denver Flooring Collective</span>
            </figcaption>
          </figure>
        </header>
        <div>
          <p className="font-body text-[clamp(1.1rem,1.3vw,1.3rem)] leading-relaxed text-onyx/90 max-w-prose">
            Flooring is what we do, and we do it every day: <em className="text-walnut-deep">installs, refinishes,
            and repairs</em> throughout the Denver Metro. Leveling, hardwood, engineered materials,
            laminate, luxury vinyl plank, baseboards, stairs, and tile. We help you choose the best option
            for your home or business, and offer post-service cleans, too.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            We do not sell materials, but we partner with local shops. Ask us if there is a discount
            available for your project. We provide both virtual and in-person estimates, and work with
            your budget. Our work is confidently warranted in writing for a full year post-installation.
          </p>
          <p className="font-body leading-relaxed text-onyx/85 max-w-prose mt-6">
            Andrew runs the company and stays close to every project. Our team keeps the schedule
            organized, and projects get the attention real craftsmanship requires. Count on our
            dedicated crews to refresh your space.
          </p>
          {/* Signature lives in the right column too as a wider sign-off.
              On desktop both the portrait (left) and signature (right) are
              visible at once; on mobile the column flow puts the portrait
              up top + signature at the bottom of the section. */}
          <div className="mt-10 pt-6 border-t border-walnut-deep/20 flex flex-col gap-1">
            <span className="font-display italic text-sage text-3xl">Andrew Dean</span>
            <span className="font-body text-[11px] uppercase tracking-caps text-walnut-deep font-medium">Owner · Denver Flooring Collective</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { GhlForm } from '@/components/ghl-form';
import { RatingChip } from '@/components/rating-chip';
import { TrackedPhoneLink } from '@/components/tracked-phone-link';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Send us your floorplan',
  description: 'Skip the on-site visit. Send photos, measurements, and a floorplan and we will review it together over a call or video, no charge.',
  path: '/remote-estimate',
  image: OG_IMAGES.remote,
});

export default function RemoteEstimatePage() {
  const formId = process.env.NEXT_PUBLIC_GHL_FORM_REMOTE || 'THPaKoZtHXFieIRS9zE2';
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Remote estimate', path: '/remote-estimate' }])} />
      <NavMinimal />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <header className="mb-10 text-center">
          <div className="eyebrow mb-3">Remote estimate</div>
          <h1 className="display text-sage text-5xl lg:text-6xl leading-[1.04]">
            Send photos. <span className="italic">Get a quote.</span>
          </h1>
          <p className="font-body text-onyx/85 mt-4 max-w-prose mx-auto">
            Upload photos, rough measurements, and any floorplan you have. We will review it together over a call or video.
            Same written quote, no on-site visit needed.
          </p>
          <div className="mt-5 flex justify-center">
            <RatingChip />
          </div>
        </header>
        <GhlForm
          formId={formId}
          formName="Remote Estimate Lead Form"
          height="1583"
        />

        {/* Phone fallback and in-person escape hatch */}
        <div className="mt-10 border-t border-walnut-deep/10 pt-8 space-y-3 font-body text-sm text-onyx/75">
          <p>
            Form not loading, or just prefer to talk?{' '}
            <TrackedPhoneLink className="underline underline-offset-2 hover:text-sage transition-colors">
              Call or text 720-599-1664
            </TrackedPhoneLink>{' '}
            and we will set up your estimate.
          </p>
          <p>
            Prefer an in-person walkthrough?{' '}
            <Link href="/book" className="underline underline-offset-2 hover:text-sage transition-colors">
              Book a free on-site estimate
            </Link>
            .
          </p>
        </div>
      </main>
      <FooterMinimal />
    </>
  );
}

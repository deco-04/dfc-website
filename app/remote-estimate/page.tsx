import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { GhlForm } from '@/components/ghl-form';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Send us your floorplan',
  description: 'Skip the on-site visit. Send photos, measurements, and a floorplan and we will review it together over a call or video, no charge.',
  path: '/remote-estimate',
});

export default function RemoteEstimatePage() {
  const formId = process.env.NEXT_PUBLIC_GHL_FORM_REMOTE || 'THPaKoZtHXFieIRS9zE2';
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <NavMinimal />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <header className="mb-10 text-center">
          <div className="eyebrow mb-3">Remote estimate</div>
          <h1 className="display text-sage text-5xl lg:text-6xl leading-[1.04]">
            Send your <span className="italic">floorplan</span>.
          </h1>
          <p className="font-body text-onyx/85 mt-4 max-w-prose mx-auto">
            Upload photos, rough measurements, and any floorplan you have. We will review it together over a call or video.
            Same crew, same written quote, no on-site visit needed.
          </p>
        </header>
        <GhlForm
          formId={formId}
          formName="Remote Estimate Lead Form"
          height="1583"
        />
      </main>
      <FooterMinimal />
    </>
  );
}

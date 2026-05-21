import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { GhlForm } from '@/components/ghl-form';
import { JsonLd } from '@/components/json-ld';
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { TrackedPhoneLink } from '@/components/tracked-phone-link';
import { pageMetadata, OG_IMAGES } from '@/lib/seo';

function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MapPinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export const metadata = pageMetadata({
  title: 'Contact us',
  description: 'Call, text, email, or fill the form. We answer fast and we do not high-pressure anyone into anything.',
  path: '/contact',
  image: OG_IMAGES.contact,
});

export default function ContactPage() {
  const formId = process.env.NEXT_PUBLIC_GHL_FORM_CONTACT || 'pN1j2f72dFaRTfGfVWSe';
  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <Nav />
      <main className="max-w-site mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <header className="mb-12">
          <div className="eyebrow mb-3">Contact</div>
          <h1 className="display text-sage text-5xl lg:text-7xl leading-[1.04]">
            Talk to <span className="italic">the crew</span>.
          </h1>
        </header>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <aside className="space-y-6">
            <ContactRow icon={<PhoneIcon />} title="Call or text">
              <TrackedPhoneLink className="text-sage-deep border-b border-sage-deep">720-599-1664</TrackedPhoneLink>
            </ContactRow>
            <ContactRow icon={<MapPinIcon />} title="Service area">
              Denver metro &amp; the Front Range<br />
              <span className="text-onyx/60 text-sm">14 cities listed on the homepage</span>
            </ContactRow>
            <ContactRow icon={<ClockIcon />} title="Hours">
              Mon&ndash;Fri 8a&ndash;6p<br />Saturdays by appointment
            </ContactRow>
          </aside>
          <div>
            <GhlForm formId={formId} formName="Website Lead Form" height="1653" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="text-walnut-deep mt-1">{icon}</div>
      <div>
        <h3 className="font-body text-[12px] uppercase tracking-caps font-semibold text-walnut-deep mb-1">{title}</h3>
        <div className="font-body text-onyx/85">{children}</div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { pageMetadata } from '@/lib/seo';
import { TrackedPhoneLink } from '@/components/tracked-phone-link';

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type SourceKey = 'default' | 'calendar' | 'remote-estimate' | 'meta' | 'google' | 'partner';

// meta + google paid-ad sources share the same post-submit copy because
// the lead flow is identical (Andrew personally reviews). They diverge only
// in source attribution, which lives in the form payload, not the UI.
const PAID_AD_COPY = {
  eyebrow: 'Got it',
  headline: 'We have your request.',
  body: 'Andrew personally reviews every paid-ad lead.',
  steps: [
    'Andrew reviews your message and photos personally.',
    'You get a call or text from him within business hours.',
    'Written quote lands in your inbox within 24 hours of the call.',
  ],
};

const SOURCE_COPY: Record<SourceKey, { eyebrow: string; headline: string; body: string; steps: string[] }> = {
  default: {
    eyebrow: 'Got it',
    headline: 'We have your request.',
    body: 'You will hear from us shortly.',
    steps: [
      'We review your request and any photos.',
      'Andrew or the crew lead calls you to confirm the scope.',
      'We send a written quote within 24 hours of the conversation.',
    ],
  },
  calendar: {
    eyebrow: 'Booked',
    headline: 'Your visit is on the calendar.',
    body: 'You will get a confirmation email and a calendar invite. The crew lead arrives at the scheduled time.',
    steps: [
      'Confirmation email lands within a minute.',
      'A text reminder goes out 24 hours before.',
      'The crew lead arrives on time, walks the space, sends a written quote within 24 hours of the visit.',
    ],
  },
  'remote-estimate': {
    eyebrow: 'Received',
    headline: 'We have your floorplan.',
    body: 'We review what you sent and book a 15-minute call to talk it through.',
    steps: [
      'Andrew reviews your photos and measurements.',
      'We send you a link to book a 15-minute call within 24 hours.',
      'Written quote arrives within 24 hours of the call.',
    ],
  },
  meta: PAID_AD_COPY,
  google: PAID_AD_COPY,
  partner: {
    // De-personalized 2026-05-25 per Andre: drop 'Andrew personally
    // reviews' framing, lean on the team. Keep the partner-flavored
    // tone (joining the crew / supplying / referral line) but no
    // promise that Andrew himself reads every one.
    eyebrow: 'Sent',
    headline: 'Inquiry received.',
    body: 'Thanks for reaching out. Whether you are joining the crew, supplying materials, or building a referral line, our team reviews every partner request and will be in touch within 48 hours.',
    steps: [
      'Our team reviews your inquiry within 48 hours.',
      'You get a call or text from us to talk it through.',
      'If it is a fit, we move to next steps the same week.',
    ],
  },
};

export const metadata = pageMetadata({
  title: 'Thank you',
  description: 'We received your request. Here is what happens next.',
  path: '/thanks',
  noindex: true,
});

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const { source } = await searchParams;
  const key = (source && source in SOURCE_COPY ? source : 'default') as SourceKey;
  const copy = SOURCE_COPY[key];

  return (
    <>
      <NavMinimal />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-24 text-center">
        <div className="eyebrow mb-4">{copy.eyebrow}</div>
        <h1 className="display text-sage text-5xl lg:text-7xl leading-[1.04]">{copy.headline}</h1>
        <p className="font-body text-onyx/85 mt-6 max-w-prose mx-auto">{copy.body}</p>
        <ol className="text-left font-body text-onyx/85 mt-10 space-y-3 max-w-md mx-auto">
          {copy.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-display italic text-walnut-deep">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          <Link href="/#projects" className="inline-flex items-center gap-2 font-body text-[13px] uppercase tracking-caps font-semibold text-sage-deep border-b border-sage-deep pb-1">
            Browse recent floors <ArrowRightIcon />
          </Link>
        </div>
        <p className="font-body text-[12px] uppercase tracking-caps text-onyx/60 mt-10">
          Or call <TrackedPhoneLink className="text-sage-deep border-b border-sage-deep">720-599-1664</TrackedPhoneLink> if you have a question now.
        </p>
      </main>
      <FooterMinimal />
    </>
  );
}

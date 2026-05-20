import { notFound } from 'next/navigation';
import { NavMinimal } from '@/components/nav-minimal';
import { FooterMinimal } from '@/components/footer-minimal';
import { LandingHero } from '@/components/landing-hero';
import { TrustBar } from '@/components/trust-bar';
import { ReviewWidget } from '@/components/review-widget';
import { Gallery } from '@/components/gallery';
import { Faq } from '@/components/faq';

const PLATFORMS = ['meta', 'google'] as const;
type Platform = typeof PLATFORMS[number];

export function generateStaticParams() {
  return PLATFORMS.map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) return {};
  return {
    title: 'Free Denver Flooring Estimate',
    description: 'Install-only flooring in Denver and Aurora. 600+ projects. 1-year warranty. Licensed and insured.',
    robots: { index: false, follow: true },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  if (!PLATFORMS.includes(platform as Platform)) notFound();
  const p = platform as Platform;

  return (
    <>
      <NavMinimal />
      <main>
        <LandingHero defaultsUtm={{ utm_source: p, landing_page: `/lp/${p}` }} />
        <div className="max-w-site mx-auto px-6 lg:px-12 py-6">
          <TrustBar />
        </div>
        <Gallery />
        <section className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="display text-sage text-3xl text-center mb-8">Recent Denver homeowners</h2>
          <ReviewWidget />
        </section>
        <Faq />
      </main>
      <FooterMinimal />
    </>
  );
}

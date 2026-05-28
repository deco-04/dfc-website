import type { Metadata } from 'next';
import { fraunces, inter } from './fonts';
import { SITE_URL } from '@/lib/seo';
import { DeferredAnalytics } from '@/components/deferred-analytics';
import { DeferredChat } from '@/components/deferred-chat';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Denver Flooring Installers · Hardwood, LVP, Tile · DFC',
    template: '%s · Denver Flooring Collective',
  },
  description:
    'Install-only flooring in Denver. Hardwood, LVP, laminate, tile. 600+ projects. 1-year warranty. Licensed and insured. Free on-site or remote estimate.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Denver Flooring Collective',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Denver Flooring Installers · Hardwood, LVP, Tile · DFC',
    description:
      'Install-only flooring in Denver. Hardwood, LVP, laminate, tile. 600+ projects. 1-year warranty. Licensed and insured.',
    images: [
      {
        url: '/og/dfc-share-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'A completed white-oak hardwood floor in a Denver-area home, installed by Denver Flooring Collective',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/dfc-share-1200x630.jpg'],
  },
  // apple-touch-icon-180.png renders properly on iOS home-screen shortcuts.
  // Previously favicon.png (32x32) was being upscaled by iOS.
  icons: {
    icon: '/logo/favicon.png',
    apple: [
      { url: '/logo/apple-touch-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  authors: [{ name: 'Denver Flooring Collective' }],
  keywords: [
    'flooring installer denver',
    'hardwood installation aurora',
    'lvp denver',
    'tile installation denver',
    'flooring contractor denver',
  ],
};

export const viewport = {
  themeColor: '#567360',
  // viewport-fit=cover lets the page draw into iOS Safari's safe-area
  // zones (Dynamic Island, notch, home-indicator). Combined with the
  // safe-area-inset padding on <Nav>, the sticky nav background now
  // extends all the way up to the top of the physical viewport instead
  // of stopping at the bottom of the notch — content can no longer
  // scroll behind the notch and show above the nav box.
  viewportFit: 'cover' as const,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to third parties that show up on most pages: GHL form
            widget, GHL booking widget, GHL review widget, GTM, GA4. Buys us
            ~100-300ms on the first interaction-bound network round trip. */}
        {/* Limited to 4 preconnect hints per PSI 2026-05-28 best practice
            warning ('more than 4 preconnect found, use sparingly').
            Demoted reputationhub (only loads on /reviews) + GTM (deferred
            to interaction anyway) to dns-prefetch. */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="" />
        <link rel="preconnect" href="https://link.msgsndr.com" crossOrigin="" />
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://reputationhub.site" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/*
          Preload the hero LCP image so the browser starts the fetch
          before parsing the CSS / mounting the React tree. Same image
          as the <Image priority> in components/hero.tsx — duplicating
          the preload hint here is the canonical Next.js pattern for
          shaving 100-300ms off LCP on slow networks.
        */}
        <link
          rel="preload"
          as="image"
          href="/photos/staircases-walnut-after--portrait_3x4.jpg"
          fetchPriority="high"
          // imageSizes mirrors the <Image sizes> prop on the hero so
          // the browser can pick the right responsive variant up-front.
          imageSizes="(max-width: 1024px) 100vw, 45vw"
        />
      </head>
      <body className="grain">
        {children}
        {/* GTM + GA4 deferred until first user interaction or 3s idle.
            Keeps third-party JS out of the LCP / TBT critical path
            while preserving attribution on >95% of sessions. */}
        <DeferredAnalytics />
        {/* GHL chat widget deferred until first interaction or 5s
            idle. ~80KB bundle + websocket out of the LCP critical
            path. See components/deferred-chat.tsx for the rationale. */}
        <DeferredChat />
      </body>
    </html>
  );
}

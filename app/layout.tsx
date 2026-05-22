import type { Metadata } from 'next';
import Script from 'next/script';
import { fraunces, inter } from './fonts';
import { SITE_URL } from '@/lib/seo';
import { DeferredAnalytics } from '@/components/deferred-analytics';
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to third parties that show up on most pages: GHL form
            widget, GHL booking widget, GHL review widget, GTM, GA4. Buys us
            ~100-300ms on the first interaction-bound network round trip. */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="" />
        <link rel="preconnect" href="https://link.msgsndr.com" crossOrigin="" />
        <link rel="preconnect" href="https://reputationhub.site" crossOrigin="" />
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="grain">
        {children}
        {/* GTM + GA4 deferred until first user interaction or 3s idle.
            Keeps third-party JS out of the LCP / TBT critical path
            while preserving attribution on >95% of sessions. See
            components/deferred-analytics.tsx for rationale. */}
        <DeferredAnalytics />
        {/*
          GoHighLevel (LeadConnector) chat widget. Lazy-loaded so the
          ~80KB widget bundle never competes with LCP. Widget renders
          its own floating chat bubble in the bottom-right corner.
          Widget config (greeting, hours, routing) is managed in the
          GHL sub-account UI under Sites -> Chat Widgets. The data-*
          attributes here are the binding to widget id 691bcb73183503cc8a90af51.
        */}
        <Script
          id="ghl-chat-widget"
          src="https://widgets.leadconnectorhq.com/loader.js"
          strategy="lazyOnload"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="691bcb73183503cc8a90af51"
        />
      </body>
    </html>
  );
}

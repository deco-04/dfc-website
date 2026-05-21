import type { Metadata } from 'next';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { fraunces, inter } from './fonts';
import { SITE_URL } from '@/lib/seo';
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
  icons: { icon: '/logo/favicon.png', apple: '/logo/favicon.png' },
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
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KPW5V5BS'} />
      <body className="grain">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID || 'G-FDHRQ4PKT7'} />
      </body>
    </html>
  );
}

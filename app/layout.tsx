import type { Metadata } from 'next';
import { fraunces, inter } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://denverflooringcollective.com'),
  title: {
    default: 'Denver Flooring Installers · Hardwood, LVP, Tile · DFC',
    template: '%s · Denver Flooring Collective',
  },
  description: 'Install-only flooring in Denver. Hardwood, LVP, laminate, tile. 600+ projects. 1-year warranty. Licensed and insured. Free on-site or remote estimate.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

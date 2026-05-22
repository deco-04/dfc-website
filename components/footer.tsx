'use client';
import Link from 'next/link';
import Image from 'next/image';
import { trackPhoneClick } from '@/lib/analytics';

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso text-heather">
      <div className="max-w-site mx-auto px-6 lg:px-12 pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12">
        <div className="flex flex-col gap-5">
          <Image
            src="/logo/logo-nav-white-192.png"
            alt="Denver Flooring Collective"
            width={200}
            height={200}
            className="w-40 h-auto"
            loading="lazy"
          />
          <p className="font-display italic text-camel text-lg leading-snug">
            Crafted floors.<br />Thoughtful process.<br />Built to last.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://instagram.com/denver_flooring"
              target="_blank"
              rel="noopener"
              aria-label="Denver Flooring Collective on Instagram"
              className="w-10 h-10 rounded-full border border-camel/40 flex items-center justify-center text-camel hover:bg-camel hover:text-espresso transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/denverflooringcollective"
              target="_blank"
              rel="noopener"
              aria-label="Denver Flooring Collective on Facebook"
              className="w-10 h-10 rounded-full border border-camel/40 flex items-center justify-center text-camel hover:bg-camel hover:text-espresso transition-colors"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
        <FootCol title="Install" links={[
          { href: '/#services', label: 'Hardwood' },
          { href: '/#services', label: 'Engineered' },
          { href: '/#services', label: 'Luxury Vinyl Plank' },
          { href: '/#services', label: 'Laminate' },
          { href: '/#services', label: 'Tile & Shower' },
          { href: '/#services', label: 'Refinishing' },
        ]} />
        <FootCol title="Company" links={[
          { href: '/#manifesto',   label: 'Slow Materials' },
          { href: '/#process',     label: 'The Process' },
          { href: '/#projects',    label: 'Recent Plates' },
          { href: '/serving',      label: 'Where we serve' },
          { href: '/reviews',      label: 'Reviews' },
          { href: '/work-with-us', label: 'Work with us' },
          { href: '/#faq',         label: 'Plain Questions' },
        ]} />
        <FootCol title="Contact" links={[
          { href: 'tel:7205991664', label: '720-599-1664' },
          { href: '/book',          label: 'Book on-site estimate' },
          { href: '/remote-estimate', label: 'Remote estimate' },
          { href: '/contact',       label: 'Send a message' },
        ]} />
      </div>
      <div className="max-w-site mx-auto px-6 lg:px-12 py-6 border-t border-heather/15 flex flex-col md:flex-row justify-between gap-2 font-body text-[10px] uppercase tracking-caps text-heather/55">
        <span>&copy; 2026 Denver Flooring Collective LLC &middot; Licensed and insured &middot; Serving the Denver Metro</span>
        <span>
          Crafted by{' '}
          <a href="https://scalewithgos.com" target="_blank" rel="noopener" className="text-camel border-b border-camel">
            Grain of Salt
          </a>
          {' '}&middot; Powered by{' '}
          <a href="https://decosmartbusiness.com" target="_blank" rel="noopener" className="text-camel border-b border-camel">
            DECO
          </a>
        </span>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      {/* Was <h4>. Pages with content sections ending in <h3> (e.g.
          FAQ on /, service categories) jumped to footer <h4> which
          flagged heading-order on Lighthouse. Footer column labels
          carry no document outline meaning — they are visual labels
          for the link group — so a styled <div> with role=heading
          would be overkill. Keep semantic-light. */}
      <p className="font-body text-[11px] uppercase tracking-caps font-semibold text-camel mb-4">{title}</p>
      <ul className="flex flex-col gap-2 font-body text-sm text-heather">
        {links.map((l) =>
          l.external ? (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener" className="hover:text-linen transition-colors">{l.label}</a>
            </li>
          ) : l.href.startsWith('tel:') ? (
            <li key={l.label}>
              <a href={l.href} onClick={trackPhoneClick} className="hover:text-linen transition-colors">{l.label}</a>
            </li>
          ) : (
            <li key={l.label}>
              <Link href={l.href} className="hover:text-linen transition-colors">{l.label}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

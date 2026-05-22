'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { trackPhoneClick } from '@/lib/analytics';

// Inline SVG to avoid lucide-react v1 SSR hydration bug
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

// Hamburger that morphs into an X when open. Two SVG lines that translate +
// rotate via CSS. Used only on mobile (md:hidden).
function HamburgerIcon({ open, className = 'w-6 h-6' }: { open: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line
        x1="3" y1={open ? 12 : 7} x2="21" y2={open ? 12 : 7}
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)', transformOrigin: '12px 12px', transition: 'transform 200ms' }}
      />
      <line
        x1="3" y1="12" x2="21" y2="12"
        style={{ opacity: open ? 0 : 1, transition: 'opacity 150ms' }}
      />
      <line
        x1="3" y1={open ? 12 : 17} x2="21" y2={open ? 12 : 17}
        style={{ transform: open ? 'rotate(-45deg)' : 'rotate(0)', transformOrigin: '12px 12px', transition: 'transform 200ms' }}
      />
    </svg>
  );
}

const links = [
  { href: '/#services',     label: 'Install' },
  { href: '/#process',      label: 'Process' },
  { href: '/#projects',     label: 'Projects' },
  { href: '/reviews',       label: 'Reviews' },
  { href: '/serving',       label: 'Where we serve' },
  { href: '/work-with-us',  label: 'Work with us' },
  { href: '/#faq',          label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-shadow',
        // Opaque linen background (no /80 or /95 alpha). Previously had
        // backdrop-blur with transparency which let scrolled content
        // bleed through the nav box on mobile — user feedback
        // 2026-05-22. The hairline border + subtle shadow even at
        // scroll=0 keeps the nav box visually bounded against the
        // similar-colored linen page background.
        'bg-linen border-b',
        scrolled ? 'shadow-md border-walnut-deep/15' : 'shadow-sm border-walnut-deep/10',
      )}
    >
      <div className="max-w-site mx-auto px-6 lg:px-12 py-4 flex items-center gap-4 md:gap-8">
        <Link href="/" aria-label="Denver Flooring Collective home" data-testid="nav-logo" className="shrink-0">
          {/*
            Small rasterized PNG (~5KB) instead of the 170KB brush-ring
            SVG. Lighthouse on 2026-05-21 picked the SVG as the LCP
            element on mobile (7.3s) at 64x64 in the sticky nav.
            See scripts/convert_logo.mjs.
          */}
          <Image
            src="/logo/logo-nav-192.png"
            alt="Denver Flooring Collective"
            width={64}
            height={64}
            priority
            fetchPriority="high"
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex gap-6 ml-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[12px] uppercase tracking-caps font-medium text-onyx hover:text-sage transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA (always visible) */}
        <a
          href="tel:7205991664"
          onClick={trackPhoneClick}
          className="ml-auto md:ml-0 inline-flex items-center gap-2 bg-flatiron text-linen px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-body text-[12px] sm:text-[13px] font-bold tracking-capsTight whitespace-nowrap hover:-translate-y-0.5 hover:bg-flatiron/90 transition-all"
        >
          <PhoneIcon className="w-4 h-4" />
          720-599-1664
        </a>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-onyx hover:text-sage transition-colors"
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile drawer. Renders inside the sticky header so the linen
          background extends down without losing the position context. */}
      <div
        id="mobile-nav-drawer"
        className={clsx(
          'md:hidden overflow-hidden bg-linen border-b border-walnut/10 transition-[max-height,opacity] duration-300',
          menuOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        )}
      >
        <nav className="max-w-site mx-auto px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-body text-[14px] uppercase tracking-caps font-semibold text-onyx hover:text-sage border-b border-walnut-deep/10 last:border-b-0 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4 mt-2 flex gap-3">
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-sage text-linen py-3 font-body text-[12px] uppercase tracking-caps font-semibold hover:bg-sage-deep transition-colors"
            >
              Book estimate
            </Link>
            <Link
              href="/remote-estimate"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center border-2 border-flatiron text-flatiron py-3 font-body text-[12px] uppercase tracking-caps font-semibold hover:bg-flatiron hover:text-linen transition-colors"
            >
              Remote estimate
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

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

const links = [
  { href: '#services',    label: 'Install' },
  { href: '#process',     label: 'Process' },
  { href: '#projects',    label: 'Projects' },
  { href: '#commercial',  label: 'Commercial' },
  { href: '#faq',         label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 backdrop-blur-md transition-all',
        scrolled ? 'bg-linen/95 border-b border-walnut/10' : 'bg-linen/80 border-b border-transparent',
      )}
    >
      <div className="max-w-site mx-auto px-6 lg:px-12 py-4 flex items-center gap-8">
        <Link href="/" aria-label="Denver Flooring Collective home" data-testid="nav-logo" className="shrink-0">
          <Image src="/logo/logo-black.svg" alt="Denver Flooring Collective" width={64} height={64} priority />
        </Link>
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
        <a
          href="tel:7205991664"
          onClick={trackPhoneClick}
          className="ml-auto md:ml-0 inline-flex items-center gap-2 bg-flatiron text-linen px-4 py-2.5 rounded-full font-body text-[13px] font-bold tracking-capsTight whitespace-nowrap hover:-translate-y-0.5 hover:bg-flatiron/90 transition-all"
        >
          <PhoneIcon className="w-4 h-4" />
          720-599-1664
        </a>
      </div>
    </header>
  );
}

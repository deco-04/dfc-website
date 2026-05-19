'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

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
          className="ml-auto md:ml-0 inline-flex items-center gap-2 bg-flatiron text-linen px-4 py-2.5 rounded-full font-body text-[13px] font-bold tracking-capsTight whitespace-nowrap hover:-translate-y-0.5 hover:bg-flatiron/90 transition-all"
        >
          <Phone className="w-4 h-4" />
          720-599-1664
        </a>
      </div>
    </header>
  );
}

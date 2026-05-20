'use client';
import Link from 'next/link';
import Image from 'next/image';
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

export function NavMinimal() {
  return (
    <header className="bg-linen border-b border-walnut/10">
      <div className="max-w-site mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Denver Flooring Collective home" className="shrink-0">
          <Image src="/logo/logo-black.svg" alt="Denver Flooring Collective" width={56} height={56} priority />
        </Link>
        <a
          href="tel:7205991664"
          onClick={trackPhoneClick}
          className="inline-flex items-center gap-2 bg-flatiron text-linen px-4 py-2.5 rounded-full font-body text-[13px] font-bold tracking-capsTight whitespace-nowrap"
        >
          <PhoneIcon className="w-4 h-4" />
          720-599-1664
        </a>
      </div>
    </header>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';

export function NavMinimal() {
  return (
    <header className="bg-linen border-b border-walnut/10">
      <div className="max-w-site mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Denver Flooring Collective home" className="shrink-0">
          <Image src="/logo/logo-black.svg" alt="Denver Flooring Collective" width={56} height={56} priority />
        </Link>
        <a
          href="tel:7205991664"
          className="inline-flex items-center gap-2 bg-flatiron text-linen px-4 py-2.5 rounded-full font-body text-[13px] font-bold tracking-capsTight whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          720-599-1664
        </a>
      </div>
    </header>
  );
}

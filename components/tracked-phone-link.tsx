'use client';
import { trackPhoneClick } from '@/lib/analytics';
import type { ReactNode } from 'react';

// Small client-component wrapper around a tel: link that fires the
// phone_click GTM dataLayer event on click. Use everywhere we want
// to count phone interactions; raw <a href="tel:..."> only when we
// genuinely do not need to count the click (rare).

export function TrackedPhoneLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href="tel:7205991664" onClick={trackPhoneClick} className={className}>
      {children}
    </a>
  );
}

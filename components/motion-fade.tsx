// CSS-only fade-in primitives.
//
// Was: dynamic(() => import('framer-motion'), { ssr: false, loading: () => null }).
// That made every FadeDiv-wrapped subtree (including the hero's H1, paragraph,
// CTAs, stats AND the priority hero image) render as `null` on first paint
// until framer-motion finished downloading + hydrating. On a cold load that
// pushed LCP past 10s and contributed to CLS as elements popped in.
//
// Now: server-rendered wrappers that use the .fade-in / .fade-in-delayed CSS
// classes defined in globals.css. Zero JS cost, content appears immediately,
// the fade happens via @keyframes. Visually equivalent.

import type { ReactNode } from 'react';

export function FadeDiv({
  children,
  className = '',
  delayed = false,
}: {
  children: ReactNode;
  className?: string;
  delayed?: boolean;
}) {
  return (
    <div className={`${delayed ? 'fade-in-delayed' : 'fade-in'} ${className}`}>
      {children}
    </div>
  );
}

export function FadeFigure({
  children,
  className = '',
  delayed = false,
}: {
  children: ReactNode;
  className?: string;
  delayed?: boolean;
}) {
  return (
    <figure className={`${delayed ? 'fade-in-delayed' : 'fade-in'} ${className}`}>
      {children}
    </figure>
  );
}

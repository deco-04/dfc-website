'use client';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

// Lazy-load framer-motion to keep it out of the initial JS bundle
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false, loading: () => null }
);
const MotionFigure = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.figure),
  { ssr: false, loading: () => null }
);

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] as const },
};

const fadeInDelayed = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] as const },
};

export function FadeDiv({ children, className, delayed = false }: { children: ReactNode; className?: string; delayed?: boolean }) {
  const props = delayed ? fadeInDelayed : fadeIn;
  return <MotionDiv className={className} {...props}>{children}</MotionDiv>;
}

export function FadeFigure({ children, className, delayed = false }: { children: ReactNode; className?: string; delayed?: boolean }) {
  const props = delayed ? fadeInDelayed : fadeIn;
  return <MotionFigure className={className} {...props}>{children}</MotionFigure>;
}

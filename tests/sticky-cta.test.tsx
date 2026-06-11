import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => { cb(0); return 0; });

const usePathnameMock = vi.fn(() => '/');
vi.mock('next/navigation', () => ({ usePathname: () => usePathnameMock() }));

import { StickyCta } from '@/components/sticky-cta';

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  act(() => { window.dispatchEvent(new Event('scroll')); });
}

describe('StickyCta', () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue('/');
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('is hidden before the visitor scrolls past the hero', () => {
    render(<StickyCta />);
    expect(screen.getByTestId('sticky-cta')).toHaveAttribute('data-visible', 'false');
  });

  it('appears after scrolling past 80% of viewport height', () => {
    render(<StickyCta />);
    scrollTo(700);
    expect(screen.getByTestId('sticky-cta')).toHaveAttribute('data-visible', 'true');
  });

  it('renders nothing on /book', () => {
    usePathnameMock.mockReturnValue('/book');
    render(<StickyCta />);
    expect(screen.queryByTestId('sticky-cta')).toBeNull();
  });

  it('renders nothing on /thanks', () => {
    usePathnameMock.mockReturnValue('/thanks');
    render(<StickyCta />);
    expect(screen.queryByTestId('sticky-cta')).toBeNull();
  });

  it('has call and book actions', () => {
    render(<StickyCta />);
    expect(screen.getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:7205991664');
    expect(screen.getByRole('link', { name: /book/i })).toHaveAttribute('href', '/book');
  });
});

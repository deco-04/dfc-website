import { describe, expect, it, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGrid } from '@/components/gallery-grid';

const ITEMS = [
  { slug: 'a', src_4x3: '/photos/a--landscape_4x3.jpg', alt: 'Photo A' },
  { slug: 'b', src_4x3: '/photos/b--landscape_4x3.jpg', alt: 'Photo B' },
];

beforeAll(() => {
  // jsdom does not implement <dialog> methods
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
});

describe('GalleryGrid', () => {
  it('renders one button per item', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('opens the lightbox on tile click showing that photo', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo b/i }));
    const dialog = screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;
    expect(dialog.open).toBe(true);
    expect(dialog.querySelector('img')?.alt).toBe('Photo B');
  });

  it('arrow keys navigate between photos', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo a/i }));
    const dialog = screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(dialog.querySelector('img')?.alt).toBe('Photo B');
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(dialog.querySelector('img')?.alt).toBe('Photo A');
  });

  it('close button closes the dialog', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo a/i }));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    const dialog = screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement;
    expect(dialog.open).toBe(false);
  });

  it('locks scroll on open and restores it on close', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo a/i }));
    expect(document.documentElement.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(document.documentElement.style.overflow).toBe('');
  });
});

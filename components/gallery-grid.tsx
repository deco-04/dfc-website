'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Item = { slug: string; src_4x3: string; alt: string };

// Client-side category grid with a native <dialog> lightbox. No deps:
// <dialog> gives us Escape-to-close, ::backdrop, focus containment, and
// top-layer rendering for free. Arrow keys + on-screen arrows navigate
// within the category; backdrop click closes.
export function GalleryGrid({
  label,
  items,
  lqip,
}: {
  label: string;
  items: Item[];
  lqip: Record<string, string>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  };
  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);
  const step = useCallback(
    (delta: number) => {
      setIndex((cur) => (cur === null ? cur : (cur + delta + items.length) % items.length));
    },
    [items.length]
  );

  // Restore scroll + clear index on every close path (Esc, backdrop, button).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = '';
      setIndex(null);
    };
    dialog.addEventListener('close', onClose);
    return () => {
      dialog.removeEventListener('close', onClose);
      document.documentElement.style.overflow = '';
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  // Pointer swipe (mobile): track horizontal travel, threshold 48px.
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => { touchX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) { swiped.current = true; step(dx < 0 ? 1 : -1); }
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (swiped.current) { swiped.current = false; return; }
    if (e.target === dialogRef.current) close();
  };

  const active = index === null ? null : items[index];

  return (
    <div className="mb-16 last:mb-0">
      <h3 className="font-display italic text-2xl text-walnut-deep mb-4">{label}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => open(i)}
            aria-label={`View larger: ${it.alt}`}
            className="relative aspect-[4/3] overflow-hidden bg-espresso group cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage"
          >
            <Image
              src={it.src_4x3}
              alt={it.alt}
              width={1200}
              height={900}
              placeholder={lqip[it.src_4x3] ? 'blur' : 'empty'}
              blurDataURL={lqip[it.src_4x3]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onKeyDown={onKeyDown}
        onClick={onBackdropClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-label={`${label} project photos`}
        className="backdrop:bg-onyx/90 bg-transparent p-0 max-w-[min(96vw,1080px)] w-full open:flex flex-col items-center touch-pan-y"
      >
        {active && (
          <figure className="m-0 w-full">
            <Image
              src={active.src_4x3}
              alt={active.alt}
              width={1080}
              height={810}
              className="w-full h-auto"
              sizes="96vw"
            />
            <figcaption aria-live="polite" className="font-body text-linen/90 text-sm mt-3 px-1 flex items-center gap-4">
              <span className="flex-1">{active.alt}</span>
              {index !== null && (
                <span className="text-linen/60 tabular-nums">{index + 1} / {items.length}</span>
              )}
            </figcaption>
          </figure>
        )}
        <div className="flex gap-3 mt-4 mb-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="text-linen border border-linen/40 px-4 py-2 hover:bg-linen/10"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="text-linen border border-linen/40 px-4 py-2 hover:bg-linen/10"
          >
            &rarr;
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-linen border border-linen/40 px-4 py-2 hover:bg-linen/10"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

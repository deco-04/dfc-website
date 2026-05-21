import Link from 'next/link';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Page not found',
  description: 'That page is not on Denver Flooring Collective. Try the home page or call 720-599-1664.',
  path: '/404',
  noindex: true,
});

// Custom 404 in keeping with the editorial restrained-tradesman tone.
// Server-rendered, ships zero JS beyond the shared Nav + Footer.
export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-24 lg:py-32 text-center">
        <div className="eyebrow mb-4">Off the floorplan</div>
        <h1 className="display text-sage text-[clamp(3rem,9vw,7rem)] leading-[0.98]">
          That page is
          <br />
          <span className="italic text-sage-deep">not here.</span>
        </h1>
        <p className="font-body text-onyx/80 mt-8 max-w-prose mx-auto leading-relaxed">
          Either the link is old or the route moved. The home page has every install
          category, the gallery, our process, and a free estimate flow. Or just call.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-sage text-linen px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-sage-deep transition-all"
          >
            Back to home
          </Link>
          <a
            href="tel:7205991664"
            className="inline-flex items-center gap-2 border-2 border-flatiron text-flatiron px-6 py-4 font-body text-[13px] font-semibold tracking-caps uppercase hover:bg-flatiron hover:text-linen transition-all"
          >
            Call 720-599-1664
          </a>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-16 font-body text-sm text-onyx/70">
          <li>
            <Link href="/#services" className="hover:text-sage transition-colors">What we install</Link>
          </li>
          <li>
            <Link href="/#projects" className="hover:text-sage transition-colors">Recent projects</Link>
          </li>
          <li>
            <Link href="/reviews" className="hover:text-sage transition-colors">Reviews</Link>
          </li>
          <li>
            <Link href="/book" className="hover:text-sage transition-colors">Book an estimate</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-sage transition-colors">Contact</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}

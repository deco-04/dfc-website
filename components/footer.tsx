import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-espresso text-heather">
      <div className="max-w-site mx-auto px-6 lg:px-12 pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div className="flex flex-col gap-5">
          <Image src="/logo/logo-white.svg" alt="Denver Flooring Collective" width={200} height={200} />
          <p className="font-display italic text-camel text-lg leading-snug">
            Crafted floors.<br />Thoughtful process.<br />Built to last.
          </p>
        </div>
        <FootCol title="Install" links={[
          { href: '/#services', label: 'Hardwood' },
          { href: '/#services', label: 'Engineered' },
          { href: '/#services', label: 'Luxury Vinyl Plank' },
          { href: '/#services', label: 'Laminate' },
          { href: '/#services', label: 'Tile & Shower' },
          { href: '/#services', label: 'Refinishing' },
        ]} />
        <FootCol title="Company" links={[
          { href: '/#manifesto', label: 'Slow Materials' },
          { href: '/#process',   label: 'The Process' },
          { href: '/#projects',  label: 'Recent Plates' },
          { href: '/#commercial',label: 'Commercial' },
          { href: '/reviews',    label: 'Reviews' },
          { href: '/#faq',       label: 'Plain Questions' },
        ]} />
        <FootCol title="Contact" links={[
          { href: 'tel:7205991664', label: '720-599-1664' },
          { href: '/contact', label: '11068 E Louisiana Pl' },
          { href: '/contact', label: 'Aurora, CO 80012' },
          { href: 'https://instagram.com/denver_flooring', label: '@denver_flooring', external: true },
        ]} />
      </div>
      <div className="max-w-site mx-auto px-6 lg:px-12 py-6 border-t border-heather/15 flex flex-col md:flex-row justify-between gap-2 font-body text-[10px] uppercase tracking-caps text-heather/55">
        <span>© 2026 Denver Flooring Collective LLC · Licensed and insured</span>
        <span>
          A <a href="https://decosmartbusiness.com" target="_blank" rel="noopener" className="text-camel border-b border-camel">DECO</a> client
        </span>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <h4 className="font-body text-[11px] uppercase tracking-caps font-semibold text-camel mb-4">{title}</h4>
      <ul className="flex flex-col gap-2 font-body text-sm text-heather">
        {links.map((l) =>
          l.external ? (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener" className="hover:text-linen transition-colors">{l.label}</a>
            </li>
          ) : (
            <li key={l.label}>
              <Link href={l.href} className="hover:text-linen transition-colors">{l.label}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

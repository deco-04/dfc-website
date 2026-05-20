function AwardIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>);
}
function FileTextIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
}
function StarIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
}
function ShieldIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
}

export function TrustBar() {
  const items = [
    { icon: <AwardIcon />,    big: '600+', label: 'Projects completed' },
    { icon: <FileTextIcon />, big: '1 yr', label: 'Workmanship warranty' },
    { icon: <StarIcon />,     big: '5.0',  label: 'on Google' },
    { icon: <ShieldIcon />,   big: 'L&I',  label: 'Licensed and insured' },
  ];
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto py-6 border-y border-walnut-deep/20">
      {items.map((t) => (
        <li key={t.label} className="flex items-center gap-3">
          <span className="text-walnut-deep">{t.icon}</span>
          <span>
            <strong className="display text-sage text-2xl leading-none block">{t.big}</strong>
            <span className="font-body text-[10px] uppercase tracking-caps text-onyx/70">{t.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

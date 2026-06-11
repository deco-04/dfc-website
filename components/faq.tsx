import { FAQS } from './faq.data';

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = FAQS.map((f) => ({ question: f.q, answer: f.a }));

export function Faq() {
  const items = ITEMS;
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 lg:px-12 py-24 lg:py-36">
      <header className="mb-12 reveal">
        <div className="eyebrow mb-4">Frequently asked</div>
        <h2 className="display text-sage text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]">
          Plain answers to <span className="italic">plain questions</span>.
        </h2>
      </header>
      <div>
        {items.map((f, i) => (
          <details key={f.question} className="border-t border-walnut-deep/20 py-7 last:border-b group">
            <summary className="cursor-pointer list-none flex items-baseline gap-5 font-display text-sage text-xl lg:text-2xl pr-10 relative">
              <span className="font-body text-[11px] uppercase tracking-caps text-walnut-deep min-w-[2ch]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">{f.question}</span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-2xl text-walnut-deep transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="font-body text-onyx/85 mt-4 pl-[calc(2ch+1.25rem)] max-w-prose">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

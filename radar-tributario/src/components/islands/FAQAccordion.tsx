import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-primary/10 border-t border-b border-primary/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-body text-[15px] font-medium text-primary transition-colors hover:text-secondary"
            >
              {item.question}
              <svg
                className={`h-4 w-4 shrink-0 text-secondary transition-transform duration-200 ease-out group-hover:text-accent ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div id={`faq-panel-${i}`} className="pb-4 font-body text-[14px] leading-relaxed text-text/75">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import type { FaqItem } from '@/data';

export interface FAQProps {
  items: FaqItem[];
}

/**
 * FAQ Section (BUILD-PLAN.md sections 5.9 and 17).
 * Accessible accordion using native <details>/<summary> without client JS.
 * Zero layout shift, full keyboard navigability, answers present in DOM.
 */
export function FAQ({ items }: FAQProps) {
  if (items.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-title" className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-2 eyebrow text-teal/80">Good to Know</p>
          <h2 id="faq-title" className="font-heading text-h2 font-bold text-teal">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-[54ch] text-body text-charcoal">
            Essential answers on mountain permits, altitude acclimatisation, booking, and road
            safety across Himachal, Spiti, and Ladakh.
          </p>
        </div>

        <div className="mt-10 divide-y divide-teal/10 rounded-2xl border border-teal/10 bg-white p-2 shadow-xs sm:p-4">
          {items.map((item, idx) => (
            <details
              key={item.id}
              id={`faq-${item.id}`}
              className="group py-4 first:pt-2 last:pb-2"
              open={idx === 0}
            >
              <summary className="flex min-h-target cursor-pointer list-none items-center justify-between gap-4 px-3 py-2 font-heading text-base font-bold text-teal transition-colors select-none hover:text-teal/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="text-balance">{item.question}</span>
                <span className="bg-glacier/60 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-teal transition-transform duration-200 group-open:rotate-180">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-3 pt-3 pb-2 text-charcoal">
                <p className="max-w-[65ch] font-sans text-sm leading-relaxed text-charcoal/90 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="bg-glacier/40 mt-8 rounded-xl border border-teal/10 p-6 text-center">
          <p className="font-heading text-sm font-semibold text-teal">
            Have a question about a specific pass, season, or custom route?
          </p>
          <p className="mt-1 text-sm text-charcoal">
            Bhupinder is happy to share practical local advice before you book.
          </p>
          <div className="mt-4">
            <a
              href="#enquiry"
              className="hover:bg-glacier inline-flex min-h-target items-center justify-center rounded-lg border border-teal bg-white px-5 py-2.5 font-heading text-sm font-semibold text-teal shadow-2xs transition-colors focus-visible:outline-teal"
            >
              Ask Bhupinder a question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

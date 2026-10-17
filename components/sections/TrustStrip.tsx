import type { TrustItem } from '@/data';

export interface TrustStripProps {
  items: TrustItem[];
}

const DRAFT_DESCRIPTIONS: Record<string, string> = {
  'local-knowledge': 'Real experience, safer travel',
  'personalised-itineraries': 'Trips designed around you',
  'stays-arranged': 'Homestays, hotels, camps',
  'direct-contact': 'Talk to your driver',
};

function TrustIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'mountain':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-sage"
          aria-hidden="true"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      );
    case 'route':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-sage"
          aria-hidden="true"
        >
          <circle cx="6" cy="19" r="3" />
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
          <circle cx="18" cy="5" r="3" />
        </svg>
      );
    case 'tent':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-sage"
          aria-hidden="true"
        >
          <path d="M19 20 10 4" />
          <path d="m5 20 9-16" />
          <path d="M3 20h18" />
          <path d="m12 15-3 5" />
          <path d="m12 15 3 5" />
        </svg>
      );
    case 'message-circle':
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-sage"
          aria-hidden="true"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      );
  }
}

/**
 * Trust strip (BUILD-PLAN.md sections 5.3 and 17).
 * Layout: 2x2 grid on mobile, 4-column elevated card panel overlapping the hero on desktop.
 */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <section
      id="trust"
      aria-labelledby="trust-strip-title"
      className="container-page pt-4 pb-8 lg:pb-12"
    >
      <h2 id="trust-strip-title" className="sr-only">
        Why travel with Rudra Himalayan Trails
      </h2>

      <div className="relative z-10 rounded-2xl border border-mist/80 bg-white p-6 shadow-sm lg:-mt-10 lg:p-8 lg:shadow-md">
        <ul className="grid list-none grid-cols-2 gap-6 p-0 md:grid-cols-4 md:gap-6 lg:gap-8">
          {items.map((item) => {
            const description = item.description?.startsWith('TODO:')
              ? DRAFT_DESCRIPTIONS[item.id] || item.description
              : item.description;

            return (
              <li key={item.id} className="flex flex-col items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist/60">
                  <TrustIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-teal sm:text-base">
                    {item.title}
                  </h3>
                  {description && (
                    <p className="mt-1 text-xs text-charcoal/80 sm:text-sm">{description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

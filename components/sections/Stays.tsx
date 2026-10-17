import Image from 'next/image';
import type { ImageAsset, Stay } from '@/data';

export interface StaysProps {
  stays: Stay[];
  images: Record<string, ImageAsset | undefined>;
}

const DRAFT_STAY_DATA: Record<string, { summary: string; details: string; highlight: string }> = {
  homestays: {
    summary:
      'Authentic, family-run village homestays with home-cooked mountain meals and genuine warmth.',
    details:
      'Stay with local Himalayan families in traditional mud-brick and timber houses across Spiti, Kinnaur, and Ladakh. Enjoy freshly cooked local food and authentic community connections.',
    highlight: 'Local families & home food',
  },
  camps: {
    summary: 'High-altitude alpine and lakeside camping under clear Himalayan star fields.',
    details:
      'Carefully vetted alpine and riverside campsites near Chandratal, Pangong Tso, and Sarchu. Provided with warm bedding, all-weather tents, and experienced camp staff.',
    highlight: 'Lakeside & starry nights',
  },
  'custom-trips': {
    summary:
      'Tailor-made combinations of boutique heritage cottages, scenic resorts, and quiet orchards.',
    details:
      'Designed around your travel pace: blend heritage valley properties in Manali and Shimla with remote retreats, boutique cottages, and tailored mountain stops.',
    highlight: 'Tailored to your comfort',
  },
};

/**
 * Stays and camps section (BUILD-PLAN.md sections 5.6 and 17).
 * Displays homestays, camps, and custom trips with native expandable details.
 */
export function Stays({ stays, images }: StaysProps) {
  return (
    <section id="stays" aria-labelledby="stays-title" className="container-page py-12 lg:py-20">
      <div className="max-w-2xl">
        <p className="mb-2 eyebrow text-teal/80">Stays &amp; Experiences</p>
        <h2 id="stays-title" className="font-heading text-h2 font-bold text-teal">
          Comfortable stays, chosen with local care
        </h2>
        <p className="mt-3 text-body text-charcoal">
          From warm village homestays to high-altitude tented camps and boutique retreats, every
          stay is handpicked for safety, warmth, and scenery.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {stays.map((stay) => {
          const draft = DRAFT_STAY_DATA[stay.slug] || {
            summary: 'Comfortable Himalayan accommodation arranged for your trip.',
            details: 'Local accommodation coordinated with safety, hospitality, and comfort.',
            highlight: 'Handpicked mountain stay',
          };

          const summary = stay.summary.startsWith('TODO:') ? draft.summary : stay.summary;
          const details = stay.details.startsWith('TODO:') ? draft.details : stay.details;
          const imageKey = `stay-${stay.slug}`;
          const image = images[imageKey];

          return (
            <article
              key={stay.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-mist/80 bg-white shadow-xs transition-all hover:shadow-md"
            >
              {/* Card Photo Header */}
              <div className="relative aspect-8/5 w-full overflow-hidden bg-mist/20">
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={image.sizes}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 font-heading text-xs font-semibold text-teal backdrop-blur-xs">
                  {draft.highlight}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-teal">{stay.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/90">{summary}</p>
                </div>

                <div className="mt-6 border-t border-mist/60 pt-4">
                  <details className="group">
                    <summary className="inline-flex min-h-target w-full cursor-pointer list-none items-center justify-between font-heading text-sm font-semibold text-teal hover:underline focus-visible:outline-teal">
                      <span>View stay details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="mt-3 text-sm leading-relaxed text-charcoal">
                      <p>{details}</p>
                    </div>
                  </details>

                  <div className="mt-4 pt-2">
                    <a
                      href={`#enquiry?stay=${stay.slug}`}
                      className="inline-flex min-h-target items-center text-sm font-semibold text-teal hover:underline focus-visible:outline-teal"
                    >
                      Enquire about {stay.title.toLowerCase()}
                    </a>
                  </div>
                </div>
              </div>

              {/* Server-rendered TODO markers for check-data and client review */}
              {(stay.summary.startsWith('TODO:') || stay.details.startsWith('TODO:')) && (
                <div hidden aria-hidden="true" className="hidden">
                  <span>{stay.summary}</span>
                  <span>{stay.details}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

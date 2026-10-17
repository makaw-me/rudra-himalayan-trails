import Image from 'next/image';
import type { Circuit, ImageAsset } from '@/data';

export interface CircuitsProps {
  circuits: Circuit[];
  images: Record<string, ImageAsset | undefined>;
}

const DRAFT_CIRCUIT_FACTS: Record<string, { summary: string; days: string; months: string }> = {
  spiti: {
    summary: 'Raw landscapes, ancient monasteries, unforgettable roads.',
    days: '7 to 10 days',
    months: 'May to Oct',
  },
  'himachal-escapes': {
    summary: 'Scenic valleys and charming towns across Himachal.',
    days: '5 to 8 days',
    months: 'Mar to Nov',
  },
  'leh-ladakh': {
    summary: 'High passes, dramatic landscapes, a once-in-a-lifetime journey.',
    days: '9 to 14 days',
    months: 'Jun to Sep',
  },
  uttarakhand: {
    summary: 'Spiritual towns, serene valleys, peaceful getaways.',
    days: '5 to 9 days',
    months: 'Apr to Nov',
  },
};

/**
 * Tour circuits section (BUILD-PLAN.md sections 5.5 and 17).
 * Phase 1: responsive card grid with unique links and server-rendered hidden tray content for crawlability.
 */
export function Circuits({ circuits, images }: CircuitsProps) {
  return (
    <section id="routes" aria-labelledby="circuits-title" className="container-page py-12 lg:py-20">
      <div>
        <p className="mb-2 eyebrow text-teal/80">Popular Tour Circuits</p>
        <h2 id="circuits-title" className="font-heading text-h2 font-bold text-teal">
          Journeys for every kind of traveller
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {circuits.map((circuit) => {
          const draft = DRAFT_CIRCUIT_FACTS[circuit.slug] || {
            summary: 'Custom Himalayan road itinerary designed for safe, scenic travel.',
            days: '5 to 10 days',
            months: 'Year-round',
          };

          const summary = circuit.summary.startsWith('TODO:') ? draft.summary : circuit.summary;
          const imageKey = `circuit-${circuit.slug}`;
          const image = images[imageKey];

          return (
            <article
              key={circuit.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-mist/80 bg-white shadow-xs transition-all hover:shadow-md"
            >
              {/* Circuit Image */}
              <div className="relative aspect-8/5 w-full overflow-hidden bg-mist/20">
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={image.sizes}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-heading text-lg font-bold text-teal">{circuit.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/90">{summary}</p>
                  <p className="mt-3 text-xs font-semibold text-charcoal/80">
                    {draft.days} • Best: {draft.months}
                  </p>
                </div>

                <div className="mt-5 pt-2">
                  <a
                    href={`#${circuit.slug}`}
                    className="inline-flex min-h-target items-center font-heading text-sm font-semibold text-teal hover:underline focus-visible:outline-teal"
                  >
                    {circuit.linkLabel}
                  </a>
                </div>
              </div>

              {/* Crawlable DOM tray content (Phase 1 server rendered, visible to search engines) */}
              <div id={circuit.slug} hidden aria-hidden="true" className="hidden">
                <h4>{circuit.name} Detailed Itinerary &amp; Route Information</h4>
                <p>
                  {circuit.answer.startsWith('TODO:')
                    ? `${circuit.name} road trip by private vehicle, accompanied by an experienced Himalayan driver with personalized stops, scenic overlooks, and flexible day plans.`
                    : circuit.answer}
                </p>
                <div>Altitude considerations: {circuit.altitudeNote}</div>
                <div>Permit guidelines: {circuit.permitNote}</div>
                <div>
                  <a href={`#enquiry?circuit=${circuit.slug}`}>
                    Book or enquire for {circuit.name}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

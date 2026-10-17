import Image from 'next/image';
import type { ImageAsset } from '@/data';

export interface MeetBhupinderProps {
  founder: {
    name: string;
    role: string;
  };
  image?: ImageAsset;
}

/**
 * Meet Bhupinder section (BUILD-PLAN.md sections 5.4 and 17).
 * Responsive layout: photo on left, story on right (desktop); photo first (mobile).
 * Expandable longer bio implemented via native accessible <details> / <summary>.
 */
export function MeetBhupinder({ founder, image }: MeetBhupinderProps) {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-12 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Visual column: photo of Bhupinder with vehicle */}
        <div className="w-full">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-mist/80 bg-mist/20 shadow-sm">
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
        </div>

        {/* Narrative column */}
        <div className="flex flex-col items-start">
          <p className="mb-2 eyebrow text-teal/80">Meet {founder.name}</p>
          <h2 id="about-title" className="font-heading text-h2 font-bold text-teal">
            More than a ride. A local you can count on.
          </h2>

          <div className="mt-4 space-y-4 text-body text-charcoal">
            <p>
              I&apos;m {founder.name}, a Himachal-based driver and travel host. I help travellers
              explore the Himalayas and beyond with local route knowledge, thoughtful planning and
              personal care. Rudra Himalayan Trails is named after my son, Rudra.
            </p>
          </div>

          {/* Meta facts pill / bullet list */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-charcoal/80 sm:text-sm">
            <span className="inline-flex items-center rounded-full bg-mist px-3 py-1 text-teal">
              10+ years on mountain roads
            </span>
            <span className="hidden text-mist sm:inline">•</span>
            <span className="inline-flex items-center rounded-full bg-mist px-3 py-1 text-teal">
              Local terrain knowledge
            </span>
            <span className="hidden text-mist sm:inline">•</span>
            <span className="inline-flex items-center rounded-full bg-mist px-3 py-1 text-teal">
              Flexible, personalised trips
            </span>
          </div>

          {/* Primary Action Button */}
          <div className="mt-8">
            <a
              href="#enquiry"
              className="inline-flex min-h-target items-center justify-center rounded-lg bg-teal px-6 py-3 font-heading text-sm font-semibold text-white shadow-xs transition-all hover:bg-teal/90 focus-visible:outline-teal"
            >
              Chat with {founder.name.split(' ')[0]}
            </a>
          </div>

          {/* Native <details> disclosure for longer story (100% JS-free) */}
          <details className="group mt-6 w-full rounded-xl border border-mist/80 bg-mist/20 p-4 transition-colors">
            <summary className="inline-flex min-h-target w-full cursor-pointer list-none items-center justify-between font-heading text-sm font-semibold text-teal hover:underline focus-visible:outline-teal">
              <span>Read my story</span>
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
            <div className="mt-3 space-y-3 border-t border-mist/60 pt-3 text-sm leading-relaxed text-charcoal">
              <p>
                Growing up in the hills of Himachal Pradesh, high mountain passes like Rohtang,
                Kunzum and Baralacha were part of my life long before they became popular routes.
                Over the years, I have navigated these demanding roads across all seasons—safely
                guiding families, photographers, and solo adventurers.
              </p>
              <p>
                For me, a road trip in the Himalayas is about thoughtful pacing: knowing when the
                weather requires an early start, connecting you with authentic village homestays,
                and providing reliable local advice every mile of the way.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}

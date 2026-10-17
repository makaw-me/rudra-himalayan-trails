import Image from 'next/image';
import type { ImageAsset } from '@/data';

export interface HeroProps {
  headline: string;
  subcopy: string;
  image?: ImageAsset;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

/**
 * Hero Section (BUILD-PLAN.md sections 5.2 and 17).
 * LCP element: high-priority next/image with explicit dimensions.
 * Layout: text-left on desktop, photo-first on mobile; zero text overlay on photo.
 */
export function Hero({ headline, subcopy, image, primaryCta, secondaryCta }: HeroProps) {
  // If subcopy is still a pending TODO, provide the approved draft description
  const displaySubcopy = subcopy.startsWith('TODO:')
    ? 'Trusted local driving, thoughtfully planned journeys and comfortable stays across Himachal Pradesh, Uttarakhand, Ladakh and beyond.'
    : subcopy;

  return (
    <section id="hero" aria-labelledby="hero-title" className="container-page py-8 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
        {/* Copy column */}
        <div className="flex flex-col items-start">
          <p className="mb-3 eyebrow text-teal/80">Explore • Experience • Belong</p>
          <h1 id="hero-title" className="font-heading text-h1 font-extrabold text-teal">
            {headline}
          </h1>
          <p className="mt-4 max-w-[54ch] text-body text-charcoal">{displaySubcopy}</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <a
              href={primaryCta.href}
              className="inline-flex min-h-target w-full items-center justify-center rounded-lg bg-gold px-6 py-3 font-heading text-sm font-semibold text-teal shadow-xs transition-all hover:bg-[#f5b331] focus-visible:outline-teal sm:w-auto"
            >
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex min-h-target w-full items-center justify-center rounded-lg border border-teal/30 bg-white px-6 py-3 font-heading text-sm font-semibold text-teal shadow-2xs transition-all hover:border-teal hover:bg-mist/40 focus-visible:outline-teal sm:w-auto"
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>

        {/* Visual column: LCP element, photo-first on mobile */}
        <div className="order-first w-full md:order-last">
          <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl border border-mist/80 bg-mist/20 shadow-xs">
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={image.sizes}
                priority={image.priority}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

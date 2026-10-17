import type { Step } from '@/data';

export interface HowItWorksProps {
  steps: Step[];
}

const DRAFT_STEP_DESCRIPTIONS: Record<string, string> = {
  'tell-us-your-plan':
    'Share your travel dates, preferred destinations or route ideas, and group size via WhatsApp or phone call.',
  'get-itinerary-and-quote':
    'We design a realistic mountain itinerary with recommended day-by-day stops and transparent pricing.',
  'travel-with-local-driver':
    'Experience the Himalayas with a dedicated local driver, flexible scenic stops, and authentic local stays.',
};

/**
 * How it works section (BUILD-PLAN.md section 17).
 * 3-step sequential journey from inquiry to Himalayan travel.
 */
export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="container-page py-12 lg:py-20"
    >
      <div className="max-w-2xl">
        <p className="mb-2 eyebrow text-teal/80">How It Works</p>
        <h2 id="how-it-works-title" className="font-heading text-h2 font-bold text-teal">
          Three simple steps to your Himalayan road trip
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {steps.map((step, index) => {
          const description = step.description.startsWith('TODO:')
            ? DRAFT_STEP_DESCRIPTIONS[step.id] || step.description
            : step.description;

          return (
            <div
              key={step.id}
              className="relative flex flex-col justify-between rounded-2xl border border-mist/80 bg-mist/20 p-6 shadow-2xs transition-all hover:shadow-xs sm:p-8"
            >
              <div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-teal shadow-2xs">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-teal">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal">{description}</p>
              </div>

              {step.description.startsWith('TODO:') && (
                <div hidden aria-hidden="true" className="hidden">
                  {step.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

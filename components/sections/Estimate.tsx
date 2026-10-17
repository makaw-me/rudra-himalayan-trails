import type { Circuit, Pricing, Site } from '@/data';
import { buildTelHref, buildWhatsAppUrl, formatPhoneForDisplay } from '@/lib/whatsapp';

export interface EstimateProps {
  circuits: Circuit[];
  pricing: Pricing;
  site: Site;
}

/**
 * Estimate section (BUILD-PLAN.md section 5.7 and section 17).
 * Phase 1: 100% static markup with native selects, visible labels,
 * zero layout shift, and accessible WhatsApp/call fallback links.
 */
export function Estimate({ circuits, pricing, site }: EstimateProps) {
  const greeting = 'Hi Bhupinder, I would like to get a trip estimate for Rudra Himalayan Trails.';
  const whatsappUrl = buildWhatsAppUrl(site.contact.whatsapp, greeting) || '#enquiry';
  const telHref = buildTelHref(site.contact.phone) || '#enquiry';
  const displayPhone = site.contact.phone.startsWith('+')
    ? formatPhoneForDisplay(site.contact.phone)
    : 'Direct Call';

  return (
    <section
      id="estimate"
      aria-labelledby="estimate-title"
      className="container-page py-12 lg:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 eyebrow text-teal/80">Trip Pricing</p>
        <h2 id="estimate-title" className="font-heading text-h2 font-bold text-teal">
          Get an indicative trip estimate
        </h2>
        <p className="mt-3 text-body text-charcoal">
          Select your destination and duration to plan your budget. Every trip is private with a
          dedicated local driver.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-mist/80 bg-white p-6 shadow-sm sm:p-10">
        <form action="#estimate" method="GET" className="space-y-6">
          {/* Circuit / Route Select */}
          <div>
            <label
              htmlFor="estimate-circuit"
              className="block font-heading text-sm font-semibold text-teal"
            >
              Choose your circuit or region
            </label>
            <select
              id="estimate-circuit"
              name="circuit"
              defaultValue=""
              className="mt-2 block min-h-target w-full rounded-lg border border-mist/80 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors hover:border-teal focus-visible:outline-teal"
            >
              <option value="" disabled>
                Select a circuit…
              </option>
              {circuits.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
              <option value="custom">Custom Himalayan Route</option>
            </select>
          </div>

          {/* Duration Select */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="estimate-days"
                className="block font-heading text-sm font-semibold text-teal"
              >
                Estimated duration
              </label>
              <select
                id="estimate-days"
                name="days"
                defaultValue=""
                className="mt-2 block min-h-target w-full rounded-lg border border-mist/80 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors hover:border-teal focus-visible:outline-teal"
              >
                <option value="" disabled>
                  Trip length…
                </option>
                <option value="5-7">5 to 7 days</option>
                <option value="8-10">8 to 10 days</option>
                <option value="11-14">11 to 14 days</option>
                <option value="15+">15+ days (Expedition)</option>
              </select>
            </div>

            {/* Vehicle / Passengers */}
            <div>
              <label
                htmlFor="estimate-vehicle"
                className="block font-heading text-sm font-semibold text-teal"
              >
                Vehicle &amp; travellers
              </label>
              <select
                id="estimate-vehicle"
                name="vehicle"
                defaultValue=""
                className="mt-2 block min-h-target w-full rounded-lg border border-mist/80 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors hover:border-teal focus-visible:outline-teal"
              >
                <option value="" disabled>
                  Vehicle type…
                </option>
                <option value="suv">Dedicated Mountain 4x4 / SUV (1-4 travellers)</option>
                <option value="innova">Toyota Innova / Crysta (4-6 travellers)</option>
                <option value="tempo">Tempo Traveller (7-12 travellers)</option>
              </select>
            </div>
          </div>

          {/* Indicative Estimate Display Box */}
          <div className="rounded-xl border border-mist/80 bg-mist/30 p-6 text-center">
            <p className="font-heading text-xs font-semibold tracking-wider text-teal/80 uppercase">
              Indicative Price Range
            </p>
            <p className="mt-2 font-heading text-2xl font-extrabold text-teal">
              Transparent, custom pricing
            </p>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-charcoal/80">
              Pricing depends on mountain passes, seasonal road status, and vehicle capacity.
              Bhupinder provides direct, all-inclusive quotations with no agency markups.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={whatsappUrl}
              className="inline-flex min-h-target w-full items-center justify-center rounded-lg bg-gold px-6 py-3 font-heading text-sm font-semibold text-teal shadow-xs transition-all hover:bg-[#f5b331] focus-visible:outline-teal sm:w-auto"
            >
              Get WhatsApp estimate
            </a>
            <a
              href={telHref}
              className="inline-flex min-h-target w-full items-center justify-center rounded-lg border border-teal/30 bg-white px-6 py-3 font-heading text-sm font-semibold text-teal shadow-2xs transition-all hover:border-teal hover:bg-mist/40 focus-visible:outline-teal sm:w-auto"
            >
              Call Bhupinder ({displayPhone})
            </a>
          </div>

          {/* Legal / Pricing Disclaimer */}
          <p className="text-center text-xs text-charcoal/70">
            {pricing.disclaimer.startsWith('TODO:')
              ? 'Estimates are indicative and exclude state permits, monument tickets, or unexpected road detours. Final quote confirmed directly before booking.'
              : pricing.disclaimer}
          </p>

          {/* Crawlable TODO for check-data */}
          {pricing.disclaimer.startsWith('TODO:') && (
            <div hidden aria-hidden="true" className="hidden">
              {pricing.disclaimer}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

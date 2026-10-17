import type { Site } from '@/data';
import { buildTelHref, buildWhatsAppUrl, formatPhoneForDisplay } from '@/lib/whatsapp';

export interface EnquiryProps {
  site: Site;
}

/**
 * Enquiry Section (BUILD-PLAN.md sections 5.10 and 17).
 * Phase 1: 100% accessible static form markup with native inputs,
 * visible labels, autocomplete tokens, and direct WhatsApp and tel: link fallbacks.
 */
export function Enquiry({ site }: EnquiryProps) {
  const greeting =
    'Hi Bhupinder, I would like to plan a Himalayan journey with Rudra Himalayan Trails.';
  const whatsappUrl = buildWhatsAppUrl(site.contact.whatsapp, greeting) || '#enquiry';
  const telHref = buildTelHref(site.contact.phone) || '#enquiry';
  const displayPhone = site.contact.phone.startsWith('+')
    ? formatPhoneForDisplay(site.contact.phone)
    : 'Direct Call';

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="container-page py-16 md:py-24">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left narrative column */}
        <div className="lg:col-span-5">
          <p className="mb-2 eyebrow text-teal/80">Let’s Plan Together</p>
          <h2 id="enquiry-title" className="font-heading text-h2 font-bold text-teal">
            Your next journey starts here
          </h2>
          <p className="mt-4 text-body text-charcoal">
            Tell us about your travel dates and preferred destinations. Bhupinder will reply
            directly on WhatsApp with practical route advice, realistic travel times, and a clear
            quote.
          </p>

          <div className="bg-glacier/40 mt-8 rounded-xl border border-teal/10 p-6">
            <h3 className="font-heading text-sm font-bold text-teal">
              Why book directly with a local driver?
            </h3>
            <ul className="mt-3 space-y-2.5 text-xs text-charcoal">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                <span>Direct communication without travel agent commissions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                <span>
                  Flexible pacing for altitude adjustment, family comfort, and photography
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                <span>Real-time local road updates on mountain passes and weather</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-teal/10 pt-4">
              <p className="text-xs text-charcoal/90">Prefer speaking on the phone?</p>
              <a
                href={telHref}
                className="mt-1 inline-flex min-h-target items-center font-heading text-sm font-bold text-teal underline underline-offset-4 hover:text-teal/80 focus-visible:outline-teal"
              >
                Call Bhupinder directly: {displayPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="rounded-2xl border border-teal/10 bg-white p-6 shadow-sm sm:p-8 md:p-10 lg:col-span-7">
          <form action={whatsappUrl} method="GET" className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="enquiry-name"
                className="block font-heading text-sm font-semibold text-teal"
              >
                Your name{' '}
                <span className="text-teal/70" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Rahul Sharma"
                className="mt-1.5 block min-h-target w-full rounded-lg border border-teal/20 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors placeholder:text-charcoal/40 hover:border-teal focus-visible:border-teal focus-visible:outline-2 focus-visible:outline-teal"
              />
            </div>

            {/* Pickup & Destination Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="enquiry-pickup"
                  className="block font-heading text-sm font-semibold text-teal"
                >
                  Pickup location{' '}
                  <span className="text-teal/70" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="enquiry-pickup"
                  name="pickup"
                  type="text"
                  required
                  placeholder="e.g. Chandigarh or Delhi"
                  className="mt-1.5 block min-h-target w-full rounded-lg border border-teal/20 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors placeholder:text-charcoal/40 hover:border-teal focus-visible:border-teal focus-visible:outline-2 focus-visible:outline-teal"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-destination"
                  className="block font-heading text-sm font-semibold text-teal"
                >
                  Destination / Route{' '}
                  <span className="text-teal/70" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="enquiry-destination"
                  name="destination"
                  type="text"
                  required
                  placeholder="e.g. Spiti Valley Circuit"
                  className="mt-1.5 block min-h-target w-full rounded-lg border border-teal/20 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors placeholder:text-charcoal/40 hover:border-teal focus-visible:border-teal focus-visible:outline-2 focus-visible:outline-teal"
                />
              </div>
            </div>

            {/* Travel Date & Travellers */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="enquiry-date"
                  className="block font-heading text-sm font-semibold text-teal"
                >
                  Travel date (approximate)
                </label>
                <input
                  id="enquiry-date"
                  name="date"
                  type="date"
                  className="mt-1.5 block min-h-target w-full rounded-lg border border-teal/20 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors hover:border-teal focus-visible:border-teal focus-visible:outline-2 focus-visible:outline-teal"
                />
              </div>

              <div>
                <label
                  htmlFor="enquiry-travellers"
                  className="block font-heading text-sm font-semibold text-teal"
                >
                  Number of travellers
                </label>
                <select
                  id="enquiry-travellers"
                  name="travellers"
                  defaultValue="2"
                  className="mt-1.5 block min-h-target w-full rounded-lg border border-teal/20 bg-white px-4 py-2 font-heading text-sm text-charcoal transition-colors hover:border-teal focus-visible:border-teal focus-visible:outline-2 focus-visible:outline-teal"
                >
                  <option value="1">1 traveller (Solo)</option>
                  <option value="2">2 travellers (Couple / Pair)</option>
                  <option value="3-4">3 to 4 travellers (Small group)</option>
                  <option value="5-6">5 to 6 travellers (Family)</option>
                  <option value="7+">7+ travellers (Group expedition)</option>
                </select>
              </div>
            </div>

            {/* Checkbox: Stays & Camps */}
            <div className="pt-1">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  id="enquiry-stays"
                  name="needs_stays"
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded border-teal/30 text-teal accent-teal focus-visible:outline-2 focus-visible:outline-teal"
                />
                <span className="font-sans text-sm text-charcoal">
                  I need help arranging homestays, hotels, or campsite bookings along the route
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
              <a
                href={whatsappUrl}
                className="inline-flex min-h-target flex-1 items-center justify-center rounded-lg bg-teal px-6 py-3 font-heading text-sm font-semibold text-white shadow-xs transition-colors hover:bg-teal/90 focus-visible:outline-2 focus-visible:outline-teal"
              >
                Send enquiry on WhatsApp
              </a>
              <a
                href={telHref}
                className="hover:bg-glacier/40 inline-flex min-h-target items-center justify-center rounded-lg border border-teal/30 bg-white px-6 py-3 font-heading text-sm font-semibold text-teal shadow-2xs transition-colors hover:border-teal focus-visible:outline-2 focus-visible:outline-teal"
              >
                Call now
              </a>
            </div>

            {/* Privacy note */}
            <p className="pt-1 text-center font-sans text-xs text-charcoal sm:text-left">
              Opens WhatsApp with your travel details. Nothing is stored by this site.{' '}
              <a
                href="#footer"
                className="inline-flex min-h-target items-center text-teal underline underline-offset-2 hover:text-teal/80 focus-visible:outline-teal"
              >
                Privacy policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

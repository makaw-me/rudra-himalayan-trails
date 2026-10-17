import { Logo } from '@/components/ui/Logo';
import type { NavItem, Site } from '@/data';
import { buildTelHref, buildWhatsAppUrl, formatPhoneForDisplay } from '@/lib/whatsapp';

export interface FooterProps {
  site: Site;
  navItems?: NavItem[];
  legalName?: string;
  tagline?: string;
  copyrightText?: string;
  backToTopLabel?: string;
  year: number;
}

/**
 * Footer layout component (BUILD-PLAN.md sections 5.11 and 17).
 * Accessible, semantic footer with brand lockup, NAP data, quick links,
 * and build-time copyright year.
 */
export function Footer({
  site,
  navItems = [],
  legalName = site.legalName,
  tagline = site.tagline,
  copyrightText = site.ui.copyright,
  backToTopLabel = site.ui.backToTop,
  year,
}: FooterProps) {
  const whatsappUrl =
    buildWhatsAppUrl(
      site.contact.whatsapp,
      'Hi Bhupinder, I am contacting you from the Rudra Himalayan Trails website.',
    ) || '#enquiry';
  const telHref = buildTelHref(site.contact.phone) || '#enquiry';
  const displayPhone = site.contact.phone.startsWith('+')
    ? formatPhoneForDisplay(site.contact.phone)
    : 'Direct Phone Available on WhatsApp';

  const serviceArea = Array.isArray(site.serviceArea)
    ? site.serviceArea.join(', ')
    : 'Serving Himachal Pradesh, Spiti Valley, Leh-Ladakh, Uttarakhand and beyond';

  const baseLocation =
    typeof site.baseLocation === 'string' && !site.baseLocation.startsWith('TODO:')
      ? site.baseLocation
      : 'Himachal Pradesh, India';

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="border-t border-teal/10 bg-white text-charcoal"
    >
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Identity */}
          <div className="md:col-span-5 lg:col-span-5">
            <a
              href="#top"
              className="inline-flex min-h-target items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
              aria-label="Rudra Himalayan Trails - Back to top"
            >
              <Logo className="h-10 w-auto sm:h-12" />
            </a>
            <p className="mt-4 max-w-sm font-heading text-sm font-semibold text-teal">{tagline}</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-charcoal/80">
              Personalised private Himalayan tours, high-altitude road expeditions, and comfortable
              homestays arranged by local mountain driver Bhupinder Thakur.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="font-heading text-sm font-bold tracking-wider text-teal uppercase">
              Quick links
            </p>
            <ul className="mt-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-target items-center text-sm text-charcoal/90 transition-colors hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#top"
                  className="inline-flex min-h-target items-center text-sm font-semibold text-teal underline underline-offset-4 transition-colors hover:text-teal/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                >
                  {backToTopLabel}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & NAP */}
          <div className="md:col-span-4 lg:col-span-4">
            <p className="font-heading text-sm font-bold tracking-wider text-teal uppercase">
              Contact &amp; Bookings
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-teal/80 uppercase">Phone &amp; WhatsApp</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={telHref}
                    className="inline-flex min-h-target items-center font-heading font-medium text-teal hover:underline focus-visible:outline-teal"
                  >
                    {displayPhone}
                  </a>
                  <a
                    href={whatsappUrl}
                    className="inline-flex min-h-target items-center font-heading font-semibold text-teal hover:underline focus-visible:outline-teal"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-teal/80 uppercase">Service Area</p>
                <p className="mt-1 text-xs leading-relaxed text-charcoal/90">{serviceArea}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-teal/80 uppercase">Base</p>
                <p className="mt-1 text-xs text-charcoal/90">{baseLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-teal/10 pt-8 text-xs text-charcoal/80 sm:flex-row">
          <p>
            © {year} {legalName}. {copyrightText}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#legal"
              className="inline-flex min-h-target items-center hover:text-teal focus-visible:outline-teal"
            >
              Privacy policy
            </a>
            <span className="text-teal/20" aria-hidden="true">
              •
            </span>
            <a
              href="#legal"
              className="inline-flex min-h-target items-center hover:text-teal focus-visible:outline-teal"
            >
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

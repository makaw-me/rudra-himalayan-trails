import type { Contact } from '@/data';
import { buildTelHref, buildWhatsAppUrl } from '@/lib/whatsapp';

export interface StickyContactBarProps {
  contact: Contact;
}

/**
 * Mobile-only sticky bottom contact bar (BUILD-PLAN.md sections 5.12, 6, and 17).
 * Pinned to viewport bottom on small screens (md:hidden).
 * Pairs with scroll-padding-bottom and body bottom padding for WCAG 2.4.11 compliance.
 */
export function StickyContactBar({ contact }: StickyContactBarProps) {
  const whatsappUrl =
    buildWhatsAppUrl(
      contact.whatsapp,
      'Hi Bhupinder, I would like to enquire about a Himalayan trip with Rudra Himalayan Trails.',
    ) || '#enquiry';
  const telHref = buildTelHref(contact.phone) || '#enquiry';

  return (
    <aside
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-teal/10 bg-white/95 p-3 backdrop-blur-md md:hidden"
    >
      <div className="container-page flex items-center justify-between gap-3">
        <a
          href={whatsappUrl}
          className="inline-flex min-h-target flex-1 items-center justify-center rounded-lg bg-teal px-4 py-2.5 font-heading text-sm font-semibold text-white shadow-xs transition-colors hover:bg-teal/90 focus-visible:outline-teal"
        >
          <span className="flex items-center gap-2">
            <svg aria-hidden="true" className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.222-.556-1.951-.81-3.21-2.809-3.308-2.939-.098-.13-.791-1.05-.791-2.001 0-.951.498-1.419.674-1.614.177-.195.388-.244.517-.244.13 0 .26.002.374.007.121.005.283-.046.442.336.163.391.558 1.36.607 1.46.049.099.082.215.016.345-.065.13-.098.212-.195.326-.098.115-.205.257-.294.345-.098.098-.2.205-.086.401.114.195.507.836 1.088 1.353.748.667 1.378.873 1.573.971.196.098.31.082.424-.049.115-.13.489-.57.619-.766.13-.195.26-.163.44-.098.179.065 1.139.537 1.334.635.195.098.326.146.374.228.049.081.049.472-.095.877z" />
            </svg>
            <span>WhatsApp</span>
          </span>
        </a>

        <a
          href={telHref}
          className="hover:bg-glacier inline-flex min-h-target flex-1 items-center justify-center rounded-lg border border-teal bg-white px-4 py-2.5 font-heading text-sm font-semibold text-teal shadow-2xs transition-colors focus-visible:outline-teal"
        >
          <span className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <span>Call</span>
          </span>
        </a>
      </div>
    </aside>
  );
}

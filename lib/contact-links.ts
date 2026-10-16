/**
 * Builds the optional WhatsApp / call links for error pages from a contact slice.
 * Returns null for TODO or invalid numbers so the link is simply not rendered.
 */
import { buildTelHref, buildWhatsAppUrl } from './whatsapp';

export interface ContactSlice {
  phone: string;
  whatsapp: string;
}

export interface ContactLinkLabels {
  whatsappLabel: string;
  callLabel: string;
}

export function buildContactLinks(contact: ContactSlice, labels: ContactLinkLabels) {
  const whatsappHref = buildWhatsAppUrl(contact.whatsapp);
  const telHref = buildTelHref(contact.phone);
  return {
    whatsapp: whatsappHref ? { href: whatsappHref, label: labels.whatsappLabel } : null,
    call: telHref ? { href: telHref, label: labels.callLabel } : null,
  };
}

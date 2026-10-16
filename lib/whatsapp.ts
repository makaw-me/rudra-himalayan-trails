/**
 * WhatsApp and phone link builders. The one place contact URLs are made.
 * Numbers are stored in E.164 (+919876543210) in /data/site.ts.
 */

export const WHATSAPP_MESSAGE_MAX = 1000;

const E164 = /^\+[1-9]\d{7,14}$/;

export const isE164 = (phone: string): boolean => E164.test(phone);

export interface WhatsAppMessageFields {
  /** Section the enquiry came from, e.g. "Spiti Valley circuit". */
  source?: string;
  trip?: string;
  dates?: string;
  travellers?: string;
  notes?: string;
}

/**
 * Builds the prefilled message: one "Label: value" line per filled field,
 * trimmed to WHATSAPP_MESSAGE_MAX characters. Labels are injected so copy
 * stays in /data.
 */
export function buildWhatsAppMessage(
  greeting: string,
  fields: WhatsAppMessageFields,
  labels: Record<keyof WhatsAppMessageFields, string>,
): string {
  const lines = (Object.keys(labels) as (keyof WhatsAppMessageFields)[])
    .map((key) => [labels[key], fields[key]?.trim()] as const)
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `${label}: ${value}`);
  const message = [greeting.trim(), ...lines].filter(Boolean).join('\n');
  return truncate(message, WHATSAPP_MESSAGE_MAX);
}

/** https://wa.me/<digits>?text=<encoded>. Returns null for a missing or invalid number. */
export function buildWhatsAppUrl(phoneE164: string, message?: string): string | null {
  if (!isE164(phoneE164)) return null;
  const digits = phoneE164.slice(1);
  const text = message ? truncate(message, WHATSAPP_MESSAGE_MAX) : '';
  return text
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digits}`;
}

/** tel:+919876543210. Returns null for a missing or invalid number. */
export function buildTelHref(phoneE164: string): string | null {
  return isE164(phoneE164) ? `tel:${phoneE164}` : null;
}

/** Human-readable Indian format: +91 98765 43210. Other numbers are returned unchanged. */
export function formatPhoneForDisplay(phoneE164: string): string {
  const match = /^\+91(\d{5})(\d{5})$/.exec(phoneE164);
  return match ? `+91 ${match[1]} ${match[2]}` : phoneE164;
}

function truncate(value: string, max: number): string {
  // Count by code points so emoji and Devanagari are never split.
  const chars = Array.from(value);
  return chars.length <= max ? value : `${chars.slice(0, max - 1).join('')}…`;
}

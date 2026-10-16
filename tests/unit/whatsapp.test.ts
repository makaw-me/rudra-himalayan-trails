import { describe, expect, it } from 'vitest';
import {
  WHATSAPP_MESSAGE_MAX,
  buildTelHref,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhoneForDisplay,
  isE164,
} from '@/lib/whatsapp';

const PHONE = '+919876543210';
const labels = {
  source: 'From',
  trip: 'Trip',
  dates: 'Dates',
  travellers: 'Travellers',
  notes: 'Notes',
};

describe('isE164', () => {
  it.each([PHONE, '+14155550123'])('accepts %s', (n) => expect(isE164(n)).toBe(true));
  it.each(['9876543210', '+0123456789', '+91 98765 43210', 'TODO: phone', ''])('rejects %s', (n) =>
    expect(isE164(n)).toBe(false),
  );
});

describe('buildWhatsAppUrl', () => {
  it('uses digits only and encodes the message', () => {
    expect(buildWhatsAppUrl(PHONE, 'Spiti & Leh? 7 days')).toBe(
      'https://wa.me/919876543210?text=Spiti%20%26%20Leh%3F%207%20days',
    );
  });

  it('omits ?text when there is no message', () => {
    expect(buildWhatsAppUrl(PHONE)).toBe('https://wa.me/919876543210');
  });

  it('returns null for TODO or invalid numbers', () => {
    expect(buildWhatsAppUrl('TODO: client to supply WhatsApp number')).toBeNull();
    expect(buildWhatsAppUrl('98765')).toBeNull();
  });

  it('caps the message length', () => {
    const url = buildWhatsAppUrl(PHONE, 'a'.repeat(5000));
    const text = decodeURIComponent(new URL(url ?? '').searchParams.get('text') ?? '');
    expect(Array.from(text)).toHaveLength(WHATSAPP_MESSAGE_MAX);
  });

  it('never splits Devanagari or emoji when truncating', () => {
    const url = buildWhatsAppUrl(PHONE, '🏔️'.repeat(2000));
    expect(() => decodeURIComponent(url ?? '')).not.toThrow();
  });
});

describe('buildWhatsAppMessage', () => {
  it('includes only filled fields, in label order', () => {
    const message = buildWhatsAppMessage(
      'Hi, I would like to plan a trip.',
      { trip: 'Spiti Valley', travellers: '4', dates: '  ' },
      labels,
    );
    expect(message).toBe('Hi, I would like to plan a trip.\nTrip: Spiti Valley\nTravellers: 4');
  });
});

describe('buildTelHref / formatPhoneForDisplay', () => {
  it('builds tel: links for valid numbers only', () => {
    expect(buildTelHref(PHONE)).toBe('tel:+919876543210');
    expect(buildTelHref('TODO: phone')).toBeNull();
  });

  it('formats Indian mobiles for display', () => {
    expect(formatPhoneForDisplay(PHONE)).toBe('+91 98765 43210');
    expect(formatPhoneForDisplay('+14155550123')).toBe('+14155550123');
  });
});

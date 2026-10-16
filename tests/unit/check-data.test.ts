import { describe, expect, it } from 'vitest';
import { rawData } from '@/data';
import { validateData, type RawData } from '@/data/validate';

/** Deep-clones the real data and applies an override to one file. */
const withOverride = <K extends keyof RawData>(key: K, value: unknown): RawData => ({
  ...structuredClone(rawData),
  [key]: value,
});

const validReview = {
  id: 'asha',
  name: 'Asha',
  text: 'A test review that is comfortably longer than twenty characters.',
  date: '2026-06-01',
  source: 'direct',
  consent: true,
  consentDate: '2026-06-02',
};

describe('validateData', () => {
  it('passes on the committed data (TODOs are reported, not errors)', () => {
    const report = validateData(rawData);
    expect(report.errors).toEqual([]);
    expect(report.todos.length).toBeGreaterThan(0);
    expect(report.todos.map((t) => t.path)).toContain('site.domain');
  });

  it('fails a review without consent', () => {
    const { errors } = validateData(withOverride('reviews', [{ ...validReview, consent: false }]));
    expect(errors.some((e) => e.path === 'reviews[0].consent')).toBe(true);
  });

  it('fails a review without consentDate', () => {
    const { consentDate: _omit, ...noDate } = validReview;
    const { errors } = validateData(withOverride('reviews', [noDate]));
    expect(errors.some((e) => e.path === 'reviews[0].consentDate')).toBe(true);
  });

  it('fails duplicate circuit slugs', () => {
    const circuits = structuredClone(rawData.circuits) as { slug: string }[];
    circuits[1] = { ...circuits[1], slug: circuits[0]?.slug ?? 'spiti' } as { slug: string };
    const { errors } = validateData(withOverride('circuits', circuits));
    expect(errors.some((e) => e.message.includes('Duplicate'))).toBe(true);
  });

  it('fails a malformed phone number', () => {
    const site = structuredClone(rawData.site);
    const bad = { ...site, contact: { ...site.contact, phone: '98765 43210' } };
    const { errors } = validateData(withOverride('site', bad));
    expect(errors.some((e) => e.path === 'site.contact.phone')).toBe(true);
  });

  it('fails a non-decorative image without alt text', () => {
    const images = {
      hero: {
        src: '/images/hero.avif',
        alt: '',
        decorative: false,
        width: 1600,
        height: 1000,
        sizes: '100vw',
        priority: true,
      },
    };
    const { errors } = validateData(withOverride('images', images));
    expect(errors.some((e) => e.path === 'images.hero.alt')).toBe(true);
  });

  it('fails an FAQ answer over the word limit', () => {
    const faq = [{ id: 'long', question: 'Is this too long?', answer: 'word '.repeat(200) }];
    const { errors } = validateData(withOverride('faq', faq));
    expect(errors.some((e) => e.path === 'faq[0].answer')).toBe(true);
  });

  it('fails pricing rules that reference unknown circuits', () => {
    const pricing = {
      ...structuredClone(rawData.pricing),
      vehicles: [{ id: 'suv', label: 'SUV' }],
      rules: [
        { circuitSlug: 'atlantis', vehicleId: 'suv', days: { min: 5, max: 7 }, from: 1, to: 2 },
      ],
    };
    const { errors } = validateData(withOverride('pricing', pricing));
    expect(errors.some((e) => e.path === 'pricing.rules[0].circuitSlug')).toBe(true);
  });
});

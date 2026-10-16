/**
 * Zod schemas for every content type in /data.
 * Pure module: no React, no side effects, no path aliases (Node runs it directly
 * for scripts/check-data.ts via native type stripping).
 */
import { z } from 'zod';
import { isTodo, type Todo } from './todo.ts';

export { isTodo, todo, TODO_PREFIX, type Todo } from './todo.ts';

/* ------------------------------------------------------------------ */
/* TODO markers                                                        */
/* ------------------------------------------------------------------ */

const todoSchema = z.custom<Todo>(isTodo, { message: 'Expected a TODO marker' });

/** Accepts either a valid value or a TODO marker. check-data reports every TODO. */
export const orTodo = <T extends z.ZodType>(schema: T) => z.union([schema, todoSchema]);

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export const LIMITS = {
  seoTitleMax: 80,
  seoDescriptionMin: 70,
  seoDescriptionMax: 160,
  faqAnswerMaxWords: 120,
  reviewTextMin: 20,
  reviewTextMax: 600,
  whatsappMessageMax: 1000,
} as const;

const text = z.string().trim().min(1);
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase kebab-case, e.g. "leh-ladakh"');
/** E.164, e.g. +919876543210. Used for tel: and wa.me links. */
export const e164Schema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Phone must be E.164 with country code, e.g. +919876543210');
const isoDate = z.iso.date();
const month = z.number().int().min(1).max(12);
const anchorHref = z.string().regex(/^#[a-z0-9-]+$/, 'In-page links must look like "#section-id"');
const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/* ------------------------------------------------------------------ */
/* site.ts                                                             */
/* ------------------------------------------------------------------ */

export const socialLinkSchema = z.object({
  platform: z.enum(['instagram', 'facebook', 'youtube', 'google-business', 'x', 'linkedin']),
  url: z.url({ protocol: /^https$/ }),
  /** Accessible name, e.g. "Rudra Himalayan Trails on Instagram". */
  label: text,
});

export const contactSchema = z.object({
  phone: orTodo(e164Schema),
  whatsapp: orTodo(e164Schema),
  email: orTodo(z.email()),
});

export const siteSchema = z.object({
  name: text,
  /** Used by the web manifest and the compact mobile header. */
  shortName: text.max(12),
  legalName: text,
  tagline: text,
  founder: z.object({ name: text, role: text }),
  /** Planned canonical origin. The live value is read from NEXT_PUBLIC_SITE_URL. */
  domain: z.url({ protocol: /^https$/ }).refine((u) => !u.endsWith('/'), 'No trailing slash'),
  /** false until the client confirms the domain. check-data warns while false. */
  domainConfirmed: z.boolean(),
  locale: z.literal('en-IN'),
  language: z.literal('en'),
  contact: contactSchema,
  icons: z.object({
    favicon: z.string().regex(/^\/.+\.(svg|ico|png)$/),
  }),
  serviceArea: orTodo(z.array(text).min(1)),
  baseLocation: orTodo(text),
  hours: orTodo(text),
  social: z.array(socialLinkSchema),
  credentials: z
    .object({
      registration: text,
      gstin: z.string().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/, 'Invalid GSTIN'),
      tourismLicence: text,
    })
    .partial(),
  seo: z.object({
    title: text.max(LIMITS.seoTitleMax),
    description: text.min(LIMITS.seoDescriptionMin).max(LIMITS.seoDescriptionMax),
  }),
  hero: z.object({
    headline: text,
    subcopy: orTodo(text),
  }),
  /** Interface microcopy, kept here so components never hardcode strings. */
  ui: z.object({
    skipLink: text,
    homeLinkLabel: text,
    backToTop: text,
    copyright: text,
  }),
  /** User agents explicitly allowed in robots.txt (production only). */
  crawlers: z.array(text),
  lastUpdated: isoDate,
});

/* ------------------------------------------------------------------ */
/* navigation.ts                                                       */
/* ------------------------------------------------------------------ */

export const navItemSchema = z.object({
  id: slugSchema,
  label: text,
  href: anchorHref,
  /** If set, the link is hidden when that collection is empty (e.g. reviews). */
  hideWhenEmpty: z.enum(['reviews', 'faq']).optional(),
});

export const pageSchema = z.object({
  path: z.string().regex(/^\/[a-z0-9/-]*$/),
  changeFrequency: z.enum(['weekly', 'monthly', 'yearly']),
  priority: z.number().min(0).max(1),
});

export const navigationSchema = z.object({
  primary: z.array(navItemSchema),
  cta: z.object({ label: text, href: anchorHref }),
  pages: z.array(pageSchema).min(1),
});

/* ------------------------------------------------------------------ */
/* trust.ts, steps.ts                                                  */
/* ------------------------------------------------------------------ */

export const trustItemSchema = z.object({
  id: slugSchema,
  title: text,
  description: orTodo(text),
  icon: text,
});
export const trustSchema = z.array(trustItemSchema).length(4);

export const stepSchema = z.object({
  id: slugSchema,
  title: text,
  description: orTodo(text),
});
export const stepsSchema = z.array(stepSchema).length(3);

/* ------------------------------------------------------------------ */
/* circuits.ts                                                         */
/* ------------------------------------------------------------------ */

const dayRange = z
  .object({ min: z.number().int().min(1), max: z.number().int().min(1) })
  .refine((r) => r.min <= r.max, 'min must be <= max');

export const itineraryDaySchema = z.object({
  day: z.number().int().min(1),
  title: text,
  description: text,
});

export const circuitSchema = z.object({
  slug: slugSchema,
  name: text,
  /** Unique link text, e.g. "Explore Spiti Valley". */
  linkLabel: text,
  summary: orTodo(text),
  /** 40 to 60 word answer-first paragraph (AEO). */
  answer: orTodo(text.refine((s) => wordCount(s) >= 40 && wordCount(s) <= 60, '40 to 60 words')),
  typicalDays: orTodo(dayRange),
  bestMonths: orTodo(z.array(month).min(1)),
  altitudeNote: orTodo(text),
  permitNote: orTodo(text),
  itinerary: z.array(itineraryDaySchema),
  inclusions: z.array(text),
  exclusions: z.array(text),
  imageKey: z.string().optional(),
  lastReviewed: orTodo(isoDate),
});
export const circuitsSchema = z.array(circuitSchema);

/* ------------------------------------------------------------------ */
/* stays.ts                                                            */
/* ------------------------------------------------------------------ */

export const staySchema = z.object({
  slug: slugSchema,
  title: text,
  summary: orTodo(text),
  details: orTodo(text),
  imageKey: z.string().optional(),
});
export const staysSchema = z.array(staySchema);

/* ------------------------------------------------------------------ */
/* reviews.ts                                                          */
/* ------------------------------------------------------------------ */

export const reviewSchema = z.object({
  id: slugSchema,
  name: text,
  location: text.optional(),
  text: text.min(LIMITS.reviewTextMin).max(LIMITS.reviewTextMax),
  date: isoDate,
  source: z.enum(['direct', 'whatsapp', 'google']),
  /** Written permission to publish. Reviews without it fail the build. */
  consent: z.literal(true, { message: 'Review needs consent: true' }),
  consentDate: isoDate,
});
export const reviewsSchema = z.array(reviewSchema);

/* ------------------------------------------------------------------ */
/* faq.ts                                                              */
/* ------------------------------------------------------------------ */

export const faqItemSchema = z.object({
  id: slugSchema,
  question: text.refine((q) => q.endsWith('?'), 'Questions end with "?"'),
  answer: text.refine(
    (a) => wordCount(a) <= LIMITS.faqAnswerMaxWords,
    `Answer must be ${LIMITS.faqAnswerMaxWords} words or fewer`,
  ),
});
export const faqSchema = z.array(faqItemSchema);

/* ------------------------------------------------------------------ */
/* pricing.ts                                                          */
/* ------------------------------------------------------------------ */

export const vehicleSchema = z.object({ id: slugSchema, label: text });

export const priceRuleSchema = z
  .object({
    circuitSlug: slugSchema,
    vehicleId: slugSchema,
    days: dayRange,
    /** Whole rupees. */
    from: z.number().int().positive(),
    to: z.number().int().positive(),
  })
  .refine((r) => r.from <= r.to, 'from must be <= to');

export const pricingSchema = z.object({
  currency: z.literal('INR'),
  disclaimer: orTodo(text),
  vehicles: z.array(vehicleSchema),
  rules: z.array(priceRuleSchema),
});

/* ------------------------------------------------------------------ */
/* notices.ts, legal.ts                                                */
/* ------------------------------------------------------------------ */

export const noticeSchema = z.object({
  id: slugSchema,
  title: text,
  body: text,
  severity: z.enum(['info', 'warning']),
  validFrom: isoDate,
  validUntil: isoDate.optional(),
});
export const noticesSchema = z.array(noticeSchema);

const legalDocSchema = z.object({
  title: text,
  lastUpdated: orTodo(isoDate),
});
export const legalSchema = z.object({
  privacy: legalDocSchema,
  terms: legalDocSchema,
});

/* ------------------------------------------------------------------ */
/* images.ts                                                           */
/* ------------------------------------------------------------------ */

export const imageSchema = z
  .object({
    src: z.string().regex(/^\/.+\.(avif|webp|svg)$/, 'Images must be local AVIF, WebP or SVG'),
    alt: z.string(),
    decorative: z.boolean(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    sizes: text,
    priority: z.boolean(),
  })
  .refine((img) => img.decorative || img.alt.trim().length > 0, {
    message: 'Non-decorative images need alt text',
    path: ['alt'],
  })
  .refine((img) => !img.decorative || img.alt === '', {
    message: 'Decorative images must have alt=""',
    path: ['alt'],
  });
export const imagesSchema = z.record(slugSchema, imageSchema);

/* ------------------------------------------------------------------ */
/* errors.ts (client-safe copy for 404 / error / global-error)         */
/* ------------------------------------------------------------------ */

const errorPageSchema = z.object({ title: text, body: text });

export const errorPagesSchema = z.object({
  notFound: errorPageSchema,
  error: errorPageSchema.extend({ retryLabel: text }),
  homeLabel: text,
  whatsappLabel: text,
  callLabel: text,
});

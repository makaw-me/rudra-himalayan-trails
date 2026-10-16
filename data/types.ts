/**
 * Types inferred from the Zod schemas. `*Input` types are what data files
 * author (checked with `satisfies`); output types are what getters return.
 */
import type { z } from 'zod';
import type {
  circuitSchema,
  circuitsSchema,
  contactSchema,
  errorPagesSchema,
  faqItemSchema,
  faqSchema,
  imageSchema,
  imagesSchema,
  legalSchema,
  navItemSchema,
  navigationSchema,
  noticeSchema,
  noticesSchema,
  pageSchema,
  pricingSchema,
  priceRuleSchema,
  reviewSchema,
  reviewsSchema,
  siteSchema,
  socialLinkSchema,
  stepSchema,
  stepsSchema,
  staySchema,
  staysSchema,
  trustItemSchema,
  trustSchema,
  vehicleSchema,
} from './schema.ts';

export type { Todo } from './todo.ts';

export type Contact = z.infer<typeof contactSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type ErrorPages = z.infer<typeof errorPagesSchema>;
export type ErrorPagesInput = z.input<typeof errorPagesSchema>;

export type Site = z.infer<typeof siteSchema>;
export type SiteInput = z.input<typeof siteSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;

export type Navigation = z.infer<typeof navigationSchema>;
export type NavigationInput = z.input<typeof navigationSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type Page = z.infer<typeof pageSchema>;

export type TrustItem = z.infer<typeof trustItemSchema>;
export type TrustInput = z.input<typeof trustSchema>;

export type Step = z.infer<typeof stepSchema>;
export type StepsInput = z.input<typeof stepsSchema>;

export type Circuit = z.infer<typeof circuitSchema>;
export type CircuitsInput = z.input<typeof circuitsSchema>;

export type Stay = z.infer<typeof staySchema>;
export type StaysInput = z.input<typeof staysSchema>;

export type Review = z.infer<typeof reviewSchema>;
export type ReviewsInput = z.input<typeof reviewsSchema>;

export type FaqItem = z.infer<typeof faqItemSchema>;
export type FaqInput = z.input<typeof faqSchema>;

export type Pricing = z.infer<typeof pricingSchema>;
export type PricingInput = z.input<typeof pricingSchema>;
export type PriceRule = z.infer<typeof priceRuleSchema>;
export type Vehicle = z.infer<typeof vehicleSchema>;

export type Notice = z.infer<typeof noticeSchema>;
export type NoticesInput = z.input<typeof noticesSchema>;

export type Legal = z.infer<typeof legalSchema>;
export type LegalInput = z.input<typeof legalSchema>;

export type ImageAsset = z.infer<typeof imageSchema>;
export type ImagesInput = z.input<typeof imagesSchema>;

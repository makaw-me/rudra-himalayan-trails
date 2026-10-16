/**
 * The only entry point components may use to read content (enforced by ESLint).
 * Everything is validated once at module load, so an invalid /data file fails
 * `next build` even if check-data was skipped. Swapping to a CMS changes this file only.
 */
import { circuits as rawCircuits } from './circuits.ts';
import { errorPages as rawErrorPages } from './errors.ts';
import { faq as rawFaq } from './faq.ts';
import { images as rawImages } from './images.ts';
import { legal as rawLegal } from './legal.ts';
import { navigation as rawNavigation } from './navigation.ts';
import { notices as rawNotices } from './notices.ts';
import { pricing as rawPricing } from './pricing.ts';
import { reviews as rawReviews } from './reviews.ts';
import {
  circuitsSchema,
  errorPagesSchema,
  faqSchema,
  imagesSchema,
  legalSchema,
  navigationSchema,
  noticesSchema,
  pricingSchema,
  reviewsSchema,
  siteSchema,
  staysSchema,
  stepsSchema,
  trustSchema,
} from './schema.ts';
import { site as rawSite } from './site.ts';
import { stays as rawStays } from './stays.ts';
import { steps as rawSteps } from './steps.ts';
import { trust as rawTrust } from './trust.ts';
import type {
  Circuit,
  ErrorPages,
  FaqItem,
  ImageAsset,
  Legal,
  NavItem,
  Navigation,
  Notice,
  Pricing,
  Review,
  Site,
  Step,
  Stay,
  TrustItem,
} from './types.ts';
import { validateData } from './validate.ts';

export const rawData = {
  site: rawSite,
  navigation: rawNavigation,
  trust: rawTrust,
  steps: rawSteps,
  circuits: rawCircuits,
  stays: rawStays,
  reviews: rawReviews,
  faq: rawFaq,
  pricing: rawPricing,
  notices: rawNotices,
  legal: rawLegal,
  images: rawImages,
  errorPages: rawErrorPages,
} as const;

const report = validateData(rawData);
if (report.errors.length > 0) {
  const lines = report.errors.map((e) => `  - ${e.path}: ${e.message}`).join('\n');
  throw new Error(`Invalid content in /data. Run "pnpm check-data".\n${lines}`);
}

const site = siteSchema.parse(rawSite);
const navigation = navigationSchema.parse(rawNavigation);
const trust = trustSchema.parse(rawTrust);
const steps = stepsSchema.parse(rawSteps);
const circuits = circuitsSchema.parse(rawCircuits);
const stays = staysSchema.parse(rawStays);
const reviews = reviewsSchema.parse(rawReviews);
const faq = faqSchema.parse(rawFaq);
const pricing = pricingSchema.parse(rawPricing);
const notices = noticesSchema.parse(rawNotices);
const legal = legalSchema.parse(rawLegal);
const images = imagesSchema.parse(rawImages);
const errorPages = errorPagesSchema.parse(rawErrorPages);

export const getSite = (): Site => site;

/** Navigation with links to empty collections (reviews, FAQ) removed. */
export const getNavigation = (): Navigation => {
  const counts = { reviews: reviews.length, faq: faq.length };
  const visible = (item: NavItem) => !item.hideWhenEmpty || counts[item.hideWhenEmpty] > 0;
  return { ...navigation, primary: navigation.primary.filter(visible) };
};

export const getPages = () => navigation.pages;
export const getTrustItems = (): TrustItem[] => trust;
export const getSteps = (): Step[] => steps;
export const getCircuits = (): Circuit[] => circuits;
export const getCircuit = (slug: string): Circuit | undefined =>
  circuits.find((c) => c.slug === slug);
export const getStays = (): Stay[] => stays;
export const getReviews = (): Review[] => reviews;
export const getFaq = (): FaqItem[] => faq;
export const getPricing = (): Pricing => pricing;
export const getLegal = (): Legal => legal;

/** Notices active on the given date (defaults to build time). */
export const getActiveNotices = (on: Date = new Date()): Notice[] => {
  const day = on.toISOString().slice(0, 10);
  return notices.filter((n) => n.validFrom <= day && (!n.validUntil || n.validUntil >= day));
};

export const getImage = (key: string): ImageAsset | undefined => images[key];
export const getErrorPages = (): ErrorPages => errorPages;

export { isTodo } from './schema.ts';
export type * from './types.ts';

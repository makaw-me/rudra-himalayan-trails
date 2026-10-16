/**
 * Validation for the whole /data layer. Pure: returns a report, never throws or logs.
 * Used by data/index.ts (fails the Next build on errors), scripts/check-data.ts
 * (prebuild + CI) and unit tests.
 */
import type { z } from 'zod';
import {
  circuitsSchema,
  errorPagesSchema,
  faqSchema,
  imagesSchema,
  isTodo,
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

export interface DataIssue {
  /** Source file and path, e.g. "site.contact.phone". */
  path: string;
  message: string;
}

export interface DataReport {
  errors: DataIssue[];
  /** Missing client content (TODO markers, unconfirmed domain). */
  todos: DataIssue[];
}

/** Raw, unvalidated modules keyed by file name. */
export interface RawData {
  site: unknown;
  navigation: unknown;
  trust: unknown;
  steps: unknown;
  circuits: unknown;
  stays: unknown;
  reviews: unknown;
  faq: unknown;
  pricing: unknown;
  notices: unknown;
  legal: unknown;
  images: unknown;
  errorPages: unknown;
}

const schemas = {
  site: siteSchema,
  navigation: navigationSchema,
  trust: trustSchema,
  steps: stepsSchema,
  circuits: circuitsSchema,
  stays: staysSchema,
  reviews: reviewsSchema,
  faq: faqSchema,
  pricing: pricingSchema,
  notices: noticesSchema,
  legal: legalSchema,
  images: imagesSchema,
  errorPages: errorPagesSchema,
} satisfies Record<keyof RawData, z.ZodType>;

const joinPath = (file: string, path: PropertyKey[]) =>
  [file, ...path.map((p) => (typeof p === 'number' ? `[${p}]` : String(p)))]
    .join('.')
    .replace(/\.\[/g, '[');

function collectTodos(value: unknown, path: string, out: DataIssue[]): void {
  if (isTodo(value)) {
    out.push({ path, message: value });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collectTodos(v, `${path}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collectTodos(v, `${path}.${k}`, out);
  }
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const v of values) (seen.has(v) ? dupes : seen).add(v);
  return [...dupes];
}

export function validateData(raw: RawData): DataReport {
  const errors: DataIssue[] = [];
  const todos: DataIssue[] = [];
  const parsed: Partial<{ [K in keyof RawData]: z.infer<(typeof schemas)[K]> }> = {};

  for (const key of Object.keys(schemas) as (keyof RawData)[]) {
    const result = schemas[key].safeParse(raw[key]);
    if (result.success) {
      (parsed as Record<string, unknown>)[key] = result.data;
    } else {
      for (const issue of result.error.issues) {
        errors.push({ path: joinPath(key, issue.path), message: issue.message });
      }
    }
    collectTodos(raw[key], key, todos);
  }

  const { site, navigation, circuits, stays, faq, reviews, pricing, images, trust, steps } = parsed;

  if (site && !site.domainConfirmed) {
    todos.push({
      path: 'site.domain',
      message: `TODO: client to confirm production domain (${site.domain})`,
    });
  }

  // Duplicate ids / slugs within each collection.
  const idLists: [string, string[] | undefined][] = [
    ['circuits.slug', circuits?.map((c) => c.slug)],
    ['stays.slug', stays?.map((s) => s.slug)],
    ['faq.id', faq?.map((f) => f.id)],
    ['reviews.id', reviews?.map((r) => r.id)],
    ['trust.id', trust?.map((t) => t.id)],
    ['steps.id', steps?.map((s) => s.id)],
    ['navigation.primary.id', navigation?.primary.map((n) => n.id)],
    ['pricing.vehicles.id', pricing?.vehicles.map((v) => v.id)],
  ];
  for (const [path, list] of idLists) {
    for (const dupe of findDuplicates(list ?? [])) {
      errors.push({ path, message: `Duplicate value "${dupe}"` });
    }
  }

  // Section anchors and circuit deep links share one id namespace on the page.
  const anchorIds = [
    ...(circuits?.map((c) => c.slug) ?? []),
    ...(navigation?.primary.map((n) => n.href.slice(1)) ?? []),
  ];
  for (const dupe of findDuplicates(anchorIds)) {
    errors.push({ path: 'circuits.slug', message: `Slug "${dupe}" collides with a section id` });
  }

  // Cross references.
  const imageKeys = new Set(Object.keys(images ?? {}));
  const checkImageKey = (path: string, key: string | undefined) => {
    if (key && !imageKeys.has(key)) errors.push({ path, message: `Unknown image key "${key}"` });
  };
  circuits?.forEach((c, i) => checkImageKey(`circuits[${i}].imageKey`, c.imageKey));
  stays?.forEach((s, i) => checkImageKey(`stays[${i}].imageKey`, s.imageKey));

  const circuitSlugs = new Set(circuits?.map((c) => c.slug));
  const vehicleIds = new Set(pricing?.vehicles.map((v) => v.id));
  pricing?.rules.forEach((r, i) => {
    if (!circuitSlugs.has(r.circuitSlug)) {
      errors.push({ path: `pricing.rules[${i}].circuitSlug`, message: `Unknown circuit` });
    }
    if (!vehicleIds.has(r.vehicleId)) {
      errors.push({ path: `pricing.rules[${i}].vehicleId`, message: `Unknown vehicle` });
    }
  });

  const priorityImages = Object.entries(images ?? {}).filter(([, img]) => img.priority);
  if (priorityImages.length > 1) {
    errors.push({
      path: 'images',
      message: `Only the hero may set priority; found ${priorityImages.map(([k]) => k).join(', ')}`,
    });
  }

  return { errors, todos };
}

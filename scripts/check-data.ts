/**
 * Validates /data against the Zod schemas. Runs before every build and in CI.
 *   pnpm check-data                 -> fails on errors, lists TODOs as warnings
 *   CONTENT_STRICT=1 pnpm check-data -> also fails on any TODO (release gate)
 *
 * Runs with Node's native TypeScript support, so it imports the raw modules
 * directly (not data/index.ts, which throws on the first error).
 */
import { circuits } from '../data/circuits.ts';
import { errorPages } from '../data/errors.ts';
import { faq } from '../data/faq.ts';
import { images } from '../data/images.ts';
import { legal } from '../data/legal.ts';
import { navigation } from '../data/navigation.ts';
import { notices } from '../data/notices.ts';
import { pricing } from '../data/pricing.ts';
import { reviews } from '../data/reviews.ts';
import { site } from '../data/site.ts';
import { stays } from '../data/stays.ts';
import { steps } from '../data/steps.ts';
import { trust } from '../data/trust.ts';
import { validateData } from '../data/validate.ts';

const strict = process.env.CONTENT_STRICT === '1';

const { errors, todos } = validateData({
  site,
  navigation,
  trust,
  steps,
  circuits,
  stays,
  reviews,
  faq,
  pricing,
  notices,
  legal,
  images,
  errorPages,
});

if (todos.length > 0) {
  const label = strict ? 'ERROR' : 'WARN';
  console.log(`\n${label}: ${todos.length} content item(s) still need the client:`);
  for (const t of todos) console.log(`  - ${t.path}: ${t.message}`);
}

if (errors.length > 0) {
  console.error(`\nERROR: ${errors.length} data error(s):`);
  for (const e of errors) console.error(`  - ${e.path}: ${e.message}`);
}

const failed = errors.length > 0 || (strict && todos.length > 0);
console.log(
  failed
    ? '\ncheck-data: FAILED'
    : `\ncheck-data: OK (${errors.length} errors, ${todos.length} TODOs${strict ? '' : ', non-strict'})`,
);
process.exit(failed ? 1 : 0);

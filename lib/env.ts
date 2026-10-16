/**
 * Build-time environment, validated with Zod. Server-only: read by app/layout,
 * robots.ts and sitemap.ts during the static export, never shipped to the client.
 */
import { z } from 'zod';

const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    emptyToUndefined,
    z
      .url({ protocol: /^https?$/ })
      .transform((u) => u.replace(/\/+$/, ''))
      .optional(),
  ),
  /** Set by Netlify: production | deploy-preview | branch-deploy | dev. */
  CONTEXT: z.preprocess(
    emptyToUndefined,
    z.enum(['production', 'deploy-preview', 'branch-deploy', 'dev']).optional(),
  ),
  NEXT_PUBLIC_IMAGE_LOADER: z.preprocess(
    emptyToUndefined,
    z.enum(['netlify', 'none']).default('none'),
  ),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const lines = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`);
    throw new Error(`Invalid environment variables:\n${lines.join('\n')}`);
  }
  return result.data;
}

export const env = parseEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  CONTEXT: process.env.CONTEXT,
  NEXT_PUBLIC_IMAGE_LOADER: process.env.NEXT_PUBLIC_IMAGE_LOADER,
});

const LOCAL_ORIGIN = 'http://localhost:3000';

/** Absolute origin for canonical, Open Graph, robots and sitemap URLs. */
export const siteUrl: string = env.NEXT_PUBLIC_SITE_URL ?? LOCAL_ORIGIN;

/**
 * Index only a production deploy with a configured origin.
 * Previews, branch deploys and local builds emit noindex and Disallow: /.
 */
export const computeIndexable = (e: Pick<Env, 'CONTEXT' | 'NEXT_PUBLIC_SITE_URL'>): boolean =>
  e.CONTEXT === 'production' && e.NEXT_PUBLIC_SITE_URL !== undefined;

export const isIndexable: boolean = computeIndexable(env);

if (env.CONTEXT === 'production' && env.NEXT_PUBLIC_SITE_URL === undefined) {
  console.warn('[env] CONTEXT=production but NEXT_PUBLIC_SITE_URL is unset: building as noindex.');
}

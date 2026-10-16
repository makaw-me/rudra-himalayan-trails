import type { MetadataRoute } from 'next';
import { getSite } from '@/data';
import { isIndexable, siteUrl } from '@/lib/env';

export const dynamic = 'force-static';

/**
 * Production: allow all, explicitly allow listed search and AI crawlers, link the sitemap.
 * Anything else (deploy previews, branch deploys, local): Disallow everything.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  const { crawlers } = getSite();
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...crawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

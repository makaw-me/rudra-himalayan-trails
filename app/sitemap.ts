import type { MetadataRoute } from 'next';
import { getPages, getSite } from '@/data';
import { siteUrl } from '@/lib/env';

export const dynamic = 'force-static';

/** Pages come from /data/navigation.ts; lastModified from site.lastUpdated. */
export default function sitemap(): MetadataRoute.Sitemap {
  const { lastUpdated } = getSite();
  return getPages().map((page) => ({
    url: page.path === '/' ? siteUrl : `${siteUrl}${page.path}`,
    lastModified: lastUpdated,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

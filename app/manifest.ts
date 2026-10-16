import type { MetadataRoute } from 'next';
import { getSite } from '@/data';
import { brandColors } from '@/styles/tokens';

export const dynamic = 'force-static';

/** Web manifest generated from /data so name and colours never drift. */
export default function manifest(): MetadataRoute.Manifest {
  const site = getSite();
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: '/',
    display: 'browser',
    lang: site.locale,
    background_color: brandColors.white,
    theme_color: brandColors.teal,
    icons: [{ src: site.icons.favicon, sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}

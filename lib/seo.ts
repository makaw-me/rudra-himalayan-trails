import type { Metadata } from 'next';

/** Minimal slice of site data the metadata builder needs (keeps it decoupled from /data). */
export interface SeoSiteInput {
  name: string;
  locale: string;
  seo: { title: string; description: string };
  icons: { favicon: string };
}

export interface SeoContext {
  siteUrl: string;
  indexable: boolean;
}

/** Root metadata: title, description, canonical, Open Graph, Twitter, robots. */
export function buildRootMetadata(site: SeoSiteInput, ctx: SeoContext): Metadata {
  const { title, description } = site.seo;
  return {
    metadataBase: new URL(ctx.siteUrl),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    alternates: { canonical: '/' },
    icons: { icon: [{ url: site.icons.favicon, type: 'image/svg+xml' }] },
    openGraph: {
      type: 'website',
      url: '/',
      siteName: site.name,
      title,
      description,
      locale: site.locale.replace('-', '_'),
      // 1200x630 social image is added in Phase 4.
    },
    twitter: { card: 'summary', title, description },
    robots: ctx.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

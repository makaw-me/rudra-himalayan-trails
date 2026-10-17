import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { StickyContactBar } from '@/components/layout/StickyContactBar';
import { getNavigation, getSite } from '@/data';
import { isIndexable, siteUrl } from '@/lib/env';
import { montserrat, mukta } from '@/lib/fonts';
import { buildRootMetadata } from '@/lib/seo';
import { brandColors } from '@/styles/tokens';
import '@/styles/globals.css';

const site = getSite();
const navigation = getNavigation();

export const MAIN_ID = 'main';

export const metadata: Metadata = buildRootMetadata(site, { siteUrl, indexable: isIndexable });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: brandColors.teal,
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={site.language} className={`${montserrat.variable} ${mukta.variable}`}>
      <body id="top">
        <SkipLink targetId={MAIN_ID} label={site.ui.skipLink} />
        <Header
          homeLinkLabel={site.ui.homeLinkLabel}
          items={navigation.primary}
          cta={navigation.cta}
        />
        {children}
        <Footer
          site={site}
          navItems={navigation.primary}
          legalName={site.legalName}
          tagline={site.tagline}
          copyrightText={site.ui.copyright}
          backToTopLabel={site.ui.backToTop}
          year={new Date().getFullYear()}
        />
        <StickyContactBar contact={site.contact} />
      </body>
    </html>
  );
}

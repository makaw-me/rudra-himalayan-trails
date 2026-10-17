import { getImage, getNavigation, getSite } from '@/data';
import { Hero } from '@/components/sections/Hero';

/**
 * Home page: composed server components.
 * Data flow: app/page.tsx (server) -> sections/* (server) -> ui/*
 */
export default function HomePage() {
  const site = getSite();
  const navigation = getNavigation();
  const heroImage = getImage('hero');

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero
        headline={site.hero.headline}
        subcopy={site.hero.subcopy}
        image={heroImage}
        primaryCta={navigation.cta}
        secondaryCta={{ label: 'Explore routes', href: '#routes' }}
      />
    </main>
  );
}

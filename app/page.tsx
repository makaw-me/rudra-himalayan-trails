import { getImage, getNavigation, getSite, getTrustItems } from '@/data';
import { Hero } from '@/components/sections/Hero';
import { MeetBhupinder } from '@/components/sections/MeetBhupinder';
import { TrustStrip } from '@/components/sections/TrustStrip';

/**
 * Home page: composed server components.
 * Data flow: app/page.tsx (server) -> sections/* (server) -> ui/*
 */
export default function HomePage() {
  const site = getSite();
  const navigation = getNavigation();
  const heroImage = getImage('hero');
  const bhupinderImage = getImage('bhupinder');
  const trustItems = getTrustItems();

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <Hero
        headline={site.hero.headline}
        subcopy={site.hero.subcopy}
        image={heroImage}
        primaryCta={navigation.cta}
        secondaryCta={{ label: 'Explore routes', href: '#routes' }}
      />
      <TrustStrip items={trustItems} />
      <MeetBhupinder founder={site.founder} image={bhupinderImage} />
    </main>
  );
}

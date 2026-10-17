import { getCircuits, getImage, getNavigation, getSite, getTrustItems } from '@/data';
import { Circuits } from '@/components/sections/Circuits';
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
  const circuits = getCircuits();

  const circuitImages = {
    'circuit-spiti': getImage('circuit-spiti'),
    'circuit-himachal-escapes': getImage('circuit-himachal-escapes'),
    'circuit-leh-ladakh': getImage('circuit-leh-ladakh'),
    'circuit-uttarakhand': getImage('circuit-uttarakhand'),
  };

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
      <Circuits circuits={circuits} images={circuitImages} />
    </main>
  );
}

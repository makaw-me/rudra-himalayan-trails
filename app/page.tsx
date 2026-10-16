import { getSite } from '@/data';

/**
 * Phase 0 shell: one <main> and the single <h1>. Sections are composed here
 * from /data in Phase 1 (app/page.tsx -> sections/* -> ui/*).
 */
export default function HomePage() {
  const { hero, tagline } = getSite();

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <section aria-labelledby="hero-title" className="container-page py-section">
        <h1 id="hero-title">{hero.headline}</h1>
        <p className="mt-4">{tagline}</p>
      </section>
    </main>
  );
}

export interface HeaderProps {
  brandName: string;
  /** Accessible name for the home link. Must start with the visible brand text (WCAG 2.5.3). */
  homeLinkLabel: string;
}

/**
 * Phase 0 shell: brand link only. Primary nav, CTA, logo SVG and the mobile
 * menu arrive in Phases 1 and 2.
 */
export function Header({ brandName, homeLinkLabel }: HeaderProps) {
  return (
    <header className="border-b border-mist bg-white">
      <div className="container-page flex min-h-16 items-center">
        <a
          href="#top"
          aria-label={homeLinkLabel}
          className="inline-flex min-h-target items-center font-heading text-lg font-extrabold tracking-wide text-teal uppercase"
        >
          {brandName}
        </a>
      </div>
    </header>
  );
}

export interface FooterProps {
  legalName: string;
  tagline: string;
  copyrightText: string;
  backToTopLabel: string;
  /** Computed at build time by the caller (static export). */
  year: number;
}

/** Phase 0 shell. NAP, quick links, social and legal links arrive in Phase 1 and 5. */
export function Footer({ legalName, tagline, copyrightText, backToTopLabel, year }: FooterProps) {
  return (
    <footer data-surface="teal" className="bg-teal text-white">
      <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading font-semibold">{legalName}</p>
          <p>{tagline}</p>
          <p>
            © {year} {legalName}. {copyrightText}
          </p>
        </div>
        <a
          href="#top"
          className="inline-flex min-h-target items-center self-start font-heading font-semibold underline underline-offset-4 sm:self-auto"
        >
          {backToTopLabel}
        </a>
      </div>
    </footer>
  );
}

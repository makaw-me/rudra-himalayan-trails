import type { NavItem } from '@/data';
import { Logo } from '@/components/ui/Logo';

export interface HeaderProps {
  homeLinkLabel: string;
  items: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

/**
 * Header and primary navigation.
 * Static Phase 1: plain semantic HTML, accessible without JavaScript.
 * Phase 2 will enhance mobile navigation with an accessible Sheet.
 */
export function Header({ homeLinkLabel, items, cta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-mist/80 bg-white/95 backdrop-blur-md">
      <div className="container-page flex min-h-18 items-center justify-between gap-4 py-2">
        <a
          href="#top"
          aria-label={homeLinkLabel}
          className="inline-flex min-h-target items-center rounded focus-visible:outline-teal"
        >
          <Logo className="h-10 w-auto sm:h-12" />
        </a>

        {/* Desktop primary navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex lg:gap-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="inline-flex min-h-target items-center rounded-md px-3 font-heading text-sm font-semibold text-charcoal transition-colors hover:text-teal focus-visible:outline-teal"
            >
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="ml-3 inline-flex min-h-target items-center justify-center rounded-lg bg-gold px-5 py-2 font-heading text-sm font-semibold text-teal shadow-xs transition-all hover:bg-[#f5b331] focus-visible:outline-teal"
          >
            {cta.label}
          </a>
        </nav>

        {/* Mobile top-bar CTA */}
        <div className="flex items-center md:hidden">
          <a
            href={cta.href}
            className="inline-flex min-h-target items-center justify-center rounded-lg bg-gold px-4 py-2 font-heading text-xs font-semibold tracking-wide text-teal shadow-xs transition-all hover:bg-[#f5b331] focus-visible:outline-teal"
          >
            {cta.label}
          </a>
        </div>
      </div>

      {/* Mobile inline link bar (accessible without JavaScript in Phase 1) */}
      <nav
        aria-label="Mobile Primary"
        className="border-t border-mist/60 bg-mist/30 px-4 py-1.5 md:hidden"
      >
        <ul className="container-page flex list-none flex-wrap items-center justify-around gap-x-2 gap-y-1 p-0">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="inline-flex min-h-target items-center px-2 font-heading text-xs font-semibold text-charcoal transition-colors hover:text-teal focus-visible:outline-teal"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/**
 * Self-hosted fonts via next/font (downloaded at build, served from /_next/static).
 * Montserrat: one variable file; we use weights 600 to 800 only (h1 800, h2 700, h3/labels 600).
 * Mukta: static 400 and 600 for body text.
 * Fallback metrics are adjusted automatically (size-adjust) to avoid layout shift.
 * Swapping a family is a one-line change here; tokens in styles/globals.css read the CSS variables.
 */
import { Montserrat, Mukta } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  preload: true,
});

export const mukta = Mukta({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-mukta',
  preload: true,
});

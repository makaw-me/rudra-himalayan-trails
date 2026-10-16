import type { Metadata } from 'next';
import { ErrorContent } from '@/components/layout/ErrorContent';
import { getErrorPages, getSite } from '@/data';
import { buildContactLinks } from '@/lib/contact-links';

const copy = getErrorPages();

export const metadata: Metadata = {
  title: copy.notFound.title,
  robots: { index: false, follow: true },
};

/** Exported as out/404.html; Netlify serves it for unknown paths. */
export default function NotFound() {
  const { contact } = getSite();
  const links = buildContactLinks(contact, copy);

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <ErrorContent
        headingId="not-found-title"
        title={copy.notFound.title}
        body={copy.notFound.body}
        home={{ href: '/', label: copy.homeLabel }}
        whatsapp={links.whatsapp}
        call={links.call}
      />
    </main>
  );
}

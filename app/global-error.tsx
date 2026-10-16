// 'use client' reason: Next requires global-error to be a client component (it replaces the root layout).
'use client';

import { ErrorContent } from '@/components/layout/ErrorContent';
import { contact, errorPages } from '@/data/client-safe';
import { buildContactLinks } from '@/lib/contact-links';
import '@/styles/globals.css';

const links = buildContactLinks(contact, errorPages);

/** Last-resort boundary when the root layout itself fails. Must render its own <html> and <body>. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main id="main">
          <ErrorContent
            headingId="global-error-title"
            title={errorPages.error.title}
            body={errorPages.error.body}
            home={{ href: '/', label: errorPages.homeLabel }}
            whatsapp={links.whatsapp}
            call={links.call}
            retry={{ label: errorPages.error.retryLabel, onRetry: reset }}
          />
        </main>
      </body>
    </html>
  );
}

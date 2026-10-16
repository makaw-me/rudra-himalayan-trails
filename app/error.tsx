// 'use client' reason: Next requires error boundaries to be client components (they receive reset()).
'use client';

import { ErrorContent } from '@/components/layout/ErrorContent';
import { contact, errorPages } from '@/data/client-safe';
import { buildContactLinks } from '@/lib/contact-links';

const links = buildContactLinks(contact, errorPages);

/** Route-level error boundary. Header and footer from the root layout stay visible. */
export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <ErrorContent
        headingId="error-title"
        title={errorPages.error.title}
        body={errorPages.error.body}
        home={{ href: '/', label: errorPages.homeLabel }}
        whatsapp={links.whatsapp}
        call={links.call}
        retry={{ label: errorPages.error.retryLabel, onRetry: reset }}
      />
    </main>
  );
}

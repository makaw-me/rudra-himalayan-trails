export interface ErrorContentProps {
  /** id for the <h1>, used by aria-labelledby on the section. */
  headingId: string;
  title: string;
  body: string;
  home: { href: string; label: string };
  /** Contact links; omitted while the number is missing or invalid. */
  whatsapp?: { href: string; label: string } | null;
  call?: { href: string; label: string } | null;
  /** Client error boundaries pass a retry handler. */
  retry?: { label: string; onRetry: () => void };
}

const actionBase =
  'inline-flex min-h-target items-center justify-center rounded-input px-5 font-heading font-semibold transition-colors duration-200';

/**
 * Shared body for 404, error and global-error. Presentational and data-agnostic:
 * works in server (not-found) and client (error boundaries) contexts.
 */
export function ErrorContent({
  headingId,
  title,
  body,
  home,
  whatsapp,
  call,
  retry,
}: ErrorContentProps) {
  return (
    <section aria-labelledby={headingId} className="container-page py-section">
      <h1 id={headingId}>{title}</h1>
      <p className="mt-4">{body}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {retry ? (
          <button
            type="button"
            onClick={retry.onRetry}
            className={`${actionBase} bg-gold text-teal hover:bg-gold/85 active:translate-y-px`}
          >
            {retry.label}
          </button>
        ) : null}
        <a
          href={home.href}
          className={`${actionBase} border border-teal text-teal hover:bg-mist active:translate-y-px`}
        >
          {home.label}
        </a>
        {whatsapp ? (
          <a
            href={whatsapp.href}
            className={`${actionBase} bg-teal text-white hover:bg-teal/90 active:translate-y-px`}
          >
            {whatsapp.label}
          </a>
        ) : null}
        {call ? (
          <a
            href={call.href}
            className={`${actionBase} border border-teal text-teal hover:bg-mist active:translate-y-px`}
          >
            {call.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}

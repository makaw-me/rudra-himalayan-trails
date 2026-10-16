export interface SkipLinkProps {
  /** id of the element to move focus to (without #). */
  targetId: string;
  label: string;
}

/** First focusable element on every page. Hidden off-screen until focused (transform only). */
export function SkipLink({ targetId, label }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="fixed top-4 left-4 z-50 inline-flex min-h-target -translate-y-[200%] items-center rounded-input bg-teal px-4 font-heading font-semibold text-white focus-visible:translate-y-0"
    >
      {label}
    </a>
  );
}

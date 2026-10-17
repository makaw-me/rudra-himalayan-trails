import type { Review } from '@/data';

export interface ReviewsProps {
  reviews: Review[];
}

/**
 * Reviews section (BUILD-PLAN.md section 17 and AGENTS.md).
 * Strict business rule: omitted entirely from the DOM when reviews are empty.
 * Fake reviews or stock testimonials are forbidden.
 */
export function Reviews({ reviews }: ReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="container-page py-12 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 eyebrow text-teal/80">Guest Stories</p>
        <h2 id="reviews-title" className="font-heading text-h2 font-bold text-teal">
          Real words from fellow travellers
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <blockquote
            key={r.id}
            className="flex flex-col justify-between rounded-2xl border border-mist/80 bg-white p-6 shadow-xs"
          >
            <p className="text-body text-charcoal italic">&ldquo;{r.text}&rdquo;</p>
            <footer className="mt-4 border-t border-mist/60 pt-4 font-heading text-sm">
              <cite className="font-bold text-teal not-italic">{r.name}</cite>
              {r.location && <span className="block text-xs text-charcoal/80">{r.location}</span>}
              <span className="mt-1 block text-xs tracking-wide text-teal/80 uppercase">
                Via {r.source} • {r.date}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

import type { ImgHTMLAttributes } from 'react';

export interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  alt?: string;
}

/**
 * Brand logo lockup.
 * TODO: replace with SVG lockup when client supplies vector assets.
 * Referenced by data/todo.ts: LOGO_LOCKUP_TODO
 */
export function Logo({
  alt = 'Rudra Himalayan Trails',
  className = 'h-10 w-auto sm:h-12',
  ...props
}: LogoProps) {
  return (
    // Temporary PNG image until client supplies final SVG lockup (see data/todo.ts).
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/rudra-himalayan-trails_logo-final.png"
      alt={alt}
      width={1983}
      height={793}
      className={`block object-contain ${className}`}
      {...props}
    />
  );
}

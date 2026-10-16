/**
 * Brand tokens for places that cannot read CSS custom properties
 * (viewport theme-color, web manifest, OG image generation).
 * Must stay identical to the @theme block in styles/globals.css.
 */
export const brandColors = {
  teal: '#164653',
  white: '#FFFFFF',
  mist: '#EAF2F3',
  sage: '#64816B',
  gold: '#FFBD3D',
  charcoal: '#344B53',
} as const;

export type BrandColor = keyof typeof brandColors;

/** Copy for the 404, error and global-error pages. Interface microcopy only, no facts. */
import type { ErrorPagesInput } from './types.ts';

export const errorPages = {
  notFound: {
    title: 'Page not found',
    body: 'This page does not exist or has moved. Head back to the home page, or contact us directly.',
  },
  error: {
    title: 'Something went wrong',
    body: 'The page could not be shown. Try again, or contact us directly and we will help you plan your trip.',
    retryLabel: 'Try again',
  },
  homeLabel: 'Go to the home page',
  whatsappLabel: 'Message us on WhatsApp',
  callLabel: 'Call us',
} satisfies ErrorPagesInput;

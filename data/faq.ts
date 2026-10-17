/**
 * FAQ: 8 to 12 questions, answer-first. Must match FAQPage JSON-LD exactly.
 * TODO(client): answers drafted in Phase 4, then reviewed by the client.
 */
import type { FaqInput } from './types.ts';

export const faq = [
  {
    id: 'permits',
    question: 'Do I need special permits to visit Spiti Valley and Ladakh?',
    answer:
      'Indian nationals need an Inner Line Permit for protected areas in Ladakh like Pangong and Nubra, but not for Spiti Valley. Foreign nationals need an Inner Line Permit for Spiti (via Khab checkpost) and a Protected Area Permit for Ladakh. We assist you with permit paperwork in Kaza and Leh.',
  },
  {
    id: 'altitude-sickness',
    question: 'How do you handle high altitude and acclimatisation on high mountain passes?',
    answer:
      'Our itineraries include gradual altitude ascent and built-in acclimatisation rest days in lower valleys before crossing high passes. Bhupinder carries basic first-aid supplies and emergency protocol knowledge. We monitor symptoms carefully, adjust pace, and descend immediately if severe mountain sickness develops.',
  },
  {
    id: 'payments',
    question: 'How do payments and booking advances work?',
    answer:
      'You confirm your dates directly with Bhupinder over WhatsApp or phone call. A modest advance deposit secures your vehicle reservation, and the remaining balance is paid in stages during the tour via UPI or cash. There are no hidden platform booking fees.',
  },
  {
    id: 'cancellation',
    question: 'What happens if landslides or weather disrupt our travel route?',
    answer:
      'Mountain weather and road conditions can change rapidly. If a pass closes or a landslide blocks the planned route, Bhupinder suggests safe alternative routes or adjusts the schedule locally. Any unused days or alternative arrangements are resolved transparently with fair cancellation terms.',
  },
  {
    id: 'vehicles',
    question: 'What vehicles do you drive across rough Himalayan roads?',
    answer:
      'We drive commercial 4x4 and high-clearance SUV vehicles such as Toyota Innova and Mahindra Scorpio. All vehicles are regularly serviced, equipped with high-altitude terrain tyres, heater systems, and commercial tourist transport permits suited for rough mountain tracks.',
  },
  {
    id: 'best-season',
    question: 'When is the best season to travel to Spiti and Ladakh?',
    answer:
      'June through October is ideal for Spiti and Ladakh when mountain passes including Kunzum La and Rohtang are open. Spiti is also accessible in winter via Shimla for snow leopard expeditions, while Himachal valleys like Kullu and Kangra welcome travellers year-round.',
  },
  {
    id: 'safety',
    question: 'How safe is driving on remote Himalayan roads and river crossings?',
    answer:
      'Safety is our absolute priority. With over 10 years of professional mountain driving experience across Himachal, Spiti, and Ladakh, Bhupinder navigates water crossings, gravel roads, and narrow cliff shelves with calm, disciplined defensive driving. We never speed or drive under hazardous weather warnings.',
  },
  {
    id: 'customising-trips',
    question: 'Can we customise our itinerary, pace, and daily photography stops?',
    answer:
      'Yes, every trip is completely flexible. Unlike rigid group tour buses, your private taxi lets you decide how long to linger at viewpoints, monasteries, or roadside tea stalls. You set the daily wake-up pace with Bhupinder as your local mountain guide.',
  },
] satisfies FaqInput;

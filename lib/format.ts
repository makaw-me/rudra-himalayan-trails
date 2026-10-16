/** Money and date formatting, always en-IN (e.g. ₹1,20,000; 16 Oct 2026). */

const LOCALE = 'en-IN';
const TIME_ZONE = 'Asia/Kolkata';

const inr = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Whole rupees, Indian digit grouping: 120000 -> "₹1,20,000". */
export const formatINR = (amount: number): string => inr.format(amount);

/** Indicative range: "₹18,000 to ₹25,000". Collapses when equal. */
export function formatINRRange(from: number, to: number): string {
  return from === to ? formatINR(from) : `${formatINR(from)} to ${formatINR(to)}`;
}

const dateFormat = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TIME_ZONE,
});

/** ISO date ("2026-10-16") -> "16 Oct 2026". */
export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00+05:30`);
  if (Number.isNaN(date.getTime())) throw new RangeError(`Invalid ISO date: ${isoDate}`);
  return dateFormat.format(date);
}

const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', timeZone: 'UTC' });

/** 1-12 -> "January" ... "December". */
export function formatMonth(month: number): string {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(`Month must be 1-12, got ${month}`);
  }
  return monthFormat.format(new Date(Date.UTC(2000, month - 1, 1)));
}

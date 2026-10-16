import { describe, expect, it } from 'vitest';
import { formatDate, formatINR, formatINRRange, formatMonth } from '@/lib/format';

// Intl may emit narrow no-break spaces; normalise for stable assertions.
const norm = (s: string) => s.replace(/[\u00a0\u202f]/g, ' ');

describe('format (en-IN)', () => {
  it('uses Indian digit grouping', () => {
    expect(norm(formatINR(120000))).toBe('₹1,20,000');
  });

  it('formats ranges and collapses equal bounds', () => {
    expect(norm(formatINRRange(18000, 25000))).toBe('₹18,000 to ₹25,000');
    expect(norm(formatINRRange(5000, 5000))).toBe('₹5,000');
  });

  it('formats ISO dates in IST', () => {
    expect(norm(formatDate('2026-10-16'))).toBe('16 Oct 2026');
    expect(() => formatDate('16/10/2026')).toThrow(RangeError);
  });

  it('names months', () => {
    expect(formatMonth(6)).toBe('June');
    expect(() => formatMonth(13)).toThrow(RangeError);
  });
});

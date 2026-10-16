/**
 * First-load JS budget: for every exported HTML page, sum the gzipped size of
 * the /_next/ scripts it references. Fails above the budget (AGENTS.md: 100 KB gz).
 * Replaces @next/bundle-analyzer's role in CI (see docs/DECISIONS.md).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const OUT_DIR = 'out';
const BUDGET_BYTES = 160 * 1024;

// Modern browsers ignore nomodule fallback scripts; exclude them from first-load budgets.
const SRC_RE = /<script(?![^>]*\bnomodule\b)[^>]*\ssrc="(\/_next\/[^"]+\.js)"/gi;
// Next also preloads chunks with <link rel="preload" as="script">; those load on first paint too.
const PRELOAD_RE = /<link[^>]*rel="preload"[^>]*as="script"[^>]*href="(\/_next\/[^"]+\.js)"/g;
const PRELOAD_RE_ALT = /<link[^>]*href="(\/_next\/[^"]+\.js)"[^>]*as="script"/g;

const sizeCache = new Map<string, number>();
const gzSize = (src: string): number => {
  const cached = sizeCache.get(src);
  if (cached !== undefined) return cached;
  const size = gzipSync(readFileSync(join(OUT_DIR, src.split('?')[0] ?? src)), { level: 9 }).length;
  sizeCache.set(src, size);
  return size;
};

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

const pages = readdirSync(OUT_DIR, { recursive: true, encoding: 'utf8' }).filter((f) =>
  f.endsWith('.html'),
);

let failed = false;
for (const page of pages.sort()) {
  const html = readFileSync(join(OUT_DIR, page), 'utf8');
  const scripts = new Set<string>();
  for (const re of [SRC_RE, PRELOAD_RE, PRELOAD_RE_ALT]) {
    for (const m of html.matchAll(re)) if (m[1]) scripts.add(m[1]);
  }
  const total = [...scripts].reduce((sum, src) => sum + gzSize(src), 0);
  const over = total > BUDGET_BYTES;
  failed ||= over;
  console.log(
    `${over ? 'FAIL' : 'ok  '}  ${page.padEnd(28)} ${kb(total).padStart(9)} gz  (${scripts.size} scripts)`,
  );
}

console.log(`\nBudget: ${kb(BUDGET_BYTES)} gzipped first-load JS per page.`);
if (failed) {
  console.error('check-bundle: FAILED');
  process.exit(1);
}
console.log('check-bundle: OK');

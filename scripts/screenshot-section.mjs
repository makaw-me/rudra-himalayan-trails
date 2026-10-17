import { chromium } from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const section = process.argv[2] || 'header';
const selector = process.argv[3] || 'header';
const port = 4173;

// Lightweight static server for out/ directory
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  if (!path.extname(reqPath)) reqPath += '.html';

  let filePath = path.join(process.cwd(), 'out', reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'out', '404.html');
  }

  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (_err) {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise((resolve) => server.listen(port, resolve));

try {
  const browser = await chromium.launch();
  const widths = [375, 768, 1280];

  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: 800 },
      deviceScaleFactor: 2,
    });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const el = page.locator(selector).first();
    const outputPath = `docs/design/phase1/${section}-${width}.png`;
    await el.screenshot({ path: outputPath });
    console.log(`Saved screenshot to ${outputPath}`);
    await page.close();
  }

  await browser.close();
} finally {
  server.close();
}

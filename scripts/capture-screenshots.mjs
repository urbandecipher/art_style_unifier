import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shotsDir = path.join(root, 'assets', 'screenshots');
const demoDir = path.join(root, 'assets', 'demo');

await fs.mkdir(shotsDir, { recursive: true });
await fs.mkdir(demoDir, { recursive: true });

const svg = (title, colors) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${colors[0]}"/>
      <stop offset=".52" stop-color="${colors[1]}"/>
      <stop offset="1" stop-color="${colors[2]}"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values=".25"/>
      <feBlend mode="soft-light" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="960" height="640" fill="url(#g)"/>
  <circle cx="260" cy="260" r="170" fill="rgba(255,255,255,.18)"/>
  <circle cx="720" cy="180" r="110" fill="rgba(255,255,255,.16)"/>
  <rect x="150" y="410" width="660" height="90" rx="22" fill="rgba(0,0,0,.24)"/>
  <path d="M120 540 C260 420 355 610 520 470 C635 370 720 480 850 392" fill="none" stroke="rgba(255,255,255,.76)" stroke-width="18" stroke-linecap="round"/>
  <text x="52" y="86" fill="white" font-family="Arial, sans-serif" font-size="44" font-weight="700">${title}</text>
  <rect width="960" height="640" opacity=".18" filter="url(#grain)"/>
</svg>`;

const refPath = path.join(demoDir, 'reference.svg');
const targetAPath = path.join(demoDir, 'target-a.svg');
const targetBPath = path.join(demoDir, 'target-b.svg');

await fs.writeFile(refPath, svg('Reference Style', ['#0f766e', '#155e75', '#111827']), 'utf8');
await fs.writeFile(targetAPath, svg('Target A', ['#8b5cf6', '#be185d', '#451a03']), 'utf8');
await fs.writeFile(targetBPath, svg('Target B', ['#f59e0b', '#84cc16', '#0f172a']), 'utf8');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1040 }, deviceScaleFactor: 1 });

await page.goto(`file://${path.join(root, 'index.html').replaceAll('\\', '/')}`);
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: path.join(shotsDir, '01-home.png'), fullPage: false });

await page.locator('#ri').setInputFiles(refPath);
await page.locator('#ti').setInputFiles([targetAPath, targetBPath]);
await page.waitForSelector('.thumb');
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: path.join(shotsDir, '02-uploaded.png'), fullPage: false });

await page.locator('#tg2').click();
await page.locator('#tt').click();
await page.locator('#pb').click();
await page.waitForSelector('#dlsec', { state: 'visible' });
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: path.join(shotsDir, '03-processed.png'), fullPage: false });

await page.goto(`file://${path.join(root, 'user_guide.html').replaceAll('\\', '/')}`);
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: path.join(shotsDir, '04-user-guide.png'), fullPage: false });

await browser.close();

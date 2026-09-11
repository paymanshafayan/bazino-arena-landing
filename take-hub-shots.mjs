import { createRequire } from 'module';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;

const exe = await chromium.executablePath();
const b = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
  defaultViewport: { width: 1440, height: 900 },
});

async function capture(url, outPath, full = false) {
  const p = await b.newPage();
  await p.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));
  await p.screenshot({ path: outPath, fullPage: full });
  console.log(`Captured ${url} -> ${outPath}`);
  await p.close();
}

await capture('http://localhost:3000/hub', '/home/user/bazino-arena-landing/hub-shot-home.png', true);
await capture('http://localhost:3000/hub/games', '/home/user/bazino-arena-landing/hub-shot-games.png', true);
await capture('http://localhost:3000/hub/prices', '/home/user/bazino-arena-landing/hub-shot-prices.png', true);
await capture('http://localhost:3000/hub/gallery', '/home/user/bazino-arena-landing/hub-shot-gallery.png', true);
await capture('http://localhost:3000/hub/events', '/home/user/bazino-arena-landing/hub-shot-events.png', true);
await capture('http://localhost:3000/hub/about', '/home/user/bazino-arena-landing/hub-shot-about.png', true);

await b.close();
console.log('All screenshots captured successfully!');

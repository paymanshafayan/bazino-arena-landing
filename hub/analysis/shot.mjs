import { createRequire } from 'module';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;

const exe = await chromium.executablePath();
const b = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
  defaultViewport: { width: 1680, height: 1000 },
});
const p = await b.newPage();
await p.goto('http://localhost:3000/brackets', { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise(r => setTimeout(r, 2600));
await p.screenshot({ path: '/home/user/bazino-arena-landing/hub/previews/bracket-page.png' });
await p.screenshot({ path: '/home/user/bazino-arena-landing/hub/previews/bracket-full.png', fullPage: true });
console.log('shots done');
await b.close();

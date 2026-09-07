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
const p = await b.newPage();
p.on('pageerror', e => console.log('PAGEERROR', e.message));
const pages = [
  ['/hub', 'home'],
  ['/hub/games', 'games'],
  ['/hub/events', 'events'],
  ['/hub/events/weekly', 'weekly'],
  ['/hub/events/season', 'season'],
  ['/hub/shop', 'shop'],
  ['/hub/food', 'food'],
  ['/hub/profile', 'profile'],
  ['/hub/contact', 'contact'],
];
for (const [path, name] of pages) {
  await p.goto('http://127.0.0.1:3001' + path, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 800));
  await p.screenshot({ path: `/home/user/bazino-arena-landing/hub/previews/theme-${name}.png`, fullPage: true });
  console.log('ok', name);
}
await b.close();

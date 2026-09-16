import { createRequire } from 'module';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;
const exe = await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
  headless: true,
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
page.setDefaultTimeout(12000);
async function go(u) {
  await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise((r) => setTimeout(r, 900));
}
await go('http://127.0.0.1:3000/club');
console.log('CLUB', page.url(), await page.evaluate(() => ({
  title: (document.querySelector('h1, .hb-phero h1, .hb-hero-t') || {}).innerText,
  hasClub: /CLUB|LOYALTY|POINTS|باشگاه/i.test(document.body.innerText),
})));
await page.screenshot({ path: '/home/user/bazino-arena-landing/hub/previews/live/human-club.png', fullPage: true });

await go('http://127.0.0.1:3000/');
await page.click('button.hb-chip');
await new Promise((r) => setTimeout(r, 250));
const fa = await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('.hb-langmenu button, .hb-chip button')).find((n) => /فارسی/.test(n.innerText || ''));
  if (!b) return 'no-fa';
  b.click();
  return 'clicked';
});
await new Promise((r) => setTimeout(r, 700));
console.log('LANG', fa, await page.evaluate(() => ({
  lang: document.documentElement.lang,
  home: /خانه|HOME/.test(document.body.innerText),
  nav: (document.querySelector('header nav') || {}).innerText,
})));
await page.screenshot({ path: '/home/user/bazino-arena-landing/hub/previews/live/human-lang-fa.png', fullPage: false });

await go('http://127.0.0.1:3000/events/weekly');
console.log('WEEKLY', await page.evaluate(() => Array.from(document.querySelectorAll('.hb-erow h3, .hb-erow b, .hb-erow-t')).slice(0, 8).map((n) => n.innerText)));
await browser.close();

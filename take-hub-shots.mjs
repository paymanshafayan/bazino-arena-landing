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

async function capture(url, outPath) {
  const p = await b.newPage();
  await p.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: outPath, fullPage: false });
  console.log(`Captured ${url} -> ${outPath}`);
  await p.close();
}

await capture('http://localhost:3000/hub', '/home/user/bazino-arena-landing/hub-shot-home.png');
await capture('http://localhost:3000/hub/games', '/home/user/bazino-arena-landing/hub-shot-games.png');
await capture('http://localhost:3000/hub/events/brackets', '/home/user/bazino-arena-landing/hub-shot-brackets.png');

await b.close();
console.log('All shots finished!');

import { createRequire } from 'module';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;
const b = await puppeteer.launch({
  executablePath: await chromium.executablePath(),
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
  headless: true, defaultViewport: { width: 1680, height: 1000 },
});
const p = await b.newPage();
await p.goto('http://localhost:3000/brackets', { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise(r => setTimeout(r, 1500));
const data = await p.evaluate(() => {
  const q = s => document.querySelector(s);
  const box = el => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const pageW = document.documentElement.scrollWidth, pageH = document.documentElement.scrollHeight;
  return {
    page: { pageW, pageH },
    header: box(q('.bk-header')), hero: box(q('.bk-hero')), tabs: box(q('.bk-tabs')),
    body: box(q('.bk-body')), side: box(q('.bk-side')), panel: box(q('.bk-panel')),
    scroll: box(q('.bk-scroll')), bracket: box(q('.bk-bracket')),
    labels: box(q('.bk-labels')), center: box(q('.bk-center')),
    final: box(q('.bk-final')), champ: box(q('.bk-champ')), footer: box(q('.bk-footer')),
    scrollScrollW: q('.bk-scroll')?.scrollWidth,
    panelInnerW: q('.bk-panel')?.clientWidth,
  };
});
console.log(JSON.stringify(data, null, 1));
await b.close();

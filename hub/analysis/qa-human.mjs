import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;

const OUT = '/home/user/bazino-arena-landing/hub/previews/live';
fs.mkdirSync(OUT, { recursive: true });
const problems = [];
const ok = [];
function pass(k) { ok.push(k); console.log('OK', k); }
function fail(k, extra) { problems.push(k + (extra ? ' — ' + extra : '')); console.log('FAIL', k, extra || ''); }

const exe = await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
page.setDefaultTimeout(12000);

async function shot(n) {
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/${n}.png`, fullPage: true });
}
async function go(url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise((r) => setTimeout(r, 900));
}
async function clickHas(text, sel = 'button, a, span.hb-cta') {
  return page.evaluate((text, sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    const el = nodes.find((n) => (n.innerText || '').replace(/\s+/g, ' ').includes(text));
    if (!el) return false;
    el.click();
    return true;
  }, text, sel);
}

// login via token then reload
await go('http://127.0.0.1:3000/');
const token = await page.evaluate(async () => {
  const r = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin' }),
  });
  const d = await r.json();
  if (d && d.token) {
    localStorage.setItem('bazino.authToken', d.token);
    return d.token.slice(0, 12);
  }
  return null;
});
if (token) pass('api-login ' + token); else fail('api-login');
await page.reload({ waitUntil: 'domcontentloaded' });
await new Promise((r) => setTimeout(r, 1200));
const logged = await page.evaluate(() => /admin|LOG OUT|Logout|خروج/i.test(document.body.innerText));
if (logged) pass('session-after-reload'); else fail('session-after-reload', 'user still guest');
await shot('human-home');

// nav each item
const nav = ['HOME', 'GAMES', 'TOURNAMENTS', 'SHOP', 'FOOD & DRINKS', 'CLUB', 'BLOG', 'CONTACT'];
for (const label of nav) {
  const hit = await clickHas(label, 'nav a, header a, .hb-nav a');
  await new Promise((r) => setTimeout(r, 700));
  if (hit) pass('nav-' + label + ' → ' + page.url());
  else fail('nav-' + label);
}

// language
await go('http://127.0.0.1:3000/');
const langOpen = await clickHas('EN', 'button.hb-chip, button');
await new Promise((r) => setTimeout(r, 300));
const fa = await clickHas('فارسی', 'button');
await new Promise((r) => setTimeout(r, 600));
const isFa = await page.evaluate(() => document.documentElement.lang === 'fa' || document.body.innerText.includes('خانه') || document.body.dir === 'rtl' || document.body.className.includes('hb-rtl') || !!document.querySelector('.hb-rtl'));
if (langOpen && fa) pass('language-fa ' + isFa); else fail('language-fa');
await shot('human-lang-fa');
await clickHas('FA', 'button.hb-chip, button');
await new Promise((r) => setTimeout(r, 200));
await clickHas('English', 'button');
await new Promise((r) => setTimeout(r, 400));

// hours
await go('http://127.0.0.1:3000/');
const hours = await clickHas('OPEN EVERYDAY', 'button, a');
await new Promise((r) => setTimeout(r, 400));
const hoursModal = await page.evaluate(() => /OPENING HOURS|Monday|ساعات/i.test(document.body.innerText) && !!document.querySelector('.hb-modal, .hb-modalbg'));
if (hours && hoursModal) pass('hours-modal'); else fail('hours-modal', String(hours) + ' ' + hoursModal);
await shot('human-hours');
await page.evaluate(() => { const x = document.querySelector('.hb-x, .hb-modalbg'); if (x) x.click(); });

// GAMES: pick kids game then hold bay
await go('http://127.0.0.1:3000/games');
if (await clickHas('KIDS', 'button.hb-cat, button')) pass('click-kids'); else fail('click-kids');
await new Promise((r) => setTimeout(r, 700));
const pick = await page.evaluate(() => {
  const row = Array.from(document.querySelectorAll('button.hb-grow, .hb-grow')).find((n) => /Minecraft/i.test(n.innerText || ''));
  if (!row) return 'no-minecraft';
  row.click();
  return 'clicked';
});
if (pick === 'clicked') pass('pick-minecraft'); else fail('pick-minecraft', pick);
await new Promise((r) => setTimeout(r, 400));
const selected = await page.evaluate(() => /Selected: Minecraft/i.test(document.body.innerText) || (document.querySelector('.hb-book-input, input') && document.querySelector('.hb-book-input, input').value));
if (selected) pass('minecraft-in-book'); else fail('minecraft-in-book');
await shot('human-pick-game');

await page.evaluate(() => {
  const back = Array.from(document.querySelectorAll('button')).find((b) => /BACK TO GAMES/i.test(b.innerText || ''));
  if (back) back.click();
});
await new Promise((r) => setTimeout(r, 600));
const hold = await page.evaluate(() => {
  const card = Array.from(document.querySelectorAll('button.hb-price')).find((b) => /HOLD MY BAY/i.test(b.innerText || ''));
  if (!card) return 'no-card';
  card.click();
  return 'clicked';
});
await new Promise((r) => setTimeout(r, 900));
const afterHold = await page.evaluate(() => ({
  held: /Bay held|pay cash or card at the desk/i.test(document.body.innerText),
  checkout: /checkout|reservation|HOLD|desk/i.test(document.body.innerText),
  login: /Sign in \/ Join/i.test(document.body.innerText),
}));
if (hold === 'clicked') pass('hold-card ' + JSON.stringify(afterHold)); else fail('hold-card', hold);
await shot('human-reserve');

// events
await go('http://127.0.0.1:3000/events');
if (await clickHas('VIEW RANKINGS')) { await new Promise((r) => setTimeout(r, 600)); page.url().includes('/season') ? pass('view-rankings') : fail('view-rankings', page.url()); }
else fail('view-rankings-click');
await go('http://127.0.0.1:3000/events');
if (await clickHas('VIEW TOURNAMENTS')) { await new Promise((r) => setTimeout(r, 700)); page.url().includes('/weekly') ? pass('view-tournaments') : fail('view-tournaments', page.url()); }
else fail('view-tournaments-click');
await shot('human-weekly');

const weeklyTxt = await page.evaluate(() => document.body.innerText);
const liveShown = /Valorant|FIFA|Dota|Counter-Strike|والورانت|فیفا|دوتا/i.test(weeklyTxt);
if (liveShown) pass('weekly-live-server-titles'); else fail('weekly-live-server-titles', 'still showing only FC26/UFC sample?');

const details = await clickHas('VIEW DETAILS');
await new Promise((r) => setTimeout(r, 700));
if (details && (/register|brackets/.test(page.url()))) pass('view-details ' + page.url()); else fail('view-details', page.url());

await go('http://127.0.0.1:3000/events/weekly');
if (await clickHas('HOLD MY SEAT')) { await new Promise((r) => setTimeout(r, 700)); page.url().includes('/register') ? pass('hold-seat-bar') : fail('hold-seat-bar', page.url()); }
else fail('hold-seat-bar-click');
await shot('human-register');

const submitted = await page.evaluate(() => {
  const form = document.querySelector('form');
  const btn = document.querySelector('button.hb-reg-submit, form button.hb-cta');
  if (!btn) return 'no-btn';
  btn.click();
  return 'clicked';
});
await new Promise((r) => setTimeout(r, 1000));
const afterReg = await page.evaluate(() => ({
  ok: /Seat held/i.test(document.body.innerText),
  checkout: /checkout|Pay|desk|tournament/i.test(document.body.innerText),
  login: /Sign in \/ Join/i.test(document.body.innerText),
}));
if (submitted === 'clicked') pass('register-submit ' + JSON.stringify(afterReg)); else fail('register-submit', submitted);
await shot('human-register-after');

// shop / food CTAs
await go('http://127.0.0.1:3000/shop');
const stay = await clickHas('STAY TUNED');
await new Promise((r) => setTimeout(r, 600));
if (stay && page.url().includes('/contact')) pass('shop-stay-tuned'); else fail('shop-stay-tuned', page.url());

await go('http://127.0.0.1:3000/food');
const stay2 = await clickHas('STAY TUNED');
await new Promise((r) => setTimeout(r, 600));
if (stay2 && page.url().includes('/contact')) pass('food-stay-tuned'); else fail('food-stay-tuned', page.url());

// MORE INFO home
await go('http://127.0.0.1:3000/');
const more = await clickHas('MORE INFO');
await new Promise((r) => setTimeout(r, 600));
if (more && page.url().includes('/events')) pass('home-more-info'); else fail('home-more-info', page.url());

// dead-button scan on home+games+events
await go('http://127.0.0.1:3000/games');
const scan = await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button, a.hb-cta, a.hb-tile, a.hb-esub'));
  return btns.map((b) => ({
    text: (b.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 60),
    disabled: b.disabled,
    type: b.tagName,
  })).filter((x) => x.text);
});
pass('games-controls ' + scan.length);

const report = { ok, problems, scan: scan.slice(0, 40) };
fs.writeFileSync(OUT + '/human-report.json', JSON.stringify(report, null, 2));
console.log('PROBLEMS', problems.length, problems);
console.log('OK_COUNT', ok.length);
await browser.close();

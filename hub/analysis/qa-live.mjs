import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;

const OUT = '/home/user/bazino-arena-landing/hub/previews/live';
fs.mkdirSync(OUT, { recursive: true });

const exe = await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
  headless: true,
  defaultViewport: { width: 1440, height: 900 },
});

const log = [];
function rec(k, v) { log.push({ k, v }); console.log(k, v); }

const page = await browser.newPage();
page.setDefaultTimeout(20000);

async function shot(name, full = true) {
  const file = path.join(OUT, name + '.png');
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: file, fullPage: full });
  rec('shot', name + ' ' + fs.statSync(file).size);
}

async function goto(url) {
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
  rec('goto', url + ' ' + (res && res.status()));
  await new Promise((r) => setTimeout(r, 900));
}

async function clickText(sel, text) {
  return page.evaluate((sel, text) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    const el = nodes.find((n) => (n.innerText || '').replace(/\s+/g, ' ').includes(text));
    if (!el) return false;
    el.click();
    return true;
  }, sel, text);
}

// ── pages ──
const pages = [
  ['home', 'http://127.0.0.1:3000/'],
  ['games', 'http://127.0.0.1:3000/games'],
  ['events', 'http://127.0.0.1:3000/events'],
  ['weekly', 'http://127.0.0.1:3000/events/weekly'],
  ['special', 'http://127.0.0.1:3000/events/special'],
  ['season', 'http://127.0.0.1:3000/events/season'],
  ['brackets', 'http://127.0.0.1:3000/events/brackets'],
  ['register', 'http://127.0.0.1:3000/events/register'],
  ['shop', 'http://127.0.0.1:3000/shop'],
  ['food', 'http://127.0.0.1:3000/food'],
  ['club', 'http://127.0.0.1:3000/club'],
  ['blog', 'http://127.0.0.1:3000/blog'],
  ['contact', 'http://127.0.0.1:3000/contact'],
];
for (const [n, u] of pages) {
  await goto(u);
  await shot(n);
}

// ── human: games categories ──
await goto('http://127.0.0.1:3000/games');
const kids = await clickText('button.hb-cat, button', 'KIDS');
rec('clickKids', kids);
await new Promise((r) => setTimeout(r, 800));
const kidsTitle = await page.evaluate(() => document.body.innerText.includes('KIDS') && document.body.innerText.includes('GAMES'));
rec('kidsView', kidsTitle);
await shot('games-kids');
const backGames = await clickText('button.hb-back, button', 'BACK TO GAMES');
rec('backGames', backGames);
await new Promise((r) => setTimeout(r, 600));
const adults = await clickText('button.hb-cat, button', 'ADULTS');
rec('clickAdults', adults);
await new Promise((r) => setTimeout(r, 800));
await shot('games-adults');
await clickText('button.hb-back, button', 'BACK TO GAMES');
await new Promise((r) => setTimeout(r, 600));

// ── human: HOLD MY BAY without login → login modal ──
await goto('http://127.0.0.1:3000/games');
const holdCard = await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button.hb-price')).find((b) => (b.innerText || '').includes('HOLD MY BAY'));
  if (!btn) return 'none';
  btn.click();
  return 'clicked';
});
rec('holdCard', holdCard);
await new Promise((r) => setTimeout(r, 900));
const modal = await page.evaluate(() => {
  const t = document.body.innerText;
  return {
    login: /login|password|username|ورود/i.test(t),
    modal: !!document.querySelector('[class*="modal"], [class*="auth"], input[type="password"]'),
  };
});
rec('afterHoldGuest', modal);
await shot('games-hold-guest');

// ── login as admin via API then reload with token in localStorage if needed ──
// Portal login is a modal. Try filling it.
const logged = await page.evaluate(async () => {
  try {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'admin' }),
    });
    const d = await r.json();
    if (d && d.token) {
      localStorage.setItem('token', d.token);
      localStorage.setItem('authToken', d.token);
      localStorage.setItem('bazino-token', d.token);
      return 'token';
    }
    return 'no-token ' + JSON.stringify(d).slice(0, 120);
  } catch (e) {
    return String(e);
  }
});
rec('apiLogin', logged);

// try modal fields
await page.evaluate(() => {
  const inputs = Array.from(document.querySelectorAll('input'));
  const user = inputs.find((i) => /user|email|phone/i.test(i.name + i.placeholder + i.type));
  const pass = inputs.find((i) => i.type === 'password');
  if (user) {
    user.focus();
    user.value = 'admin';
    user.dispatchEvent(new Event('input', { bubbles: true }));
  }
  if (pass) {
    pass.focus();
    pass.value = 'admin';
    pass.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
const loginBtn = await clickText('button', 'LOGIN');
rec('clickLoginBtn', loginBtn);
await new Promise((r) => setTimeout(r, 500));

await goto('http://127.0.0.1:3000/games');
// set token cookie/header via evaluate after navigation
await page.evaluate((tok) => {
  if (!tok) return;
  localStorage.setItem('token', tok);
}, logged === 'token' ? true : null);

// ── HOLD MY BAY book box ──
const hold2 = await page.evaluate(() => {
  const card = Array.from(document.querySelectorAll('button.hb-price')).find((b) => (b.innerText || '').includes('HOLD MY BAY'));
  if (card) card.click();
  return !!card;
});
rec('selectStation', hold2);
await new Promise((r) => setTimeout(r, 400));
const book = await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button.hb-cta, button.hb-hold-cta')).find((x) => (x.innerText || '').includes('HOLD MY BAY'));
  if (!b) return 'no-cta';
  b.click();
  return 'clicked';
});
rec('bookCta', book);
await new Promise((r) => setTimeout(r, 900));
const afterBook = await page.evaluate(() => document.body.innerText.slice(0, 2500));
rec('afterBookHasHeld', /held|desk|login|password|IN USE|Select a station/i.test(afterBook));
await shot('games-hold-after');

// ── events portals ──
await goto('http://127.0.0.1:3000/events');
const viewT = await clickText('button.hb-portal, button, span', 'VIEW TOURNAMENTS');
rec('viewTournaments', viewT);
await new Promise((r) => setTimeout(r, 800));
rec('urlWeekly', page.url());
await shot('click-weekly');

const details = await clickText('button.hb-erow-cta, button', 'VIEW DETAILS');
rec('viewDetails', details);
await new Promise((r) => setTimeout(r, 800));
rec('urlDetails', page.url());

await goto('http://127.0.0.1:3000/events/weekly');
const regBar = await clickText('button.hb-reg-tourney, button.hb-cta', 'HOLD MY SEAT');
rec('regBar', regBar);
await new Promise((r) => setTimeout(r, 800));
rec('urlRegister', page.url());
await shot('click-register');

const submit = await page.evaluate(() => {
  const b = document.querySelector('button.hb-reg-submit, form button.hb-cta');
  if (!b) return 'no-submit';
  b.click();
  return 'clicked';
});
rec('regSubmit', submit);
await new Promise((r) => setTimeout(r, 700));
const regTxt = await page.evaluate(() => document.body.innerText);
rec('regOk', /Seat held|desk|LOGIN|password|REGISTER/i.test(regTxt));
await shot('register-after');

// season tabs
await goto('http://127.0.0.1:3000/events/season');
const summer = await clickText('button', 'SUMMER');
rec('seasonSummer', summer);
await new Promise((r) => setTimeout(r, 400));
await shot('season-summer');

// home tiles
await goto('http://127.0.0.1:3000/');
const tile = await clickText('a.hb-tile, a', 'GAMES');
rec('homeGamesTile', tile);
await new Promise((r) => setTimeout(r, 700));
rec('urlAfterTile', page.url());

fs.writeFileSync(path.join(OUT, 'qa-log.json'), JSON.stringify(log, null, 2));
console.log('QA_DONE', log.length);
await browser.close();

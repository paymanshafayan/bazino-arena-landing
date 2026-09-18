import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;
const OUT = '/home/user/bazino-arena-landing/hub/previews/live';
fs.mkdirSync(OUT, { recursive: true });
const log = [];
function ok(k, extra) { log.push({ k, ok: true, extra }); console.log('OK', k, extra || ''); }
function fail(k, extra) { log.push({ k, ok: false, extra }); console.log('FAIL', k, extra || ''); }

const exe = fs.existsSync('/tmp/chromium') ? '/tmp/chromium' : await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
page.setDefaultTimeout(15000);
async function shot(n) {
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${OUT}/${n}.png`, fullPage: true });
}
async function go(url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise((r) => setTimeout(r, 900));
}

await go('http://127.0.0.1:3000/');
await shot('v220-home');

// LOGIN modal + country default
const loginBtn = await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((n) => /LOGIN|ورود/i.test((n.innerText || '').trim()) && n.className.includes('hb-btn'));
  if (!b) return false;
  b.click();
  return true;
});
await new Promise((r) => setTimeout(r, 400));
const loginUi = await page.evaluate(() => {
  const sel = document.querySelector('select.hb-country');
  return {
    modal: !!document.querySelector('.hb-modal--login, .hb-logtabs'),
    country: sel ? sel.value : null,
    countryText: sel ? sel.options[sel.selectedIndex]?.text : null,
    sms: /SMS/i.test(document.body.innerText),
  };
});
if (loginBtn && loginUi.modal && loginUi.country === '+90') ok('login-country-tr', loginUi.countryText);
else fail('login-country-tr', JSON.stringify(loginUi));
await shot('v220-login-sms');

// password tab
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('.hb-logtab, button')).find((n) => /PASSWORD|رمز/i.test(n.innerText || ''));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 250));
await page.evaluate(() => {
  const inputs = Array.from(document.querySelectorAll('.hb-modal--login input, .hb-form input'));
  const user = inputs.find((i) => i.type !== 'password');
  const pass = inputs.find((i) => i.type === 'password');
  if (user) { user.focus(); user.value = 'admin'; user.dispatchEvent(new Event('input', { bubbles: true })); }
  if (pass) { pass.focus(); pass.value = 'admin'; pass.dispatchEvent(new Event('input', { bubbles: true })); }
});
// React controlled inputs need native setter
await page.$$eval('.hb-modal--login input, .hb-form input', (els) => {
  const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  const user = els.find((i) => i.type !== 'password');
  const pass = els.find((i) => i.type === 'password');
  if (user) { set.call(user, 'admin'); user.dispatchEvent(new Event('input', { bubbles: true })); }
  if (pass) { set.call(pass, 'admin'); pass.dispatchEvent(new Event('input', { bubbles: true })); }
});
await page.evaluate(() => {
  const form = document.querySelector('.hb-modal--login form, .hb-form');
  if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
});
await new Promise((r) => setTimeout(r, 1800));
const afterLogin = await page.evaluate(() => /LOG OUT|خروج|admin/i.test(document.body.innerText));
if (afterLogin) ok('theme-password-login');
else {
  fail('theme-password-login', 'fallback token');
  await page.evaluate(async () => {
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'admin', password: 'admin' }) });
    const d = await r.json();
    if (d.token) localStorage.setItem('bazino.authToken', d.token);
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1000));
}
await shot('v220-logged');

// Games: pick Minecraft, no station cards on page
await go('http://127.0.0.1:3000/games');
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button.hb-cat')).find((n) => /KIDS/i.test(n.innerText || ''))
    || Array.from(document.querySelectorAll('button')).find((n) => /^KIDS/i.test((n.innerText || '').trim()));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 900));
const cardsOnPage = await page.evaluate(() => ({
  stationCards: document.querySelectorAll('.hb-prices .hb-price, button.hb-price').length,
  book: !!document.querySelector('.hb-book'),
  compact: !!document.querySelector('.hb-book--compact'),
}));
if (cardsOnPage.stationCards === 0 && cardsOnPage.compact) ok('no-station-cards-on-games', JSON.stringify(cardsOnPage));
else fail('no-station-cards-on-games', JSON.stringify(cardsOnPage));

await page.evaluate(() => {
  const row = Array.from(document.querySelectorAll('button.hb-grow, .hb-grow')).find((n) => /Minecraft/i.test(n.innerText || ''));
  if (row) row.click();
});
await new Promise((r) => setTimeout(r, 400));
const picked = await page.evaluate(() => {
  const inp = document.querySelector('.hb-book-input');
  return inp && /Minecraft/i.test(inp.value);
});
if (picked) ok('pick-minecraft'); else fail('pick-minecraft');
await shot('v220-pick-game');

// HOLD MY BAY → modal
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((n) => /HOLD MY BAY/i.test(n.innerText || ''));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 700));
const picker = await page.evaluate(() => ({
  open: !!document.querySelector('.hb-stations, .hb-modal--scroll'),
  count: document.querySelectorAll('.hb-stations .hb-price, .hb-price--pick').length,
  cols: getComputedStyle(document.querySelector('.hb-stations') || document.body).gridTemplateColumns,
}));
if (picker.open && picker.count > 0) ok('station-modal', JSON.stringify(picker));
else fail('station-modal', JSON.stringify(picker));
await shot('v220-station-modal');

await page.evaluate(() => {
  const card = Array.from(document.querySelectorAll('.hb-price--pick, .hb-stations button')).find((n) => !/IN USE/i.test(n.innerText || ''));
  if (card) card.click();
});
await new Promise((r) => setTimeout(r, 400));
const conf = await page.evaluate(() => /Reserve this station|CONFIRM/i.test(document.body.innerText));
if (conf) ok('confirm-dialog'); else fail('confirm-dialog');
await shot('v220-confirm');

await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((n) => /CONFIRM RESERVE/i.test(n.innerText || ''));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 1000));
const checkout = await page.evaluate(() => /Payment method|Pay at the venue|Register with on-site/i.test(document.body.innerText));
if (checkout) ok('reserve-checkout'); else fail('reserve-checkout');
await shot('v220-reserve-checkout');

// close checkout if open
await page.evaluate(() => {
  const x = document.querySelector('[data-checkout] button, button[aria-label="Close"]');
  if (x) x.click();
});
await page.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 400));

// tournament
await go('http://127.0.0.1:3000/events/register');
await page.evaluate(() => {
  const b = document.querySelector('form button.hb-cta, button.hb-reg-submit, form button');
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 1000));
const tour = await page.evaluate(() => /Payment method|Pay at the venue|tournament|on-site/i.test(document.body.innerText));
if (tour) ok('tournament-register'); else fail('tournament-register');
await shot('v220-tournament');

await go('http://127.0.0.1:3000/profile');
const prof = await page.evaluate(() => /My account|Display name|Gamertag|پروفایل|حساب من/i.test(document.body.innerText));
if (prof) ok('profile-page'); else fail('profile-page');
await shot('v220-profile');

const failed = log.filter((x) => !x.ok);
console.log('SUMMARY', { ok: log.filter((x) => x.ok).length, fail: failed.length, failed });
fs.writeFileSync(OUT + '/v220-report.json', JSON.stringify(log, null, 2));
await browser.close();

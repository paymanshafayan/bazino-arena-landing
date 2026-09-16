import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/home/user/bazino-arena-landing/');
const puppeteer = require('puppeteer-core');
const chromium = (await import('@sparticuz/chromium')).default;

const OUT = '/home/user/bazino-arena-landing/hub/previews/live';
const exe = await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath: exe,
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
page.setDefaultTimeout(15000);

async function shot(n) {
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: OUT + '/' + n + '.png', fullPage: true });
  console.log('shot', n);
}

await page.goto('http://127.0.0.1:3000/games', { waitUntil: 'domcontentloaded', timeout: 25000 });
await new Promise((r) => setTimeout(r, 1000));

// open login
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((x) => (x.innerText || '').trim() === 'LOGIN');
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 500));
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((x) => /Password/i.test(x.innerText || ''));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 400));
await shot('login-password-tab');

await page.evaluate(() => {
  const inputs = Array.from(document.querySelectorAll('input'));
  const user = inputs.find((i) => i.type !== 'password' && i.offsetParent);
  const pass = inputs.find((i) => i.type === 'password');
  function fill(el, v) {
    if (!el) return;
    const proto = el.tagName === 'INPUT' ? window.HTMLInputElement.prototype : el;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
  fill(user, 'admin');
  fill(pass, 'admin');
});
await page.evaluate(() => {
  const b = Array.from(document.querySelectorAll('button')).find((x) => /sign in|login|ورود/i.test(x.innerText || '') && x.closest('[class*="modal"], form, [class*="auth"]'));
  if (b) b.click();
  else {
    const all = Array.from(document.querySelectorAll('button'));
    const last = all.reverse().find((x) => /login|sign in/i.test(x.innerText || ''));
    if (last) last.click();
  }
});
await new Promise((r) => setTimeout(r, 1200));
const who = await page.evaluate(() => document.body.innerText.includes('admin') || document.body.innerText.includes('LOG OUT') || document.body.innerText.includes('Logout'));
console.log('loggedInVisible', who);
await shot('after-login');

await page.goto('http://127.0.0.1:3000/games', { waitUntil: 'domcontentloaded', timeout: 25000 });
await new Promise((r) => setTimeout(r, 900));
await page.evaluate(() => {
  const card = Array.from(document.querySelectorAll('button.hb-price')).find((b) => (b.innerText || '').includes('HOLD MY BAY'));
  if (card) card.click();
});
await new Promise((r) => setTimeout(r, 800));
const afterHold = await page.evaluate(() => ({
  text: document.body.innerText.match(/held|desk|checkout|reservation|HOLD MY BAY|Select/i) && document.body.innerText.slice(0, 400),
  hasOk: /Bay held|pay cash/i.test(document.body.innerText),
  modal: !!document.querySelector('input[type="password"]'),
}));
console.log('afterHoldLogged', afterHold);
await shot('reserve-logged');

await page.goto('http://127.0.0.1:3000/events/register', { waitUntil: 'domcontentloaded', timeout: 25000 });
await new Promise((r) => setTimeout(r, 800));
await page.evaluate(() => {
  const inp = document.querySelector('input');
  if (inp) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(inp, 'ArmanK');
    inp.dispatchEvent(new Event('input', { bubbles: true }));
  }
  const b = document.querySelector('button.hb-reg-submit, form button.hb-cta');
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 700));
const reg = await page.evaluate(() => ({
  ok: /Seat held/i.test(document.body.innerText),
  login: /Sign in/i.test(document.body.innerText),
}));
console.log('regLogged', reg);
await shot('register-logged');

await browser.close();
console.log('FLOW_DONE');

# BAZINO HUB — طراحی مرجع Hasti (فاز طراحیت قالب جدید)

این پوشه خانه‌ی کل کارِ «طراحی قالب جدید هاب» بر اساس مرجع **Hasti** است.
مرجع اصلی: فایل PDF راهنمای قالب (مخصوصاً صفحه ۱۳-۱۴ = Tournament Brackets).

> ⚠️ قانون پروژه (قاطع): به پورتال (`bazino-gamenet-portal`) **هرگز هیچ تغییری داده نمی‌شود**.
> آن ریپو فقط clone فقط‌خواندنی برای مرجع است. همه کارها اینجا (ریپو landing) انجام می‌شود.

## ساختار پوشه

```
hub/
├── README.md                 ← همین فایل
├── design-system/            ← ⭐ زبان بصری مشترک همهٔ صفحات Hub (توکن، NeonWire، هدر/فوتر/کارت)
│   └── README.md             ← نحوهٔ فراخوانی NeonWire و بقیهٔ primitives
├── DESIGN-PLAN-brackets.md   ← پلن تشابه ساختاری صفحه براکت
├── bracket-demo/             ← دموی صفحه براکت (React/TSX) — مسیر live: /brackets
│   ├── BracketDemo.tsx
│   ├── bracket-demo.css      ← سیستم طراحی نئونی (پالت استخراج‌شده از پیکسل‌های مرجع)
│   └── covers/               ← کاور بازی‌ها (کیفیت پایین — فقط دمو؛ فایل واقعی را ادمین می‌دهد)
├── reference/                ← مرجع
│   ├── hasti-hub-theme-guide.pdf   ← کپی PDF راهنمای قالب (منبع: ریپو پورتال، برنچ arena/01a07603)
│   ├── brackets-ref-crop.png       ← ماکاپ براکت کراپ‌شده تمیز (این را با خروجی ما مقایسه کنید)
│   └── reference-notes.md          ← پالت اندازه‌گیری‌شده + متریک‌های چیدمان + حکم کاربر
├── analysis/                 ← ابزار اندازه‌گیری/اسکرین‌شات (puppeteer + @sparticuz/chromium)
│   ├── shot.mjs              ← اسکرین‌شات صفحه براکت → hub/previews/
│   ├── shot-covers.mjs       ← اسکرین‌شات کاورها
│   ├── measure.mjs           ← مختصات المان‌ها (getBoundingClientRect) برای تنظیم چیدمان
│   ├── compare.py            ← مقایسه کمّی دو تصویر (پالت نئون، گرید روشنایی، همبستگی ساختار)
│   └── covers.html
└── previews/                 ← خروجی‌های تصویری
    ├── bracket-full.png            ← اسکرین‌شات کامل صفحه (v2)
    ├── bracket-page.png            ← viewport
    ├── game-covers.png             ← کاورها
    └── compare-side-by-side.png    ← مرجع بالا / ما پایین
```

## قالب کامل Hub (دمو)

مسیر زنده: **`/hub`** — پوستهٔ Hasti + تصمیم‌های ۱۶گانه.

| مسیر | صفحه |
|---|---|
| `/hub` | هوم هاب: اسلایدر + کاشی ماژول‌ها |
| `/hub/games` | KIDS / ADULTS / REQUESTS + رزرو تو در تو |
| `/hub/events` | ۵ بخش: Weekly / Special / Season / Brackets / Register |
| `/hub/events/weekly` | کارت‌های افقی هفتگی |
| `/hub/events/special` | رویداد ویژه (اطلاعات) |
| `/hub/events/season` | ۴ فصل، امتیاز ۵/۲/۱ و ۱۰/۴/۲ |
| `/hub/events/brackets` | براکت ۳۲ نفره |
| `/hub/events/register` | ثبت‌نام تورنمنت + PayTR دمو |
| `/hub/shop` `/hub/food` | Coming Soon (صف ادمین در یادداشت) |
| `/hub/club` `/hub/blog` `/hub/chat` | قابلیت پورتال در ناو |
| `/hub/profile` | ۹ تب پورتال |
| `/hub/contact` | OSM embed |
| فوتر ساعت | پاپ‌آپ روزبه‌روز |
| ورود | OTP دمو (`123456`) + تب رمز |

بدون Gallery / Prices / About. زبان EN/TR/FA/RU.

## اجرا

```bash
npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund
npm install --legacy-peer-deps --ignore-scripts --no-audit --no-fund --no-save puppeteer-core @sparticuz/chromium
npm run dev            # vite روی پورت 3000 → http://localhost:3000/brackets
```

اسکرین‌شات headless (کرومیوم داخل npm، بدون دانلود خارجی):

```bash
node -e "const z=require('zlib'),f=require('fs'),c=require('child_process');f.mkdirSync('/tmp/crlib',{recursive:true});f.writeFileSync('/tmp/crlib/a.tar',z.brotliDecompressSync(f.readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')));c.execSync('tar -xf /tmp/crlib/a.tar -C /tmp/crlib')"
LD_LIBRARY_PATH=/tmp/crlib/lib node hub/analysis/shot.mjs
python3 hub/analysis/compare.py hub/reference/brackets-ref-crop.png hub/previews/bracket-full.png
```

فونت‌ها باندل محلی: `@fontsource/orbitron` + `@fontsource/rajdhani` (در package.json).

## وضعیت (2026-09-07)

- دموی قالب کامل Hub روی `/hub` مطابق PDF + تصمیم‌های ۱۶گانه ساخته شد (`hub/theme/`).
- براکت زنده روی `/brackets` و `/hub/events/brackets`.
- تبدیل به قالب نصبی پورتال و اتصال به `layoutMode: 'hub'` کار بعدی سمت پورتال است.

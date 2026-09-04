# اعتبارسنجی زنده‌ی قالب bazino-arena نسخه ۳.۱.۰ — ۲۰۲۶-۰۹-۰۳

آزمایش روی **سرور واقعی پورتال** (برنچ `arena/01a067ac-bazino-gamenet-portal`، کامیت `d296242` — SDK v2)
با **Chromium واقعی 149** طبق دستورالعمل `HANDOFF_PROMPT.md` (فونت وزیرمتن نصب، CDNهای خارجی بلاک).

## محیط

| بخش | جزئیات |
|---|---|
| سرور | `npx tsx server.ts` روی `0.0.0.0:3000` (Express + SQLite + Vite dev) |
| نصب قالب | از طریق API واقعی `POST /api/admin/themes/install` → `success: true`، `activeThemeId: bazino-arena`، بدون finding عملکردی |
| اسلایدها | ۴ اسلاید ادمین (۲ نمونه + ۲ ساختگی چهارزبانه با عکس `/uploads/...`) |
| مرورگر | Chromium 149 headless + Playwright، فونت Vazirmatn، بلاک CDN، `locale: fa-IR` |
| زبانها | fa / ru / en / tr با `localStorage.cyber_lang`، هر کدام در کانتکست تازه |

## نتیجه: ۴۰ چک مرورگری — همه پاس

### عملیات نصب و فعال‌سازی
- نصب از پنل/API بدون خطا؛ قالب خودکار فعال شد؛ `regions=[home]`، `strings=4`، `tokens=12`.

### هر ۴ زبان (fa/ru/en/tr)
- `body[data-theme]=bazino-arena` و `SDK.hasComponent('home')` ✅
- عنصر `<video>` حاضر؛ `poster=/api/themes/bazino-arena/assets/hero-poster.webp` ✅
- **هیچ لایه‌ی تصویری اسلاید ادمین رندر نشد** (`bazino-slide-media=0`؛ هیچ `/uploads/` در DOM درخواست نشد) — تصویر اسلاید جای ویدئو را نگرفت ✅
- عنوان هرو از `props.slides` به زبان فعال: fa «رزرو سیستم‌های گیمینگ فوق پیشرفته» · ru «Забронировать мощные игровые ПК» · en · tr ✅
- عنوان با باکس رندر واقعی (fa: ۵۸۸×۴۵۲px چندخطی) ✅
- `dir` درست (fa=rtl، بقیه ltr)؛ بدون سرریز افاری (`scrollWidth = innerWidth`) ✅
- استک فونت تیتر: `Orbitron, Vazirmatn, sans-serif` ✅
- ۴ دات اسلایدر؛ رنگ CTA `rgb(255,196,0)` = `--primary-color` ✅
- **ویدئو واقعاً پینت می‌شود**: نمونه‌گیری پیکسلی canvas از فریم (std≈43، روشنایی ۶۴٪) — نه صفحه‌ی خالی ✅
- metadata ویدئو ۱۲۸۰×۷۲۰ (readyState=4) ✅
- **کنسول مرورگر بدون خطا** در هر ۴ زبان ✅

### فقط فارسی
- چرخش متن اسلایدها با rAF: دات فعال ۰ → ۱ پس از ~۹.۵ ثانیه ✅
- `src` ویدئو فقط بعد از لود صفحه مسلح شد (deferred) ✅
- ویدئو تا انتها پخش شد (`currentTime=10.01s` = طول کامل ویدئو) ✅

## اسکرین‌شات‌ها (WebP)

`fa-hero` · `fa-scroll1..5` (کل صفحه‌ی فارسی) · `fa-full` · `en-hero` · `ru-hero` · `tr-hero`

## یادداشت صادقانه — یک مشاهده‌ی تک‌باره

در **اولین لود سرد** سرور dev (وقتی Vite هنوز ماژول‌ها را بهینه می‌کرد)، یک بار خطای
`Hook can only be invoked from render methods` (Preact debug) رخ داد و صفحه به ErrorBoundary افتاد.
در هیچ اجرای بعدی (پروف، ۴ زبان × ۲ اجرا) تکرار **نشد** و ریشه‌اش به همه‌ی ماژول‌های سبک Vite
برمی‌گردد نه theme.js. توصیه: بعد از build پروداکشن یک نگاه کنسولی بیندازید؛ اگر تکرار شد،
احتمالاً نرخ‌بازی زمانی در `ThemeRegion`/رجیستری SDK پورتال است و باید در ریپوی پورتال پیگیری شود.

## بازتولید

```bash
# سرور (پوشه‌ی کلون پورتال، برنچ arena/01a067ac-bazino-gamenet-portal)
npm install --ignore-scripts && (cd node_modules/better-sqlite3 && npx node-gyp rebuild --release --nodedir=/usr/local)
npx tsx server.ts
TOKEN=$(curl -s -X POST localhost:3000/api/auth/login -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin"}' | jq -r .token)
curl -X POST "localhost:3000/api/admin/themes/install?name=Bazino%20Arena&replace=1" \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/zip' --data-binary @bazino-arena-theme.zip

# مرورگر (طبق HANDOFF_PROMPT.md بخش ۳) سپس:
BASE=http://127.0.0.1:3000 node theme-check.mjs && BASE=http://127.0.0.1:3000 node visual-pixels.mjs
```

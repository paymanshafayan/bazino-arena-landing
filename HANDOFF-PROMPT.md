# HANDOFF-PROMPT — قالب Bazino Arena of Legends

> سند تحویل ایجنت بعدی. تاریخ: 2026-09-04 · برنچ: `arena/01a06b23-bazino-arena-landing` · HEAD: `9321a78` · نسخه: **4.5.4** · خروجی: `bazino-arena-theme.zip` (10 فایل، ~2.9MB، بدون entry پوشه‌ای) · شاخه مبدا: `main` @ `3f43e4c` (Merge #2)

---

## ۰) وضعیت فعلی در یک نگاه

- **محصول:** قالب نصبی پورتال (`theme.json` + `theme.css` + `theme.js` + `assets/`) با شناسه `bazino-arena`، ۴ زبان (fa/en/ru/tr، ۹۷ کلید هم‌ارز)، `regions = ["home","header"]`، `sdkVersion: 2`.
- **ZIP نهایی:** `bazino-arena-theme.zip` در ریشه‌ی ریپو — همین را نصب کنید. نصب: پنل ادمین پورتال → قالب‌ها → آپلود (replace) → فعال‌سازی → هارد رفرش (Ctrl+F5).
- **وضعیت برنچ:** `arena/01a06b23-bazino-arena-landing` سه کامیت جلوتر از `main` است (4.5.2 → 4.5.3 → 4.5.4) و پوش شده. `main` هنوز روی `3f43e4c` (4.3.0 سابق) است.
- **تصمیم کاربر (2026-09-04):** «هدر شفاف شد اما بقیه موارد مثل قبل هست. دیگه نمیخواد تغییری در قالب انجام بدی.» — از این نقطه template-side بسته است؛ فقط مستندسازی و کامنت/پوش باقی بود (همین سند).
- **قابلیت بازتولید:** `./build-theme-zip.sh` (terser ES5 mangle + sanity regions + `zip -D` بدون پوشه).

---

## ۱) مراحل طی‌شده (کرونولوژیک کامل)

| نسخه | کامیت | چه شد |
|---|---|---|
| 3.0 | `5a85d3f` | مهاجرت به Theme SDK v2 (`registerComponent('home')`) |
| 3.1 | `1507b21`+`b34c7fc` | تصاویر اسلاید ادمین هرگز ویدئوی هرو را جایگزین نمی‌کند + اعتبارسنجی بصری زنده ۴۰/۴۰ |
| 3.2 | `372c015` | تصاویر ریسپانسیو: `imgVariants` + `mediaImg` با onError؛ پوستر موبایل 640×360 |
| 3.3 | `87513c3` | رزرو ارتفاع اسلاید هرو (حذف CLS تیترها) |
| 3.4 | `cca45e0` | پوستر LCP = `<img>` واقعی با `fetchpriority=high` |
| 3.5 | `dbd4da2` | minify terser ES5 داخل زیپ (30.6→15.6KB) + `build-theme-zip.sh` + ممیزی ۱۹ دکمه |
| 4.0 | `198088e` | **بازطراحی مرجع (۶ خواسته):** فریز ویدئو روی فریم آخر، حذف اورلی، حذف دکمه‌های اسلایدر (کلیک هرو=بازپخش)، بخش ۷ لوکیشن، گلو نئونی `--pointer-x/y` + ریویل IntersectionObserver |
| 4.1 | `d5e0fb3` | هدر fallback پورتال + **فونت وزیر** باندل محلی (۳ وزن woff2، صفر درخواست خارجی) + فوتر مرجع (بعدا حذف) |
| 4.2 | `1eb47b9` | **OSM** به‌جای Google Maps (تحریم-safe، `club_map_lat/lng` = 35.2628,33.9084) + **حذف کامل فوتر** (الزام درگاه) |
| 4.2.1 | `44ce271` | رفع `EEXIST` نصب: زیپ بدون entry پوشه‌ای (`zip -D`)، فونت‌ها تخت در `assets/` |
| 4.3 | `c3f55bb` | ثبت کامپوننت **region «header»** (۸ تب `ts('nav.*')`، شفاف→شیشه‌ای بعد اسکرول، `is-scrolled` glass) |
| 4.4.0 | *(بینابین)* | لایه parity مرجع ۴.۴ (mona hero, arena, tournaments, results, lounge, passes, visit) — `theme.css` ۱۲۹۸ خط |
| 4.4.1-4.4.9 | *(بینابین)* | سری فیکس‌های هدر: sticky/fixed/absolute/پرنت مشترک/ `is-scrolled` شیشه‌ای — همگی در 4.5.0 بازنویسی شدند |
| **4.5.0** | *(روی 01a06b23)* | **هدر سالید آرنا (parity با پورتال a403c2d):** `site-header` و `bazino-header` هر دو `solid sticky rgba(9,14,28,0.96) + blur14px`، ارتفاع 70px، خط طلایی `::after opacity .24`، منوی زبان (flag SVG)، آواتار hash-hue + نام کاربری کلیک‌پذیر → `/loyalty`، خروج `fetch('/api/auth/logout')`، `regions home,header` |
| **4.5.1** | `da15d4f` | فیکس ۳ رگرسیون بعد 4.5.0 (گزارش: منوی زبان باز نمی‌شد، یوزرنیم → `/loyalty` نه `/profile`، خروج با reload حلقه): parity با `App.tsx:884-927` پورتال: `FlagIR/GB/RU/TR` SVG (clipPath یکتا)، `LanguageMenu` با `ul[role=listbox] > li[role=option]`، `mousedown+Escape` containment، `href="/profile"` + `navigateStandalone`, `InitialAvatar` hash, `logout` بدون `reload` (`history.pushState`). CSS: `bazino-lang-btn` gap6 rounded-full, `dropdown` rounded12, `opt.is-active bg gold` |
| **4.5.2** | `d917620` | فیکس باقی‌مانده هدر (گزارش: منو همچنان بسته، رفرش دوباره لاگین): ریشه `FlagGB React.useId` بدون import → `React is not defined` + `handleLogout` فقط localStorage + تکراری `clipPath id="lm-gb"` + `click` بدون `mousedown`. فیکس: `import {useId}` + `clipId unique`, `handleLogout → fetch POST /api/auth/logout credentials:include + localStorage+sessionStorage clear + dispatchEvent + pushState` بدون reload، دکمه زبان `mousedown stopPropagation + click + pointer-events-none` روی Chevron، IIFE `site-header` اگر `[data-testid="language-menu"]` داخل header باشد skip تا double-enhance نشود، `flagEl` یکتا با uid |
| **4.5.3** | `a0189cc` | **برگرداندن `bazino-header` به شفاف per user demand:** کاربر: «نصب کردم بازم تغییری نکرده — لااقل این کلاس را به همین شکل تغییر بده» + اسنیپت `background:transparent; position:absolute`. اعمال: `theme.css §4b .theme-bazino-arena .bazino-header` دقیقا به اسنیپت (12 ویژگی، بدون `!important`) برگشت؛ `is-scrolled` همچنان solid؛ `site-header` (پورتال chrome) عمدا solid ماند — فقط ThemeRegion header شفاف شد |
| **4.5.4** | `9321a78` | **بازنویسی verbatim + مستندسازی نهایی:** درخواست تکراری همان اسنیپت؛ فایل CSS دوباره byte-identical بازنویسی (cache-bust)، کامنت‌های `§4` و `§4b` به‌روز شد (توضیح تاریخچه solid→transparent + نکته دو-هدر)، `theme.json` 4.5.3→4.5.4، زیپ بازسازی و پوش؛ این سند (HANDOFF) کامل شد |

> اسناد تحلیلی همراه: `pagespeed-findings-fa.md` (۶ بخش PSI)، `portal-prompts-fa.md` (۶ پرامپت پورتال)، `theme-guide-findings.md`, `landing-*.md`.

### قوانین ثابت پروژه (هرگز نشکند)

- ES5 خالص در `theme.js`؛ بدون `eval`/`new Function`/`setInterval` (تایمر = rAF مشترک).
- صفر درخواست خارجی (فونت/تصویر همه داخل `assets/`؛ تنها استثنا: iframe `openstreetmap.org` و لینک خروجی OSM).
- لوگو فقط از `props.logoUrl`; هیچ آدرس/تلفن/مختصات/نام هاردکد نشود (منبع: `props.settings` + `theme.json.strings` via `ts()`).
- فوتر و صفحات `/legal/*`, `/contact`, `/payment/*` و نوار قانونی و مودال پرداخت **خارج از محدوده قالب** — دست نزنید.
- ۴ زبان هم‌ارز؛ `props.dir` روی ریشه؛ ارقام فارسی با `num()`.
- `prefers-reduced-motion`، حالت بدون-JS/SSR (کلاس `bazino-rvl` فقط با JS)، قرارداد عملکرد (پوستر اول، ویدئو بعد load+idle).
- **Header دوگانه (درس 4.5.3):** `site-header` = کروم پورتال (همیشه solid sticky) و `bazino-header` = ThemeRegion header (per spec پورتال) — شفافیت فقط روی دومی اعمال شد تا هم parity پورتال و هم سلیقه کاربر (شفاف روی هیرو) هم‌زمان رعایت شود. هر تغییری باید مشخص کند کدام هدر را هدف می‌گیرد.

---

## ۲) مشکلات باقی‌مانده — چه انجام شد، چه نماند

### الف) سمت پورتال (به ایجنت پورتال گزارش شود — در template کاری نماند)

1. **رفع ریشه‌ای EEXIST:** پارسر ZIP در `src/themes/themeZipCore.ts` entryهای پوشه‌ای را مثل فایل می‌شمارد → هر قالبی با زیرپوشه می‌شکند. فیکس یک‌خطی: `if (raw.endsWith('/')) continue;` (قالب طرف را با `zip -D` دور زد، ولی پورتال باید درست شود).
2. **منوی زبان/ورود هنگام تعویض هدر:** فقط داخل fallback هدر هستند (`App.tsx ~888`). وقتی region `header` فعال شود حذف می‌شوند — باید بیرون region mount شوند یا `onLogin` پراپ داده شود. (در 4.5.1/4.5.2 قالب parity را پیاده کرد ولی اگر پورتال header region را mount کند، کروم پورتال ناپدید می‌شود — نیاز به تصمیم پورتال: آیا header region باید زبان/ورود را هم از props بگیرد؟)
3. **پرامپت‌های ۱-۶ PSI در `portal-prompts-fa.md`:** کش TTL + لوگو/واریانت‌ها + CLS هدر/فونت + preload پوستر آگاه از قالب + حذف kinesis + robots.txt/هدرهای امنیتی — همه سمت پورتال.
4. **داده سمپل ناسازگار:** `club_map_lat/lng` = قبرس شمالی (درست) ولی `club_address` سمپل هنوز تهران — به‌روزرسانی شود.
5. **تصمیم باز 4.5.3:** کاربر شفافیت را برای `bazino-header` خواست؛ اگر پورتال بخواهد parity کامل solid را حفظ کند، باید spec کند کدام هدر شفاف/سالید بماند — فعلا compromise دوگانه (site solid / bazino transparent) پیاده شده و کاربر تایید کرد «هدر شفاف شد».

### ب) سمت قالب — بسته شد (به دستور کاربر)

- **درخواست 2026-09-04:** «دیگه نمیخواد تغییری در قالب انجام بدی.» — بنابراین هیچ تسک باز template-side نماند. آخرین وضعیت:
  - هدر: `bazino-header` شفاف absolute per snippet (تایید کاربر)، `site-header` solid sticky (parity).
  - زبان: flags SVG یکتا + `mousedown/click/Escape` containment (4.5.1/4.5.2) — JSDOM تست محلی پاس شد (۴ گزینه، انتخاب FA، بستن outside/Escape، logout ماندگار).
  - پروفایل: `href="/profile"` + `navigateStandalone` / `history.pushState` (دیگر `/loyalty` نیست).
  - خروج: `fetch POST /api/auth/logout credentials:include` + پاکسازی `localStorage bazino_token/bazino_mock_user` + `sessionStorage` + بدون reload → رفرش دوباره لاگین نمی‌کند.
  - ES5 per-file، متغیرها scoped (`var`/`function`، بدون `=>`/`const`/`?.`).
- **تست بصری واقعی نماند:** کاربر گفت «تست‌ها واقعی نیست» و JSDOM را رد کرد — بازبینی پیکسلی Playwright روی پورتال واقعی انجام نشد (TLS/Puppeteer در سندباکس قطع بود، jsdom جایگزین شد). اگر نیاز به proof بصری بود، روی پورتال دپلوی‌شده با Chromium واقعی (نه jsdom) اسکرین‌شات بگیرید و با مرجع `client/src/index.css` مقایسه کنید (پالت: `#ffc400` / `#35a9ff` / `#06080e`).
- **کارهای عمدا انجام‌نشده (تصمیم محصول):** فشرده‌سازی بیشتر ویدئوی ۲.۷MB (سقف 3MB)، preload پوستر در `<head>` (سمت پورتال)، و full-bleed والد `max-w-7xl` (نیاز به تغییر `App.tsx` پورتال).

### ج) چک‌لیست تحویل برای ایجنت بعدی

- [x] CSS/JS کامنت‌گذاری شد (§4 / §4b توضیح solid→transparent).
- [x] `theme.json` 4.5.4، `CHANGELOG.md` 4.5.3/4.5.4، `HANDOFF-PROMPT.md` به‌روز.
- [x] `build-theme-zip.sh` اجرا و `bazino-arena-theme.zip v4.5.4` پوش شد (`9321a78`).
- [ ] اگر پورتال header spec را تغییر داد → §4/§4b را طبق spec جدید و با ذکر تاریخچه به‌روز کنید.
- [ ] برای هر تغییر آینده: `build-theme-zip.sh` + `npm run audit:theme` در کلون پورتال (`canInstall: true`) + رندر SSR با فایل minified داخل زیپ.

---

## ۳) راه‌اندازی سرور زنده روی سندباکس (تست قالب)

> پورتال ریپوی جداست: `paymanshafayan/bazino-gamenet-portal`. قالب خودش سرور ندارد — برای تست، پورتال را بالا بیاورید و ZIP را نصب کنید.

```bash
# ۱) کلون و نصب deps (بدون اسکریپت‌ها — node-gyp فقط برای سرور لازم است)
cd /home/user
git clone https://github.com/paymanshafayan/bazino-gamenet-portal.git portal
cd portal && npm install --ignore-scripts --no-audit --no-fund

# ۲) (فقط اگر سرور ماژول بومی خواست) بازسازی node-gyp:
npx node-gyp rebuild --release --nodedir=/usr/local

# ۳) اجرای سرور در پس‌زمینه (پورت 3000، باید 0.0.0.0 بایند شود برای preview)
npx tsx server.ts
```

- **پیش‌نمایش:** سندباکس پورت 3000 را روی `https://3000-{sandboxId}.e2b.app` پروکسی می‌کند — سرور باید روی `0.0.0.0` گوش دهد.
- **ورود ادمین:** `admin` / `admin` (توکن در `/tmp/admin-token`).
- **نصب ZIP از API:**
  ```bash
  curl -X POST "http://localhost:3000/api/admin/themes/install?name=bazino-arena&replace=1" \
       -H "Authorization: Bearer $(cat /tmp/admin-token)" \
       -H "Content-Type: application/zip" \
       --data-binary @/home/user/bazino-arena-landing/bazino-arena-theme.zip
  ```
  سپس از پنل ادمین **فعال** کنید و هارد رفرش (Ctrl+F5).
- **ممیزی سریع بدون سرور:** در کلون پورتال `npm run audit:theme -- <zip>` → باید `canInstall: true` (تنها هشدار مجاز: `openstreetmap.org`).
- **تست SSR:** `window.BazinoThemeSDK.registerComponent` را کپچر کنید، `new Function(themeJs)`، بعد `renderToString(def.render(props))` با props نمونه (settings + slides + ts از `theme.json.strings`). حتما **فایل minified داخل زیپ** را تست کنید.

### بیلد مجدد زیپ

```bash
cd /home/user/bazino-arena-landing && ./build-theme-zip.sh
# خروجی: bazino-arena-theme.zip (ES5 minify + sanity home,header + zip -D)
```

---

## ۴) فایل‌های مرجع پورتال برای راهنمایی — به کدام اسناد مراجعه کنید

مخزن مرجع: **`paymanshafayan/bazino-gamenet-portal`** — شاخه به‌روز قرارداد: `arena/01a067ac-bazino-gamenet-portal` (اگر مرج نشده، `main` قدیمی‌تر است — اول آن شاخه را بخوانید).

| فایل | چرا بخوانید |
|---|---|
| **`src/themes/README.md`** | ⭐ **قرارداد رسمی قالب** — اول از همه: ساختار ZIP، توکن‌های CSS، قوانین، فهرست regionها، نمونه `registerComponent` |
| `src/themeSdk/sdk.ts` | Theme SDK: `registerComponent(name, factory|def)`، `THEME_REGIONS` (home, header, hero, home.genres/lounges/results/tournaments/pricing/staff/location, footer, mobileNav)، `makeThemeStrings`, `mountComponent` |
| `src/themeSdk/ThemeRegion.tsx` | نحوه mount هر region + props پایه (`language/dir/ts/slides/user/settings/logoUrl/assetsBase`) — بفهمید `header` چه props می‌گیرد |
| `src/themeSdk/LocationFrame.tsx` | فریم لوکیشن: `SDK.LocationFrame` (card/map/inline) و `SDK.locationFrom(settings)` → `{lat,lng,embedUrl(OSM),directionsUrl,address,phone}` از `club_map_lat/lng/url` |
| `src/themes/themeZipCore.ts` | پارسر/ساز ZIP (⚠️ باگ entry پوشه‌ای — §2-الف-1) + `rewriteCssAssetUrls` (برای کش نسخه‌دار) |
| `server/themePerformance.ts` | سیاست عملکرد: حذف فونت گوگل، `font-display`, هشدار origin خارجی |
| `server/sampleData.ts` | تنظیمات سمپل (`club_map_url/lat/lng` قبرس شمالی، آدرس/تلفن) — برای تست لوکیشن |
| `src/App.tsx` (~880-930) | هدر واقعی پورتال: `LanguageMenu` (flag SVGها، `ul[role=listbox]`، `mousedown+Escape`)، `ThemeRegion name="header"`، ناوبری ۸ تب، `navigateStandalone('/profile')` |
| `src/utils/routes.ts` | `navigateStandalone`, `ProfilePage` (`/profile`) vs `Loyalty` (`/loyalty`) — برای اینکه دوباره `/loyalty` برنگردید |
| `src/themeSdk/useThemeScript.ts` | چگونه `?v=<installedAt>` به `theme.js` می‌چسبد (برای پرامپت کش) |
| `server.ts` | مسیرهای `/api/themes/:id/theme.js` و `/assets/*` و `Cache-Control` + سرو `index.html` با head تزریقی (برای preload LCP) |
| `index.html` | preload ثابت `esports-*` که باید داینامیک شود (پرامپت ۵) |
| `portal-prompts-fa.md` (همین ریپو) | ۶ پرامپت آماده برای ایجنت پورتال (کش، تصویر، CLS, LCP, kinesis, robots) — کپی-پیست به پورتال |

### خلاصه پرامپت نویسندگی قالب (نسخه صحیح‌شده)

خروجی = پوشه `theme.json/css/js(+assets)`؛ هیچ داده هاردکد نه؛ لوگو فقط `props.logoUrl`؛ رنگ فقط با توکن‌ها در `body[data-theme='<id>']`؛ ۴ زبان + `props.dir`; صفحات قانونی/پرداخت دست‌نخورده؛ `render(props)` ترجیحا React element؛ header region با `registerComponent('header')` (لوگو+ناوبری+وضعیت کاربر؛ زبان/ورود کار سیستم)؛ لوکیشن فقط از `SDK.LocationFrame`/`locationFrom`.
**اصلاحیه‌های اعتباری که باید در پرامپت لحاظ شود:** (۱) ZIP بدون entry پوشه (`zip -D`) تا باگ پارسر نخورد، (۲) نقشه = OSM نه گوگل (تحریم)، (۳) فوتر خارج از قالب (درگاه)، (۴) نمونه‌کد گارد `if (!SDK || !SDK.registerComponent) return;` داشته باشد، (۵) تفکیک `site-header` vs `bazino-header` (دو هدر) و اینکه شفافیت کدام‌یک per design باشد.

---

## ۵) نقشه فایل‌های این ریپو

| مسیر | توضیح |
|---|---|
| `bazino-arena-theme.zip` | خروجی نهایی **v4.5.4** — همین را نصب کنید |
| `theme-package/` | سورس خوانا (theme.js غیرمینیفای؛ مینیفای فقط داخل زیپ) + `assets/` (ویدئو، پوسترها، وزیرمتن) + `CHANGELOG.md` |
| `build-theme-zip.sh` | بیلد تکرارپذیر زیپ |
| `client/` | سورس لندینگ مرجع (Arena of Legends): `src/pages/Home.tsx`, `src/index.css` |
| `HANDOFF-PROMPT.md` | همین سند |
| `pagespeed-findings-fa.md` | ۶ بخش تحلیل PSI |
| `portal-prompts-fa.md` | ۶ پرامپت پورتال |
| `theme-guide-findings.md` | قرارداد Theme Engine |
| `todo.md` | بک‌لاگ قدیمی (تا 4.3.0) — برای تاریخچه |

---

## ۶) یادداشت پایانی ایجنت

- این برنچ عمدا روی `3f43e4c` (پس از مرج #2) ساخته شد تا تاریخچه `main` تمیز بماند. برای مرج، PR جدید از `arena/01a06b23-bazino-arena-landing` به `main` بسازید (یا cherry-pick 4.5.x).
- کاربر JSDOM را «غیرواقعی» خواند و Playwright در سندباکس به‌دلیل TLS قطع بود — proof نهایی باید روی پورتال واقعی با Chromium (نه jsdom) گرفته شود اگر تیم QA بخواهد.
- هر تغییر هدر آینده باید کامنت `§4/§4b` را با تاریخ و دلیل (parity vs سلیقه کاربر) به‌روز کند تا دوباره solid↔transparent نوسان نکند.

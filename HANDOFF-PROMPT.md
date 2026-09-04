# HANDOFF-PROMPT — قالب Bazino Arena of Legends

> سند تحویل ایجنت بعدی. تاریخ: 2026-09-04 · برنچ: `arena/01a06697-bazino-arena-landing` · HEAD: `c3f55bb` · PR: [#2](https://github.com/paymanshafayan/bazino-arena-landing/pull/2) · خروجی: `bazino-arena-theme.zip` نسخه **4.3.0**

---

## ۰) وضعیت فعلی در یک نگاه

- **محصول:** قالب نصبی پورتال (`theme.json` + `theme.css` + `theme.js` + `assets/`) با شناسه `bazino-arena`، ۴ زبان (fa/en/ru/tr، ۹۷ کلید هم‌ارو)، regions = `["home","header"]`.
- **ZIP نهایی:** `bazino-arena-theme.zip` در ریشه‌ی ریپو (۱۰ فایل، ~۳MB، بدون entry پوشه‌ای). نصب: پنل ادمین پورتال → قالب‌ها → آپلود (replace) → فعال‌سازی → هارد رفرش.
- **PR باز:** #2 به `main` — همه‌ی کار جلسه (۱۷ کامیت، 3.0 → 4.3.0).
- **همه‌چیز بازتولیدپذیر:** `./build-theme-zip.sh` (minify ترسِر ES5 + sanity + زیپ).

---

## ۱) مراحل طی‌شده (کرونولوژیک)

| نسخه | کامیت | چه شد |
|---|---|---|
| 3.0 | `5a85d3f` | مهاجرت به Theme SDK v2 (registerComponent('home')) |
| 3.1 | `1507b21`+`b34c7fc` | تصاویر اسلاید ادمین هرگز ویدئوی هرو را جایگزین نمی‌کند + اعتبارسنجی بصری زنده ۴۰/۴۰ |
| 3.2 | `372c015` | تصاویر ریسپانسیو: `imgVariants(url)` + `mediaImg()` با onError خودترمیم؛ پوستر موبایل 640×360 |
| 3.3 | `87513c3` | رزرو ارتفاع اسلاید هرو (حذف CLS تیترها) |
| 3.4 | `cca45e0` | پوستر LCP = `<img>` واقعی با `fetchpriority=high` (کشف‌پذیری LCP) |
| 3.5 | `dbd4da2` | minify ترسِر ES5 داخل زیپ (30.6→15.6KB) + `build-theme-zip.sh` + ممیزی دسترس‌پذیری ۱۹ دکمه |
| 4.0 | `198088e` | **بازطراحی مرجع (۶ خواسته):** فریز ویدئو روی فریم آخر، حذف اورلی هرو، حذف دکمه‌های اسلایدر (کلیک هرو = بازپخش)، بخش ۷ لوکیشن، گلو نئونی دنبال نشانگر (`--pointer-x/y`) + ریویل اسکرول IntersectionObserver (صفر CLS، reduced-motion و بدون-JS ایمن) |
| 4.1 | `d5e0fb3` | هدرِ fallback پورتال با CSS مرجع + **فونت وزیر** باندل محلی (۳ وزن woff2، صفر درخواست خارجی) + فوتر مرجع (بعدها حذف شد) |
| 4.2 | `1eb47b9` | **OpenStreetMap** به‌جای Google Maps (تصمیم تحریم‌سafe؛ مختصات فقط از `club_map_lat/lng` پورتال — پین قبرس شمالی 35.2628,33.9084) + **حذف کامل فوتر** (الزام قانونی درگاه پرداخت) |
| 4.2.1 | `44ce271` | رفع `EEXIST` نصب: زیپ بدون entry پوشه‌ای (`zip -D`)، فونت‌ها تخت در `assets/` |
| 4.3 | `c3f55bb` | ثبت کامپوننت **region «header»** طبق قرارداد جدید پورتال (۸ تب `ts('nav.*')`، آندرلاین طلایی، شفاف→شیشه‌ای+خط طلایی بعد از اسکرول، Vazirmatn برای فارسی، چیپ کاربر، CTA رزرو) |

اسناد تحلیلی همراه در همین ریپو: `pagespeed-findings-fa.md` (۶ بخش PSI) و `portal-prompts-fa.md` (۶ پرامپت سمت پورتال).

### قوانین ثابت پروژه (هرگز نشکند)
- ES5 خالص در theme.js؛ بدون `eval`/`new Function`/`setInterval` (تایمر = rAF مشترک).
- صفر درخواست خارجی برای منابع (فونت/تصویر همه داخل `assets/`؛ تنها استثنا: iframe نقشه‌ی OSM و لینک خروجی OSM).
- لوگو فقط از `props.logoUrl`؛ هیچ آدرس/تلفن/مختصات/نام هاردکد نشود (منبع: `props.settings` + `theme.json.strings` از طریق `ts()`).
- فوتر و صفحات `/legal/*`, `/contact`, `/payment/*` و نوار قانونی و مودال پرداخت **خارج از محدوده‌ی قالب‌اند** — دست نزنید.
- ۴ زبان هم‌ارو؛ `props.dir` روی ریشه‌ی هر بخش؛ ارقام فارسی با `num()`.
- `prefers-reduced-motion`، حالت بدون-JS/SSR (کلاس `bazino-rvl` فقط با JS)، و قرارداد عملکرد (پوستر اول، ویدئو بعد از load+idle).

---

## ۲) مشکلات باقی‌مانده

### الف) سمت پورتال (به ایجنت پورتال گزارش شود)
1. **رفع ریشه‌ای EEXIST (مهم):** پارسر ZIP در `src/themes/themeZipCore.ts` entryهای پوشه‌ای را مثل فایل می‌شمارد → هر قالبی با زیرپوشه در نصب می‌شکند. اصلاح یک‌خطی در حلقه‌ی `parseThemeZip`: `if (raw.endsWith('/')) continue;`
2. **منوی زبان/ورود هنگام تعویض هدر:** `LanguageMenu` و دکمه‌ی ورود فقط داخل fallback هدر هستند (`App.tsx` ~خط 888). وقتی region «header» قالب فعال شود این دو از صفحه حذف می‌شوند — باید بیرون از region mount شوند یا پراپ `onLogin` داده شود.
3. **پرامپت‌های ۱-۶ PSI** در `portal-prompts-fa.md`: کش TTL، لوگو/واریانت‌ها، CLS هدر/فونت، preload پوستر آگاه از قالب فعال، حذف درخواست kinesis (از لایه‌ی زیرساخت تزریق می‌شود؛ در ریپو نیست) + داینامیک‌کردن preload ایستای esports، robots.txt/باندل/هدرهای امنیتی.
4. **داده‌های سمپل ناسازگار:** در شاخه‌ی جدید پورتال مختصات/لینک نقشه = قبرس شمالی (درست) ولی `club_address` سمپل هنوز تهران است — به‌روزرسانی شود.

### ب) سمت قالب (باز/تست‌نشده)
1. **بازبینی بصری نهایی انجام نشد:** بینایی تصویری در جلسه خاموش بود و پیوست‌های کاربر هرگز به فایل‌سیستم سندباکس نرسید (بارها چک شد). منطقِ افکت‌ها با کد مرجع (`client/src`) + تست‌های SSR اعتبارسنجی شده، ولی تطابق پیکسلی رنگ/فاصله/فونت با اسکرین‌شات مرجع تأیید نشده. **اگر بینایی دارید:** دو اسکرین‌شات (قالب نصب‌شده vs مرجع) را از طریق گیت‌هاب در ریپو بگذارید و با تحلیل پیکسلی (PIL) مقایسه کنید — پالت مرجع: طلایی `#ffc400`، آبی `#35a9ff`، مرکب `#06080e`.
2. **اندازه‌گیری مجدد PSI بعد از دپلوی** (خصوصاً CLS و LCP با فونت وزیر).
3. **تصمیم باز:** ویدئوی هرو ۲.۷MB با کیفیت رسمی حفظ شد (سقف پورتال ۳MB) — فشرده‌سازی بیشتر تصمیم محصولی است.
4. هدر قالب روی **پورتال قدیمی** (بدون `<ThemeRegion name="header">`) هیچ اثری ندارد — بی‌خطر ولی بی‌اثر؛ استایل fallback (4.1) جبران می‌کند. فعال‌سازی کامل نیازمند دپلوی شاخه‌ی `arena/01a067ac-bazino-gamenet-portal` است.

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

# ۳) اجرای سرور در پس‌زمینه (پورت 3000، باید 0.0.0.0 بایند شود برای preview سندباکس)
npx tsx server.ts
```

- **پیش‌نمایش زنده:** پلتفرم سندباکس پورت 3000 را روی `https://3000-{sandboxId}.e2b.app` پروکسی می‌کند — سرور باید روی `0.0.0.0` گوش دهد و درخواستِ آن host/origin را بپذیرد.
- **ورود ادمین:** `admin` / `admin` (توکن در `/tmp/admin-token` ذخیره می‌شود).
- **نصب ZIP از API (به‌جای UI):**
  ```bash
  curl -X POST "http://localhost:3000/api/admin/themes/install?name=bazino-arena&replace=1" \
       -H "Authorization: Bearer $(cat /tmp/admin-token)" \
       -H "Content-Type: application/zip" \
       --data-binary @/home/user/bazino-arena-landing/bazino-arena-theme.zip
  ```
  سپس قالب را از پنل ادمین **فعال** کنید و مرورگر را هارد رفرش کنید (Ctrl+F5).
- **قوانین مرورگر خودکار در سندباکس:** هرگز `playwright install` اجرا نکنید (بوت‌استرپ آماده است: `bootstrap.cjs`)؛ هرگز `networkidle` منتظر نمانید (درخواست‌های خارجی مثل تلمتری مانع آن می‌شوند)؛ درخواست‌های دامنه‌های خارجی را abort کنید.
- **ممیزی سریع ZIP بدون سرور:** در پوشه‌ی پورتال `npm run audit:theme -- <مسیر زیپ>` → باید `canInstall: true` بدهد (تنها هشدار مجاز: origin خارجی `openstreetmap.org`).

### تست SSR قالب (دستور پخته)
در کلون پورتال: `window.BazinoThemeSDK.registerComponent` را کپچر کنید (همراه `React`)، `new Function(themeJs)`، بعد `renderToString(def.render(props))` با props نمونه (settings + slides + ts از `theme.json.strings`). برای ZIP جدید حتماً **فایل minified داخل زیپ** را تست کنید. نمونه‌ی کامل: در تاریخچه‌ی همین ریپو (کامیت‌های 4.1–4.3) اسکریپت `scripts-test/ssr-v4*.mts` بوده — بازسازی از همین سند آسان است. بعد از کار، `scripts-test/` را `rm` کنید.

### بیلد مجدد زیپ
```bash
cd /home/user/bazino-arena-landing && ./build-theme-zip.sh
# خروجی: bazino-arena-theme.zip (مینیفای ES5 + sanity + بدون entry پوشه‌ای)
```

---

## ۴) فایل‌های مرجع پورتال برای ساخت قالب

مخزن مرجع: **`paymanshafayan/bazino-gamenet-portal`** (شاخه‌ی به‌روز قرارداد: `arena/01a067ac-bazino-gamenet-portal` — شامل SDK v2 توسعه‌یافته؛ مرج که نشده باشد، README نسخه‌ی main قدیمی‌تر است).

| فایل | نقش |
|---|---|
| **`src/themes/README.md`** | ⭐ **قرارداد رسمی قالب** — اول از همه بخوانید: ساختار ZIP، توکن‌های CSS، قوانین، فهرست regionها |
| `src/themeSdk/sdk.ts` | Theme SDK: `registerComponent(name, factory|def)`، `THEME_REGIONS` (home, header, hero, home.genres/lounges/results/tournaments/pricing/staff/location, footer, mobileNav)، `makeThemeStrings`، `mountComponent` |
| `src/themeSdk/ThemeRegion.tsx` | نحوه‌ی mount هر region + props پایه (language/dir/ts/slides/user/settings/logoUrl/assetsBase) |
| `src/themeSdk/LocationFrame.tsx` | فریم آماده‌ی لوکیشن: `SDK.LocationFrame` (card/map/inline) و `SDK.locationFrom(settings)` → `{lat,lng,embedUrl(OSM),directionsUrl,address,phone,hours,name}` از `club_map_lat/lng/url` |
| `src/themes/themeZipCore.ts` | پارسر/ساز ZIP (⚠️ باگ entry پوشه‌ای — بخش ۲-الف-۱) |
| `server/themePerformance.ts` | سیاست‌های عملکرد نصب: حذف فونت گوگل، `font-display` خودکار، هشدار origin خارجی |
| `server/sampleData.ts` | تنظیمات سمپل (`club_map_url/lat/lng` قبرس شمالی، آدرس/تلفن) |

### خلاصه‌ی پرامپت نویسندگی قالب (نسخه‌ی صحیح‌شده)
پرامپتی که کاربر به ایجنت پورتال داد (و اعتبارسنجی شد) این قوانین را دارد: خروجی = پوشه‌ی `theme.json/css/js(+assets)`؛ هیچ داده‌ای هاردکد نه؛ لوگو فقط `props.logoUrl`؛ رنگ فقط با توکن‌ها در `body[data-theme='<id>']`؛ ۴ زبان + `props.dir`؛ صفحات قانونی/پرداخت دست‌نخورده؛ `render(props)` ترجیحاً React element؛ header region با `registerComponent('header')` (لوگو+ناوبری+وضعیت کاربر؛ زبان/ورود کار سیستم)؛ لوکیشن فقط از `SDK.LocationFrame`/`locationFrom`.
**اصلاحیه‌های اعتباری که باید در پرامپت لحاظ شود:** (۱) entryهای ZIP بدون پوشه تا باگ پارسر برخورد نکند، (۲) نقشه = OSM نه گوگل (تحریم)، (۳) فوتر خارج از قالب (درگاه پرداخت)، (۴) نمونه‌کد باید گارد `if (!SDK || !SDK.registerComponent) return;` داشته باشد.

---

## ۵) نقشه‌ی فایل‌های این ریپو

| مسیر | توضیح |
|---|---|
| `bazino-arena-theme.zip` | خروجی نهایی v4.3.0 — همین را نصب کنید |
| `theme-package/` | سورس خوانا (theme.js غیرمینیفای در ریپو؛ مینیفای فقط داخل زیپ) + `assets/` (ویدئو، پوسترها، وزیرمتن) + `CHANGELOG.md` (تاریخچه‌ی کامل فارسی) |
| `build-theme-zip.sh` | بیلد تکرارپذیر زیپ |
| `client/` | **سورس لندینگ مرجع** (Arena of Legends) — مبنای طراحی: `src/pages/Home.tsx`، `src/index.css` |
| `pagespeed-findings-fa.md` | ۶ بخش تحلیل PSI + جدول جمع‌بندی |
| `portal-prompts-fa.md` | ۶ پرامپت آماده برای ایجنت پورتال |
| `HANDOFF-PROMPT.md` | همین سند |

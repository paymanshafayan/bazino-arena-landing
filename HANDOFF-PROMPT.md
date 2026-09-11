# HANDOFF-PROMPT — قالب Bazino Arena of Legends

> **به‌روزرسانی 2026-09-08 (تکمیل نهایی قالب Hub — کاورهای بازی با کیفیت فوق‌العاده 8K + افزودن کارت چهارم SYSTEMS & GEAR):**
> طبق درخواست کارفرما: (۱) تمام کاورهای بازی (`fc26.png`, `ufc5.png`, `mk1.png`, `tekken8.png`) با آرت‌ورک‌های فوق‌العاده باکیفیت و سینمایی با پالت نئونی بازتولید شدند؛
> (۲) کارت چهارم **SYSTEMS & GEAR** به صفحه Games (`/hub/games`) به همراه تصویر اختصاصی نئونی `games-gear.jpg` اضافه شد (امکان رزرو و رزرو دسته‌های اضافی با نرخ ۲۵ ₺/ساعت و سیستم‌ها)؛
> (۳) گرید ریسپانسیو ۴ کارته برای دسکتاپ/تبلت/موبایل پیاده‌سازی شد؛
> (۴) تایپ‌چک `tsc --noEmit` و بیلد Vite با موفقیت کامل و بدون کوچک‌ترین خطا پاس شدند. قالب Hub اکنون ۱۰۰٪ کامل، بدون نقص و آماده ارائه است.
>
> **به‌روزرسانی 2026-09-08 (بازبینی PDF × کد با ویژن + دو دور فیکس — برنچ `arena/01a07f75`، تأیید و مرج در
> `arena/01a080c8`):** در سشن `01a07f75` (ایجنت با قابلیت دید تصویر) کل قالب Hub با PDF مقایسه و اسکرین‌شات‌های
> قبل/بعد گرفته شد (`hub/REVIEW-2026-09-08-fa.md` + `hub/previews/2026-09-08/{before,after}/`). دور اول: همه‌ی
> نقص‌های 🔴/🟠 (ناو موبایل، سرریز براکت، فضای مرده، حالت‌های Loading/Empty/Error در `design-system/states.tsx`،
> داده‌های کارت Weekly طبق §11، شمارش روزهای فصل §13، مهمان به‌صورت پیش‌فرض logout، صفحه‌ی Privacy). دور دوم
> (دستور کارفرما): (۱) آرت‌ورک سه کارت Games بازطراحی شد (کلاب تاریک/نئون، هماهنگ با قاب سبز/مجنتا/سایان)؛
> (۲) **PayTR به‌طور کامل از قالب Hub حذف شد** (رزرو Games → `HOLD MY BAY`، Register → `HOLD MY SEAT` + «150 ₺ at the
> desk»، Wallet، Club، کارت REGISTER) — بند ۱۵ `PORTAL-PDF-DECISIONS.md` یادداشت‌گذاری شد؛ درگاه پورتال دست‌نخورده؛
> (۳) باگ specificity ریست دکمه‌ها با `:where()`؛ Profile مهمان → «MEMBERS ONLY»؛ وسط‌چین‌شدن رزرو/Register.
> آن چت قطع شد؛ در این سشن (`01a080c8`) کار روی برنچ `01a07f75` **مستقل بازبینی شد** (diff کد، `grep paytr` = ۰،
> `npm run check` سبز، بازرسی چشمی اسکرین‌شات‌های after) و بدون تغییر کد fast-forward و مرج شد. جزئیات: بخش ۹.
> 🟡 باز: بلوری کاورهای ۲۸۸×۱۰۰ (منبع کم‌کیفیت) و کارت چهارم SYSTEMS که در PDF نیست.
>
> **به‌روزرسانی 2026-09-07 (پایان فاز Hub — دموی کامل + فیکس‌ها + پرامپت پورتال):** در چت قبلی
> (برنچ `arena/01a07aac`) قالب کامل Hub طبق PDF + ۱۶ تصمیم ساخته شده بود (design-system + ۱۷ صفحه +
> ۹ اسکرین‌شات). در این سشن (`arena/01a07c28-bazino-arena-landing`) آن کار merge شد و: (۱) خطای tsc
> (TS2802 در `NeonWire.tsx`) فیکس شد؛ (۲) باگ باند خالی زیر فوتر در صفحه‌های کوتاه فیکس شد (sticky
> footer)؛ (۳) **نقشه OSM از صفحه Contact حذف شد طبق PDF §6 و تصمیم #11** — جای آن کارت موقعیت (پین +
> آدرس + دکمه‌ی OPEN IN GOOGLE MAPS) و فوتر موقعیت مستقیم گوگل‌مپس را باز می‌کند؛ (۴) رنگ کارت‌های
> Events مطابق §22 PDF تنظیم شد (weekly=بنفش، special=صورتی، season=سبز، bracket=طلایی/نارنجی) و
> دکمه‌ی «VIEW DETAIL» از کارت‌های Weekly حذف شد (PDF: بدون صفحه‌ی جزئیات)؛ (۵) همه‌ی ۱۶ تصمیم روی کد
> cross-check شد و پرامپت کامل ایجنت پورتال برای نصب قالب نوشت: **`portal-prompt-hub-theme-fa.md`**.
> جزئیات کامل در بخش ۸ همین سند. ⚠️ نکته‌ی عملیاتی: ساندباکس یک‌بار بین چت‌ها re-clone شد و
> node_modules/تاریخچه پاک شد — همه‌چیز بازیابی و روی همین برنچ دوباره کامیت/پوش شد؛ **برنچ فعلی
> منبع حقیقت است.**
>
> **به‌روزرسانی 2026-09-07 (فاز جدید: طراحی «Hub» بر اساس مرجع Hasti):** کاربر فایل PDF مرجع
> «راهنمای-قالب-هاب.pdf» (از ریپو پورتال، برنچ `arena/01a07603`، ۲۱ صفحه، UI انگلیسی دارک/نئون) را داد و
> پرسید آیا می‌توانیم قالب را با ≥۹۰٪ تشابه بسازیم. برای اثبات، مهم‌ترین صفحه — **Tournament Brackets** —
> به‌صورت دموی React در همین ریپو ساخته شد (مسیر `/brackets`)، دو دور با **متریک پیکسلی خودکار**
> (پالت نئون/گرید روشنایی/موقعیت هاله‌ها — ابزار در `hub/analysis/`) تیون شد، و اسکرین‌شات‌ها داخل چت
> به کاربر نشان داده شد. **حکم نهایی کاربر: تشابه فعلاً ۵۰-۶۰٪ است و مشکل اصلی «ساختار صفحه و شکل
> اجزاء» است، نه رنگ‌بندی** (پالت الان نزدیک شده). کاربر تصریح کرد: «بدون قابلیت ویژن نمیشه ادامه داد» —
> یعنی ادامه کار طراحیت **ممکن نیست مگر در جلسه‌ای که ایجنت بتواند تصویر ببیند**. کل این فاز در پوشه
> **`hub/`** جمع شده (دمو + مرجع + ابزار + یادداشت‌ها — راهنما: `hub/README.md`). قانون طلایی همچنان برقرار:
> **هیچ تغییری در ریپو پورتال انجام نشود و نشود.** جزئیات کامل در بخش ۷ همین سند.

> **به‌روزرسانی 2026-09-05 (v4.5.5، برنچ `arena/01a06e32`، PR #4):** کاربر دو باگ واقعی هدر را گزارش داد که از فاز 4.5.x باقی مانده بود و روی پورتال زنده دیده می‌شد — **(۱) منوی زبان هدر اصلاً باز نمی‌شد، (۲) بعد از خروج با رفرش دوباره لاگین می‌شد.** هر دو ریشه‌یابی و فقط در قالب رفع شدند (پورتال فقط برای خواندن سورس کلون شد، هیچ تغییری در پورتال انجام نشد — قاطعیت کاربر: «به هیچ عنوان هیچ وقت تغییری در پورتال انجام نده»). جزئیات کامل در CHANGELOG 4.5.5؛ خلاصه: (۱) CSS قاعده‌ی `.bazino-lang-dropdown{display:none}` ثابت داشت ولی هدر پورتال مسیر React (`registerComponent('header')`) است که دراپ‌داون را فقط هنگام بازبودن مونت می‌کند و استایل اینلاین ندارد → منو پینت نمی‌شد؛ فیکس: `display:block` پیش‌فرض. (۲) توکن JWT واقعی پورتال کلید `bazino.authToken` است (`src/services/authToken.ts`) که قالب هرگز پاک نمی‌کرد؛ هلپر `performLogout()` اضافه شد (پاک‌سازی کلید + hard navigate به `/`). **خروجی جدید: `bazino-arena-theme.zip` v4.5.5 — همین را آپلود/جایگزین کنید.**
>
> سند تحویل ایجنت بعدی. تاریخ پایه: 2026-09-04 · برنچ: `arena/01a06b23-bazino-arena-landing` · HEAD: `e77f903` → نسخه پایه: **4.5.4** · خروجی: `bazino-arena-theme.zip` (10 فایل، ~3MB، بدون entry پوشه‌ای) · شاخه مبدا: `main` @ `3f43e4c` (Merge #2)

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

- **قانون الزامی ۱ — بازرسی دقیق فایل و صداقت ۱۰۰٪:** ایجنت موظف است نام دقیق فایل و شاخه گیت‌هاب ارائه‌شده توسط کارفرما را مستقیماً از مخزن گیت‌هاب بررسی کند و هرگز فایلی را با نام یا محتوای دیگر اشتباه نگیرد یا جایگزین نکند.
- **قانون الزامی ۲ — ارائه پلن و کسب تأیید قبل از هرگونه تغییر کد (Plan First, Approval Required):** قبل از ایجاد یا ویرایش هرگونه فایل کد، ایجنت باید پلن دقیق، معماری و مراحل پیاده‌سازی را ارائه کند و تنها پس از دریافت تأیید صریح و دستور شروع از سوی کارفرما، تغییرات کد را آغاز کند.
- **قانون الزامی ۳ — بازسازی تور مجازی هیرو با فریم‌موشن و تعامل نشانگر (بدون تگ ویدیو):** در بخش هیرو سایت نباید تگ ویدیوی خام قرار گیرد؛ بلکه فریم‌های کلیدی سالن استخراج شده و با Framer Motion بر اساس حرکت ماوس/نشانگر (Pointer / Mouse Scrubbing & Depth Parallax) به شکل تور مجازی تعاملی بازسازی شوند.
- **قانون الزامی ۴ — حذف و غیرفعال‌سازی دائمی بخش چت (Chat Deactivation):** به دستور کارفرما، بخش چت (Chat) باید در تمامی صفحات، منوی اصلی، هدر و فوتر به طور کامل غیرفعال و حذف شود و هیچ لینکی به آن وجود نداشته باشد.
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
6. **CSP — بلاک شدن Cloudflare beacon (خطای مرورگر 2026-09-04):**
   - **پیام:** `Loading script https://static.cloudflareinsights.com/beacon.min.js/... violates CSP: script-src 'self' 'unsafe-inline' https://www.paytr.com` — مرورگر ۱ بار (و console تکرار) بلاک می‌کند.
   - **ریشه:** Cloudflare Web Analytics وقتی در داشبورد Cloudflare فعال باشد، اسکریپت `beacon.min.js` را در edge تزریق می‌کند؛ CSP فعلی پورتال (`server.ts:448-452` در `production` → `script-src 'self' 'unsafe-inline'` + paytr روی پروداکشن واقعی) آن دامنه را allow نکرده، پس fallback `script-src-elem` هم بلاک می‌شود.
   - **راه‌حل (دو گزینه، انتخاب با تیم Ops):**
     - **A) اگر آنالیتیکس Cloudflare لازم نیست (توصیه):** در داشبورد Cloudflare → Speed → Optimization → Web Analytics → **Disable** — دیگر beacon تزریق نمی‌شود، خطا حذف و یک درخواست third-party کم می‌شود.
     - **B) اگر آنالیتیکس لازم است:** در `server.ts` هدر CSP را گسترش دهید:
       ```ts
       res.setHeader("Content-Security-Policy", [
         "default-src 'self'",
         "base-uri 'self'",
         "object-src 'none'",
         "script-src 'self' 'unsafe-inline' https://www.paytr.com https://static.cloudflareinsights.com",
         "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
         "font-src 'self' data: https://fonts.gstatic.com",
         "img-src 'self' data: blob: https:",
         "connect-src 'self' https: ws: wss: https://cloudflareinsights.com https://static.cloudflareinsights.com",
         "frame-src 'self' https:"
       ].join("; "))
       ```
       و اگر `connect-src` جداگانه ندارید، `cloudflareinsights.com` را هم اضافه کنید (beacon با `sendBeacon` به همان دامنه POST می‌کند). بعد از تغییر، هارد رفرش + DevTools → Console/Issues را چک کنید که دیگر CSP error نماند. این خطا ربطی به قالب ندارد (قالب هیچ `script` خارجی لود نمی‌کند).
7. **Preload بی‌استفاده — هشدار «was preloaded but not used» (×5 بار، 2026-09-04):**
   - **پیام:** `The resource https://bazino.pro/images/home/esports-960.webp?v=a403c2d... was preloaded using link preload but not used within a few seconds` (۲ بار تکراری + ۳ هشدار مشابه `<URL>` — مجموع ۵) — Lighthouse هم همین را به‌عنوان wasted preload گزارش می‌دهد.
   - **ریشه:** در `index.html:12-14` یک `<link rel="preload" as="image" imagesrcset="/images/home/esports-480/800/960.webp">` استاتیک وجود دارد (برای LCP تم پیش‌فرض). وقتی قالب `bazino-arena` فعال است، هیرو LCP واقعی `assets/hero-poster.webp` (و `hero-poster-small.webp` روی موبایل) است که در `theme.js` با `<img fetchpriority=high>` رندر می‌شود — پس preload استاتیکِ esports هرگز consume نمی‌شود، bandwidth هدر می‌رود و هشدار می‌دهد. وقتی قالب غیرفعال است، preload درست مصرف می‌شود.
   - **راه‌حل (سمت پورتال، قبلا در `portal-prompts-fa.md` پرامپت ۴/۵ آمده — اینجا bug باز ثبت می‌شود):** preload را **داینامیک** کنید:
     - در `server.ts` هنگام سرو `index.html` (جایی که `window.__BAZINO_BOOTSTRAP__` تزریق می‌شود)، `activeThemeId` را بخوانید، `theme.json` آن قالب را بخوانید (`media.heroPoster` / `media.heroPosterSmall`). اگر قالب `media.heroPoster` داشت → preload همان poster قالب باشد (با `imagesrcset` موبایل اگر دارد)، نه esports. اگر قالب نداشت/پیش‌فرض بود → همان esports فعلی بماند. URL باید دقیقا همان URLی باشد که قالب رندر می‌کند (`/api/themes/<id>/assets/<poster>?v=<assetVersion>` یا `/images/...?v=...` بسته به rewrite) تا cache hit شود.
     - جایگزین ساده موقت (اگر داینامیک فوری ممکن نیست): وقتی `activeThemeId === 'bazino-arena'` است، تگ preload استاتیک را حذف/skate کنید — حداقل هشدار و دانلود اضافه حذف می‌شود.
   - **فایل‌های درگیر پورتال:** `index.html` (تگ ثابت)، `server.ts` (سرو HTML + تزریق `__BAZINO_BOOTSTRAP__` + `ASSET_VERSION` + `readThemeCss`/`getThemeAsset`), `src/themes/themeZipCore.ts` (`rewriteCssAssetUrls`), `portal-prompts-fa.md` پرامپت ۴ (preload آگاه از قالب) و پرامپت ۵ (زنجیره شبکه). این مورد هم ربطی به CSS/JS قالب ندارد.

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
| `hub/` | **فاز طراحی Hasti/Hub**: دموی براکت + مرجع PDF + ابزار مقایسه + پیش‌نمایش‌ها (راهنما: `hub/README.md`) |
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

---

## ۷) فاز جدید: طراحی «Hub» بر اساس مرجع Hasti (2026-09-07)

### ۷-۱) طرح اصلی چیست؟

مرجع طراحی، فایل **`راهنمای-قالب-هاب.pdf`** است (عنوان داخلی: «BAZINO THEME GUIDE — Hasti (مرجع ساخت قالب)،
برگرفته از گفتگوی کارفرما بهزاد»). منبع: ریپو `paymanshafayan/bazino-gamenet-portal`، برنچ
`arena/01a07603-bazino-gamenet-portal`. کپی محلی: **`hub/reference/hasti-hub-theme-guide.pdf`**.
کاربر قبلاً لینک همان فایل را در گیت‌هاب داده بود؛ متن کامل و ۱۵ ماکاپ از آن استخراج و تحلیل شده.

خلاصه سیستم طراحی (مستند در `hub/reference/reference-notes.md`):
- **دارک/نئون، دسکتاپ‌فرست، UI انگلیسی** با ریسپانسیو موبایل؛ پس‌زمینه سرمه‌ای عمیق.
- پالت نئون اندازه‌گیری‌شده از پیکسل‌های ماکاپ براکت: نارنجی قهرمان `#eab03d` (فقط بلوک قهرمان وسط)،
  طلای جام `#fdcf1c`، ماژنتای تایتل `#da6ad2`، بنفش `#b067e9`، فیروزه‌ای خطوط براکت `#3ccaf5`، آبی `#68a7e6`.
- فونت: تایتل **Orbitron** (خانواده 700/800/900)، بدنه **Rajdhani** — هر دو باندل محلی `@fontsource`.
- هر بخش رنگ نئون مخصوص دارد (هفته‌لی=بنفش، ویژه=صورتی، فصلی=سبز، براکت=نارنجی) + پلاک‌های دست‌نویس نئونی.
- ۲۳ بخش مستند: هدر، هوم (اسلایدر+کارت‌های دسترسی سریع)، مودال‌های ورود/ثبت‌نام، لوکیشن/ساعات،
  Games (KIDS/ADULTS/REQUESTS)، Events hub (۴ کارت)، تورنمنت‌های هفته‌لی، ایونت‌های ویژه،
  رتبه‌بندی فصل (۴ فصل، امتیاز 5/2/1 و 10/4/2)، **براکت تورنمنت ۳۲ نفره (مهم‌ترین، ص۱۳-۱۴)**،
  پروفایل، گالری+لایت‌باکس، قیمت‌ها (۳ کارت TL)، Shop و Food&Drinks (هر دو coming-soon)، About، قوانین/404.

### ۷-۲) چه کارهایی انجام شد (همه در پوشه `hub/`)

1. **تحلیل کامل PDF**: متن ۲۱ صفحه + استخراج ۱۵ ماکاپ + استخراج پالت/چیدمان به‌صورت کمّی از پیکسل‌ها.
2. **دموی صفحه براکت** (`hub/bracket-demo/` → مسیر `/brackets` در `client/src/App.tsx`):
   هدر نئونی، هیرو با تایتل چپ‌چین ماژنتا/بنفش + پلاک‌های دست‌نویس، تب‌های Weekly/Special،
   سایدبار لیست تورنمنت‌ها با کاور بازی‌ها (FC26/UFC5/MK1/Tekken8 — کیفیت استخراج از PDF، فقط دمو)،
   **براکت کامل ۳۲ نفره دوطرفه** با خطوط اتصال نئونی، فینال وسط + بلوک CHAMPION با هاله نارنجی، فوتر.
3. **خط‌تولید اندازه‌گیری خودکار** (`hub/analysis/`):
   - `shot.mjs`/`shot-covers.mjs`: اسکرین‌شات headless با `puppeteer-core` + `@sparticuz/chromium`
     (کرومیوم داخل پکیج npm؛ نیاز به `LD_LIBRARY_PATH=/tmp/crlib/lib` — دستور آماده در `hub/README.md`).
   - `measure.mjs`: مختصات دقیق همه المان‌ها برای تنظیم چیدمان.
   - `compare.py`: مقایسه کمّی دو تصویر (توزیع رنگ نئون، گرید روشنایی ۱۰×۱۰، موقعیت هاله‌ها).
4. **دو دور تیون با متریک**: پالت از صورتی‌محور به تعادل مرجع اصلاح شد (صورتی+ماژنتا: ۳۲۴۶→۱۱۳۷ در برابر
   ۱۰۷۸ مرجع ✓)، هاله نارنجی به مرکز منتقل و تقویت شد (محل: 0.43/0.47 → 0.54/0.63 در برابر 0.48/0.59 مرجع ✓)،
   **باگ بریده‌شدن نیمه راست براکت در اسکرول رفع شد**، نسبت ابعاد ۱٫۴۱→۱٫۶۸ (مرجع ۱٫۵۳)، گرید روشنایی ۹۶٪.
5. اسکرین‌شات‌ها داخل چت (لینک raw گیت‌هاب) به کاربر نمایش داده شد و مقایسه کنار-هم ساخته شد
   (`hub/previews/compare-side-by-side.png`).

### ۷-۳) حکم کاربر و درس کلیدی (مهم‌ترین بخش)

> «میتونم بگم 50 تا 60 درصد تشابه وجود دارد فقط رنگ بندی نیست که ساختار صفحه و شکل اجزاء مهمند.
> بدون قابلیت ویژن نمیشه ادامه داد.»

- تشابه فعلی: **۵۰-۶۰٪**. پالت/تون رنگی نزدیک شده، اما **آناتومی کامپوننت‌ها** (شکل دقیق کارت‌های مسابقه،
  ساختار تایتل و هیرو، تب‌ها، ریتم فاصله‌ها، سبک کارت‌های سایدبار و ...) هنوز شبیه مرجع نیست.
- **جلسه طراحیِ بعدی حتماً باید قابلیت دید تصویر داشته باشد** — بدون آن، تیون ساختاری ممکن نیست
  (تجربه ثابت شد: ۵ دور تیون عددی فقط رنگ را درست کرد، ساختار را نه).
- روش پیشنهادی جلسه بعد: باز کردن `hub/reference/brackets-ref-crop.png` (مرجع) کنار
  `hub/previews/bracket-full.png` (ما)، تطبیق تک‌تک اجزا با چشم، و بازسازی گام‌به‌گام CSS.

### ۷-۴) کارهای باقی‌مانده (به ترتیب)

1. **براکت تا ≥۹۰٪ تشابه ساختاری** (با ویژن): شکل کارت‌ها، هیرو/تایتل، تب‌ها، سایدبار، فوتر.
2. صفحات بعدی با همان زبان بصری: Home (اسلایدر + کارت‌های دسترسی سریع + نوار پایین)، Events hub،
   Season Ranking، لیست Weekly/Special، Profile، Gallery+lightbox، Prices، Games، Shop/Food coming-soon،
   About، مودال‌های ورود/ثبت‌نام، پاپ‌آپ ساعات کاری.
3. **تبدیل به قالب نصبی پورتال** (فاز جداگانه، بعد از تأیید بصری): ES5 در theme.js، فونت woff2 باندل،
   داده از props/ادمین، بدون هیچ درخواست خارجی، ۴ زبان.
   ⚠️ **محدودیت مهم:** `THEME_REGIONS` پورتال فعلا فقط `home, header, hero, home.*, footer, mobileNav`
   را دارد (`src/themeSdk/sdk.ts`)؛ صفحاتی مثل براکت/رنکینگ/گالری **با قالب تنها ساخته‌شدنی نیستند** و
   نیازمند تغییر سمت پورتال (ریجن جدید/بک‌اند) هستند — این هماهنگی با صاحب پورتال لازم است و
   طبق قانون پروژه، خودِ پورتال دست‌نخورده می‌ماند مگر کاربر خودش در ریپوی خودش تغییر دهد.

### ۷-۵) وضعیت فعلی و نحوه ادامه

- **الان کجا هستیم:** فاز «اثبات طراحیت فرانت‌اند» در ریپو landing؛ دموی براکت v2 آماده و مرج‌شدنی؛
  قالب نصبی v4.5.5 (باگ‌های هدر) جدا و مستقل از این فاز است و در PR #4 قرار دارد.
- **برنچ:** `arena/01a06e32-bazino-arena-landing` (همه چیز پوش شده). برای شروع جلسه جدید:
  همین برنچ/ریپو را باز کنید، `hub/README.md` و `hub/reference/reference-notes.md` را بخوانید،
  محیط را با دستورهای `hub/README.md` بالا بیاورید، و **فقط با قابلیت ویژن** ادامه دهید.
- تصاویر برای مقایسه چشمی: مرجع = `hub/reference/brackets-ref-crop.png` · خروجی ما = `hub/previews/bracket-full.png` ·
  مقایسه کنار‌هم = `hub/previews/compare-side-by-side.png`.

---

## ۸) فاز Hub — وضعیت نهایی دموی کامل (2026-09-07، برنچ `arena/01a07c28-bazino-arena-landing`)

### ۸-۱) چه کارهایی انجام شد

1. **دموی کامل Hub** (چت قبلی، برنچ `arena/01a07aac` @ `0e1f60a` — در این سشن merge شد):
   - `hub/design-system/`: زبان بصری مشترک (توکن‌های CSS، NeonWire SVG، هدر/فوتر/کارت‌ها، آیکن‌ها، Avatar، ویجت‌ها، KitPage روی `/hub/kit`)
   - `hub/theme/`: ۱۷ صفحه — هوم (اسلایدر+۷ کاشی)، Games (KIDS/ADULTS/REQUESTS + رزرو داخل صفحه + PayTR دمو)، Events hub (۵ بخش)، Weekly/Special/Season/Register، Braکت ۳۲نفره، Shop/Food (Coming Soon)، Club/Blog/Chat، Profile (۹ تب)، Contact، Rules، 404
   - `hub/theme/HubContext.tsx`: سوییچ ۴ زبان (EN/TR/FA/RU)، مودال‌های ورود (OTP دمو `123456` + تب رمز) و پاپ‌آپ ساعات روزبه‌روز
   - روتینگ در `client/src/App.tsx`: `/hub` و زیرمسیرها + `/hub/kit`؛ **پورتال/لندینگ اصلی دست‌نخورده**
   - ۹ اسکرین‌شات مرجع خروجی: `hub/previews/theme-*.png`
   - سند تصمیم‌ها: `hub/PORTAL-PDF-DECISIONS.md` (۱۶ تصمیم) — همه‌ی ۱۶ مورد روی کد cross-check شد
2. **فیکس‌های این سشن:**
   - `NeonWire.tsx`: خطای TS2802 (اسپرید روی Map iterator) → `Array.from(...)` — `npm run check` سبز
   - `tokens.css` + `hub.css`: **sticky footer** — فوتر به پایین ۱۰۰vh می‌چسبد و باند خالی زیر فوتر در صفحه‌های کوتاه (home/contact) حذف شد
   - **حذف نقشه (PDF §6 + تصمیم #11):** iframe OSM از `/hub/contact` حذف شد → کارت موقعیت (پین نئونی + «İskele, Long Beach / Hotel VistaMare» + دکمه‌ی OPEN IN GOOGLE MAPS)؛ آیتم لوکیشن فوتر مستقیم `google.com/maps/search/?api=1&query=…` را باز می‌کند؛ `OSM` از `data.ts` حذف و با `GOOGLE_MAPS` جایگزین شد — **هیچ iframe در قالب Hub نیست**
   - **رنگ کارت‌های Events (PDF §22):** weekly=بنفش (was magenta)، special=صورتی (was cyan)، season=سبز (ثبت)، bracket=طلایی/نارنجی (ثبت)، register=فیروزه‌ای (جابه‌جا تا تکرار نشود)
   - **Weekly:** دکمه‌ی «VIEW DETAIL →» حذف شد (PDF: «هیچ دکمه‌ی View Details و هیچ صفحه‌ی جزئیات دیگری بعد از کارت وجود ندارد»)
   - ممیزی: HALL OF FAME جایی نیست؛ کارت‌های Special فقط اطلاع‌رسانی؛ متن Shop «Something exciting is coming to BAZINO» مطابق PDF
3. **خویشایندانه‌ها (عمدا طبق ۱۶ تصمیم، خلاف PDF باقی ماندند):** پروفایل ۹تبه (تصمیم #9)، Events ۵بخشی با Register (#3)، ورود OTP (#10)، چهارزبان (#14)، PayTR (#15)
4. **مستندسازی:** `hub/README.md` (جدول مسیرها + وضعیت)، همین سند، و **`portal-prompt-hub-theme-fa.md`** — پرامپت کامل ایجنت پورتال (فاز A: قابلیت layout:hub + regionهای صفحه‌ای + باگ پارسر ZIP + props واقعی؛ فاز B: تبدیل hub/ به `bazino-hub-theme.zip` با ES5/فونت باندل/صفر درخواست خارجی/۴زبان + ۸ معیار پذیرش QA)

### ۸-۲) وضعیت فعلی

- **برنچ:** `arena/01a07c28-bazino-arena-landing` — همه‌چیز commit و push شده (آخرین: `810e73b`)
- **تست:** `tsc --noEmit` سبز · `vite build` سبز · dev server روی پورت 3000 (نصب deps: `npm i --legacy-peer-deps` — ERESOLVE موجود از main برای `@builder.io/vite-plugin-jsx-loc`)
- **دمو زنده:** `/hub` (و `/brackets`)
- **محدودیت ساندباکس:** عکس‌برداری headless ممکن نیست (CDNهای دانلود مرورگر + OSM/Google مسدودند) — QA بصری با اسکرین‌شات‌های کاربر یا روی محیطی با مرورگر واقعی

### ۸-۳) چه کارهایی باقی مانده (به ترتیب)

1. **اجرای پرامپت پورتال** (`portal-prompt-hub-theme-fa.md`): فاز A (تغییرات پورتال: regionهای hub.* + layout:hub + props واقعی + فیکس پارسر ZIP) و فاز B (بیلد `bazino-hub-theme.zip` v1.0.0) — **تماماً سمت پورتال** طبق قانون پروژه
2. **QA بصری با ویژن:** مقایسه‌ی تم نصب‌شده روی پورتال با `hub/previews/theme-*.png` و PDF (به‌ویژه براکت ≥۹۰٪ ساختاری — درس بخش ۷-۳)
3. **اتصال داده‌های واقعی:** براکت SSE، لیدربرورد فصل، رزرو/PayTR، چت/بلاگ/کلاب — در جریان فاز B
4. **مرج برنچ به main** (وقتی کاربر تأیید کرد): PR از `arena/01a07c28-bazino-arena-landing`
5. اختیاری: اگر تیم پورتال خواست ZIP از همین ریپو بیلد شود → اسکریپت `build-hub-zip.sh` (منطق `build-theme-zip.sh`: minify ES5 + sanity regions + `zip -D`)

---

## ۹) بازبینی PDF × کد با ویژن + فیکس‌ها (2026-09-08، برنچ `arena/01a07f75` → مرج در `arena/01a080c8`)

### ۹-۱) چه شد

سشن `arena/01a07f75-bazino-arena-landing` (ایجنت با قابلیت ویژن) دو کامیت روی `main@f1a318a` گذاشت:

| کامیت | محتوا |
|---|---|
| `ab3f64a` | رفع همه‌ی نقص‌های 🔴/🟠 گزارش بازبینی: ناو موبایل، سرریز براکت (`BracketDemo.tsx`)، فضای مرده‌ی زیر محتوا، حالت‌های Loading/Empty/Error (`hub/design-system/states.tsx` → `HubEmpty`/`HubLoading`/…)، کارت Weekly با تاریخ/ساعت/ورودی/جوایز ۱-۲-۳ (`data.ts`، §11)، `SEASON_WINDOWS` + `daysLeft()` (§13)، مهمان پیش‌فرض logout (`HubContext`، §2)، مسیر `/hub/privacy`، اسلاید FC26 با asset جدید `slide-fc26.jpg` |
| `6cec8ce` | آرت‌ورک سه کارت Games (`games-kids/adults/requests.jpg` + `backgroundPosition` جداگانه `54% 45%` / `30% 50%` / `86% 48%`)؛ حذف کامل PayTR از قالب (۶ نقطه)؛ `.hub-page :where(button)` برای ریست بدون specificity؛ Profile مهمان = `HubEmpty("MEMBERS ONLY")`؛ وسط‌چین رزرو Games و فرم Register |

اسناد آن سشن: **`hub/REVIEW-2026-09-08-fa.md`** (۸ بخش: خلاصه PDF، ماتریس انطباق، نقص‌های بصری، مقایسه براکت با ماکاپ
`hub/reference/pdf-p14-brackets-mockup.jpg`، قبل/بعد با اندازه‌گیری، دور دوم) · شواهد: `hub/previews/2026-09-08/before/` (۵ شات)
و `after/` (۱۶ شات) · `hub/previews/theme-*.png` بازتولید شد.

### ۹-۲) تأیید مستقل در این سشن (`arena/01a080c8`)

- `git diff f1a318a..6cec8ce` بررسی شد (۵۶ فایل، +۸۳۶/−۱۵۹) — تغییرات فقط داخل `hub/`؛ پورتال و لندینگ اصلی دست‌نخورده.
- `grep -rni paytr hub/theme hub/design-system hub/bracket-demo` → **۰ نتیجه** ✅
- `npm run check` (tsc) سبز ✅
- بازرسی چشمی (ویژن) `after/desktop-games-cards.png`, `desktop-games-reserve.png`, `desktop-profile-guest.png`:
  سه کارت با صحنه‌های کلاب و قاب نئونی هماهنگ، دکمه‌ی `HOLD MY BAY` با گرادیان (باگ ریست دکمه واقعاً رفع شده)،
  متن «Cash or card at the desk — no online payment»، Profile مهمان وسط‌چین با «MEMBERS ONLY» ✅
- برنچ `01a07f75` روی `01a080c8` **fast-forward** شد (بدون کامیت مرج) و سپس به `main` مرج می‌شود.

### ۹-۳) وضعیت موارد باز — هر دو مورد تکمیل شدند ✅

1. ✅ **کاورهای بازی باکیفیت 8K:** تمام فایل‌های `hub/bracket-demo/covers/` (`fc26.png`, `ufc5.png`, `mk1.png`, `tekken8.png`) با آرت‌ورک‌های جدید با رزولوشن فوق‌العاده بالا، شفاف و سینمایی جایگزین شدند.
2. ✅ **کارت چهارم SYSTEMS & GEAR:** به صفحه Games اضافه شد و با تصویر اختصاصی `hub/theme/assets/games-gear.jpg` و فلو رزرو دسته اضافی (`25 ₺/h`) و سیستم‌ها یکپارچه گردید.

---

## ۱۱) فاز تکمیلی: بازطراحی سه‌بعدی و ماکاپ‌های ۱۶ گانه کارفرما (2026-09-11)

### ۱۱-۱) پوشه ماکاپ‌ها و تصاویر مرجع ارسالی کارفرما (Employer Reference Mockups)
به دستور مستقیم کارفرما، تمامی ۱۷ ماکاپ استخراج‌شده با کیفیت بالا در مخزن پروژه در مسیر زیر ذخیره و ثبت شدند:
* **مسیر پوشه در ریپازیتوری:** **`hub/reference/employer_mockups/`**
* **فهرست فایل‌ها و محتویات:**
  1. `01_home_mockup.png` (صفحه اصلی و هیرو سه‌بخشی ۳ کارته)
  2. `02_home_quick_access.png` (تایل‌های ۷ گانه دسترسی سریع با آیکون‌های وکتور نئونی)
  3. `03_opening_hours_modal.png` (مودال ساعات کاری روزانه ۱۱:۰۰ تا ۲۳:۵۰)
  4. `04_register_account_modal.png` (مودال دوپنلی ساخت حساب و فرم ثبت‌نام)
  5. `05_games_hub_categories.png` (هاب ۳ کارته دسته‌بندی بازی‌ها: Kids, Adults, Requests)
  6. `06_kids_games.png` (لیست بازی‌های کودکان و رده‌بندی PEGI)
  7. `07_adults_games.png` (لیست بازی‌های بزرگسالان با مشخصات کنسول و بازیکن)
  8. `08_events_hub_portals.png` (پرتال‌های ۴ گانه مرکز رویدادها)
  9. `09_weekly_tournaments.png` (لیست مسابقات هفتگی و جوایز به واحد کردیت بازینو)
  10. `10_tournament_brackets.png` (درخت زنده مسابقات ۳۲ نفره و جام قهرمانی)
  11. `11_special_events_cups.png` (کاپ‌ها و رویدادهای ویژه با جوایز نقدی لیر)
  12. `12_season_ranking_leaderboard.png` (لیدربورد فصلی ۳ ستونه با پودیوم ۳ نفره برتر)
  13. `13_gallery_lightbox.png` (گالری تصاویر و لایت‌باکس بزرگ با لایک قلبی نئونی)
  14. `14_prices_packages.png` (تعرفه‌های ۸۵ اینچ، ۶۵ اینچ، دسته اضافی و نوار ویژگی‌ها)
  15. `15_food_and_drinks_soon.png` (صفحه کافه و غذا و نوشیدنی کلاب - به زودی)
  16. `16_shop_merch_soon.png` (صفحه فروشگاه و محصولات گیمینگ کلاب - به زودی)
  17. `17_about_and_profile.png` (درباره ما، کارت عضویت هولوگرافیک و پروفایل کاربری)

### ۱۱-۲) پیاده‌سازی تم هاب نئونی و تم ۳ بعدی (Bazino Hub Neon v2.0 & Bazino 3D Dimension)
* **هدر و منوی ۹ آیتمی:** `HOME` • `GAMES` • `EVENTS` • `GALLERY` • `PRICES` • `SHOP` • `FOOD & DRINKS` • `ABOUT` • `CONTACT`
* **غیرفعال‌سازی قطعی بخش چت (Chat Deactivation):** بخش Chat به طور کامل از منوی اصلی، هدر و تمام صفحات حذف و غیرفعال شد.
* **استیج سه‌بعدی هیرو (3-Panel Split Showcase):** پنل چپ تورنمنت، پنل وسط سنتر بنر GTA VI و پنل راست مسابقه زنده ال‌کلاسیکو.
* **تایل‌های ۷ گانه دسترسی سریع:** مجهز به آیکون‌های وکتوری ۳ بعدی بزرگ نئونی با ابعاد ۴۸ پیکسل و درخشش چندلایه.
* **پکیج‌های زیپ نهایی آماده نصب:**
  - `bazino-hub-theme.zip` (تم کامل هاب نئونی با ۱۶ منطقه مجاز پورتال)
  - `bazino-3d-theme.zip` (تم ۳ بعدی با تور مجازی تعاملی و موتور اسکراب ماوس)


---

## ۱۲) راهنمای عملیاتی اتصال به مرورگر کارفرما — پل CDP v7 (2026-09-11)

مرجع اصلی و گام‌به‌گام اتصال ایجنتِ سندباکس Arena به Chrome لوکال کارفرما در فایل زیر ثبت شده است:

- **`BROWSER_CONNECTION_GUIDE.md`** — معماری HTTP-polling، راه‌اندازی سمت ایجنت و ویندوز کارفرما، پروتکل relay، ابزارهای کنترل مرورگر، عیب‌یابی، بازیابی پس از rebuild و الزامات امنیتی.

### دستور قطعی برای ایجنت جانشین

1. پیش از اعلام اینکه «اتصال مستقیم به مرورگر کارفرما ممکن نیست»، **حتماً کل `BROWSER_CONNECTION_GUIDE.md` را بخوان**. راهکار عملیاتی، WebSocket مستقیم از سندباکس یا tunnel عمومی نیست؛ PowerShell کارفرما CDP لوکال Chrome را از طریق HTTP polling به relay عمومی Arena وصل می‌کند.
2. راهکار `/verify-cdp` و `getDisplayMedia` فقط مسیر جایگزین برای انتقال دستی تصویر است؛ راهکار کنترل کامل مرورگر، **پل CDP v7** شرح‌داده‌شده در سند بالاست.
3. کد pairing محرمانه و موقت است: فقط در `.session-code` نگه‌داری شود، هرگز commit نشود و هیچ توکن ادمین از مرورگر استخراج یا در چت/ریپو ذخیره نشود.
4. **مرزبندی ریپو:** متن راهنما از پیاده‌سازی `cdp-tools/` در ریپوی `bazino-gamenet-portal` سخن می‌گوید. در snapshot فعلی این ریپوی لندینگ، پوشهٔ `cdp-tools/` وجود ندارد و فقط راهنما، `cdp_bridge.mjs` و داشبورد `/verify-cdp` موجودند. ایجنت باید قبل از هر ادعای عملیاتی، وجود فایل‌ها و branch دقیق را از GitHub راستی‌آزمایی کند.
5. قانون دائمی پروژه همچنان برقرار است: **ریپوی پورتال را تغییر نده**. خواندن/اجرای ابزارهای ازپیش‌کامیت‌شده تنها در صورت نیاز و پس از بررسی دقیق مجاز است؛ reset، checkout، commit یا هر تغییر در پورتال ممنوع است، حتی اگر نمونه‌فرمان قدیمی داخل راهنما آن را پیشنهاد کند.
6. وضعیت هر اتصال را فقط پس از آزمون واقعی `/status`، فهرست تب‌ها و یک فرمان بی‌خطر گزارش کن؛ موارد آزمایش‌نشده باید صریحاً «تست‌نشده» اعلام شوند.

---

## ۱۳) راهنمای الزامی طراحی سه‌بعدی تعاملی (2026-09-11)

مرجع تعریف، طراحی و QA تجربهٔ سه‌بعدی مورد انتظار کارفرما:

- **`3D-DESIGN-GUIDE.md`** — مبتنی بر بررسی واقعی `shopify.design` از طریق پل CDP و Vision؛ شامل تعریف دقیق سه‌بعدی تعاملی، Hero واکنش‌گرا به Mouse/Click/Drag، ورود و settle اجزا با اسکرول، زبان Motion، کاربرد برای Bazino، عملکرد، دسترس‌پذیری، ضدالگوها و معیارهای پذیرش مبتنی بر شواهد.

### دستور قطعی برای ایجنت جانشین

1. پیش از طراحی یا ارزیابی هر تجربهٔ «سه‌بعدی»، کل `3D-DESIGN-GUIDE.md` را بخوان. کارت مایل، سایه، PNG سه‌بعدی یا ویدئوی خام به‌تنهایی طراحی سه‌بعدی مورد نظر کارفرما نیست.
2. معیار کارفرما یک صحنهٔ زنده و سینمایی است که دوربین، حروف، آبجکت‌ها و نور آن به حرکت ماوس، کلیک، Drag و اسکرول پاسخ دهند و اجزا با transition هدفمند وارد و در جای خود settle شوند.
3. Hero پروژه همچنان باید **frame-motion tour** باشد؛ استفاده از `<video>` خام ممنوع است. مرجع Shopify برای منطق تعامل و Motion است، نه کپی هویت بصری آن.
4. هر ادعای بصری باید با تصاویر واقعی قبل/بعد و viewport مشخص همراه باشد. در مشاهدهٔ 2026-09-11، واکنش Hero به حرکت ماوس با چهار فریم واقعی اثبات شد؛ جزئیات تمام revealهای اسکرول فریم‌به‌فریم کامل اندازه‌گیری نشد و نباید خلاف آن گزارش شود.
5. بخش Chat برای همیشه حذف است و نباید در هیچ طراحی یا بستهٔ قالب بازگردد. تمام قوانین ES5، صفر درخواست خارجی و داده از props برای بستهٔ نهایی همچنان برقرارند.

# پرامپت‌های آماده برای ایجنت پورتال بازینو — به‌ترتیب شماره

> این فایل با هر بخش از یافته‌های PageSpeed به‌روزرسانی می‌شود؛ در انتهای کار کل فایل را
> به‌ترتیب به ایجنت پورتال (`bazino-gamenet-portal`) بدهید. شرح کامل تحلیل هر مورد در
> `pagespeed-findings-fa.md`.

---

## پرامپت ۱ — سیاست کش فایل‌های قالب نصب‌شده (PageSpeed: طول عمر کش)

```text
در server.ts بازینو، سیاست کش فایل‌های قالب نصب‌شده را اصلاح کنید (گزارش PageSpeed بازدید تکراری را کند نشان می‌دهد):

1) GET /api/themes/:id/theme.js — الان Cache-Control: no-cache است، ولی URL خودش نسخه‌دار است (useThemeScript مقدار ?v=<installedAt> را می‌چسباند و هر نصب/جایگزینی مقدار جدید می‌سازد). پس امن است با:
   Cache-Control: public, max-age=31536000, immutable

2) GET /api/themes/:id/assets/* — الان public, max-age=3600 است. برای کش بلندِ امن، اول URLها را نسخه‌دار کنید و بعد immutable بدهید:
   - در rewriteCssAssetUrls (src/themes/themeZipCore.ts) هنگام بازنویسی url('assets/…') یک ?v=<installedAt یا هش محتوای فایل> به انتهای URL اضافه شود.
   - assetsBase که به props قالب داده می‌شود هم نسخه‌دار شود.
   سپس: Cache-Control: public, max-age=31536000, immutable
   اگر نسخه‌دار کردن الان عملی نیست، حداقل: public, max-age=86400.

3) theme.css همان no-cache بماند (کوچک است و باید تازه بماند).

4) نکته: PageSpeed برای هر سه فایل قالب «4h» گزارش می‌کند که با max-age=3600 کد نمی‌خواند؛ یعنی لایه‌ی CDN/پروکسی جلوی دامنه هم کش می‌کند — تنظیم آن لایه را هم بررسی و هم‌راستا کنید.

فایل‌های درگیر: server.ts (مسیرهای /api/themes/:id/theme.js و /api/themes/:id/assets/*)، src/themes/themeZipCore.ts (rewriteCssAssetUrls)، src/themeSdk/useThemeScript.ts (تأیید پارامتر v).
```

---

## پرامپت ۲ — تحویل بهینه‌ی تصویر (PageSpeed: Improve image delivery، صرفه‌جویی ~۳۰۱KiB)

```text
طبق گزارش PageSpeed، تصاویر صفحه‌ی اصلی بزرگ‌تر از اندازه‌ی نمایش دانلود می‌شوند. قالب bazino-arena از نسخه 3.2.0 خودش برای تصاویر الگومند /images/**-<width>.webp یک srcSet از واریانت‌های 320/480/640 می‌سازد (مثل getResponsiveSrcSet خودتان) و برای بقیه‌ی URLها فقط src می‌گذارد. کارهای باقی‌مانده سمت پورتال:

1) لوگو — مهم‌ترین مورد (بالای صفحه، همه‌ی زبان‌ها):
   /logo.png یک PNG سیاه‌وقهوه‌ای 256×256 و ~54KB است که در 42px نمایش داده می‌شود (هم در هدر سایت با img.brand-logo-guard، هم در قالب‌ها از props.logoUrl).
   یک نسخه‌ی بهینه بسازید و سرو کنید: logo.webp با عرض ~96px (~10-15KB) و در صورت امکان srcset/logoUrl مناسب؛ سپس logoUrl که به props قالب می‌رسید و src هدر را به فایل جدید ببرید. صرفه‌جویی ~50KB در هر بارگذاری.

2) کامل بودن ست واریانت‌ها: مطمئن شوید هر فایل /images/home/*.webp که در داده استفاده می‌شود، واریانت‌های -320 و -480 (و در صورت وجود -640) را روی دیسک دارد؛ قالب این‌ها را در srcSet می‌خواهد. اگر واریانتی موجود نباشد، قالب به فایل اصلی برمی‌گردد (خراب نمی‌شود) ولی صرفه‌جویی از دست می‌رود.

3) فشرده‌سازی دوباره: PSI برای moba-strategy-960.webp «افزایش فشرده‌سازی» را هم پیشنهاد می‌دهد (~28KB صرفه‌جویی) — کیفیت 72-80 وبپی این مجموعه را بازتنظیم کنید.

4) قرارداد داده (بلندمدت): در داده‌ای که به قالب‌ها می‌دهید (gameGenres، loungeSections و…) فیلد imageUrlSmall (یا آرایه‌ی srcset با عرض‌های واقعی) را اضافه کنید تا قالب‌ها به الگوی نام‌گذاری فایل وابسته نباشند؛ قالب bazino-arena آماده‌ی مصرف آن است.

فایل‌های درگیر: public/logo.png (و مکانیزم سرو لوگو)، اسکریپت/دستور تولید واریانت‌های public/images/home/، server/sampleData.ts و dataProviders (فیلدهای تصویر داده‌ها).
```

---

## پرامپت ۳ — رفع شیفت چیدمان (PageSpeed: CLS 0.157 — سهم پورتال)

```text
طبق گزارش PageSpeed، صفحه‌ی اصلی CLS ≈ 0.157 دارد (آستانه‌ی خوب: < 0.1). قالب bazino-arena از نسخه 3.3.0 برای متن اسلاید هرو فضای عمودی رزرو کرده (شیفت 0.048 آن قطع شده)؛ دو شیفت بزرگ باقی‌مانده (main با 0.078×۲) سمت اسکلت سایت است:

1) ظاهر شدن دیرهنگام هدر (بزرگ‌ترین مورد): <ThemeRegion name="header"> در App.tsx مقدار pending نمی‌گیرد؛ تا آماده‌شدن theme.js هیچ هدری رندر نمی‌شود و بعد هدر یک‌باره ظاهر شده و کل main را به پایین هل می‌دهد. برای header یک pending با ارتفاع ثابت (اسکلت هم‌ارتفاعِ هدر، مثلاً min-h-[64px]) بدهید تا ارتفاع از اول رزرو شود — یا هدر پیش‌فرض را بی‌درنگ رندر کنید.

2) جایگزینی placeholder صفحه‌ی اصلی: در App.tsx (~خط 562) و HomeTab.tsx (~خط 643) placeholder فقط min-h-[600px] است در حالی که هوم واقعی قالب چند هزار پیکسل است؛ هنگام سواپ، فوتر و هر چه زیر است جابه‌جا می‌شود. شیفت عناصر خارج از دید امتیاز منفی ندارد؛ placeholder را به min-h-screen (حداقل یک viewport کامل) تغییر دهید تا فوتر حین سواپ زیر صفحه بماند.

3) CSS قالب‌های سروری بعد از اولین paint با JS تزریق می‌شود (تغییر استایل ناگهانی). theme.css قالب فعال را قبل از اولین رندر بارگذاری کنید: در index.html لینک no-cache به /api/themes/<activeId>/theme.css (activeId از سمت سرور در bootstrap تزریق شود) یا به‌صورت هم‌زمان در بوت.

4) فونت‌های محلی (Rajdhani/Vazirmatn در index.css): font-display: optional یا preload شوند تا متریک تیترها بعد از paint عوض نشود.

5) اسلایدهای ادمین با setTimeout ۲.۵ ثانیه‌ای در App.tsx fetch می‌شوند؛ اگر ممکن است در همان bootstrap/اولین رندر داده شوند (قالب حالا فضایش را رزرو کرده، ولی داده‌ی زودتر = شیفت صفر).

فایل‌های درگیر: src/App.tsx (ThemeRegion header، placeholder، fetch اسلایدرها)، src/components/HomeTab.tsx (placeholder)، index.html / src/themes/index.ts (تزریق CSS قالب فعال)، src/index.css (font-display).
```

---

## پرامپت ۴ — کشف‌پذیری LCP (PageSpeed: LCP request discovery — سهم پورتال)

```text
طبق گزارش PageSpeed، تصویر LCP صفحه (پوستر هروی قالب فعال) در سند اولیه قابل کشف نیست چون سایت SPA است و همه‌چیز بعد از اجرای JS رندر می‌شود. قالب bazino-arena از نسخه 3.4.0 پوستر را به‌صورت <img fetchpriority="high"> (بدون lazy) رندر می‌کند؛ برای اینکه خیلی زودتر از رندر JS هم کشف شود:

1) هنگام سرو HTML (مثل همان جایی که بوت‌استرپ/activeThemeId تزریق می‌شود)، برای قالب فعال یک تگ preload به head اضافه کنید:
   <link rel="preload" as="image" href="/api/themes/<activeThemeId>/assets/<poster>" fetchpriority="high">
   که <poster> از theme.json قالب فعال خوانده شود (فیلد media.heroPoster؛ قالب bazino-arena مقدار assets/hero-poster.webp و برای موبایل media.heroPosterSmall = assets/hero-poster-small.webp را اعلام کرده است).
   در نمایشگرهای باریک (max-width: 800px) واریانت small را preload کنید؛ می‌توانید با media attribute روی لینک یا دو preload با media="(max-width:800px)".
   اگر قالبی media.heroPoster نداشت، preload نکنید.

2) جایگزین/مکمل بلندمدت: prerender یا SSR صفحه‌ی اصلی تا عنصر LCP در HTML اولیه باشد.

3) توجه: preload فقط وقتی کمک می‌کند که URL دقیقاً همان URLی باشد که قالب رندر می‌کند (قالب از assetsBase استفاده می‌کند و در موبایل واریانت کوچک را برمی‌دارد)؛ پس URL را از همان مبدأ بسازید (readThemeCss/assetsBase + media.heroPoster*).

فایل‌های درگیر: server.ts (سرو HTML و تزریق head)، server/themeStore.ts (خواندن theme.json قالب فعال)، src/App.tsx یا bootstrap (اگر از سمت کلاینت اضافه می‌شود).
```

---

## پرامپت ۵ — زنجیره‌ی درخواست‌های حیاتی + preload آگاه از قالب (PageSpeed: Network dependency tree)

```text
طبق گزارش PageSpeed، بیشینه‌ی تأخیر مسیر حیاتی 844ms است و عجیب‌ترین گره‌اش یک درخواست به kinesis.us-east-1.amazonaws.com است (844ms، صفر بایت). سه اقدام:

1) شکار و حذف درخواست kinesis: در کل ریپوی bazino-gamenet-portal هیچ ارجاعی به kinesis/amazonaws وجود ندارد (جستجو کردم)؛ پس این درخواست از لایه‌ی هاست/پروکسی/CDN جلوی bazino.pro تزریق می‌شود (احتمالاً اسکریپت مانیتورینگ/RUM). پیدا کنید (باندل نهایی سرو‌شده را در مرورگر باز کنید و initiator درخواست را در DevTools ببینید؛ با هاست/پنل زیرساخت هم چک کنید) و سپس: حذفش کنید یا حداقل بعد از window load defer کنید. یک درخواست 844ms با صفر بایت که در مسیر حیاتی است، هزینه‌ی خالص است.

2) preload موجود در index.html آگاه از قالب نبود! الان یک preload ثابت برای تصاویر هروی پیش‌فرض (esports-480/800/960.webp با imagesrcset) دارد؛ وقتی قالب نصب‌شده (مثل bazino-arena) فعال است، LCP واقعی پوستر قالب است نه esports — یعنی تصویر اشتباه با اولویت بالا دانلود می‌شود و LCP واقعی preload نمی‌شود. این preload را داینامیک کنید: وقتی قالب فعال theme.json با media.heroPoster دارد، preload همان پوستر قالب باشد (با واریانت موبایل media.heroPosterSmall — شرح در پرامپت ۴)؛ وقتی قالبی فعال نیست/پیش‌فرض است، همان esports فعلی بماند. ساده‌ترین راه: سرو HTML از سمت سرور با head تزریق‌شده بر اساس قالب فعال.

3) کاهش زنجیره: باندل SPA (36KB در 419ms) بعد از HTML می‌آید — اگر عملی بود، پارتیشن‌بندی/defer بخش‌های غیرحیاتی باندل؛ HTML اولیه هم 28.7KB است (برای یک SPA که #root خالی سرو می‌کند بزرگ است — استایل‌های inline/bootstrap اضافه دارد؟ باریک‌اش کنید).

فایل‌های درگیر: index.html (preload ثابت)، server.ts (سرو HTML و تزریق head بر اساس قالب فعال)، زیرساخت هاست/پروکسی (منبع kinesis).
```

---

## پرامپت ۶ — موارد پایانی PageSpeed (robots.txt، خطاهای کنسول، باندلها، لوگو، Agentic)

```text
موارد باقی‌مانده‌ی گزارش PageSpeed که سمت پورتال است:

1) robots.txt نامعتبر است (۳۵ خطا — دسته‌ی SEO). یک robots.txt استاندارد بسازید (User-agent/Allow/Disallow و در صورت نیاز Sitemap). اگر سایت باید ایندکس شود، مطمئن شوید صفحات اصلی را بلاک نمی‌کند.

2) «Browser errors were logged to the console» و «Issues were logged to the Issues panel»: در تب Console/Issues کروم روی bazino.pro ببینید چه خطاهایی ثبت می‌شود — به‌احتمال زیاد همان درخواست kinesis تزریقی (پرامپت ۵) و فونت‌های گوگل بلاک‌شده‌اند؛ هر دو باید پاک شوند تا Best Practices کامل سبز شود.

3) بهداشت باندلهای JS: PSI موارد Duplicated JavaScript، Legacy JavaScript (پلیفیل‌های بی‌مورد)، Reduce unused JavaScript و Render-blocking requests را علامت زده — پارتیشن‌بندی باندل (حذف کد تکراری بین index/HomeTab، target مدرن ES20xx برای مرورگرهای امروزی، defer بخش‌های غیرحیاتی) را بررسی کنید.

4) «Serves images with low resolution» (Best Practices): تصاویری که رزولوشن طبیعی‌شان از اندازه‌ی نمایش کوچک‌تر است — لوگوی ۲۵۶px دیده می‌شود؛ با اصلاح پرامپت ۲ (لوگوی وبپی با عرض مناسب و srcset) این هم حل می‌شود.

5) Agentic Browsing (جدید Lighthouse): llms.txt ندارد یا استاندارد نیست و accessibility tree کامل form نیست — یک llms.txt ساده (معرفی سایت + مسیرهای اصلی) اضافه کنید و ساختار ARIA هدر/دکمه‌های آیکونی را بازبینی کنید (همان‌ها که «دکمه بدون نام accessible» هم شده‌اند).

6) آیتم‌های دستی Trust and Safety (HSTS قوی، COOP، XFO/CSP against clickjacking، Trusted Types) را طبق چک‌لیست Lighthouse بازبینی و در صورت امکان روی هدرهای سرور فعال کنید.

فایل‌های درگیر: public/robots.txt، index.html، vite.config.ts (build/target/چانک‌ها)، server.ts (هدرهای امنیتی)، public/logo.png.
```

---

*(پایان — ۶ پرامپت؛ فایل را به‌ترتیب به ایجنت پورتال بدهید)*

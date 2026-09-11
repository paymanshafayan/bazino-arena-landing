# پرامپت ایجنت پورتال — نصب و راه‌اندازی قالب «Hub» (bazino-hub)

> **مخاطب:** ایجنت ریپوی `paymanshafayan/bazino-gamenet-portal`
> **منبع قالب:** ریپوی `paymanshafayan/bazino-arena-landing`، برنچ **`main`** (پس از مرج `arena/01a07f75` — بازبینی PDF با ویژن، حذف PayTR، آرت‌ورک Games، حالت‌های Empty/Loading) — پوشه‌ی `hub/`
> **تاریخ:** 2026-09-07 · به‌روزرسانی 2026-09-08 (پرداخت حضوری، بدون PayTR در قالب)
> **پیوست‌های لازم که ایجنت پورتال باید بخواند:**
> - `hub/README.md` — نقشه‌ی فاز Hub
> - `hub/PORTAL-PDF-DECISIONS.md` — **تصمیم‌های ۱۶گانه‌ی کارفرما (مستند و لازم‌الاجرا)**
> - `hub/reference/hasti-hub-theme-guide.pdf` — راهنمای ۲۱ صفحه‌ای طراحی کارفرما (مرجع نهایی بصری)
> - `hub/previews/theme-*.png` — ۹ اسکرین‌شات خروجی مورد انتظار (home/games/events/weekly/season/brackets/shop/food/profile/contact)
>
> نحوه‌ی استفاده: متن داخل کادر ` ```text ` را کامل (بدون حذف) به ایجنت پورتال بدهید.

---

## پرامپت (کپی-پیست)

```text
وظیفه‌ات: قالب «Hub» بازینو را در پورتال نصب‌پذیر و کارآمد کنی — یعنی قالب به‌صورت ZIP از پنل ادمین نصب شود، فعال شود، و همه‌ی صفحاتش با داده‌های واقعی پورتال (نه دمو استاتیک) کار کنند.

## ۰) زمینه (حتماً بخوان)

- پورتال شما Theme SDK دارد: قرارداد رسمی در src/themes/README.md، لیست regionها در src/themeSdk/sdk.ts (THEME_REGIONS فعلاً: home, header, hero, home.*, footer, mobileNav)، mount و props در src/themeSdk/ThemeRegion.tsx، فریم لوکیشن در src/themeSdk/LocationFrame.tsx، پارسر ZIP در src/themes/themeZipCore.ts، سرو assets و CSP در server.ts.
- قالب فعال فعلی: bazino-arena-theme v4.5.5 (id: bazino-arena، regions: home, header). این قالب باید دست‌نخورده بماند و قابل برگشت.
- طراحی کامل «Hub» (طبق PDF کارفرما «راهنمای قالب هاب» + ۱۶ تصمیم تأییدشده) به‌صورت دموی React در ریپوی landing ساخته و تأیید شده است:
  - ریپو: paymanshafayan/bazino-arena-landing، برنچ: arena/01a07c28-bazino-arena-landing
  - سیستم طراحی مشترک: hub/design-system/ (توکن‌ها، NeonWire، هدر/فوتر، ویجت‌ها)
  - قالب کامل ۱۷ صفحه: hub/theme/ (Home, Games, Events hub, Weekly, Special, Season, Register, Brackets, Shop, Food, Club, Blog, Chat, Profile, Contact, Rules, 404)
  - براکت ۳۲نفره: hub/bracket-demo/
  - خروجی‌های بصری مورد انتظار: hub/previews/theme-*.png
  - تصمیم‌های ۱۶گانه (مستند): hub/PORTAL-PDF-DECISIONS.md
- مهم: دمو از داده‌های نمونه (hub/theme/data.ts) استفاده می‌کند؛ قالب نصب‌شده باید از props/داده‌ی پورتال بخواند.

## ۱) فاز A — قابلیت‌های سمت پورتال (تغییرات پورتال)

1) **رفع باگ پارسر ZIP (اول همه‌چیز):** src/themes/themeZipCore.ts entryهای پوشه‌ای ZIP را مثل فایل می‌شمارد و نصب هر قالبی با زیرپوشه می‌شکند (EEXIST). فیکس: قبل از پردازش، if (raw.endsWith('/')) continue; — بعد از آن test نصب را با قالبی که assets/ داخلش زیرپوشه دارد چک کن.

2) **سازگاری با «layout: hub» در theme.json:**
   - فیلد اختیاری "layout" اضافه شود: "classic" (پیش‌فرض، رفتار فعلی) یا "hub".
   - وقتی قالب فعال layout: "hub" باشد، صفحات عمومی زیر به‌جای صفحات پیش‌فرض پورتال از regionهای hub قالب رندر شوند:
     / (هوم)، /games، /events، /events/weekly، /events/special، /events/season، /events/brackets، /events/register، /shop، /food، /club، /blog، /chat، /profile، /contact
   - برای این کار THEME_REGIONS را با regionهای صفحه‌ای hub.* گسترش بده (مثلاً hub.home, hub.games, hub.events, hub.weekly, hub.special, hub.season, hub.brackets, hub.register, hub.shop, hub.food, hub.club, hub.blog, hub.chat, hub.profile, hub.contact, hub.footer, hub.mobileNav) یا اگر معماری بهتری ترجیح می‌دهی (مثلاً یک region واحد hub.page با پارامتر pageId) پیشنهاد بده و مستند کن.
   - کروم (هدر/فوتر/ناوبری موبایل) در حالت hub از regionهای hub قالب بیاید؛ در حالت classic هیچ تغییری نباشد.
   - صفحات /legal/*، /payment/*، مودال پرداخت و پنل ادمین: **هرگز دست نزن** (قانون ثابت پورتال).

3) **Props واقعی برای regionهای hub** (ThemeRegion باید این‌ها را به regionهای hub.* بدهد):
   - user, onLogin, onLogout — ورود/خروج واقعی پورتال (OTP موبایل + تب رمز). قالب حق ندارد OTP دمو/کد ثابت داشته باشد.
   - settings — آدرس، تلفن، ساعت کاری، شبکه‌های اجتماعی از پنل ادمین (club_*). لوگو فقط از props.logoUrl.
   - slides — اسلایدر هوم (اگر در settings هست).
   - tournaments — لیست واقعی weekly و special از بک‌اند: عنوان، تاریخ/روز، Entry Fee، جوایز 1st/2nd/3rd، ظرفیت، کاور، وضعیت (درحال ثبت‌نام/لایو/پایان).
   - bracket — براکت زنده‌ی موجود پورتال (backend + SSE): داده‌ی draw/نتیجه‌ها + جریان SSE به region hub.brackets وصل شود تا بدون رفرش به‌روز شود (همان قابلیت‌ی Live/TV overlay که پورتال الان دارد).
   - systems — تعرفه‌ی ایستگاه‌های بازی (85"/65"/kids/extra pad) از ادمین — برای صفحه‌ی Games و رزرو.
   - season — فصل جاری، لیدربرورد، امتیازات (سیستم 5/2/1 هفتگی و 10/4/2 ویژه از بک‌اند پورتال اگر موجود است، وگرنه از فیلدهای موجود season).
   - language (fa/en/ru/tr) + dir.
   - navigation helper: مسیرهای nav به صورت path ساده به region داده شود؛ region از مکانیزم ناوبری فعلی پورتال (navigateStandalone یا pushState — هرچه در ThemeRegion برای regionهای فعلی استفاده می‌شود) پیروی کند تا SPA باقی بماند.

## ۲) فاز B — ساخت قالب نصب‌پذیر (تبدیل دمو → ZIP)

4) از کد hub/ در ریپوی landing قالب bazino-hub-theme.zip بساز (id: "bazino-hub"، layout: "hub"، نسخه‌ی ۱٫۰٫۰):
   - theme.js: کد TSX موجود را به ES5 خالص تبدیل کن (دقیقاً مثل theme.js فعلی bazino-arena: var/function، بدون arrow/const/optional-chaining/eval/new Function/setInterval — تایمر فقط rAF مشترک). wouter و React Context استفاده نشود؛ ناوبری از helper props و state از props بیاید.
   - render(props) ترجیحاً React element (SDK فعلی)؛ guard استاندارد: if (!SDK || !SDK.registerComponent) return;
   - CSS: فایل‌های hub/theme/theme.css + hub/design-system/*.css را ادغام/بازچین کن (حذف تکراری‌ها، توکن‌ها در ریشه body[data-theme='bazino-hub']).
   - assets: همه‌ی تصاویر/فونت‌ها داخل ZIP (assets/). فونت‌های @fontsource (Orbitron، Rajdhani، و دو فونت تزئینی Great Vibes/Pacifico اگر استفاده شد) را به woff2 استخراج و باندل کن — **صفر درخواست خارجی**.
   - ساختار ZIP: بدون entry پوشه‌ای (zip -D) تا باگ پارسر (حتی بعد از فیکس) مشکلی نسازد؛ فونت‌ها تخت در assets/.
   - strings چهارزبانه با makeThemeStrings — تمام کلیدهای جدول T در hub/theme/HubContext.tsx را بردار و معادل fa/tr/ru آن‌ها را بنویس (متن انگلیسی دمو هم حفظ شود).
   - **هیچ iframe نباید در قالب باشد** (طبق PDF §6 و تصمیم #11: Location فقط پین + آدرس + دکمه‌ی «OPEN IN GOOGLE MAPS» به‌صورت <a href> خارجی به google.com/maps/search/?api=1&query=…؛ iframe OSM فقط در LocationFrame تم کلاسیک باقی بماند).
   - داده‌های hub/theme/data.ts (WEEKLY/SPECIAL/LEADERBOARD/CHAT_THREADS/…) صرفاً نمونه‌اند؛ در قالب، داده از props بیاید و در نبود داده، empty state هماهنگ با تم نمایش داده شود (حالت‌های Empty/Error طبق PDF §21).
   - رفتارهای تعاملی دمو را حفظ کن: اسلایدر، تب‌ها، انتخاب KIDS/ADULTS/REQUESTS و جریان رزرو داخل Games (انتخاب ایستیشن + ساعت → «HOLD MY BAY»؛ **بدون پرداخت آنلاین** — پرداخت نقدی/کارتخوان در محل طبق PDF §۲۳ و بند ۱۵ اصلاح‌شده)، پاپ‌آپ ساعات روزبه‌روز با X، مودال ورود (OTP واقعی + تب رمز)، ۹ تب پروفایل با داده‌ی واقعی user، پروفایل/لوگوت فقط از props.

5) **تصمیم‌های ۱۶گانه (مستند و لازم‌الاجرا — متن کامل در hub/PORTAL-PDF-DECISIONS.md):**
   - ناوبری: HOME · GAMES · EVENTS · SHOP · FOOD & DRINKS · CLUB · BLOG · CHAT (بدون Gallery/Prices/About)
   - Games: چهار کارت KIDS / ADULTS / SYSTEMS & GEAR / GAME REQUESTS + جریان رزرو منتقل‌شده به داخل همین صفحه (رزرو بدون پرداخت آنلاین؛ پرداخت در محل)
   - Events: ۵ بخش (Weekly / Special / Season / Brackets / Register)
   - Shop و Food: ظاهر «COMING SOON» برای مهمان؛ منطق سفارش/ادمین/ایستگاه پورتال حفظ شود (وقتی فعال شد)
   - صفحه‌ی Gallery ساخته نشود؛ صفحه‌ی Prices جداگانه نباشد (تعرفه همان Games/رزرو)؛ About نباشد
   - Contact: بدون نقشه (فقط کارت موقعیت + لینک گوگل‌مپس)
   - پروفایل: همان ۹ تب پورتال با داده‌ی واقعی (ساده‌سازی ۶بخشی PDF اعمال نمی‌شود)
   - ورود: OTP موبایل پورتال + تب رمز (فرم کامل PDF جایگزین نمی‌شود)
   - Club/Blog/Chat در ناوبری بمانند و از داده‌های واقعی پورتال تغذیه کنند
   - چهارزبان (fa/en/ru/tr) با سوییچ در هدر
   - پرداخت: **در قالب Hub هیچ اشاره‌ای به PayTR/پرداخت آنلاین نباشد** (رزرو و ورودی تورنمنت = نقدی/کارتخوان در محل). درگاه PayTR پورتال دست‌نخورده می‌ماند و فقط خارج از قالب (فروشگاه/کافه وقتی فعال شد) استفاده می‌شود.
   - براکت: بک‌اند/SSE/TV overlay موجود پورتال = پوشش خواسته‌ی کارفرما؛ region hub.brackets باید همان داده‌ی زنده را نشان دهد (32 نفره، Mobile Responsive، تب‌های Weekly/Special، وضعیت‌های Live/Upcoming/Past)

## ۳) معیارهای پذیرش (QA — هر کدام باید سبز شود)

1. npm run audit:theme -- bazino-hub-theme.zip → canInstall: true (بدون هشدار دامنه‌ی خارجی)
2. نصب از API/پنل ادمین + فعال‌سازی: همه‌ی ۱۵ مسیر hub رندر می‌شوند؛ console بدون خطای CSP/JS؛ Network بدون هیچ درخواست خارجی (فقط <a href> خروجی مثل wa.me/instagram/google maps)
3. تطبیق بصری با hub/previews/theme-*.png (۹ اسکرین‌شات) در viewport دسکتاپ 1440×900 و موبایل 390×844 — به‌ویژه: هیچ باند خالی زیر فوتر نباشد (فوتر sticky به پایین صفحه)، هیچ جعبه‌ی سفید/خام نباشد
4. ورود/خروج: OTP واقعی کار کند؛ بعد از logout و رفرش کاربر لاگین‌شده نباشد (درس 4.5.2 قالب کلاسیک — توکن واقعی کلید bazino.authToken است)
5. براکت: با فعال‌کردن SSE، تغییر نتیجه‌ی یک بازی بدون رفرش روی صفحه اعمال شود؛ حالت TV/Fullscreen حفظ شود
6. رزرو Games: انتخاب ایستیشن/ساعت → دکمه‌ی HOLD MY BAY → رزرو با کد پیگیری ثبت شود (بدون درگاه پرداخت؛ متن «Cash or card at the desk»)
7. بازگشت‌پذیری: غیرفعال‌کردن bazino-hub و فعال‌کردن bazino-arena یا تم پیش‌فرض باید بلافاصله همه‌چیز را به حالت قبل برگرداند؛ صفحات legal/payment/ادمین در هر دو حالت دست‌نخورده
8. Lighthouse: رگرسیون محسوس نسبت به وضعیت فعلی نداشته باشد (فونت‌ها همه local، تصاویر assets کوچک)

## ۴) تحویل

- تغییرات پورتال روی برنچ arena/… جدید + PR به main با توضیح تغییرات
- فایل bazino-hub-theme.zip + اسکریپت بیلد قابل تکرار (مثل build-theme-zip.sh در landing: minify ES5 + sanity check regionها + zip -D) — تصمیم بگیر ZIP از کجا بیلد شود (ریپوی landing یا پورتال) و منبع واحد بماند
- مجموعه‌ای اسکرین‌شات از تم نصب‌شده (هر ۱۵ مسیر، دسکتاپ + موبایل برای home/events/brackets) برای بازبینی کارفرما
- اگر در میانه‌ی کار با مداخله‌ی محصول/معماری پورتال برخورد کردی، تصمیم را در PR مستند کن و قبل از ادامه با صاحب پورتال هماهنگ کن

نکته‌ی امنیتی/قانونی: هیچ آدرس/تلفن/مختصات/نامی در قالب هاردکد نشود؛ همه‌چیز از props.settings بیاید. لوگو فقط props.logoUrl. prefers-reduced-motion رعایت شود و حالت بدون-JS/SSR شکسته نشود.
```

---

## یادداشت برای ما (landing) — پیگیر این پرامپت

- اگر ایجنت پورتال خواست، دمو زنده‌ی landing در `/hub` (برنچ `arena/01a07c28-bazino-arena-landing`) برای مقایسه‌ی بصری در دسترس است.
- اگر در فاز B خواستند سورس hub را مستقیم در ریپوی پورتال port کنیم (نه تبدیل دستی به ES5)، می‌توانیم یک اسکریپت/راهنمای تبدیل دقیق‌تر بنویسیم — فعلاً پرامپت روی «تبدیل به ES5 به سبک theme.js فعلی» فرض دارد تا با قرارداد Theme SDK v2 سازگار بماند.
- **تغییرات باقی‌مانده‌ی سمت landing:** بیلد `bazino-hub-theme.zip` فعلاً انجام نشده (فاز B سمت پورتال است)؛ اگر صاحب پورتال ترجیح داد ZIP اینجا بیلد شود، `build-hub-zip.sh` را مطابق همین پرامپت بنویسیم.

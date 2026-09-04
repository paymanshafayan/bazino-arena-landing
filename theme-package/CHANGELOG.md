# CHANGELOG — Bazino Arena of Legends

## 4.5.3 — هدر transparent/absolute به درخواست کاربر (برگرداندن `bazino-header`)

- **درخواست مستقیم کاربر:** با وجود فیکس‌های 4.5.2 تست بصری کاربر می‌گوید «نصب کردم بازم تغییری نکرده» و صراحتا می‌خواهد کلاس زیر اعمال شود:
  ```css
  .theme-bazino-arena .bazino-header { align-items:center; background:transparent; border-bottom:1px solid rgba(255,255,255,0.08); color:var(--bz-text); display:flex; height:70px; min-height:70px; position:absolute; top:0; width:100%; z-index:50; backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); box-shadow:0 8px 32px rgba(0,0,0,0.45); }
  ```
  قبلا در 4.5.0-4.5.2 هدر به `background:rgba(9,14,28,0.96)` و `position:sticky` تبدیل شده بود (solid arena) که خلاف سلیقه کاربر برای هدر شیشه‌ای روی هیرو بود.
- **اعمال:** `theme-package/theme.css` بلوک `4b) header region` برای `.theme-bazino-arena .bazino-header` دقیقا به `background:transparent` و `position:absolute` برگردانده شد (سایر ویژگی‌ها `height 70px`, `backdrop-filter:blur(14px)`, `box-shadow` و `border` دست‌نخورده). `is-scrolled` همچنان `rgba(9,14,28,0.98)` می‌ماند تا بعد از اسکرول هدر خوانا شود. `site-header` (پورتال) همچنان solid/sticky می‌ماند — تغییر فقط روی `bazino-header` (ThemeRegion header) اعمال شد تا با درخواست کاربر همسو باشد.
- **سایر فیکس‌های 4.5.2 حفظ شد:** منوی زبان با پرچم و `mousedown+click+Escape`، `useId` یکتا برای `FlagGB`, `handleLogout` با `fetch('/api/auth/logout',credentials:'include')` و پاکسازی `bazino_token`/`bazino_mock_user`/`sessionStorage` و skip کردن IIFE روی هدر ری‌آکتی.
- **نسخه:** `theme.json` 4.5.2 → 4.5.3، زیپ بازسازی `regions home,header`.

## 4.5.2 — فیکس باقی‌مانده هدر: منوی زبان همچنان باز نمی‌شد + خروج با رفرش برمی‌گشت
- **گزارش بعد از 4.5.1:** کلیک روی نام کاربری درست به `/profile` می‌رود اما منوی زبان هنوز باز نمی‌شود؛ با رفرش دوباره وارد حساب می‌شود (logout ماندگار نیست).
- **ریشه‌یابی لندینگ `client/src/pages/Home.tsx`:** `FlagGB` از `React.useId` استفاده می‌کرد بدون `import React` → `React is not defined` و کل هدر crash می‌کرد (توضیح عدم باز شدن). همچنین `handleLogout` فقط `localStorage` را پاک می‌کرد و `fetch('/api/auth/logout')` نمی‌زد، پس سشن سرور باقی می‌ماند و `theme.js` با `fetch('/api/user')` دوباره کاربر را نمایش می‌داد. `mousedown` خارج بدون `click` و بدون `stopPropagation` باعث تداخل می‌شد و `clipPath id="lm-gb"` تکراری بود.
- **فیکس لندینگ:** `import { useId }` اضافه و `FlagGB` به `useId().replace(/:/g,'-')` با `clipPath id={clipId}` و `url(#clipId)` یکتا شد؛ `handleLogout` به `fetch('/api/auth/logout',{method:'POST',credentials:'include'})` + `localStorage.removeItem('bazino_token'/'bazino_mock_user')` + `sessionStorage.clear()` + `dispatchEvent('bazino:enhanceHeader'/'bazino:logout')` + `history.pushState` بدون `reload` ارتقا یافت؛ دکمه زبان به `onMouseDown stopPropagation` + `onClick stopPropagation+preventDefault` + `pointer-events-none` روی `ChevronDown` و `ul/li` با `stopPropagation` و effect خارج به `mousedown+click+keydown Escape` (پارتی پورتال) تغییر کرد تا باز/بسته شدن مطمئن شود.
- **فیکس پورتال `theme-package/theme.js`:** IIFE `site-header` اگر `[data-testid="language-menu"]` داخل `header` باشد (هدر ری‌آکتی لندینگ) کلا skip می‌کند تا منوی تکراری و `fetch('/api/user')` مزاحم ایجاد نشود؛ `flagEl` و `flagNode` (ArenaHeader) حالا `clipPath` را با `uid` رندوم یکتا می‌کنند؛ `ensureLang` به `toggleOpen` با `stopPropagation+preventDefault` + `mousedown` روی `btn/dd` با `stopPropagation` + listenerهای `mousedown+click+keydown` ارتقا یافت؛ `LANGS` GB بدون تغییر اما id یکتا در رانتایم؛ `fetch('/api/auth/logout')` هر دو مسیر (IIFE و ArenaHeader) به `credentials:'include'` + `sessionStorage.clear()` مجهز شد؛ دکمه زبان ArenaHeader هم `onMouseDown stopPropagation` گرفت.
- **CSS:** بدون تغییر ساختاری (4.5.1 قبلاً `ul/li` و `gap6` و `rounded12` را درست کرده بود).
- **نسخه:** `theme.json` 4.5.1 → 4.5.2، زیپ بازسازی `regions home,header` (terser ES5, zip -D).

## 4.5.1 — فیکس ۳ رگرسیون هدر (منوی زبان نمی‌افتاد، یوزرنیم به loyalty می‌رفت، خروج رفرش و بازگشت)
- **گزارش بعد از 4.5.0:** منوی زبان جدید اصلاً `dropdown` باز نمی‌کرد؛ کلیک روی نام کاربری به `/loyalty` (باشگاه) می‌رفت نه `/profile`؛ خروج (`logout`) صفحه را `reload` می‌کرد و دوباره لاگین برمی‌گشت (حلقه). مرجع بررسی شد: `paymanshafayan/bazino-gamenet-portal` شاخه `arena/01a067ac-bazino-gamenet-portal` (commit a403c2d) — هدر مرجع `src/App.tsx:884-927` با `ThemeRegion name="header"` و `LanguageMenu` (flag SVGها IR/GB/RU/TR، دکمه `Flag+code+ChevronDown`، `ul[role=listbox]` با `li[role=option] Flag+code bg-primary active`، بستن با `mousedown` containment + `Escape`)، لینک پروفایل `href="/profile"` + `navigateStandalone('/profile')` (`src/utils/routes.ts` → `ProfilePage`), `InitialAvatar` با `hash hue`, خروج `fetch('/api/auth/logout',POST)` + `clearAuthToken()` + `setUser(null)` + `setActiveTab('home')` بدون `reload`.
- **فیکس landing `client/src/pages/Home.tsx`:** imports افزودن `ChevronDown` + کامپوننت‌های `FlagIR/GB/RU/TR/Flag` (کپی SVGهای پورتال بدون emoji/CDN), `LANGUAGE_OPTIONS (id/code/country/full)` جای `langOptions` قدیمی, `langMenuRef`، اثر `mousedown` + `keydown Escape` با `ref.contains` جای `click` ساده, دکمه زبان به `Flag + code + ChevronDown (rotate-180)` + `ul > li[role=option]`، استیت `user` با `displayName`, تابع `openProfile` از `"/loyalty"` به `"/profile"` (assign با fallback hash), `persistUser` و `handleLogout` بدون `reload` ( `localStorage.removeItem('bazino_token')` + `history.pushState('/')` + `popstate`), رندر آواتار با `displayName || username` و `hashHue(displayName||username)` و `@username`/`displayName`, استایل `index.css` برای `bazino-lang-btn/svg` و `ul/li` و `is-active bg gold`.
- **فیکس پورتال `theme-package/theme.js`:** IIFE `site-header` بازنویسی به parity کامل: `LANGS` با `flag` SVG رشته‌ای, `flagEl()`، `findRightContainer` تعمیم (`.flex.items-center.gap-4` / `.header-actions` / fallback), `ensureLang` با `mousedown`/`keydown` + `wrap.contains` + `aria-haspopup=listbox` + `ul[role=listbox]` با flag+code, `navigateToProfile` به `history.pushState('/profile')` + fallback `assign('/profile')` جای `navigateToLoyalty`, `enhanceUser` با `displayName` و `avatarUrl` و `data-header-profile-link` و `logout` بدون `reload` (clear `bazino_token`+`bazino_mock_user`, remove avatar/link, `dispatchEvent('bazino:enhanceHeader')` + `pushState('/')`), `ArenaHeader` بازنویسی ES5 به flags: `LANGS` با flag, `flagNode()` via `dangerouslySetInnerHTML`, `langWrapRef` + `mousedown/Escape` effect, دکمه زبان `Flag+code+▾ rotate`, dropdown `ul/li`, یوزر `a href="/profile" data-header-profile-link` + `img avatarUrl` یا `gradient hue` + `displayName||@username`, `handleLogout` بدون reload, `openProfile` به `/profile`.
- **CSS `theme-package/theme.css` + `client/src/index.css`:** `bazino-lang-btn` به `inline-flex gap6px min-width 64/120px rounded-full` + `svg 20×13 rounded 2px`, `bazino-lang-dropdown` به `ul list-style none min-width 120px rounded12px` + `li reset`, `bazino-lang-opt` به `flex gap8px rounded8px` + `is-active bg gold text black` (از شفاف/حاشیه قبلی) — همسو با `bg-dark-card` پورتال و `bg-primary` active.
- **نسخه:** `theme.json` 4.5.0 → 4.5.1، زیپ بازسازی `regions home,header` (terser ES5, zip -D).

## 4.5.0 — هدر سالید آرنا + منوی زبان + آواتار + ورود/خروج (بازطراحی بر اساس پورتال فعلی)

- **درخواست جدید کاربر (پس از 4.4.9):** هدر دیگر نباید `transparent !important / fixed overlay / is-scrolled glass` باشد؛ باید مثل پورتال فعلی **سالید مات با بلار** باشد، شامل **منوی زبان**، **ورود/خروج واقعی**، **نام کاربری کلیک‌پذیر به پروفایل (loyalty)** و **آواتار تصویر کاربر** بدون متن خالی `@`. هفت فصل، ES5، rAF، بدون setInterval، `--bz-*` حفظ شد — تمرکز این نسخه فقط هدر است.
- **CSS (theme-package + landing):**
  - `theme-package/theme.css` بلوک 4) header بازنویسی: `position: sticky top:0 h=70px solid rgba(9,14,28,0.96) backdrop-blur(14px) border-white/08 shadow 0_8_32 black/45 + ::after gold linear opacity .24 همیشه` — `position:fixed!important` حذف، `sticky top:0 z-50 full-bleed` حفظ.
  - کلاس‌های `bazino-fallback-header` و `bazino-header` یکسان سالید 70px sticky شدند. استایل‌های جدید `bazino-lang-wrap/btn/dropdown/opt(is-active)`, `bazino-avatar 32px circle border gold/35`, `bazino-user-btn hover`, `button[aria-label="Logout"]`, `bazino-header-inner flex`, `bazino-header-brand-text`, `bazino-header-tab with ::after gold`, `bazino-header-actions/lang/reserve/icon` اضافه.
  - `client/src/index.css` — `.site-header` از `fixed 80px transparent -> is-scrolled glass` به `sticky 70px solid rgba(9,14,28,0.96) blur14 + hairline .24` تغییر؛ `.site-header--scrolled` همچنان solid با shadow بیشتر؛ `.hero-content padding-top 108 -> 42` برای sticky؛ استایل‌های `bazino-lang-* / avatar / user-btn / header-user / header-icon.is-logout / auth overlay/card` اضافه (parity با theme).
- **JS — theme-package/theme.js:**
  - IIFEهای 4.4.2/4.4.9 (fallback + fixed) حذف، با IIFE واحد 4.5.0 جایگزین: `getLang / setLang (cyber_lang + reload) / hashForName / makeAvatar (hsl hue + initial) / findRightContainer / ensureLang (dropdown FA/EN/RU/TR) / navigateToLoyalty (click nav loyalty) / enhanceUser (fetch /api/user, fix empty @, inject avatar+user-btn clickable, preserve/create logout, handle not-logged loginBtn) / enhance (sticky !important + enhanced attr) + MutationObserver + retries 0.3/0.9/2/4s + bazino:enhanceHeader` — ES5 کامل.
  - `ArenaHome` fallback-header effect حذف و به `dispatchEvent('bazino:enhanceHeader')` ساده شد.
  - `ArenaHeader` بازطراحی: `language/dir/ts/user/activeTab/onNavigate/logoUrl` + `R.useState(user)` + `langOpen` + `LANGS + hashForName/setLanguage/handleLogout/handleLogin/openProfile + useEffect sync user prop + fetch /api/user fallback + outside-click + is-scrolled shadow` + رندر کامل: brand + 8 tabs + **language dropdown button + avatar span (gradient hsl hash + initial) + @username button -> loyalty + logout svg + reserve button** — همه ES5 (`var/function`، بدون `=>`/`const`/`let`/`` ` ``/`?.`/`??`)، `style background linear-gradient hsl` رشته‌ای.
- **JSX — client/src/pages/Home.tsx:**
  - `LogOut` به imports، stateهای جدید `langMenuOpen / user (localStorage bazino_mock_user) / authOpen / authUsername / authError` + `langOptions / hashHue / persistUser / handleLogout / handleAuthSubmit / openProfile (-> /loyalty)`؛ `useEffect` زبان با `localStorage cyber_lang` و outside-click؛ هدر از `select.language-switcher` به **dropdown button `bazino-lang-btn/dropdown/opt` + avatar+username button (gradient hash hue) + logout icon + login button -> auth modal** تبدیل؛ مودال `bazino-auth-overlay/card` برای ورود mock (ذخیره localStorage، عدم خالی بودن username، کلیک به loyalty).
- **theme.json:** `version 4.4.9 -> 4.5.0`, رشته‌های `login/logout` در هر ۴ زبان اضافه.
- **سازگاری:** portal قدیمی theme region را mount نکند IIFE باز هم header موجود (`site-header`) را enhance می‌کند؛ login/logout از طریق `fetch /api/auth/logout` + `localStorage` + `CustomEvent bazino:openAuth/navigate` هم با پورتال stateful و هم mock landing کار می‌کند.
- **نسخه:** `theme.json` 4.4.9 → 4.5.0، زیپ بازسازی `3183582 bytes` (`regions home,header`).

## 4.4.9 — بازگشت به مرجع: هدر fixed روی هیرو (حذف پرنت/absolute نادرست)

- **ریشه‌یابی مرجع:** `client/src/pages/Home.tsx` و `client/src/index.css` بررسی شد: مرجع اصلاً هیچ پرنت مشترکی ندارد — `.site-header{position:fixed;top:0;left:0;right:0;height:80px;z-index:50}` جدای از `.hero{position:relative;min-height:820px;overflow:hidden}` و `.hero-content{padding-top:108px}` است. هیرو از 0 شروع می‌شود پشت هدرِ fixed قرار می‌گیرد و متن با `padding-top` زیر هدر نمی‌رود. رویکردهای 4.4.6-4.4.8 (wrapper `bazino-header-hero-wrap` + `slot display:contents` + انتقال هدر با `insertBefore` + `position:absolute`) با مرجع مغایرت داشت و حتی با 9-selector `!important` در استاتیک JSDOM PASS می‌داد ولی در پورتال `sticky` باقی می‌ماند (header خارج wrap دوباره ساخته می‌شد).
- **رفع CSS:** تمام بلوک 4.4.8 (wrap/slot/absolute + `isolation:isolate` + `display:contents` + 9-selector `absolute !important`) حذف شد؛ جایگزینِ 4.4.9 فقط `position:fixed !important` است:
  `body[data-theme] .site-header, .theme-bazino-arena .site-header, body[data-theme] header.site-header, html body[data-theme] .site-header {position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;z-index:50!important}` و همین override برای `.site-header.sticky`. `margin-top:0` هیرو و `width:100vw` full-bleed و شفافیت `is-scrolled` دست‌نخورده ماند.
- **رفع JS:** IIFE 4.4.8 (WRAP_CLASS/SLOT_ATTR/tryWrap/move + `contains`) به‌طور کامل حذف و با IIFE سادهٔ 4.4.9 جایگزین شد: `forceFixed` روی **هر** `.site-header` (`querySelectorAll`)،‏ `classList.remove('sticky')` + `style.setProperty('position','fixed','important')` + `top/left/right/width/z-index` با `!important`، همراه `MutationObserver` و ریتری `0.25/0.8/1.6/3s` و `load`. هیچ انتقال DOM، هیچ `slot`، هیچ `wrap` — دقیقاً الگوی مرجع.
- **رفع JSX:** `ArenaHome` به ساختار مرجع برگشت: `div.bazino-home` مستقیم `section.bazino-home-hero` را در بر می‌گیرد (هیچ `div.bazino-header-hero-wrap[data-bazino-wrap]` و هیچ `div.bazino-header-slot[data-bazino-header-slot]`). کامنت مرجع `client/src` در JSX اضافه شد.
- **نسخه:** `theme.json` 4.4.8 → 4.4.9، بازسازی زیپ.

## 4.4.8 — پرنت واقعی داخل JSX + فیکس ارث‌بری sticky (گزارش «پرنت وجود ندارد و هدر از کلاس sticky ارث‌بری می‌کند»)
- **گزارش دقیق:** ۴.۴.۷ والد را فقط با JS بعد از mount می‌ساخت — در بازرسی استاتیک زیپ (`theme.js` → `ArenaHome`) هیچ المان پرنتی دیده نمی‌شد («پرنت وجود ندارد») و `position: sticky` از کلاس Tailwind `.sticky` روی `header.site-header` با Specificity `(0,1,0)` حتی مقدار `absolute !important` را در برخی ریس‌ها خنثی می‌کرد («هدر از sticky ارث‌بری می‌کند»). React پورتال هم می‌توانست بعد از wrap، یک `header.site-header` جدید خارج wrap بسازد و `querySelector('.site-header')` فقط اولین header داخل wrap را بر‌می‌گرداند — هدر جدید منتقل نمی‌شد و `sticky` باقی می‌ماند.
- **رفع CSS:** قوانین `absolute !important` به `html body[data-theme] .site-header.sticky`, `html .site-header.sticky.sticky` و سلکتورهای `.bazino-header-hero-wrap[data-bazino-wrap]` گسترش یافت تا حتی در رقابت `!important` بر sticky پیروز شود. کلاس `.bazino-header-slot {display:contents}` (با fallback `@supports not (display:contents) {display:block;height:0}`) اضافه شد تا والد واقعی در DOM، کانتینر پوزیشنینگ باشد. `.bazino-header-hero-wrap[data-bazino-wrap="1"] {position:relative; isolation:isolate}` صریح شد.
- **رفع JS/JSX:** در `ArenaHome` والد واقعی حالا **در JSX استاتیک** وجود دارد: `div.bazino-header-hero-wrap[data-bazino-wrap="1"].bazino-top-container` که `div.bazino-header-slot[data-bazino-header-slot="1"]` و `section.bazino-home-hero` را به‌عنوان خواهرهای مستقیم در بر می‌گیرد — بازرسی استاتیک زیپ پرنت را می‌بیند، حتی قبل از اجرای اسکریپت. IIFE به `querySelectorAll('.site-header')` + `wrap.contains` + انتقال به `slot` بازنویسی شد: هر هدر خارج wrap (حتی duplicates ناشی از بازسازی React) به داخل slot منتقل، `classList.remove('sticky')` و `style.setProperty('position','absolute','important')` با `!important` اعمال می‌شود. `MutationObserver` + ریتری `0.25/0.8/1.6/3s` حفظ شد و fallback ساخت wrap برای کش قدیمی باقی ماند.
- **تأیید:** `grep -c bazino-header-hero-wrap theme-package/theme.js` و `grep bazino-header-slot theme-package/theme.js` و `grep -E "site-header\.sticky.*absolute" theme-package/theme.css` پرنت و override را نشان می‌دهد؛ JSDOM تزریقی تایید کرد `wrap` از ابتدا در DOMِ `ArenaHome` است و بعد از ۱s `header.parentElement===wrap` و `hero.parentElement===wrap` و `getComputedStyle(header).position===absolute` و `!contains('sticky')`.
- **نسخه:** `theme.json` 4.4.7 → 4.4.8، بازسازی زیپ.

## 4.4.7 — فیکس ارث‌بری sticky و پرنت واقعی (گزارش «هیچ پرنتی ساخته نشده»)
- **گزارش دقیق:** `position: sticky` از کلاس Tailwind `.sticky` روی `header.site-header` با Specificity `(0,1,0)` مقدار `absolute` قالب را خنثی می‌کرد و هیچ پرنت جدیدی در DOM دیده نمی‌شد — در نتیجه هدر همچنان در flow بالای `main` بود نه روی هرو.
- **رفع CSS:** قوانین جدید با Specificity بالاتر و `!important` برای `.site-header.sticky` اضافه شد: `body[data-theme] .site-header.sticky`, `.theme-bazino-arena .site-header.sticky`, `.bazino-header-hero-wrap .site-header`, `.bazino-top-container .site-header` همگی `position:absolute !important; top:0; left:0; right:0; width:100%; z-index:50`. بلوک قبلی `body[data-theme] .site-header {position:absolute}` سر جایش ماند. کلاس‌های جدید `.bazino-top-container` و `.bazino-header-hero-wrap {position:relative; isolation:isolate}` برای کانتینر والد اضافه شد.
- **رفع JS:** IIFE قبلی 4.4.6 فقط هدر را داخل `.bazino-home` می‌برد و والد جدیدی نمی‌ساخت. در 4.4.7 پرنت واقعی `.bazino-header-hero-wrap` داخل `.bazino-home` قبل از `.bazino-home-hero` ساخته می‌شود و **هر دو** `.site-header` و `.bazino-home-hero` به داخل آن منتقل می‌شوند تا خواهرهای مستقیم داخل یک پرنت واحد باشند. اسکریپت کلاس `sticky` را با `classList.remove('sticky')` حذف و `style.setProperty('position','absolute','important')` را با `!important` اعمال می‌کند، سپس با `MutationObserver` + ریتری `0.25/0.8/1.6/3s` و رویداد `load`، بازسازی هدر توسط React پورتال را دوباره wrap می‌کند. قبل از mount شدن `home` نیز `forceAbsolute` روی هدرِ بیرونی اعمال می‌شود تا هدر حتی بدون wrap هم `absolute` بماند.
- **تأیید:** `unzip -p bazino-arena-theme.zip theme.css | grep -E "bazino-header-hero-wrap|site-header.sticky.*absolute"` و `unzip -p theme.js | grep bazino-header-hero-wrap` پرنت و override را نشان می‌دهد؛ در DevTools هدر دیگر `sticky` ندارد و داخل `div.bazino-header-hero-wrap` قبل از `section.bazino-home-hero` است.
- **نسخه:** `theme.json` 4.4.6 → 4.4.7، بازسازی زیپ.

## 4.4.6 — هدر و هرو داخل یک کانتینر، هدر absolute
- **درخواست:** «هدر و هرو را داخل یک پرنت یا کانتینر قرار بده و پوزیشن هدر را ابسلوت قرار بده» — به‌جای `fixed` شناور مستقل، هدر باید همراه هرو داخل یک والد مشترک باشد و با `absolute` روی ویدئو بنشیند.
- **CSS:** `position:fixed` هدر به `position:absolute !important; top:0; left:0; right:0; width:100%; z-index:50` تغییر کرد؛ والدهای مشترک (`body[data-theme='bazino-arena']`, `.theme-bazino-arena`, `.app-bg-main` و خود `.bazino-home`) به `position:relative !important` تبدیل شدند تا کانتکس `absolute` شوند. `.bazino-home` نیز `position:relative` گرفت و کلاس جدید `.bazino-top-container {position:relative; isolation:isolate}` برای رَپر JS اضافه شد. `margin-top:0` هرو حفظ شد تا از ابتدای کانتینر پشت هدرِ شفاف قرار گیرد (`hero-content padding-top:108px` همچنان متن را زیر هدر نگه می‌دارد).
- **JS:** IIFE سراسری جدید (ES5) بعد از fallback-header اضافه شد: وقتی `.bazino-home` و `.bazino-home-hero` mount شدند، `.site-header` را به‌صورت فیزیکی به داخل `.bazino-home` قبل از `.bazino-home-hero` منتقل می‌کند (`home.insertBefore(hdr, hero)`) و کلاس `bazino-top-container` را به `home` می‌دهد — حالا هدر و هرو خواهرهای مستقیم داخل یک پرنت واحد هستند و هدر `absolute` نسبت به همان پرنت روی هرو می‌نشیند. `MutationObserver` + ریتری در `DOMContentLoaded/load` و ۰.۴/۱.۲/۲.۶ ثانیه، جابه‌جایی را پس از بازسازی هدر توسط Reactِ پورتال حفظ می‌کند. قبل از mount شدن `home` نیز هدر با `body`/`theme` کانتینر `relative` به‌صورت `absolute` روی هرو می‌نشیند (بدون پرش).
- **سازگاری:** `is-scrolled` (شفاف → شیشه تیره `rgba(5,8,14,0.82)+blur18px`) همچنان با `scrollY>8` کار می‌کند؛ شفافیت و خط طلایی مثل قبل. Full-bleed (`width:100vw` + `margin calc`) و `max-w-7xl` ریست دست‌نخورده ماند.
- **نسخه:** `theme.json` 4.4.5 → 4.4.6، بازسازی زیپ.

## 4.4.5 — حذف padding اضافی main (فیکس ارتفاع دوبرابر هدر)
- **گزارش:** بعد از 4.4.4 ارتفاع هدر دوبرابر شده بود.
- **علت:** برای جبران هدر `fixed`، به `main.w-full/.animate-fade-in` مقدار `padding-top:70px !important` و به `.bazino-home` مقدار `margin-top:-70px !important` اضافه شده بود — در مجموع 140px فضای اضافی و هدر دوبرابر دیده می‌شد.
- **رفع دقیقاً طبق دستور:** فقط همین ویژگی حذف شد — `padding-top:70px !important` از `main` و `margin-top:-70px` از `.bazino-home` هر دو حذف شدند؛ هدر همچنان `fixed` و شناور روی هیرو (`position:fixed; top:0; left:0; right:0; z-index:50` + شفاف/شیشه‌ای) باقی ماند، هیرو بدون آفست اضافی پشت هدر قرار می‌گیرد.
- **نسخه:** `theme.json` 4.4.4 → 4.4.5، بازسازی زیپ.

## 4.4.4 — هدر شناور روی هیرو (فیکس گزارش «هدر بالای main نه روی آن»)
- **مشکل گزارش‌شده:** هدر شفاف بود اما تگ `header.site-header` در DOM **بالای** `main` قرار داشت نه **روی** آن و حالت شناور (floating) نداشت — ویدئو پشت هدر دیده نمی‌شد، فقط یک نوار شفاف خالی بالای هیرو دیده می‌شد.
- **علت:** هدر `position:sticky` + هیرو `margin-top:-70px` تکیه بر هم‌پوشانی منفی داشت اما در فلکس کانتینر پورتال (`theme-… flex flex-col`) و با `overflow-x:hidden` هم‌پوشانی ناپایدار بود و در برخی رندرها margin collapse می‌شد؛ هدر همچنان در flow و بالای main می‌ماند.
- **رفع:** هدر به `position:fixed !important; top:0; left:0; right:0; width:100%; z-index:50` تغییر کرد — حالا از flow خارج و واقعاً روی `main`/هیرو شناور است؛ هیرو بدون `margin-top` منفی ( `margin-top:0` ) به‌طور طبیعی پشت هدر شفاف قرار می‌گیرد و با `hero-content padding-top:108px` متن زیر هدر نمی‌رود. حالت `is-scrolled` (شیشه تیره + blur) همچنان با اسکرول `>8px` فعال می‌شود (اسکریپت سراسری + MutationObserver 4.4.3 حفظ شد).
- **نسخه:** `theme.json` 4.4.3 → 4.4.4، بازسازی زیپ.

## 4.4.3 — هدر شفاف واقعاً قابل دید (فیکس گزارش 4.4.2)
- **علت باقی‌ماندن هدر تیره:** با وجود CSS شفاف در 4.4.2، دو عامل هدر را مات نگه می‌داشت: ۱) سلکتور فقط `.theme-bazino-arena .site-header` بود اما `bg-dark-card/90` و `backdrop-blur-xl` با تور خاص Tailwind مستقیم روی `header` بودند و `body[data-theme] .site-header` نداشتیم؛ ۲) هدر `sticky` بود و هیرو بعد از هدر می‌آمد — حتی با پس‌زمینه شفاف، ویدئو زیر هدر دیده نمی‌شد (هدر روی پس‌زمینه تیره body قرار می‌گرفت، نه روی ویدئو)؛ ۳) اسکریپت fallback فقط داخل `ArenaHome` (home) mount می‌شد، پس در تب‌های دیگر یا قبل از mount هدر تیره می‌ماند.
- **رفع CSS:** تمام سلکتورهای هدر به `body[data-theme='bazino-arena'] .site-header` (+ `.theme-…` + `header.site-header`) گسترش یافت، `background-image:none !important` اضافه شد، و overrideهای ضد Tailwind اضافه شد: `.site-header[class*="bg-dark-card"]` و `.site-header.backdrop-blur-xl` هر دو به شفاف/شیشه‌ای با `!important` نگاشت شدند؛ `body[data-theme] .site-header` حالا `position:sticky !important; top:0; z-index:40` و هیرو با `.bazino-home-hero{margin-top:-70px !important}` زیر هدر کشیده می‌شود تا ویدئو پشت هدر شفاف دیده شود (الگوی مرجع Hall of Legends). خط طلایی `::after` هم برای `body[data-theme]` نیز اعمال شد.
- **رفع JS:** اسکریپت fallback از داخل `ArenaHome` به یک IIFE سراسری (ES5) در سطح `theme.js` منتقل شد — مستقل از mount شدن home، با `data-bazino-fallback-bound`، `scrollY>8 → is-scrolled`، `MutationObserver` برای بازسازی هدر توسط React، و ریتری در `DOMContentLoaded` + 0.32/1.2/3ثانیه. اثر قبلی داخل `ArenaHome` به safety-net تبدیل شد و دیگر در unmount کلاس را حذف نمی‌کند (تا تب‌های دیگر شفاف بمانند).
- **نسخه:** `theme.json` 4.4.2 → 4.4.3، بازسازی زیپ (terser ES5, `zip -D`).

## 4.4.2 — تورنمنت متنی + شفاف/تمام‌صفحه واقعی (بازنویسی 4.4.1)
- **تورنمنت متنی (درخواست جدید):** تصاویر کارت‌ها به‌طور کامل حذف شد — `tournament-card img` + `tournament-image-wrap`/`overlay` + `getTournamentImage`/`vimg` + fallback تصویری. کارت‌ها ۱۰۰٪ از `props.tournaments` سرور می‌خوانند (همان `HomeTab.tsx: gameGenres/tournaments`): عنوان (`title`), بازی (`game`), وضعیت (`status`), تاریخ (`startDate`), هزینه (`registrationFee`), ظرفیت (`registeredTeamsCount/maxTeams`). فیلتر ژانر/سرچ/سورتِ موجود حفظ شد اما دیگر اسلاید دمو نشان نمی‌دهد؛ اگر آرایه خالی باشد به‌جای ۴ کارت، پیام فارسی «فعلا تورنومنت فعالی وجود ندارد.» (کلید `noTournaments` چهارزبانه) در `.tournament-empty` نمایش داده می‌شود. استایل جدید `.tournament-card--text` (گرادینت تیره، badge وضعیت، عنوان italic، متای هزینه/تاریخ، فوتر ظرفیت + فلش) جایگزین `aspect-ratio 3/4` تصویری شد — سازگار با RTL و ریسپانسیو.
- **هدر شفاف واقعی (اصلاح 4.4.1):** 4.4.1 فقط fallback-header را شفاف می‌کرد اما هدر پورتال (`site-header bg-dark-card/90 backdrop-blur-xl`) همچنان مات بود چون CSS قبلی `rgba(5,8,14,0.82)+blur` روی همه حالات اعمال شده بود. حالا base rule به `background:transparent !important; backdrop-filter:none` تغییر کرد و شیشه‌ی تیره فقط روی `.is-scrolled` می‌آید (`rgba(5,8,14,0.82)+blur(18px)`). خط طلایی `::after` هم `opacity:0` در top و `0.18` پس از اسکرول دارد — دقیقاً مثل مرجع «Hall of Legends».
- **تمام‌صفحه‌ی واقعی (اصلاح 4.4.1):** حاشیه‌ی گزارش‌شده از `div.max-w-7xl mx-auto pb-20` والدِ `themeComponentHostRef` (خط ۴۵۵ `App.tsx`) بود که `.bazino-home` را constrained می‌کرد. فیکس 4.4.1 (`body[data-theme] main.w-full` ریست) کافی نبود. حالا `body[data-theme] .max-w-7xl {max-width:none !important}` + `main > .max-w-7xl {margin/padding 0; width:100%}` و breakout واقعی `.bazino-home {width:100vw; margin:0 calc(50% - 50vw); max-width:100vw; overflow-x:hidden}` اضافه شد — هیرو بدون اسکرول افقی edge-to-edge می‌شود؛ `layout-frame` داخل همچنان `min(100%-64px,1320px)` برای خوانایی حفظ شد.
- **پرامپت پورتال (ریشه‌یابی):** اگر پورتال نتواند full-bleed را بپذیرد، پرامپت آماده: در `src/App.tsx` — شرطی کردن `className` والد themeComponentHostRef به `themeId==='bazino-arena' ? 'w-full' : 'max-w-7xl mx-auto...'` و `site-header` به `data-theme` متغیر (یا حذف `bg-dark-card/90` وقتی bazino فعال است). توضیح کامل در کامیت.
- **سایر:** `theme.json` 4.4.1 → 4.4.2 + کلید `strings.noTournaments` چهارزبانه؛ `theme.css`/`theme.js` بازسازی (terser ES5, `zip -D` بدون entry پوشه‌ای).

## 4.4.1 — فیکس ۳ رگرسیون بصری گزارش‌شده (هدر شفاف، تمام‌صفحه، کارت بی‌تصویر)
- **هدر شفاف:** منطق `is-scrolled` قبلاً فقط روی کامپوننت `ArenaHeader` (region header) کار می‌کرد که در پورتالِ فعلی mount نمی‌شود؛ هدر fallback پورتال (`site-header h-[70px] bg-dark-card/90`) همیشه مات بود. حالا `ArenaHome` با `useEffect` روی `.site-header` کلاس `bazino-fallback-header` می‌گذارد و در `scrollY>8` کلاس `is-scrolled` را toggle می‌کند (passive)؛ CSS fallback: بالای صفحه `background transparent + backdrop none + خط طلایی مخفی`، بعد از اسکرول `rgba(5,8,14,.82) + blur(18px) + border`. header ریجن جدید هم سر جایش ماند (پورتالِ جدید).
- **حاشیه / تمام‌صفحه:** گزارش حاشیه‌ی دور قالب ناشی از کانتینر والد پورتال (`main.w-full`/`animate-fade-in` + `layout-frame width min(100%-64px,1320px)`). هیروی تمام‌عرض (`bazino-hero-media inset:0`) قبلاً full-bleed بود، محتوا عمداً inset است. برای حذف حاشیه‌ی بیرونی، `body[data-theme]` و `main.w-full/.animate-fade-in` به `margin/padding 0 + max-width none` ریست شد و `.bazino-home {width:100%;margin:0}` صریح شد؛ breakout `100vw` اضافه نشد تا اسکرول افقی نسازد. `layout-frame` برای خوانایی حفظ شد.
- **کارت‌های بدون تصویر:** `experience-card` و `tournament-card` قبلاً وقتی `imageUrl|image` نداشتند خالی می‌ماندند؛ دیتای دمو/پورتال (`gameGenres`, `tournaments`) معمولاً تصویر ندارد → ۴ کارت خالی در اسکرین‌شات کاربر. حالا هر کارت همیشه تصویر دارد: `imageUrl || image || hero-poster-small.webp` (پوستر رسمی به‌عنوان fallback گرادینتی) + `image-shade` همیشه؛ `card()` helper هم همین fallback را گرفت. صفر کارت خالی.
- **نسخه:** `theme.json` 4.4.0 → 4.4.1، زیپ بازسازی (terser ES5, `zip -D`).

## 4.4.0 — هم‌ترازی بصری با لندینگ مرجع (۷ فصل ادیتوریال)
- **هدف:** رفع فاصله‌ی بصری که در مقایسه‌ی دو اسکرین‌شات (سایت vs مرجع) دیده شد — قالب روی سایت حالا تا حد پیکسل با `client/src` هم‌سو است؛ فوتر و نقشه (طبق قرارداد 4.2) مستثنا.
- **هیرو:** تایپوگرافی `Barlow Condensed` ایتالیک 9.2rem با خط دوم دوربری (`-webkit-text-stroke` via `<em>` → `splitHeroTitle()`), `hero-noise` + `hero-depth-grid` + `hero-cursor-rail` + متای صحنه (مختصات + کارت HALL OF LEGENDS) + `gold-marquee` اضافه شد؛ محتوا داخل `layout-frame` و دو ستونه (کپی چپ، متا راست) مثل Home.tsx.
- **Arena (02):** هدر فنی `CHAPTER 02 / CONSOLE ARENA` + ریل `4 STATIONS / CONSOLE ONLY / ISKELE / CYPRUS` + `intro-layout` (ایندکس 02/07، عنوان، aside آبی) + گرید ۴ کارته‌ی `experience-card` با عکس/شید/گلو/آیکون/لیبل `CONSOLE 01...` و `reveal` هاور — تصاویر از `gameGenres[].imageUrl` اگر موجود باشد.
- **Tournaments (03):** پس‌زمینه‌ی گرادینتی + `tournament-image-overlay`, لایه‌ی `tournament-layout` سه‌ستونه (کپی + کارت وضعیت `LIVE SIGNAL` + `tournament-discovery` با فیلتر/سرچ/سورت و ۴ کارت `tournament-card` با شید و لیبل ژانر).
- **Results (04):** `results-section` با `results-intro` (scene-tag, eyebrow, h2, p, button) + `scoreboard` سه‌ردیفه با `scoreboard-head/columns/foot` و ستون‌های `ROUND / PLAYERS / SCORE / MODE`.
- **Lounge (05):** `lounge-visual` با `lounge-slider-media`/`frame`/`shade`/`controls`/`stamp` + `lounge-copy` + `service-stack` سه‌ردیفه (VIP / CAFÉ / SCREEN) — گالری از `loungeSections[].imageUrl` با کنترل‌های قبلی/بعدی و وضعیت `SCENE 01/03 / AUTO/PAUSED`.
- **Passes (06):** پس‌زمینه‌ی سرمه‌ای سینمایی + `passes-layout` دو ستونه (heading + `cinematic-steps` با `process-step` شماره‌دار) — داده‌ی `pricingPackages` به‌صورت مراحل قیمت‌دار (عنوان + توضیح + قیمت + فیچر) نمایش داده می‌شود تا هم داده‌ی پورتال حفظ شود هم ظاهر مرجع.
- **Visit (07):** `visit-signal-section` با `visit-signal-layout` (کپی + کارت `visit-signal-card` شامل قاب OSM، نشان `LIVE LOCATION`, آدرس/تلفن از `settings`, دکمه‌ی Directions به OSM و متای `VISTAMARE HOTEL / ISKELE`).
- **CSS:** لایه‌ی بزرگ `4.4.0 REFERENCE PARITY` به `theme.css` اضافه شد — تمام کلاس‌های جدید (`layout-frame`, `arena-section`, `tournament-section`, `results-section`, `lounge-section`, `passes-section`, `visit-signal-section`, `gold-marquee` و ...) از `client/src/index.css` پورت شده و با `theme-bazino-arena .bazino-home` اسکوپ شده؛ ریسپانسیو 1000/760/460 و `prefers-reduced-motion` حفظ شد.
- **JS:** `splitHeroTitle()` برای شکستن عنوان اسلاید به دو خط (خط دوم `<em>` استروک)، ویرایش ۵ سکشن اصلی برای تطابق DOM با مرجع، حفظ تمام قراردادها (ES5, rAF, بدون setInterval/eval, بدون درخواست خارجی, `props.ts` + `props.dir` + `num()`).
- **نسخه:** `theme.json` 4.3.0 → 4.4.0, زیپ بازسازی شد (`zip -D` بدون entry پوشه‌ای, terser ES5 minify).
- **تست‌شده:** پارس ES5, مینیفای + sanity (regions home,header), بیلد زیپ 4.4.0.
- **تست‌نشده:** رندر بصری نهایی روی پورتال دپلوی‌شده (نیازمند نصب زیپ جدید + فعال‌سازی + هارد رفرش و مقایسه‌ی اسکرین‌شات با مرجع).

## 4.3.0 — کامپوننت هدر مرجع (region «header») طبق قرارداد جدید پورتال
- چرا هدر تعویض نمی‌شد: تا 4.2.1 قالب فقط CSS هدرِ خود پورتال را override می‌کرد و کامپوننت
  هدر ثبت نشده بود؛ پورتالِ جدید (`<ThemeRegion name="header">` در شاخه‌ی فعال ایجنت پورتال)
  فقط وقتی قالب `registerComponent('header')` داشته باشد هدر را جایگزین می‌کند، وگرنه fallback
  (هدر قدیمی) را می‌کشد.
- ArenaHeader طبق قرارداد (README/prompt پورتال): لوگو فقط از `props.logoUrl`، ۸ تب با
  `ts('nav.*')` (home/reservations/cafe/shop/tournaments/loyalty/blog/chat — همان NAV_TABS
  پورتال)، تب فعال طلایی + آندرلاین طلایی، چیپ کاربر از `props.user`، دکمه‌ی «رزرو سیستم»
  با قاب طلایی → `onNavigate('reservations')`. منوی زبان/ورود عمداً ساخته نشد (طبق قرارداد،
  کار سیستم است).
- رفتار مرجع: بالای صفحه شفاف، بعد از اسکرول شیشه‌ی تیره + خط مویی طلایی (listener پسیو،
  حذف در unmount)؛ موبایل: ناوبری مخفی (پورتال نوار موبایل خودش را دارد)، ارتفاع ۶۴px؛
  فارسی: Vazirmatn.
- پورتال قدیمی این region را mount نمی‌کند → ثبت بی‌اثر و بی‌خطر؛ استایل fallback هدر
  (4.1.0) سر جایش ماند.
- رشته‌ها: ۱۰ کلید جدید ×۴ زبان (nav.* ×8، navLabel، headerReserve) → ۹۷ کلید هم‌ارز؛
  regions = `["home","header"]`.
- تست‌شده: پارس ES5، ممیزی نصب پورتال، رندر SSR هدر (تب‌های fa/en، تب فعال، لوگو، چیپ
  کاربر، دکمه‌ی رزرو) + عدم رگرسیون home.
- تست‌نشده: رندر بصری روی پورتال دپلوی‌شده (نیازمند: پورتال شاخه‌ی جدید + فعال‌بودن قالب از
  پنل ادمین + هارد رفرش).

# CHANGELOG — Bazino Arena of Legends

## 4.2.1 — رفع خطای نصب EEXIST (زیپ بدون entry پوشه‌ای)
- علامت: نصب روی پورتال با `EEXIST: file already exists, mkdir
  '.../.bazino-arena.installing-…/assets/fonts'` شکست می‌خورد.
- ریشه: پارسر ZIP پورتال (fflate در `themeZipCore.ts`) **entryهای پوشه‌ای را هم مثل فایل**
  می‌گیرد؛ entry پوشه‌ی `assets/fonts/` بعد از نرمال‌سازی به کلید `fonts` تبدیل و به‌صورت
  **فایل صفر‌بایتی** نوشته می‌شود؛ سپس برای فایل واقعی `fonts/Vazirmatn-*.woff2` ساختِ
  پوشه‌ی `assets/fonts` با فایلِ موجود تداخل می‌کند → EEXIST. (زیپ‌های قبلی بدون
  زیرپوشه بودند، لذا سالم نصب می‌شدند.)
- رفع از سمت قالب (بدون وابستگی به پورتال): فونت‌ها تخت شدند
  (`assets/Vazirmatn-*.woff2`)، `.gitkeep` حذف شد و بیلد با `zip -D` زیپ را **بدون هیچ
  entry پوشه‌ای** می‌سازد → با نصاب فعلی پروداکشن هم سازگار است.
- اصلاح پیشنهادی برای پورتال (ریشه‌ای، برای قالب‌های آینده با زیرپوشه): در حلقه‌ی
  `parseThemeZip`، entryهای `endsWith('/')` skip شوند.
- تست‌شده: ممیزی نصب پورتال canInstall:true، رندر SSR، محتوای زیپ (صفر entry منتهی
  به `/`، صفر زیرپوشه).

# CHANGELOG — Bazino Arena of Legends

## 4.2.0 — نقشه OpenStreetMap + حذف کامل فوتر (تصمیم‌های پورتال)
1. **حذف Google Maps (کامل):** طبق تصمیم پورتال برای dodge کردن مشکلات تحریم گوگل، هیچ ارجاعی به
   Google Maps باقی نیست — نه iframe، نه لینک مسیریابی. نقشه‌ی بخش ۷ حالا **OpenStreetMap** است:
   embed از مختصات ثبت‌شده در پنل ادمین (`club_map_lat`/`club_map_lng` — پین قبرس شمالی/ایسکله) و
   لینک خروجی هم به OSM (`?mlat/mlng`)، نه گوگل. اگر SDK پورتال `locationFrom` داشته باشد، همان
   embed پورتال استفاده می‌شود (هم‌نسخه با نقشه‌ی خود پورتال) ولی لینک خروجی عمداً OSM می‌ماند.
   **هیچ مختصاتی هاردکد نیست:** بدون `club_map_lat/lng` و بدون SDK، نقشه به‌آرامی رندر نمی‌شود و
   کارت آدرس/تلفن می‌ماند (آدرس تهرانِ سمپل دیگر هیچ‌جا تزریق نمی‌شود).
2. **حذف فوتر از قالب:** به‌دلیل الزامات قانونی درگاه پرداخت، فوتر از محدوده‌ی قالب خارج شد —
   کامپوننت ArenaFooter، ثبت region «footer»، فراخوانی inline در home و همه‌ی CSS/رشته‌های فوتر
   حذف شدند. regions = `["home"]`؛ رشته‌ها ۹۰→۸۷ کلید در هر ۴ زبان.
- سازگاری با شاخه‌ی فعال پورتال (`arena/01a067ac-…`): `SDK.locationFrom`، تنظیمات
  `club_map_lat/lng/url` و seed قبرس شمالی در نظر گرفته شد.
- تست‌شده: پارس ES5، ممیزی نصب پورتال (canInstall:true)، رندر SSR (iframe OSM با پین
  35.2628,33.9084، صفر occurrence کلمه‌ی google در خروجی، بدون فوتر، حالت بدون-مختصات).
- تست‌نشده: رندر بصری نقشه‌ی OSM در مرورگر پس از دپلوی.

# CHANGELOG — Bazino Arena of Legends

## 4.1.0 — هدر مرجع، نقشه‌ی واقعی، فونت وزیر (بازخورد کاربر)
1. **هدر پورتال به سبک مرجع:** کشف شد پورتال فقط region «home» را mount می‌کند و هدرِ خودش را با
   کلاس‌های Tailwind می‌کشد → بازطراحی تهاجمی CSS روی کروم پورتال: پس‌زمینه‌ی شیشه‌ای تیره‌ی مرجع
   rgba(5,8,14,.82) + blur(18px)، ارتفاع ۷۶px، **خط مویی طلایی** (::after گرادیانی مثل خود مرجع)،
   وردمارک ایتالیک با PRO طلایی، ناوبری ۱۰px/۸۰۰/.16em با آندرلاین طلایی هاور و حالت فعال طلایی،
   دکمه‌ی ورود از قرصز فیروزه‌ای گرد به **مربع با قاب طلایی** مرجع، دکمه‌های آیکون با قاب مویی.
2. **نقشه‌ی واقعی گیم‌نت (بخش ۷):** به‌جای رادار CSS، **iframe تعاملی Google Maps** داخل قاب طلایی
   inset + نشان «لوکیشن زنده». مختصات = پین ثبت‌شده‌ی خود پورتال (35.7810, 51.4340 — همان نقشه‌ی
   home داخلی پورتال، تهران صدر). اگر ادمین لینک نقشه ثبت کند (club_map_url / google_map_url /
   maps_url یا ورودی google-maps در social_media_links) خودکار جایگزین می‌شود؛ دکمه‌ی مسیریابی =
   مقصد همان مختصات. CSP پورتال frame-src https ✓ (هشدار ممیزی third-party: خارجی بودن maps
   عمداً پذیرفته شد — درخواست کاربر).
3. **فونت وزیر (Vazirmatn) برای فارسی:** ۳ وزن (400/700/900، هرکدام ~50KB) داخل
   `assets/fonts/` باندل شد — **صفر درخواست فونت خارجی**؛ پورتال url('assets/...') را بازنویسی و
   woff2 را با mime درست سرو می‌کند و font-display: swap صریح است (سیاست فونت پورتال دست نمی‌زند).
   برای [dir=rtl] روی ناوبری/دکمه‌های هدر هم اعمال شد؛ پیل‌فر= fallback سیستم باقی می‌ماند.
4. **فوتر داخل home:** پورتال فقط home را mount می‌کند → فوتر مرجع حالا آخرِ همان درخت home رندر
   می‌شود (ثبت region جداگانه‌ی footer حفظ شد برای پورتال‌های آینده).
5. addressFallback از آدرس مرجع (قبرس) به **آدرس واقعی ثبت‌شده‌ی پورتال** (تهران، سدر، شریعتی)
   در هر ۴ زبان اصلاح شد؛ رشته‌ی جدید liveLocation ×۴ زبان (۹۰ کلید هم‌ارز).
- تست‌شده: پارس ES5، ممیزی نصب پورتال (canInstall:true)، رندر SSR home (iframe نقشه با loading=lazy
  و title، فوتر inline، فونت‌فیس‌های محلی در CSS).
- تست‌نشده: رندر بصری نهایی در مرورگر (بینایی خاموش)، بارگیری واقعی iframe گوگل در شبکه‌ی کاربر.

# CHANGELOG — Bazino Arena of Legends

## 4.0.0 — بازطراحی همسو با لندینگ مرجع (۶ خواسته‌ی کاربر)
1. **فریز روی فریم آخر:** ویدئوی هرو `loop:false` دارد و پس از `ended` کلاس `is-ended` روی
   سکشن می‌نشیند → ویدئو با opacity کامل روی **فریم آخر** ثابت می‌ماند (به فریم اول/پوستر برنمی‌گردد)؛
   کلیک دوباره روی هرو از صفر پخش می‌کند (`currentTime=0; play()`).
2. **حذف لایه‌ی روی ویدئو:** `bazino-hero-overlay` (گرادیان تیره) از DOM و CSS حذف شد → ویدئو شفاف
   دیده می‌شود؛ خوانایی متن هرو با سایه‌ی متن و ویگنت موجود حفظ می‌شود.
3. **بخش ۷ = نقشه/لوکیشن گیم‌نت:** کارت «سیگنال موبایل» حذف شد؛ به‌جایش کارت لوکیشن با آدرس
   (`settings.club_address`)، تلفن، ویژوال رادار CSS خالص و دکمه‌ی **مسیریابی** (لینک به Google Maps
   با آدرس انکودشده — فقط لینک خروجی، نه iframe؛ قید صفر-درخواست-خارجی رعایت شد).
4. **همخوانی با طرح مرجع:** فوتر مرجع (برند + جمله‌ی سیگنال + لوکیشن + ردیف کپی‌رایت/سایت رسمی/
   بازگشت به بالا) به‌عنوان **region جدید `footer`** ثبت شد (فوتر پیش‌فرض پورتال خالی است)؛ تیترهای
   سکشن‌ها به مقیاس مرجع بزرگ شدند؛ ناوبری هدر پورتال با آندرلاین طلایی هاور به سبک مرجع؛
   کادر لوکیشن با قاب طلایی inset مثل visit-visual مرجع. (هدر پورتال از نظر فنی دست‌نخورده —
   فقط استایل؛ تصاویر بخش‌ها طبق توافق متفاوت می‌مانند.)
5. **حذف دکمه‌های اسلایدر از هرو:** فلش‌ها/نقاط/وضعیت اسلایدر حذف شدند؛ متن اسلایدها همچنان
   خودکار می‌چرخد؛ **کلیک روی هرو = بازپخش ویدئو** (کیبورد: Enter/Space).
6. **افکت‌های سینماتیک مرجع:** دیپث پوینتر مرجع بازسازی شد — مختصات نرمال‌شده‌ی نشانگر به‌صورت
   `--pointer-x/y` روی ریشه؛ **گلو نئونی آبی** دنبال نشانگر در همه‌ی سکشن‌ها (`radial-gradient`
   روی `::before`)، پارالاکس گرید هرو و پارالاکس معکوس ظریف تیترها. **ریویل اسکرول:** ظرف‌های
   `data-rvl` با IntersectionObserver یک‌بار fade/rise می‌کنند و کارت‌های گرید با تأخیر پله‌ای؛
   فقط opacity/transform → صفر CLS؛ با `prefers-reduced-motion` و حالت بدون-JS (کلاس
   `bazino-rvl` فقط با JS زنده اضافه می‌شود → SSR/بدون-JS همه‌چیز پیدا) ایمن است.
- رشته‌های جدید ×۴ زبان: locationTitle، directions، phoneLabel، footerLine، officialSite، backTop
  (۸۹ کلید در هر زبان، هم‌ارز). `regions` در theme.json: `["home","footer"]`.
- حذف‌ها: overlay، فلش‌ها/نقاط اسلایدر، دکمه‌ی بازپخش جدا (کلیک هرو جایگزین)، کارت اپ/سیگنال.
- تست‌شده: پارس ES5، ممیزی نصب پورتال، رندر SSR هر دو region (home+footer) و رشته‌های ۴ زبان.
- تست‌نشده: رفتار تعاملی پوینتر/ریویل در مرورگر واقعی پس از دپلوی (بینایی خاموش بود؛ منطق با
  کد مرجع و تست SSR اعتبارسنجی شد)، ارزیابی بصری نهایی رنگ/فاصله‌ها در مقابل اسکرین‌شات مرجع.

# CHANGELOG — Bazino Arena of Legends

## 3.5.0 — minify فایل theme.js در بسته‌ی نصبی (PageSpeed بخش ۶ — Minify JavaScript)
- PSI برای `theme.js` صرفه‌جویی ~۲.۵KiB (از ۷.۶KiB انتقالی) تخمین زد؛ فایل با توضیحات خوانا منتشر می‌شد.
- از این نسخه **theme.js داخل زیپ minify می‌شود** (terser، هدف ES5، mangle، بدون کامنت + هدر یک‌خطی
  مشخص‌کننده‌ی نسخه و منبع) — سورس خوانا در `theme-package/theme.js` ریپو باقی می‌ماند.
- اعتبارسنجی بعد از minify: parse با `new Function`، بقای نشانگرهای `BazinoThemeSDK` و
  `registerComponent('home')` (ممیزی نصب پورتال به همین‌ها وابسته است)، بدون `setInterval(`، ES5،
  و رندر SSR کامل با فایل minified (پوستر LCP با fetchpriority، srcset، RTL، ارقام فارسی) — همه پاس.
- بررسی دسترس‌پذیری: هر ۱۹ دکمه/نقش‌دکمه‌ی خروجی قالب نام accessible دارند (آر ia-label یا متن) →
  پرچم «Buttons do not have an accessible name» در PSI مربوط به دکمه‌های خود پورتال است.
- ویدئوی رسمی (۲.۷MB): عمداً با کیفیت رسمی حفظ شد (سقف ۳MB پورتال، بارگذاری تعویقی بعد از لود،
  faststart از قبل دارد — moov قبل از mdat بررسی شد). گزینه‌های بیشتر (فشرده‌سازی مجدد ~۱.۵MB یا
  نسخه‌ی کوتاه) تصمیم محصولی است و انجام نشد.
- اسکریپت `build-theme-zip.sh` در ریشه‌ی ریپو اضافه شد (minify + sanity + زیپ به‌صورت تکرارپذیر).
- تست‌نشده: اندازه‌گیری مجدد PSI پس از دپلوی.

## 3.4.0 — کشف‌پذیری LCP (PageSpeed بخش ۴ — LCP request discovery)
- PSI عنصر LCP را `div.bazino-hero-poster-layer` معرفی کرد: پوستر به‌صورت background-image در CSS
  بود → دیر کشف می‌شد، fetchpriority نمی‌گرفت و در سند اولیه قابل کشف نبود.
- رفع: پوستر حالا یک **`<img>` واقعی** است — اولین فرزند هرو — با `fetchpriority="high"`،
  `decoding="async"`، بدون هیچ `loading` (= eager، نه lazy)؛ CSS فقط چیدمانش را می‌سازد
  (`object-fit: cover; position: absolute`) و دیگر هیچ تصویری از CSS لود نمی‌شود.
- همان URL هم `poster` ویدئو است → همچنان فقط یک دانلود؛ موبایل همان 640×360 (منطق ۳.۲.۰).
- onError پوستر آن را می‌پوشاند (بدون آیکون تصویر شکسته؛ لایه‌های ویدئو/گرادیان سر جایشان).
- سهم باقی‌مانده سمت پورتال است (اسپا بودن سایت: تصویر تا رندر JS در HTML اولیه نیست) → پرامپت ۴
  (preload پوستر قالب فعال در head از روی `theme.json.media.heroPoster`).
- تست‌شده: رندر SSR (تگ img با `fetchpriority="high"`، بدون `loading="lazy"`، src پوستر درست)،
  rebuild زیپ و ممیزی نصب پورتال `canInstall: true`.
- تست‌نشده: اندازه‌گیری مجدد LCP با PSI پس از دپلوی.

## 3.3.0 — رزرو فضا برای متن اسلاید هرو (PageSpeed بخش ۳ — CLS)
- PSI شیفت 0.048 را به `.bazino-hero-content` نسبت داد: پورتال اسلایدهای ادمین را ~۲.۵ ثانیه بعد از
  mount می‌فرستد و تیترها هر ~۷.۵ ثانیه می‌چرخند؛ با هر تعویض تیتر، تعداد خطوط h1 عوض می‌شد و
  دکمه‌ی CTA و دات‌ها پایین/بالا می‌پریدند.
- رفع: بلوک `.bazino-hero-slide` حالا **min-height رزروی** دارد (دسکتاپ: ~۲ خط تیتر + زیرتیتر؛
  موبایل ≤800px: ذخیره‌ی بیشتر برای تیترهای چندخطی) → تعویض تیترهای معمولی دیگر چیزی را جابه‌جا نمی‌کند.
- صادقانه: تیترهای خیلی بلند (بیش از ~۲ خط دسکتاپ / ~۲.۵ خط موبایل) همچنان بلوک را قد می‌کشند؛
  رزرو بزرگ‌تر از این فضای خالی دائمی می‌سازد و به‌صرفه نیست. شیفت‌های `main` (0.078×۲) سمت
  پورتال است (نمایش دیرهنگام هدر + جایگزینی placeholder هوم + تزریق CSS بعد از paint) → پرامپت ۳.
- تست‌شده: اعتبارسنجی CSS (توازن براکت/فرمت)، rebuild زیپ و ممیزی نصب پورتال `canInstall: true`.
- تست‌نشده: اندازه‌گیری مجدد CLS با PSI پس از دپلوی.

## 3.2.0 — تحویل بهینه‌ی تصویر (PageSpeed بخش ۲ — تمرکز موبایل)
- تصاویر کارت‌ها (ژانرها/تورنمنت‌ها/سالن‌ها) و اسلایدر سالن اکنون **srcSet/sizes** می‌گیرند: اگر URL
  تصویر از الگوی نسخه‌دار خود پورتال باشد (`/images/…-<width>.webp`، با حفظ `?v=`)، واریانت‌های
  320/480/640 + خود فایل به‌صورت `srcset` عرضه می‌شوند و مرورگر موبایل کوچک‌ترین نسخه‌ی لازم را
  دانلود می‌کند (PSI: کارت‌های ۹۶۰px در نمایش ~315px — صرفه‌جویی ~۳۰۰KiB).
-fallback امن: `src` همیشه URL اصلی است و اگر واریانتی 404 شد، `onError` یک‌باره srcset را حذف و
  به تصویر اصلی برمی‌گردد (تصویر خرابی نشان داده نمی‌شود).
- **پوستر هرو در موبایل کوچک می‌شود**: نمایشگرهای باریک‌تر از ۸۰۰px پوستر 640×360 (~7KB) را
  می‌گیرند به‌جای 1280×720 (~15KB) — هم `poster` ویدئو هم پس‌زمینه‌ی CSS با کلاس `is-small-screen`
  هم‌آدرس می‌شوند تا فقط یک دانلود انجام شود (LCP سریع‌تر در گوشی).
- تصویر لوگو (`/logo.png`) و فایل‌های `-960` اصلی متعلق به پورتال‌اند و از داده می‌آیند؛
  اصلاح آن‌ها (WebP/سایز مناسب لوگو و فیلد `imageUrlSmall` در داده) در پرامپت پورتال ثبت شد.
- تست‌شده: syntax/ES5/کلیدهای چهارزبانه + رندر SSR (srcSet با URL الگومند ساخته می‌شود، بدون
  srcSet برای URLهای بی‌الگو) + ممیزی نصب پورتال `canInstall: true`.
- تست‌نشده: اندازه‌گیری مجدد PageSpeed پس از اعمال (نیازمند دپلوی) و دانلود واقعی واریانت‌ها در
  مرورگر (پس از هم‌راستا شدن داده‌ی پورتال).

## 3.1.0 — تصویر اسلاید ادمین هرگز جای ویدئو را نمی‌گیرد
- پس‌زمینه‌ی هرو **همیشه** ویدئوی رسمی (و پوستر فریم اول آن) است — در همه‌ی حالت‌ها.
- اسلایدهای پنل ادمین فقط متن را تعیین می‌کنند: عنوان/توضیح به زبان فعال و مقصد دکمه‌ی CTA (`slide.target`).
  تصویر اسلاید (`imageUrl` / `mobileImageUrl`) عمداً نادیده گرفته می‌شود و لایه‌ی تصویری در هرو رندر نمی‌شود.
- اسلایدهای فقط-تصویری (بدون عنوان و توضیح) از چرخش حذف می‌شوند چون محتوای قابل‌نمایشی ندارند.
- چرخش متن اسلایدها (~۷.۵ ثانیه، rAF)، دات‌ها، فلش‌ها، شمارنده و رفتار پخش/توقف ویدئو بدون تغییر.

### ✅ اعتبارسنجی زنده (۲۰۲۶-۰۹-۰۳) — سرور واقعی پورتال + Chromium 149
روی سرور واقعی پورتال (برنچ SDK v2، کامیت `d296242`؛ `npx tsx server.ts` + SQLite)
قالب از طریق API رسمی نصب و فعال شد و در Chromium واقعی (فونت Vazirmatn، CDNهای خارجی بلاک،
۴ زبان در کانتکست‌های جدا) آزمایش شد — **۴۰ چک، همه موفق**؛ جزئیات و اسکرین‌شات‌ها:
`visual-validation/v3.1/report-fa.md`. خلاصه:
- نصب API بدون خطا؛ فعال‌سازی خودکار؛ بدون finding عملکردی.
- ویدئوی هرو واقعاً پخش و پینت می‌شود (تا انتها؛ تأیید پیکسلی فریم)؛ poster فریم اول سرو می‌شود.
- با ۴ اسلاید ادمینِ دارای عکس: هیچ لایه‌ی تصویری رندر نشد؛ عنوان/توضیح به زبان فعال آمد؛ ۴ دات؛ چرخش rAF تأیید شد.
- `dir=rtl` فارسی، بدون سرریز افقی؛ استک فونت `Orbitron, Vazirmatn` روی تیتر؛ CTA با `--primary-color` (#FFC400).
- **کنسول مرورگر در هر ۴ زبان بدون خطا** (صفحه‌ی اصلی).
- مواردی که همچنان دست‌نخورده‌اند: کلیک دستی در رابط گرافیکی پنل، دکمه‌ی «پخش دوباره» (تعامل کلیکی)،
  گالری سالن‌ها در مرورگر، و پیمایش بصری صفحات رزرو/کافه/فروشگاه با قالب فعال — **تست‌نشده**.
- مشاهده‌ی تک‌باره: در اولین لود سرد dev یک خطای هوک Preact در کنسول دیده شد که پس از گرم‌شدن کش
  Vite دیگر تکرار نشد (شرح کامل در گزارش؛ نیازمند یک نگاه کنسولی بعد از build پروداکشن).

## 3.0.0 — مهاجرت به قرارداد قالب‌ها نسخه ۲ (Bazino Theme SDK v2)

شناسه‌ی قالب و ساختار بسته حفظ شده است: `theme.json` + `theme.css` + `theme.js` + `assets/`
(ویدئوی رسمی «Bazino — Arena of Legends» و پوسترهای ساخته‌شده از فریم اول همان ویدئو، بدون تغییر).

### ۱) فونت فارسی/روسی (بحرانی — رفع شد)
- فونت تیتر با fallback تعریف شد: `"Orbitron", "Vazirmatn", sans-serif` و فونت متن: `"Vazirmatn", system-ui, sans-serif`؛
  در `theme.json.tokens` با کلیدهای `font-display` و `font-sans` (پورتال آن‌ها را به `--bz-font-display` / `--bz-font-sans`
  روی `<body>` تزریق می‌کند) و به‌صورت متغیر CSS در `theme.css` (آینه‌ی همان مقادیر).
- تیتر هرو در فارسی/روسی دیگر ناپدید نمی‌شود؛ برای متن‌های فارسی (RTL) فاصله‌گذاری حروف و italic مصنوعی
  که اتصال حروف فارسی را می‌شکند حذف و line-height متناسب داده شد (قواعد `[dir='rtl']`).

### ۲) رنگ‌ها فقط از طریق متغیرهای CSS
- کل پالت روی `body[data-theme='bazino-arena']` تعریف شد و شامل قرارداد کامل نسخه ۲ است:
  `--primary-color`, `--secondary-color`, `--accent-color`, `--dark-bg-color`, `--dark-card-color`,
  `--bz-card-2`, `--bz-card-3`, `--bz-surface`, `--bz-surface-2`, `--bz-text`, `--bz-muted`, `--bz-border`,
  `--bz-success`, `--bz-info`, `--bz-violet` (+ مشتقات آلفای همان پالت).
- هیچ سلکتور داخلی دیگر رنگ hard-code ندارد (همگی `var(...)`).
- `theme.json.tokens` همان توکن‌ها را اعلام می‌کند تا رنگ‌ها به هدر، دکمه‌ها، بج‌ها و همه‌ی صفحات
  (رزرو، کافه، فروشگاه، تورنمنت، …) برسند.

### ۳) متن‌های چهارزبانه (fa/en/ru/tr)
- همه‌ی متن‌های قالب (۸۳ کلید در هر زبان) به `theme.json.strings` منتقل شد و در `theme.js`
  فقط با `props.ts('key')` خوانده می‌شود. هیچ عبارت `language === 'fa' ? … : …` باقی نمانده
  (حتی اعداد فارسی و locale قیمت‌ها با جدول/نگاشت پیاده‌سازی شده، نه شرط زبان).
- اعداد فصل‌ها، شماره‌ی اسلایدها و قیمت‌ها در فارسی با ارقام فارسی نمایش داده می‌شوند.

### ۴) اسلایدر از داده‌ی پنل ادمین
- هرو اکنون از `props.slides` می‌خواند: `slide.title[language]`، `slide.desc[language]`،
  `slide.imageUrl`، `slide.mobileImageUrl` (در `srcSet` برای موبایل) و
  `slide.target → props.onNavigate(slide.target)`.
- اولویت داده: اسلایدهای ادمین ← در نبود آن `featuredGames` ← در نبود آن، اسلایدهای نمونه‌ی خود قالب (با `ts()`).
- اسلاید ادمین دارای تصویر، تصویر خودش را تمام‌صفحه نشان می‌دهد (ویدئو موقتاً کنار می‌رود)؛
  اسلایدهای نمونه روی ویدئوی سینمایی رسمی با پوستر فریم اول رندر می‌شوند (رفتار سابق حفظ شد).
- کنترل‌ها: فلش‌های قبلی/بعدی، دات‌های شماره‌دار، شمارنده + وضعیت (خودکار/مکث)، جابه‌جایی خودکار
  ~۷.۵ ثانیه با requestAnimationFrame مشترک با گالری سالن‌ها (بدون setInterval)، توقف هنگام
  hover/focus/مخفی‌شدن تب/خارج از دید و احترام به prefers-reduced-motion.

### ۵) RTL/LTR
- `dir` از `props.dir` روی ریشه و همه‌ی بخش‌ها اعمال می‌شود.
- CSS فقط از خواص منطقی استفاده می‌کند (`inset-inline-end`, `margin-inline-end`, `padding-inline-start`,
  `inset-inline: 0`, `text-align: start`)؛ گرادیان‌های جهت‌دار هرو و translateX لینک‌ها برای RTL معکوس شده‌اند.

### ۶) assets
- در CSS فقط مسیر نسبی `url('assets/hero-poster.webp')` (سرور بازنویسی می‌کند)؛ در JS فقط
  `props.assetsBase + 'file'`. تصویر/ویدئوی بنر فقط در بخش هرو است، نه پس‌زمینه‌ی کل body.

### ۷) theme.json
- `sdkVersion: 2`، `regions: ["home"]`، `tokens`، `strings` (چهارزبانه‌ی کامل)، نسخه → `3.0.0`.
- ثبت کامپوننت همچنان `registerComponent('home', …)` است (کل صفحه‌ی اصلی؛ طبق قرارداد، در این حالت
  `hero` و `home.*` نادیده گرفته می‌شوند). هدر/فوتر/نوار موبایل پیش‌فرض سایت باقی می‌مانند و فقط با
  متغیرهای CSS رنگ/فونت می‌گیرند — مهاجرت به بخش‌های جداگانه (regions) اختیاری بود و انجام نشد.

### ۸) پایداری عملکرد (حفظ شد)
- ویدئو همچنان `preload="none"` و بارگذاری پس از `window load` + idle؛ توقف خارج از دید/تب مخفی؛
  بدون تایمر تکراری، بدون دامنه‌ی خارجی، بدون درخواست فونت وب.

---

## وضعیت تست‌ها

### تست‌شده (در شبیه‌سازی نصب و رندر، خارج از مرورگر)
- «نصب» کامل از طریق همان کد نصب سرور پورتال (`installThemeZip` شامل parse، اعتبارسنجی theme.js،
  optimization gate و نوشتن فایل‌ها): موفق؛ بخش شناسایی‌شده: `home`؛ گزارش performance بدون findings.
- اسکریپت رسمی ممیزی پورتال (`npm run audit:theme`): `canInstall: true`، بدون دامنه‌ی خارجی،
  بدون هشدار اندازه (کل بسته ~2.83MB؛ ویدئو 2.8MB < سقف 3MB).
- بازنویسی مسیر assets در CSS سروشده (`/api/themes/<id>/assets/...`) — تأیید شد.
- رندر کامپوننت با React SSR روی SDK واقعی پورتال در هر چهار زبان (fa/en/ru/tr) و هر دو جهت:
  تیتر هرو و برچسب فصل‌ها بومی‌سازی شده، `dir` درست، ارقام فارسی قیمت + واحد پول، بدون نشت کلیدها
  یا `undefined` در خروجی.
- اسلایدهای ادمین: `title[lang]`/`desc[lang]`/`target` — تأیید شد (از 3.1.0 تصویر اسلاید عمداً نادیده گرفته می‌شود)؛ fallback به `featuredGames` و سپس اسلایدهای نمونه — تأیید شد.
- رندر با props کاملاً خالی (بدون داده/تنظیمات) بدون خطا — تأیید شد.

### تست‌نشده (نیازمند مرورگر و پورتال واقعی — صریحاً اعلام می‌شود)
> به‌روزرسانی ۲۰۲۶-۰۹-۰۳: بیشتر موارد این فهرست بعداً در اعتبارسنجی زنده‌ی ۳.۱.۰
> (سرور واقعی + Chromium) پوشش داده شد — فهرست به‌روز در بخش ۳.۱.۰ همین سند.
- نصب از رابط گرافیکی پنل ادمین در مرورگر — **تست‌نشده** (فقط مسیر سرور شبیه‌سازی شد).
- پخش واقعی ویدئوی هرو در مرورگر، کلیک برای پخش/پخش دوباره، توقف/ادامه با اسکرول و تب — **تست‌نشده**.
- جابه‌جایی خودکار اسلایدها و گالری سالن‌ها (حلقه‌ی rAF) در مرورگر واقعی — **تست‌نشده**.
- ظاهر نهایی فونت فارسی/روسی روی دستگاه کاربر (وابسته به فونت‌های سیستم؛ وب‌فونتی ارسال نشده) — **تست‌نشده**.
- هماهنگی رنگ هدر/دکمه‌ها/بج‌ها در صفحات رزرو/کافه/فروشگاه در مرورگر واقعی — **تست‌نشده**.
- کنسول مرورگر بدون خطا — **تست‌نشده**.
- سازگاری با پورتالِ هنوز نسخه ۱ (بدون `props.ts`/`props.slides`): پشتیبانی نمی‌شود؛ روی چنان میزبانی
  متن‌ها به‌صورت کلید نمایش داده می‌شوند — قالب برای SDK نسخه ۲ ساخته شده است.

---

## 2.1.0 — ویدئوی رسمی + پوسترهای فریم اول
- جایگزینی ویدئوی ساختگی با ویدئوی رسمی «Bazino — Arena of Legends.mp4» (1280×720, H.264, ~10s).
- بازتولید `hero-poster.webp` (1280×720) و `hero-poster-small.webp` (640×360) از فریم اول ویدئوی رسمی.

## 2.0.0 — بسته‌ی نصبی اولیه
- قالب هفت‌فصلی سینمایی، پوشش CSS تمام صفحات، ویدئوی تعریف‌شده (deferred)، بدون دامنه‌ی خارجی.

# یافته‌های راهنمای Theme Engine

منبع: https://github.com/paymanshafayan/bazino-gamenet-portal/blob/main/src/themes/README.md

## قرارداد قالب

هر قالب باید ZIP شامل `theme.json`، `theme.css` و `theme.js` باشد. فایل `theme.js` باید کامپوننت `home` را با `window.BazinoThemeSDK.registerComponent('home', ...)` ثبت کند. قالب باید تمام صفحات سایت را پوشش دهد و CSS آن scoped و سازگار با `body[data-theme='<id>']` و `.theme-<id>` باشد.

## قرارداد محتوایی صفحه اصلی

چهار بخش اجباری هستند: ژانرهای بازی از `gameGenres`، تورنمنت‌های فعال از `tournaments`، نتایج مسابقات از `matchHistory`، و سالن‌ها و خدمات از `loungeSections`. بخش‌های اختیاری شامل Hero/اسلایدر از `featuredGames`، تعرفه‌ها/پاس‌ها از `pricingPackages`، مربیان/تیم از `staffTeam`، چرا ما و آمار، درباره کلوپ، محصولات ویژه، تماس/آدرس/نقشه و CTAهای ناوبری هستند.

## Props استاندارد

`language`، `dir` و `t` برای زبان و ترجمه؛ `onNavigate(tab)` برای مسیرهای `reservations`، `cafe`، `shop`، `tournaments`، `blog`، `loyalty` و `chat`؛ همچنین `featuredGames`، `gameGenres`، `tournaments`، `matchHistory`، `loungeSections`، `pricingPackages`، `staffTeam`، `settings`، `logoUrl`، `assetsBase` و `themeId`.

## قانون برند

لوگوی سایت مادر فقط از `props.logoUrl` یا `/logo.png` نمایش داده شود و قالب حق جایگزینی یا مخفی‌کردن آن را ندارد. ترتیب بخش‌ها آزاد است، اما داده‌ها باید از props استاندارد SDK خوانده شوند.

## تصمیم طراحی برای این پروژه

صفحه اصلی هفت بخش خواهد داشت و چهار هسته‌ی اجباری را حتماً پوشش می‌دهد: Hero، ژانرهای کنسولی، تورنمنت‌های فعال، نتایج مسابقات، سالن‌ها و خدمات، پاس‌ها/CTA رزرو، و Visit/App footer flow. این انتخاب با محدودیت‌های محتوایی بازینو ترکیب می‌شود: فقط PS5/Xbox، سالن VIP، نمایشگرهای ۸۵ اینچی، Gaming Café، تورنمنت و CTAهای رسمی سایت.

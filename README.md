# Bazino Arena Landing & Theme Engine

مخزن رسمی لندینگ پیج و بسته‌های قالب پورتال گیم‌نت بازینو (Bazino GameNet Portal).

---

## 📦 بسته‌های قالب ارائه‌شده (Installable Theme Packages)

این ریپازیتوری شامل دو بسته قالب استاندارد منطبق بر **Bazino Theme SDK v2** است:

1. **`bazino-arena-theme.zip` (نسخه 4.5.5):**
   - **شناسه:** `bazino-arena`
   - **ناحیه‌های پشتیبانی‌شده (Regions):** `home`, `header`
   - **ویژگی‌ها:** تجربه سه‌بعدی و سینمایی با حضور کاراکتر مونا (Mona)، پس‌زمینه سالن بازی بازینو، پالت تاریک و طلایی لوکس (`#ffc400`)، هدر یکپارچه و بهینه، فونت محلی وزیرمتن (۳ وزن WOFF2)، صفر وابستگی به CDN خارجی.
   - **مسیر سورس:** `theme-package/`

2. **`bazino-hub-theme.zip` (نسخه 1.0.0):**
   - **شناسه:** `bazino-hub`
   - **ناحیه‌های پشتیبانی‌شده (Regions):** ۱۵ ناحیه استاندارد شامل:
     `home`, `header`, `hero`, `hub.home`, `hub.games`, `hub.events`, `hub.weekly`, `hub.special`, `hub.season`, `hub.brackets`, `hub.register`, `hub.shop`, `hub.food`, `hub.club`, `hub.blog`, `hub.chat`, `hub.contact`, `hub.rules`, `hub.privacy`
   - **ویژگی‌ها:** طراحی نئونی سایبرپانک برگرفته از راهنمای Hasti، اسلایدر GTA VI و FC 26، کارت‌های چهارگانه بازی‌ها (شامل کارت SYSTEMS & GEAR)، براکت ۳۲ نفره تورنمنت، پشتیبانی کامل ۴ زبان (EN, TR, FA, RU).
   - **مسیر سورس:** `hub-package/` و `hub/`

### نحوه نصب روی پورتال گیم‌نت بازینو:
1. فایل زیپ مورد نظر (`bazino-arena-theme.zip` یا `bazino-hub-theme.zip`) را از ریشه مخزن یا بخش دکمه‌های دانلود دریافت کنید.
2. در پنل ادمین پورتال بازینو: **مدیریت قالب‌ها (Themes)** → **آپلود قالب جدید (Upload / Replace)**.
3. قالب را فعال (Activate) کرده و با کلیدهای `Ctrl + F5` کش مرورگر را تازه‌سازی فرمایید.

---

## 🛠️ راه‌اندازی و توسعه (Development & Build)

> **توجه مهم:** تنها پکیج منیجر معتبر این پروژه **`pnpm`** است. استفاده از `npm` یا `yarn` به دلیل مدیریت دقیق وابستگی‌ها و هم‌خوانی با Vite 7 مجاز نمی‌باشد.

### ۱. نصب وابستگی‌ها:
```bash
pnpm install
```

### ۲. اجرای سرور توسعه:
```bash
pnpm run dev
```

### ۳. بررسی تایپ‌ها و تست صحت کد:
```bash
pnpm run check
```

### ۴. بیلد پروژه لندینگ:
```bash
pnpm run build
```

---

## 🏗️ اسکریپت‌های ساخت بسته‌های زیپ (Theme Builders)

برای بازسازی بسته‌های زیپ و همگام‌سازی خودکار آن‌ها با ریشه و `client/public/`:

- **ساخت قالب Arena:**
  ```bash
  ./build-theme-zip.sh
  ```
- **ساخت قالب Hub:**
  ```bash
  ./build-hub-theme-zip.sh
  ```

---

## 🗺️ نقشه پوشه‌ها و ساختار پروژه

```text
├── bazino-arena-theme.zip      # بسته نصبی نهایی قالب Arena
├── bazino-hub-theme.zip        # بسته نصبی نهایی قالب Hub
├── build-theme-zip.sh          # اسکریپت بیلد و مینیفای قالب Arena
├── build-hub-theme-zip.sh      # اسکریپت بیلد و مینیفای قالب Hub
├── cdp_bridge.mjs              # کلاینت مستقل Node 22 جهت تعامل با Chrome DevTools Protocol
├── theme-package/              # سورس، استایل‌ها و است‌های قالب Arena
├── hub-package/                # سورس، استایل‌ها و است‌های قالب Hub
├── hub/                        # سیستم طراحی، کامپوننت‌های React و دموی کامل Hub
├── client/                     # سورس اپلیکیشن فرانت‌اند و صفحات لندینگ
│   ├── public/                 # است‌های استاتیک و فایل‌های زیپ دانلودی
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx                # لندینگ اصلی بازینو
│       │   └── CdpVerificationPage.tsx # داشبورد تایید بصری و احراز هویت پورتال
├── server/                     # سرور بک‌اند Express برای حالت پروداکشن
└── HANDOFF-PROMPT.md           # مستندات جامع تحویل، تاریخچه و قوانین پروژه
```

---

## 🔍 کلاینت CDP و داشبورد تایید بصری (`cdp_bridge.mjs` و `/verify-cdp`)

- **`cdp_bridge.mjs`:** یک ابزار خط فرمان بر پایه Node.js 22 جهت اتصال به پورت دیباگ مرورگر (`--remote-debugging-port=9222`)، فهرست کردن تب‌ها، ناوبری خودکار و ثبت اسکرین‌شات پیکسلی:
  ```bash
  node cdp_bridge.mjs http://127.0.0.1:9222 list
  node cdp_bridge.mjs http://127.0.0.1:9222 screenshot proof.png
  ```
- **مسیر `/verify-cdp`:** داشبورد تعاملی وب برای بازرسی بصری قالب‌های فعال، مقایسه کنار-به-کنار با رفرنس‌های طراحی و ارسال مستقیم اسکرین‌شات به سرور سندباکس.

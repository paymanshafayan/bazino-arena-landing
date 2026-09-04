# رفع خطای نصب قالب: `theme.js خطای syntax دارد ... 'unsafe-eval'`

## خلاصه

این خطا مربوط به `theme.js` یا فایل ZIP قالب نیست. قالب Arena of Legends از نظر syntax معتبر است و قبلاً با ابزارهای خود پورتال (`audit-theme-package`, `test-theme-sdk`) بررسی شده است.

علت اصلی، استفاده از `new Function(...)` در **پنل ادمین پورتال** است:

- فایل: `bazino-gamenet-portal/src/components/AdminPanelTab.tsx`
- تابع: `handleZipFileSelect`

پورتال برای «چک کردن syntax» قبل از نصب، این خط را اجرا می‌کند:

```ts
new Function(result.componentJs);
```

مرورگر در سایتی که CSP زیر را دارد، اجازه‌ی `eval`/`new Function` نمی‌دهد:

```text
script-src 'self' 'unsafe-inline'
```

بنابراین هر `theme.js` معتبر هم در مرورگر «خطای syntax» گزارش می‌شود:

```text
Evaluating a string as JavaScript violates the following Content Security Policy directive
because 'unsafe-eval' is not an allowed source of script:
script-src 'self' 'unsafe-inline'
```

## راه‌حل خواسته‌شده

`new Function` را از pre-check سمت کلاینت حذف کنید و اجازه دهید بررسی اصلی syntax در سمت سرور انجام شود:

- `server/themeStore.ts` همچنان از `new Function` استفاده می‌کند؛ چون این کد در Node اجرا می‌شود، CSP مرورگر شامل آن نمی‌شود و بررسی معتبر است.
- در کلاینت فقط چک‌های سبک مانند وجود `BazinoThemeSDK.registerComponent('home', ...)` باقی می‌ماند.

این تغییر در فایل patch قرار گرفته است:

```text
patches/portal-fix-theme-install-csp.patch
```

## نحوه‌ی اعمال به پورتال

در ریشه‌ی مخزن `bazino-gamenet-portal` دستور زیر را اجرا کنید:

```bash
git apply /path/to/bazino-arena-landing/patches/portal-fix-theme-install-csp.patch
```

یا به‌صورت دستی، بلوک زیر را در `src/components/AdminPanelTab.tsx` حذف کنید:

```ts
try {
  // Parse-only check, not execution. ...
  // eslint-disable-next-line no-new-func
  new Function(result.componentJs);
} catch (syntaxErr: any) {
  const msg = ...;
  setZipError(msg);
  addNotification(msg, 'error');
  return;
}
```

و به‌جای آن این توضیح را بگذارید:

```ts
// IMPORTANT: do not use `new Function`/`eval` to syntax-check theme.js here.
// The app ships with CSP `script-src 'self' 'unsafe-inline'` (no `'unsafe-eval'`),
// so evaluating the uploaded theme source in the browser is blocked and every
// valid ZIP appears to be a "syntax error". The authoritative syntax check is
// performed by the server during install (server/themeStore.ts), where Node is
// not subject to the browser CSP.
```

پس از اعمال patch، بسته‌ی قالب را دوباره از پنل ادمین نصب کنید. ترجیحاً بعد از تغییر، `pnpm build`/`pnpm lint` پورتال را هم اجرا کنید.

## گزینه‌ی جایگزین (در صورت عدم دسترسی به سورس پورتال)

اگر امکان تغییر سورس پورتال نیست، می‌توانید موقتاً `'unsafe-eval'` را به `script-src` در `server.ts` اضافه کنید:

```text
script-src 'self' 'unsafe-inline' 'unsafe-eval'
```

این کار خطا را برطرف می‌کند، اما `unsafe-eval` را در سراسر سایت فعال می‌کند و سطح امنیت CSP را پایین می‌آورد. تغییر اول (حذف `new Function` از کلاینت) توصیه‌ی اصلی است.

## وضعیت بسته‌ی قالب

- `theme-package/theme.js` و `bazino-arena-theme.zip` نیاز به تغییر ندارند.
- همین patch به‌صورت فایل پچ در `patches/portal-fix-theme-install-csp.patch` افزوده شد تا برای مخزن پورتال قابل اعمال باشد.

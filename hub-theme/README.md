# قالب هاب Bazino — `bazino-hub` v2.1.4

**مسیر واحد همهٔ فایل‌های این قالب در ریپو:**

```
hub-theme/
```

| فایل | نقش |
|---|---|
| `theme.json` | شناسه، نسخه، `layout: hub`، ۲۰ ریجن، رشته‌های ۴زبان |
| `theme.js` | کامپوننت‌های SDK v2 (ES5، الگوی `wrap()`) |
| `theme.css` | استایل نئون (فونت‌ها باندل محلی) |
| `assets/` | تصاویر، کاور بازی‌ها، فونت woff2 |
| `bazino-hub-theme.zip` | **بستهٔ نصب روی پورتال** (بدون entry پوشه‌ای) |
| `build-hub-theme-zip.sh` | بازسازی زیپ از همین پوشه |

نصب روی پورتال:

```bash
curl -X POST "http://localhost:3000/api/admin/themes/install?name=bazino-hub&replace=1&activate=1" \
  -H "Authorization: Bearer $(cat /tmp/admin-token)" \
  -H "Content-Type: application/zip" \
  --data-binary @hub-theme/bazino-hub-theme.zip
```

بازسازی زیپ:

```bash
./hub-theme/build-hub-theme-zip.sh
```

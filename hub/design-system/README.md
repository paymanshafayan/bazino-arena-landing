# Hub Design System

منبع واحد ظاهر قالب Hasti/Hub. هر صفحهٔ جدید **باید** از همین پوشه import کند تا شکل کارت‌ها، خطوط نئون، هدر/فوتر و پالت یکی بماند.

```
hub/design-system/
  tokens.css        پالت، فونت، شعاع، فاصله
  hub.css           استایل همهٔ کامپوننت‌ها
  neon-wire.css     کلاس‌های SVG نئون
  NeonWire.tsx      لایه / پورت / لینک + توابع path
  chrome.tsx        HubPage, HubHeader, HubFooter, HubLogo
  widgets.tsx       Hero, Tabs, FilterPills, MatchCard, Champion, GameList, PanelBanner
  Avatar.tsx        آواتار عکس یا چهرهٔ SVG از روی نام
  icons.tsx         آیکون‌های خطی + جام تاج‌گل
  assets/           هیرو، آواتار قهرمان
  KitPage.tsx       کاتالوگ زنده → /hub/kit
```

قانون پورتال دست‌نخورده می‌ماند. این فقط دموی فرانت در ریپو landing است.

---

## NeonWire — خطوط اتصال نئونی

سه شکل:

| `kind` | شکل | کاربرد |
|---|---|---|
| `elbow` (پیش‌فرض) | خط راست با گوشهٔ منحنی H→V→H | براکت تورنمنت، فلو |
| `smooth` | منحنی مکعبی S | کارت‌های مرتبط، تایم‌لاین |
| `arc` | کمان درجه ۲ | تزئینی |

تون‌ها: `cyan` `magenta` `gold` `green` `purple` `azure`

### فراخوانی استاندارد (پیشنهادی)

```tsx
import { NeonWireLayer, WirePort, NeonLink } from "../design-system";

<NeonWireLayer>
  <WirePort id="a"><CardA /></WirePort>
  <WirePort id="b"><CardB /></WirePort>
  <NeonLink from="a" to="b" tone="cyan" kind="elbow" radius={12} split={0.6} />
</NeonWireLayer>
```

یا آرایه:

```tsx
<NeonWireLayer links={[{ from: "a", to: "b", tone: "magenta", kind: "smooth" }]}>
```

`MatchCard` پراپ `wire="L32-0"` دارد و خودش `WirePort` می‌سازد.

### کلاس CSS (بدون React، وقتی مختصات را خودتان دارید)

```html
<svg class="hub-wire-svg">
  <g class="hub-wire hub-wire--cyan">
    <path class="hub-wire-glow" d="M 0 20 L 40 20 Q 52 20 52 32 L 52 88 Q 52 100 64 100 L 80 100" />
    <path class="hub-wire-mid"  d="..." />
    <path class="hub-wire-core" d="..." />
  </g>
</svg>
```

سه لایه اجباری است: glow (بلور)، mid (رنگ نئون)، core (هایلایت روشن). این همان لولهٔ نئون مرجع است.

### توابع خالص

`elbowPath / smoothPath / arcPath / buildWirePath` را از `NeonWire.tsx` بگیرید اگر SVG سفارشی می‌کشید.

---

## کروم صفحه

هر صفحه Hub:

```tsx
<HubPage activeNav="EVENTS">
  <HubHero title={<>TOURNAMENT <em>BRACKETS</em></>} ...>
    <HubTabs ... />
  </HubHero>
  <div className="hub-body">{/* سایدبار + پنل */}</div>
</HubPage>
```

کاتالوگ زنده: مسیر `/hub/kit`.

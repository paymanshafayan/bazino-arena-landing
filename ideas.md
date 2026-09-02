# ایده‌های طراحی سایت بازینو

## سه مسیر اولیه

### نام تم: Arena After Dark
معرفی کوتاه: یک لانچ‌پیج شبانه و پرانرژی با نورهای نئونی، کنتراست بالا و حس ورود به یک سالن رقابت خصوصی.
احتمال: 0.07

### نام تم: Mediterranean Playhouse
معرفی کوتاه: ترکیبی روشن‌تر از شب‌های مدیترانه، رنگ‌های آفتابی و فضای اجتماعی لانگ‌بیچ و کافه؛ مناسب برای انتقال حس تفریح و اقامت.
احتمال: 0.03

### نام تم: Hall of Legends
معرفی کوتاه: یک تجربه‌ی سینماتیک و تعاملی که کاربر با نشانگر، زاویه‌ی دوربین و مسیر کشف صحنه‌های کنسولی را کنترل می‌کند.
احتمال: 0.09

## مسیر منتخب: Hall of Legends — نسخه‌ی اصیل بازینو

### جنبش طراحی
سینمای تعاملی معاصر با الهام از تریلرهای بازی، پوسترهای مسابقات شبانه و editorial art direction؛ بدون تقلید از شخصیت‌ها یا لوگوهای دارای مالکیت فکری.

### اصول مرکزی
۱. صحنه باید مثل یک لحظه‌ی سینمایی دیده شود، اما CTA رزرو همیشه واضح و قابل‌دسترسی بماند.
۲. عمق با لایه‌های تصویر، نور حجمی، ذرات و Parallax سبک ساخته شود؛ نه با شلوغی یا جلوه‌ی صرفاً تزئینی.
۳. محتوای اصلی بازینو یعنی PS5، Xbox Series X، سالن VIP، نمایشگرهای ۸۵ اینچی، تورنومنت و کافه در مرکز روایت باقی بماند.
۴. هر تعامل باید حس کنترل دوربین و کشف یک Chapter را منتقل کند و در موبایل با Swipe و دکمه‌ی واضح جایگزین شود.

### فلسفه‌ی رنگ
مشکی و سرمه‌ای عمق سالن و شب را می‌سازند؛ زرد طلایی نشانه‌ی جام، پیروزی و امضای بازینو است؛ آبی نئونی مسیر نور، تکنولوژی و حرکت را مشخص می‌کند. رنگ‌ها برای ساختن فضای «رقابت لوکس در شب» انتخاب می‌شوند، نه برای ایجاد یک گرادیان تزئینی.

رنگ مالکیتی برند: `#FFC400`، زرد جام بازینو.

### پارادایم چیدمان
به‌جای یک Hero کاملاً وسط‌چین، صفحه از یک قاب سینمایی نامتقارن استفاده می‌کند: تیتر و CTA در یک ستون باریک در سمت چپ، شخصیت/صحنه در محور میانی، و اطلاعات Chapter در یک نوار عمودی یا گوشه‌ی پایین سمت راست. در اسکرول، بخش‌ها مثل پرده‌های جداگانه باز می‌شوند و یک نوار ثابت کوچک برای رزرو و نصب اپلیکیشن باقی می‌ماند.

### عناصر امضادار
- قاب‌های برش‌خورده با گوشه‌های فنی و خطوط آبی نئونی، هماهنگ با کاورهای اینستاگرام.
- نشانگر سینمایی که بین حالت `ORBIT`، `VIEW` و `DRAG` تغییر می‌کند اما مستقیماً به عناصر نمی‌چسبد.
- برچسب‌های Chapter با الگوی `CHAPTER 01 / CONSOLE ARENA` و نوار طلایی اطلاعات تورنومنت.

### فلسفه‌ی تعامل
کاربر با حرکت ماوس یا Swipe مانند یک فیلم‌بردار صحنه را کشف می‌کند. Hover فقط عمق میدان، نور و یک واکنش کوچک محیطی را تغییر می‌دهد. کلیک‌ها باید به رزرو، مشاهده‌ی جزئیات تورنومنت، نصب اپلیکیشن و مسیر دسترسی ختم شوند؛ هیچ تعامل تزئینی نباید مسیر تصمیم‌گیری را پنهان کند.

### انیمیشن
ورود سایت با تصویر قابل‌مشاهده در همان فریم اول آغاز می‌شود. Intro سینمایی کوتاه و قابل Skip است. نور و متن با Mask Reveal و حرکت ۱۸۰ تا ۳۰۰ میلی‌ثانیه‌ای ظاهر می‌شوند. Parallax با سرعت کم و inertia محدود اجرا می‌شود. Portal Shift بین Chapterها با حرکت افقی، تغییر تدریجی رنگ و ورود لایه‌ی بعدی انجام می‌شود. از fade-in سیاه طولانی، لرزش زیاد، blur دائمی و انیمیشن‌های سنگین روی موبایل اجتناب می‌شود. تمام حرکت‌های غیرضروری در `prefers-reduced-motion` کاهش می‌یابند.

### سیستم تایپوگرافی
- تیتر نمایشی: `Bebas Neue` برای کلمات کوتاه انگلیسی و شماره‌ی Chapterها.
- متن خوانا: `Manrope` برای انگلیسی و لاتین.
- فارسی و ترکی: `Vazirmatn` یا `Noto Sans Arabic` برای خوانایی و پشتیبانی چندزبانه.
- حروف بزرگ و tracking باز فقط برای برچسب‌های کوتاه و نام Chapter استفاده شود؛ پاراگراف‌ها فشرده یا تماماً uppercase نباشند.

### جوهره‌ی برند
بازینو، صحنه‌ی شبانه‌ی رقابت کنسولی در İskele برای بازیکنانی است که می‌خواهند تجربه‌ی VIP، تورنومنت و کافه را در یک مکان واقعی زندگی کنند؛ متفاوت چون هر رزرو مثل ورود به یک Chapter از بازی است.

شخصیت برند: **جسور، سینمایی، اجتماعی**.

### لحن برند
تیترها کوتاه، مطمئن و تصویری هستند؛ CTAها مستقیم و عملی‌اند؛ متن‌های کوچک حس دعوت به رقابت می‌دهند و ادعای ساختگی درباره‌ی جایزه یا رویداد نمی‌کنند.

نمونه‌ی تیتر: «Your next match starts here.»

نمونه‌ی CTA: «See official tournament details»

### Wordmark و لوگو
نشان اصلی یک `B` هندسیِ طلایی است که دو مسیر متقاطع شبیه خطوط یک Arena را در خود دارد؛ ستاره‌ی کوچک بالای آن نشانه‌ی مقام قهرمانی است. Wordmark `BAZINO` با حروف کشیده و فاصله‌گذاری اختصاصی کنار نشان قرار می‌گیرد و نباید با فونت پیش‌فرض تایپ شود.

### رنگ امضای برند
زرد جام بازینو: `#FFC400`.

## معماری تجربه‌ی انتخاب‌شده

- Hero: «A night built for the next match» با Chapterهای `Console Arena`، `VIP Challenge` و `Tournament Night`.
- بخش تجربه: کارت‌های زاویه‌دار برای PS5، Xbox Series X، نمایشگر ۸۵ اینچی و فضای VIP.
- بخش تورنومنت: نوار رویداد، وضعیت ثبت‌نام، لینک جزئیات رسمی جوایز و قوانین در `bazino.pro`.
- بخش کافه: روایت اجتماعی بین راندها و منوی کوتاه.
- بخش رزرو: CTA ثابت برای رزرو و نصب اپلیکیشن.
- بخش موقعیت: Vistamare Hotel، İskele با مسیر و اطلاعات تماس.

این فلسفه باید در تمام کامپوننت‌ها رعایت شود. هر انتخاب بصری باید پاسخ دهد: «آیا این تصمیم حس ورود به آرِنای شبانه‌ی بازینو را تقویت می‌کند یا آن را به یک قالب عمومی تبدیل می‌کند؟»


## Mona identity contract

“Mona” is the permanent project shorthand for Bazino’s recurring virtual influencer. Preserve her Mediterranean/Cypriot appearance, dark ponytail, black gaming jacket with gold piping and blue accents, confident half-smile, cinematic night lighting, and welcoming premium energy. Keep her original and brand-owned: no recognizable game characters, logos, weapons, or copyrighted game-world designs. In the Hero she anchors a 360-degree orbit of original genre signals, with pointer-driven camera movement and mobile/reduced-motion fallbacks.

## Style Decisions

- Yellow trophy `#FFC400` remains a signal color for CTAs, numerals, ticker moments, and trophy-state panels rather than a dominant full-field background.
- Blue neon is the required technology layer and must appear in every major chapter through glow, frame lines, data labels, screen atmosphere, or camera language.
- Technical clipped-corner, scoreboard, and HUD motifs should repeat across booking, café, location, app, and footer surfaces so the full page reads as one cinematic trailer.
- The approved Mona video remains the canonical Hero media; system-level depth, arena-screen context, and blue signal layers should strengthen her gaming-lounge role without changing her locked identity or wardrobe.
- Each major chapter should read as a distinct cinematic scene rather than a repeated editorial panel: tournament uses a signal board, lounge uses a camera/gallery cutaway, and the visit/app chapter uses a mobile beacon.
- Blue neon must be structural across the scroll through frame lines, screen atmosphere, data labels, and interaction feedback; yellow remains the focused action signal.
- The current approved Hero media is preserved as canonical; any future Mona media must follow the locked black gaming-jacket, gold-piping, blue-accent host identity.

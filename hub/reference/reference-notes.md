# Reference Notes — Hasti "Hub" Design (extracted from PDF pixels & text)

Source PDF: `hasti-hub-theme-guide.pdf` (copy of `راهنمای-قالب-هاب.pdf` from
portal repo `paymanshafayan/bazino-gamenet-portal`, branch `arena/01a07603-bazino-gamenet-portal`).
21 pages, Persian guide text + 15 embedded English-UI mockups (desktop-first, mobile responsive).

## Page inventory (PDF page → topic)

| p | Section | Notes |
|---|---|---|
| 3 | Header + Home | Nav: HOME GAMES EVENTS GALLERY PRICES SHOP FOOD&DRINKS ABOUT CONTACT + lang/bell/user |
| 4-5 | Home | Slider + quick-access cards + bottom info bar |
| 6 | Register/Login modals | Neon modal, gradient CTA |
| 7 | Location + hours | Map + opening-hours popup |
| 9 | EVENTS hub | 4 colored cards (NO Hall of Fame) |
| 10 | Weekly Tournaments | Big horizontal cards (FC26 covers visible) |
| 11 | Special Events | Info-only cards |
| 12 | Season Ranking | 4 seasons; weekly pts 5/2/1, special 10/4/2; Top3 gold/silver/bronze |
| 13-14 | **Tournament Brackets** | The core page. 32-player, live+past, Weekly/Special tabs, admin panel workflow (pairing, real-time results, auto-advance) |
| 15 | My Profile | Championship stats, credits, member card |
| 16 | Gallery | Thumbnails + lightbox, filters ALL/TOURNAMENTS/BAZINO LIFE |
| 17 | Prices | 3 cards: 85"TV+2pad=250TL/h, 65"=200TL/h, extra pad=25TL/h |
| 18 | Shop | COMING SOON |
| 19 | Food&Drinks | COMING SOON |
| 20 | About | — |
| 21 | Rules/Privacy/404 | — |

## Palette measured from the BRACKET mockup (page 14 crop → `brackets-ref-crop.png`)

Measured from saturated bright pixels (v>0.75, sat>0.4), core = bright quartile:

| Role | Hex (core) | Hex (mean) | Where it lives (row/col of mockup) |
|---|---|---|---|
| Orange (champion glow) | `#eab03d` | `#dc9e28` | rows .43-.53, cols .56-.62 → **center champion block only** |
| Gold trophy/yellow | `#fdcf1c` | `#facb13` | rows .43-.47, col .58-.60 (trophy inside champion) |
| Magenta (title accent) | `#da6ad2` | `#cf45cc` | rows .06-.23, cols .07-.60 → **top-left title area** |
| Violet | `#b067e9` | `#9f56d9` | rows .05-.43 (title + left column accents) |
| Cyan (bracket lines) | `#3ccaf5` | `#30b7e2` | spread rows .05-.60 = connector lines + links |
| Azure | `#68a7e6` | `#5595d7` | rows .07-.21, col mid .92 (top-right corner + lines) |
| Green | `#72e1a8` | `#63d59b` | tiny (LIVE/CTA accents) |

Neon pixel share of whole mockup: **0.68%** (bright saturated). Mean brightness 35.9/255.
Overall bg: deep navy `~#131728`-`#1b2438` band means; page aspect ≈ **1.53**.

## Layout metrics (mockup crop 1041×681)

- Top zone (header+hero+tabs) ≈ 22% of height; bracket zone 25-80%; footer bottom ~7%.
- Sidebar (game list): x 0-10%, quite narrow (~170px at 1680 render).
- Bracket panel: x 11-100% of body. R32 text column dense at x 25-40% → cards ~120-140px wide.
- Card columns detected at mid-height: x≈32-42% (left tree) and x≈76-87% (right tree) → **two-sided tree converging to center final** at x≈58% of page = panel center.
- Bright text mass: top-left (title) + left column (R32 names) — right half has LESS text than left (later rounds sparser + smaller sidebar on right corner x 75-95%).

## Text (page 13) — bracket page requirements

- Goals: next match, live tracking, full 32 bracket, match results, past replays (History).
- Tabs on top: Weekly Tournaments / Special Events.
- Key note: live tournament-day tool; admin panel advances rounds (pairing → real-time update, no refresh; winner auto-advances).

## Our v2 metrics vs reference (same-size compare, 2026-09-07)

| Metric | Ref | Ours v2 |
|---|---|---|
| Grid brightness similarity (10×10) | — | 96% |
| Neon share | 0.68% | 0.63% |
| pink+magenta mass | 1078 | 1137 ✓ |
| orange mass | 2090 | 1400 (still ~67%) |
| orange center (row/col) | .48/.59 | .54/.63 ✓ |
| page aspect | 1.53 | 1.68 |

## USER VERDICT (2026-09-07) — the ground truth for next session

> «میتونم بگم 50 تا 60 درصد تشابه وجود دارد فقط رنگ بندی نیست که ساختار صفحه و شکل اجزاء مهمند. بدون قابلیت ویژن نمیشه ادامه داد.»

Similarity is **50-60%**. The gap is **page structure + component shapes** (card designs,
title treatment, bracket card anatomy, tabs, spacing rhythm) — NOT colors (palette is now close).
Next session MUST have image vision to inspect `brackets-ref-crop.png` vs `hub/previews/bracket-full.png`
side by side and rebuild component anatomy to match.

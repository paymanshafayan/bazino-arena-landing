# Bazino Arena 3D — Handoff

## Mandatory operating rules

1. صداقت ۱۰۰٪: report only actions and tests that were actually executed. Never fabricate completion, browser results, server data, or visual inspection.
2. Work only on branch `arena/01a09131-bazino-arena-landing` and push only to that branch.
3. The design/theme ID must remain exactly `bazino-arena3d`.
4. Increment the theme version for every published change and archive the prior version under `archive/bazino-arena3d/`.
5. Do not create an installation ZIP unless the user explicitly requests one.
6. Do not modify the external Bazino portal repository. It is read-only reference material.
7. Never invent portal records, prices, events, address, telephone, or other dynamic content.
8. Real visual verification requires Chromium rendering, screenshots, and direct visual inspection.
9. Chat remains excluded. Reservations and Profile are not main navigation tabs.
10. Preserve the approved Hero frame-motion implementation; do not replace it with a video tag or explicit mouse/drag instructions.

## Current active theme

- Name: `Bazino Arena 3D`
- ID: `bazino-arena3d`
- Version: `1.0.3`
- SDK version: `2`
- Canonical folder: `themes/bazino-arena3d/`
- Editable compatibility source: `bazino-arena3d-package/`
- Active public preview: `client/public/arena3d-v103/`
- Previous version archive: `archive/bazino-arena3d/v1.0.2/`
- Preview route: `/arena3d-preview`
- Internal visual preview: `/arena3d-preview?internal=1&page=games`

## Implemented state

- Home uses the approved Mona Hero and local 394-frame virtual-tour sequence.
- Header is transparent and includes a real FA/EN/TR/RU dropdown using the SDK `onLanguage` callback.
- Seven navigation icons are distinct transparent colored PNGs.
- Contact information is read only from Settings Props:
  - address: `club_address` or `address`
  - phone: `club_phone`, `phone`, or `contact_phone`
- The contact panel is hidden when neither field exists; map/radar remains visible.
- Portal-owned internal pages receive the v1.0.3 spatial visual system through CSS targeting their real component classes.
- Internal surfaces covered: Games, Cafe, Shop, Tournaments, Loyalty, and Blog.
- Destination card remains Home-only; internal pages use the floating transparent Header.
- Preview fixtures are visual/testing-only and are not production portal records.

## Last verified results

- `corepack pnpm run check`: passed before publishing v1.0.3.
- `node --check bazino-arena3d-package/theme.js`: passed.
- Chromium desktop internal preview: rendered at 1440 px with no horizontal overflow.
- Chromium mobile internal preview: rendered at 390 px with no horizontal overflow.
- Final targeted Chromium run reported zero page errors.
- Screenshots for all six internal surfaces are stored in `screenshots/`.

## Version history

- `1.0.0`: archived under `archive/bazino-arena3d/v1.0.0/`
- `1.0.1`: archived under `archive/bazino-arena3d/v1.0.1/`
- `1.0.2`: archived under `archive/bazino-arena3d/v1.0.2/`
- `1.0.3`: active

## Important integration constraint

The portal SDK currently exposes `home`, `header`, and `mobileNav` theme regions. Internal portal pages are portal-owned React components, so v1.0.3 styles them through the theme CSS using their existing class structure rather than registering unsupported SDK regions.

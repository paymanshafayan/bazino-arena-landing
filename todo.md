# Bazino theme revision checklist

- [x] Re-read the Bazino GameNet portal README and the saved theme-engine notes.
- [x] Map every required homepage section and internal page route from the portal architecture.
- [x] Define the theme package contract: metadata, global CSS, homepage entry, shared shell, and route pages.
- [x] Replace the hero’s static cursor-depth effect with real mouse-driven Frame Motion: pointer tracking, inertial layers, parallax, scene transitions, and reduced-motion fallback.
- [x] Align global navigation, homepage sections, labels, and CTA destinations with the portal document.
- [x] Implement route coverage for all documented public pages with shared navigation and clear active states.
- [x] Preserve Bazino content constraints: console-only, VIP, 85-inch screens, café, tournaments, official prize information via bazino.pro, and TR/FA/EN/RU readiness.
- [x] Verify desktop/mobile layouts, route navigation, keyboard focus, reduced motion, and production build.
- [x] Package or document the theme-engine files and save a new checkpoint.

## Mona Hero revision

- [x] Persist the project alias: “Mona” means Bazino’s recurring virtual influencer.
- [x] Finalize the 360-degree cinematic Hero composition and exclude recognizable copyrighted game characters/logos.
- [x] Generate motion-ready Mona, game-world orbit, and transparent atmospheric assets.
- [x] Replace the Hero chapter slider with a cinematic Framer Motion scene driven by pointer position and inertial camera layers.
- [x] Add orbiting game-style glyphs/cards for multiple popular genres, without using licensed game IP.
- [x] Add touch/mobile and prefers-reduced-motion fallbacks without changing the rest of the Landing Page.
- [x] Validate Hero visual hierarchy, first-frame clarity, keyboard access, desktop/mobile behavior, and production build.
- [x] Save a new checkpoint for the Hero-only revision.

## Corrective Mona Hero rebuild

- [ ] Remove the static-image-plus-text-card Hero approach and treat it as a failed draft.
- [ ] Define the corrected Hero as Mona visibly turning and tracing original game-world holograms in the air.
- [ ] Generate a single cinematic Hero scene asset that already contains Mona, her turning gesture, air-drawn 360-degree holographic imagery, and Bazino’s dark-gold/neon-blue arena.
- [ ] Use pointer movement to control camera angle, depth, light, and scene parallax; do not simply slide the entire image left and right.
- [ ] Add subtle secondary motion: hologram orbit, light trails, particles, and Mona’s breathing/turning emphasis without relying on text cards.
- [ ] Keep the first frame readable, the CTA visible, and the rest of the Landing Page unchanged.
- [ ] Validate desktop/mobile behavior and save a corrected checkpoint.

## Approval gate and Mona identity lock

- [ ] Do not change code, assets, or structure until the user explicitly approves a written plan.
- [ ] Lock Mona’s identity before any further Hero work: face, hairstyle, outfit, lighting, and personality must remain consistent.
- [ ] Treat the current Hero as a failed draft because Mona’s identity changed and the scene became a static image with a simple circular effect.
- [ ] Prepare a precise plan for the corrected Hero and wait for explicit user approval before implementation.

## Mona reference image approval

- [ ] Generate one Mona reference image only; do not change code or project structure.
- [ ] Present the image to the user for explicit approval.
- [ ] After approval, lock the image as Mona’s permanent visual identity for future Bazino work.

## Mona Instagram-matching revision

- [ ] Revise the Mona reference image to match the visual identity already used in Bazino’s Instagram posts.
- [ ] Present the corrected image to the user for explicit approval.
- [ ] After approval, lock the image as Mona’s permanent visual identity for future Bazino work.

## Instagram reference matching

- [ ] Retrieve real @bazinopro posts and identify clear images containing Mona.
- [ ] Save the selected source URLs and identity observations before generation.
- [ ] Generate multiple candidate Mona images using the selected Instagram image as visual reference.
- [ ] Present all candidates for user selection; do not lock or use one in code before approval.

## Canonical Mona source correction

- [ ] Inspect the original representative Reel `https://www.instagram.com/reel/DbiJ2fIO7AU/` and compare it with the supplied Virtual Influencer Notes.
- [ ] Treat the original Reel as the canonical visual source: youthful female-presenting host, long brown hair, black sleeveless top, approachable gamer/host energy, neon PlayStation-focused lounge.
- [ ] Document why the prior generated candidates failed: changed face, changed wardrobe, and an incorrect futuristic character direction.
- [ ] Present a corrected image-generation plan and wait for explicit approval before generating or changing any project asset/code.

## Mona portrait extracted from approved Preview source

- [ ] Use `/home/ubuntu/screenshots/private-us-east-1_ma_2026-09-01_22-41-55_4562.webp` from the user-provided Preview as the sole visual reference.
- [ ] Generate one clean Mona portrait that preserves the Preview’s face, ponytail, black-and-gold look, and neon lounge identity.
- [ ] Present the portrait for explicit user approval; do not modify code or lock the asset before approval.

## Photorealistic GPT Mona revision

- [ ] Regenerate Mona with the GPT image model using the old Preview as the sole identity reference.
- [ ] Require a genuinely photographic result: natural skin texture, real hair detail, realistic eyes, face, lighting, and fabric; no painterly or illustrated rendering.
- [ ] Present the new portrait for explicit approval; do not lock it or use it in code before approval.

## User-approved Mona reference lock

- [x] Copy all user-provided Mona reference images into `/home/ubuntu/webdev-static-assets/` with stable filenames.
- [x] Create a manifest identifying the close-up, full-body, sleeveless-top, and black/gold outfit references.
- [x] Update `MONA.md` with the user-approved image set as canonical and explicitly prohibit identity drift.
- [x] Do not modify Hero, Landing Page, theme files, or application code during this lock step.

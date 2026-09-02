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

## New Bazino brand-system skill

- [x] Initialize `bazino-brand-system` using the skill creator scaffold.
- [x] Write a concise trigger and workflow in `SKILL.md`.
- [x] Add reference files for Instagram carousels, Reels, visual templates, captions/hashtags, Telegram cross-posting, website alignment, and locked Mona identity.
- [x] Include the explicit approval gate, three-item batching rule, console-only content focus, prize-information CTA, and no-PC constraint.
- [x] Validate the skill with the official quick validator.
- [x] Deliver the SKILL.md package for installation.

## Mona character bible integration

- [x] Add the user-provided `Mona.txt` content as the authoritative character-bible reference inside `bazino-brand-system`.
- [x] Update SKILL.md routing and precedence so the character bible is read for all Mona-related work.
- [x] Preserve the locked visual asset references while adding the personality and communication rules.
- [x] Validate and deliver the updated skill package.

## Mona game-role wardrobe rule

- [x] Add a rule that every new Mona image or video uses a distinct game-role wardrobe or character archetype.
- [x] Preserve Mona’s locked face, hair, skin, body silhouette, and personality while allowing requested role-specific clothing changes.
- [x] Specify original archetypes such as footballer, formula driver, fantasy adventurer, and cyberpunk hero without copying protected characters, logos, or signature costumes.
- [x] Update the main skill routing, validate the skill, and deliver the updated SKILL.md.

## Mona cinematic wardrobe-change video

- [x] Produce a 10–15 second video, ideally 12 seconds, with Mona performing a natural human full-body spin like a fashion-show reveal.
- [x] Preserve the locked Mona face, hair identity, skin tone, body proportions, and confident playful presence in every frame.
- [x] Use four original game-role wardrobe archetypes: football champion, formula-style racing driver, cyberpunk arena hero, and fantasy adventure champion.
- [x] Make wardrobe changes occur during clean full rotations with believable cloth, hair, body weight, and lighting continuity.
- [x] Keep the output cinematic and realistic, without direct copyrighted character costumes, logos, or signature weapons.
- [x] Do not generate until the user explicitly approves the detailed plan.

## Mona Hero output correction

- [x] Rebuild the successful Mona fashion-show motion as a true full-frame 16:9 Hero video.
- [x] Preserve the successful natural spin, identity continuity, and wardrobe transitions.
- [x] Fill the complete frame with a cinematic Bazino gaming-lounge environment; do not leave vertical side gaps or pillarboxing.
- [x] Do not attempt transparent video in this pass; the Hero recommendation is a full-background master.
- [x] Generate only after explicit approval of the correction plan, then validate the file without integrating it into code.

## Mona Hero continuity correction

- [ ] Keep the successful action through second 7 unchanged.
- [ ] Complete the rotation naturally after second 7 before any approach toward camera.
- [ ] Preserve the exact outfit and Mona identity through the ending; prohibit any sudden wardrobe change.
- [ ] Make the final approach to camera gradual, human, and continuous with stable lighting and background.
- [ ] Generate only after explicit approval of this correction plan; validate the edited file without integrating it into code.

## Hero Frame Motion conversion

- [x] Use the corrected 16:9 Mona video as the Hero motion asset.
- [x] Upload the video through the webdev asset workflow and reference the returned stable URL.
- [x] Add a paused video scrubber controlled by forward/backward mouse movement, with clamped currentTime and no autoplay.
- [x] Add touch drag fallback and a visible interaction cue without obscuring the CTA.
- [x] Preserve keyboard focus, reduced-motion fallback, poster/first-frame readability, and responsive behavior.
- [x] Do not edit code until the user explicitly approves the implementation plan.

## Hero legacy cleanup

- [x] Audit Home.tsx for old pointer parallax, spring transforms, chapter-slider behavior, and stale Hero fallbacks.
- [x] Audit index.css for old Hero image, orb, grid, chapter, and cursor-motion rules that conflict with Frame Motion.
- [x] Identify stale asset references, especially the old Hero image and poster path shown before the video loads.
- [x] Present the exact cleanup scope and wait for explicit approval before editing code.
- [x] After approval, make Frame Motion the sole Hero timeline controller and ensure the video’s first frame is the only initial visual.
- [x] Validate desktop/mobile, first-frame loading, pointer direction, touch drag, reduced motion, and production build.

## Approved Hero cleanup execution

- [x] Re-read the static web guidance and current Hero files after context compaction.
- [x] Remove legacy Parallax motion values, handlers, transforms, and moving overlay layers from Home.tsx.
- [x] Remove obsolete Hero image/fallback CSS and ensure the video is the only Hero visual timeline.
- [x] Extract and upload the video’s first frame as the poster so no old Hero image appears during initial load.
- [x] Validate TypeScript, production build, desktop/mobile screenshots, and first-frame presentation.
- [x] Save and deliver the cleaned Hero checkpoint.

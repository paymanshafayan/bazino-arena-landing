# Hero Rebuild Validation

- Desktop Preview at 1280×720 renders the corrected Mona video source with a clear, transparent presentation; the former dark full-screen vignette is no longer visible.
- Mobile Preview at 390×844 renders the same source with readable Turkish heading/body and CTA buttons; Mona remains visible behind the copy without an opaque Hero layer.
- The first frame now uses the first frame extracted from the continuous-ending video.
- TypeScript and production build pass after the Hero source and CSS changes.
- The dev-server status card still surfaces an older Vite parse-error log entry at the historical line 288, but current TypeScript/build checks and screenshots render successfully.

## Final pass

After a clean dev-server restart, the desktop preview showed the active continuous-ending source with the updated “THE SHOW” metadata and no full-screen dark overlay. The final mobile preview remained readable, showed the same corrected video composition, and displayed the new autoplay-show footnote rather than scrub instructions. No percentage indicator, resize cursor, or Frame Motion UI remains in the Hero CSS.

## Single-playback revision

The Hero video no longer has the `loop` attribute. It uses muted autoplay with `playsInline` and pauses explicitly on `ended`, leaving the media element on its final frame. TypeScript and production build pass. Desktop at 1280×720 and mobile at 390×844 both render the corrected clear Hero composition with readable copy and no Frame Motion UI.

## Replay and final-frame CTA validation

A headless Chromium playback check confirmed the video starts normally, reaches `currentTime === duration` with `paused: true` and `ended: true`, and then renders the final-frame panel containing both the reservation CTA and replay button. Clicking replay resets the video to the beginning, resumes playback, and hides the final-frame panel. The desktop ended-state capture shows a localized glass-and-gold panel at the lower right that preserves Mona and the main Hero copy.

## Responsive polish

The mobile ended-state capture was reviewed after the panel refinement. The final-frame reservation CTA now sits beneath the primary Hero actions, while the replay control remains within the same bordered panel and remains reachable. The interaction check still confirms natural end-state pause, panel visibility, replay reset, and resumed playback after the CSS-only adjustment.

# Hero Rebuild Validation

- Desktop Preview at 1280×720 renders the corrected Mona video source with a clear, transparent presentation; the former dark full-screen vignette is no longer visible.
- Mobile Preview at 390×844 renders the same source with readable Turkish heading/body and CTA buttons; Mona remains visible behind the copy without an opaque Hero layer.
- The first frame now uses the first frame extracted from the continuous-ending video.
- TypeScript and production build pass after the Hero source and CSS changes.
- The dev-server status card still surfaces an older Vite parse-error log entry at the historical line 288, but current TypeScript/build checks and screenshots render successfully.

## Final pass

After a clean dev-server restart, the desktop preview showed the active continuous-ending source with the updated “THE SHOW” metadata and no full-screen dark overlay. The final mobile preview remained readable, showed the same corrected video composition, and displayed the new autoplay-show footnote rather than scrub instructions. No percentage indicator, resize cursor, or Frame Motion UI remains in the Hero CSS.

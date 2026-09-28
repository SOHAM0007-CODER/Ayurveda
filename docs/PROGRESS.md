# Swasthyam Ayurved - Redesign Progress

## Completed Steps
*   **Step 1:** Cleaned up project, removed old `morter.glb` and `morter-draco.glb` 3D models.
*   **Step 2:** Media compression complete. Extracted 150 hero frames for desktop and mobile, converted images to WebP, and processed `intro.mp4`, `khalva-loop.mp4`, and `herbs-alive.mp4` via ffmpeg.
*   **Step 3:** Rebuilt Phase 1 Design System. Applied new color tokens, Devanagari font, glassmorphism (`.glass`), and the interactive leaf buttons.
*   **Step 4:** Implemented Smooth Scroll & Animations. Added `lenis`, `@gsap/react`, `gsap`, built `SmoothScrollProvider` and `MotionKit` (`Reveal`, `SplitHeading`), and wrapped all pages.
*   **Step 5:** Built the Living Background. Created `LivingBackground.jsx` with a scroll-scrubbed sky gradient, mouse-parallax DOM trees (`branches-back.webp`, `trunk.webp`, `branches-front.webp`, `blossoms.webp`), and a fast CPU-instanced React Three Fiber petal field.

## Known Bugs
*   The leaf cursor is not showing on desktop.

## Missing Media
*   About page video (`khalva-loop.mp4`) and any remaining missing PNGs.

## Next Steps
*   Fix the leaf cursor bug.
*   **Step 6:** Intro film implementation.

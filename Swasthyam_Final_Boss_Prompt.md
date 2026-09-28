# FINAL BOSS PROMPT — paste into Antigravity (Planning mode)

## Before you paste (do these 3 things)
1. Put the skill folder in your project exactly like this:
   `ayurveda_project/.agent/skills/swasthyam-motion/SKILL.md`
   (create the `.agent` and `skills` folders yourself; the dot at the start of `.agent` is important).
2. Make sure `docs/REDESIGN_PLAN.md` (the Mega Plan) is in the project.
3. Clean `public/`: `Intro film.mp4` moved to `public/intro/intro.mp4`, "New folder" emptied/removed, all other files in their folders.

---

## The prompt

```
You are building the final, award-level version of the Swasthyam Ayurved website.

READ FIRST, fully, before doing anything:
1. .agent/skills/swasthyam-motion/SKILL.md  — HOW to build (smoothness laws, code patterns, budgets, QA). Follow it strictly for every task.
2. docs/REDESIGN_PLAN.md — WHAT to build (design, sections, Panchakarma journey, phases).
3. docs/MEDIA_TODO.md — what media is expected where.

GOAL: a calm, premium, butter-smooth 3D-interactive Ayurveda clinic website — glassmorphism interface, living blossom-tree background with falling petals, intro film, scroll-scrubbed cinematic hero, leaf cursor, animated Panchakarma journey — running at 60fps on laptops and smoothly on mid-range Android phones. Sharp on Retina/4K screens via devicePixelRatio, but never ship 4K media.

CURRENT MEDIA (all in public/, use exactly these, do not rename or regenerate):
- Tree: tree/trunk.png, tree/branches-back.png (has its own trunk: furthest layer, opacity .6, blur 2px, bottom 35% faded with mask-image), tree/branches-front.png, tree/blossoms.png
- Petals: textures/petal-pink.png, petal-cream.png, petal-saffron.png
- Hero fallback: images/hero-still.png
- Panchakarma: panchakarma/vamana.png, virechana.png, basti.png, nasya.png, raktamokshana.png
- Dosha orbs: dosha/vata.png, pitta.png, kapha.png
- Videos: intro/intro.mp4 (intro film), hero-seq/hero-desktop.mp4 (hero scroll sequence), videos/khalva-loop.mp4 (About page), videos/herbs-alive.mp4 (background of final CTA section on Home)
- Logo: brand/swasthyam-logo.png — keep using it; I may replace the file later with the same name.
Only 16:9 videos exist: create mobile versions by centre-cropping to portrait.

STEP 1 — Clean up
- Remove the old 3D mortar model completely: delete public/morter.glb, public/morter-draco.glb, public/draco/, InteractiveHerbModel.jsx and all useGLTF code/imports. Remove "Scroll to explore Khalva Yantra" text.
- Delete any leftover placeholder logo files. Search the repo for "AyuLife" and fix any left.
- Report the public/ folder size before and after.

STEP 2 — Media processing (SKILL.md section 9)
- Check ffmpeg is installed (if not, tell me: winget install ffmpeg).
- Check every video for a corner watermark and crop it if present.
- Create compressed MP4 + WebM (no audio) + poster for every video; export hero frames (desktop 1600w, mobile 900w portrait) as WebP.
- Create WebP versions of all images (keep transparency). Keep originals.
- Report a table: file, original size, final size.

STEP 3 — Build / finish every phase using SKILL.md patterns
- Phase 1 design tokens + glass system (if not complete)
- Phase 2 SmoothScrollProvider + motion kit (Reveal, SplitHeading, Parallax, PinSection, TiltCard, Magnetic)
- Phase 3 LivingBackground: sky gradient + 2.5D tree layers + R3F instanced petals with real petal textures, scroll gust, mouse repulsion
- Phase 4 IntroFilm with real logo overlay + LeafCursor
- Phase 5 Cinematic HeroSequence (scroll-scrubbed frames) with glass headline card
- Phase 6 Panchakarma animated journey with the 5 background images + SVG body silhouette + progress rail
- Phase 7 restyle all pages; dosha quiz uses the orb images; About page uses khalva-loop video in a glass frame; Home final CTA uses herbs-alive video behind glass
- Page transitions (SKILL.md section 10)
Do one phase at a time. After each: npm run build + npm run lint, fix everything, take screenshots with your browser tool at 390px and 1440px, give me a short report, and wait for my "go".

STEP 4 — Final Boss polish
- Tune all easings/durations so everything feels soft and unhurried (SKILL.md section 3 vocabulary).
- Performance pass: code-split routes and the R3F scene, lazy-load below-fold media, preload only LCP assets, fix any long tasks.
- Run the full SKILL.md section 11 QA checklist and Lighthouse (mobile + desktop). Report every item as ✅/❌ with numbers, fix all ❌, then report again.
- Test reduced-motion mode, keyboard navigation, Safari/iOS behaviour.

RULES
- Never remove existing content, pages, routes, booking form, dosha test data or Panchakarma data — restyle and extend only.
- Medical site: calm over flashy, no cure claims, no fake credentials, Book Appointment + WhatsApp always one tap away.
- If something in the plan would hurt smoothness, choose smoothness and tell me why.

Start with STEP 1 and STEP 2, show me the reports, then wait for my approval.
```

---

## How to reply to Antigravity after each phase
- Looks good → `go`
- Something wrong → take a screenshot, drag it into the chat, and write what feels wrong, e.g.
  *"Petals too fast and too many on mobile, make them slower and fewer"* or
  *"Hero scroll feels jumpy, make it smoother (increase scrub, check frame loading)"*.
- Phone feels slow → `Run the SKILL.md performance checklist on mobile with 4x CPU throttle and fix the biggest problems.`

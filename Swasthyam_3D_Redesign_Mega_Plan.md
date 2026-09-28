# SWASTHYAM AYURVED — 3D Interactive Redesign · Mega Plan for Antigravity

**Site:** SwasthyamAyurved.com  **Client:** Ayurveda doctor (clinic website)
**Goal:** A calm, premium, "super cool" 3D-interactive website that still feels trustworthy for a medical practice.

> How to use this file
> 1. Put the whole file in your project root as `docs/REDESIGN_PLAN.md`.
> 2. Copy **Section 3 (Rules)** into Antigravity → Customizations → Workspace Rules (so the agent follows it in every task).
> 3. Run the phases in **Section 8** one by one. Each phase has a ready-to-paste prompt. Use Planning mode, approve the plan, then let it build.
> 4. Generate the intro video and images using the separate file `Swasthyam_Intro_Video_Prompts.md` **before Phase 2**.

---

## 1. Why the current 3D looks bad (so we don't repeat it)

| Problem seen in the screen recording | Cause | Fix in new design |
|---|---|---|
| Mortar, tray and herbs look plastic, low-poly and muddy brown | Free/generated low-poly model, low-res textures, no proper PBR materials, flat lighting | Stop using a real-time 3D object as the hero. Use a **cinematic video / scroll-scrubbed image sequence** for photoreal objects. Keep real-time 3D only for things that look good as simple shapes: **petals, light, particles, mist**. |
| Model is huge, cropped and tilted; the tray fills half the screen | Camera and scale were not art-directed; model origin is off | Hero becomes full-bleed with the product/scene composed on purpose in the video. |
| Dark green background + dark brown model = no contrast | Palette clash | New palette: soft dawn light, cream, sage, saffron and lotus pink behind glass panels. |
| 6 MB of GLB files (`morter.glb` + `morter-draco.glb`) | Unoptimised assets, one is unused | Remove both from the hero. Total 3D budget: under 1.5 MB. |
| Hero feels static apart from rotation | No scroll storytelling | GSAP ScrollTrigger scenes, pinned sections, parallax depth, and a petal field that reacts to scroll and mouse. |

Keep the existing content, pages, routes, booking form, dosha test and Panchakarma data. **We are changing the look and motion, not throwing away the website.**

---

## 2. Creative direction — "Vasanta Prabhat" (spring dawn in an Ayurvedic garden)

**Feeling:** early morning in a quiet herbal garden. Warm sun through leaves, a flowering tree swaying, petals drifting, brass and copper vessels, steam from a herbal decoction. Healing, warm, unhurried.

**Why this fits an Ayurveda doctor:** spring (Vasanta) is the classical season for Panchakarma and renewal, and dawn (Brahma Muhurta) is the Ayurvedic ideal time to wake. The story of the site becomes *renewal*, which is what Panchakarma promises.

### Colour tokens (update `@theme` in `src/index.css`)
| Token | Hex | Use |
|---|---|---|
| `--color-dawn` | `#FFF6EC` | page base, light areas |
| `--color-sandal` | `#F1E3CF` | warm secondary background |
| `--color-sage` | `#7A9272` | leaves, secondary text |
| `--color-forest` | `#1F3A2E` | headings, footer, deep sections |
| `--color-saffron` | `#E08A2E` | primary buttons, highlights |
| `--color-lotus` | `#E9A6A6` | petals, soft accents |
| `--color-brass` | `#C9A45C` | thin borders, icons, dividers |
| `--color-ink` | `#2A2622` | body text |

Keep old token names (`botanical`, `terracotta`, `gold`, `linen`…) as aliases pointing to the new values so nothing breaks.

### Typography
- Headings: **Cormorant Garamond** (keep, already loaded) — large, light weight, generous line-height.
- Body/UI: **Inter** → optionally switch to **Manrope** for a softer, rounder feel.
- Devanagari accents (स्वास्थ्यम्, पञ्चकर्म): **Tiro Devanagari Sanskrit** or **Noto Serif Devanagari** (Google Fonts). Currently Devanagari falls back to a system font and looks broken.

### Glassmorphism system (the "interior")
All content sits on frosted-glass panels floating over the living background.

```css
.glass {
  background: rgba(255, 250, 242, 0.55);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 10px 40px rgba(31, 58, 46, 0.12), inset 0 1px 0 rgba(255,255,255,0.6);
  border-radius: 28px;
}
.glass-dark { background: rgba(31, 58, 46, 0.45); border-color: rgba(201,164,92,0.35); color: #FFF6EC; }
/* subtle grain so glass doesn't look flat/plastic */
.glass::after { content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background-image:url('/textures/noise.png'); opacity:.05; mix-blend-mode:overlay; }
@supports not (backdrop-filter: blur(1px)) { .glass { background: rgba(255,250,242,0.92); } }
```
Rules: text on glass must pass **WCAG AA contrast (4.5:1)**; never more than 2 layers of glass stacked; blur ≤ 24px (performance).

---

## 3. Workspace Rules for Antigravity (paste into Customizations → Rules)

```
You are working on Swasthyam Ayurved, a medical clinic website for an Ayurveda doctor.
- Stack: React 19 + Vite + Tailwind v4 + React Router + React Three Fiber/Drei. Add only: gsap (with ScrollTrigger, SplitText), lenis, lottie-react (optional), maath.
- Never delete existing pages, routes, data, the booking form, the dosha test or Panchakarma content. Restyle and extend them.
- Calm over flashy: every animation must be slow, eased (power2/expo out, 0.6–1.2s), and never block reading or booking.
- Performance budget: 60fps on a mid-range Android phone; LCP < 2.5s; JS for first page < 250 KB gzip; 3D assets < 1.5 MB; intro video < 3 MB.
- Always respect prefers-reduced-motion: disable smooth scroll, petals, parallax and intro video; show static images.
- Pause all canvases and videos when the tab is hidden or the element is off-screen.
- Only one WebGL canvas on the page at a time (the global background). No extra canvases per section.
- Mobile first: touch devices get no custom cursor, fewer petals (≤ 60), no pinned horizontal scroll longer than 3 screens.
- Text on glass must meet WCAG AA contrast. All interactive elements keyboard-accessible with visible focus.
- Medical content: no "cure" claims, no fake credentials; clinic data comes only from src/config/siteConfig.js.
- After every task: run npm run build and npm run lint, fix errors, and report what changed with screenshots at 390px and 1440px.
```

---

## 4. Skills & tech stack required

### Libraries to install
```bash
npm i gsap @gsap/react lenis maath lottie-react
# already present: three @react-three/fiber @react-three/drei react-router-dom
npm i -D @gltf-transform/cli sharp   # asset optimisation (optional)
```
GSAP and all its plugins (ScrollTrigger, SplitText, ScrollSmoother, MorphSVG, DrawSVG) are free for commercial use since 2025.

### Skill map — what each technique is used for
| Skill / tool | Used for |
|---|---|
| **Lenis** | Buttery smooth scrolling (inertia) synced to GSAP ticker |
| **GSAP ScrollTrigger** | Pinned sections, scrubbed timelines, reveal on scroll, horizontal Panchakarma journey |
| **GSAP SplitText** | Headings reveal letter-by-letter / line-by-line |
| **React Three Fiber + InstancedMesh + custom shader** | 300–600 falling petals in one draw call, wind sway, mouse repulsion |
| **Canvas image-sequence scrubbing** | Apple-style scroll-controlled "cinematic" hero (frames exported from the AI video) |
| **CSS 3D / layered parallax** | Blossom tree layers swaying (2.5D, very cheap) |
| **SVG + DrawSVG / MorphSVG** | Line-art leaf, body silhouette for Panchakarma organ highlights, dosha elements |
| **Lottie (optional)** | Small looped icons (diya flame, steam, drop) |
| **HTML5 `<video>`** | Intro film, background loops (muted, playsInline, WebM + MP4) |
| **Web performance** | `IntersectionObserver`, `requestIdleCallback`, `React.lazy`, AVIF/WebP images, KTX2/Draco only if 3D models stay |
| **Accessibility** | `prefers-reduced-motion`, focus management, contrast checks |
| **Gemini (Veo + image model)** | Intro film, hero loop, tree/petal layers, section imagery (see prompts file) |

### Asset tools (free)
Gemini (Veo for video, image model for stills) · **ffmpeg** (compress video, export frames) · **Squoosh** (AVIF/WebP) · **SVGOMG** (clean the logo SVG) · **gltf-transform** (only if you keep any model) · **Lottiefiles** (small icons).

---

## 5. Site architecture (motion map)

```
[Intro film 6–8s, once per session, skippable]
        ↓ crossfade (last frame of film == first frame of hero)
┌─────────────────────────────────────────────────────────────┐
│ GLOBAL LIVING BACKGROUND (fixed, behind everything)          │
│  • sky gradient that shifts dawn → day → dusk as you scroll  │
│  • 2.5D blossom tree layers swaying (right side)             │
│  • R3F petal field (instanced), wind + mouse + scroll gust   │
└─────────────────────────────────────────────────────────────┘
  Header: floating glass pill, shrinks on scroll
  1. HERO ........... scroll-scrubbed cinematic sequence + glass headline card
  2. WELCOME ........ glass card slides in, doctor portrait with soft parallax
  3. TREATMENTS ..... 3D-tilt glass cards, stagger reveal
  4. PANCHAKARMA .... pinned horizontal journey, 5 scenes (Section 7)
  5. DOSHA .......... Vata / Pitta / Kapha orbs (air, fire, water/earth), quiz in glass
  6. HOW IT WORKS ... line-art path draws itself as you scroll (4 steps)
  7. TESTIMONIALS ... slow floating glass quotes
  8. BLOG / GALLERY . masonry with hover depth
  9. CTA + FOOTER ... petals settle to the "ground", background turns dusk
```

---

## 6. Feature specs

### 6.1 Intro film (opening)
- Component `IntroFilm.jsx`, full-screen, above everything (`z-[100]`).
- Plays once per session (`sessionStorage`), **Skip** button visible from 0s, auto-skip after video ends or 9s max.
- `<video autoplay muted playsInline preload="auto" poster="/intro/poster.avif">` with `intro.webm` (VP9) + `intro.mp4` (H.264) sources; 1920×1080 desktop, 1080×1920 or 720p for mobile (choose via `matchMedia`).
- **Real logo overlaid in code** during the last 2 seconds (AI video models distort text and logos — never let the video draw the logo). Logo: `/public/brand/swasthyam-logo.svg`, fades + scales from 0.92 → 1, with "स्वास्थ्यम्" and tagline below.
- Exit: logo and film fade out while the hero fades in underneath (0.8s). Film's last frame must visually match the hero's first frame (same colours, same garden).
- Skip entirely if `prefers-reduced-motion`, `navigator.connection.saveData`, or slow connection (`effectiveType` 2g/3g) — show logo splash only (existing SplashIntro).
- Do not block: preload hero assets while the film plays.

### 6.2 Global living background
**Layer A – Sky:** fixed full-screen div with a CSS gradient whose stops are GSAP-animated by overall scroll progress: dawn peach/cream at top → soft daylight → warm dusk saffron near the footer.

**Layer B – Blossom tree (2.5D):** 3–4 transparent PNG/AVIF layers (trunk, back branches, front branches, blossoms) generated from Gemini (prompts file). Each layer sways with a slow CSS/GSAP `rotate` around its base (±0.6°–1.5°, 6–9s, sine ease, different phase per layer). Mouse moves layers slightly (parallax 5–20px). On mobile, show 2 layers only.

**Layer C – Petal field (R3F):** one fixed `<Canvas>` behind content (`pointer-events:none`, `dpr={[1,1.5]}`, `frameloop="always"` only while visible).
- `InstancedMesh` with a curved plane (petal shape via alpha texture or bent geometry), 400 desktop / 60 mobile.
- Per-instance: random size, rotation speed, fall speed, colour between lotus pink and cream.
- Motion: gravity + sine sway + simple curl-noise wind in the vertex shader (keep CPU free).
- Scroll velocity from Lenis creates a "gust" (petals briefly speed and drift sideways).
- Mouse position gently pushes nearby petals away (repulsion radius ~1.5 units).
- Soft depth of field feel: back petals smaller, more transparent.
- Pause when `document.hidden`.
- Optional tiny "pollen/dust in sunlight" particles (points material, additive blending, 150 count).

### 6.3 Smooth scroll & scroll animations — requirements
- **Lenis** config: `lerp: 0.08`, `smoothWheel: true`, `syncTouch: false` (native scroll on phones feels better), connect to GSAP: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)`.
- One `SmoothScrollProvider` at the layout level; route change → `lenis.scrollTo(0, {immediate:true})` and `ScrollTrigger.refresh()`.
- Use `useGSAP()` hook from `@gsap/react` for every animation so it cleans up on unmount (prevents duplicate triggers when navigating between pages).
- Animate only `transform` and `opacity` (and CSS variables). Never animate `top/left/width/height/filter: blur()` on scroll.
- Reusable patterns (make these as small components/hooks):
  - `<Reveal>` fade-up 24px + opacity, stagger 0.08s, `start: "top 85%"`.
  - `<SplitHeading>` SplitText lines mask-reveal.
  - `<Parallax speed={0.2}>` for images/portraits.
  - `<PinSection>` for pinned storytelling.
  - `<TiltCard>` glass cards tilt max 6° toward mouse (desktop only) with a moving highlight.
- Scroll progress bar: thin saffron line at top of header.
- Reduced motion: all of the above become instant/static.

### 6.4 Hero — cinematic scroll sequence
Replace the mortar model with an Apple-style **image sequence**:
1. Generate the "hero sequence" video with Gemini/Veo (prompt in prompts file): slow orbit around a brass khalva (mortar) with fresh herbs, turmeric, tulsi and petals falling in morning light.
2. Export frames: `ffmpeg -i hero.mp4 -vf "fps=24,scale=1600:-1" frames/%03d.webp` (≈ 120–150 frames, each 40–70 KB). Mobile set at 900px wide.
3. `HeroSequence.jsx` draws frames on a `<canvas>`; ScrollTrigger pins the hero for ~150vh and scrubs frame index 0 → last.
4. Load first frame immediately (LCP), rest progressively in the background.
5. Glass headline card on the left: "Swasthyam Ayurved" + tagline + two buttons (Book consultation / Explore Panchakarma). Headline lines reveal with SplitText after intro film ends.
6. At the end of the pin, a scroll cue "Begin your healing journey" and the page continues.

### 6.5 Leaf cursor
- `LeafCursor.jsx` rendered once in layout; desktop + fine pointer only (`matchMedia('(pointer: fine)')`).
- Small SVG leaf (tulsi/peepal shape, 22px) in sage with brass vein, follows mouse with `gsap.quickTo` (duration 0.35, ease power3) so it trails softly.
- Rotates to face movement direction (atan2 of velocity) and sways slightly when idle.
- States: over links/buttons → grows to 36px and fills saffron; over text inputs → hide (use normal text cursor); on click → quick "flutter" scale 0.85 → 1.
- Optional trail: 3–5 tiny petals fading behind fast movements.
- Keep the real cursor as fallback: `cursor: none` only on `body` when the leaf is active; never hide cursor for touch, reduced motion, or keyboard users.

### 6.6 Micro-interactions
- Buttons: soft glass with saffron fill; hover = light sweep across the glass + leaf icon nudges 4px.
- Magnetic effect on primary CTAs (max 8px pull).
- Nav links: underline grows from centre like a vine.
- Form fields: glass inputs; focus = brass glow; success = petal burst (20 petals, 1s).
- Page transitions: short (0.5s) cream wash with a single petal sweeping across; no long loaders.

---

## 7. Panchakarma section — animated journey (main showpiece)

**Layout:** section pinned; content moves **horizontally** through 5 scenes while the user scrolls vertically (desktop). On mobile: vertical stacked scenes with the same animations triggered on entry.

**Persistent elements:**
- Left: a line-art **human body silhouette (SVG)** inside a glass panel. Each therapy highlights its target region with a soft glowing gradient and a DrawSVG outline:
  Vamana → chest/stomach · Virechana → liver/small intestine · Basti → colon/lower back · Nasya → head/sinuses · Raktamokshana → blood/skin (vein lines pulse).
- Top: progress rail with 5 Sanskrit names; active one in saffron; clicking jumps to the scene (`lenis.scrollTo`).
- Dosha badge morphs between Kapha / Pitta / Vata icons (MorphSVG).

**Per-scene animation (inside a large glass card on the right):**
| Scene | Element animation | Colour mood |
|---|---|---|
| Vamana (Kapha) | slow rising water droplets, soft upward flow lines | cool aqua-green |
| Virechana (Pitta) | gentle flame/sun rays calm down into cool leaves | saffron → sage |
| Basti (Vata) | spiral wind lines settle into grounded horizontal lines | warm sand |
| Nasya | faint mist/steam rising towards the head | pearl white |
| Raktamokshana | thin red lines purify into clear, calm lines | rose → cream |

Each scene shows: name + Sanskrit, English meaning, which dosha it balances, 3 short benefits (careful wording), "Read full guide" link to `/panchakarma/:slug`. Text enters with a 0.1s stagger after the illustration settles.

**Also on the Panchakarma page:**
- **Three stages timeline** (Purvakarma → Pradhanakarma → Paschatkarma): a copper line draws itself down the page; each stage node blooms like a flower when reached.
- **Packages (7 / 14 / 21 days):** three glass cards that rise in sequence; the middle one slightly raised and brass-bordered.
- **"Before & after care"** checklist: items tick with a leaf icon as they scroll in.

**Other sections needing animation positions (same system):**
- *Treatments grid:* cards tilt, image inside card parallax 10%.
- *Dosha quiz:* three element orbs (Vata = swirling air particles, Pitta = warm glowing core, Kapha = slow liquid blob) drawn in CSS/SVG (not a second WebGL canvas). Result screen: the winning orb grows and others fade.
- *How it works:* SVG vine path grows between 4 steps, leaves unfurl at each step.
- *About → Khalva Yantra:* replace the 3D model with a short looping video (from prompts file) in a glass frame.

---

## 8. Build phases (paste each prompt into Antigravity)

### Phase 0 — Audit & setup
```
Read docs/REDESIGN_PLAN.md fully. Inspect the current repo (all pages, components, routes, data) and list what exists.
Install gsap, @gsap/react, lenis, maath, lottie-react. Create a branch "redesign-3d".
Create folders: src/motion (hooks & providers), src/scene (R3F background), public/intro, public/hero-seq, public/brand, public/textures.
Add the logo I provide at public/brand/swasthyam-logo.svg (optimise it, keep colours) and use it in header, footer, favicon and intro.
Do not change any visuals yet. Report the inventory and an implementation plan for Phases 1–8.
```

### Phase 1 — Design tokens, fonts, glass system
```
Update src/index.css @theme with the new palette from Section 2 (keep old token names as aliases). Add Tiro Devanagari Sanskrit (or Noto Serif Devanagari) for Devanagari text.
Create glass utility classes (.glass, .glass-dark, grain overlay, @supports fallback) as in Section 2.
Restyle Header as a floating glass pill that shrinks on scroll with a saffron scroll-progress line. Restyle LeafButton to glass + saffron.
Check contrast (AA) for all text on glass. Build, lint, screenshots.
```

### Phase 2 — Smooth scroll engine & motion kit
```
Create src/motion/SmoothScrollProvider.jsx (Lenis + GSAP ticker + ScrollTrigger sync, reset on route change, disabled with prefers-reduced-motion).
Create reusable components/hooks with useGSAP: Reveal, SplitHeading, Parallax, PinSection, TiltCard, Magnetic. Follow Section 6.3 exactly.
Apply Reveal and SplitHeading to headings and sections on all pages. Verify no duplicate ScrollTriggers after navigating between pages.
```

### Phase 3 — Global living background
```
Build src/scene/LivingBackground.jsx per Section 6.2: sky gradient driven by scroll, 2.5D blossom tree layers from public/tree/*.avif swaying with GSAP, and a single fixed R3F canvas with instanced petals (shader-based wind, scroll-velocity gust from Lenis, mouse repulsion, pause when hidden).
Petal counts: 400 desktop, 60 mobile, 0 with reduced motion (show a static image instead).
Mount it once in MainLayout behind all content. Remove the old mortar Canvas from HeroSection (keep the component file, just stop rendering it) and stop preloading the GLB files.
Measure FPS in Chrome Performance panel at 1440px and with 4x CPU throttling; report numbers.
```

### Phase 4 — Intro film + leaf cursor
```
Build IntroFilm.jsx per Section 6.1 using public/intro/intro.webm, intro.mp4, intro-mobile.mp4, poster.avif. Overlay the real SVG logo in the last 2 seconds. Once per session, skippable, skipped for reduced motion / save-data / slow network. Replace the old SplashIntro usage but keep SplashIntro as the fallback.
Build LeafCursor.jsx per Section 6.5 (desktop fine pointer only, gsap.quickTo, rotates with movement, hover/click states, hidden on inputs).
```

### Phase 5 — Cinematic hero
```
Build HeroSequence.jsx per Section 6.4 using frames in public/hero-seq/desktop and /mobile. Pin for 150vh, scrub frames with ScrollTrigger, draw on canvas with object-fit cover logic and devicePixelRatio. First frame loads eagerly; others progressively.
Glass headline card with SplitText reveal (starts after IntroFilm ends). Keep existing CTAs and links.
```

### Phase 6 — Panchakarma animated journey
```
Rebuild the Panchakarma section per Section 7: pinned horizontal scroll with 5 scenes (desktop), stacked on mobile; SVG body silhouette with DrawSVG highlights per therapy; progress rail with click-to-jump; MorphSVG dosha badge; per-scene illustrations as SVG/CSS animations (no extra WebGL).
Use data from src/data/panchakarma.js. Keep "Read full guide" links. Add the stages timeline, packages and care checklist animations on the Panchakarma page.
```

### Phase 7 — Restyle every other page
```
Apply the glass system and motion kit to Home sections, About, Treatments (+detail), Wellness (dosha orbs per Section 7), Blog (+post), Gallery (masonry with hover depth + lightbox), Contact, Book Appointment, 404.
Replace the About page 3D model with the khalva loop video in a glass frame. Petal burst on successful booking.
Page transitions per Section 6.6.
```

### Phase 8 — Performance, accessibility, QA
```
Targets: Lighthouse mobile Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95; LCP < 2.5s; CLS < 0.05; stable 60fps on desktop, ≥ 45fps on mid Android.
Code-split routes and the R3F scene; lazy-load gsap plugins per page; AVIF/WebP images with width/height; video preload only for intro.
Test: reduced motion on/off, keyboard-only navigation, Safari (backdrop-filter, video autoplay), iOS Safari, Android Chrome, 390px/768px/1440px/1920px.
Report a ✅/❌ checklist and screenshots.
```

---

## 9. Asset checklist (prepare before Phase 3–5)

| Asset | Source | Format / size |
|---|---|---|
| Logo | your file | optimised SVG (SVGOMG), plus 512px PNG for favicon/OG |
| Intro film | Gemini Veo (prompts file) | `intro.webm` + `intro.mp4` ≤ 3 MB, 1080p; `intro-mobile.mp4` vertical ≤ 2 MB; `poster.avif` |
| Hero sequence | Gemini Veo | 120–150 WebP frames, desktop 1600w, mobile 900w |
| Blossom tree layers | Gemini image model | 3–4 transparent PNG → AVIF, 2400px tall max |
| Petal texture | Gemini image or hand-drawn | 256×256 PNG with alpha |
| Khalva loop (About) | Gemini Veo | 6s seamless loop, WebM ≤ 1.5 MB |
| Section images | Gemini image / real clinic photos | AVIF, 1600w, ≤ 200 KB each |
| Noise texture | any | 128×128 PNG |
| Real doctor & clinic photos | client | strongly recommended over AI for trust |

**Compress video (ffmpeg):**
```bash
ffmpeg -i intro_raw.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart intro.mp4
ffmpeg -i intro_raw.mp4 -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an intro.webm
ffmpeg -i intro_raw.mp4 -vframes 1 -q:v 2 poster.jpg   # then convert to AVIF in Squoosh
```

---

## 10. Things to be careful about (medical website)
- Motion should soothe, not distract; the **Book appointment** and **WhatsApp** buttons must always be reachable in one tap.
- Patients may be elderly or on slow mobile data: the lite experience (no intro, no petals) must still look beautiful.
- AI-generated imagery of "patients" or "the doctor" should not be passed off as real people. Use AI for scenery, herbs and objects; use real photos for people.
- Keep all earlier content rules: no cure claims, no fake stats or accreditations, disclaimer in footer.

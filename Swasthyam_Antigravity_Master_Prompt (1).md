# MASTER PROMPT — Swasthyam Ayurved Website (SwasthyamAyurved.com)

> Paste everything below into Antigravity (Planning mode). Let it produce the Implementation Plan first, review it, then approve.

---

## ROLE
You are a senior React + Vite frontend engineer and healthcare-website UX designer. You are upgrading an EXISTING project (currently branded "AyuLife Sanctuary") into the official website of an Ayurvedic clinic named **Swasthyam Ayurved**, domain **SwasthyamAyurved.com**.

## GOLDEN RULES (follow strictly)
1. **Do NOT delete or rewrite any existing component, feature, 3D model, animation or styling.** Existing files: `Header.jsx`, `HeroSection.jsx`, `PanchakarmaSimulator.jsx`, `DoshaTest.jsx`, `VideoGallery.jsx`, `VideoModal.jsx`, `BookingForm.jsx`, `InteractiveHerbModel.jsx`, `LeafButton.jsx`, `public/morter-draco.glb`, `public/morter.glb`. Only ADD new files, EXTEND existing ones, and FIX bugs listed below. If a file must change, keep all current behaviour working.
2. Keep the existing design language: colours (linen, parchment, sand, botanical, botanical-light, sage, terracotta, gold, charcoal), fonts (Cormorant Garamond + Inter), leaf-shaped buttons, organic rounded corners, calm earthy premium feel.
3. Keep the stack: React 19 + Vite + Tailwind CSS v4 + React Three Fiber/Drei + lucide-react. Only add: `react-router-dom`, `react-helmet-async`, and (optional) `framer-motion`.
4. Every clinic detail (doctor name, qualifications, registration no., address, phone, WhatsApp, email, timings, map link, social links, stats) must come from ONE file: `src/config/siteConfig.js`. Use clearly marked placeholders like `"TODO: Doctor name"` — never invent real-looking credentials, awards, accreditations or patient numbers.
5. Work phase by phase. After every phase run `npm run build` and `npm run lint`, fix all errors, and show me a short summary + screenshots of changed pages before moving on.

---

## PHASE 1 — Fix existing problems (bugs found in current code)

1. **Branding:** Replace every "AyuLife / AYULIFE / AyuLife Sanctuary / Authentic Sanctuary" with **Swasthyam Ayurved** (Header logo, footer, copyright, `index.html` `<title>`, README title). Header logo = "SWASTHYAM" (main, Cormorant Garamond, semibold, wide tracking) + small line "AYURVED · स्वास्थ्यम्" below. Replace the default Vite `favicon.svg` with a simple leaf/lamp "S" monogram SVG in terracotta + gold.
2. **No real routing:** `App.jsx` switches pages with `useState('activeTab')` → no URLs, browser Back button breaks, pages can't be shared or indexed by Google. Add `react-router-dom` (`BrowserRouter`, routes listed in Phase 3). Keep the old tab ids working by mapping them to routes (e.g. `setActiveTab('booking')` → `navigate('/book-appointment')`) so existing components keep working without being rewritten. Add `ScrollToTop` on route change and a styled 404 page.
3. **Tailwind v4 config conflict:** Tailwind v4 ignores `tailwind.config.js` unless it is referenced, so colours there differ from `@theme` in `index.css` (e.g. linen `#FDFBF7` vs `#FAF6EE`) and classes `rounded-organic`, `rounded-organic-alt`, `rounded-organic-soft`, `shadow-organic` do nothing. Move these radius/shadow tokens into the `@theme` block in `index.css` (`--radius-organic`, etc.) with `index.css` as the single source of truth. Leave `tailwind.config.js` in place with a comment saying it is legacy.
4. **`LeafButton.jsx`:** does not forward `type`, `disabled`, `aria-*` or other props. Spread `...rest` onto the `<button>`, add `disabled` styles, visible focus ring, and support an `as={Link}`/`to` prop for navigation.
5. **`DoshaTest.jsx`:** the "Analyze My Prakriti" button only LOOKS disabled — clicking it with 0 answers shows an empty result. Make it truly disabled until all questions are answered. Handle ties (show dual dosha like "Vata-Pitta"). Expand to 12–15 questions (body, skin, hair, appetite, digestion, sleep, weather preference, energy, speech, memory, mind under stress, bowel habit), show a progress bar, one question per step on mobile, and a result card with percentage bars, diet tips, daily routine tips, and a "Book a Prakriti Consultation" button. Add the line: "This quiz is for general awareness only and is not a medical diagnosis."
6. **`BookingForm.jsx`:** it only shows `alert()` — no data is sent anywhere, inputs are uncontrolled, past dates can be picked. Make it controlled with validation (Indian 10-digit mobile, name, concern, date ≥ today, optional preferred time slot, Clinic visit / Online consultation choice, consent checkbox). On submit: open WhatsApp (`https://wa.me/<number from siteConfig>?text=<prefilled details>`) as the default; ALSO support Web3Forms/Formspree if `VITE_FORM_ENDPOINT` env var exists. Replace `alert` with an in-page success card. Change "Your information is confidential and protected" to honest wording.
7. **`HeroSection.jsx` 3D:** `ScrollControls` creates its own inner scroll area inside the canvas, which traps the mouse wheel / touch and makes the page feel stuck, especially on mobile. Keep the exploded Khalva Yantra effect, but drive `offset` from the page's own scroll progress of the hero section (window scroll / IntersectionObserver passed into `useFrame`) instead of `ScrollControls`. Also: build the `childrenNodes` list once with `useMemo`, not every render. On screens < 768px or when WebGL is unavailable, show a lightweight static image/poster instead of the Canvas. Lazy-load the canvas (`React.lazy` + `Suspense`).
8. **`InteractiveHerbModel.jsx`:** it uses the same cached GLTF scene object as the hero. If both render, one breaks. Use `<Clone object={scene} />` or `scene.clone(true)` for each instance. Use this component on the About page.
9. **`VideoModal.jsx`:** only shows "Video player loads here in production". Make it accept a YouTube video ID, render a responsive `youtube-nocookie.com` embed, close on Esc key, lock body scroll while open, and trap focus.
10. **Unverified / risky claims (IMPORTANT — Indian law):** The hero says "NABH Accredited Hospital", "Dr. Rajesh V. Shastri (BAMS, MD)", "15,000+ Healing Journeys"; the simulator and gallery say "Cures chronic constipation", "Reversing Type-2 Diabetes Naturally". These are placeholder/fake and disease-cure claims may violate the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 and practitioner advertising ethics. Move all credentials and stats into `siteConfig.js` as TODO placeholders that render ONLY when filled in. Rewrite claims in supportive language ("may help manage", "supports", "traditionally used for") and add a medical disclaimer.
11. **Housekeeping:** `index.html` has `lang="en"`, title "ayurveda" and no meta description — fix. `README.md` still points to another GitHub repo — update to Swasthyam. `FA1 Report.pdf`, `src/assets/react.svg`, `src/assets/vite.svg` and `public/morter.glb` (unused 3 MB) are not used by the site — do NOT delete them, just list them in the README under "Unused files to review".
12. Accessibility: add `aria-label` and `aria-expanded` to the mobile menu button (replace the "☰" text with the lucide `Menu` icon), alt text on all images, keyboard support for all clickable `div`s (use `<button>` or `<Link>`).

---

## PHASE 2 — Opening screen (brand intro) "Swasthyam"

Create `src/components/SplashIntro.jsx`:
- Full-screen botanical-green background with a soft gold radial glow.
- A small diya/leaf SVG draws itself (stroke animation), then the name **SWASTHYAM** appears letter by letter in Cormorant Garamond (gold → sand), with **स्वास्थ्यम्** fading in below and the tagline **"Ayurved · Rooted in Tradition, Healing for Today"** (tagline editable in siteConfig).
- Total duration ≤ 2.5 seconds, then fades/slides up to reveal the Home page.
- Shows only once per browser session (`sessionStorage`), has a visible "Skip" button, is skipped entirely when `prefers-reduced-motion` is on, and never blocks the page from loading underneath.

---

## PHASE 3 — Navigation exactly as the client's requirement

Main menu order (desktop + mobile), matching the client's handwritten brief:

| # | Menu | Route | Type |
|---|------|-------|------|
| 1 | Home | `/` | link |
| 2 | About Us | `/about` | link |
| 3 | Treatments | `/treatments` | **dropdown / mega-menu** |
| 4 | Panchakarma | `/panchakarma` | **dropdown** |
| 5 | Wellness | `/wellness` | link (with sub-sections) |
| 6 | Blog | `/blog` | link |
| 7 | Gallery | `/gallery` | link |
| 8 | Contact Us | `/contact` | link |
| + | "Book Appointment" button | `/book-appointment` | CTA (existing LeafButton) |

**Treatments mega-menu (2 columns):**
- *By Condition:* Joint & Bone Care (arthritis, back pain, sciatica, cervical spondylosis), Digestive Health (acidity, IBS, constipation), Skin & Hair (psoriasis, eczema, acne, hair fall), Stress, Anxiety & Sleep, Women's Health (PCOD, menstrual issues), Lifestyle Disorders (obesity, diabetes & BP support), Respiratory & Allergy (sinusitis, asthma support), Migraine & Headache.
- *Specialty Therapies:* Abhyanga, Shirodhara, Kati Basti, Janu Basti, Greeva Basti, Patra Pinda Sweda, Udvartana, Netra Tarpana, Agnikarma, Nadi Pariksha.
- Each item → `/treatments/:slug` using ONE reusable `TreatmentDetail` page template driven by `src/data/treatments.js`.

**Panchakarma dropdown:** Overview (existing `PanchakarmaSimulator` lives here) · Vamana · Virechana · Basti · Nasya · Raktamokshana · Purvakarma (Snehana & Swedana) · Panchakarma Packages (7 / 14 / 21 days) · What to Expect & Preparation. Each therapy → `/panchakarma/:slug` via `src/data/panchakarma.js`. Clicking a therapy inside the existing simulator should also link to its detail page.

Header behaviour: sticky, transparent over hero then solid on scroll, dropdowns open on hover (desktop) and on tap (mobile accordion), close on outside click / Esc, active route highlighted in terracotta. Top thin bar (desktop only) with phone, timings, and WhatsApp icon from siteConfig.

---

## PHASE 4 — Pages

Use a shared `PageHero` component (title, breadcrumb, Sanskrit sub-heading, soft background image) and `SectionHeading` for consistency.

**Home (`/`)** — keep existing `HeroSection` + trust strip at top, then add: Welcome to Swasthyam (short intro + doctor photo), Our Treatments (8 condition cards → treatment pages), Panchakarma highlight (5 therapy icons → `/panchakarma`), Why Choose Us (4 points), Dosha quiz teaser → `/wellness/dosha-test`, How it works (Consult → Nadi Pariksha → Personal plan → Follow-up), Testimonials slider (real ones only, from `src/data/testimonials.js`, empty-safe), Latest 3 blog posts, Gallery preview strip, FAQ accordion (6–8 Qs), final CTA band with Call / WhatsApp / Book.

**About Us (`/about`)** — Clinic story & philosophy, Meet the Vaidya (photo, qualifications, registration no., experience — all from siteConfig), Vision & Mission, Our approach (classical texts + modern hygiene), Clinic facilities, `InteractiveHerbModel` section "The Khalva Yantra — our symbol of authentic preparation", certifications (render only if filled).

**Treatments (`/treatments`)** — grid of all conditions + therapies with filter chips. **Detail template:** overview, common symptoms, Ayurvedic view (dosha involved), our approach, therapies used (linked), duration range, diet & lifestyle tips, FAQs, disclaimer, sticky "Book consultation for this" button (pre-selects concern in the booking form via query string).

**Panchakarma (`/panchakarma`)** — intro "What is Panchakarma", 3 stages (Purvakarma → Pradhanakarma → Paschatkarma) timeline, existing `PanchakarmaSimulator`, who should / should not undergo, packages table (duration, inclusions, "Price on consultation"), preparation & aftercare, FAQs. **Detail template** per therapy: procedure steps, indications, contraindications, duration, what to expect, aftercare.

**Wellness (`/wellness`)** — sections with anchor tabs: Prakriti/Dosha Test (existing `DoshaTest` at `/wellness/dosha-test`), Dinacharya (ideal daily routine timeline), Ritucharya (seasonal guide for the 6 Indian seasons), Ayurvedic Diet by Dosha (foods to favour/avoid), Yoga & Pranayama basics, Wellness & Rejuvenation packages.

**Blog (`/blog`, `/blog/:slug`)** — posts stored as data (`src/data/blog.js` or markdown via `import.meta.glob`), fields: title, slug, date, author, category, cover, excerpt, content, readTime. List page with category filter + search; post page with table of contents, author box, share buttons (WhatsApp, Facebook, copy link), related posts, CTA. Add 5 starter posts marked `draft: "Needs doctor review"`: What is Panchakarma?, Know your Dosha, Ayurvedic Dinacharya, Monsoon care in Ayurveda, Myths about Ayurveda.

**Gallery (`/gallery`)** — tabs: Clinic Photos · Therapies · Events & Camps · Videos. Keep the existing `VideoGallery` as the Videos tab (with real YouTube IDs from data). Photo tabs: masonry grid, lazy-loaded images, lightbox with next/prev, keyboard and swipe support. Data from `src/data/gallery.js`.

**Contact Us (`/contact`)** — address, click-to-call, WhatsApp chat, email, clinic timings table, Google Maps embed (iframe URL from siteConfig), the existing `BookingForm` (compact variant), "How to reach" notes, social links.

**Book Appointment (`/book-appointment`)** — existing `BookingForm` full page.

**Footer-only pages:** `/privacy-policy`, `/terms`, `/medical-disclaimer`, 404.

---

## PHASE 5 — Global additions
- **Footer (4 columns):** logo + short about + socials | Quick links (all 8 menus) | Top treatments | Contact & timings; bottom row: © {current year} Swasthyam Ayurved · Privacy · Terms · Disclaimer.
- **Floating WhatsApp button** (bottom-right, all pages) + **mobile sticky bottom bar** (Call · WhatsApp · Book).
- **Back-to-top** button.
- **Language toggle EN / मराठी** (optional but recommended): set up simple i18n with `src/i18n/en.js` and `mr.js` for menu, headings and CTAs; content can stay English until translated.

---

## PHASE 6 — SEO, performance, deployment
- `react-helmet-async` on every page: unique title (`Page | Swasthyam Ayurved`), meta description, canonical `https://swasthyamayurved.com/...`, Open Graph + Twitter image.
- JSON-LD schema: `MedicalClinic` / `LocalBusiness` (name, address, phone, hours, geo) on Home & Contact; `FAQPage` on FAQ sections; `Article` on blog posts; `BreadcrumbList` on inner pages.
- `public/robots.txt` and `public/sitemap.xml` (all routes).
- Route-level code splitting (`React.lazy`), lazy images (`loading="lazy"`, width/height set), preconnect Google Fonts, 3D only on desktop.
- SPA rewrites so direct links like `/about` don't 404: add `vercel.json`, `public/_redirects` (Netlify) and `public/.htaccess` (Hostinger/cPanel).
- Target Lighthouse ≥ 90 for Performance, Accessibility, Best Practices, SEO on mobile.

---

## PHASE 7 — Final QA checklist (report each item as ✅/❌)
- All 8 menu items + dropdowns work on desktop, tablet, mobile (375px, 768px, 1280px).
- Every old feature still works: 3D hero exploded view, Panchakarma simulator, Dosha test, video gallery + modal, booking form, InteractiveHerbModel.
- No "AyuLife" text anywhere (search the whole repo).
- No fake credentials/stats rendered while siteConfig fields are empty.
- Browser Back/Forward and refresh work on every route.
- No console errors or warnings; `npm run build` and `npm run lint` pass.
- Splash shows once per session and can be skipped.
- Forms validate and WhatsApp message is prefilled correctly.

## FILE STRUCTURE TO ADD
```
src/
  config/siteConfig.js
  data/ treatments.js  panchakarma.js  blog.js  gallery.js  testimonials.js  faqs.js  wellness.js
  pages/ Home.jsx About.jsx Treatments.jsx TreatmentDetail.jsx Panchakarma.jsx PanchakarmaDetail.jsx
         Wellness.jsx Blog.jsx BlogPost.jsx Gallery.jsx Contact.jsx BookAppointment.jsx
         PrivacyPolicy.jsx Terms.jsx MedicalDisclaimer.jsx NotFound.jsx
  components/ (existing files kept) + SplashIntro.jsx Footer.jsx PageHero.jsx SectionHeading.jsx
         MegaMenu.jsx WhatsAppFloat.jsx MobileActionBar.jsx Lightbox.jsx FAQAccordion.jsx
         TestimonialSlider.jsx Breadcrumbs.jsx ScrollToTop.jsx SEO.jsx
  layouts/ MainLayout.jsx
  i18n/ en.js mr.js
```

Start by showing me the Implementation Plan for Phase 1 only. Do not begin coding until I approve.

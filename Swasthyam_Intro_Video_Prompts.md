# Swasthyam Ayurved — Gemini Prompts for Intro Video & Visual Assets

Use Gemini Pro's video generation (Veo) for videos and Gemini's image generation for stills.

**Rules that make AI video work for this site**
- **No text, no logo, no letters in the video.** AI models distort text. The real Swasthyam logo is added on top in code during the last 2 seconds.
- **No human faces.** Hands are fine. This avoids fake-looking "doctors" or "patients" on a medical site.
- **Keep the palette consistent with the site:** warm dawn light, cream, sage green, saffron, brass, lotus pink.
- **Leave calm, empty space in the centre of the last 2 seconds** so the logo sits cleanly there.
- Generate 3–4 versions of each prompt and pick the best. Download at the highest quality, then compress with the ffmpeg commands in the Mega Plan (Section 9).
- Make both **16:9 (desktop)** and **9:16 (mobile)** versions of the intro.

---

## 1. Intro film — main prompt (recommended), 8 seconds, 16:9

```
Cinematic 8-second opening film for a premium Ayurvedic healing clinic. No text, no logos, no people's faces.

0–2s: Pre-dawn darkness in a quiet Indian herbal garden. A single brass diya flame flickers to life in the foreground, soft bokeh behind.
2–4s: The camera glides slowly forward past the diya. Golden sunrise light spills through a flowering tree with pale pink blossoms; a few petals begin to drift down. Dew on tulsi and neem leaves.
4–6s: Slow macro pass over an antique brass mortar and pestle (khalva) filled with fresh turmeric root, tulsi leaves, ashwagandha root and a few rose petals. Thin steam rises from a copper bowl of herbal decoction beside it.
6–8s: The camera rises gently and settles on a calm, softly blurred wide view of the sunlit garden with petals floating through warm light. The centre of the frame becomes clean and uncluttered, ending in soft cream-gold light.

Style: photorealistic, shallow depth of field, anamorphic lens feel, slow smooth dolly movement, warm morning palette of cream, sage green, saffron gold, brass and soft lotus pink. Gentle volumetric light rays, floating dust in sunlight. Serene, healing, premium, unhurried. 24fps film look, no fast cuts, no shaky camera.
Audio: soft morning birdsong, a faint temple bell, gentle wind in leaves.
Avoid: text, letters, watermarks, logos, human faces, cartoon style, neon colours, dark horror mood, harsh contrast, clutter.
```

**Mobile version (9:16):** same prompt, add at the start:
`Vertical 9:16 composition, subjects centred for a phone screen.`

---

## 2. Intro film — alternative styles (try if you want a different mood)

**A. "Herbs coming alive" (more magical)**
```
8-second cinematic macro film, no text, no logos, no faces. Morning light over a wooden table in an Ayurvedic apothecary. Dried herbs, turmeric roots, cardamom and tulsi leaves slowly rise and float in the air in slow motion, rotating gently, while pale pink blossom petals drift through golden sunbeams. A brass mortar and pestle sits in soft focus behind. In the final 2 seconds the floating herbs and petals drift gently outward to the edges of the frame, leaving calm cream-gold light in the centre. Photorealistic, shallow depth of field, warm palette of cream, sage, saffron and brass, serene and premium. Soft ambient music feel, gentle wind. Avoid text, watermarks, faces, neon, dark tones.
```

**B. "Oil drop" (minimal and elegant)**
```
8-second minimal luxury film, no text, no logos, no faces. Extreme close-up: a single golden drop of warm herbal oil falls in slow motion into a still copper bowl, creating perfect concentric ripples. The ripples dissolve into floating pale pink blossom petals and sage leaves drifting across warm cream light. The camera slowly pulls back to reveal a softly blurred sunlit herbal garden. The final 2 seconds are calm cream-gold light with gentle petals in the corners, leaving the centre empty. Photorealistic, macro lens, slow motion, soft volumetric light, palette of cream, saffron gold, sage, brass, lotus pink. Avoid text, harsh contrast, neon, clutter.
```

**Best transition trick:** whichever version you choose, the **last frame should look like the website hero background** (sunlit garden, soft cream-gold, blossom tree on the right). Then the website fades in on top and the change feels seamless.

---

## 3. Hero scroll-sequence video (for the scroll-controlled hero)

This is turned into image frames and "played" by scrolling.

```
8-second cinematic product shot, no text, no logos, no people. A beautiful antique brass khalva (mortar and pestle) with fresh turmeric root, green tulsi leaves, a slice of amla and a few pink rose petals, placed on a light sandalwood table in an Ayurvedic garden at sunrise. The camera performs one very slow, smooth 120-degree orbit around the mortar at constant speed, eye level slightly above the rim. Pale pink blossom petals drift slowly through the frame; gentle steam rises from a small copper cup nearby. Soft golden morning light from the left, blurred flowering tree and greenery in the background, subject centred with generous empty space on the left third of the frame. Photorealistic, high detail on metal and herbs, shallow depth of field, stable camera with no shake, no cuts, warm palette of cream, brass, sage and saffron. Avoid text, watermarks, clutter, fast motion, dark tones.
```

Why "empty left third": the glass headline card sits there on desktop.
Mobile: make a 9:16 version with the subject in the lower half (text card goes on top).

---

## 4. About page — khalva loop (short seamless loop)

```
6-second seamless looping shot, no text, no faces. Close-up of hands (no face visible) slowly grinding fresh green herbs in an antique brass mortar with a brass pestle on a sandalwood table, soft morning window light, a few petals and turmeric roots nearby, gentle steam from a copper cup. Calm steady motion that loops perfectly, locked-off camera, photorealistic, warm palette of cream, brass, sage and saffron, shallow depth of field. Avoid text, watermarks, fast movement.
```

---

## 5. Image prompts (Gemini image generation)

### 5.1 Blossom tree layers (for the swaying 2.5D background)
Generate these as **separate images on a plain white background** (you'll remove the background with remove.bg or Photoshop, then export transparent PNG → AVIF).

**Full reference (to keep all layers consistent):**
```
A graceful flowering tree in an Indian herbal garden, painted in a soft semi-realistic watercolour style, pale pink and cream blossoms, delicate dark-brown curved branches, gentle sage-green leaves, warm sunrise backlight, elegant and airy composition with lots of empty space, isolated on a plain white background. No text, no people.
```

Then ask for the parts, keeping the same style (upload the reference image each time):
1. `Only the trunk and main lower branches of this same tree, same style and lighting, isolated on plain white background.`
2. `Only the back branches with blossoms of this same tree, slightly lighter and softer as if further away, isolated on plain white background.`
3. `Only the front blossom-covered branches of this same tree hanging from the top of the frame, same style, isolated on plain white background.`
4. `Only small clusters of blossoms and leaves of this same tree, scattered, isolated on plain white background.`

### 5.2 Petal texture
```
A single pale pink blossom petal, soft watercolour-realistic style, slightly curved, delicate translucent edges, top-down view, centred, isolated on plain white background, no text.
```
(Make 3 variants — pink, cream, light saffron — and remove backgrounds.)

### 5.3 Hero background still (fallback for reduced-motion users)
```
Wide sunlit Indian herbal garden at dawn, a flowering tree with pale pink blossoms on the right, soft bokeh, a brass mortar with fresh herbs on a sandalwood table in the right-centre, petals floating in golden light, generous empty space on the left, photorealistic, warm palette of cream, sage, saffron and brass, serene and premium, 16:9. No text, no people.
```

### 5.4 Panchakarma scene backgrounds (soft, used behind the glass cards)
Use this template and change the bracket part:
```
Soft abstract background for an Ayurvedic website section, [ELEMENT], gentle gradients, delicate light, lots of empty space, premium and calm, 16:9, no text, no people.
```
- Vamana: `cool aqua-green water ripples and rising droplets`
- Virechana: `warm saffron sunrise glow softening into cool sage leaves`
- Basti: `warm sand tones with soft swirling wind lines settling into calm horizontal layers`
- Nasya: `pearl-white mist and soft steam rising upward`
- Raktamokshana: `rose-pink flowing lines gently clearing into cream light`

### 5.5 Dosha orbs (optional still images if you don't animate them in code)
```
A glowing translucent orb representing [Vata: air and space, swirling pale lavender and sky wisps / Pitta: fire and water, warm saffron and amber glowing core / Kapha: earth and water, calm sage and teal liquid with soft sand tones], floating on a plain cream background, soft studio light, elegant and minimal, no text.
```

---

## 6. After generating — quick checklist
- [ ] Watch every clip for morphing hands, melting objects or hidden text; regenerate if found.
- [ ] Trim to exactly 6–8s; last frame calm and centred for the logo.
- [ ] Remove audio for web (`-an`) or keep a separate, optional sound toggle (off by default).
- [ ] Compress: intro ≤ 3 MB, mobile ≤ 2 MB, loops ≤ 1.5 MB.
- [ ] Export poster frames and hero sequence frames (Mega Plan Section 6.4 and 9).
- [ ] Put files in `public/intro`, `public/hero-seq`, `public/tree`, `public/textures`.

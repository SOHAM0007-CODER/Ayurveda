---
name: swasthyam-motion
description: Expert playbook for building buttery-smooth, premium 3D-interactive websites with React + Vite, Lenis, GSAP ScrollTrigger, React Three Fiber, glassmorphism, scroll-scrubbed video frames and a custom leaf cursor. Use for any animation, scrolling, 3D, cursor, intro video, performance or visual-polish task on the Swasthyam Ayurved website.
---

# Swasthyam Motion Skill — "Final Boss" smooth 3D web

You are a senior creative developer (award-level motion sites). Your job is to make the Swasthyam Ayurved site feel **calm, premium and buttery smooth at 60fps**, on a laptop AND on a mid-range Android phone. Beauty never wins over smoothness: if an effect drops frames, simplify it.

Read `docs/REDESIGN_PLAN.md` for design decisions. This skill tells you HOW to build them.

---

## 1. The 10 laws of buttery smooth

1. **Animate only `transform` and `opacity`** (and CSS variables that feed them). Never animate `width/height/top/left/margin/box-shadow/filter:blur` on scroll.
2. **One ticker to rule them all:** Lenis, GSAP and R3F all run from the same `requestAnimationFrame` (GSAP ticker drives Lenis; R3F runs its own loop but reads shared refs, never React state).
3. **No React state in animation loops.** Use `useRef` + direct mutation. `setState` inside `useFrame`, scroll or mousemove handlers = jank.
4. **One WebGL canvas** for the whole site (the petal background). No per-section canvases.
5. **Pause everything invisible:** canvases when `document.hidden`, videos when off-screen (IntersectionObserver), ScrollTriggers killed on unmount (`useGSAP`).
6. **`will-change: transform`** only on elements that are animating right now; remove it after.
7. **Budget:** JS on first load < 250 KB gzip, LCP < 2.5s, CLS < 0.05, long tasks < 50ms, GPU memory for textures < 64 MB.
8. **Sharp, not heavy:** support 4K/Retina screens with `devicePixelRatio` (cap canvas DPR at 1.5–2) and 1600–2000px images. **Never ship 4K video or 4K frame sequences** — they destroy smoothness and data plans.
9. **Reduced motion is a first-class mode:** `prefers-reduced-motion` → no Lenis, no petals, no pinning, no intro video; static hero-still image; instant reveals.
10. **Measure, don't guess:** Chrome DevTools Performance with 4× CPU throttle; report FPS and long tasks after every motion feature.

---

## 2. Smooth scroll — Lenis + GSAP (single source of truth)

`src/motion/SmoothScrollProvider.jsx`
```jsx
import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const LenisCtx = createContext({ lenis: null, velocity: { current: 0 } });
export const useLenis = () => useContext(LenisCtx);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const velocity = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false });
    lenisRef.current = lenis;
    lenis.on('scroll', (e) => { velocity.current = e.velocity; ScrollTrigger.update(); });
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return <LenisCtx.Provider value={{ lenis: lenisRef, velocity }}>{children}</LenisCtx.Provider>;
}
```
Rules: modals/lightbox call `lenis.stop()` on open and `lenis.start()` on close. Anchor links use `lenis.scrollTo('#id', { offset: -100 })`.

---

## 3. Scroll animation kit (always `useGSAP`)

```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Reveal({ children, y = 24, delay = 0, stagger = 0.08, className }) {
  const el = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(el.current.children, {
        y, opacity: 0, duration: 0.9, ease: 'power3.out', delay, stagger,
        scrollTrigger: { trigger: el.current, start: 'top 85%', once: true },
      });
    });
  }, { scope: el });
  return <div ref={el} className={className}>{children}</div>;
}
```
Same pattern for:
- **SplitHeading** — `SplitText.create(el, { type: 'lines', mask: 'lines' })` then `gsap.from(split.lines, { yPercent: 110, stagger: 0.08, duration: 1, ease: 'expo.out' })`. Wait for `document.fonts.ready` before splitting.
- **Parallax** — `gsap.to(el, { yPercent: -speed*100, ease: 'none', scrollTrigger: { trigger, scrub: true } })`.
- **PinSection** — `scrollTrigger: { pin: true, scrub: 0.6, end: '+=150%' }` ; set `anticipatePin: 1`.
- **TiltCard** — mousemove → `gsap.quickTo(el, 'rotateX'/'rotateY', { duration: 0.5, ease: 'power3' })`, max 6°, desktop + fine pointer only, `transform-style: preserve-3d` + `perspective: 900px` on parent.
- **Magnetic** — `quickTo` x/y toward pointer, max 8px, reset on leave.

Easing vocabulary (keep it calm): `power2.out`, `power3.out`, `expo.out`, `sine.inOut`. Durations 0.6–1.2s. **Never** bounce/elastic on a medical site.

---

## 4. Living background (single fixed canvas)

Structure in `MainLayout`: `<LivingBackground />` (position fixed, inset 0, z-index 0, `pointer-events:none`) → content above at z-index 1.

### 4.1 Sky
A fixed div with CSS variables `--sky-top`, `--sky-bottom`. One ScrollTrigger on `document.body` (`scrub: 1`) tweens those variables dawn → day → dusk.

### 4.2 Blossom tree (2.5D, DOM not WebGL)
Layers (WebP): `branches-back` (furthest, opacity .6, `filter: blur(2px)` set once — not animated, `mask-image: linear-gradient(to bottom, #000 65%, transparent)`), `trunk`, `branches-front`, `blossoms`.
Each layer: `transform-origin: 50% 100%` (branches-front: `50% 0%`), sway with
`gsap.to(layer, { rotate: ±(0.6–1.5), duration: 6–9, ease: 'sine.inOut', yoyo: true, repeat: -1 })` with different phases.
Mouse parallax: `quickTo` x by 5/10/15/20 px per layer depth. Mobile: only `trunk` + `branches-front`, no mouse parallax.

### 4.3 Petal field (R3F, instanced, CPU matrices — simple and fast)
```jsx
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { useLenis } from '../motion/SmoothScrollProvider';

const TEX = ['/textures/petal-pink.webp', '/textures/petal-cream.webp', '/textures/petal-saffron.webp'];

function PetalLayer({ url, count, mouse }) {
  const mesh = useRef();
  const map = useLoader(THREE.TextureLoader, url);
  const { velocity } = useLenis();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petals = useMemo(() => Array.from({ length: count }, () => ({
    x: THREE.MathUtils.randFloatSpread(16), y: THREE.MathUtils.randFloat(-6, 8), z: THREE.MathUtils.randFloat(-6, 2),
    s: THREE.MathUtils.randFloat(0.12, 0.28), fall: THREE.MathUtils.randFloat(0.25, 0.6),
    sway: Math.random() * Math.PI * 2, spin: THREE.MathUtils.randFloat(0.3, 1.2),
  })), [count]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const gust = THREE.MathUtils.clamp((velocity.current || 0) * 0.02, -1.5, 1.5);
    petals.forEach((p, i) => {
      p.y -= p.fall * dt;
      p.x += (Math.sin(t * 0.5 + p.sway) * 0.15 + gust) * dt;
      const dx = p.x - mouse.current.x * 8, dy = p.y - mouse.current.y * 5;
      const d2 = dx * dx + dy * dy;
      if (d2 < 2.25) { p.x += dx * dt * 1.2; p.y += dy * dt * 1.2; }   // gentle mouse repulsion
      if (p.y < -7) { p.y = 8; p.x = THREE.MathUtils.randFloatSpread(16); }
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(t * p.spin * 0.6, Math.sin(t + p.sway) * 0.8, t * p.spin);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={map} transparent depthWrite={false} side={THREE.DoubleSide} alphaTest={0.02} />
    </instancedMesh>
  );
}
```
Canvas: `<Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 8], fov: 45 }} frameloop={visible ? 'always' : 'never'}>`.
Counts per texture: desktop 130 (≈400 total), tablet 60, phone 20 (≈60 total), reduced motion 0.
Mouse ref updated in a passive `pointermove` listener with normalised coords (−1..1). Pause with `document.visibilitychange`.
Load R3F lazily (`React.lazy`) after first paint so it never blocks LCP.

---

## 5. Intro film
- Fullscreen fixed overlay, `<video muted playsInline autoPlay preload="auto" poster>` with WebM then MP4 source.
- Logo overlay (real PNG/SVG) animates in the last 2s: `opacity 0→1, scale .92→1, filter none`.
- End: `gsap.to(overlay, { opacity: 0, duration: 0.8, ease: 'power2.inOut', onComplete: unmount })`, then fire a `intro:done` event so hero SplitText starts.
- Skip button, max 9s, once per session, skipped for reduced motion / `saveData` / 2g–3g. Call `lenis.stop()` while playing, `lenis.start()` after.

---

## 6. Cinematic hero (scroll-scrubbed frames)
- Frames: WebP, 1600w desktop (~120–150), 900w portrait mobile (~90). Named `001.webp…`.
- Draw on `<canvas>` sized to CSS size × `Math.min(devicePixelRatio, 2)`; "cover" math:
```js
function drawCover(ctx, img, w, h) {
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s, dh = img.height * s;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
```
- Load frame 1 eagerly (LCP), then the rest in batches with `requestIdleCallback`; use `img.decode()` before drawing.
- `const state = { frame: 0 }; gsap.to(state, { frame: last, snap: 'frame', ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '+=150%', pin: true, scrub: 0.5 }, onUpdate: render })`.
- Only redraw when the rounded frame changes.

---

## 7. Leaf cursor
- Only when `(pointer: fine)` and no reduced motion. Hidden on `input, textarea, select, [contenteditable]`.
- `xTo = gsap.quickTo(leaf, 'x', { duration: 0.35, ease: 'power3' })` (same for y).
- Rotation follows velocity: `angle = Math.atan2(vy, vx) * 180/Math.PI`, smoothed with `quickTo(leaf, 'rotation', { duration: 0.5 })`; idle sway ±8°.
- Hover on `a, button, [data-cursor="hover"]` → scale 1.6 + saffron fill; mousedown → scale .85 then back.
- `pointer-events: none; position: fixed; z-index: 9999; mix-blend-mode: normal`. Keep native cursor visible for keyboard focus users (only hide with `body.leaf-cursor { cursor: none }`).

---

## 8. Glassmorphism without lag
- `backdrop-filter` is expensive: max ~6 glass elements visible at once, blur ≤ 20px, never animate the blur value, never put glass inside a scrubbed/pinned element that moves every frame on mobile (use solid `rgba(255,250,242,.9)` there).
- Mobile: reduce blur to 10px.
- Grain overlay is a static PNG, not an SVG filter.
- Check text contrast ≥ 4.5:1 over the brightest part of the background behind each card.

---

## 9. Video & image delivery
```bash
# intro / loops (no audio, fast start)
ffmpeg -i in.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart out.mp4
ffmpeg -i in.mp4 -vf "scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an out.webm
# crop a corner watermark (example: trim 4% from edges then scale back)
ffmpeg -i in.mp4 -vf "crop=iw*0.92:ih*0.92,scale=1920:-2" ...
# hero frames
ffmpeg -i hero-desktop.mp4 -vf "fps=18,scale=1600:-2" -c:v libwebp -quality 72 public/hero-seq/desktop/%03d.webp
ffmpeg -i hero-desktop.mp4 -vf "fps=12,crop=ih*9/16:ih,scale=900:-2" -c:v libwebp -quality 70 public/hero-seq/mobile/%03d.webp
```
Images: WebP/AVIF, explicit `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` for the LCP image only.
Background videos: `muted loop playsInline preload="none"`, play/pause via IntersectionObserver.

---

## 10. Page transitions
Short and soft (≤ 0.6s): cream overlay wipes up with one petal sweeping across, route changes under it, overlay wipes out. Never delay navigation more than 400ms. Kill all ScrollTriggers of the old page (`useGSAP` does it) then `ScrollTrigger.refresh()`.

---

## 11. Final QA checklist (run before saying "done")
- [ ] 60fps desktop, ≥ 45fps phone (4× throttle), no long task > 100ms during scroll
- [ ] Lighthouse mobile: Perf ≥ 85, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Reduced-motion mode looks complete and beautiful
- [ ] Safari/iOS: video autoplays muted, backdrop-filter works, no scroll jumps
- [ ] Back/forward navigation keeps working, no duplicated animations after route changes
- [ ] No console errors, no 404 assets, no references to removed GLB models
- [ ] Booking + WhatsApp reachable in one tap on every page
- [ ] Screenshots at 390 / 768 / 1440 / 1920 px

## Anti-patterns (never do)
Parallax on text blocks · bounce/elastic easing · autoplay sound · more than one WebGL canvas · 4K video · animating blur · scroll-jacking on mobile · pinned sections longer than 3 screens · hiding the booking button behind animations.

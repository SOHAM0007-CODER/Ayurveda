import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useLenis } from '../motion/SmoothScrollProvider';
import gsap from 'gsap';

const TEX = ['/textures/petal-pink.webp', '/textures/petal-cream.webp', '/textures/petal-saffron.webp'];

function PetalLayer({ url, count, mouse }) {
  const mesh = useRef();
  const map = useLoader(THREE.TextureLoader, url);
  const { velocity } = useLenis() || { velocity: { current: 0 } };
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const petals = useMemo(() => Array.from({ length: count }, () => ({
    x: THREE.MathUtils.randFloatSpread(16), 
    y: THREE.MathUtils.randFloat(-6, 8), 
    z: THREE.MathUtils.randFloat(-6, 2),
    s: THREE.MathUtils.randFloat(0.12, 0.28), 
    fall: THREE.MathUtils.randFloat(0.25, 0.6),
    sway: Math.random() * Math.PI * 2, 
    spin: THREE.MathUtils.randFloat(0.3, 1.2),
  })), [count]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const gust = THREE.MathUtils.clamp((velocity?.current || 0) * 0.02, -1.5, 1.5);
    
    petals.forEach((p, i) => {
      p.y -= p.fall * dt;
      p.x += (Math.sin(t * 0.5 + p.sway) * 0.15 + gust) * dt;
      
      const dx = p.x - mouse.current.x * 8;
      const dy = p.y - mouse.current.y * 5;
      const d2 = dx * dx + dy * dy;
      
      if (d2 < 2.25) { 
        p.x += dx * dt * 1.2; 
        p.y += dy * dt * 1.2; 
      }
      
      if (p.y < -7) { 
        p.y = 8; 
        p.x = THREE.MathUtils.randFloatSpread(16); 
      }
      
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

function PetalScene({ visible }) {
  const mouse = useRef({ x: 0, y: 0 });
  const [counts, setCounts] = useState({ desktop: 130, mobile: 20 });
  
  useEffect(() => {
    const updateMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', updateMouse, { passive: true });
    
    const isMobile = window.innerWidth < 768;
    setCounts(isMobile ? { desktop: 0, mobile: 20 } : { desktop: 130, mobile: 0 });
    
    return () => window.removeEventListener('pointermove', updateMouse);
  }, []);

  const totalCount = counts.desktop || counts.mobile;
  
  if (!visible || totalCount === 0) return null;

  return (
    <Canvas 
      dpr={[1, Math.min(window.devicePixelRatio, 1.25)]} 
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }} 
      camera={{ position: [0, 0, 8], fov: 45 }} 
      frameloop="always"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <PetalLayer url={TEX[0]} count={totalCount} mouse={mouse} />
      <PetalLayer url={TEX[1]} count={totalCount} mouse={mouse} />
      <PetalLayer url={TEX[2]} count={totalCount} mouse={mouse} />
    </Canvas>
  );
}

export default function LivingBackground() {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  const skyRef = useRef(null);
  const branchesBack = useRef(null);
  const trunk = useRef(null);
  const branchesFront = useRef(null);
  const blossoms = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);
    
    const handleVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    
    if (!isReduced) {
      // Sky gradient scrub
      gsap.to(skyRef.current, {
        '--sky-top': '#E9A6A6', // dusk-ish
        '--sky-bottom': '#C9A45C',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
      
      // Tree swaying
      const sway = (el, angle, dur) => {
        gsap.to(el, { rotate: angle, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      };
      
      sway(branchesBack.current, 0.6, 9);
      sway(trunk.current, 0.8, 8);
      sway(branchesFront.current, 1.2, 7);
      sway(blossoms.current, 1.5, 6);
      
      // Mouse parallax for tree layers
      const updateParallax = (e) => {
        if (window.innerWidth < 768) return;
        const x = (e.clientX / window.innerWidth - 0.5);
        gsap.to(branchesBack.current, { x: x * 5, duration: 1, ease: 'power2.out' });
        gsap.to(trunk.current, { x: x * 10, duration: 1, ease: 'power2.out' });
        gsap.to(branchesFront.current, { x: x * 15, duration: 1, ease: 'power2.out' });
        gsap.to(blossoms.current, { x: x * 20, duration: 1, ease: 'power2.out' });
      };
      
      window.addEventListener('pointermove', updateParallax, { passive: true });
      return () => {
        document.removeEventListener('visibilitychange', handleVisibility);
        window.removeEventListener('pointermove', updateParallax);
      };
    }
    
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none" 
      style={{ 
        '--sky-top': '#FFF6EC', 
        '--sky-bottom': '#F1E3CF',
        background: 'linear-gradient(to bottom, var(--sky-top), var(--sky-bottom))'
      }}
      ref={skyRef}
    >
      {/* DOM Tree Layers */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-60 mix-blend-multiply">
        <img 
          ref={branchesBack} 
          src="/tree/branches-back.webp" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-right-top"
          style={{ transformOrigin: '50% 100%', filter: 'blur(2px)', WebkitMaskImage: 'linear-gradient(to bottom, #000 65%, transparent)' }}
        />
        <img 
          ref={trunk} 
          src="/tree/trunk.webp" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-right-top"
          style={{ transformOrigin: '50% 100%' }}
        />
        <img 
          ref={branchesFront} 
          src="/tree/branches-front.webp" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-right-top"
          style={{ transformOrigin: '50% 0%' }}
        />
        <img 
          ref={blossoms} 
          src="/tree/blossoms.webp" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-right-top"
          style={{ transformOrigin: '50% 100%' }}
        />
      </div>

      {/* R3F Petal Field */}
      {!reducedMotion && <PetalScene visible={visible} />}
    </div>
  );
}

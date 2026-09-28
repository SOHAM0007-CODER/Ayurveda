import React, { createContext, useContext, useEffect, useRef } from 'react';
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
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false });
    lenisRef.current = lenis;
    
    lenis.on('scroll', (e) => { 
      velocity.current = e.velocity; 
      ScrollTrigger.update(); 
    });
    
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    
    return () => { 
      gsap.ticker.remove(raf); 
      lenis.destroy(); 
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

  return (
    <LenisCtx.Provider value={{ lenis: lenisRef, velocity }}>
      {children}
    </LenisCtx.Provider>
  );
}

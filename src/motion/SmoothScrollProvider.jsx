import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false, // native scroll on phones feels better
    });
    lenisRef.current = lenis;

    // Connect to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [shouldReduceMotion]);

  // Reset scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return <>{children}</>;
}

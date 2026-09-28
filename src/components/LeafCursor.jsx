import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LeafCursor() {
  const leafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show for fine pointers and no reduced motion
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches && !reducedMotion.matches) {
      setIsVisible(true);
      document.body.classList.add('leaf-cursor');
    }

    return () => {
      document.body.classList.remove('leaf-cursor');
    };
  }, []);

  useGSAP(() => {
    if (!isVisible || !leafRef.current) return;

    const leaf = leafRef.current;
    
    const xTo = gsap.quickTo(leaf, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(leaf, 'y', { duration: 0.35, ease: 'power3' });
    const rotationTo = gsap.quickTo(leaf, 'rotation', { duration: 0.5 });
    const scaleTo = gsap.quickTo(leaf, 'scale', { duration: 0.3 });

    let lastX = 0;
    let lastY = 0;
    
    // Idle sway animation
    const idleSway = gsap.to(leaf, {
      rotation: '+=8',
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
      paused: true
    });

    let idleTimeout;

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      
      const vx = e.clientX - lastX;
      const vy = e.clientY - lastY;
      
      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);
        rotationTo(angle);
        idleSway.pause();
        
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
          idleSway.play();
        }, 100);
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' || 
        target.isContentEditable
      ) {
        gsap.to(leaf, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(leaf, { opacity: 1, duration: 0.2 });
      }

      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[data-cursor="hover"]')
      ) {
        scaleTo(1.6);
        gsap.to(leaf.querySelector('svg'), { color: '#F3A124', duration: 0.2 }); // saffron
      } else {
        scaleTo(1);
        gsap.to(leaf.querySelector('svg'), { color: '#2C4C3B', duration: 0.2 }); // forest
      }
    };

    const onMouseDown = () => scaleTo(0.85);
    const onMouseUp = () => scaleTo(1.6); // Assume we're still hovering if we clicked

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearTimeout(idleTimeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={leafRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-normal"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-forest drop-shadow-sm transition-colors duration-200"
        style={{ transformOrigin: 'center center' }}
      >
        <path d="M12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 16 12 22 12 22Z" />
      </svg>
    </div>
  );
}

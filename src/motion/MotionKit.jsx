import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, className = '', delay = 0, y = 24 }) {
  const comp = useRef(null);
  
  useGSAP(() => {
    gsap.fromTo(comp.current, 
      { opacity: 0, y: y },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comp.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: comp });

  return <div ref={comp} className={className}>{children}</div>;
}

// Minimal split heading by word for smooth reveal
export function SplitHeading({ children, className = '' }) {
  const comp = useRef(null);
  
  useGSAP(() => {
    const words = comp.current.querySelectorAll('.split-word');
    gsap.fromTo(words, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: comp.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: comp });

  // Simple text split logic
  const text = typeof children === 'string' ? children : '';
  return (
    <div ref={comp} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden relative">
          <span className="split-word inline-block">{word}&nbsp;</span>
        </span>
      ))}
    </div>
  );
}

export function Parallax({ children, speed = 0.2, className = '' }) {
  const comp = useRef(null);

  useGSAP(() => {
    gsap.to(comp.current, {
      y: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: comp.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: comp });

  return <div ref={comp} className={className}>{children}</div>;
}

export function PinSection({ children, className = '' }) {
  const comp = useRef(null);
  
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: comp.current,
      start: "top top",
      end: "+=150%",
      pin: true,
    });
  }, { scope: comp });

  return <div ref={comp} className={className}>{children}</div>;
}

export function TiltCard({ children, className = '' }) {
  const comp = useRef(null);
  
  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const rect = comp.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      gsap.to(comp.current, {
        rotateX, rotateY, duration: 0.5, ease: 'power2.out', transformPerspective: 1000
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(comp.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <div 
      ref={comp} 
      className={className} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export function Magnetic({ children }) {
  const comp = useRef(null);
  
  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const rect = comp.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(comp.current, { x, y, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(comp.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  return React.cloneElement(children, {
    ref: comp,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  });
}

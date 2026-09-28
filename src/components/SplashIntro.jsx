import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useLenis } from '../motion/SmoothScrollProvider';

export default function SplashIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const { lenis } = useLenis();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('swasthyam_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check connection if available
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g');

    if (!hasSeen && !prefersReducedMotion && !isSlowConnection) {
      setIsVisible(true);
      if (lenis && lenis.current) lenis.current.stop();
    } else {
      // Fire intro:done immediately if skipped
      window.dispatchEvent(new Event('intro:done'));
    }
  }, [lenis]);

  const endIntro = () => {
    if (lenis && lenis.current) lenis.current.start();
    sessionStorage.setItem('swasthyam_intro_seen', 'true');
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsVisible(false);
        window.dispatchEvent(new Event('intro:done'));
      }
    });
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
    if (timeLeft <= 2 && !showLogo) {
      setShowLogo(true);
      gsap.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      );
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest overflow-hidden"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        preload="auto"
        poster="/intro/poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={endIntro}
      >
        <source src="/intro/intro.webm" type="video/webm" />
        <source src="/intro/intro.mp4" type="video/mp4" />
      </video>

      <div 
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
      >
        <img 
          src="/brand/swasthyam-logo.png" 
          alt="Swasthyam Logo" 
          className="w-48 md:w-64 h-auto"
        />
      </div>

      <button 
        onClick={endIntro}
        className="absolute bottom-8 right-8 z-20 text-white/60 hover:text-white text-xs uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full transition-colors"
      >
        Skip
      </button>
    </div>
  );
}

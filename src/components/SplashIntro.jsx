import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

export default function SplashIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check session storage
    const hasSeenSplash = sessionStorage.getItem('swasthyam_splash_seen');
    
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasSeenSplash && !prefersReducedMotion) {
      setIsVisible(true);
      
      // Sequence timing
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem('swasthyam_splash_seen', 'true');
        }, 800); // fade out duration matching CSS transition
      }, 2500); // total duration before fade out starts

      return () => clearTimeout(timer);
    }
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('swasthyam_splash_seen', 'true');
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-botanical overflow-hidden transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      }`}
    >
      
      {/* Soft gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-10 mix-blend-screen pointer-events-none"></div>

      <button 
        onClick={handleSkip} 
        className="absolute top-8 right-8 z-20 text-sand/60 hover:text-sand text-xs uppercase tracking-widest px-4 py-2 border border-sand/20 rounded-full transition-colors"
      >
        Skip
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* SVG Drawing Animation */}
        <div className="mb-8 relative w-16 h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-gold fill-transparent">
             <path 
                d="M50 15 C 30 15, 20 30, 20 40 C 20 55, 75 45, 75 60 C 75 75, 55 85, 45 85 C 30 85, 20 75, 20 75"
                strokeWidth="4" 
                strokeLinecap="round"
                className="animate-[dash_1.2s_ease-in-out_forwards]"
                strokeDasharray="200"
                strokeDashoffset="200"
             />
             <style>
               {`
                 @keyframes dash {
                   to { stroke-dashoffset: 0; }
                 }
                 @keyframes revealLetter {
                   0% { opacity: 0; transform: translateY(10px); color: var(--color-gold); }
                   100% { opacity: 1; transform: translateY(0); color: var(--color-sand); }
                 }
                 @keyframes fadeIn {
                   0% { opacity: 0; transform: translateY(5px); }
                   100% { opacity: 1; transform: translateY(0); }
                 }
               `}
             </style>
          </svg>
        </div>

        {/* Letter by letter reveal */}
        <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-widest mb-3 flex justify-center">
          {Array.from("SWASTHYAM").map((letter, i) => (
            <span 
              key={i} 
              className="opacity-0 translate-y-2 text-gold"
              style={{ 
                animation: `revealLetter 0.5s ease-out forwards`,
                animationDelay: `${0.8 + (i * 0.1)}s` 
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Subline and Tagline Fade In */}
        <div 
          className="opacity-0"
          style={{ animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1.8s' }}
        >
          <p className="text-xl md:text-2xl font-sans font-medium text-sage tracking-[0.3em] mb-5">
            स्वास्थ्यम्
          </p>
          <p className="text-xs md:text-sm text-sand/80 font-light tracking-[0.15em] uppercase">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

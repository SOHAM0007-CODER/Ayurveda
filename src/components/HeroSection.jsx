import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import LeafButton from './LeafButton';
import { SplitHeading, Reveal } from '../motion/MotionKit';
import { siteConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frames = useRef([]);
  const state = useRef({ frame: 0 });
  const maxFrames = 150; // Expected number of frames based on PROGRESS.md

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);

    if (isReduced) return;

    let stopLoading = false;
    let i = 1;
    const isMobile = window.innerWidth < 768;
    const path = isMobile ? '/hero-seq/mobile' : '/hero-seq/desktop';

    const loadNext = () => {
      if (stopLoading || i > maxFrames) return;
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `${path}/${num}.webp`;
      
      img.onload = () => {
        // Decode for performance
        img.decode().then(() => {
          frames.current.push(img);
          if (i === 1) renderFrame(0); // Draw first frame immediately
          i++;
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadNext);
          } else {
            setTimeout(loadNext, 10);
          }
        }).catch(() => {
          // If decode fails, just continue
          frames.current.push(img);
          i++;
          setTimeout(loadNext, 10);
        });
      };
      
      img.onerror = () => {
        // If file missing, stop loading
        stopLoading = true;
      };
    };
    
    loadNext();

    const handleResize = () => {
      const idx = Math.min(Math.round(state.current.frame), frames.current.length - 1);
      if (idx >= 0) renderFrame(idx);
    };

    window.addEventListener('resize', handleResize);

    return () => { 
      stopLoading = true; 
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderFrame = (idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const img = frames.current[idx];
    if (!img) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const s = Math.max(w / img.width, h / img.height);
    const dw = img.width * s, dh = img.height * s;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%',
      pin: true,
      anticipatePin: 1,
      animation: gsap.to(state.current, {
        frame: maxFrames - 1,
        snap: 'frame',
        ease: 'none',
        onUpdate: () => {
          if (frames.current.length === 0) return;
          const idx = Math.min(Math.round(state.current.frame), frames.current.length - 1);
          renderFrame(idx);
        }
      }),
      scrub: 0.5,
    });
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-transparent">
      {/* Hero Background Image or Canvas sequence */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full lg:w-3/5 h-full relative">
          {reducedMotion ? (
            <img 
              src="/images/hero-still.webp" 
              alt="Swasthyam Ayurved" 
              className="w-full h-full object-cover object-center opacity-90"
              fetchPriority="high"
            />
          ) : (
            <>
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
              {/* Preload first frame to ensure it loads fast if JS is delayed */}
              <link rel="preload" as="image" href="/hero-seq/desktop/001.webp" media="(min-width: 768px)" />
              <link rel="preload" as="image" href="/hero-seq/mobile/001.webp" media="(max-width: 767px)" />
            </>
          )}
          {/* Gradient to fade into the cream (dawn) on the left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-dawn via-dawn/80 to-transparent"></div>
          {/* Bottom fade so it blends with sections below */}
          <div className="absolute inset-0 bg-gradient-to-t from-dawn via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Glass Card Container */}
        <div className="max-w-2xl pt-10 glass p-8 md:p-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/5 text-forest text-xs font-medium tracking-wide mb-6 border border-forest/10 shadow-sm backdrop-blur-md">
              <Leaf className="w-3.5 h-3.5 text-saffron" /> 
              Classical Ayurveda & Panchakarma
            </div>
          </Reveal>
          
          <SplitHeading className="font-serif text-5xl md:text-7xl text-forest leading-[1.1] mb-6">
            Healing through the intelligence of nature.
          </SplitHeading>
          
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-ink/70 mb-10 leading-relaxed font-light max-w-lg">
              Experience profound rejuvenation with classical Panchakarma therapies and personalized wellness protocols in a serene sanctuary.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <LeafButton to="/contact" variant="primary" className="shadow-lg shadow-saffron/20">
                Book Consultation <ArrowRight className="w-4 h-4" />
              </LeafButton>
              <LeafButton to="/panchakarma" variant="outline" className="bg-dawn/50 backdrop-blur-sm border-saffron text-forest hover:bg-dawn">
                Explore Panchakarma
              </LeafButton>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex items-center gap-6 text-sm text-ink/60 border-t border-ink/10 pt-6">
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-5 h-5 text-saffron" /> Authentic Care
              </span>
              {siteConfig?.experienceYears && (
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-5 h-5 flex items-center justify-center text-saffron font-serif font-bold text-lg">{siteConfig.experienceYears}</span> 
                  Years Experience
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

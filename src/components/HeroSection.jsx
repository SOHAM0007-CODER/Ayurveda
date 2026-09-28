import React from 'react';
import { Leaf, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import LeafButton from './LeafButton';
import { SplitHeading, Reveal } from '../motion/MotionKit';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-dawn">
      {/* Temporary Placeholder Gradient Background (Phase 5 will replace this) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-dawn via-sandal/30 to-sage/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl pt-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/5 text-forest text-xs font-medium tracking-wide mb-6 border border-forest/10 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-saffron" /> 
              Authentic Kerala Ayurveda
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
              <LeafButton to="/panchakarma" variant="outline">
                Explore Panchakarma
              </LeafButton>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex items-center gap-6 text-sm text-ink/60 border-t border-ink/5 pt-6">
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-5 h-5 text-saffron" /> Authentic Care
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Clock className="w-5 h-5 text-saffron" /> 15+ Years Exp
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

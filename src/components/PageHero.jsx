import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { Reveal, SplitHeading as SplitText } from '../motion/MotionKit';

export default function PageHero({ title, sanskritTitle, description, image = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80" }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-forest">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <div className="flex justify-center">
            <Breadcrumbs />
          </div>
        </Reveal>
        
        {sanskritTitle && (
          <Reveal delay={0.1}>
            <span className="block text-sage font-sans tracking-[0.3em] font-medium text-lg md:text-xl mb-4">
              {sanskritTitle}
            </span>
          </Reveal>
        )}
        
        <SplitText className="font-serif text-5xl md:text-6xl text-dawn font-semibold mb-6">
          {title}
        </SplitText>
        
        {description && (
          <Reveal delay={0.3}>
            <p className="text-dawn/80 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

import React from 'react';
import { Reveal, SplitHeading as SplitText } from '../motion/MotionKit';

export default function SectionHeading({ subtitle, title, description, align = 'center', dark = false }) {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto';
  
  return (
    <div className={`mb-16 ${alignClass}`}>
      {subtitle && (
        <Reveal>
          <span className="text-saffron text-xs uppercase tracking-[0.3em] font-medium block mb-3">
            {subtitle}
          </span>
        </Reveal>
      )}
      
      <SplitText className={`font-serif text-4xl md:text-5xl mb-4 ${dark ? 'text-sand' : 'text-forest'}`}>
        {title}
      </SplitText>
      
      {description && (
        <Reveal delay={0.2}>
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${dark ? 'text-sand/80' : 'text-charcoal/70'}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

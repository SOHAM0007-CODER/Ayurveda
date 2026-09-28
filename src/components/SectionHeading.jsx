import React from 'react';
import { Reveal, SplitHeading as SplitText } from '../motion/MotionKit';

export default function SectionHeading({ subtitle, title, description, align = 'center' }) {
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
      
      <SplitText className="font-serif text-4xl md:text-5xl text-forest mb-4">
        {title}
      </SplitText>
      
      {description && (
        <Reveal delay={0.2}>
          <p className="text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

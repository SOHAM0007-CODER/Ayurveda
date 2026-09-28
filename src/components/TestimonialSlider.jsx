import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-4xl mx-auto px-12">
      <div className="relative min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center text-center"
          >
            <Quote className="w-12 h-12 text-terracotta/20 mb-6" />
            <p className="font-serif text-2xl md:text-3xl text-botanical mb-8 leading-relaxed">
              "{testimonials[current].quote}"
            </p>
            <div className="mt-auto">
              <h5 className="text-sm uppercase tracking-widest font-medium text-terracotta">{testimonials[current].name}</h5>
              <span className="text-xs text-sage">{testimonials[current].treatment}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {testimonials.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-sage hover:bg-gold hover:text-white transition-colors" aria-label="Previous Testimonial">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-sage hover:bg-gold hover:text-white transition-colors" aria-label="Next Testimonial">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}

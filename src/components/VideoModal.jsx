import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoModal({ title, onClose }) {
  useEffect(() => {
    if (title) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [title]);

  if (!title) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative glass-dark p-2 rounded-3xl shadow-2xl w-full max-w-5xl z-10" 
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute -top-12 right-0 text-dawn/60 hover:text-dawn transition-colors bg-ink/50 p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="bg-ink w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center">
            {title === "khalva-loop" ? (
              <video 
                src="/videos/khalva-loop.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            ) : title === "herbs-alive" ? (
              <video 
                src="/videos/herbs-alive.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8 text-dawn">
                <p className="font-serif text-2xl mb-2">{title}</p>
                <p className="text-dawn/60 text-sm">Video content will be placed here.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

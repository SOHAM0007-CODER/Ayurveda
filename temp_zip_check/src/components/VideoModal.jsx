import React from 'react';
import { Play, X } from 'lucide-react';

export default function VideoModal({ title, onClose }) {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm"></div>
      <div className="relative bg-linen p-2 rounded-3xl shadow-2xl w-full max-w-4xl z-10 border border-gold/20" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-sand hover:text-terracotta transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="bg-parchment w-full aspect-video rounded-2xl flex items-center justify-center border border-gold/10">
          <div className="text-center p-8">
            <Play className="w-16 h-16 text-terracotta mx-auto mb-4 opacity-70" />
            <p className="font-serif text-2xl text-botanical">{title}</p>
            <p className="text-sage mt-2 text-sm">Video player loads here in production</p>
          </div>
        </div>
      </div>
    </div>
  );
}

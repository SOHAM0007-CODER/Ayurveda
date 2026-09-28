import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => (
        <div 
          key={idx} 
          className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
            openIndex === idx 
              ? 'border-terracotta/30 bg-white shadow-sm' 
              : 'border-gold/20 bg-parchment hover:border-terracotta/20'
          }`}
        >
          <button 
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className={`font-serif text-xl ${openIndex === idx ? 'text-terracotta' : 'text-botanical'}`}>
              {faq.question}
            </span>
            <div className={`shrink-0 ml-4 p-1 rounded-full ${openIndex === idx ? 'bg-terracotta/10 text-terracotta' : 'text-sage'}`}>
              {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
          </button>
          
          <div 
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === idx ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-charcoal/70 leading-relaxed text-sm md:text-base">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

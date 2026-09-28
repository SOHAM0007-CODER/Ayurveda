import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import { treatmentsData } from '../data/treatments';

export default function Treatments() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Condition', 'Therapy'];
  
  const filteredData = filter === 'All' 
    ? treatmentsData 
    : treatmentsData.filter(t => t.category === filter);

  return (
    <div>
      <SEO 
        title="Ayurvedic Treatments" 
        description="Explore our authentic Ayurvedic treatments for chronic conditions and holistic wellness."
        url="/treatments"
      />
      
      <PageHero 
        title="Our Treatments" 
        sanskritTitle="चिकित्सा"
        description="Classical Ayurvedic protocols designed to address the root cause of imbalances and restore your natural state of health."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-24 bg-linen min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Comprehensive Care" title="Find Your Healing Path" />
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-colors ${
                  filter === cat 
                    ? 'bg-terracotta text-white shadow-md' 
                    : 'bg-parchment text-botanical border border-gold/20 hover:border-terracotta/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map(item => (
              <Link 
                to={`/treatments/${item.slug}`} 
                key={item.slug}
                className="group bg-parchment rounded-3xl border border-gold/20 overflow-hidden hover:shadow-lg transition-all hover:border-terracotta/30 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1512290900676-26c2a4d4b52b?auto=format&fit=crop&w=600&q=80" alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-linen/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-terracotta font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-botanical mb-3 group-hover:text-terracotta transition-colors">{item.title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.overview}
                  </p>
                  <span className="mt-auto text-xs font-medium uppercase tracking-widest text-sage group-hover:text-terracotta transition-colors flex items-center gap-2">
                    Learn More <span className="text-lg">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

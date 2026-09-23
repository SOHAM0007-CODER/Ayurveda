import React, { useState } from 'react';
import { Leaf, X } from 'lucide-react';
import LeafButton from './LeafButton';

export default function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'simulator', label: 'Panchakarma Simulator' },
    { id: 'dosha-test', label: 'Dosha Test' },
    { id: 'gallery', label: 'Patient Stories' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-linen/95 backdrop-blur-md border-b border-botanical/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-2">
          <Leaf className="w-7 h-7 text-terracotta" />
          <div className="text-left">
            <span className="text-2xl font-serif text-botanical tracking-wide font-semibold block leading-none">AYULIFE</span>
            <span className="text-[10px] text-sage uppercase tracking-[0.2em]">Authentic Sanctuary</span>
          </div>
        </button>
        
        <nav className="hidden lg:flex items-center gap-8">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm uppercase tracking-widest transition-colors ${activeTab === tab.id ? 'text-terracotta font-medium' : 'text-charcoal/70 hover:text-botanical'}`}
            >
              {tab.label}
            </button>
          ))}
          <LeafButton onClick={() => setActiveTab('booking')} variant="primary" className="ml-4 py-2.5 px-6 text-xs">
            Book Consultation
          </LeafButton>
        </nav>

        {/* Mobile menu toggle */}
        <button className="lg:hidden text-botanical" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <span className="text-2xl font-sans">☰</span>}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-linen border-t border-botanical/10 px-6 py-4 space-y-3">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }} 
              className={`block w-full text-left text-sm tracking-wider py-2 uppercase ${activeTab === tab.id ? 'text-terracotta font-medium' : 'text-charcoal/80'}`}
            >
              {tab.label}
            </button>
          ))}
          <LeafButton onClick={() => { setActiveTab('booking'); setMobileMenuOpen(false); }} variant="primary" className="w-full mt-2 justify-center">
            Book Consultation
          </LeafButton>
        </div>
      )}
    </header>
  );
}

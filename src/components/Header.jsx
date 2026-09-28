import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, ChevronDown } from 'lucide-react';
import LeafButton from './LeafButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Treatments', path: '/treatments' },
    { name: 'Panchakarma', path: '/panchakarma' },
    { name: 'Wellness', path: '/wellness' },
    { name: 'Blog', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <div 
        className="fixed top-0 left-0 h-1 bg-saffron z-50 transition-all duration-300" 
        style={{ width: `${scrollProgress}%` }}
      />
      
      <header 
        className={`fixed w-full z-40 transition-all duration-500 flex justify-center ${
          scrolled ? 'top-4 px-4' : 'top-0 px-0'
        }`}
      >
        <div 
          className={`w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'glass px-6 py-3' : 'px-8 py-5 bg-transparent'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/brand/swasthyam-logo.png" alt="Swasthyam" className="h-14 md:h-16 object-contain brightness-110 contrast-110" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif tracking-wide font-semibold block leading-none text-forest">SWASTHYAM</span>
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-saffron mt-1 font-medium">Ayurved</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm tracking-wide hover:text-saffron transition-colors ${
                  location.pathname === link.path ? 'text-saffron font-medium' : 'text-forest'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LeafButton to="/contact" variant="primary" className="py-2.5 px-6 text-xs">
              Book Appointment
            </LeafButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-forest"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-4 right-4 mt-2 glass-dark p-6 rounded-2xl flex flex-col gap-4 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-dawn text-lg font-medium border-b border-dawn/10 pb-2"
                >
                  {link.name}
                </Link>
              ))}
              <LeafButton to="/contact" variant="primary" className="mt-4 justify-center">
                Book Appointment
              </LeafButton>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

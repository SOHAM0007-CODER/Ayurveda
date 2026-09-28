import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const treatments = {
  conditions: [
    { name: 'Joint & Bone Care', slug: 'joint-bone-care' },
    { name: 'Digestive Health', slug: 'digestive-health' },
    { name: 'Skin & Hair', slug: 'skin-hair' },
    { name: 'Stress, Anxiety & Sleep', slug: 'stress-anxiety-sleep' },
    { name: "Women's Health", slug: 'womens-health' },
    { name: 'Lifestyle Disorders', slug: 'lifestyle-disorders' },
    { name: 'Respiratory & Allergy', slug: 'respiratory-allergy' },
    { name: 'Migraine & Headache', slug: 'migraine-headache' }
  ],
  therapies: [
    { name: 'Abhyanga', slug: 'abhyanga' },
    { name: 'Shirodhara', slug: 'shirodhara' },
    { name: 'Kati Basti', slug: 'kati-basti' },
    { name: 'Janu Basti', slug: 'janu-basti' },
    { name: 'Greeva Basti', slug: 'greeva-basti' },
    { name: 'Patra Pinda Sweda', slug: 'patra-pinda-sweda' },
    { name: 'Udvartana', slug: 'udvartana' },
    { name: 'Netra Tarpana', slug: 'netra-tarpana' },
    { name: 'Agnikarma', slug: 'agnikarma' },
    { name: 'Nadi Pariksha', slug: 'nadi-pariksha' }
  ]
};

const panchakarma = [
  { name: 'Overview', slug: '' },
  { name: 'Vamana', slug: 'vamana' },
  { name: 'Virechana', slug: 'virechana' },
  { name: 'Basti', slug: 'basti' },
  { name: 'Nasya', slug: 'nasya' },
  { name: 'Raktamokshana', slug: 'raktamokshana' },
  { name: 'Purvakarma (Snehana & Swedana)', slug: 'purvakarma' },
  { name: 'Panchakarma Packages', slug: 'packages' },
  { name: 'What to Expect & Preparation', slug: 'preparation' }
];

export default function MegaMenu({ closeMobileMenu, isMobile, transparent = false }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null);
    if (closeMobileMenu) closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  const toggleDropdown = (name, e) => {
    if (isMobile) {
      e.preventDefault();
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  const baseText = transparent && !isMobile ? 'text-sand hover:text-gold' : 'text-charcoal/70 hover:text-botanical';
  const activeText = transparent && !isMobile ? 'text-gold font-medium' : 'text-terracotta font-medium';

  const NavItem = ({ to, children }) => (
    <Link 
      to={to} 
      className={`block text-sm uppercase tracking-widest transition-colors py-2 lg:py-0 ${
        location.pathname === to ? activeText : baseText
      }`}
    >
      {children}
    </Link>
  );

  return (
    <ul ref={dropdownRef} className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row items-center gap-8'}`}>
      <li><NavItem to="/">Home</NavItem></li>
      <li><NavItem to="/about">About Us</NavItem></li>

      {/* Treatments Dropdown */}
      <li 
        className={`relative ${!isMobile && 'group'}`}
        onMouseEnter={() => !isMobile && setOpenDropdown('treatments')}
        onMouseLeave={() => !isMobile && setOpenDropdown(null)}
      >
        <Link 
          to="/treatments" 
          onClick={(e) => toggleDropdown('treatments', e)}
          className={`flex items-center gap-1 text-sm uppercase tracking-widest transition-colors py-2 lg:py-0 ${
            location.pathname.startsWith('/treatments') ? activeText : baseText
          }`}
        >
          Treatments <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'treatments' ? 'rotate-180' : ''}`} />
        </Link>

        {/* Mega Menu Content */}
        {openDropdown === 'treatments' && (
          <div className={`${isMobile ? 'pl-4 mt-2 border-l-2 border-botanical/10 space-y-4' : 'absolute top-full -left-1/2 w-[600px] bg-linen shadow-xl border border-gold/20 rounded-2xl p-8 grid grid-cols-2 gap-8 z-50'}`}>
            <div>
              <h4 className="font-serif text-lg text-botanical mb-4 border-b border-gold/20 pb-2">By Condition</h4>
              <ul className="space-y-3 text-sm">
                {treatments.conditions.map(c => (
                  <li key={c.slug}>
                    <Link to={`/treatments/${c.slug}`} className="text-charcoal/70 hover:text-terracotta transition-colors block">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg text-botanical mb-4 border-b border-gold/20 pb-2">Specialty Therapies</h4>
              <ul className="space-y-3 text-sm">
                {treatments.therapies.map(t => (
                  <li key={t.slug}>
                    <Link to={`/treatments/${t.slug}`} className="text-charcoal/70 hover:text-terracotta transition-colors block">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </li>

      {/* Panchakarma Dropdown */}
      <li 
        className={`relative ${!isMobile && 'group'}`}
        onMouseEnter={() => !isMobile && setOpenDropdown('panchakarma')}
        onMouseLeave={() => !isMobile && setOpenDropdown(null)}
      >
        <Link 
          to="/panchakarma" 
          onClick={(e) => toggleDropdown('panchakarma', e)}
          className={`flex items-center gap-1 text-sm uppercase tracking-widest transition-colors py-2 lg:py-0 ${
            location.pathname.startsWith('/panchakarma') ? activeText : baseText
          }`}
        >
          Panchakarma <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'panchakarma' ? 'rotate-180' : ''}`} />
        </Link>

        {/* Dropdown Content */}
        {openDropdown === 'panchakarma' && (
          <div className={`${isMobile ? 'pl-4 mt-2 border-l-2 border-botanical/10 space-y-3' : 'absolute top-full -left-4 w-[280px] bg-linen shadow-xl border border-gold/20 rounded-2xl p-6 z-50'}`}>
            <ul className="space-y-3 text-sm">
              {panchakarma.map(p => (
                <li key={p.name}>
                  <Link to={p.slug ? `/panchakarma/${p.slug}` : '/panchakarma'} className="text-charcoal/70 hover:text-terracotta transition-colors block">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>

      <li><NavItem to="/wellness">Wellness</NavItem></li>
      <li><NavItem to="/blog">Blog</NavItem></li>
      <li><NavItem to="/gallery">Gallery</NavItem></li>
      <li><NavItem to="/contact">Contact Us</NavItem></li>
    </ul>
  );
}

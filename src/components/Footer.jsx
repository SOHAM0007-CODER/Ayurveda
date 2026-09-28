import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-forest text-dawn/80 pt-16 pb-8 border-t-4 border-saffron">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h4 className="font-serif text-3xl text-dawn mb-4 flex justify-center items-center gap-3">
          <img src="/brand/swasthyam-logo.png" alt="Swasthyam" className="h-10 object-contain" />
          Swasthyam Ayurved
        </h4>
        <p className="text-sm max-w-lg mx-auto text-dawn/60 mb-8 leading-relaxed">
          Preserving the ancient purity of Ayurveda through authentic Panchakarma, Nadi Pariksha, and personalized holistic care.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <Link to="/" className="hover:text-saffron transition-colors">Home</Link>
          <Link to="/about" className="hover:text-saffron transition-colors">About Us</Link>
          <Link to="/treatments" className="hover:text-saffron transition-colors">Treatments</Link>
          <Link to="/panchakarma" className="hover:text-saffron transition-colors">Panchakarma</Link>
          <Link to="/wellness" className="hover:text-saffron transition-colors">Wellness</Link>
          <Link to="/blog" className="hover:text-saffron transition-colors">Blog</Link>
          <Link to="/gallery" className="hover:text-saffron transition-colors">Gallery</Link>
          <Link to="/contact" className="hover:text-saffron transition-colors">Contact Us</Link>
        </div>

        <div className="border-t border-dawn/10 pt-6 text-xs text-dawn/40 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Swasthyam Ayurved. All rights reserved. <br/>
          <span className="mt-2 block lowercase tracking-normal">Medical disclaimer: The information provided is for educational purposes and should not replace professional medical advice.</span>
        </div>
      </div>
    </footer>
  );
}

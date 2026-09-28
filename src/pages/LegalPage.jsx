import React from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import { useLocation } from 'react-router-dom';

export default function LegalPage() {
  const { pathname } = useLocation();
  
  let title = "Legal";
  if (pathname === '/privacy-policy') title = "Privacy Policy";
  if (pathname === '/terms') title = "Terms & Conditions";
  if (pathname === '/medical-disclaimer') title = "Medical Disclaimer";

  return (
    <div>
      <SEO title={title} description={`${title} for Swasthyam Ayurved`} url={pathname} />
      <PageHero title={title} />
      <section className="py-24 bg-linen">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg text-charcoal/80">
          <p>
            Please note that this is a placeholder page for {title}. 
            The full legal text will be provided by the clinic administration prior to the official launch.
          </p>
          <p>
            Swasthyam Ayurved is committed to patient privacy, transparency, and adhering to the highest standards of medical ethics and classical Ayurvedic practice.
          </p>
        </div>
      </section>
    </div>
  );
}

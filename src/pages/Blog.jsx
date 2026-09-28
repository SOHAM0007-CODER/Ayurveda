import React from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';

export default function Blog() {
  return (
    <div>
      <SEO 
        title="Ayurvedic Blog & Insights" 
        description="Read our latest insights on Ayurvedic healing, diet, and lifestyle."
        url="/blog"
      />
      <PageHero 
        title="Ayurvedic Insights" 
        sanskritTitle="ज्ञानम्"
        description="Explore articles on authentic Ayurveda, written by our expert Vaidyas to help you integrate natural healing into your daily life."
      />
      <section className="py-24 bg-linen min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <SectionHeading title="Coming Soon" subtitle="Our Blog is Brewing" description="We are actively writing detailed articles based on classical texts to bring you pure, unadulterated Ayurvedic knowledge. Check back soon!" />
        </div>
      </section>
    </div>
  );
}

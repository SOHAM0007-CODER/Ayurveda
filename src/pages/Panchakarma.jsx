import React from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import PanchakarmaSimulator from '../components/PanchakarmaSimulator';

export default function Panchakarma() {
  return (
    <div>
      <SEO 
        title="Panchakarma Therapies" 
        description="Experience deep cellular detoxification with authentic Panchakarma therapies."
        url="/panchakarma"
      />
      
      <PageHero 
        title="Panchakarma" 
        sanskritTitle="पञ्चकर्म"
        description="The ultimate Ayurvedic detoxification and rejuvenation program. Cleanse your body, mind, and consciousness."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-24 bg-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading subtitle="Introduction" title="What is Panchakarma?" />
          <p className="text-lg text-charcoal/80 leading-relaxed font-light">
            "Pancha" means five, and "Karma" means action or therapy. Panchakarma is a set of five highly specialized therapies designed to eliminate deeply rooted toxins (Ama) and pacify aggravated Doshas. It is not just a physical detox, but a profound reset for the entire mind-body system.
          </p>
        </div>
      </section>

      {/* 3 Stages Timeline */}
      <section className="py-16 bg-parchment border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="The Process" title="The 3 Stages of Cleansing" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gold/30 -z-10"></div>
            
            <div className="bg-linen p-8 rounded-3xl border border-gold/20 shadow-sm relative z-10">
              <div className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center font-serif text-xl mx-auto mb-6">1</div>
              <h4 className="font-serif text-2xl text-botanical mb-2">Purvakarma</h4>
              <p className="text-xs uppercase tracking-widest text-sage mb-4">Preparation</p>
              <p className="text-sm text-charcoal/70 leading-relaxed">Snehana (oleation) and Swedana (fomentation) therapies are used to loosen toxins from deep tissues and bring them to the GI tract.</p>
            </div>
            
            <div className="bg-botanical p-8 rounded-3xl border border-gold/20 shadow-md relative z-10 text-sand">
              <div className="w-12 h-12 bg-gold text-botanical rounded-full flex items-center justify-center font-serif text-xl mx-auto mb-6">2</div>
              <h4 className="font-serif text-2xl mb-2">Pradhanakarma</h4>
              <p className="text-xs uppercase tracking-widest text-gold/70 mb-4">Main Therapies</p>
              <p className="text-sm text-sand/80 leading-relaxed">The actual five therapies (Vamana, Virechana, Basti, Nasya, Raktamokshana) are administered based on the patient's doshic imbalance.</p>
            </div>
            
            <div className="bg-linen p-8 rounded-3xl border border-gold/20 shadow-sm relative z-10">
              <div className="w-12 h-12 bg-terracotta text-white rounded-full flex items-center justify-center font-serif text-xl mx-auto mb-6">3</div>
              <h4 className="font-serif text-2xl text-botanical mb-2">Paschatkarma</h4>
              <p className="text-xs uppercase tracking-widest text-sage mb-4">Post-Therapy</p>
              <p className="text-sm text-charcoal/70 leading-relaxed">Strict dietary (Samsarjana Krama) and lifestyle guidelines to slowly restore digestive fire and rejuvenate the cleansed tissues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Simulator */}
      <PanchakarmaSimulator />

      {/* Packages Table */}
      <section className="py-24 bg-linen">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading subtitle="Healing Programs" title="Panchakarma Packages" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-gold/20">
              <thead className="bg-botanical text-sand">
                <tr>
                  <th className="p-6 font-serif text-xl font-normal">Program</th>
                  <th className="p-6 font-serif text-xl font-normal">Duration</th>
                  <th className="p-6 font-serif text-xl font-normal">Ideal For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                <tr className="hover:bg-parchment/50 transition-colors">
                  <td className="p-6 font-medium text-botanical">Foundational Cleanse</td>
                  <td className="p-6 text-charcoal/70">7 Days</td>
                  <td className="p-6 text-charcoal/70 text-sm">Stress relief, minor digestive issues, and seasonal transitions.</td>
                </tr>
                <tr className="hover:bg-parchment/50 transition-colors">
                  <td className="p-6 font-medium text-botanical">Deep Rejuvenation</td>
                  <td className="p-6 text-charcoal/70">14 Days</td>
                  <td className="p-6 text-charcoal/70 text-sm">Chronic conditions, metabolic reset, and deep tissue cleansing.</td>
                </tr>
                <tr className="hover:bg-parchment/50 transition-colors">
                  <td className="p-6 font-medium text-botanical">Complete Transformation</td>
                  <td className="p-6 text-charcoal/70">21 - 28 Days</td>
                  <td className="p-6 text-charcoal/70 text-sm">Severe chronic ailments, auto-immune issues, and complete cellular renewal.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-sage mt-4 uppercase tracking-widest">
            * Final pricing and inclusions determined during initial consultation.
          </p>
        </div>
      </section>
    </div>
  );
}

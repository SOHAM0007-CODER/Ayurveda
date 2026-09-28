import React from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';

import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Target, Heart, BookOpen, Sparkles, Activity } from 'lucide-react';

export default function About() {
  return (
    <div>
      <SEO 
        title="About Us" 
        description="Learn about Swasthyam Ayurved's philosophy, our expert Vaidyas, and our commitment to classical Ayurvedic healing."
        url="/about"
      />
      
      <PageHero 
        title="About Swasthyam Ayurved" 
        sanskritTitle="स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं च।"
        description="Preserving health, curing disease. Our clinic bridges the gap between ancient classical texts and modern holistic care."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Philosophy */}
      <section className="py-24 bg-linen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading subtitle="Our Philosophy" title="Rooted in Tradition, Healing for Today" />
          <p className="text-lg text-charcoal/80 leading-relaxed mb-6 font-light">
            Founded on the pure principles of the Charaka Samhita and Sushruta Samhita, {siteConfig.clinicName} was established to bring truly authentic Ayurvedic healing to the modern world.
          </p>
          <p className="text-lg text-charcoal/80 leading-relaxed font-light">
            We do not believe in quick fixes. True healing requires understanding your unique Prakriti (constitution) and addressing the root cause (Moola) of imbalances. Through meticulous Nadi Pariksha (Pulse Diagnosis), classical Panchakarma therapies, and uncompromised herbal formulations, we walk alongside you on your journey to holistic wellness.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-linen p-10 rounded-[32px] border border-gold/20 shadow-sm flex flex-col items-center text-center">
            <Target className="w-12 h-12 text-terracotta mb-6" />
            <h3 className="font-serif text-3xl text-botanical mb-4">Our Vision</h3>
            <p className="text-charcoal/70 leading-relaxed">
              To be a sanctuary of pure healing, restoring the world's trust in authentic, text-based Ayurveda and making it accessible as a primary, non-invasive healthcare system.
            </p>
          </div>
          <div className="bg-linen p-10 rounded-[32px] border border-gold/20 shadow-sm flex flex-col items-center text-center">
            <Heart className="w-12 h-12 text-terracotta mb-6" />
            <h3 className="font-serif text-3xl text-botanical mb-4">Our Mission</h3>
            <p className="text-charcoal/70 leading-relaxed">
              To provide personalized, compassionate care by treating the individual, not just the disease. We ensure 100% adherence to classical preparation methods and hygiene standards.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Vaidya */}
      <section className="py-24 bg-botanical text-sand">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden border-2 border-gold/30">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" alt={siteConfig.doctorName} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium block mb-3">Meet The Vaidya</span>
            <h2 className="font-serif text-4xl md:text-5xl text-sand mb-2">{siteConfig.doctorName !== 'TODO: Doctor name' ? siteConfig.doctorName : 'Our Chief Physician'}</h2>
            
            <div className="flex flex-wrap gap-4 mt-6 mb-8 text-sm text-sand/80">
              <span className="bg-sand/10 px-4 py-2 rounded-full border border-sand/20">{siteConfig.doctorQualifications}</span>
              <span className="bg-sand/10 px-4 py-2 rounded-full border border-sand/20">Reg No: {siteConfig.doctorRegistrationNo}</span>
              <span className="bg-sand/10 px-4 py-2 rounded-full border border-sand/20">{siteConfig.doctorExperience} of Experience</span>
            </div>

            <div className="space-y-4 text-sand/70 font-light leading-relaxed">
              <p>
                Our Chief Physician has dedicated their life to the study and practice of pure Ayurveda. With deep expertise in Nadi Pariksha and chronic disease management, they have successfully guided thousands of patients back to health.
              </p>
              <p>
                "Healing is an art that requires listening to the body's subtle cues. My goal is to decode these cues and use nature's profound intelligence to restore equilibrium."
              </p>
            </div>

            {siteConfig.stats.awards !== 'TODO: Awards received' && (
              <div className="mt-8 pt-8 border-t border-sand/20">
                <span className="block text-gold text-xs uppercase tracking-widest mb-2">Recognitions</span>
                <p className="text-sm font-medium">{siteConfig.stats.awards}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Herb Model Section */}
      <section className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading subtitle="Authentic Preparation" title="The Khalva Yantra" align="left" />
            <p className="text-charcoal/80 leading-relaxed mb-6">
              The Khalva Yantra (mortar and pestle) is our enduring symbol of authenticity. In classical Ayurveda, the efficacy of a formulation depends heavily on *Bhavana* (trituration) and the energetic transfer during preparation.
            </p>
            <p className="text-charcoal/80 leading-relaxed mb-8">
              We ensure that all our herbal compounds are prepared with strict adherence to Shastra (texts). Interact with the model to explore the cornerstone of Ayurvedic pharmacology.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-charcoal/70"><Sparkles className="w-4 h-4 text-terracotta" /> 100% Classical formulations</li>
              <li className="flex items-center gap-3 text-sm text-charcoal/70"><Sparkles className="w-4 h-4 text-terracotta" /> Sourced from pristine environments</li>
              <li className="flex items-center gap-3 text-sm text-charcoal/70"><Sparkles className="w-4 h-4 text-terracotta" /> Rigorous quality & purity testing</li>
            </ul>
          </div>
          <div className="h-[400px]">
            <video src="/videos/khalva-loop.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Facilities & Approach */}
      <section className="py-24 bg-parchment border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Our Clinic" title="A Sanctuary of Healing" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-linen p-8 rounded-2xl border border-gold/20">
              <BookOpen className="w-8 h-8 text-botanical mx-auto mb-4" />
              <h4 className="font-serif text-xl text-botanical mb-3">Text-Based Diagnosis</h4>
              <p className="text-sm text-charcoal/70 leading-relaxed">Every treatment protocol is strictly based on classical references, ensuring authentic and safe therapies.</p>
            </div>
            <div className="bg-linen p-8 rounded-2xl border border-gold/20">
              <Activity className="w-8 h-8 text-botanical mx-auto mb-4" />
              <h4 className="font-serif text-xl text-botanical mb-3">Modern Hygiene</h4>
              <p className="text-sm text-charcoal/70 leading-relaxed">While our therapies are ancient, our facilities adhere to stringent modern medical hygiene and sterilization standards.</p>
            </div>
            <div className="bg-linen p-8 rounded-2xl border border-gold/20">
              <ShieldCheck className="w-8 h-8 text-botanical mx-auto mb-4" />
              <h4 className="font-serif text-xl text-botanical mb-3">Dedicated Therapists</h4>
              <p className="text-sm text-charcoal/70 leading-relaxed">Our Panchakarma technicians are rigorously trained in classical massage techniques and therapy administration.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

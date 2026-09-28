import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import LeafButton from '../components/LeafButton';
import { panchakarmaData } from '../data/panchakarma';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function PanchakarmaDetail() {
  const { slug } = useParams();
  const treatment = panchakarmaData.find(t => t.slug === slug);

  if (!treatment) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <SEO 
        title={treatment.title} 
        description={treatment.overview.substring(0, 150) + '...'}
        url={`/panchakarma/${slug}`}
      />
      
      <PageHero 
        title={treatment.title}
        sanskritTitle="पञ्चकर्म चिकित्सा"
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <SectionHeading subtitle="Procedure Overview" title="Understanding the Therapy" align="left" />
              <p className="text-charcoal/80 text-lg leading-relaxed">{treatment.overview}</p>
            </div>

            <div className="bg-parchment p-8 rounded-3xl border border-gold/20">
              <h3 className="font-serif text-2xl text-botanical mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-terracotta" /> Primary Indications
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {treatment.symptoms.map((sym, i) => (
                  <li key={i} className="flex items-start gap-2 text-charcoal/70 text-sm">
                    <span className="text-terracotta mt-1 text-[10px]">●</span> {sym}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-3xl text-botanical mb-6">Procedure & Approach</h3>
              <div className="prose prose-lg text-charcoal/80 mb-8">
                <p><strong>Pacifies Dosha:</strong> {treatment.dosha}</p>
                <p>{treatment.approach}</p>
              </div>

              {treatment.therapiesUsed.length > 0 && (
                <>
                  <h4 className="font-serif text-2xl text-botanical mb-4">Associated Procedures</h4>
                  <div className="flex flex-wrap gap-3">
                    {treatment.therapiesUsed.map(t => (
                      <span key={t} className="px-4 py-2 bg-botanical/10 text-botanical text-sm rounded-full border border-botanical/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <h3 className="font-serif text-3xl text-botanical mb-6">Preparation & Aftercare</h3>
              <ul className="space-y-4">
                {treatment.dietTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gold/10 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                    <span className="text-charcoal/70">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-botanical rounded-[32px] p-8 text-center text-sand shadow-2xl border border-gold/20">
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium block mb-3">Begin Healing</span>
              <h3 className="font-serif text-3xl mb-6">Book a Consultation</h3>
              <p className="text-sand/70 text-sm leading-relaxed mb-8">
                Consult with our expert Vaidyas to see if {treatment.title.split(' ')[0]} is right for your constitution.
              </p>
              <div className="bg-sand/10 p-4 rounded-xl mb-8 text-left">
                <p className="text-xs text-sand/60 uppercase tracking-widest mb-1">Expected Duration</p>
                <p className="font-medium">{treatment.duration}</p>
              </div>
              <LeafButton as={Link} to={`/book-appointment?concern=${encodeURIComponent(treatment.title)}`} variant="primary" className="w-full justify-center">
                Book for this Therapy
              </LeafButton>
              <p className="text-[10px] text-sand/40 mt-4 leading-relaxed italic">
                Disclaimer: Panchakarma therapies must be prescribed by a Vaidya after thorough Nadi Pariksha.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

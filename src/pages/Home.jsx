import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import FAQAccordion from '../components/FAQAccordion';
import TestimonialSlider from '../components/TestimonialSlider';
import LeafButton from '../components/LeafButton';
import { generalFaqs } from '../data/faqs';
import { testimonials } from '../data/testimonials';
import { siteConfig } from '../config/siteConfig';
import { Activity, Leaf, ShieldCheck, HeartPulse, Droplets, Flame, Wind, CircleDot } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div>
      <HeroSection />

      {/* Welcome Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center glass p-8 md:p-12 rounded-[40px] border border-gold/20">
          <div>
            <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium block mb-3">Welcome to Swasthyam</span>
            <h2 className="font-serif text-4xl md:text-5xl text-botanical mb-6">Healing Rooted in Ancient Wisdom</h2>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              At Swasthyam Ayurved, we believe that true health is not just the absence of disease, but a dynamic state of physical, mental, and spiritual well-being.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Led by {siteConfig.doctorName !== 'TODO: Doctor name' ? siteConfig.doctorName : 'our experienced Vaidyas'}, our clinic offers authentic Nadi Pariksha, classical Panchakarma therapies, and personalized lifestyle guidance based on ancient Ayurvedic texts, tailored for the modern individual.
            </p>
            <LeafButton as={Link} to="/about" variant="outline">Meet Our Team</LeafButton>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden border border-gold/20 shadow-xl relative group">
              <video src="/videos/khalva-loop.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-parchment p-6 rounded-2xl border border-gold/20 shadow-lg hidden md:block max-w-[200px]">
              <p className="font-serif text-3xl text-botanical mb-1">{siteConfig.stats.yearsOfPractice !== 'TODO: Years of practice' ? siteConfig.stats.yearsOfPractice : '15+'}</p>
              <p className="text-xs uppercase tracking-widest text-sage">Years of Clinical Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Treatments */}
      <section className="pt-12 pb-24 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            subtitle="Holistic Care" 
            title="Conditions We Support" 
            description="Personalized Ayurvedic protocols addressing the root cause of chronic ailments through diet, lifestyle, and classical herbal formulations."
          />
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Joint & Bone Care", icon: <Activity />, slug: "joint-bone-care" },
              { title: "Digestive Health", icon: <Leaf />, slug: "digestive-health" },
              { title: "Skin & Hair", icon: <Droplets />, slug: "skin-hair" },
              { title: "Stress & Sleep", icon: <HeartPulse />, slug: "stress-anxiety-sleep" },
              { title: "Women's Health", icon: <ShieldCheck />, slug: "womens-health" },
              { title: "Lifestyle Disorders", icon: <Flame />, slug: "lifestyle-disorders" },
              { title: "Respiratory Care", icon: <Wind />, slug: "respiratory-allergy" },
              { title: "Migraine Relief", icon: <CircleDot />, slug: "migraine-headache" },
            ].map(condition => (
              <motion.div
                key={condition.slug}
                variants={{
                  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" } }
                }}
              >
                <Link to={`/treatments/${condition.slug}`} className="group block h-full bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-gold/15 hover:border-terracotta/40 hover:shadow-md transition-all text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-botanical/10 text-botanical group-hover:bg-terracotta group-hover:text-white flex items-center justify-center transition-colors mb-4">
                    {React.cloneElement(condition.icon, { className: 'w-5 h-5' })}
                  </div>
                  <h4 className="font-serif text-xl text-botanical">{condition.title}</h4>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <LeafButton as={Link} to="/treatments" variant="primary">View All Treatments</LeafButton>
          </div>
        </div>
      </section>

      {/* Panchakarma Highlight */}
      <section className="py-24 bg-botanical text-sand overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <SectionHeading 
            subtitle="Deep Detoxification" 
            title="The 5-Folds of Panchakarma" 
            description="Cleanse your body of deep-seated toxins and restore your innate doshic balance through our specialized cellular purification therapies."
            dark={true}
          />
          
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {[
              { name: "Vamana", slug: "vamana" },
              { name: "Virechana", slug: "virechana" },
              { name: "Basti", slug: "basti" },
              { name: "Nasya", slug: "nasya" },
              { name: "Raktamokshana", slug: "raktamokshana" },
            ].map(p => (
              <Link to={`/panchakarma/${p.slug}`} key={p.slug} className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-sand/30 group-hover:border-sand transition-colors relative">
                  <img loading="lazy" src={`/panchakarma/${p.slug}.webp`} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.src=`/panchakarma/${p.slug}.png`} />
                </div>
                <span className="text-sm uppercase tracking-widest font-medium group-hover:text-white transition-colors">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
          
          <LeafButton as={Link} to="/panchakarma" variant="outline" className="border-sand text-sand hover:bg-sand/10">Explore Panchakarma Visualizer</LeafButton>
        </div>
      </section>

      {/* Dosha Teaser */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 glass rounded-[40px] p-12 border border-gold/20 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex justify-center gap-6 md:gap-12 mb-8">
            {['vata', 'pitta', 'kapha'].map(dosha => (
              <div key={dosha} className="relative group">
                <img loading="lazy" src={`/dosha/${dosha}.webp`} alt={dosha} className="w-20 h-20 md:w-28 md:h-28 object-contain group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-xl" onError={(e) => e.target.src=`/dosha/${dosha}.png`} />
              </div>
            ))}
          </div>

          <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium block mb-3">Know Yourself</span>
          <h2 className="font-serif text-4xl text-botanical mb-4">Discover Your Ayurvedic Prakriti</h2>
          <p className="text-charcoal/70 leading-relaxed mb-8 max-w-xl mx-auto">
            Are you Vata, Pitta, or Kapha? Take our comprehensive Dosha assessment to understand your mind-body constitution and receive tailored lifestyle advice.
          </p>
          <LeafButton as={Link} to="/wellness/dosha-test" variant="primary">Take The Dosha Quiz</LeafButton>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Patient Stories" title="Words of Healing" />
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 glass rounded-[40px] p-12 border border-gold/20">
          <SectionHeading subtitle="Common Questions" title="Frequently Asked Questions" />
          <FAQAccordion faqs={generalFaqs} />
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-16 bg-botanical">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl text-sand mb-2">Ready to begin your healing journey?</h3>
            <p className="text-sand/70 text-sm">Schedule a consultation or reach out with your queries.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <LeafButton as={Link} to="/book-appointment" variant="primary">Book Appointment</LeafButton>
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md transition-all font-sans font-medium uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 border border-sand text-sand hover:bg-sand/10">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

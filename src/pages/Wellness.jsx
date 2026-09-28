import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import SEO from '../components/SEO';
import LeafButton from '../components/LeafButton';
import { Sun, CloudRain, Snowflake, Leaf, Wind } from 'lucide-react';

export default function Wellness() {
  return (
    <div>
      <SEO 
        title="Ayurvedic Wellness & Lifestyle" 
        description="Embrace Dinacharya (daily routine) and Ritucharya (seasonal routine) to maintain optimal health and prevent disease."
        url="/wellness"
      />
      
      <PageHero 
        title="Wellness & Lifestyle" 
        sanskritTitle="दिनचर्या आणि ऋतुचर्या"
        description="True health is a continuous practice. Align your daily rhythms with nature's cycles."
        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Anchor Navigation */}
      <div className="bg-botanical border-b border-gold/20 sticky top-[72px] z-30 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-8 py-4">
          {['Dosha Test', 'Dinacharya', 'Ritucharya', 'Ayurvedic Diet', 'Yoga'].map(anchor => (
            <a key={anchor} href={`#${anchor.toLowerCase().replace(' ', '-')}`} className="text-sand/70 hover:text-gold text-xs uppercase tracking-widest font-medium transition-colors">
              {anchor}
            </a>
          ))}
        </div>
      </div>

      {/* Dosha Test Teaser */}
      <section id="dosha-test" className="py-24 bg-linen scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionHeading subtitle="Step 1" title="Know Your Prakriti" />
          <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
            Before adopting any wellness routine, you must understand your unique constitution. The balance of Vata, Pitta, and Kapha determines what foods, exercises, and habits are medicinal for you, and which are harmful.
          </p>
          <LeafButton as={Link} to="/wellness/dosha-test" variant="primary">Take The Free Dosha Test</LeafButton>
        </div>
      </section>

      {/* Dinacharya (Daily Routine) */}
      <section id="dinacharya" className="py-24 bg-parchment border-y border-gold/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Daily Rhythm" title="Dinacharya" description="The ideal daily routine to maintain hormonal balance, strong digestion, and mental clarity." />
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { time: "4:30 AM - 6:00 AM", title: "Brahma Muhurta (Wake Up)", desc: "Wake up before sunrise when the air is pure and Vata energy is dominant. Drink a glass of warm water." },
              { time: "6:00 AM - 7:00 AM", title: "Cleansing & Exercise", desc: "Scrape your tongue, brush teeth, practice oil pulling (Gandusha), and engage in light Yoga or brisk walking." },
              { time: "7:00 AM - 8:00 AM", title: "Abhyanga & Bath", desc: "Massage the body with warm sesame oil and take a warm bath to stimulate circulation." },
              { time: "8:00 AM - 9:00 AM", title: "Light Breakfast", desc: "Eat a warm, cooked, light breakfast according to your dosha." },
              { time: "12:00 PM - 1:30 PM", title: "Lunch (Largest Meal)", desc: "When the sun is highest, Pitta (digestive fire) is strongest. Have your heaviest meal of the day." },
              { time: "6:00 PM - 7:30 PM", title: "Light Dinner", desc: "Eat a very light, soupy dinner. Digestion slows down significantly after sunset." },
              { time: "9:30 PM - 10:00 PM", title: "Sleep", desc: "Disconnect from screens and aim to sleep before 10 PM to allow the liver to detoxify during Pitta time (10 PM - 2 AM)." }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start bg-linen p-6 rounded-2xl border border-gold/20 shadow-sm">
                <div className="w-32 shrink-0 text-right mt-1">
                  <span className="text-xs font-bold text-terracotta tracking-wider">{step.time}</span>
                </div>
                <div className="w-px h-full bg-gold/30 relative mt-2">
                  <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-botanical"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-serif text-xl text-botanical mb-2">{step.title}</h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritucharya (Seasonal Routine) */}
      <section id="ritucharya" className="py-24 bg-botanical text-sand scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Seasonal Rhythm" title="Ritucharya" description="Ayurveda divides the year into 6 seasons (Ritus). Your diet and lifestyle must change as the environment changes." align="center" dark={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { icon: <Snowflake />, name: "Shishira (Winter)", months: "Mid Jan - Mid Mar", dosha: "Kapha accumulates" },
              { icon: <Sun />, name: "Vasanta (Spring)", months: "Mid Mar - Mid May", dosha: "Kapha aggravates" },
              { icon: <Sun className="text-gold" />, name: "Grishma (Summer)", months: "Mid May - Mid Jul", dosha: "Pitta accumulates, Vata aggravates" },
              { icon: <CloudRain />, name: "Varsha (Monsoon)", months: "Mid Jul - Mid Sep", dosha: "Vata severely aggravates" },
              { icon: <Leaf />, name: "Sharad (Autumn)", months: "Mid Sep - Mid Nov", dosha: "Pitta aggravates" },
              { icon: <Wind />, name: "Hemanta (Late Autumn)", months: "Mid Nov - Mid Jan", dosha: "Vata pacifies, Digestion is strongest" }
            ].map((ritu, i) => (
              <div key={i} className="bg-sand/5 p-8 rounded-2xl border border-sand/20 text-center hover:bg-sand/10 transition-colors">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold/20 text-gold flex items-center justify-center mb-4">
                  {ritu.icon}
                </div>
                <h4 className="font-serif text-xl mb-1">{ritu.name}</h4>
                <p className="text-xs uppercase tracking-widest text-sand/60 mb-4">{ritu.months}</p>
                <p className="text-sm text-sand/80 font-light">{ritu.dosha}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

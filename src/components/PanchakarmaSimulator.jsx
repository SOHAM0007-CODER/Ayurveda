import React, { useState } from 'react';
import { Droplets, Wind, Flame, CircleDot, Activity } from 'lucide-react';

const therapies = [
  {
    id: 'vamana',
    name: 'Vamana (Therapeutic Emesis)',
    icon: <Droplets className="w-8 h-8" />,
    dosha: 'Kapha',
    targetOrgans: 'Stomach, Chest, Respiratory Tract',
    description: 'A medically supervised therapeutic vomiting procedure designed to eliminate deep-seated Kapha toxins from the respiratory and gastrointestinal tract. 💧',
    benefits: ['Clears asthma and severe congestion', 'Treats chronic skin conditions like psoriasis', 'Resets digestion and metabolism'],
    image: 'https://images.unsplash.com/photo-1512290900676-26c2a4d4b52b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'virechana',
    name: 'Virechana (Purgation Therapy)',
    icon: <Flame className="w-8 h-8" />,
    dosha: 'Pitta',
    targetOrgans: 'Small Intestine, Liver, Gallbladder',
    description: 'A medicated purgation therapy that cleanses Pitta toxins accumulated in the liver and gallbladder. Highly effective for heat-related disorders. 🔥',
    benefits: ['Purifies the blood and clears acne/eczema', 'Relieves hyperacidity and ulcers', 'Reduces liver inflammation and jaundice'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'basti',
    name: 'Basti (Medicated Enema)',
    icon: <Wind className="w-8 h-8" />,
    dosha: 'Vata',
    targetOrgans: 'Colon, Bones, Joints',
    description: 'Considered the mother of all Panchakarma treatments. Herbal decoctions and oils are administered to deeply cleanse and nourish the colon, the seat of Vata. 🌪️',
    benefits: ['Cures chronic constipation and IBS', 'Relieves severe lower back pain and sciatica', 'Strengthens bones and joints'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nasya',
    name: 'Nasya (Nasal Administration)',
    icon: <CircleDot className="w-8 h-8" />,
    dosha: 'Kapha & Vata',
    targetOrgans: 'Head, Neck, Sinuses, Brain',
    description: 'Instillation of medicated oils into the nasal passages to clear the pathways to the head. Essential for neurological and respiratory health. 🌿',
    benefits: ['Relieves migraines and chronic sinusitis', 'Improves memory and mental clarity', 'Prevents hair fall and premature graying'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'raktamokshana',
    name: 'Raktamokshana (Blood Letting)',
    icon: <Activity className="w-8 h-8" />,
    dosha: 'Pitta & Rakta',
    targetOrgans: 'Bloodstream, Skin',
    description: 'A complex surgical procedure using leeches or venipuncture to purify the blood of localized toxins. Used for severe, treatment-resistant conditions. 🩺',
    benefits: ['Treats severe gout and localized joint pain', 'Heals chronic ulcers and deep skin infections', 'Reduces localized swelling and toxicity'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  }
];

export default function PanchakarmaSimulator() {
  const [active, setActive] = useState(therapies[2]); // Default to Basti

  return (
    <section className="py-20 bg-linen min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium">Interactive Visualizer</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-4 text-botanical">The 5-Folds of Panchakarma</h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">Select a therapy below to understand its mechanism, target organs, and profound healing benefits.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Interactive Wheel / List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {therapies.map((t) => (
              <button 
                key={t.id} 
                onClick={() => setActive(t)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${active.id === t.id ? 'bg-botanical text-sand border-botanical shadow-md scale-105' : 'bg-parchment border-gold/20 text-botanical hover:border-terracotta/40'}`}
              >
                <div className={`p-3 rounded-lg ${active.id === t.id ? 'bg-terracotta text-white' : 'bg-botanical/10 text-terracotta'}`}>
                  {t.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xl font-medium">{t.name.split(' ')[0]}</h3>
                  <span className={`text-xs uppercase tracking-wider ${active.id === t.id ? 'text-sand/70' : 'text-sage'}`}>{t.name.split(' ').slice(1).join(' ')}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Display Panel */}
          <div className="w-full lg:w-2/3 bg-parchment rounded-3xl border border-gold/20 p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2">
              <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs uppercase tracking-widest rounded-full mb-4 font-medium">Balances: {active.dosha} Dosha</span>
              <h3 className="font-serif text-4xl text-botanical mb-4">{active.name}</h3>
              <p className="text-charcoal/80 leading-relaxed mb-6">{active.description}</p>
              
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest text-sage mb-2">Target Organs</h4>
                <p className="font-serif text-xl text-botanical">{active.targetOrgans}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-sage mb-3">Clinical Benefits</h4>
                <ul className="space-y-2">
                  {active.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                      <span className="text-terracotta mt-1">🪔</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 h-full">
              <img src={active.image} alt={active.name} className="w-full h-72 object-cover rounded-[32px] shadow-inner border border-amber-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Play } from 'lucide-react';

const videos = [
  { id: 1, title: 'Recovery from 10 Years of Chronic Arthritis', type: 'Patient Transformation', thumb: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Full 21-Day Panchakarma Detox Walkthrough', type: 'Clinic Experience', thumb: 'https://images.unsplash.com/photo-1512290900676-26c2a4d4b52b?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: "Doctor's Q&A: Managing Pitta Disorders in Summer", type: 'Podcast / Live Q&A', thumb: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Patient Story: Reversing Type-2 Diabetes Naturally', type: 'Patient Transformation', thumb: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Inside the Shirodhara Therapy Room', type: 'Treatment Demo', thumb: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'How We Prepare Classical Kashayams', type: 'Behind the Scenes', thumb: 'https://images.unsplash.com/photo-1512290900676-26c2a4d4b52b?auto=format&fit=crop&w=800&q=80' }
];

export default function VideoGallery({ openVideo }) {
  return (
    <section className="py-24 bg-parchment min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-terracotta text-xs uppercase tracking-[0.3em] font-medium">Real Transformations</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-4 text-botanical">Patient Healing Stories & Podcasts</h2>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto leading-relaxed">Witness profound journeys of recovery and deep Ayurvedic insights shared by our patients and Vaidyas.</p>
        </div>

        {/* Featured Video */}
        <div className="mb-12 group cursor-pointer relative rounded-3xl overflow-hidden border border-gold/20 shadow-md" onClick={() => openVideo('Full 21-Day Panchakarma — Patient Transformation')}>
          <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=80" alt="Featured Patient Story" className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-botanical/40 group-hover:bg-botanical/20 transition-colors duration-500"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-sand/90 text-terracotta flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <Play className="w-8 h-8 ml-1" />
            </div>
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-1 bg-terracotta text-white text-xs uppercase tracking-widest rounded-full mb-3 font-medium">Featured Story</span>
              <h3 className="font-serif text-3xl md:text-4xl text-sand">Full 21-Day Panchakarma Transformation</h3>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((v) => (
            <div key={v.id} className="group cursor-pointer" onClick={() => openVideo(v.title)}>
              <div className="relative h-52 rounded-2xl overflow-hidden mb-4 border border-gold/15">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-botanical/20 group-hover:bg-botanical/40 transition-colors duration-500"></div>
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-sand/90 text-terracotta flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors shadow-md">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
              </div>
              <span className="text-terracotta text-[10px] uppercase tracking-widest font-medium">{v.type}</span>
              <h4 className="font-serif text-lg text-botanical mt-1 group-hover:text-terracotta transition-colors leading-tight">{v.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

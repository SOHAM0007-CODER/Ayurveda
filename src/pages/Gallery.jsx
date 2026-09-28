import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import VideoGallery from '../components/VideoGallery';
import VideoModal from '../components/VideoModal';

export default function Gallery() {
  const [activeGalleryTab, setactiveGalleryTab] = useState('Videos');
  const [videoUrl, setVideoUrl] = useState(null);

  const tabs = ['Clinic Photos', 'Therapies', 'Events & Camps', 'Videos'];

  return (
    <div>
      <SEO title="Gallery" description="Take a visual tour of Swasthyam Ayurved." url="/gallery" />
      <PageHero title="Gallery" sanskritTitle="दर्शनम्" />

      <section className="py-24 bg-linen min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-gold/20 pb-4">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setactiveGalleryTab(tab)}
                className={`text-sm uppercase tracking-widest font-medium transition-all px-4 py-2 border-b-2 ${
                  activeGalleryTab === tab 
                    ? 'border-terracotta text-terracotta' 
                    : 'border-transparent text-charcoal/60 hover:text-botanical'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeGalleryTab === 'Videos' ? (
            <div className="-mt-16">
              <VideoGallery openVideo={setVideoUrl} hideHeader={true} />
            </div>
          ) : (
            <div className="text-center py-20 text-charcoal/60">
              <p>Photos for {activeGalleryTab} are being curated and will be uploaded shortly.</p>
            </div>
          )}
        </div>
      </section>

      <VideoModal videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

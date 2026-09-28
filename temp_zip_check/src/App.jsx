import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PanchakarmaSimulator from './components/PanchakarmaSimulator';
import DoshaTest from './components/DoshaTest';
import VideoGallery from './components/VideoGallery';
import BookingForm from './components/BookingForm';
import VideoModal from './components/VideoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [videoUrl, setVideoUrl] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HeroSection setActiveTab={setActiveTab} />;
      case 'simulator':
        return <PanchakarmaSimulator />;
      case 'dosha-test':
        return <DoshaTest />;
      case 'gallery':
        return <VideoGallery openVideo={setVideoUrl} />;
      case 'booking':
        return <BookingForm />;
      default:
        return <HeroSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen font-sans bg-linen text-charcoal">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-botanical text-sand/80 pt-16 pb-8 border-t-4 border-terracotta">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h4 className="font-serif text-2xl text-sand mb-4">AyuLife Sanctuary</h4>
          <p className="text-sm max-w-lg mx-auto text-sand/60 mb-8 leading-relaxed">
            Preserving the ancient purity of Ayurveda through authentic Panchakarma, Nadi Pariksha, and personalized holistic care.
          </p>
          <div className="border-t border-sand/10 pt-6 text-xs text-sand/40 tracking-widest uppercase">
            &copy; 2026 AyuLife Sanctuary. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <VideoModal title={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import SmoothScrollProvider from './motion/SmoothScrollProvider';
import LivingBackground from './scene/LivingBackground';
import LeafCursor from './components/LeafCursor';
import SplashIntro from './components/SplashIntro';

// Pages
import Home from './pages/Home';
import Panchakarma from './pages/Panchakarma';
import PanchakarmaDetail from './pages/PanchakarmaDetail';
import Wellness from './pages/Wellness';
import DoshaTest from './components/DoshaTest';
import Treatments from './pages/Treatments';
import TreatmentDetail from './pages/TreatmentDetail';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function AppContent() {
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <SmoothScrollProvider>
      <SplashIntro />
      <LivingBackground />
      <LeafCursor />
      <div className="min-h-screen font-sans bg-transparent text-ink flex flex-col relative z-10">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home openVideo={setVideoUrl} />} />
            <Route path="/panchakarma" element={<Panchakarma />} />
            <Route path="/panchakarma/:slug" element={<PanchakarmaDetail />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/wellness/dosha-test" element={<DoshaTest />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/treatments/:slug" element={<TreatmentDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery openVideo={setVideoUrl} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home openVideo={setVideoUrl} />} />
          </Routes>
        </main>

        <Footer />
        <VideoModal title={videoUrl} onClose={() => setVideoUrl(null)} />
      </div>
    </SmoothScrollProvider>
  );
}

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';

import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Staff from './components/Staff';
import Gallery from './components/Gallery';
import BeforeAfter from './components/BeforeAfter';
import Reviews from './components/Reviews';
import Location from './components/Location';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import SmoothCursor from './components/ui/SmoothCursor';
import './app.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
          <SmoothCursor />
          <Navbar />
          <div id="home">
            <Hero
              title="LUXURY BEAUTY DELIVERED"
              subtitle="Premium Salon Experience"
              description="Premium salon built around elevating your look into striking reality. Join our 1500+ happy clients and enjoy over 50+ premium services."
            />
          </div>
          <About />
          <Services />
          <Staff />
          <Gallery />
          <BeforeAfter />
          <Reviews />
          <Location />
          <CTA />
          <Footer />
        </ReactLenis>
      </div>
    </>
  );
}

export default App;

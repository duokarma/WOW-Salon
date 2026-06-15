import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';
import gsap from 'gsap';
import ScrollProgress from './components/ui/ScrollProgress';
import StickyMobileCTA from './components/ui/StickyMobileCTA';
import MagneticButton from './components/ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

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
import TouchInteraction from './components/ui/TouchInteraction';
import { SceneManager } from './three/SceneManager';
import './app.css';

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = React.useRef(null);

  React.useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }} ref={lenisRef} autoRaf={false}>
          <ScrollProgress />
          <TouchInteraction />
          <Navbar />
          <div id="home">
            <Hero
              title="EXPERIENCE THE WOW"
              subtitle="Premium Salon Experience"
              description="A premium salon built around elevating your look into striking reality. Join our 1500+ happy clients and enjoy over 50+ signature services."
              baseColor="#FDFBF7"
              midColor="#F4EFE6"
              sheenColor="#D4A853"
              accentColor="#B8922E"
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
          <StickyMobileCTA />
        </ReactLenis>
      </div>
    </>
  );
}

export default App;

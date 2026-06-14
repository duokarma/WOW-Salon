import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactLenis from 'lenis/react';
import { SilkAurora } from './components/ui/silk-aurora';
import ScrollProgress from './components/ui/ScrollProgress';
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
const SceneManager = lazy(() => import('./three/SceneManager').then(module => ({ default: module.SceneManager })));
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
          <Suspense fallback={null}>
            <SceneManager />
          </Suspense>
          <ScrollProgress />
          <Navbar />
          <SilkAurora
            baseColor="#000000"
            midColor="#0a0a0f"
            sheenColor="#2a1e12"
            accentColor="#0c1f13"
            grain={0.9}
            speed={0.5}
            intensity={0.6}
            className="w-full flex flex-col"
          >
            <div id="home">
              <Hero />
            </div>
          </SilkAurora>
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

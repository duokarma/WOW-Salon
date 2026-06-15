import React, { useRef } from 'react';
import SectionHeader from './ui/SectionHeader';
import { getAsset } from '../lib/assets';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="section relative overflow-hidden text-[#F9F6F0] bg-[#0a0806]" id="gallery" style={{ paddingBottom: '100px' }}>
      {/* Vibrant Orbs for Glassmorphism Underlay */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#d4a853]/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-[#8b7355]/20 rounded-full blur-[140px] pointer-events-none"></div>
      
      {/* Heavy Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-[#120e0a]/40 backdrop-blur-[80px] border-y border-[#d4a853]/10 pointer-events-none z-0"></div>

      <div className="container relative z-10 mb-8 flex justify-between items-end">
        <SectionHeader
          label="Our Work"
          words={['Showcase', 'Gallery']}
          highlightWord="Gallery"
          description="A glimpse into the striking realities we create."
          style={{ marginBottom: 0 }}
        />
        
        {/* Desktop Premium Navigation */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#d4a853] hover:border-[#d4a853] transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#d4a853] hover:border-[#d4a853] transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="w-full relative mt-12 z-10 group/slider">
        <div 
          ref={sliderRef}
          className="gallery-slider flex overflow-x-auto px-4 sm:px-8 gap-6 pb-12 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <motion.div 
              key={i} 
              className="gallery-item flex-shrink-0 w-72 h-[420px] sm:w-80 sm:h-[520px] rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 snap-center relative group"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={getAsset(`/gallery_${i}.webp`)} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-110" loading="lazy" />
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]">
                  <p className="text-[#d4a853] text-xs tracking-[0.2em] uppercase font-semibold mb-2">Portfolio</p>
                  <h3 className="text-white font-display text-xl">Signature Look {i}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Floating Navigation for Mobile/Tablet */}
        <button 
          onClick={() => scroll('left')}
          className="absolute top-[40%] left-4 md:hidden w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-[#d4a853] hover:border-[#d4a853] hover:bg-black/80 transition-all duration-300 z-20 shadow-xl opacity-0 group-hover/slider:opacity-100 sm:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute top-[40%] right-4 md:hidden w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-[#d4a853] hover:border-[#d4a853] hover:bg-black/80 transition-all duration-300 z-20 shadow-xl opacity-0 group-hover/slider:opacity-100 sm:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Gallery;

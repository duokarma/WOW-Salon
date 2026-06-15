import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { getAsset } from '../lib/assets';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

const Gallery = () => {
  return (
    <section className="section section-dark relative overflow-hidden" id="gallery" style={{ paddingBottom: '100px' }}>
      {/* Luxury Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b8922e]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#b8922e]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container relative z-10 mb-8">
        <SectionHeader
          label="Our Work"
          words={['Showcase', 'Gallery']}
          highlightWord="Gallery"
          description="A glimpse into the striking realities we create."
          style={{ marginBottom: 0 }}
        />
      </div>
      
      <div className="w-full relative mt-12 z-10">
        <div className="gallery-slider flex overflow-x-auto px-4 sm:px-8 gap-6 pb-12 snap-x snap-mandatory hide-scrollbar">
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
        
        {/* Swipe Hint for Mobile */}
        <div className="absolute top-[45%] left-4 right-4 flex justify-between pointer-events-none md:hidden opacity-50 z-20">
           <div className="bg-black/60 border border-white/10 rounded-full p-2 backdrop-blur-md shadow-lg"><MoveHorizontal size={20} color="#d4a853" /></div>
           <div className="bg-black/60 border border-white/10 rounded-full p-2 backdrop-blur-md shadow-lg"><MoveHorizontal size={20} color="#d4a853" /></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

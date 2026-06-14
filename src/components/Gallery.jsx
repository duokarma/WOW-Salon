import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { getAsset } from '../lib/assets';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

const Gallery = () => {
  return (
    <section className="section section-light" id="gallery" style={{ paddingBottom: '100px' }}>
      <div className="container relative z-10 mb-8">
        <SectionHeader
          label="Our Work"
          words={['Showcase', 'Gallery']}
          highlightWord="Gallery"
          description="A glimpse into the striking realities we create."
          style={{ marginBottom: 0 }}
        />
      </div>
      
      <div className="w-full relative mt-12">
        <div className="gallery-slider flex overflow-x-auto px-4 sm:px-8 gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <motion.div 
              key={i} 
              className="gallery-item flex-shrink-0 w-72 h-[400px] sm:w-80 sm:h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#2A1E12]/5 snap-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={getAsset(`/gallery_${i}.webp`)} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
            </motion.div>
          ))}
        </div>
        
        {/* Swipe Hint for Mobile */}
        <div className="absolute top-[50%] left-4 right-4 flex justify-between pointer-events-none md:hidden opacity-50">
           <div className="bg-white/80 rounded-full p-2 backdrop-blur-sm shadow-md"><MoveHorizontal size={20} color="#2A1E12" /></div>
           <div className="bg-white/80 rounded-full p-2 backdrop-blur-sm shadow-md"><MoveHorizontal size={20} color="#2A1E12" /></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

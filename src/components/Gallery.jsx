import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { getAsset } from '../lib/assets';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

const Gallery = () => {
  return (
    <section className="section section-light" id="gallery" style={{ paddingBottom: 0 }}>
      <div className="container relative z-10 mb-8 pointer-events-none">
        <SectionHeader
          label="Our Work"
          words={['Showcase', 'Gallery']}
          highlightWord="Gallery"
          description="Interact with our curated 3D portfolio"
          style={{ marginBottom: 0 }}
        />
      </div>
      {/* 
        This transparent spacer provides exactly enough native scroll height 
        for the user to interact with the 3D GalleryCylinder underneath.
        The inner content acts as an HTML fallback if WebGL fails.
      */}
      <div className="w-full relative pointer-events-none" style={{ minHeight: '120vh' }}>
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div 
            className="flex items-center gap-2 bg-[#2A1E12]/80 backdrop-blur-sm text-[#F4DFB8] px-6 py-3 rounded-full text-sm font-medium tracking-wide"
            animate={{ x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <MoveHorizontal size={18} /> Drag to Explore
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-auto z-20">
          <div className="gallery-slider pointer-events-auto overflow-x-auto px-4 sm:px-8" data-cursor="drag">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="gallery-item flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img src={getAsset(`/gallery_${i}.webp`)} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

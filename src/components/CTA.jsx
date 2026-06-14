import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ease } from '../lib/motion';
import { MagnetLines } from './ui/magnet-lines';
import MagneticButton from './ui/MagneticButton';

const CTA = () => (
  <section id="cta" className="section section-dark relative flex items-center justify-center min-h-[40vh] overflow-hidden" style={{ background: '#000000' }}>
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 pointer-events-none">
      <MagnetLines
        rows={12}
        columns={30}
        containerSize="100%"
        lineColor="#222222"
        lineWidth="1.5px"
        lineHeight="2vmin"
      />
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center" style={{ pointerEvents: 'none' }}>
      <motion.h2
        className="font-light tracking-[0.12em] text-white uppercase leading-[1.1]"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
      >
        READY TO TRANSFORM?
      </motion.h2>
      <MagneticButton
        href="https://wa.me/919924404860"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#F4DFB8] text-[#2A1E12] px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg hover:bg-[#E6D5B8] transition-colors"
        style={{ pointerEvents: 'auto' }}
      >
        BOOK YOUR APPOINTMENT <ArrowUpRight size={20} className="inline-block ml-2" />
      </MagneticButton>
    </div>
  </section>
);

export default CTA;

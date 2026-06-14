import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MagnetLines } from './ui/magnet-lines';

const CTA = () => (
  <section className="section section-dark relative flex items-center justify-center min-h-[40vh] overflow-hidden" style={{ background: '#000000', padding: '8rem 0' }}>
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
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-[0.12em] text-white uppercase leading-[1.1]">
        READY TO TRANSFORM?
      </h2>
      <a href="https://wa.me/919924404860" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ pointerEvents: 'auto' }}>
        BOOK YOUR APPOINTMENT <ArrowUpRight size={20} className="inline-block ml-2" />
      </a>
    </div>
  </section>
);

export default CTA;

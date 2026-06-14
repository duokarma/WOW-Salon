import React from 'react';
import SectionHeader from './ui/SectionHeader';

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
        <div className="absolute inset-0 flex flex-col justify-center opacity-30">
          <div className="gallery-slider pointer-events-auto overflow-x-auto px-4 sm:px-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="gallery-item flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img src={`/WOW-Salon/gallery_${i}.jpeg`} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

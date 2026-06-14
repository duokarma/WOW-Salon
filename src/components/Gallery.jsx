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
        for the user to interact with the 3D GalleryCylinder underneath
      */}
      <div className="w-full h-[120vh] pointer-events-none" />
    </section>
  );
};

export default Gallery;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getAsset } from '../lib/assets';
import SectionHeader from './ui/SectionHeader';

const galleryItems = [
  { caption: 'Premium Styling', img: getAsset('/gallery_1.jpeg') },
  { caption: 'Expert Cuts', img: getAsset('/gallery_2.jpeg') },
  { caption: "Men's Grooming", img: getAsset('/gallery_3.jpeg') },
  { caption: 'Color Transformation', img: getAsset('/gallery_4.jpeg') },
  { caption: 'Bridal Beauty', img: getAsset('/gallery_5.jpeg') },
  { caption: 'Modern Styles', img: getAsset('/gallery_6.jpeg') },
];

const StickyCard = ({ i, caption, img, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 35 + 150}px)`,
        }}
        className="relative -top-1/4 flex h-[350px] w-[90vw] sm:h-[450px] sm:w-[80vw] md:w-[600px] lg:w-[700px] origin-top flex-col overflow-hidden rounded-none border border-white/10 bg-black shadow-none"
      >
        <img src={img} alt={caption} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
          <span className="font-['Outfit'] text-xl md:text-2xl font-semibold tracking-wider text-white drop-shadow-lg">{caption}</span>
        </div>
      </motion.div>
    </div>
  );
};

const Gallery = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="section section-light" id="gallery" style={{ paddingBottom: 0 }}>
      <div className="container relative z-10 mb-8">
        <SectionHeader
          label="Our Work"
          words={['Showcase', 'Gallery']}
          highlightWord="Gallery"
          description="Scroll down to see our curated portfolio"
          style={{ marginBottom: 0 }}
        />
      </div>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[10vh]"
      >
        {galleryItems.map((item, i) => {
          const targetScale = Math.max(0.7, 1 - (galleryItems.length - i - 1) * 0.05);
          return (
            <StickyCard
              key={`gallery_item_${i}`}
              i={i}
              {...item}
              progress={scrollYProgress}
              range={[i * (1 / galleryItems.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </section>
  );
};

export default Gallery;

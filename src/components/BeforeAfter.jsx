import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAsset } from '../lib/assets';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';

const BeforeAfterSlider = ({ beforeImg, afterImg }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e) => { isDragging.current = true; updatePosition(e.clientX); };
  const onPointerMove = (e) => { if (isDragging.current) updatePosition(e.clientX); };
  const onPointerUp = () => { isDragging.current = false; };

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove]);

  return (
    <div className="ba-slider-container" ref={containerRef} onPointerDown={onPointerDown}>
      <div className="ba-image ba-after">
        <img src={afterImg} alt="After" loading="lazy" />
        <span className="ba-label ba-label-after">After</span>
      </div>
      <div className="ba-image ba-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeImg} alt="Before" loading="lazy" />
        <span className="ba-label ba-label-before">Before</span>
      </div>
      <motion.div className="ba-handle" style={{ left: `${position}%` }}>
        <div className="ba-handle-line" />
        <motion.div
          className="ba-handle-circle"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8l4 4-4 4M6 8l-4 4 4 4" /></svg>
        </motion.div>
        <div className="ba-handle-line" />
      </motion.div>
    </div>
  );
};

const BeforeAfter = () => (
  <section className="section section-light" id="before-after">
    <div className="container">
      <SectionHeader
        label="Transformations"
        words={['Before', '&', 'After']}
        highlightWord="After"
        description="Witness the magic of our transformations"
      />
      <div className="ba-grid">
        <Reveal delay={0.1} className="ba-comparison">
          <BeforeAfterSlider beforeImg={getAsset('/before_after_1.webp')} afterImg={getAsset('/before_after_2.webp')} />
        </Reveal>
        <Reveal delay={0.2} className="ba-comparison">
          <BeforeAfterSlider beforeImg={getAsset('/before_after_3.webp')} afterImg={getAsset('/before_after_4.webp')} />
        </Reveal>
      </div>
    </div>
  </section>
);

export default BeforeAfter;

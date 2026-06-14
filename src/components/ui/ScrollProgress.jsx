import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
};

export default ScrollProgress;

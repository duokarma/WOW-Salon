import React from 'react';
import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CarouselNav = ({ onClick, ariaLabel, children, className = '' }) => {
  const reduced = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={`carousel-nav ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={reduced ? {} : { scale: 1.08, backgroundColor: 'rgba(255,255,255,1)' }}
      whileTap={reduced ? {} : { scale: 0.94 }}
      transition={spring}
    >
      {children}
    </motion.button>
  );
};

export default CarouselNav;

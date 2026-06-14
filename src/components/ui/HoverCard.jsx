import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease, cardHover } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HoverCard = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const dirs = { up: { y: 48 }, down: { y: -48 }, left: { x: -48 }, right: { x: 48 } };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      variants={cardHover}
      whileHover={reduced ? undefined : 'hover'}
      whileTap={reduced ? undefined : 'tap'}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;

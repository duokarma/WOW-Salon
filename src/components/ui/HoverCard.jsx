import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ease, cardHover } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HoverCard = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const dirs = { up: { y: 48 }, down: { y: -48 }, left: { x: -48 }, right: { x: 48 } };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200); // arbitrarily scaling it to [-100, 100] approx
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduced ? 0 : springRotateX,
        rotateY: reduced ? 0 : springRotateY,
        transformPerspective: 1000
      }}
      data-cursor="view"
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;

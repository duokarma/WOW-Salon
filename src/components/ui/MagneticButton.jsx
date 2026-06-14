import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { spring } from '../../lib/motion';

const MagneticButton = ({ children, className = '', href, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const reduced = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY, display: 'inline-flex', alignItems: 'center' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={reduced ? {} : { scale: 1.04 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={spring}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export default MagneticButton;

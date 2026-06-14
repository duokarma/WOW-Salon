import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ease } from '../../lib/motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const WordReveal = ({ words, highlightWord, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block" style={{ marginRight: '0.28em' }}>
          <motion.span
            className={word === highlightWord ? 'text-gradient' : undefined}
            initial={reduced ? false : { y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.07, duration: 0.65, ease }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default WordReveal;

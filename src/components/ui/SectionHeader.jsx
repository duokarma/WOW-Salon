import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import WordReveal from './WordReveal';
import { ease } from '../../lib/motion';

const SectionHeader = ({ label, words, highlightWord, description, className = '', style }) => (
  <Reveal className={`section-header ${className}`.trim()} style={style}>
    <motion.span
      className="section-label"
      initial={{ opacity: 0, letterSpacing: '0.3em' }}
      whileInView={{ opacity: 1, letterSpacing: '0.18em' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
    >
      {label}
    </motion.span>
    <h2 className="section-title">
      <WordReveal words={words} highlightWord={highlightWord} />
    </h2>
    {description && (
      <motion.p
        className="section-desc"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.25, duration: 0.6, ease }}
      >
        {description}
      </motion.p>
    )}
  </Reveal>
);

export default SectionHeader;

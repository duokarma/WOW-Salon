import React from 'react';
import { motion } from 'framer-motion';

const defaultContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const presetVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  'fade-in-blur': {
    hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function TextEffect({
  children,
  per = 'char',
  preset = 'fade',
  className,
  as: Component = 'span',
}) {
  if (typeof children !== 'string') {
    return <Component className={className}>{children}</Component>;
  }

  let segments;
  if (per === 'char') {
    segments = children.split('');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/); // Keep spaces as segments
  } else {
    segments = [children];
  }

  const MotionComponent = motion[Component] || motion.span;
  const itemVariants = presetVariants[preset] || presetVariants.fade;

  return (
    <MotionComponent
      className={className}
      variants={defaultContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {segments.map((segment, index) => {
        if (per === 'word' && segment.trim() === '') {
          return <span key={index}>{segment}</span>;
        }
        return (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{ display: 'inline-block' }}
          >
            {segment === ' ' ? '\u00A0' : segment}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}

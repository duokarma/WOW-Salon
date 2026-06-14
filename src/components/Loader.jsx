import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="premium-loader"
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-content">
        <div className="loader-scissors-wrapper">
          <svg className="loader-scissors" viewBox="0 0 24 24" fill="none">
            <path d="M7.4 8.7C8.50457 8.7 9.4 7.80457 9.4 6.7C9.4 5.59543 8.50457 4.7 7.4 4.7C6.29543 4.7 5.4 5.59543 5.4 6.7C5.4 7.80457 6.29543 8.7 7.4 8.7Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.6 8.7C17.7046 8.7 18.6 7.80457 18.6 6.7C18.6 5.59543 17.7046 4.7 16.6 4.7C15.4954 4.7 14.6 5.59543 14.6 6.7C14.6 7.80457 15.4954 8.7 16.6 8.7Z" stroke="currentColor" strokeWidth="1.5" />
            <path className="scissors-blade scissors-left" d="M8.8 8.1L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path className="scissors-blade scissors-right" d="M15.2 8.1L4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="11.5" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="loader-line-wrapper">
          <div className="loader-line-cut" />
        </div>
        <div className="loader-logo">WOW SALON</div>
      </div>
    </motion.div>
  );
};

export default Loader;

import React from 'react';
import { motion } from 'framer-motion';
import { getAsset } from '../lib/assets';
import SectionHeader from './ui/SectionHeader';

const Staff = () => {
  return (
    <section className="section section-light" id="staff" style={{ paddingTop: '20px' }}>
      <div className="container">
        <SectionHeader
          label="Meet the Experts"
          words={['Our', 'Team']}
          highlightWord="Team"
          description="Passionate artists dedicated to your transformation"
        />
        <motion.div 
          className="staff-group-image-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={getAsset('/team.webp')} 
            alt="WOW Salon Team" 
            className="staff-group-image"
            loading="lazy" 
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Staff;

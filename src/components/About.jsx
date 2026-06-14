import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getAsset } from '../lib/assets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Reveal from './ui/Reveal';
import CounterStat from './ui/CounterStat';
import WordReveal from './ui/WordReveal';

const About = () => {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 40, reduced ? 0 : -40]);

  return (
    <section className="section section-light" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <Reveal direction="left" className="about-image-col">
            <motion.div className="about-image-frame" style={{ y: imageY }}>
              <img src={getAsset('/about_salon.jpeg')} alt="WOW Salon luxury interior" loading="lazy" />
              <div className="image-chrome-border" />
            </motion.div>
            <motion.div
              className="about-experience-badge"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="exp-number">15+</span>
              <span className="exp-text">Years of<br />Excellence</span>
            </motion.div>
          </Reveal>

          <Reveal direction="right" className="about-content">
            <span className="section-label">About Us</span>
            <h2 className="section-title">
              <WordReveal words={['Redefining', 'the', 'Art', 'of', 'Beauty']} highlightWord="Beauty" />
            </h2>
            <p className="about-text">
              At WOW SALON, we believe everyone deserves to look and feel their best. Our skilled team provides quality hair, beauty, and grooming services in a comfortable and stylish environment.
            </p>
            <p className="about-text">
              From trendy haircuts and hair colors to bridal makeup, facials, and premium grooming — we make sure every customer leaves feeling confident and refreshed.
            </p>
            <div className="about-stats">
              <CounterStat target={1500} suffix="+" label="Happy Clients" />
              <CounterStat target={9} label="Expert Stylists" />
              <CounterStat target={50} suffix="+" label="Services" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, slideUp } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './ui/MagneticButton';

const Hero = () => {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const statsY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.2]);

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col font-sans uppercase text-white overflow-hidden bg-transparent">
      <motion.div
        className="relative z-10 flex flex-col min-h-screen flex-1 justify-between py-16 px-5 sm:px-8 md:px-12"
        style={{ opacity }}
      >
        <div className="h-16 md:h-20" />

        <motion.div
          className="flex-1 flex items-center justify-end py-8 md:py-0"
          style={{ y: statsY }}
        >
          <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
            {[
              { num: '1500', label: 'HAPPY\nCLIENTS', custom: 2 },
              { num: '50', label: 'PREMIUM\nSERVICES', custom: 3 },
              { num: '9', label: 'EXPERT\nSTYLISTS', custom: 4 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={stat.custom}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-right"
              >
                <div className="font-semibold" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
                  <span className="text-white text-[0.5em] align-top mr-0.5">+</span>
                  {stat.num}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest whitespace-pre-line leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="pb-8 md:pb-12 flex flex-col gap-6 md:gap-12">
          <div className="flex items-center justify-between gap-4">
            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest max-w-[130px] sm:max-w-[160px] md:max-w-xs leading-relaxed"
            >
              LUXURY SALON <br />
              EXPERIENCE FOR <br />
              YOUR TRANSFORMATION
            </motion.p>

            <MagneticButton
              href="https://wa.me/919924404860"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white font-semibold text-base sm:text-xl md:text-2xl whitespace-nowrap"
            >
              BOOK NOW <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" />
            </MagneticButton>
          </div>

          <motion.div
            className="flex items-end justify-between gap-3 sm:gap-4"
            style={{ y: headlineY }}
          >
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0"
            >
              <p className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest text-left md:text-right leading-relaxed">
                PREMIUM SALON BUILT AROUND ELEVATING YOUR LOOK INTO STRIKING REALITY
              </p>
            </motion.div>

            <div className="text-right font-semibold flex flex-col items-end" style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', lineHeight: 0.88 }}>
              {['LUXURY', 'BEAUTY', 'DELIVERED'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.div custom={i} variants={slideUp} initial="hidden" animate="visible">
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

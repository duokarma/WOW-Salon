import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    animate: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const slideUp = {
    initial: { y: "110%" },
    animate: (custom) => ({
      y: 0,
      transition: {
        delay: 0.4 + custom * 0.14,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans uppercase text-white overflow-hidden bg-transparent">

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen flex-1 justify-between py-16 px-5 sm:px-8 md:px-12">
        {/* Top spacer to leave room for global floating navbar */}
        <div className="h-16 md:h-20" />

        {/* Stats Row (Middle Section) */}
        <div className="flex-1 flex items-center justify-end py-8 md:py-0">
          <div className="flex items-start gap-5 sm:gap-8 md:gap-10">
            {[
              { num: "1500", label: "HAPPY\nCLIENTS", custom: 2 },
              { num: "50", label: "PREMIUM\nSERVICES", custom: 3 },
              { num: "9", label: "EXPERT\nSTYLISTS", custom: 4 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={stat.custom}
                variants={fadeUp}
                initial="initial"
                animate="animate"
                className="text-right"
              >
                <div className="font-semibold" style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}>
                  <span className="text-white text-[0.5em] align-top mr-0.5">+</span>
                  {stat.num}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest whitespace-pre-line leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8 md:pb-12 flex flex-col gap-6 md:gap-12">
          {/* Row A: Tagline + CTA */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              custom={5}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest max-w-[130px] sm:max-w-[160px] md:max-w-xs leading-relaxed"
            >
              LUXURY SALON <br />
              EXPERIENCE FOR <br />
              YOUR TRANSFORMATION
            </motion.p>
            
            <motion.a
              href="#contact"
              custom={6}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="flex items-center gap-1.5 text-white font-semibold text-base sm:text-xl md:text-2xl whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              BOOK NOW <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" />
            </motion.a>
          </div>

          {/* Row B: Description + Main Heading */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0"
            >
              <p className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest text-left md:text-right leading-relaxed">
                PREMIUM SALON BUILT AROUND ELEVATING YOUR LOOK INTO STRIKING REALITY
              </p>
            </motion.div>

            <div className="text-right font-semibold flex flex-col items-end" style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }}>
              {["LUXURY", "BEAUTY", "DELIVERED"].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={slideUp}
                    initial="initial"
                    animate="animate"
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

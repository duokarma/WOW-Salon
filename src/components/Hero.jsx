import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Play, Clock, Globe } from 'lucide-react';
import FadingVideo from './ui/FadingVideo';

const BlurText = ({ text, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? { 
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0]
          } : {}}
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: 'easeOut',
            delay: (i * 100) / 1000
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-between z-10 font-body">
      {/* Background Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 opacity-40"
        style={{ width: "120%", height: "120%", maxWidth: "none" }}
      />

      {/* Custom Navbar inside Hero */}
      <nav className="fixed top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between pointer-events-none">
        <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center pointer-events-auto">
          <span className="font-heading italic text-white text-2xl uppercase mt-1">W</span>
        </div>
        
        <div className="hidden lg:flex items-center liquid-glass rounded-full px-1.5 py-1.5 gap-1 pointer-events-auto">
          {['Services', 'Gallery', 'Reviews', 'Staff', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <button className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap flex items-center gap-1 hover:bg-white/90 transition-colors ml-2">
            Book Appointment <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="w-12 h-12 invisible"></div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 px-4 w-full">
        
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: 'easeOut' }}
          className="liquid-glass rounded-full p-1.5 flex items-center gap-3 w-fit mb-8"
        >
          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">Premium</span>
          <span className="text-sm text-white/90 pr-3 font-medium">Elevating Dahod's Beauty Standards Since 2024</span>
        </motion.div>

        <BlurText 
          text="Experience The Ultimate WOW Transformation"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-4xl text-center tracking-[-4px]"
        />

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, ease: 'easeOut' }}
          className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight text-center"
        >
          Discover a premium salon experience built around elevating your look into striking reality. Immerse yourself in luxury and let our experts craft your signature style.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, ease: 'easeOut' }}
          className="flex items-center gap-6 mt-6"
        >
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 hover:scale-105 transition-transform">
            Book Appointment <ArrowUpRight size={20} />
          </button>
          <button className="text-sm font-medium text-white flex items-center gap-2 hover:opacity-70 transition-opacity">
            View Services <Play size={16} fill="currentColor" />
          </button>
        </motion.div>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-stretch gap-4 mt-8"
        >
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
            <Clock className="w-7 h-7 text-white mb-6" strokeWidth={1.5} />
            <div className="text-4xl tracking-[-1px] leading-none font-heading italic text-white">50+</div>
            <div className="text-xs text-white/80 font-body font-light mt-2">Signature Services</div>
          </div>
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem]">
            <Globe className="w-7 h-7 text-white mb-6" strokeWidth={1.5} />
            <div className="text-4xl tracking-[-1px] leading-none font-heading italic text-white">1,500+</div>
            <div className="text-xs text-white/80 font-body font-light mt-2">Happy Clients</div>
          </div>
        </motion.div>

      </div>

      {/* Partners */}
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
        animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
        transition={{ delay: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-4 pb-8 mt-12 w-full"
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
          Collaborating with premium beauty brands globally
        </div>
        <div className="flex flex-wrap justify-center font-heading italic text-white text-2xl md:text-3xl tracking-tight gap-12 md:gap-16">
          <span>L'Oréal</span>
          <span>Dyson</span>
          <span>Schwarzkopf</span>
          <span>Matrix</span>
          <span>Wella</span>
        </div>
      </motion.div>
    </section>
  );
}

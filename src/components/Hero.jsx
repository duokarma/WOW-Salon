import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import FadingVideo from './ui/FadingVideo';
import { SceneManager } from '../three/SceneManager';
import { WebGLErrorBoundary } from './ui/webgl-error-boundary';

const BlurText = ({ text, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={`${className} text-shimmer`}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}
    >
      {words.map((word, i) => {
        if (word === '<br/>') {
          return <div key={i} className="basis-full h-0" />;
        }
        return (
          <motion.span
            key={i}
            initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
            animate={isInView ? { 
              filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
              opacity: [0, 0.5, 1],
              y: [50, -5, 0]
            } : {}}
            transition={{
              duration: 0.8,
              times: [0, 0.5, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: (i * 150) / 1000
            }}
            style={{ display: 'inline-block', marginRight: '0.28em' }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  
  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 400, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const headlineX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const headlineY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);
  
  const ctaX = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const ctaY = useTransform(smoothMouseY, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    mouseX.set((e.clientX / clientWidth) - 0.5);
    mouseY.set((e.clientY / clientHeight) - 0.5);
  };

  useEffect(() => {
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    const el = containerRef.current;
    let rafId = null;

    const throttledMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    if (isHoverable && el) {
      el.addEventListener('mousemove', throttledMouseMove, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener('mousemove', throttledMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll Parallax (Depth Layers)
  const { scrollY } = useScroll();
  const videoScrollY = useTransform(scrollY, [0, 1000], [0, 200]);
  const particlesScrollY = useTransform(scrollY, [0, 1000], [0, 100]);
  const contentScrollY = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-between z-10 font-body"
      >
        
        {/* Background Video (Layer 1: Deepest, slow scroll, ambient drift) */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
          style={{ y: videoScrollY }}
          animate={{ scale: [1, 1.03, 1], x: [-10, 10, -10], y: [-5, 5, -5] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <FadingVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
            className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top opacity-40"
            style={{ width: "120%", height: "120%", maxWidth: "none" }}
          />
        </motion.div>

        {/* 3D Scene Layer (Layer 2: Middle depth, medium scroll) */}
        <motion.div 
          className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen opacity-70 will-change-transform"
          style={{ y: particlesScrollY }}
        >
          <WebGLErrorBoundary fallback={<div className="absolute inset-0 pointer-events-none" />}>
            <SceneManager />
          </WebGLErrorBoundary>
        </motion.div>



        {/* Main Content (Layer 3: Top depth, inverted scroll, max parallax) */}
        <motion.div 
          className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 px-4 w-full will-change-transform"
          style={{ y: contentScrollY }}
        >
          
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="liquid-glass rounded-full py-2 px-5 flex items-center gap-3 w-fit mb-8 shadow-[0_4px_24px_rgba(255,255,255,0.08)] backdrop-blur-md"
          >
            <span className="text-[11px] text-white/90 font-semibold tracking-[0.2em] uppercase">Luxury Salon Experience</span>
          </motion.div>

          <motion.div style={{ x: headlineX, y: headlineY }}>
            <h1 className="text-6xl md:text-7xl lg:text-[7.5rem] font-display font-light text-white leading-[0.9] max-w-5xl text-center tracking-[-2px] mb-6 drop-shadow-xl">
              Luxury Hair. <br /> Timeless Beauty.
            </h1>
          </motion.div>

          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="mt-6 text-sm md:text-base lg:text-lg text-white/70 max-w-2xl font-body font-light leading-relaxed text-center tracking-wide"
          >
            Experience expert styling, premium treatments, and personalized beauty crafted to elevate your confidence.
          </motion.p>

          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
            style={{ x: ctaX, y: ctaY }}
            className="flex items-center mt-12"
          >
            <a href="#services" className="liquid-glass-strong cta-hover-sweep rounded-full px-8 py-4 text-[13px] font-semibold text-white flex items-center gap-2 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] tracking-[0.15em] uppercase overflow-hidden relative">
              View Our Services <ArrowUpRight size={18} />
            </a>
          </motion.div>

        </motion.div>

        {/* Smooth Transition Overlay to About Section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />

      </section>
    </>
  );
}

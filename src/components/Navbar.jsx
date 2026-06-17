import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Menu, MessageCircle } from 'lucide-react';
import { getAsset } from '../lib/assets';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic active tab detection based on scroll position (optional but nice)
      const sections = ['home', 'about', 'services', 'staff', 'gallery', 'before-after', 'reviews', 'location', 'cta', 'footer'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveTab(section.charAt(0).toUpperCase() + section.slice(1));
          break;
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Staff', href: '#staff' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-[100] flex justify-center pt-4 sm:pt-6 pointer-events-none px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[1200px] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
            scrolled 
              ? 'bg-[#F9F6F0]/90 backdrop-blur-xl border border-[#2A1E12]/10 shadow-[0_8px_32px_rgba(42,30,18,0.08)] scale-[0.98]' 
              : 'bg-[#2A1E12]/25 backdrop-blur-md border border-[#F4DFB8]/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] scale-100'
          }`}
          layout
        >
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 flex items-center z-10" onClick={() => setActiveTab('Home')}>
            <img 
              src={getAsset('/logo.webp')} 
              alt="WOW Salon" 
              className={`h-7 sm:h-9 w-auto transition-all duration-500 ${scrolled ? 'filter invert opacity-80' : 'opacity-100'}`} 
              decoding="async"
            />
          </a>

          {/* Desktop Links (Center Pill) */}
          <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => {
              const isActive = activeTab === l.label;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setActiveTab(l.label)}
                  className="relative px-5 py-2.5 text-[0.85rem] font-medium tracking-wide transition-colors duration-300 rounded-full uppercase"
                  style={{
                    color: isActive ? '#2A1E12' : (scrolled ? '#3B302B' : '#F9F6F0')
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#F4DFB8] rounded-full z-[-1] shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right CTA / Hamburger */}
          <div className="flex items-center space-x-3 z-10">
            <a 
              href="#cta"
              className={`hidden md:flex items-center px-7 py-2.5 rounded-full text-[0.8rem] font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                scrolled 
                  ? 'bg-[#2A1E12] text-[#F4DFB8] shadow-md hover:shadow-lg' 
                  : 'bg-[#F4DFB8] text-[#2A1E12] shadow-md hover:bg-[#E6D5B8]'
              }`}
            >
              Contact
            </a>
            <button
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled ? 'text-[#2A1E12] hover:bg-[#2A1E12]/5' : 'text-[#F9F6F0] hover:bg-white/10'
              }`}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Luxury Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glass Backdrop Layer */}
            <div className="absolute inset-0 bg-[#050507]/60 backdrop-blur-[24px]" />
            
            <div className="relative z-10 flex items-center justify-between px-6 py-8">
              <img src={getAsset('/logo.webp')} alt="WOW Salon" className="h-8 filter invert opacity-90" decoding="async" />
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-3 rounded-full hover:bg-white/10 transition-colors group border border-transparent hover:border-white/20"
              >
                <X size={28} color="#FFFFFF" strokeWidth={1} className="group-hover:scale-90 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-2 space-y-6 sm:space-y-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="group relative flex items-center w-fit"
                  onClick={() => {
                    setActiveTab(l.label);
                    setTimeout(() => setMobileOpen(false), 400);
                  }}
                  initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.4, delay: i * 0.05 } }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-display text-white/60 group-hover:text-white transition-colors duration-500 font-light tracking-tight">
                    {l.label}
                  </span>
                  <ArrowUpRight size={32} className="ml-4 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white/80" strokeWidth={1} />
                </motion.a>
              ))}
            </div>
            


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

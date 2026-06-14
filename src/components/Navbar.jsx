import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Menu } from 'lucide-react';
import { getAsset } from '../lib/assets';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic active tab detection based on scroll position (optional but nice)
      const sections = ['home', 'about', 'services', 'staff', 'gallery', 'reviews'];
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#2A1E12] text-[#F9F6F0] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#F4DFB8]/10">
              <img src={getAsset('/logo.webp')} alt="WOW Salon" className="h-8 filter invert opacity-90" />
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={24} color="#F4DFB8" strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8 py-8 space-y-6">
              {links.concat([{ label: 'Contact', href: '#cta' }]).map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="text-4xl sm:text-5xl font-light tracking-wide hover:text-[#F4DFB8] transition-colors"
                  onClick={() => {
                    setActiveTab(l.label);
                    setTimeout(() => setMobileOpen(false), 300);
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              className="px-8 py-10 border-t border-[#F4DFB8]/10 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-[#F4DFB8]/60 text-sm tracking-widest uppercase">
                Premium Experience
              </div>
              <ArrowUpRight size={24} color="#F4DFB8" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

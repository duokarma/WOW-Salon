import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { getAsset } from '../lib/assets';
import { ease, navItem, spring } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
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
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={false}
        animate={{
          paddingTop: scrolled ? 10 : 16,
          paddingBottom: scrolled ? 10 : 16,
        }}
        transition={{ duration: 0.4, ease }}
      >
        <div className="nav-container">
          <motion.a
            href="#home"
            className="nav-logo"
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={spring}
          >
            <img src={getAsset('/logo.png')} alt="WOW Salon Logo" className="brand-logo" />
          </motion.a>
          <ul className="nav-menu">
            {links.map(l => (
              <motion.li key={l.href} variants={navItem} initial="rest" whileHover={reduced ? 'rest' : 'hover'}>
                <a href={l.href} className="nav-link">{l.label}</a>
              </motion.li>
            ))}
          </ul>
          <motion.button
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            whileTap={reduced ? {} : { scale: 0.9 }}
            transition={spring}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-overlay-top">
              <a href="#home" className="nav-logo" onClick={() => setMobileOpen(false)}>
                <img src={getAsset('/logo.png')} alt="WOW Salon Logo" className="brand-logo" />
              </a>
              <motion.button
                className="mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                whileTap={reduced ? {} : { scale: 0.9, rotate: 90 }}
                transition={spring}
              >
                <X size={24} />
              </motion.button>
            </div>
            <ul className="mobile-nav-links">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: 0.08 + i * 0.06, ease }}
                >
                  <a href={l.href} className="mobile-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="https://wa.me/919924404860"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.45, ease }}
              whileHover={reduced ? {} : { scale: 1.03, x: 4 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              Book Now <ArrowUpRight size={20} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

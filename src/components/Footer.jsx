import React from 'react';
import { motion } from 'framer-motion';
import { getAsset } from '../lib/assets';
import { navItem } from '../lib/motion';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#staff' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
];

const Footer = () => (
  <footer className="footer" id="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <motion.a
            href="#home"
            className="footer-logo"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={getAsset('/logo.webp')} alt="WOW Salon Logo" className="brand-logo" loading="lazy" decoding="async" />
          </motion.a>
          <p className="footer-desc">Where style meets the future. Experience premium luxury grooming in a cinematic atmosphere.</p>
          <div className="footer-social">
            <motion.a
              href="https://www.instagram.com/wowsaloon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </motion.a>
            <motion.a
              href="https://wa.me/919924404860"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" /><path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
            </motion.a>
          </div>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {footerLinks.map((link) => (
              <motion.li key={link.href} variants={navItem} initial="rest" whileHover="hover">
                <a href={link.href}>{link.label}</a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 WOW SALON. All Rights Reserved.</p>
        <p className="footer-credit">Crafted with ♥ in Dahod</p>
      </div>
    </div>
  </footer>
);

export default Footer;

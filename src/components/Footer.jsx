import React from 'react';
import { getAsset } from '../lib/assets';

const Footer = () => (
  <footer className="footer" id="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <img src={getAsset('/logo.png')} alt="WOW Salon Logo" className="brand-logo" />
          </a>
          <p className="footer-desc">Where style meets the future. Experience premium luxury grooming in a cinematic atmosphere.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/wowsaloon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://wa.me/919924404860" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" /><path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
            </a>
          </div>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#staff">Our Team</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#reviews">Reviews</a></li>
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

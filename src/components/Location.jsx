import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { ease } from '../lib/motion';

const Location = () => (
  <section className="section section-light" id="location">
    <div className="container">
      <SectionHeader
        label="Experience WOW"
        words={['Find', 'Us']}
        highlightWord="Us"
      />
      <Reveal delay={0.15}>
        <motion.div
          className="location-card"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="location-content">
            <div className="location-info-group">
              <h3 className="location-heading">Visit Our Studio</h3>
              <p className="location-desc">Visit our relaxing salon space in Dahod and enjoy premium beauty and grooming services designed to refresh your look and confidence.</p>
              <div className="location-address">
                <MapPin size={22} className="loc-icon" />
                <p>First Floor, WoW Hair and Beauty Salon,<br />Raj Heights On Navjeevan Mill Road,<br />Station Rd, Swastik Society,<br />Shidhpur, Dahod, Gujarat 389151</p>
              </div>
            </div>
            <div className="location-info-divider" />
            <div className="location-details">
              <div className="detail-item">
                <Clock size={20} />
                <div>
                  <strong>Hours</strong>
                  <p>Men: 9:30 AM - 9:30 PM</p>
                  <p>Women: 11:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="detail-item">
                <Phone size={20} />
                <div>
                  <strong>Direct Contact</strong>
                  <p>
                    <a href="tel:9723046502" className="location-link">+91 97230 46502</a><br />
                    <a href="tel:8490903555" className="location-link">+91 84909 03555</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="location-map-wrapper">
            <iframe
              src="https://maps.google.com/maps?q=WoW+Hair+and+Beauty+Salon+Dahod&t=&z=16&ie=UTF8&iwloc=near&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'none' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="WOW Salon Location"
            />
            <motion.a
              href="https://maps.google.com/?q=WoW+Hair+and+Beauty+Salon+Dahod"
              target="_blank"
              rel="noopener noreferrer"
              className="map-overlay-link"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Tap to Open Maps</span>
            </motion.a>
          </div>
        </motion.div>
      </Reveal>
    </div>
  </section>
);

export default Location;

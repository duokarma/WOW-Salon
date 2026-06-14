import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import Reveal from './ui/Reveal';

const Location = () => (
  <section className="section section-light" id="location">
    <div className="container">
      <Reveal className="section-header">
        <span className="section-label">Experience WOW</span>
        <h2 className="section-title">Find Us</h2>
      </Reveal>
      <Reveal delay={0.15} className="location-card">
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
                <p>Mon - Sun: 9:30 AM - 9:30 PM</p>
              </div>
            </div>
            <div className="detail-item">
              <Phone size={20} />
              <div>
                <strong>Direct Contact</strong>
                <p><a href="tel:9924404860" className="location-link">+91 99244 04860</a></p>
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
          <a href="https://maps.google.com/?q=WoW+Hair+and+Beauty+Salon+Dahod" target="_blank" rel="noopener noreferrer" className="map-overlay-link">
            <span>Tap to Open Maps</span>
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Location;

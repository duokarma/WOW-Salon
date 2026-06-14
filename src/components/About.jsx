import React from 'react';
import { getAsset } from '../lib/assets';
import Reveal from './ui/Reveal';
import CounterStat from './ui/CounterStat';

const About = () => (
  <section className="section section-light" id="about">
    <div className="container">
      <div className="about-grid">
        <Reveal direction="left" className="about-image-col">
          <div className="about-image-frame">
            <img src={getAsset('/about_salon.jpeg')} alt="WOW Salon luxury interior" loading="lazy" />
            <div className="image-chrome-border" />
          </div>
          <div className="about-experience-badge">
            <span className="exp-number">15+</span>
            <span className="exp-text">Years of<br />Excellence</span>
          </div>
        </Reveal>

        <Reveal direction="right" className="about-content">
          <span className="section-label">About Us</span>
          <h2 className="section-title">Redefining the Art of <span className="text-gradient">Beauty</span></h2>
          <p className="about-text">
            At WOW SALON, we believe everyone deserves to look and feel their best. Our skilled team provides quality hair, beauty, and grooming services in a comfortable and stylish environment.
          </p>
          <p className="about-text">
            From trendy haircuts and hair colors to bridal makeup, facials, and premium grooming — we make sure every customer leaves feeling confident and refreshed.
          </p>
          <div className="about-stats">
            <CounterStat target={1500} suffix="+" label="Happy Clients" />
            <CounterStat target={9} label="Expert Stylists" />
            <CounterStat target={50} suffix="+" label="Services" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;

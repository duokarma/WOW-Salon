import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAsset } from '../lib/assets';
import Reveal from './ui/Reveal';

const menServices = [
  { img: getAsset('/service_men_1.jpg'), title: 'Premium Haircut', desc: 'Precision cuts tailored to your face shape and style preferences.' },
  { img: getAsset('/service_men_2.jpg'), title: 'Beard Sculpting', desc: 'Expert beard shaping, trimming, and hot towel treatments.' },
  { img: getAsset('/service_men_3.jpg'), title: 'Hair Color', desc: 'Premium coloring with global brands for natural and bold looks.' },
  { img: getAsset('/service_men_1.jpg'), title: 'Hair Spa & Treatment', desc: 'Deep conditioning and scalp therapy for healthy, revitalized hair.' },
  { img: getAsset('/service_men_2.jpg'), title: 'Premium Facial', desc: 'Luxury facial treatments using imported skincare products.' },
];

const womenServices = [
  { img: getAsset('/service_women_1.jpg'), title: 'Hair Styling', desc: 'Expert styling for every occasion, from casual to red carpet.' },
  { img: getAsset('/service_women_2.jpg'), title: 'Bridal Makeup', desc: 'Complete bridal packages with HD makeup and hairstyling.' },
  { img: getAsset('/service_women_3.jpg'), title: 'Color & Highlights', desc: 'Balayage, highlights, global color — premium products only.' },
  { img: getAsset('/service_women_1.jpg'), title: 'Keratin & Smoothening', desc: 'Professional keratin treatments for silky, frizz-free hair.' },
  { img: getAsset('/service_women_2.jpg'), title: 'Skin Treatments', desc: 'Advanced facials, peels, and rejuvenation therapies.' },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('men');
  const carouselRef = useRef(null);
  const services = activeTab === 'men' ? menServices : womenServices;

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section section-light" id="services">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Premium <span className="text-gradient">Services</span></h2>
          <p className="section-desc">Premium services designed for both men and women</p>
        </Reveal>

        <Reveal delay={0.1} className="service-tabs">
          <button className={`tab-btn ${activeTab === 'men' ? 'active' : ''}`} onClick={() => setActiveTab('men')}>Men</button>
          <button className={`tab-btn ${activeTab === 'women' ? 'active' : ''}`} onClick={() => setActiveTab('women')}>Women</button>
          <div className="tab-slider" style={{ transform: activeTab === 'women' ? 'translateX(100%)' : 'translateX(0)' }} />
        </Reveal>

        <div className="carousel-wrapper">
          <button className="carousel-nav carousel-prev" onClick={() => scroll('left')} aria-label="Previous"><ChevronLeft size={20} /></button>
          <div className="services-carousel" ref={carouselRef} key={activeTab}>
            {services.map((s, i) => (
              <Reveal key={`${activeTab}-${i}`} delay={i * 0.08} className="service-card">
                <div className="card-image-wrapper">
                  <img src={s.img} alt={s.title} loading="lazy" />
                  <div className="card-glow" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{s.title}</h3>
                  <p className="card-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <button className="carousel-nav carousel-next" onClick={() => scroll('right')} aria-label="Next"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
};

export default Services;

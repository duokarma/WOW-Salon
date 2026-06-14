import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAsset } from '../lib/assets';
import Reveal from './ui/Reveal';

const staffData = [
  { img: getAsset('/male_staff_1.jpg'), name: 'Arjun Patel', role: 'Master Stylist' },
  { img: getAsset('/male_staff_2.jpg'), name: 'Vikram Shah', role: 'Senior Barber' },
  { img: getAsset('/male_staff_3.jpg'), name: 'Rohan Mehta', role: 'Color Specialist' },
  { img: getAsset('/male_staff_4.jpg'), name: 'Karan Desai', role: 'Creative Director' },
  { img: getAsset('/male_staff_5.jpg'), name: 'Dev Sharma', role: 'Junior Stylist' },
  { img: getAsset('/female_staff_1.jpg'), name: 'Priya Kapoor', role: 'Senior Stylist' },
  { img: getAsset('/female_staff_2.jpg'), name: 'Neha Verma', role: 'Makeup Artist' },
  { img: getAsset('/female_staff_3.jpg'), name: 'Ananya Joshi', role: 'Color Expert' },
  { img: getAsset('/female_staff_4.jpg'), name: 'Riya Singh', role: 'Bridal Specialist' },
];

const Staff = () => {
  const sliderRef = useRef(null);
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.offsetWidth * 0.6;
    sliderRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section section-light" id="staff">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">Meet the Experts</span>
          <h2 className="section-title">Our <span className="text-gradient">Stylists</span></h2>
          <p className="section-desc">Passionate artists dedicated to your transformation</p>
        </Reveal>
      </div>
      <div className="staff-carousel-area">
        <button className="carousel-nav carousel-prev" onClick={() => scroll('left')} aria-label="Previous"><ChevronLeft size={20} /></button>
        <div className="staff-slider" ref={sliderRef}>
          {staffData.map((s, i) => (
            <Reveal key={i} delay={i * 0.06} className="staff-card">
              <div className="staff-image-wrapper">
                <img src={s.img} alt={s.name} loading="lazy" />
                <div className="staff-image-overlay" />
              </div>
              <div className="staff-info">
                <span className="staff-role">{s.role}</span>
                <h4 className="staff-name">{s.name}</h4>
              </div>
            </Reveal>
          ))}
        </div>
        <button className="carousel-nav carousel-next" onClick={() => scroll('right')} aria-label="Next"><ChevronRight size={20} /></button>
      </div>
    </section>
  );
};

export default Staff;

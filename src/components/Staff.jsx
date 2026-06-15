import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAsset } from '../lib/assets';
import SectionHeader from './ui/SectionHeader';
import HoverCard from './ui/HoverCard';
import CarouselNav from './ui/CarouselNav';

const staffData = [
  { img: getAsset('/male_staff_1.webp'), name: 'Arjun Patel', role: 'Master Stylist' },
  { img: getAsset('/male_staff_2.webp'), name: 'Vikram Shah', role: 'Senior Barber' },
  { img: getAsset('/male_staff_3.webp'), name: 'Rohan Mehta', role: 'Color Specialist' },
  { img: getAsset('/male_staff_4.webp'), name: 'Karan Desai', role: 'Creative Director' },
  { img: getAsset('/male_staff_5.webp'), name: 'Dev Sharma', role: 'Junior Stylist' },
  { img: getAsset('/female_staff_1.webp'), name: 'Priya Kapoor', role: 'Senior Stylist' },
  { img: getAsset('/female_staff_2.webp'), name: 'Neha Verma', role: 'Makeup Artist' },
  { img: getAsset('/female_staff_3.webp'), name: 'Ananya Joshi', role: 'Color Expert' },
  { img: getAsset('/female_staff_4.webp'), name: 'Riya Singh', role: 'Bridal Specialist' },
];

const Staff = () => {
  const sliderRef = useRef(null);
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.offsetWidth * 0.6;
    sliderRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section section-light" id="staff" style={{ paddingTop: '20px' }}>
      <div className="container">
        <SectionHeader
          label="Meet the Experts"
          words={['Our', 'Stylists']}
          highlightWord="Stylists"
          description="Passionate artists dedicated to your transformation"
        />
      </div>
      <div className="staff-carousel-area">
        <CarouselNav onClick={() => scroll('left')} ariaLabel="Previous" className="carousel-prev">
          <ChevronLeft size={20} />
        </CarouselNav>
        <div className="staff-slider" ref={sliderRef}>
          {staffData.map((s, i) => (
            <HoverCard key={i} delay={i * 0.05} className="staff-card">
              <div className="staff-image-wrapper">
                <img src={s.img} alt={s.name} loading="lazy" />
                <div className="staff-image-overlay" />
              </div>
              <div className="staff-info">
                <span className="staff-role">{s.role}</span>
                <h4 className="staff-name">{s.name}</h4>
              </div>
            </HoverCard>
          ))}
        </div>
        <CarouselNav onClick={() => scroll('right')} ariaLabel="Next" className="carousel-next">
          <ChevronRight size={20} />
        </CarouselNav>
      </div>
    </section>
  );
};

export default Staff;

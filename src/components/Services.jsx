import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAsset } from '../lib/assets';
import { tabContent } from '../lib/motion';
import SectionHeader from './ui/SectionHeader';
import HoverCard from './ui/HoverCard';
import CarouselNav from './ui/CarouselNav';
import Reveal from './ui/Reveal';

const menServices = [
  { img: getAsset('/service_men_1.webp'), title: 'Premium Haircut', desc: 'Precision cuts tailored to your face shape and style preferences.' },
  { img: getAsset('/service_men_2.webp'), title: 'Beard Sculpting', desc: 'Expert beard shaping, trimming, and hot towel treatments.' },
  { img: getAsset('/service_men_3.webp'), title: 'Hair Color', desc: 'Premium coloring with global brands for natural and bold looks.' }
];

const womenServices = [
  { img: getAsset('/service_women_1.webp'), title: 'Hair Styling', desc: 'Expert styling for every occasion, from casual to red carpet.' },
  { img: getAsset('/service_women_2.webp'), title: 'Bridal Makeup', desc: 'Complete bridal packages with HD makeup and hairstyling.' },
  { img: getAsset('/service_women_3.webp'), title: 'Color & Highlights', desc: 'Balayage, highlights, global color — premium products only.' }
];

const TABS = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('men');
  const carouselRef = useRef(null);
  const services = activeTab === 'men' ? menServices : womenServices;

  useEffect(() => {
    if (carouselRef.current) carouselRef.current.scrollLeft = 0;
  }, [activeTab]);

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section section-light" id="services" style={{ paddingTop: '20px' }}>
      <div className="container">
        <SectionHeader
          label="What We Offer"
          words={['Premium', 'Services']}
          highlightWord="Services"
          description="Premium services designed for both men and women"
        />

        <Reveal delay={0.1} className="service-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="service-tab-pill"
                  className="tab-slider"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className="carousel-wrapper">
          <CarouselNav onClick={() => scroll('left')} ariaLabel="Previous" className="carousel-prev">
            <ChevronLeft size={20} />
          </CarouselNav>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              ref={carouselRef}
              className="services-carousel"
              variants={tabContent}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {services.map((s, i) => (
                <HoverCard key={`${activeTab}-${i}`} delay={i * 0.06} className="service-card group">
                  <div className="card-image-wrapper">
                    <img src={s.img} alt={s.title} loading="lazy" />
                    <div className="card-glow" />
                  </div>
                  <div className="card-content flex flex-col justify-between h-full">
                    <div>
                      <h3 className="card-title">{s.title}</h3>
                      <p className="card-desc">{s.desc}</p>
                    </div>
                    <a href="#cta" className="text-[#2A1E12] text-xs font-semibold uppercase tracking-wider mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Book this service <ChevronRight size={14} />
                    </a>
                  </div>
                </HoverCard>
              ))}
            </motion.div>
          </AnimatePresence>

          <CarouselNav onClick={() => scroll('right')} ariaLabel="Next" className="carousel-next">
            <ChevronRight size={20} />
          </CarouselNav>
        </div>
      </div>
    </section>
  );
};

export default Services;

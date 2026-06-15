import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles, Droplet, Wind, Palette, Crown, UserCheck, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';

const serviceCategories = [
  {
    title: 'Hair Services',
    icon: Scissors,
    services: [
      'Hair Cuts',
      'Shampoo & Conditioning',
      'Deep Conditioning',
      'Head Massage',
      'Hair Styling',
      'Hair Spa (L’Oréal)'
    ]
  },
  {
    title: 'Hair Treatments',
    icon: Droplet,
    services: [
      'Hair Fall Treatment',
      'Anti-Dandruff Treatment',
      'Keratin Treatment'
    ]
  },
  {
    title: 'Hair Colour Services',
    icon: Palette,
    services: [
      'L’Oréal Global Colour',
      'Godrej Root Touch-Up',
      'L’Oréal Highlighting',
      'Ombre Colour',
      'Balayage Colour'
    ]
  },
  {
    title: 'Hair Smoothing Services',
    icon: Wind,
    services: [
      'Smoothing (L’Oréal Xtenso)',
      'Botox Treatment',
      'Keratin Smoothing',
      'Kera Smooth',
      'Botox Smooth'
    ]
  },
  {
    title: 'Beauty Services',
    icon: Sparkles,
    services: [
      'Threading',
      'Waxing',
      'Bleach & D-Tan'
    ]
  },
  {
    title: 'Women Exclusive Services',
    icon: Crown,
    services: [
      'Bridal Makeup',
      '4 Types of Bridal Packages',
      'Clean-Up',
      'Facial',
      'Special Mask Treatment',
      'Lotus Eye Treatment',
      'Face Treatment',
      'Manicure',
      'Pedicure',
      'Nail Polish',
      'Skin Polishing'
    ]
  },
  {
    title: 'Men Exclusive Services',
    icon: UserCheck,
    services: [
      'Groom Services',
      'HD Makeup',
      '3 Types of Groom Packages'
    ]
  }
];

const SwipeHint = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial appearance
    const timer1 = setTimeout(() => setVisible(true), 2000);
    const timer2 = setTimeout(() => setVisible(false), 5000);
    
    // Reappear occasionally
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    }, 15000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FFFDF9]/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(140,118,84,0.15)] text-[#8C7654] text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 z-20 pointer-events-none border border-[#8C7654]/20"
        >
          Swipe to explore more services <ArrowRight size={14} className="animate-pulse" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Services = () => {
  const carouselRef = useRef(null);

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section bg-[#FDFBF7] relative overflow-hidden text-[#2A1E12]" id="services">
      {/* Premium Background Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#E8DCC4]/30 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#D4A853]/10 rounded-full blur-[120px] pointer-events-none translate-y-1/4 -translate-x-1/4"></div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <SectionHeader
            label="Premium Salon Services"
            words={['Luxury', 'Experiences']}
            highlightWord="Luxury"
            description="Tailored luxury experiences for men and women"
            style={{ marginBottom: 0 }}
            className="text-[#1A1A1A] flex flex-col items-center"
          />
        </div>
      </div>

      {/* Services Carousel Area */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto group">
        
        <SwipeHint />

        {/* Desktop Navigation */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFDF9] border border-[#8C7654]/20 items-center justify-center text-[#8C7654] shadow-lg hover:bg-[#8C7654] hover:text-white transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
          aria-label="Previous services"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={carouselRef}
          className="flex overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 sm:px-8 lg:px-24 gap-6 pb-16 pt-8 snap-x snap-proximity hide-scrollbar"
        >
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="premium-service-card snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[360px] relative rounded-2xl bg-[#FFFDF9]/40 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(140,118,84,0.08)] hover:shadow-[0_20px_60px_rgba(140,118,84,0.15)] transition-all duration-500 overflow-hidden flex flex-col group/card"
              >
                {/* Subtle Hover Glow inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-[#F4DFB8]/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-white/70 flex items-center justify-center text-[#8C7654] mb-6 group-hover/card:scale-110 group-hover/card:bg-[#8C7654] group-hover/card:text-white group-hover/card:border-[#8C7654] transition-all duration-500 shadow-sm">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-display text-2xl font-semibold tracking-wide text-[#2A1E12] mb-4">
                    {cat.title}
                  </h3>
                  
                  {/* Premium Accent Line */}
                  <div className="w-12 h-[2px] bg-[#8C7654]/30 mb-6 group-hover/card:w-24 group-hover/card:bg-[#8C7654] transition-all duration-500"></div>
                  
                  <ul className="space-y-3">
                    {cat.services.map((service, idx) => (
                      <li key={idx} className="flex items-start text-[15px] text-[#4A3D2D] leading-relaxed">
                        <span className="mr-3 text-[#8C7654] opacity-60 group-hover/card:opacity-100 transition-opacity">✦</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFDF9] border border-[#8C7654]/20 items-center justify-center text-[#8C7654] shadow-lg hover:bg-[#8C7654] hover:text-white transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
          aria-label="Next services"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Services;

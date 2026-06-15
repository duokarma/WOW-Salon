import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, Clock, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import BeforeAfterSlider from './ui/BeforeAfterSlider';
import { getAsset } from '../lib/assets';

const tabs = ['All', 'Hair', 'Colour', 'Treatments', 'Bridal', 'Grooming'];

const serviceData = [
  {
    id: 'hair-services',
    tab: 'Hair',
    title: 'Hair Services',
    shortDesc: 'Precision cuts and expert styling for an impeccable look.',
    duration: '45 - 90 Min',
    image: getAsset('/gallery_1.webp'),
    before: getAsset('/before_after_1.webp'),
    after: getAsset('/gallery_1.webp'),
    services: ['Hair Cuts', 'Shampoo & Conditioning', 'Deep Conditioning', 'Head Massage', 'Hair Styling', 'Hair Spa (L’Oréal)']
  },
  {
    id: 'hair-colour',
    tab: 'Colour',
    title: 'Hair Colour Services',
    shortDesc: 'Transform your look with premium global colors and balayage techniques.',
    duration: '60 - 180 Min',
    image: getAsset('/gallery_2.webp'),
    before: getAsset('/before_after_3.webp'),
    after: getAsset('/gallery_2.webp'),
    services: ['L’Oréal Global Colour', 'Godrej Root Touch-Up', 'L’Oréal Highlighting', 'Ombre Colour', 'Balayage Colour']
  },
  {
    id: 'hair-treatments',
    tab: 'Treatments',
    title: 'Hair Treatments',
    shortDesc: 'Revitalize your scalp and hair health with nourishing therapies.',
    duration: '45 - 60 Min',
    image: getAsset('/female_1.webp'),
    before: getAsset('/before_after_2.webp'),
    after: getAsset('/female_1.webp'),
    services: ['Hair Fall Treatment', 'Anti-Dandruff Treatment', 'Keratin Treatment']
  },
  {
    id: 'hair-smoothing',
    tab: 'Treatments',
    title: 'Hair Smoothing',
    shortDesc: 'Achieve silky, frizz-free hair with our advanced smoothing and botox treatments.',
    duration: '120 - 240 Min',
    image: getAsset('/gallery_5.webp'),
    before: getAsset('/before_after_4.webp'),
    after: getAsset('/gallery_5.webp'),
    services: ['Smoothing (L’Oréal Xtenso)', 'Botox Treatment', 'Keratin Smoothing', 'Kera Smooth', 'Botox Smooth']
  },
  {
    id: 'bridal',
    tab: 'Bridal',
    title: 'Women Exclusive & Bridal',
    shortDesc: 'Complete bridal makeovers, HD makeup, and exclusive beauty services.',
    duration: '60 - 300 Min',
    image: getAsset('/female_3.webp'),
    before: getAsset('/avatar_3.webp'),
    after: getAsset('/female_3.webp'),
    services: ['Bridal Makeup', '4 Types of Bridal Packages', 'Clean-Up', 'Facial', 'Special Mask Treatment', 'Lotus Eye Treatment', 'Face Treatment', 'Manicure', 'Pedicure', 'Nail Polish', 'Skin Polishing']
  },
  {
    id: 'beauty',
    tab: 'Bridal', // Grouping beauty with bridal for tabs or just 'All'
    title: 'Beauty Services',
    shortDesc: 'Essential beauty services including threading, waxing, and D-Tan.',
    duration: '15 - 45 Min',
    image: getAsset('/gallery_9.webp'),
    before: getAsset('/avatar_2.webp'),
    after: getAsset('/gallery_9.webp'),
    services: ['Threading', 'Waxing', 'Bleach & D-Tan']
  },
  {
    id: 'grooming',
    tab: 'Grooming',
    title: 'Men Exclusive Grooming',
    shortDesc: 'Tailored grooming, beard styling, and HD makeup packages for men.',
    duration: '30 - 120 Min',
    image: getAsset('/male_2.webp'),
    before: getAsset('/avatar.webp'),
    after: getAsset('/male_2.webp'),
    services: ['Groom Services', 'HD Makeup', '3 Types of Groom Packages']
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [spotlightId, setSpotlightId] = useState(null);
  const carouselRef = useRef(null);

  const filteredData = activeTab === 'All' ? serviceData : serviceData.filter(s => s.tab === activeTab);

  // Spotlight Effect
  useEffect(() => {
    if (expandedId) return; // Don't spotlight while a card is open
    const interval = setInterval(() => {
      if (filteredData.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        setSpotlightId(filteredData[randomIndex].id);
        setTimeout(() => setSpotlightId(null), 2500);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [filteredData, expandedId]);

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const amount = carouselRef.current.offsetWidth * 0.75;
    carouselRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section bg-[#FDFBF7] relative overflow-hidden font-body py-24" id="services">
      {/* Background Depth & Ambient Glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-gradient-to-br from-[#E8DCC4]/40 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[#D4A853]/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container relative z-10 mb-12">
        <SectionHeader
          label="Premium Salon Services"
          words={['Interactive', 'Experience']}
          highlightWord="Experience"
          description="Tailored luxury experiences for men and women. Swipe to explore."
          className="text-[#1A1A1A] flex flex-col items-center text-center"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          <LayoutGroup>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setExpandedId(null); }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${activeTab === tab ? 'text-[#FFFDF9]' : 'text-[#8C7654] hover:bg-[#8C7654]/10'}`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#8C7654] to-[#A69068] rounded-full shadow-[0_4px_15px_rgba(140,118,84,0.3)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </LayoutGroup>
        </div>
      </div>

      {/* Cards Carousel */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto group/carousel min-h-[450px]">
        
        {/* Desktop Nav Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur border border-[#8C7654]/20 items-center justify-center text-[#8C7654] shadow-lg hover:bg-[#8C7654] hover:text-white transition-all duration-300 z-20 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/80 backdrop-blur border border-[#8C7654]/20 items-center justify-center text-[#8C7654] shadow-lg hover:bg-[#8C7654] hover:text-white transition-all duration-300 z-20 opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronRight size={28} />
        </button>

        <LayoutGroup>
          <motion.div 
            ref={carouselRef}
            className="flex overflow-x-auto px-4 sm:px-8 lg:px-24 gap-6 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, i) => {
                const isExpanded = expandedId === item.id;
                const isSpotlight = spotlightId === item.id && !expandedId;

                return (
                  <motion.div
                    layoutId={`card-${item.id}`}
                    key={item.id}
                    onClick={() => !isExpanded && setExpandedId(item.id)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`snap-center shrink-0 cursor-pointer overflow-hidden rounded-[2rem] bg-[#FFFDF9] border transition-all duration-700
                      ${isExpanded 
                        ? 'fixed inset-4 md:inset-12 z-50 flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.3)] border-transparent w-auto cursor-default' 
                        : 'relative w-[85vw] sm:w-[320px] md:w-[380px] h-[480px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(140,118,84,0.2)] hover:-translate-y-2 group'
                      }
                      ${isSpotlight ? 'border-[#8C7654] shadow-[0_0_30px_rgba(140,118,84,0.3)] scale-[1.02]' : 'border-[#E8DCC4]'}
                    `}
                  >
                    {!isExpanded ? (
                      // --- COLLAPSED VIEW ---
                      <div className="w-full h-full relative p-8 flex flex-col justify-end">
                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        
                        {/* Gradients & Glows */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent opacity-80"></div>
                        <div className="absolute inset-0 bg-[#8C7654]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
                        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine"></div>

                        <div className="relative z-10 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                          <div className="w-12 h-1px bg-[#8C7654] mb-4 transition-all duration-500 group-hover:w-24"></div>
                          <h3 className="font-display text-3xl font-light text-white mb-2">{item.title}</h3>
                          <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">{item.shortDesc}</p>
                          <div className="mt-6 flex items-center text-[#D4A853] text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            Explore Service <ArrowRight size={14} className="ml-2" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // --- EXPANDED VIEW ---
                      <div className="w-full h-full flex flex-col md:flex-row bg-[#FFFDF9] overflow-y-auto md:overflow-hidden relative">
                        {/* Close Button */}
                        <button 
                          onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 rounded-full bg-black/10 backdrop-blur-md border border-black/10 flex items-center justify-center text-[#2A1E12] hover:bg-black/20 transition-colors"
                        >
                          <X size={24} />
                        </button>

                        {/* Left/Top: Slider */}
                        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative shrink-0">
                          <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} className="rounded-none md:rounded-l-[2rem]" />
                        </div>

                        {/* Right/Bottom: Content */}
                        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <div className="flex items-center gap-3 mb-6">
                              <span className="px-4 py-1.5 rounded-full border border-[#8C7654]/30 text-[#8C7654] text-xs font-semibold uppercase tracking-wider">
                                {item.tab}
                              </span>
                              <span className="flex items-center text-sm text-[#8C7654]/80">
                                <Clock size={14} className="mr-1.5" /> {item.duration}
                              </span>
                            </div>
                            
                            <h2 className="font-display text-4xl md:text-5xl font-light text-[#2A1E12] mb-6 leading-tight">
                              {item.title}
                            </h2>
                            
                            <p className="text-[#4A3D2D] leading-relaxed mb-8 text-lg">
                              {item.shortDesc} Experience the ultimate transformation with our premium products and expert stylists.
                            </p>
                            
                            <h4 className="font-semibold text-sm uppercase tracking-widest text-[#8C7654] mb-4">Included Services</h4>
                            <ul className="space-y-3 mb-10">
                              {item.services.map((service, idx) => (
                                <motion.li 
                                  key={idx} 
                                  initial={{ opacity: 0, x: -10 }} 
                                  animate={{ opacity: 1, x: 0 }} 
                                  transition={{ delay: 0.4 + (idx * 0.05) }}
                                  className="flex items-start text-[#4A3D2D]"
                                >
                                  <span className="mr-3 text-[#D4A853]">✦</span>
                                  {service}
                                </motion.li>
                              ))}
                            </ul>

                            <a 
                              href="https://wa.me/919924404860"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#2A1E12] to-[#1A1A1A] text-white rounded-full font-semibold uppercase tracking-widest text-sm hover:shadow-[0_10px_30px_rgba(42,30,18,0.3)] hover:-translate-y-1 transition-all duration-300"
                            >
                              Book Appointment <ArrowUpRight size={18} className="ml-2" />
                            </a>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
      
      {/* Expanded Overlay Background */}
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
            className="fixed inset-0 bg-[#FFFDF9]/80 backdrop-blur-xl z-40"
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;

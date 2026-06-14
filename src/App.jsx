import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, MapPin, Clock, Phone, Star } from 'lucide-react';
import ReactLenis from 'lenis/react';
import { SilkAurora } from './components/ui/silk-aurora';
import { MagnetLines } from './components/ui/magnet-lines';
import Hero from './components/Hero';
import './app.css';

/* ─── Scroll-reveal wrapper ─── */
const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const dirs = { up: { y: 48 }, down: { y: -48 }, left: { x: -48 }, right: { x: 48 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Counter animation hook ─── */
const useCounter = (target, isInView, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.ceil(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
};

const CounterStat = ({ target, suffix = '', label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(target, isInView);
  return (
    <div ref={ref} className="stat-item">
      <span className="stat-number">{count}</span>
      <span className="stat-plus">{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

/* ═══════════════════════════════════════════════ */
/*  ABOUT                                          */
/* ═══════════════════════════════════════════════ */
const About = () => (
  <section className="section section-light" id="about">
    <div className="container">
      <div className="about-grid">
        <Reveal direction="left" className="about-image-col">
          <div className="about-image-frame">
            <img src="/about_salon.jpeg" alt="WOW Salon luxury interior" loading="lazy" />
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

/* ═══════════════════════════════════════════════ */
/*  SERVICES                                       */
/* ═══════════════════════════════════════════════ */
const menServices = [
  { img: '/service_men_1.jpg', title: 'Premium Haircut', desc: 'Precision cuts tailored to your face shape and style preferences.' },
  { img: '/service_men_2.jpg', title: 'Beard Sculpting', desc: 'Expert beard shaping, trimming, and hot towel treatments.' },
  { img: '/service_men_3.jpg', title: 'Hair Color', desc: 'Premium coloring with global brands for natural and bold looks.' },
  { img: '/service_men_1.jpg', title: 'Hair Spa & Treatment', desc: 'Deep conditioning and scalp therapy for healthy, revitalized hair.' },
  { img: '/service_men_2.jpg', title: 'Premium Facial', desc: 'Luxury facial treatments using imported skincare products.' },
];
const womenServices = [
  { img: '/service_women_1.jpg', title: 'Hair Styling', desc: 'Expert styling for every occasion, from casual to red carpet.' },
  { img: '/service_women_2.jpg', title: 'Bridal Makeup', desc: 'Complete bridal packages with HD makeup and hairstyling.' },
  { img: '/service_women_3.jpg', title: 'Color & Highlights', desc: 'Balayage, highlights, global color — premium products only.' },
  { img: '/service_women_1.jpg', title: 'Keratin & Smoothening', desc: 'Professional keratin treatments for silky, frizz-free hair.' },
  { img: '/service_women_2.jpg', title: 'Skin Treatments', desc: 'Advanced facials, peels, and rejuvenation therapies.' },
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

/* ═══════════════════════════════════════════════ */
/*  STAFF                                          */
/* ═══════════════════════════════════════════════ */
const staffData = [
  { img: '/male_staff_1.jpg', name: 'Arjun Patel', role: 'Master Stylist' },
  { img: '/male_staff_2.jpg', name: 'Vikram Shah', role: 'Senior Barber' },
  { img: '/male_staff_3.jpg', name: 'Rohan Mehta', role: 'Color Specialist' },
  { img: '/male_staff_4.jpg', name: 'Karan Desai', role: 'Creative Director' },
  { img: '/male_staff_5.jpg', name: 'Dev Sharma', role: 'Junior Stylist' },
  { img: '/female_staff_1.jpg', name: 'Priya Kapoor', role: 'Senior Stylist' },
  { img: '/female_staff_2.jpg', name: 'Neha Verma', role: 'Makeup Artist' },
  { img: '/female_staff_3.jpg', name: 'Ananya Joshi', role: 'Color Expert' },
  { img: '/female_staff_4.jpg', name: 'Riya Singh', role: 'Bridal Specialist' },
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

/* ═══════════════════════════════════════════════ */
/*  GALLERY (Sticky Stack)                         */
/* ═══════════════════════════════════════════════ */
const galleryItems = [
  { caption: 'Premium Styling', img: '/gallery_1.jpeg' },
  { caption: 'Expert Cuts', img: '/gallery_2.jpeg' },
  { caption: "Men's Grooming", img: '/gallery_3.jpeg' },
  { caption: 'Color Transformation', img: '/gallery_4.jpeg' },
  { caption: 'Bridal Beauty', img: '/gallery_5.jpeg' },
  { caption: 'Modern Styles', img: '/gallery_6.jpeg' },
];

const StickyCard_001 = ({ i, caption, img, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 35 + 150}px)`,
        }}
        className="relative -top-1/4 flex h-[350px] w-[90vw] sm:h-[450px] sm:w-[80vw] md:w-[600px] lg:w-[700px] origin-top flex-col overflow-hidden rounded-none border border-white/10 bg-black shadow-none"
      >
        <img src={img} alt={caption} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
          <span className="font-['Outfit'] text-xl md:text-2xl font-semibold tracking-wider text-white drop-shadow-lg">{caption}</span>
        </div>
      </motion.div>
    </div>
  );
};

const Gallery = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <section className="section section-light" id="gallery" style={{ paddingBottom: 0 }}>
        <div className="container relative z-10 mb-8">
          <Reveal className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-label">Our Work</span>
            <h2 className="section-title">Showcase <span className="text-gradient">Gallery</span></h2>
            <p className="section-desc">Scroll down to see our curated portfolio</p>
          </Reveal>
        </div>
        <main
          ref={container}
          className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[10vh]"
        >
          {galleryItems.map((item, i) => {
            const targetScale = Math.max(0.7, 1 - (galleryItems.length - i - 1) * 0.05);
            return (
              <StickyCard_001
                key={`gallery_item_${i}`}
                i={i}
                {...item}
                progress={scrollYProgress}
                range={[i * (1 / galleryItems.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </main>
      </section>
    </ReactLenis>
  );
};

/* ═══════════════════════════════════════════════ */
/*  BEFORE & AFTER                                 */
/* ═══════════════════════════════════════════════ */
const BeforeAfterSlider = ({ beforeImg, afterImg }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e) => { isDragging.current = true; updatePosition(e.clientX); };
  const onPointerMove = (e) => { if (isDragging.current) updatePosition(e.clientX); };
  const onPointerUp = () => { isDragging.current = false; };

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div className="ba-slider-container" ref={containerRef} onPointerDown={onPointerDown}>
      <div className="ba-image ba-after">
        <img src={afterImg} alt="After" loading="lazy" />
        <span className="ba-label ba-label-after">After</span>
      </div>
      <div className="ba-image ba-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeImg} alt="Before" loading="lazy" />
        <span className="ba-label ba-label-before">Before</span>
      </div>
      <div className="ba-handle" style={{ left: `${position}%` }}>
        <div className="ba-handle-line" />
        <div className="ba-handle-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 8l4 4-4 4M6 8l-4 4 4 4" /></svg>
        </div>
        <div className="ba-handle-line" />
      </div>
    </div>
  );
};

const BeforeAfter = () => (
  <section className="section section-light" id="before-after">
    <div className="container">
      <Reveal className="section-header">
        <span className="section-label">Transformations</span>
        <h2 className="section-title">Before & <span className="text-gradient">After</span></h2>
        <p className="section-desc">Witness the magic of our transformations</p>
      </Reveal>
      <div className="ba-grid">
        <Reveal delay={0.1} className="ba-comparison">
          <BeforeAfterSlider beforeImg="/before_after_1.jpg" afterImg="/before_after_1.jpg" />
        </Reveal>
        <Reveal delay={0.2} className="ba-comparison">
          <BeforeAfterSlider beforeImg="/before_after_2.jpg" afterImg="/before_after_2.jpg" />
        </Reveal>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════ */
/*  REVIEWS                                        */
/* ═══════════════════════════════════════════════ */
const reviewsData = [
  { text: "Absolutely the best salon experience I've ever had! The attention to detail and the premium atmosphere is unmatched. My hair has never looked this good.", author: 'Rahul M.', date: '2 weeks ago', stars: 5 },
  { text: "Got my bridal makeup done here and it was absolutely stunning. The team is so professional and talented. Every detail was perfect for my big day!", author: 'Sneha P.', date: '1 month ago', stars: 5 },
  { text: "The hair color transformation was incredible! They understood exactly what I wanted. The salon ambiance is luxurious and the staff is extremely friendly.", author: 'Ankit D.', date: '3 weeks ago', stars: 5 },
  { text: "Best beard grooming in the city! They take their time to get every detail right. The hot towel treatment is amazing. Highly recommend for men!", author: 'Kiran V.', date: '1 week ago', stars: 4.5 },
  { text: "My go-to salon for everything! From haircuts to facials, they excel at everything. The keratin treatment they did lasted for months. Love WOW Salon!", author: 'Meera S.', date: '2 months ago', stars: 5 },
  { text: "First time visiting and I'm already a regular! The premium experience is worth every penny. Clean, hygienic, and the results speak for themselves.", author: 'Dhruv R.', date: '5 days ago', stars: 5 },
];

const Reviews = () => (
  <section className="section section-light" id="reviews">
    <div className="container">
      <Reveal className="section-header">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">Client <span className="text-gradient">Reviews</span></h2>
        <p className="section-desc">What our valued clients say about us</p>
      </Reveal>
      <div className="reviews-grid">
        {reviewsData.map((r, i) => (
          <Reveal key={i} delay={i * 0.08} className="review-card">
            <div className="review-stars">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} fill={j < Math.floor(r.stars) ? '#d4a853' : 'none'} stroke="#d4a853" />
              ))}
            </div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-author">
              <div className="author-avatar">{r.author[0]}</div>
              <div className="author-info">
                <span className="author-name">{r.author}</span>
                <span className="author-date">{r.date}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════ */
/*  LOCATION                                       */
/* ═══════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════ */
/*  CTA                                            */
/* ═══════════════════════════════════════════════ */
const CTA = () => (
  <section className="section section-dark relative flex items-center justify-center min-h-[40vh] overflow-hidden" style={{ background: '#000000', padding: '8rem 0' }}>
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 pointer-events-none">
       <MagnetLines
         rows={12}
         columns={30}
         containerSize="100%"
         lineColor="#222222"
         lineWidth="1.5px"
         lineHeight="2vmin"
       />
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center gap-8 text-center" style={{ pointerEvents: 'none' }}>
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-[0.12em] text-white uppercase leading-[1.1]">
        READY TO TRANSFORM?
      </h2>
      <a href="https://wa.me/919924404860" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ pointerEvents: 'auto' }}>
        BOOK YOUR APPOINTMENT <ArrowUpRight size={20} className="inline-block ml-2" />
      </a>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════ */
/*  FOOTER                                         */
/* ═══════════════════════════════════════════════ */
const Footer = () => (
  <footer className="footer" id="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <img src="/logo.png" alt="WOW Salon Logo" className="brand-logo" />
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

/* ═══════════════════════════════════════════════ */
/*  LOADER                                         */
/* ═══════════════════════════════════════════════ */
const Loader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="premium-loader"
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-content">
        <div className="loader-scissors-wrapper">
          <svg className="loader-scissors" viewBox="0 0 24 24" fill="none">
            <path d="M7.4 8.7C8.50457 8.7 9.4 7.80457 9.4 6.7C9.4 5.59543 8.50457 4.7 7.4 4.7C6.29543 4.7 5.4 5.59543 5.4 6.7C5.4 7.80457 6.29543 8.7 7.4 8.7Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.6 8.7C17.7046 8.7 18.6 7.80457 18.6 6.7C18.6 5.59543 17.7046 4.7 16.6 4.7C15.4954 4.7 14.6 5.59543 14.6 6.7C14.6 7.80457 15.4954 8.7 16.6 8.7Z" stroke="currentColor" strokeWidth="1.5" />
            <path className="scissors-blade scissors-left" d="M8.8 8.1L20 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path className="scissors-blade scissors-right" d="M15.2 8.1L4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="11.5" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="loader-line-wrapper">
          <div className="loader-line-cut" />
        </div>
        <div className="loader-logo">WOW SALON</div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════ */
/*  NAVBAR (sticky, appears after scroll)          */
/* ═══════════════════════════════════════════════ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Staff', href: '#staff' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <img src="/logo.png" alt="WOW Salon Logo" className="brand-logo" />
          </a>
          <ul className="nav-menu">
            {links.map(l => (
              <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
            ))}
          </ul>
          <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-overlay-top">
              <a href="#home" className="nav-logo" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="WOW Salon Logo" className="brand-logo" />
              </a>
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <ul className="mobile-nav-links">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <a href={l.href} className="mobile-link" onClick={() => setMobileOpen(false)}>{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="https://wa.me/919924404860"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Book Now <ArrowUpRight size={20} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══════════════════════════════════════════════ */
/*  APP                                            */
/* ═══════════════════════════════════════════════ */
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <SilkAurora
            baseColor="#000000"
            midColor="#0a0a0f"
            sheenColor="#2a1e12"
            accentColor="#0c1f13"
            grain={0.9}
            speed={0.5}
            intensity={0.6}
            className="w-full flex flex-col"
          >
            <Hero />
            <About />
            <Services />
            <Staff />
            <Gallery />
            <BeforeAfter />
            <Reviews />
            <Location />
            <CTA />
            <Footer />
          </SilkAurora>
        </>
      )}
    </>
  );
}

export default App;

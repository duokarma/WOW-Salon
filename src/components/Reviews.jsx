import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import StarRating from './ui/StarRating';

const reviewsData = [
  { text: "Absolutely the best salon experience I've ever had! The attention to detail and the premium atmosphere is unmatched. My hair has never looked this good.", author: 'Rahul M.', date: '2 weeks ago', stars: 5 },
  { text: "Got my bridal makeup done here and it was absolutely stunning. The team is so professional and talented. Every detail was perfect for my big day!", author: 'Sneha P.', date: '1 month ago', stars: 5 },
  { text: "The hair color transformation was incredible! They understood exactly what I wanted. The salon ambiance is luxurious and the staff is extremely friendly.", author: 'Ankit D.', date: '3 weeks ago', stars: 5 },
  { text: "Best beard grooming in the city! They take their time to get every detail right. The hot towel treatment is amazing. Highly recommend for men!", author: 'Kiran V.', date: '1 week ago', stars: 4.5 },
  { text: "My go-to salon for everything! From haircuts to facials, they excel at everything. The keratin treatment they did lasted for months. Love WOW Salon!", author: 'Meera S.', date: '2 months ago', stars: 5 },
  { text: "First time visiting and I'm already a regular! The premium experience is worth every penny. Clean, hygienic, and the results speak for themselves.", author: 'Dhruv R.', date: '5 days ago', stars: 5 },
];

const Reviews = () => {
  const sliderRef = useRef(null);
  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.offsetWidth * 0.75;
    sliderRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section section-light" id="reviews">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Client <span className="text-gradient">Reviews</span></h2>
          <p className="section-desc">What our valued clients say about us</p>
        </Reveal>
      </div>
      <div className="reviews-carousel-area">
        <button className="carousel-nav carousel-prev" onClick={() => scroll('left')} aria-label="Previous"><ChevronLeft size={20} /></button>
        <Reveal className="reviews-slider-wrapper">
          <div className="reviews-slider" ref={sliderRef}>
            {reviewsData.map((r, i) => (
              <div key={i} className="review-card">
                <StarRating stars={r.stars} />
                <p className="review-text">"{r.text}"</p>
                <div className="review-author" style={{ marginTop: 'auto' }}>
                  <div className="author-avatar">{r.author[0]}</div>
                  <div className="author-info">
                    <span className="author-name">{r.author}</span>
                    <span className="author-date">{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <button className="carousel-nav carousel-next" onClick={() => scroll('right')} aria-label="Next"><ChevronRight size={20} /></button>
      </div>
    </section>
  );
};

export default Reviews;

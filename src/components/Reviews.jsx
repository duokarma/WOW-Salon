import React from 'react';
import StarRating from './ui/StarRating';

const row1 = [
  { text: "Best salon experience in Dahod. Staff was very professional and friendly.", author: "Neha S.", service: "Haircut & Styling" },
  { text: "Hair smoothing result was amazing. Loved the ambience and service.", author: "Rahul M.", service: "Hair Smoothing" },
  { text: "Clean interior, premium products, and excellent hairstylists.", author: "Aarti P.", service: "General Grooming" },
  { text: "Perfect place for hair color and bridal makeover.", author: "Sneha D.", service: "Bridal Makeover" },
  { text: "Very modern salon with great hospitality.", author: "Kiran V.", service: "Spa & Facial" },
];

const row2 = [
  { text: "My go-to salon for everything! From haircuts to facials, they excel at everything.", author: "Meera S.", service: "Full Package" },
  { text: "The hair color transformation was incredible! They understood exactly what I wanted.", author: "Ankit D.", service: "Hair Color" },
  { text: "Absolutely the best salon experience I've ever had! The attention to detail is unmatched.", author: "Priya R.", service: "Premium Styling" },
  { text: "Best beard grooming in the city! They take their time to get every detail right.", author: "Vikram J.", service: "Beard Grooming" },
  { text: "First time visiting and I'm already a regular! The premium experience is worth every penny.", author: "Dhruv R.", service: "Premium Cut" },
];

const ReviewCard = ({ text, author, service }) => (
  <div className="flex flex-col justify-between w-[280px] sm:w-[380px] h-[200px] sm:h-[240px] p-6 sm:p-8 mx-3 sm:mx-4 rounded-3xl bg-[#3B302B]/40 backdrop-blur-xl border border-[#F4DFB8]/15 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:bg-[#3B302B]/60 hover:border-[#F4DFB8]/40 hover:shadow-[0_0_40px_rgba(244,223,184,0.15)] group relative overflow-hidden shrink-0 cursor-pointer">
    {/* Soft inner glow on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#F4DFB8]/10 to-transparent pointer-events-none" />
    
    {/* Star Rating */}
    <div className="flex gap-1.5 mb-4">
      <StarRating stars={5} size={20} />
    </div>
    
    <p className="text-[#F9F6F0] text-[0.95rem] sm:text-[1.1rem] leading-relaxed font-light italic flex-grow group-hover:text-white transition-colors duration-300">
      "{text}"
    </p>
    
    <div className="flex items-center gap-4 mt-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#F4DFB8] to-[#8B7355] flex items-center justify-center text-[#2A1E12] font-semibold text-lg sm:text-xl shadow-inner relative overflow-hidden">
        {/* Subtle shine on avatar */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
        {author[0]}
      </div>
      <div>
        <div className="text-[#F9F6F0] font-medium text-sm sm:text-base tracking-wide">{author}</div>
        {service && <div className="text-[#F4DFB8]/70 text-[0.65rem] sm:text-xs uppercase tracking-widest mt-1">{service}</div>}
      </div>
    </div>
  </div>
);

const Reviews = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#2A1E12] overflow-hidden" id="reviews">
      {/* Background cinematic blurs */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-[#F4DFB8]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-[#8B7355]/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Liquid UI Glassmorphism Background Overlay */}
      <div className="absolute inset-0 liquid-glass pointer-events-none z-0 opacity-80" />

      {/* Smooth fade gradients on left/right edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-40 bg-gradient-to-r from-[#2A1E12] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-40 bg-gradient-to-l from-[#2A1E12] to-transparent z-10 pointer-events-none" />

      <div className="container relative z-20 mb-16 sm:mb-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-light tracking-wide text-[#F9F6F0] mb-4">
            Client <span className="font-semibold text-[#F4DFB8] italic">Experiences</span>
          </h2>
          <p className="text-[#F9F6F0]/70 text-sm sm:text-base tracking-widest uppercase">
            The standard of premium luxury
          </p>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 sm:gap-8 marquee-container">
        {/* Row 1: Moves Left */}
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
          .animate-marquee-left {
            animation: marquee-left 45s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 55s linear infinite;
          }
          /* Pause on mobile touch holding */
          @media (hover: none) {
            .marquee-container:active .animate-marquee-left,
            .marquee-container:active .animate-marquee-right {
              animation-play-state: paused;
            }
          }
        `
      }} />
    </section>
  );
};

export default Reviews;

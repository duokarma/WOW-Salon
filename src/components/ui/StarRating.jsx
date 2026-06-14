import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ stars, size = 16 }) => (
  <div className="review-stars">
    {[...Array(5)].map((_, j) => {
      const fillAmount = Math.min(1, Math.max(0, stars - j));
      return (
        <span key={j} className="relative inline-block" style={{ width: size, height: size }}>
          <Star size={size} fill="none" stroke="#d4a853" className="absolute inset-0" />
          {fillAmount > 0 && (
            <Star
              size={size}
              fill="#d4a853"
              stroke="#d4a853"
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${(1 - fillAmount) * 100}% 0 0)` }}
            />
          )}
        </span>
      );
    })}
  </div>
);

export default StarRating;

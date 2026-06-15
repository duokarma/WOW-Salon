import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

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
      <div className="flex items-baseline justify-start md:justify-center">
        <span className="stat-number">{count}</span>
        {suffix && <span className="stat-plus ml-1">{suffix}</span>}
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
};

export default CounterStat;

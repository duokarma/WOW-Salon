"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

export default function TouchInteraction() {
  const [ripples, setRipples] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Smoothly follow the active touch
  const glowX = useSpring(-100, { stiffness: 500, damping: 40 });
  const glowY = useSpring(-100, { stiffness: 500, damping: 40 });
  const glowOpacity = useSpring(0, { stiffness: 300, damping: 30 });
  
  const throttleRef = useRef(0);

  useEffect(() => {
    const checkTouch = () => {
      // Safely detect touch capability
      const hasTouch = (typeof window !== 'undefined' && 'ontouchstart' in window) || 
                       (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
                       (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    // Instantly snap to start location
    glowX.set(touch.clientX);
    glowY.set(touch.clientY);
    glowOpacity.set(1);

    // Spawn a large luxury ripple on tap
    const newRipple = {
      id: Date.now() + Math.random(),
      x: touch.clientX,
      y: touch.clientY,
      isMini: false
    };
    
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  }, [glowX, glowY, glowOpacity]);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    // Smoothly follow the finger during swipe/drag
    glowX.set(touch.clientX);
    glowY.set(touch.clientY);
    
    // Spawn subtle trailing mini-ripples while dragging (throttled for high performance)
    const now = Date.now();
    if (now - throttleRef.current > 150) {
      throttleRef.current = now;
      const newRipple = {
        id: now + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
        isMini: true
      };
      // Keep array small to prevent lag
      setRipples((prev) => {
        const next = [...prev, newRipple];
        return next.length > 6 ? next.slice(next.length - 6) : next;
      });
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }
  }, [glowX, glowY]);

  const handleTouchEnd = useCallback(() => {
    // Fade out smoothly when finger lifts
    glowOpacity.set(0);
  }, [glowOpacity]);

  useEffect(() => {
    if (!isTouchDevice) return;

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isTouchDevice, handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Active dragging glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "100px",
          height: "100px",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: glowOpacity,
          background: "radial-gradient(circle, rgba(244, 223, 184, 0.12) 0%, rgba(244, 223, 184, 0) 70%)",
          willChange: "transform, opacity"
        }}
      />
      
      {/* Expanding ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ 
              opacity: ripple.isMini ? 0.3 : 0.6, 
              scale: 0.2, 
              x: ripple.x, 
              y: ripple.y,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{ 
              opacity: 0, 
              scale: ripple.isMini ? 1.5 : 2.5 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: ripple.isMini ? 0.6 : 0.8, 
              ease: "easeOut" 
            }}
            className="absolute rounded-full border border-[rgba(244,223,184,0.4)]"
            style={{
              width: "60px",
              height: "60px",
              background: "radial-gradient(circle, rgba(244, 223, 184, 0.15) 0%, rgba(244, 223, 184, 0) 70%)",
              willChange: "transform, opacity"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

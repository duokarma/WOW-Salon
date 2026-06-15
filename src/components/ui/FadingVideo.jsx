import React, { useRef, useEffect } from 'react';

export default function FadingVideo({ src, className, style }) {
  const videoRef = useRef(null);
  const fadeRafRef = useRef(null);
  const fadingOutRef = useRef(false);

  const FADE_MS = 500;
  const FADE_OUT_LEAD = 0.55;

  const fadeTo = (targetOpacity, durationMs) => {
    if (!videoRef.current) return;
    
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
    }

    const startOpacity = parseFloat(videoRef.current.style.opacity || '0');
    const startTime = performance.now();

    const animate = (currentTime) => {
      if (!videoRef.current) return;
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      videoRef.current.style.opacity = currentOpacity;

      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(animate);
      }
    };

    fadeRafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      
      if (!fadingOutRef.current && timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}

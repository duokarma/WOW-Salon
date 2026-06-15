import React, { useRef, useEffect } from 'react';

export default function FadingVideo({ src, className, style }) {
  const videoRef = useRef(null);
  const fadingOutRef = useRef(false);

  const FADE_OUT_LEAD = 0.55;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use hardware-accelerated CSS transitions instead of JS requestAnimationFrame loops
    video.style.transition = 'opacity 500ms ease';
    video.style.willChange = 'opacity';
    video.style.opacity = '0';

    const handleLoadedData = () => {
      video.play().catch(() => {});
      video.style.opacity = '1';
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      
      if (!fadingOutRef.current && timeLeft <= FADE_OUT_LEAD && timeLeft > 0) {
        fadingOutRef.current = true;
        video.style.opacity = '0';
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        video.style.opacity = '1';
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
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

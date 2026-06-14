import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveHorizontal, Eye } from "lucide-react";

const DefaultCursorSVG = ({ invertColors }) => {
  const innerColor = invertColors ? "white" : "black";
  const outerColor = invertColors ? "black" : "white";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 50 54" fill="none">
      <g filter="url(#filter0_d_91_7928)">
        <path d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z" fill={innerColor}/>
        <path d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z" stroke={outerColor} strokeWidth={2.25825}/>
      </g>
      <defs>
        <filter id="filter0_d_91_7928" x={0.602397} y={0.952444} width={49.0584} height={52.428} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy={2.25825}/>
          <feGaussianBlur stdDeviation={2.25825}/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_91_7928"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_91_7928" result="shape"/>
        </filter>
      </defs>
    </svg>
  );
};

export default function SmoothCursor({
  cursorSize = 40,
  hideSystemCursor = true,
  enableBlendMode = false,
  invertIconColors = true,
  enableClickEffect = true,
  cursorImage,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [cursorState, setCursorState] = useState("default"); // 'default', 'drag', 'view'

  const cursorRef = useRef(null);
  
  // Track raw mouse position
  const mouse = useRef({ x: -100, y: -100 });
  // Track current visual position (lerped)
  const current = useRef({ x: -100, y: -100 });
  
  const rotation = useRef(0);
  const previousAngle = useRef(0);
  const scale = useRef(1);
  const isMouseDown = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkDeviceConstraints = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsVisible(hasFinePointer);
    };
    checkDeviceConstraints();
    window.addEventListener("resize", checkDeviceConstraints);
    return () => window.removeEventListener("resize", checkDeviceConstraints);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isVisible) {
      document.body.style.cursor = "auto";
      return;
    }

    if (hideSystemCursor) {
      document.body.style.cursor = "none";
    }

    let animationFrameId;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseDown = () => {
      isMouseDown.current = true;
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState(target.getAttribute('data-cursor'));
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    // High performance render loop completely bypassing React
    const render = () => {
      // Very fast lerp (0.35) for almost 0ms latency but smooth enough to prevent stutter
      current.current.x += (mouse.current.x - current.current.x) * 0.35;
      current.current.y += (mouse.current.y - current.current.y) * 0.35;

      const deltaX = mouse.current.x - current.current.x;
      const deltaY = mouse.current.y - current.current.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (speed > 1) {
        const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        rotation.current += angleDiff;
        previousAngle.current = currentAngle;
      }

      // Smooth scale interpolation
      const targetScale = isMouseDown.current && enableClickEffect ? 0.7 : 1;
      scale.current += (targetScale - scale.current) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${rotation.current}deg) scale(${scale.current})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "auto";
    };
  }, [isVisible, hideSystemCursor, enableClickEffect]);

  if (!isVisible) return null;

  return (
    <>
      {hideSystemCursor && (
        <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />
      )}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999999,
          pointerEvents: "none",
          willChange: "transform",
          mixBlendMode: enableBlendMode ? "difference" : "normal",
          width: cursorSize,
          height: cursorSize,
          marginLeft: -cursorSize / 2,
          marginTop: -cursorSize / 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <AnimatePresence mode="wait">
          {cursorState === 'drag' ? (
            <motion.div
              key="drag"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-[#2A1E12] text-[#F4DFB8] rounded-full p-3 flex items-center justify-center shadow-lg"
              style={{ width: 80, height: 80 }}
            >
              <MoveHorizontal size={24} />
            </motion.div>
          ) : cursorState === 'view' ? (
            <motion.div
              key="view"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-[#F4DFB8] text-[#2A1E12] rounded-full p-3 flex items-center justify-center shadow-lg"
              style={{ width: 60, height: 60 }}
            >
              <Eye size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ width: "100%", height: "100%" }}
            >
              {cursorImage ? (
                <img src={cursorImage} alt="Custom Cursor" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <DefaultCursorSVG invertColors={invertIconColors} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over a button, link, or elements with specific classes
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.heavy-btn') ||
        target.closest('.glass-panel')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'transparent',
      border: '2px solid rgba(236, 72, 153, 0.5)', // Pink border
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 1.5,
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      border: '2px solid rgba(236, 72, 153, 0.8)',
      backdropFilter: 'blur(4px)', // Magnifying glass effect
    }
  };

  return (
    <>
      {/* GLOBAL STYLE: Yeh code default cursor ko website ke har hissay se chupa dega */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer Magnifying Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
        {/* Inner Dot */}
        <div className={`w-1 h-1 rounded-full bg-pink-500 transition-all duration-300 ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
      </motion.div>
    </>
  );
}
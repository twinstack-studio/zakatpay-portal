import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  direction = 'up',
  duration = 0.8
}) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // custom ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

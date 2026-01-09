'use client';

import { motion } from 'framer-motion';

export function SpeedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-white/20"
          style={{
            left: `${i * 5}%`,
            width: '2px',
            top: 0,
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}


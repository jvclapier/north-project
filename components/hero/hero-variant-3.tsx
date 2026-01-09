'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface HeroVariant3Props {
  config: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl?: string;
  };
}

export function HeroVariant3({ config }: HeroVariant3Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Background Image */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: 1.1,
          x: (mousePosition.x - 50) * 0.02,
          y: (mousePosition.y - 50) * 0.02,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <Image
          src={config.imageUrl || "/NP_Nov25_BW_-153.jpg"}
          alt="Cycling team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </motion.div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.15,
        }}
      />

      {/* Content - Right Aligned */}
      <div className="relative z-20 h-full flex items-center justify-end px-4 sm:px-8 lg:px-16">
        <motion.div
          className="max-w-lg text-right"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* Full Wordmark */}
          <motion.div
            className="mb-8 flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/NRTHPROJ_FULL_WORDMARK_FULL_02_TRANSPARENT.png"
              alt="North Project"
              width={600}
              height={150}
              className="w-auto h-12 sm:h-16 md:h-20"
              priority
            />
          </motion.div>

          {/* Coming Soon with Line */}
          <motion.div
            className="mb-6 flex items-center justify-end gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-px bg-white flex-1 max-w-32" />
            <span 
              className="text-white/60 text-xs uppercase tracking-widest whitespace-nowrap"
              style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            >
              COMING SOON
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {config.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.button
            className="bg-white text-black px-8 py-3 uppercase tracking-wider font-medium border-2 border-white"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {config.ctaText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


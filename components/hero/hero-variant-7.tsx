'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroVariant7Props {
  config: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl?: string;
    imageUrlBw?: string;
    imageUrlColor?: string;
  };
}

const SLICE_COUNT = 12;

export function HeroVariant7({ config }: HeroVariant7Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeSlice, setActiveSlice] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const bwImage = config.imageUrlBw || "/NP_Nov25_BW_-154.jpg";
  const colorImage = config.imageUrlColor || "/NP_Nov25_-154.jpg";

  // Auto-reveal sequence on load
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section 
      ref={ref} 
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black"
    >
      {/* Vertical Slices - Venetian Blind Effect */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: SLICE_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="relative flex-1 overflow-hidden cursor-pointer"
            style={{ 
              borderRight: i < SLICE_COUNT - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={isInView ? { 
              rotateY: 0, 
              opacity: 1,
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.08,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            onMouseEnter={() => setActiveSlice(i)}
            onMouseLeave={() => setActiveSlice(null)}
          >
            {/* B&W Layer */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${bwImage})`,
                backgroundSize: `${SLICE_COUNT * 100}% 100%`,
                backgroundPosition: `${(i / (SLICE_COUNT - 1)) * 100}% center`,
                filter: 'grayscale(100%)',
              }}
            />
            
            {/* Color Layer - Reveals on hover or after delay */}
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${colorImage})`,
                backgroundSize: `${SLICE_COUNT * 100}% 100%`,
                backgroundPosition: `${(i / (SLICE_COUNT - 1)) * 100}% center`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: activeSlice === i || isRevealed ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Slice Overlay on Hover */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSlice === i ? 0.1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

      {/* Animated Horizontal Lines */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-white/20"
            style={{ top: `${12.5 * (i + 1)}%` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: [0.6, -0.05, 0.01, 0.99] }}
          />
        ))}
      </div>

      {/* Large Background Typography */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <span 
          className="text-white text-[30vw] font-medium uppercase tracking-tighter whitespace-nowrap"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          NORTH
        </span>
      </motion.div>

      {/* Content - Left Side */}
      <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-8 lg:px-16">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* Wordmark */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Image
              src="/NRTHPROJ_FULL_WORDMARK_FULL_02_TRANSPARENT.png"
              alt="North Project"
              width={700}
              height={175}
              className="w-auto h-16 sm:h-20 md:h-24"
              priority
            />
          </motion.div>

          {/* Animated Counter/Stats */}
          <motion.div
            className="flex gap-8 mb-8 border-l-2 border-white pl-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div>
              <motion.span
                className="block text-4xl sm:text-5xl font-medium text-white"
                style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                2025
              </motion.span>
              <span 
                className="text-xs uppercase tracking-widest text-white/60"
                style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
              >
                Season
              </span>
            </div>
            <div>
              <motion.span
                className="block text-4xl sm:text-5xl font-medium text-white"
                style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                UT
              </motion.span>
              <span 
                className="text-xs uppercase tracking-widest text-white/60"
                style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
              >
                Location
              </span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed uppercase tracking-wider max-w-md"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            {config.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.a
            href="/group-ride-waiver"
            className="inline-block border-2 border-white text-white px-8 py-4 uppercase tracking-wider font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {config.ctaText}
          </motion.a>
        </motion.div>
      </div>

      {/* Coming Soon - Bottom Right */}
      <motion.div
        className="absolute bottom-8 right-8 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <div className="border-2 border-white px-6 py-2 bg-black/80">
          <span 
            className="text-white text-xs uppercase tracking-widest font-medium"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
          >
            COMING SOON
          </span>
        </div>
      </motion.div>

      {/* Slice Counter */}
      <AnimatePresence>
        {activeSlice !== null && (
          <motion.div
            className="absolute top-8 right-8 z-30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-2 border-white px-4 py-2 bg-black/80">
              <span 
                className="text-white text-2xl font-medium"
                style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
              >
                {String(activeSlice + 1).padStart(2, '0')}
              </span>
              <span className="text-white/60 text-lg">/{SLICE_COUNT}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


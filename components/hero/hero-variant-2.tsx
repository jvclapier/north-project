'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface HeroVariant2Props {
  config: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl?: string;
  };
}

export function HeroVariant2({ config }: HeroVariant2Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black flex items-center justify-center">
      {/* Image with Geometric Crop */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div 
          className="relative w-[90vw] max-w-4xl aspect-[4/3] border-4 border-white"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
          }}
        >
          <Image
            src={config.imageUrl || "/NP_Nov25_BW_-153.jpg"}
            alt="Cycling team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </motion.div>

      {/* Content Overlay - Bottom Left */}
      <div className="relative z-10 w-full h-full flex items-end justify-start px-4 sm:px-8 lg:px-16 pb-16 sm:pb-24">
        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Full Wordmark */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
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

          {/* Subtitle */}
          <motion.p
            className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed bg-black/80 p-4 border-2 border-white"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
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
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {config.ctaText}
          </motion.button>
        </motion.div>
      </div>

      {/* Coming Soon - Top Right Corner */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
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
    </section>
  );
}

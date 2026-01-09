'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface HeroVariant4Props {
  config: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl?: string;
  };
}

export function HeroVariant4({ config }: HeroVariant4Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  const panels = [
    { id: 0, clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)' },
    { id: 1, clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' },
    { id: 2, clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' },
    { id: 3, clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' },
  ];

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black">
      {/* Geometric Grid of Images */}
      <div className="absolute inset-0 grid grid-cols-2">
        {panels.map((panel, index) => (
          <motion.div
            key={panel.id}
            className="relative border-2 border-white overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredPanel(index)}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: hoveredPanel === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={config.imageUrl || "/NP_Nov25_BW_-153.jpg"}
                alt="Cycling team"
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
            
            {/* Geometric Overlay */}
            <motion.div
              className="absolute inset-0 border-4 border-white"
              style={{ clipPath: panel.clipPath }}
              animate={{
                opacity: hoveredPanel === index ? 0.3 : 0.6,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content - Centered */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Full Wordmark */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
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

          {/* Subtitle */}
          <motion.p
            className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed bg-black/80 p-6 border-2 border-white"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {config.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.button
            className="bg-white text-black px-10 py-4 uppercase tracking-wider font-medium border-2 border-white"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {config.ctaText}
          </motion.button>
        </motion.div>
      </div>

      {/* Coming Soon - Top Right */}
      <motion.div
        className="absolute top-8 right-8 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
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


'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroVariant1Props {
  config: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl?: string;
  };
}

export function HeroVariant1({ config }: HeroVariant1Props) {
  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black">
      <div className="absolute inset-0 grid grid-cols-12">
        {/* Left: Content */}
        <div className="col-span-12 lg:col-span-5 relative flex items-center justify-center px-4 sm:px-8 lg:px-12">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Full Wordmark */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/NRTHPROJ_FULL_WORDMARK_FULL_02_TRANSPARENT.png"
                alt="North Project"
                width={600}
                height={150}
                className="w-auto h-14 sm:h-18 md:h-24"
                priority
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-white/90 text-base sm:text-lg mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
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
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {config.ctaText}
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Image in Brutalist Frame */}
        <div className="col-span-12 lg:col-span-7 relative border-l-2 border-white lg:border-l-2 lg:border-t-0 border-t-2 lg:border-t-0">
          <motion.div
            className="absolute inset-0 p-8 lg:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-full border-4 border-white">
              <Image
                src={config.imageUrl || "/NP_Nov25_BW_-153.jpg"}
                alt="Cycling team"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Coming Soon - Top Right Corner */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
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

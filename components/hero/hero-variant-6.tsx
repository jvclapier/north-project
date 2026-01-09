'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroVariant6Props {
  config: {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl?: string;
    imageUrlBw?: string;
    imageUrlColor?: string;
  };
}

export function HeroVariant6({ config }: HeroVariant6Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouchDevice);
    };
    checkMobile();
  }, []);

  // Device orientation handler for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // Convert device orientation to x/y coordinates
        // beta: front-to-back tilt (-180 to 180)
        // gamma: left-to-right tilt (-90 to 90)
        
        // Normalize gamma (left-right) to x position (0-100%)
        const x = Math.max(0, Math.min(100, 50 + (e.gamma / 90) * 50));
        
        // Normalize beta (front-back) to y position (0-100%)
        // Invert beta so tilting forward moves spotlight down
        const y = Math.max(0, Math.min(100, 50 + (e.beta / 90) * 50));
        
        setMousePosition({ x, y });
        
        if (!hasMouseMoved) {
          setHasMouseMoved(true);
        }
      }
    };

    // Request permission for iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(() => {
          // Permission denied or not supported
        });
    } else {
      // Android and older iOS
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile, hasMouseMoved]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMouseMoved) {
      setHasMouseMoved(true);
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const bwImage = config.imageUrlBw || "/NP_Nov25_BW_-154.jpg";
  const colorImage = config.imageUrlColor || "/NP_Nov25_-154.jpg";

  return (
    <section 
      ref={ref} 
      className="relative w-full h-screen min-h-[800px] overflow-hidden bg-black"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* Background Image - B&W */}
      <div className="absolute inset-0">
        <Image
          src={bwImage}
          alt="Cycling team"
          fill
          className="object-cover grayscale"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Interactive Geometric Reveal - COLOR */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          clipPath: `circle(30% at ${mousePosition.x}% ${mousePosition.y}%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: hasMouseMoved ? 1 : 0,
        }}
        transition={{ 
          opacity: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] },
          clipPath: { type: 'spring', stiffness: 50, damping: 20 }
        }}
      >
        <Image
          src={colorImage}
          alt="Cycling team"
          fill
          className="object-cover"
          style={{
            filter: 'saturate(1.2) contrast(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Geometric Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 2px, transparent 2px),
            linear-gradient(to bottom, white 2px, transparent 2px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.2,
        }}
      />

      {/* Content - Top Left Corner */}
      <div className="relative z-20 h-full flex flex-col items-start justify-start px-4 sm:px-8 lg:px-16 pt-16 sm:pt-24">
        <motion.div
          className="max-w-md text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {/* Full Wordmark - Large */}
          <motion.div
            className="mb-6 flex justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/NRTHPROJ_FULL_WORDMARK_FULL_02_TRANSPARENT.png"
              alt="North Project"
              width={800}
              height={200}
              className="w-auto h-20 sm:h-24 md:h-28"
              priority
            />
          </motion.div>

          {/* Horizontal Divider */}
          <motion.div
            className="mb-6 h-px bg-white w-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Subtitle - Minimal */}
          <motion.p
            className="text-white/80 text-sm sm:text-base mb-8 leading-relaxed uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {config.subtitle}
          </motion.p>

          {/* CTA - Minimal Border */}
          <motion.a
            href="/group-ride-waiver"
            className="inline-block border-2 border-white text-white px-8 py-3 uppercase tracking-wider font-medium bg-transparent hover:bg-white hover:text-black transition-colors"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {config.ctaText}
          </motion.a>
        </motion.div>
      </div>

      {/* Coming Soon - Bottom Right */}
      <motion.div
        className="absolute bottom-8 right-8 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
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

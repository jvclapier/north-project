'use client';

import Image from 'next/image';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { width: 300, height: 75, className: 'h-8 sm:h-10' },
  md: { width: 400, height: 100, className: 'h-12 sm:h-16 md:h-20' },
  lg: { width: 600, height: 150, className: 'h-16 sm:h-24 md:h-32' },
};

export function Wordmark({ size = 'md', className = '' }: WordmarkProps) {
  const sizeConfig = sizeMap[size];
  
  return (
    <Image
      src="/NRTHPROJ_FULL_WORDMARK_FULL_02_TRANSPARENT.png"
      alt="North Project"
      width={sizeConfig.width}
      height={sizeConfig.height}
      className={`w-auto ${sizeConfig.className} ${className}`}
      priority
    />
  );
}


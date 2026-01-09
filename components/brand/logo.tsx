'use client';

import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: { width: 100, height: 100, className: 'h-12 sm:h-16' },
  md: { width: 200, height: 200, className: 'h-24 sm:h-32 md:h-40' },
  lg: { width: 300, height: 300, className: 'h-48 sm:h-64 md:h-80' },
  xl: { width: 400, height: 400, className: 'h-64 sm:h-80 md:h-96' },
};

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeConfig = sizeMap[size];
  
  return (
    <Image
      src="/NRTHPROJ_LOGOMARK_FULL_01_TRANSPARENT.png"
      alt="North Project Logo"
      width={sizeConfig.width}
      height={sizeConfig.height}
      className={`w-auto ${sizeConfig.className} ${className}`}
      priority
    />
  );
}


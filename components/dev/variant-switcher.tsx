'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { VariantOption } from '@/lib/types';

interface VariantSwitcherProps {
  variants: VariantOption[];
  activeVariant: string;
  onVariantChange: (variantId: string) => void;
}

export function VariantSwitcher({ variants, activeVariant, onVariantChange }: VariantSwitcherProps) {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-black border-2 border-white p-2">
        {variants.map((variant, index) => {
          const isActive = variant.id === activeVariant;
          return (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant.id)}
              className={`relative px-4 py-2 uppercase tracking-wider text-sm font-medium transition-all ${
                isActive ? 'text-white' : 'text-white/40'
              }`}
              style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-white/60 text-xs">#{index + 1}</span>
                <span>{variant.name}</span>
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeVariant"
                  className="absolute inset-0 border-2 border-white"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {variants.find(v => v.id === activeVariant) && (
        <div className="mt-2 text-center">
          <div className="text-white/40 text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
            {variants.find(v => v.id === activeVariant)?.mood && (
              <span>Mood: {variants.find(v => v.id === activeVariant)?.mood}</span>
            )}
            {variants.find(v => v.id === activeVariant)?.background && (
              <span className="ml-2">Background: {variants.find(v => v.id === activeVariant)?.background}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


'use client';

import { MultiSectionStudio } from '@/components/dev/multi-section-studio';
import { SectionConfig } from '@/lib/types';
import { HeroVariant1 } from '@/components/hero/hero-variant-1';
import { HeroVariant2 } from '@/components/hero/hero-variant-2';
import { HeroVariant3 } from '@/components/hero/hero-variant-3';
import { HeroVariant4 } from '@/components/hero/hero-variant-4';
import { HeroVariant5 } from '@/components/hero/hero-variant-5';
import { HeroVariant6 } from '@/components/hero/hero-variant-6';
import { HeroVariant7 } from '@/components/hero/hero-variant-7';

const exampleSections: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero',
    initialConfig: {
      title: 'NORTH PROJECT',
      subtitle: 'A new racing team. Coming soon.',
      ctaText: 'Join Group ride',
      imageUrl: '/NP_Nov25_BW_-153.jpg',
      imageUrlBw: '/NP_Nov25_BW_-154.jpg',
      imageUrlColor: '/NP_Nov25_-154.jpg',
    },
    variants: [
      {
        id: 'framed',
        name: 'Framed Image',
        mood: 'Editorial',
        background: 'black',
      },
      {
        id: 'geometric',
        name: 'Geometric Crop',
        mood: 'Brutalist',
        background: 'black',
      },
      {
        id: 'interactive',
        name: 'Interactive Grid',
        mood: 'Engaging',
        background: 'black',
      },
      {
        id: 'grid-panels',
        name: 'Grid Panels',
        mood: 'Bold',
        background: 'black',
      },
      {
        id: 'circle-reveal',
        name: 'Circle Reveal',
        mood: 'Interactive',
        background: 'black',
      },
      {
        id: 'circle-reveal-alt',
        name: 'Circle Reveal Alt',
        mood: 'Minimal',
        background: 'black',
      },
      {
        id: 'venetian-slices',
        name: 'Venetian Slices',
        mood: 'Wild',
        background: 'black',
      },
    ],
    component: ({ config, activeVariant }) => {
      const heroConfig = config as {
        title: string;
        subtitle: string;
        ctaText: string;
        imageUrl?: string;
        imageUrlBw?: string;
        imageUrlColor?: string;
      };
      
      switch (activeVariant) {
        case 'framed':
          return <HeroVariant1 config={heroConfig} />;
        case 'geometric':
          return <HeroVariant2 config={heroConfig} />;
        case 'interactive':
          return <HeroVariant3 config={heroConfig} />;
        case 'grid-panels':
          return <HeroVariant4 config={heroConfig} />;
        case 'circle-reveal':
          return <HeroVariant5 config={heroConfig} />;
        case 'circle-reveal-alt':
          return <HeroVariant6 config={heroConfig} />;
        case 'venetian-slices':
          return <HeroVariant7 config={heroConfig} />;
        default:
          return <HeroVariant1 config={heroConfig} />;
      }
    },
  },
];

export default function StudioPage() {
  return <MultiSectionStudio sections={exampleSections} />;
}

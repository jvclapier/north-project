'use client';

import { MultiSectionStudio } from '@/components/dev/multi-section-studio';
import { SectionConfig } from '@/lib/types';
import { HeroVariant1 } from '@/components/hero/hero-variant-1';
import { HeroVariant2 } from '@/components/hero/hero-variant-2';
import { HeroVariant3 } from '@/components/hero/hero-variant-3';
import { HeroVariant4 } from '@/components/hero/hero-variant-4';
import { HeroVariant5 } from '@/components/hero/hero-variant-5';
import { HeroVariant6 } from '@/components/hero/hero-variant-6';

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
    ],
    component: ({ config, activeVariant }) => {
      switch (activeVariant) {
        case 'framed':
          return <HeroVariant1 config={config} />;
        case 'geometric':
          return <HeroVariant2 config={config} />;
        case 'interactive':
          return <HeroVariant3 config={config} />;
        case 'grid-panels':
          return <HeroVariant4 config={config} />;
        case 'circle-reveal':
          return <HeroVariant5 config={config} />;
        case 'circle-reveal-alt':
          return <HeroVariant6 config={config} />;
        default:
          return <HeroVariant1 config={config} />;
      }
    },
  },
];

export default function StudioPage() {
  return <MultiSectionStudio sections={exampleSections} />;
}

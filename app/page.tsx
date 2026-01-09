import { HeroVariant6 } from '@/components/hero/hero-variant-6';

export default function Home() {
  const config = {
    title: 'NORTH PROJECT',
    subtitle: '//COMMUNITY//EDUCATION//RACING//',
    ctaText: 'Group Ride Waiver',
    imageUrlBw: '/NP_Nov25_BW_-154.jpg',
    imageUrlColor: '/NP_Nov25_-154.jpg',
  };

  return <HeroVariant6 config={config} />;
}

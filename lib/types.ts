import { ReactElement } from 'react';

export interface VariantOption {
  id: string;
  name: string;
  mood?: string;
  background?: 'black' | 'white';
}

export interface SectionConfig {
  id: string;
  name: string;
  initialConfig: Record<string, any>;
  variants: VariantOption[];
  component: (props: { 
    config: Record<string, any>; 
    activeVariant: string;
  }) => ReactElement;
  variantConfigs?: Record<string, Record<string, any>>;
}


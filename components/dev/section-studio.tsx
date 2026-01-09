'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionConfig } from '@/lib/types';
import { getStoredConfig, saveConfig } from '@/lib/config-utils';
import { ConfigEditor } from './config-editor';
import { VariantSwitcher } from './variant-switcher';
import { updateNestedField } from '@/lib/config-utils';

interface SectionStudioProps {
  section: SectionConfig;
}

export function SectionStudio({ section }: SectionStudioProps) {
  const [currentConfig, setCurrentConfig] = useState<Record<string, any>>(section.initialConfig);
  const [activeVariant, setActiveVariant] = useState<string>(section.variants[0]?.id || '');
  const [showConfig, setShowConfig] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const stored = getStoredConfig(section.id);
    if (stored) {
      setCurrentConfig(stored);
    }
  }, [section.id]);

  useEffect(() => {
    saveConfig(section.id, currentConfig);
  }, [currentConfig, section.id]);

  const handleConfigUpdate = (path: string, value: any) => {
    setCurrentConfig(prev => updateNestedField(prev, path, value));
  };

  const handleCopyConfig = () => {
    const configString = JSON.stringify(currentConfig, null, 2);
    navigator.clipboard.writeText(configString);
  };

  const handleResetConfig = () => {
    setCurrentConfig(section.initialConfig);
  };

  const handleExportConfig = () => {
    const dataStr = JSON.stringify(currentConfig, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${section.id}-config.json`;
    link.click();
  };

  const config = section.variantConfigs?.[activeVariant] || currentConfig;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Studio Badge */}
      <div className="fixed top-4 left-4 z-50 bg-black border-2 border-white px-3 py-1">
        <span className="text-white text-xs uppercase tracking-wider font-medium" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
          STUDIO
        </span>
      </div>

      {/* Variant Switcher */}
      <VariantSwitcher
        variants={section.variants}
        activeVariant={activeVariant}
        onVariantChange={setActiveVariant}
      />

      {/* Grid Overlay */}
      {showGrid && (
        <div
          className="fixed inset-0 pointer-events-none z-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.3,
          }}
        />
      )}

      {/* Preview Area */}
      <div className="relative w-full h-full overflow-auto">
        <motion.div
          key={activeVariant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {section.component({ config, activeVariant })}
        </motion.div>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          className="fixed top-0 right-0 w-[440px] h-full bg-black-deep border-l-2 border-white z-40"
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b-2 border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white text-lg uppercase tracking-wider font-medium" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
                  {section.name}
                </h2>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-white/60 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ConfigEditor config={currentConfig} onUpdate={handleConfigUpdate} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Toolbar */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="bg-black border-2 border-white px-4 py-2 text-white text-xs uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          {showConfig ? 'HIDE' : 'SHOW'} EDITOR
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="bg-black border-2 border-white px-4 py-2 text-white text-xs uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          {showGrid ? 'HIDE' : 'SHOW'} GRID
        </button>
        <button
          onClick={handleCopyConfig}
          className="bg-black border-2 border-white px-4 py-2 text-white text-xs uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          COPY
        </button>
        <button
          onClick={handleExportConfig}
          className="bg-black border-2 border-white px-4 py-2 text-white text-xs uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          EXPORT
        </button>
        <button
          onClick={handleResetConfig}
          className="bg-black border-2 border-white px-4 py-2 text-white text-xs uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors"
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}


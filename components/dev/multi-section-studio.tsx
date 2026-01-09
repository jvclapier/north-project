'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionConfig } from '@/lib/types';
import { getStoredConfig, saveConfig } from '@/lib/config-utils';
import { ConfigEditor } from './config-editor';
import { VariantSwitcher } from './variant-switcher';
import { updateNestedField } from '@/lib/config-utils';

interface MultiSectionStudioProps {
  sections: SectionConfig[];
}

export function MultiSectionStudio({ sections }: MultiSectionStudioProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || '');
  const [sectionConfigs, setSectionConfigs] = useState<Record<string, Record<string, any>>>({});
  const [activeVariants, setActiveVariants] = useState<Record<string, string>>({});
  const [showConfig, setShowConfig] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const activeSection = sections.find(s => s.id === activeSectionId);

  useEffect(() => {
    const configs: Record<string, Record<string, any>> = {};
    const variants: Record<string, string> = {};
    
    sections.forEach(section => {
      const stored = getStoredConfig(section.id);
      configs[section.id] = stored || section.initialConfig;
      variants[section.id] = section.variants[0]?.id || '';
    });
    
    setSectionConfigs(configs);
    setActiveVariants(variants);
  }, [sections]);

  useEffect(() => {
    Object.entries(sectionConfigs).forEach(([id, config]) => {
      saveConfig(id, config);
    });
  }, [sectionConfigs]);

  const handleConfigUpdate = (path: string, value: any) => {
    if (!activeSection) return;
    setSectionConfigs(prev => ({
      ...prev,
      [activeSection.id]: updateNestedField(prev[activeSection.id] || activeSection.initialConfig, path, value)
    }));
  };

  const handleCopyConfig = () => {
    if (!activeSection) return;
    const configString = JSON.stringify(sectionConfigs[activeSection.id], null, 2);
    navigator.clipboard.writeText(configString);
  };

  const handleResetConfig = () => {
    if (!activeSection) return;
    setSectionConfigs(prev => ({
      ...prev,
      [activeSection.id]: activeSection.initialConfig
    }));
  };

  const handleExportConfig = () => {
    if (!activeSection) return;
    const dataStr = JSON.stringify(sectionConfigs[activeSection.id], null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeSection.id}-config.json`;
    link.click();
  };

  if (!activeSection) return null;

  const currentConfig = sectionConfigs[activeSection.id] || activeSection.initialConfig;
  const activeVariant = activeVariants[activeSection.id] || activeSection.variants[0]?.id || '';
  const config = activeSection.variantConfigs?.[activeVariant] || currentConfig;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Studio Badge */}
      <div className="fixed top-4 left-4 z-50 bg-black border-2 border-white px-3 py-1">
        <span className="text-white text-xs uppercase tracking-wider font-medium" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
          STUDIO
        </span>
      </div>

      {/* Section Tabs */}
      <div className="fixed top-4 left-24 z-50 flex items-center gap-2">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium border-2 transition-colors ${
                isActive
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white/60 border-white/40 hover:border-white hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
            >
              {section.name}
            </button>
          );
        })}
      </div>

      {/* Variant Switcher */}
      <VariantSwitcher
        variants={activeSection.variants}
        activeVariant={activeVariant}
        onVariantChange={(variantId) => {
          setActiveVariants(prev => ({
            ...prev,
            [activeSection.id]: variantId
          }));
        }}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSectionId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection.component({ config, activeVariant })}
          </motion.div>
        </AnimatePresence>
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
                  {activeSection.name}
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


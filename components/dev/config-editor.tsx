'use client';

import { useState } from 'react';
import { detectFieldType } from '@/lib/config-utils';

interface ConfigEditorProps {
  config: Record<string, any>;
  onUpdate: (path: string, value: any) => void;
}

export function ConfigEditor({ config, onUpdate }: ConfigEditorProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const togglePath = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  const renderField = (key: string, value: any, path: string, depth: number = 0): JSX.Element => {
    const fullPath = path ? `${path}.${key}` : key;
    const type = detectFieldType(value);

    if (type === 'object') {
      const isExpanded = expandedPaths.has(fullPath);
      return (
        <div key={key} className="mb-4" style={{ paddingLeft: `${depth * 16}px` }}>
          <button
            onClick={() => togglePath(fullPath)}
            className="flex items-center gap-2 text-white uppercase tracking-wider text-sm font-medium mb-2 hover:text-white/80"
            style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
          >
            <span>{isExpanded ? '−' : '+'}</span>
            <span>{key}</span>
          </button>
          {isExpanded && (
            <div className="border-l-2 border-white/20 pl-4">
              {Object.entries(value).map(([k, v]) => renderField(k, v, fullPath, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    if (type === 'array') {
      return (
        <div key={key} className="mb-4" style={{ paddingLeft: `${depth * 16}px` }}>
          <label className="block text-white/60 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
            {key} (array)
          </label>
          <textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onUpdate(fullPath, parsed);
              } catch {}
            }}
            className="w-full bg-black border-2 border-white/20 text-white p-2 text-sm font-mono"
            rows={4}
          />
        </div>
      );
    }

    return (
      <div key={key} className="mb-4" style={{ paddingLeft: `${depth * 16}px` }}>
        <label className="block text-white/60 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}>
          {key}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onUpdate(fullPath, e.target.value)}
            className="w-full bg-black border-2 border-white/20 text-white p-2 text-sm"
            rows={3}
          />
        ) : type === 'number' ? (
          <input
            type="number"
            value={value}
            onChange={(e) => onUpdate(fullPath, Number(e.target.value))}
            className="w-full bg-black border-2 border-white/20 text-white p-2 text-sm"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onUpdate(fullPath, e.target.value)}
            className="w-full bg-black border-2 border-white/20 text-white p-2 text-sm"
          />
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-black-deep">
      <div className="flex border-b-2 border-white/20">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 text-sm uppercase tracking-wider font-medium ${
            activeTab === 'basic' ? 'text-white border-b-2 border-white' : 'text-white/40'
          }`}
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`px-4 py-2 text-sm uppercase tracking-wider font-medium ${
            activeTab === 'advanced' ? 'text-white border-b-2 border-white' : 'text-white/40'
          }`}
          style={{ fontFamily: 'var(--font-pp-neue-montreal)' }}
        >
          Advanced
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'basic' ? (
          <div>
            {Object.entries(config).map(([key, value]) => renderField(key, value, ''))}
          </div>
        ) : (
          <textarea
            value={JSON.stringify(config, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                Object.keys(parsed).forEach((key) => {
                  onUpdate(key, parsed[key]);
                });
              } catch {}
            }}
            className="w-full h-full bg-black border-2 border-white/20 text-white p-2 text-xs font-mono"
          />
        )}
      </div>
    </div>
  );
}


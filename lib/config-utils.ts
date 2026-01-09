export function getStoredConfig(sectionId: string): Record<string, any> | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`north-project-config-${sectionId}`);
  return stored ? JSON.parse(stored) : null;
}

export function saveConfig(sectionId: string, config: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`north-project-config-${sectionId}`, JSON.stringify(config));
}

export function updateNestedField(
  obj: Record<string, any>,
  path: string,
  value: any
): Record<string, any> {
  const keys = path.split('.');
  const result = JSON.parse(JSON.stringify(obj));
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

export function getNestedValue(obj: Record<string, any>, path: string): any {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[key];
  }
  return current;
}

export function detectFieldType(value: any): 'text' | 'textarea' | 'number' | 'array' | 'object' {
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object' && value !== null) return 'object';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string' && value.length > 50) return 'textarea';
  return 'text';
}


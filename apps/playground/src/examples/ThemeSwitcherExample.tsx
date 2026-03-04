import { useState } from 'react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { BaseNode } from '@ecosystem/canvas-core/primitives';
import { basicNodes, basicEdges } from '../data/basicData';

const nodeTypes = {
  base: BaseNode,
};

type ThemeId = 'functional' | 'daocore' | 'regen' | 'ocean' | 'forest';

function ThemeSwitcher({
  theme,
  onThemeChange,
}: {
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}) {
  const themes: ThemeId[] = ['functional', 'daocore', 'regen', 'ocean', 'forest'];

  return (
    <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as ThemeId)}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          fontSize: '14px',
        }}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ThemeSwitcherExample() {
  const [theme, setTheme] = useState<ThemeId>('functional');

  return (
    <CanvasProvider theme={theme} initialNodes={basicNodes} initialEdges={basicEdges}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </div>
    </CanvasProvider>
  );
}

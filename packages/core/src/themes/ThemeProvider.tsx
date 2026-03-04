/**
 * Theme Provider Component
 * Manages theme context for the canvas
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CanvasTheme, ThemeId } from './types';
import { getTheme } from './themes';

interface ThemeContextValue {
  theme: CanvasTheme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeId;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'functional',
}) => {
  const [themeId, setThemeId] = useState<ThemeId>(defaultTheme);
  const [theme, setThemeState] = useState<CanvasTheme>(getTheme(defaultTheme));

  const handleSetTheme = (id: ThemeId) => {
    setThemeId(id);
    setThemeState(getTheme(id));
  };

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Set color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--canvas-color-${key}`, value);
    });

    // Set spacing variables
    root.style.setProperty('--canvas-node-gap', `${theme.spacing.nodeGap}px`);
    root.style.setProperty('--canvas-edge-radius', `${theme.spacing.edgeRadius}px`);
    root.style.setProperty('--canvas-padding', `${theme.spacing.padding}px`);

    // Set border variables
    root.style.setProperty('--canvas-border-width', `${theme.borders.width}px`);
    root.style.setProperty('--canvas-border-radius', `${theme.borders.radius}px`);

    // Set typography variables
    root.style.setProperty('--canvas-font-title', theme.typography.titleFont);
    root.style.setProperty('--canvas-font-body', theme.typography.bodyFont);
    root.style.setProperty('--canvas-font-mono', theme.typography.monoFont);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

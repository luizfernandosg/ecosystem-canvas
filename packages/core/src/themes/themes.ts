/**
 * Pre-built themes
 * Based on quartz-refi-template color schemes
 */

import type { CanvasTheme } from './types';

/**
 * Functional Theme - Clean, minimal
 */
export const functionalTheme: CanvasTheme = {
  id: 'functional',
  name: 'Functional',
  colors: {
    // Semantic tokens
    light: '#ffffff',
    lightgray: '#f5f5f5',
    gray: '#9ca3af',
    darkgray: '#4b5563',
    dark: '#1f2937',
    secondary: '#6366f1',
    tertiary: '#8b5cf6',
    highlight: '#3b82f6',

    // Status colors
    active: '#10b981',
    pending: '#f59e0b',
    completed: '#3b82f6',
    error: '#ef4444',
    draft: '#9ca3af',
    archived: '#6b7280',

    // Flow colors
    capital: '#10b981', // green
    data: '#3b82f6', // blue
    permission: '#8b5cf6', // purple
    governance: '#f59e0b', // orange

    // Background
    background: '#ffffff',
    backgroundAlt: '#f9fafb',

    // Borders
    border: '#e5e7eb',
    borderHover: '#d1d5db',
  },
  typography: {
    titleFont: 'system-ui, -apple-system, sans-serif',
    bodyFont: 'system-ui, -apple-system, sans-serif',
    monoFont: 'ui-monospace, monospace',
  },
  spacing: {
    nodeGap: 150,
    edgeRadius: 8,
    padding: 12,
  },
  borders: {
    width: 2,
    radius: 8,
  },
};

/**
 * DAOcore Theme - Bold, expressive
 */
export const daocoreTheme: CanvasTheme = {
  id: 'daocore',
  name: 'DAOcore',
  colors: {
    // Semantic tokens
    light: '#ffffff',
    lightgray: '#f3f4f6',
    gray: '#9ca3af',
    darkgray: '#374151',
    dark: '#111827',
    secondary: '#ec4899',
    tertiary: '#a855f7',
    highlight: '#f59e0b',

    // Status colors
    active: '#22c55e',
    pending: '#fbbf24',
    completed: '#3b82f6',
    error: '#f87171',
    draft: '#a3a3a3',
    archived: '#737373',

    // Flow colors
    capital: '#22c55e',
    data: '#3b82f6',
    permission: '#a855f7',
    governance: '#f59e0b',

    // Background
    background: '#ffffff',
    backgroundAlt: '#fafafa',

    // Borders
    border: '#e5e7eb',
    borderHover: '#cbd5e1',
  },
  typography: {
    titleFont: 'ui-sans-serif, system-ui, sans-serif',
    bodyFont: 'ui-sans-serif, system-ui, sans-serif',
    monoFont: 'ui-monospace, monospace',
  },
  spacing: {
    nodeGap: 160,
    edgeRadius: 0, // Sharp corners for bold aesthetic
    padding: 16,
  },
  borders: {
    width: 2,
    radius: 0, // No border radius
  },
};

/**
 * Regen Theme - Earth tones
 */
export const regenTheme: CanvasTheme = {
  id: 'regen',
  name: 'Regen',
  colors: {
    // Semantic tokens
    light: '#fefefe',
    lightgray: '#f5f5f4',
    gray: '#a8a29e',
    darkgray: '#57534e',
    dark: '#292524',
    secondary: '#84cc16',
    tertiary: '#65a30d',
    highlight: '#22c55e',

    // Status colors
    active: '#22c55e',
    pending: '#eab308',
    completed: '#14b8a6',
    error: '#dc2626',
    draft: '#a8a29e',
    archived: '#78716c',

    // Flow colors
    capital: '#22c55e', // green
    data: '#14b8a6', // teal
    permission: '#84cc16', // lime
    governance: '#eab308', // yellow

    // Background
    background: '#fefefe',
    backgroundAlt: '#fafaf9',

    // Borders
    border: '#e7e5e4',
    borderHover: '#d6d3d1',
  },
  typography: {
    titleFont: 'ui-serif, Georgia, serif',
    bodyFont: 'ui-sans-serif, system-ui, sans-serif',
    monoFont: 'ui-monospace, monospace',
  },
  spacing: {
    nodeGap: 140,
    edgeRadius: 12,
    padding: 14,
  },
  borders: {
    width: 2,
    radius: 8,
  },
};

/**
 * Ocean Theme - ReFi Barcelona
 * Navy blue + warm sand
 */
export const oceanTheme: CanvasTheme = {
  id: 'ocean',
  name: 'Ocean',
  colors: {
    // Semantic tokens
    light: '#E6DFD7', // Warm sand
    lightgray: '#d4cdc4',
    gray: '#94a3b8',
    darkgray: '#1e3a5f',
    dark: '#0f172a',
    secondary: '#0ea5e9',
    tertiary: '#0284c7',
    highlight: '#06b6d4',

    // Status colors
    active: '#10b981',
    pending: '#f59e0b',
    completed: '#0ea5e9',
    error: '#ef4444',
    draft: '#94a3b8',
    archived: '#64748b',

    // Flow colors
    capital: '#10b981',
    data: '#0ea5e9',
    permission: '#8b5cf6',
    governance: '#f59e0b',

    // Background
    background: '#E6DFD7',
    backgroundAlt: '#ffffff',

    // Borders
    border: '#1e3a5f',
    borderHover: '#0f172a',
  },
  typography: {
    titleFont: 'ui-sans-serif, system-ui, sans-serif',
    bodyFont: 'ui-sans-serif, system-ui, sans-serif',
    monoFont: 'ui-monospace, monospace',
  },
  spacing: {
    nodeGap: 150,
    edgeRadius: 0,
    padding: 12,
  },
  borders: {
    width: 2,
    radius: 0, // Sharp geometric aesthetic
  },
};

/**
 * Forest Theme - Regenerant Catalunya
 * Earthy green tones
 */
export const forestTheme: CanvasTheme = {
  id: 'forest',
  name: 'Forest',
  colors: {
    // Semantic tokens
    light: '#f7f7f5',
    lightgray: '#e8e8e3',
    gray: '#9ca399',
    darkgray: '#3d5241',
    dark: '#1a2e1f',
    secondary: '#4d7c0f',
    tertiary: '#65a30d',
    highlight: '#84cc16',

    // Status colors
    active: '#22c55e',
    pending: '#fbbf24',
    completed: '#14b8a6',
    error: '#dc2626',
    draft: '#9ca399',
    archived: '#6b7269',

    // Flow colors
    capital: '#22c55e',
    data: '#14b8a6',
    permission: '#4d7c0f',
    governance: '#f59e0b',

    // Background
    background: '#f7f7f5',
    backgroundAlt: '#ffffff',

    // Borders
    border: '#d4d4ca',
    borderHover: '#a8a89d',
  },
  typography: {
    titleFont: 'ui-serif, Georgia, serif',
    bodyFont: 'ui-sans-serif, system-ui, sans-serif',
    monoFont: 'ui-monospace, monospace',
  },
  spacing: {
    nodeGap: 140,
    edgeRadius: 8,
    padding: 14,
  },
  borders: {
    width: 2,
    radius: 8,
  },
};

/**
 * Theme registry
 */
export const themes = {
  functional: functionalTheme,
  daocore: daocoreTheme,
  regen: regenTheme,
  ocean: oceanTheme,
  forest: forestTheme,
} as const;

export function getTheme(id: string): CanvasTheme {
  return themes[id as keyof typeof themes] || themes.functional;
}

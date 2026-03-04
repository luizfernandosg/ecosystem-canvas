/**
 * Theme type definitions
 */

export interface CanvasTheme {
  id: string;
  name: string;
  colors: {
    // Semantic tokens (from quartz-refi-template)
    light: string;
    lightgray: string;
    gray: string;
    darkgray: string;
    dark: string;
    secondary: string;
    tertiary: string;
    highlight: string;

    // Node status colors
    active: string;
    pending: string;
    completed: string;
    error: string;
    draft: string;
    archived: string;

    // Flow colors
    capital: string;
    data: string;
    permission: string;
    governance: string;

    // Background
    background: string;
    backgroundAlt: string;

    // Borders
    border: string;
    borderHover: string;
  };
  typography: {
    titleFont: string;
    bodyFont: string;
    monoFont: string;
  };
  spacing: {
    nodeGap: number;
    edgeRadius: number;
    padding: number;
  };
  borders: {
    width: number;
    radius: number;
  };
}

export type ThemeId = 'functional' | 'daocore' | 'regen' | 'ocean' | 'forest';

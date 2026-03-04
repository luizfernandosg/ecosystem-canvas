/**
 * Canvas Provider Component
 * Provides context for canvas operations
 */

import React, { createContext, useContext, useState } from 'react';
import type {
  CanvasNode,
  CanvasEdge,
  Selection,
  Viewport,
  LayoutAlgorithm,
  OverlayMode,
} from '@ecosystem/canvas-core';
import { ThemeProvider, type ThemeId } from '@ecosystem/canvas-core/themes';

interface CanvasContextValue {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  selection: Selection;
  viewport: Viewport;
  layoutAlgorithm: LayoutAlgorithm;
  overlayMode: OverlayMode;
  setNodes: (nodes: CanvasNode[] | ((prev: CanvasNode[]) => CanvasNode[])) => void;
  setEdges: (edges: CanvasEdge[] | ((prev: CanvasEdge[]) => CanvasEdge[])) => void;
  setSelection: (selection: Selection) => void;
  setViewport: (viewport: Viewport) => void;
  setLayoutAlgorithm: (algorithm: LayoutAlgorithm) => void;
  setOverlayMode: (mode: OverlayMode) => void;
}

const CanvasContext = createContext<CanvasContextValue | undefined>(undefined);

export interface CanvasProviderProps {
  children: React.ReactNode;
  theme?: ThemeId;
  initialNodes?: CanvasNode[];
  initialEdges?: CanvasEdge[];
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({
  children,
  theme = 'functional',
  initialNodes = [],
  initialEdges = [],
}) => {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes);
  const [edges, setEdges] = useState<CanvasEdge[]>(initialEdges);
  const [selection, setSelection] = useState<Selection>({ nodes: [], edges: [] });
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 });
  const [layoutAlgorithm, setLayoutAlgorithm] = useState<LayoutAlgorithm>('manual');
  const [overlayMode, setOverlayMode] = useState<OverlayMode>('none');

  return (
    <ThemeProvider defaultTheme={theme}>
      <CanvasContext.Provider
        value={{
          nodes,
          edges,
          selection,
          viewport,
          layoutAlgorithm,
          overlayMode,
          setNodes,
          setEdges,
          setSelection,
          setViewport,
          setLayoutAlgorithm,
          setOverlayMode,
        }}
      >
        {children}
      </CanvasContext.Provider>
    </ThemeProvider>
  );
};

/**
 * Hook to use canvas context
 */
export function useCanvas(): CanvasContextValue {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}

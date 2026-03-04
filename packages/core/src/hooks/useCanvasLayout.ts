/**
 * Hook for managing canvas layout
 */

import { useCallback } from 'react';
import type { CanvasNode, CanvasEdge, LayoutAlgorithm } from '../types';
import { gridLayout, circularLayout, treeLayout, autoLayout } from '../utils/layout';

export function useCanvasLayout() {
  const applyLayout = useCallback(
    <T extends Record<string, unknown>>(
      nodes: CanvasNode<T>[],
      edges: CanvasEdge[],
      algorithm: LayoutAlgorithm
    ): CanvasNode<T>[] => {
      const algo = algorithm as string;
      switch (algo) {
        case 'dagre':
        case 'hierarchical':
          return treeLayout(nodes, edges);
        case 'circular':
          return circularLayout(nodes);
        case 'grid':
          return gridLayout(nodes);
        case 'force-directed':
        case 'radial':
        case 'tree':
        case 'sankey':
        case 'swimlane':
          // These would require additional layout engine implementations
          // For now, fallback to grid
          return gridLayout(nodes);
        case 'manual':
        default:
          return nodes;
      }
    },
    []
  );

  const applyGridLayout = useCallback(
    <T extends Record<string, unknown>>(nodes: CanvasNode<T>[], columns: number = 4, spacing: number = 150) => {
      return gridLayout(nodes, columns, spacing);
    },
    []
  );

  const applyCircularLayout = useCallback(
    <T extends Record<string, unknown>>(
      nodes: CanvasNode<T>[],
      radius: number = 300,
      center: { x: number; y: number } = { x: 400, y: 300 }
    ) => {
      return circularLayout(nodes, radius, center);
    },
    []
  );

  const applyTreeLayout = useCallback(
    <T extends Record<string, unknown>>(
      nodes: CanvasNode<T>[],
      edges: CanvasEdge[],
      spacing: { x: number; y: number } = { x: 200, y: 150 }
    ) => {
      return treeLayout(nodes, edges, spacing);
    },
    []
  );

  const applyAutoLayout = useCallback(
    <T extends Record<string, unknown>>(
      nodes: CanvasNode<T>[],
      edges: CanvasEdge[],
      algorithm: 'grid' | 'circular' | 'tree' = 'grid'
    ) => {
      return autoLayout(nodes, edges, algorithm);
    },
    []
  );

  return {
    applyLayout,
    applyGridLayout,
    applyCircularLayout,
    applyTreeLayout,
    applyAutoLayout,
  };
}

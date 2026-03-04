/**
 * Hook for managing canvas selection
 */

import { useState, useCallback } from 'react';
import type { CanvasNode, CanvasEdge, Selection } from '../types';

export function useCanvasSelection() {
  const [selection, setSelection] = useState<Selection>({ nodes: [], edges: [] });

  const selectNode = useCallback((nodeId: string) => {
    setSelection((prev) => ({
      ...prev,
      nodes: [...prev.nodes, nodeId],
    }));
  }, []);

  const deselectNode = useCallback((nodeId: string) => {
    setSelection((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((id) => id !== nodeId),
    }));
  }, []);

  const selectEdge = useCallback((edgeId: string) => {
    setSelection((prev) => ({
      ...prev,
      edges: [...prev.edges, edgeId],
    }));
  }, []);

  const deselectEdge = useCallback((edgeId: string) => {
    setSelection((prev) => ({
      ...prev,
      edges: prev.edges.filter((id) => id !== edgeId),
    }));
  }, []);

  const selectAll = useCallback((nodes: CanvasNode[], edges: CanvasEdge[]) => {
    setSelection({
      nodes: nodes.map((n) => n.id),
      edges: edges.map((e) => e.id),
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelection({ nodes: [], edges: [] });
  }, []);

  const isNodeSelected = useCallback(
    (nodeId: string) => {
      return selection.nodes.includes(nodeId);
    },
    [selection]
  );

  const isEdgeSelected = useCallback(
    (edgeId: string) => {
      return selection.edges.includes(edgeId);
    },
    [selection]
  );

  return {
    selection,
    setSelection,
    selectNode,
    deselectNode,
    selectEdge,
    deselectEdge,
    selectAll,
    clearSelection,
    isNodeSelected,
    isEdgeSelected,
  };
}

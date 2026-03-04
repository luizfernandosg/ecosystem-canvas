/**
 * Hook for managing canvas state
 */

import { useState, useCallback } from 'react';
import type { CanvasNode, CanvasEdge } from '../types';

export interface CanvasState {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

export function useCanvasState(initialState: CanvasState = { nodes: [], edges: [] }) {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialState.nodes);
  const [edges, setEdges] = useState<CanvasEdge[]>(initialState.edges);

  const addNode = useCallback((node: CanvasNode) => {
    setNodes((prev) => [...prev, node]);
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.source !== nodeId && e.target !== nodeId));
  }, []);

  const updateNode = useCallback((nodeId: string, updates: Partial<CanvasNode>) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, ...updates } : n))
    );
  }, []);

  const addEdge = useCallback((edge: CanvasEdge) => {
    setEdges((prev) => [...prev, edge]);
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges((prev) => prev.filter((e) => e.id !== edgeId));
  }, []);

  const updateEdge = useCallback((edgeId: string, updates: Partial<CanvasEdge>) => {
    setEdges((prev) =>
      prev.map((e) => (e.id === edgeId ? { ...e, ...updates } : e))
    );
  }, []);

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, []);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    removeNode,
    updateNode,
    addEdge,
    removeEdge,
    updateEdge,
    clearCanvas,
  };
}

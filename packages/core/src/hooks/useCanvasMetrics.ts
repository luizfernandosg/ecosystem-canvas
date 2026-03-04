/**
 * Hook for calculating canvas metrics
 */

import { useMemo } from 'react';
import type { CanvasNode, CanvasEdge, CanvasMetrics } from '../types';

export function useCanvasMetrics(nodes: CanvasNode[], edges: CanvasEdge[]): CanvasMetrics {
  return useMemo(() => {
    const selectedNodeCount = nodes.filter((n) => n.selected).length;
    const selectedEdgeCount = edges.filter((e) => e.selected).length;

    // Calculate average connections per node
    const connectionCounts = new Map<string, number>();
    edges.forEach((edge) => {
      connectionCounts.set(edge.source, (connectionCounts.get(edge.source) || 0) + 1);
      connectionCounts.set(edge.target, (connectionCounts.get(edge.target) || 0) + 1);
    });

    const totalConnections = Array.from(connectionCounts.values()).reduce(
      (sum, count) => sum + count,
      0
    );
    const averageConnections = nodes.length > 0 ? totalConnections / nodes.length : 0;

    return {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      selectedNodeCount,
      selectedEdgeCount,
      averageConnections,
    };
  }, [nodes, edges]);
}

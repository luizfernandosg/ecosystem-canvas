/**
 * Layout utilities and algorithms
 */

import type { CanvasNode, CanvasEdge, Position } from '../types';

/**
 * Grid layout
 */
export function gridLayout<T extends Record<string, unknown>>(
  nodes: CanvasNode<T>[],
  columns: number = 4,
  spacing: number = 150
): CanvasNode<T>[] {
  return nodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % columns) * spacing,
      y: Math.floor(index / columns) * spacing,
    },
  }));
}

/**
 * Circular layout
 */
export function circularLayout<T extends Record<string, unknown>>(
  nodes: CanvasNode<T>[],
  radius: number = 300,
  center: Position = { x: 400, y: 300 }
): CanvasNode<T>[] {
  const angleStep = (2 * Math.PI) / nodes.length;

  return nodes.map((node, index) => {
    const angle = index * angleStep;
    return {
      ...node,
      position: {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      },
    };
  });
}

/**
 * Tree layout (simple hierarchical)
 */
export function treeLayout<T extends Record<string, unknown>>(
  nodes: CanvasNode<T>[],
  edges: CanvasEdge[],
  spacing: { x: number; y: number } = { x: 200, y: 150 }
): CanvasNode<T>[] {
  // Build adjacency list
  const children = new Map<string, string[]>();
  const parents = new Map<string, string>();

  edges.forEach((edge) => {
    if (!children.has(edge.source)) {
      children.set(edge.source, []);
    }
    children.get(edge.source)!.push(edge.target);
    parents.set(edge.target, edge.source);
  });

  // Find root nodes (no parents)
  const roots = nodes.filter((node) => !parents.has(node.id));

  // Position nodes level by level
  const positioned = new Map<string, Position>();
  const levels = new Map<string, number>();

  function assignLevels(nodeId: string, level: number = 0) {
    levels.set(nodeId, level);
    const nodeChildren = children.get(nodeId) || [];
    nodeChildren.forEach((child) => assignLevels(child, level + 1));
  }

  roots.forEach((root) => assignLevels(root.id));

  // Group by level
  const nodesByLevel = new Map<number, string[]>();
  levels.forEach((level, nodeId) => {
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)!.push(nodeId);
  });

  // Position nodes
  nodesByLevel.forEach((nodeIds, level) => {
    nodeIds.forEach((nodeId, index) => {
      positioned.set(nodeId, {
        x: index * spacing.x,
        y: level * spacing.y,
      });
    });
  });

  return nodes.map((node) => ({
    ...node,
    position: positioned.get(node.id) || node.position,
  }));
}

/**
 * Auto-layout helper
 */
export function autoLayout<T extends Record<string, unknown>>(
  nodes: CanvasNode<T>[],
  edges: CanvasEdge[],
  algorithm: 'grid' | 'circular' | 'tree' = 'grid'
): CanvasNode<T>[] {
  switch (algorithm) {
    case 'grid':
      return gridLayout(nodes);
    case 'circular':
      return circularLayout(nodes);
    case 'tree':
      return treeLayout(nodes, edges);
    default:
      return nodes;
  }
}

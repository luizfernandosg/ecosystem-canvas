/**
 * Transform utilities for converting data to canvas nodes/edges
 */

import type { CanvasNode, CanvasEdge, Position } from '../types';

/**
 * Generate unique ID
 */
export function generateId(prefix: string = 'node'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create node with defaults
 */
export function createNode<T extends Record<string, unknown>>(
  id: string,
  type: string,
  position: Position,
  data: T
): CanvasNode<T> {
  return {
    id,
    type,
    position,
    data,
    draggable: true,
    selectable: true,
    connectable: true,
    deletable: true,
  };
}

/**
 * Create edge with defaults
 */
export function createEdge<T extends Record<string, unknown>>(
  source: string,
  target: string,
  data?: T,
  type?: string
): CanvasEdge<T> {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    type,
    data,
  };
}

/**
 * Batch create nodes
 */
export function createNodes<T extends Record<string, unknown>>(
  items: Array<{ id: string; type: string; position: Position; data: T }>
): CanvasNode<T>[] {
  return items.map((item) =>
    createNode(item.id, item.type, item.position, item.data)
  );
}

/**
 * Batch create edges
 */
export function createEdges<T extends Record<string, unknown>>(
  connections: Array<{ source: string; target: string; data?: T; type?: string }>
): CanvasEdge<T>[] {
  return connections.map((conn) =>
    createEdge(conn.source, conn.target, conn.data, conn.type)
  );
}

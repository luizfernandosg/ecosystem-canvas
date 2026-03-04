/**
 * Data adapter types for ecosystem canvas
 */

import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

export interface DataAdapter {
  /** Adapter identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Whether this adapter fetches live data */
  isLive: boolean;
  /** Load nodes and edges for a given view type */
  load(view: 'integrations' | 'fund-flows'): Promise<AdapterResult>;
}

export interface AdapterResult {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  metadata?: {
    source: string;
    lastUpdated?: string;
    itemCount?: number;
    note?: string;
    error?: string;
  };
}

export interface AdapterError {
  adapterId: string;
  message: string;
  cause?: unknown;
}

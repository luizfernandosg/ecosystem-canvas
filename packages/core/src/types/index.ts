/**
 * Core type definitions for Ecosystem Canvas
 * Building on patterns from dao-os, opengrants-os, and React Flow
 */

import type { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

/**
 * Position in 2D space
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Size dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Rectangle bounds
 */
export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Base node structure with generic data type
 */
export interface CanvasNode<T extends Record<string, unknown> = Record<string, unknown>> extends ReactFlowNode<T> {
  id: string;
  type: string;
  position: Position;
  data: T;
  measured?: Size;
  selected?: boolean;
  dragging?: boolean;
  deletable?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
}

/**
 * Base edge structure with generic data type
 */
export interface CanvasEdge<T extends Record<string, unknown> = Record<string, unknown>> extends ReactFlowEdge<T> {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: T;
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
  labelStyle?: React.CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: React.CSSProperties;
}

/**
 * Flow data for edges (capital, data, permission flows)
 */
export interface FlowData extends Record<string, unknown> {
  amount?: number;
  velocity?: number;
  intensity?: number;
  label?: string;
  sublabel?: string;
  status?: 'active' | 'pending' | 'completed' | 'blocked' | 'error';
  metadata?: Record<string, unknown>;
}

/**
 * Node status types
 */
export type NodeStatus =
  | 'active'
  | 'pending'
  | 'completed'
  | 'blocked'
  | 'error'
  | 'draft'
  | 'archived';

/**
 * Overlay modes for system-wide visualizations
 */
export type OverlayMode =
  | 'none'
  | 'heat-map' // Activity concentration
  | 'energy-flow' // Resource transformation (available → active)
  | 'entropy' // Organizational coordination/alignment
  | 'equilibrium' // System balance
  | 'progress' // Completion status
  | 'status'; // Node status indicators

/**
 * Layout algorithms
 */
export type LayoutAlgorithm =
  | 'dagre'
  | 'hierarchical'
  | 'force-directed'
  | 'radial'
  | 'circular'
  | 'tree'
  | 'sankey'
  | 'swimlane'
  | 'manual';

/**
 * Layout direction
 */
export type LayoutDirection = 'TB' | 'BT' | 'LR' | 'RL';

/**
 * Layout options
 */
export interface LayoutOptions {
  algorithm: LayoutAlgorithm;
  direction?: LayoutDirection;
  nodeSpacing?: number;
  rankSpacing?: number;
  animate?: boolean;
  fit?: boolean;
}

/**
 * Selection state
 */
export interface Selection {
  nodes: string[];
  edges: string[];
}

/**
 * Viewport state
 */
export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

/**
 * Canvas metrics
 */
export interface CanvasMetrics {
  nodeCount: number;
  edgeCount: number;
  selectedNodeCount: number;
  selectedEdgeCount: number;
  averageConnections: number;
}

/**
 * Export format options
 */
export type ExportFormat = 'png' | 'svg' | 'jpg' | 'json' | 'markdown';

/**
 * Export options
 */
export interface ExportOptions {
  format: ExportFormat;
  background?: string;
  width?: number;
  height?: number;
  quality?: number;
}

export * from './visualization';
export * from './validation';

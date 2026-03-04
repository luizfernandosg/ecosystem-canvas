/**
 * Visualization-specific types
 * Derived from dao-os visualization system
 */

import type { CanvasNode, CanvasEdge, FlowData } from './index';

/**
 * Heat zone for activity heat maps
 */
export interface HeatZone {
  x: number;
  y: number;
  radius: number;
  intensity: number; // 0-1
  nodeId: string;
}

/**
 * Energy flow visualization data
 */
export interface EnergyFlowVisualization {
  potential: number; // Available resources
  kinetic: number; // Active work
  transformation: number; // Rate of conversion
  efficiency: number; // How much potential becomes impact (0-1)
}

/**
 * Entropy visualization data
 */
export interface EntropyVisualization {
  overall: number; // 0-1 (0 = perfect order, 1 = chaos)
  byNode: {
    nodeId: string;
    entropy: number;
    alignment: number;
  }[];
}

/**
 * Equilibrium indicators
 */
export interface EquilibriumIndicators {
  inflows: number;
  outflows: number;
  balance: number; // 0-1 (1 = perfect equilibrium)
  trend: 'accumulating' | 'balanced' | 'depleting';
}

/**
 * Progress visualization data
 */
export interface ProgressVisualization {
  completed: number;
  inProgress: number;
  pending: number;
  blocked: number;
  total: number;
  percentage: number; // 0-100
}

/**
 * Fund flow visualization data
 */
export interface FundFlowData {
  nodes: CanvasNode[];
  edges: CanvasEdge<FlowData>[];
  totalFlow: number;
  activeFlows: number;
}

/**
 * Visualization configuration
 */
export interface VisualizationConfig {
  showLabels: boolean;
  showMetrics: boolean;
  animationSpeed: number; // 0-1
  theme: string;
  overlayMode?: string;
}

/**
 * Cluster visualization data
 */
export interface Cluster {
  id: string;
  label: string;
  nodeIds: string[];
  center: { x: number; y: number };
  radius: number;
  color?: string;
}

/**
 * Timeline visualization data
 */
export interface TimelineData {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
  startDate: Date;
  endDate: Date;
  milestones: {
    date: Date;
    label: string;
    nodeIds: string[];
  }[];
}

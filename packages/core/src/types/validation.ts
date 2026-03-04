/**
 * Validation types and schemas
 */

import { z } from 'zod';

/**
 * Position schema
 */
export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

/**
 * Size schema
 */
export const SizeSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
});

/**
 * Node status schema
 */
export const NodeStatusSchema = z.enum([
  'active',
  'pending',
  'completed',
  'blocked',
  'error',
  'draft',
  'archived',
]);

/**
 * Flow data schema
 */
export const FlowDataSchema = z.object({
  amount: z.number().optional(),
  velocity: z.number().optional(),
  intensity: z.number().min(0).max(1).optional(),
  label: z.string().optional(),
  sublabel: z.string().optional(),
  status: z
    .enum(['active', 'pending', 'completed', 'blocked', 'error'])
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * Canvas node schema
 */
export const CanvasNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: PositionSchema,
  data: z.unknown(),
  measured: SizeSchema.optional(),
  selected: z.boolean().optional(),
  dragging: z.boolean().optional(),
  deletable: z.boolean().optional(),
  draggable: z.boolean().optional(),
  selectable: z.boolean().optional(),
  connectable: z.boolean().optional(),
});

/**
 * Canvas edge schema
 */
export const CanvasEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
  data: z.unknown().optional(),
  animated: z.boolean().optional(),
  label: z.string().optional(),
});

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

/**
 * Validate node
 */
export function validateNode(node: unknown): ValidationResult {
  const result = CanvasNodeSchema.safeParse(node);
  if (result.success) {
    return { valid: true };
  }
  return {
    valid: false,
    errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
  };
}

/**
 * Validate edge
 */
export function validateEdge(edge: unknown): ValidationResult {
  const result = CanvasEdgeSchema.safeParse(edge);
  if (result.success) {
    return { valid: true };
  }
  return {
    valid: false,
    errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
  };
}

/**
 * Validate flow data
 */
export function validateFlowData(data: unknown): ValidationResult {
  const result = FlowDataSchema.safeParse(data);
  if (result.success) {
    return { valid: true };
  }
  return {
    valid: false,
    errors: result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
  };
}

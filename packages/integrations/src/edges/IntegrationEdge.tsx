/**
 * Integration Edge Component
 * Connects protocols, applications, and infrastructure
 */

import { memo } from 'react';
import {
  BaseEdge,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';
import type { IntegrationEdgeData } from '../types';

export type IntegrationEdgeProps = EdgeProps & {
  data?: IntegrationEdgeData;
};

export const IntegrationEdge = memo<IntegrationEdgeProps>(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeData = data as IntegrationEdgeData | undefined;
  const connectionType = edgeData?.connectionType ?? 'api';
  const color =
    connectionType === 'api'
      ? '#3b82f6'
      : connectionType === 'onchain'
        ? '#8b5cf6'
        : connectionType === 'data'
          ? '#10b981'
          : '#6366f1';

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: color,
        strokeWidth: 2,
        ...style,
      }}
      markerEnd={markerEnd}
    />
  );
});

IntegrationEdge.displayName = 'IntegrationEdge';

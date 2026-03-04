/**
 * Base Edge Component
 * Foundation for all custom edges in the ecosystem
 */

import { memo } from 'react';
import type { EdgeProps } from '@xyflow/react';
import { BaseEdge as ReactFlowBaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import type { FlowData } from '../types';

export type BaseEdgeProps = EdgeProps & {
  data?: FlowData;
  pathType?: 'default' | 'straight' | 'step' | 'smoothstep';
};

export const BaseEdge = memo<BaseEdgeProps>(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data = {},
    selected,
    style = {},
  }) => {
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const statusColors: Record<string, string> = {
      active: '#10b981', // green
      pending: '#f59e0b', // yellow
      completed: '#3b82f6', // blue
      blocked: '#ef4444', // red
      error: '#dc2626', // dark red
    };

    const flowData = data as FlowData;
    const edgeColor = flowData?.status ? statusColors[flowData.status] : '#94a3b8';
    const strokeWidth = selected ? 3 : flowData?.intensity ? 1 + flowData.intensity * 3 : 2;

    return (
      <>
        <ReactFlowBaseEdge
          id={id}
          path={edgePath}
          style={{
            ...style,
            stroke: edgeColor,
            strokeWidth,
            opacity: flowData?.intensity !== undefined ? 0.3 + flowData.intensity * 0.7 : 1,
          }}
        />

        {flowData?.label && (
          <EdgeLabelRenderer>
            <div
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: 'all',
              }}
              className="nodrag nopan"
            >
              <div className="bg-white px-2 py-1 rounded border border-gray-300 shadow-sm text-xs font-medium">
                {flowData.label}
                {flowData.sublabel && (
                  <div className="text-gray-500 text-xs mt-0.5">{flowData.sublabel}</div>
                )}
              </div>
            </div>
          </EdgeLabelRenderer>
        )}
      </>
    );
  }
);

BaseEdge.displayName = 'BaseEdge';

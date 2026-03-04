/**
 * Capital Flow Edge Component
 * Animated edge showing capital flow between nodes
 */

import { memo } from 'react';
import type { EdgeProps } from '@xyflow/react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import { motion } from 'framer-motion';

interface CapitalFlowData extends Record<string, unknown> {
  amount: number;
  token: string;
  velocity?: number; // 0-1
  status?: 'active' | 'pending' | 'completed';
}

export type CapitalFlowEdgeProps = EdgeProps & {
  data?: CapitalFlowData;
};

export const CapitalFlowEdge = memo<CapitalFlowEdgeProps>(
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
  }) => {
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const flowData = data as CapitalFlowData;
    const velocity = flowData?.velocity || 0.5;
    const amount = flowData?.amount || 0;
    const token = flowData?.token || 'USD';
    const status = flowData?.status || 'active';

    const statusColors: Record<string, string> = {
      active: '#10b981',
      pending: '#f59e0b',
      completed: '#3b82f6',
    };

    const edgeColor = statusColors[status];

    return (
      <>
        <BaseEdge
          id={id}
          path={edgePath}
          style={{
            stroke: edgeColor,
            strokeWidth: selected ? 3 : 2,
            opacity: 0.6 + velocity * 0.4,
          }}
        />

        {/* Animated particles */}
        {status === 'active' && (
          <motion.circle
            r="4"
            fill={edgeColor}
            initial={{ offsetDistance: '0%', opacity: 1 }}
            animate={{ offsetDistance: '100%', opacity: [1, 1, 0] }}
            transition={{
              duration: 2 / velocity,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ offsetPath: `path('${edgePath}')` } as any}
          />
        )}

        {flowData?.amount && (
          <EdgeLabelRenderer>
            <div
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: 'all',
              }}
              className="nodrag nopan"
            >
              <div className="bg-white px-2 py-1 rounded border-2 border-green-500 shadow-md text-xs font-semibold">
                {amount.toLocaleString()} {token}
              </div>
            </div>
          </EdgeLabelRenderer>
        )}
      </>
    );
  }
);

CapitalFlowEdge.displayName = 'CapitalFlowEdge';

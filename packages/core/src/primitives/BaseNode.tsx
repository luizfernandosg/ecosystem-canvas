/**
 * Base Node Component
 * Foundation for all custom nodes in the ecosystem
 */

import React, { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { NodeStatus } from '../types';

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status?: NodeStatus;
  icon?: React.ReactNode;
  metadata?: Record<string, unknown>;
}

export type BaseNodeProps = NodeProps & {
  data: BaseNodeData;
  className?: string;
  showHandles?: boolean;
  handlePositions?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
};

const statusColors: Record<NodeStatus, string> = {
  active: 'bg-green-100 border-green-500',
  pending: 'bg-yellow-100 border-yellow-500',
  completed: 'bg-blue-100 border-blue-500',
  blocked: 'bg-red-100 border-red-500',
  error: 'bg-red-200 border-red-600',
  draft: 'bg-gray-100 border-gray-400',
  archived: 'bg-gray-50 border-gray-300',
};

export const BaseNode = memo<BaseNodeProps>(
  ({
    data,
    selected,
    className = '',
    showHandles = true,
    handlePositions = { top: true, bottom: true, left: true, right: true },
  }) => {
    const { label, description, status = 'draft', icon } = data as BaseNodeData;
    const statusClass = statusColors[status as NodeStatus];

    return (
      <div
        className={`min-w-[180px] rounded-lg border-2 bg-white shadow-md transition-all ${
          selected ? 'ring-2 ring-blue-500' : ''
        } ${statusClass} ${className}`}
      >
        {/* Handles */}
        {showHandles && (
          <>
            {handlePositions.top && (
              <Handle
                type="target"
                position={Position.Top}
                className="!bg-gray-400"
              />
            )}
            {handlePositions.right && (
              <Handle
                type="source"
                position={Position.Right}
                className="!bg-gray-400"
              />
            )}
            {handlePositions.bottom && (
              <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-gray-400"
              />
            )}
            {handlePositions.left && (
              <Handle
                type="target"
                position={Position.Left}
                className="!bg-gray-400"
              />
            )}
          </>
        )}

        {/* Content */}
        <div className="p-3">
          <div className="flex items-start gap-2">
            {icon && <div className="flex-shrink-0 text-lg">{icon}</div>}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-900 truncate">
                {label}
              </div>
              {description && (
                <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {description}
                </div>
              )}
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-2 flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getStatusDotColor(status)}`} />
            <span className="text-xs text-gray-500 capitalize">{status}</span>
          </div>
        </div>
      </div>
    );
  }
);

BaseNode.displayName = 'BaseNode';

function getStatusDotColor(status: NodeStatus): string {
  const colors: Record<NodeStatus, string> = {
    active: 'bg-green-500',
    pending: 'bg-yellow-500',
    completed: 'bg-blue-500',
    blocked: 'bg-red-500',
    error: 'bg-red-600',
    draft: 'bg-gray-400',
    archived: 'bg-gray-300',
  };
  return colors[status];
}

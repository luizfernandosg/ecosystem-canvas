/**
 * Deliverable Node Component
 * Represents project milestone/deliverable (Karma GAP data)
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { DeliverableData } from '../types';

export type DeliverableNodeProps = NodeProps & {
  data: DeliverableData;
};

const statusStyles: Record<string, string> = {
  completed: 'bg-green-100 border-green-400 text-green-800',
  'in-progress': 'bg-blue-50 border-blue-400 text-blue-800',
  pending: 'bg-gray-100 border-gray-300 text-gray-600',
};

export const DeliverableNode = memo<DeliverableNodeProps>(({ data, selected }) => {
  const delData = data as DeliverableData;
  const style = statusStyles[delData.status] || statusStyles.pending;

  return (
    <div
      className={`min-w-[140px] rounded-lg border-2 ${style} shadow-sm transition-all ${
        selected ? 'ring-2 ring-blue-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />

      <div className="p-2">
        <div className="font-medium text-xs text-gray-900 line-clamp-2">{delData.name}</div>
        {delData.milestoneIndex != null && (
          <div className="text-[10px] text-gray-500 mt-0.5">Milestone {delData.milestoneIndex + 1}</div>
        )}
        <div className="mt-1 flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${
            delData.status === 'completed' ? 'bg-green-500' :
            delData.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
          }`} />
          <span className="text-[10px] capitalize">{delData.status.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  );
});

DeliverableNode.displayName = 'DeliverableNode';

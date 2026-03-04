/**
 * Stream Node Component
 * Represents Superfluid or other streaming flows
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { StreamData } from '../types';

export type StreamNodeProps = NodeProps & {
  data: StreamData;
};

const statusColors: Record<string, string> = {
  active: 'bg-green-500',
  paused: 'bg-yellow-500',
  completed: 'bg-gray-400',
};

export const StreamNode = memo<StreamNodeProps>(({ data, selected }) => {
  const streamData = data as StreamData;

  return (
    <div
      className={`min-w-[160px] rounded-lg border-2 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-500 shadow-md transition-all ${
        selected ? 'ring-2 ring-cyan-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-cyan-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500" />

      <div className="p-3">
        <div className="mb-2">
          <div className="font-semibold text-sm text-gray-900">{streamData.name}</div>
          <div className="text-xs text-gray-600 truncate">{streamData.recipient}</div>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Rate</span>
            <span className="font-semibold">{streamData.ratePerSecond} {streamData.token}/s</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${statusColors[streamData.status] || 'bg-gray-400'}`} />
            <span className="text-xs capitalize">{streamData.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

StreamNode.displayName = 'StreamNode';

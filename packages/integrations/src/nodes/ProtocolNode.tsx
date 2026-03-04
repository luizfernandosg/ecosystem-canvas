/**
 * Protocol Node Component
 * Represents a protocol (Karma, Hypercerts, Gardens, etc.)
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { ProtocolData } from '../types';

export type ProtocolNodeProps = NodeProps & {
  data: ProtocolData;
};

export const ProtocolNode = memo<ProtocolNodeProps>(({ data, selected }) => {
  const protocolData = data as ProtocolData;

  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-500 shadow-lg transition-all ${
        selected ? 'ring-2 ring-blue-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
      <Handle type="source" position={Position.Left} className="!bg-blue-500" />
      <Handle type="source" position={Position.Right} className="!bg-blue-500" />

      <div className="p-3">
        <div className="font-bold text-gray-900">{protocolData.name}</div>
        <div className="text-xs text-gray-600">{protocolData.type}</div>
        {protocolData.status && (
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                protocolData.status === 'active'
                  ? 'bg-green-500 animate-pulse'
                  : protocolData.status === 'planned'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
              }`}
            />
            <span className="text-xs text-gray-500 capitalize">{protocolData.status}</span>
          </div>
        )}
      </div>
    </div>
  );
});

ProtocolNode.displayName = 'ProtocolNode';

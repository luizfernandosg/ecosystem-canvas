/**
 * Infrastructure Node Component
 * Represents infrastructure (Safe multisig, EAS attestations, vaults)
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { InfraData } from '../types';

export type InfraNodeProps = NodeProps & {
  data: InfraData;
};

export const InfraNode = memo<InfraNodeProps>(({ data, selected }) => {
  const infraData = data as InfraData;

  return (
    <div
      className={`min-w-[160px] rounded-lg border-2 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-500 shadow-lg transition-all ${
        selected ? 'ring-2 ring-slate-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-slate-500" />
      <Handle type="target" position={Position.Left} className="!bg-slate-500" />
      <Handle type="source" position={Position.Right} className="!bg-slate-500" />

      <div className="p-3">
        <div className="font-bold text-gray-900">{infraData.name}</div>
        <div className="text-xs text-gray-600 capitalize">{infraData.type}</div>
        {infraData.chain && (
          <div className="text-xs text-gray-500 mt-1">{infraData.chain}</div>
        )}
        {infraData.status && (
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                infraData.status === 'active'
                  ? 'bg-green-500 animate-pulse'
                  : infraData.status === 'planned'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
              }`}
            />
            <span className="text-xs text-gray-500 capitalize">{infraData.status}</span>
          </div>
        )}
      </div>
    </div>
  );
});

InfraNode.displayName = 'InfraNode';

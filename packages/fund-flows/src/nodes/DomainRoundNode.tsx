/**
 * Domain Round Node Component
 * Represents domain-specific funding rounds (waste, agroforestry, etc.)
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { DomainRoundData } from '../types';

export type DomainRoundNodeProps = NodeProps & {
  data: DomainRoundData;
};

export const DomainRoundNode = memo<DomainRoundNodeProps>(({ data, selected }) => {
  const roundData = data as DomainRoundData;
  const totalUSD = roundData.totalFunding.reduce((sum, t) => sum + (t.usdValue || 0), 0);

  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-500 shadow-md transition-all ${
        selected ? 'ring-2 ring-teal-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-teal-500" />

      <div className="p-3">
        <div className="mb-2">
          <div className="font-bold text-sm text-gray-900">{roundData.name}</div>
          <div className="text-xs text-teal-600 capitalize">{roundData.domain} Round</div>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Pool</span>
            <span className="font-semibold">${(totalUSD / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Projects</span>
            <span className="font-semibold">{roundData.projects}</span>
          </div>
        </div>
        {roundData.isActive && (
          <div className="mt-2 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-xs text-teal-600">Active</span>
          </div>
        )}
      </div>
    </div>
  );
});

DomainRoundNode.displayName = 'DomainRoundNode';

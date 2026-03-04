/**
 * Funder Node Component
 * Represents an organization providing funds
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { FunderData } from '../types';

export type FunderNodeProps = NodeProps & {
  data: FunderData;
};

export const FunderNode = memo<FunderNodeProps>(({ data, selected }) => {
  const funderData = data as FunderData;
  const totalUSD = funderData.totalFunding.reduce((sum, t) => sum + (t.usdValue || 0), 0);

  return (
    <div
      className={`min-w-[220px] rounded-lg border-2 bg-gradient-to-br from-green-50 to-green-100 border-green-500 shadow-lg transition-all ${
        selected ? 'ring-2 ring-green-600' : ''
      }`}
    >
      <Handle type="source" position={Position.Bottom} className="!bg-green-500" />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {funderData.logo && (
            <img src={funderData.logo} alt={funderData.name} className="w-10 h-10 rounded-full" />
          )}
          <div className="flex-1">
            <div className="font-bold text-gray-900">{funderData.name}</div>
            <div className="text-xs text-gray-600">{funderData.type}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Funding</span>
            <span className="font-semibold text-green-700">
              ${(totalUSD / 1000000).toFixed(1)}M
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Programs</span>
            <span className="font-semibold">{funderData.programs}</span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500">Active Funder</span>
        </div>
      </div>
    </div>
  );
});

FunderNode.displayName = 'FunderNode';

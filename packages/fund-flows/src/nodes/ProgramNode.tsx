/**
 * Program Node Component
 * Represents a grant program
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { ProgramData } from '../types';

const typeColors: Record<string, string> = {
  QuadraticFunding: 'from-purple-50 to-purple-100 border-purple-500',
  DirectGrants: 'from-blue-50 to-blue-100 border-blue-500',
  RetroFunding: 'from-orange-50 to-orange-100 border-orange-500',
  Bounties: 'from-pink-50 to-pink-100 border-pink-500',
};

export type ProgramNodeProps = NodeProps & {
  data: ProgramData;
};

export const ProgramNode = memo<ProgramNodeProps>(({ data, selected }) => {
  const programData = data as ProgramData;
  const totalUSD = programData.totalFunding.reduce((sum, t) => sum + (t.usdValue || 0), 0);
  const colorClass = typeColors[programData.type];

  return (
    <div
      className={`min-w-[200px] rounded-lg border-2 bg-gradient-to-br ${colorClass} shadow-lg transition-all ${
        selected ? 'ring-2 ring-blue-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />

      <div className="p-3">
        {/* Header */}
        <div className="mb-3">
          <div className="font-bold text-sm text-gray-900">{programData.name}</div>
          <div className="text-xs text-gray-600 mt-1">{programData.type.replace(/([A-Z])/g, ' $1').trim()}</div>
        </div>

        {/* Stats */}
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Pool Size</span>
            <span className="font-semibold">${(totalUSD / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Applications</span>
            <span className="font-semibold">{programData.applications}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Projects</span>
            <span className="font-semibold">{programData.projects}</span>
          </div>
        </div>

        {/* Status */}
        {programData.isActive && (
          <div className="mt-2 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-green-600">Active</span>
          </div>
        )}
      </div>
    </div>
  );
});

ProgramNode.displayName = 'ProgramNode';

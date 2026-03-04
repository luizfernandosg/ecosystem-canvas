/**
 * Treasury Node Component
 * Represents a multi-sig treasury or safe
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { TreasuryData } from '../types';

export type TreasuryNodeProps = NodeProps & {
  data: TreasuryData;
};

export const TreasuryNode = memo<TreasuryNodeProps>(({ data, selected }) => {
  const treasuryData = data as TreasuryData;
  const totalUSD = treasuryData.balance.reduce((sum, t) => sum + (t.usdValue || 0), 0);

  return (
    <div
      className={`min-w-[200px] rounded-lg border-2 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-500 shadow-lg transition-all ${
        selected ? 'ring-2 ring-indigo-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-indigo-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-indigo-500" />

      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div className="font-bold text-gray-900">{treasuryData.name}</div>
          </div>
          <div className="text-xs text-gray-600 mt-1">{treasuryData.chain}</div>
        </div>

        {/* Balance */}
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">Treasury Balance</div>
          <div className="text-lg font-bold text-indigo-700">
            ${(totalUSD / 1000000).toFixed(2)}M
          </div>
        </div>

        {/* Multi-sig info */}
        <div className="flex items-center justify-between text-xs bg-white/50 rounded px-2 py-1.5">
          <span className="text-gray-600">Multi-sig</span>
          <span className="font-semibold">
            {treasuryData.threshold}/{treasuryData.signers}
          </span>
        </div>
      </div>
    </div>
  );
});

TreasuryNode.displayName = 'TreasuryNode';

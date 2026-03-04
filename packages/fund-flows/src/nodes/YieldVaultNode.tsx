/**
 * Yield Vault Node Component
 * Represents yield-based funding (Octant, Impact Stake/Lido)
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { YieldVaultData } from '../types';

export type YieldVaultNodeProps = NodeProps & {
  data: YieldVaultData;
};

export const YieldVaultNode = memo<YieldVaultNodeProps>(({ data, selected }) => {
  const vaultData = data as YieldVaultData;
  const totalUSD = vaultData.balance.reduce((sum, t) => sum + (t.usdValue || 0), 0);

  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-500 shadow-lg transition-all ${
        selected ? 'ring-2 ring-amber-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-amber-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-amber-500" />

      <div className="p-3">
        <div className="mb-2">
          <div className="font-bold text-sm text-gray-900">{vaultData.name}</div>
          <div className="text-xs text-gray-600">{vaultData.type} Vault</div>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Balance</span>
            <span className="font-semibold">${(totalUSD / 1000).toFixed(1)}K</span>
          </div>
          {vaultData.apy != null && (
            <div className="flex justify-between">
              <span className="text-gray-600">APY</span>
              <span className="font-semibold text-amber-700">{vaultData.apy}%</span>
            </div>
          )}
          {vaultData.recipients != null && (
            <div className="flex justify-between">
              <span className="text-gray-600">Recipients</span>
              <span className="font-semibold">{vaultData.recipients}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

YieldVaultNode.displayName = 'YieldVaultNode';

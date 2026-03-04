/**
 * Application Node Component
 * Represents an application (Green Goods, Cookie Jar, etc.)
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { ApplicationData } from '../types';

export type ApplicationNodeProps = NodeProps & {
  data: ApplicationData;
};

export const ApplicationNode = memo<ApplicationNodeProps>(({ data, selected }) => {
  const appData = data as ApplicationData;

  return (
    <div
      className={`min-w-[200px] rounded-lg border-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-500 shadow-lg transition-all ${
        selected ? 'ring-2 ring-purple-600' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-purple-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
      <Handle type="target" position={Position.Left} className="!bg-purple-500" />
      <Handle type="source" position={Position.Right} className="!bg-purple-500" />

      <div className="p-3">
        <div className="font-bold text-gray-900">{appData.name}</div>
        {appData.description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">{appData.description}</div>
        )}
        {appData.protocols && appData.protocols.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            {appData.protocols.length} protocol{appData.protocols.length !== 1 ? 's' : ''} integrated
          </div>
        )}
        {appData.status && (
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                appData.status === 'active'
                  ? 'bg-green-500 animate-pulse'
                  : appData.status === 'planned'
                    ? 'bg-yellow-500'
                    : 'bg-gray-400'
              }`}
            />
            <span className="text-xs text-gray-500 capitalize">{appData.status}</span>
          </div>
        )}
      </div>
    </div>
  );
});

ApplicationNode.displayName = 'ApplicationNode';

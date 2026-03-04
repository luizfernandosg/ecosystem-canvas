/**
 * Project Node Component
 * Represents a funded project
 */

import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import type { ProjectData } from '../types';

export type ProjectNodeProps = NodeProps & {
  data: ProjectData;
};

export const ProjectNode = memo<ProjectNodeProps>(({ data, selected }) => {
  const projectData = data as ProjectData;
  const totalUSD = projectData.totalFunding.reduce((sum, t) => sum + (t.usdValue || 0), 0);
  const progress = projectData.milestones > 0 ? (projectData.completedMilestones / projectData.milestones) * 100 : 0;

  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 bg-white border-gray-300 shadow-md transition-all ${
        selected ? 'ring-2 ring-blue-600 border-blue-500' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />

      <div className="p-3">
        {/* Header */}
        <div className="mb-2">
          <div className="font-semibold text-sm text-gray-900">{projectData.name}</div>
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
            {projectData.description}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-1.5 text-xs mb-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Funding</span>
            <span className="font-semibold text-green-600">
              ${(totalUSD / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Team</span>
            <span className="font-semibold">{projectData.team} members</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Milestones</span>
            <span className="font-semibold">
              {projectData.completedMilestones}/{projectData.milestones}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectNode.displayName = 'ProjectNode';

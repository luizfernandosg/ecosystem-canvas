/**
 * Node Toolbar Component
 * Contextual toolbar that appears on node hover/selection
 */

import React from 'react';
import { NodeToolbar as ReactFlowNodeToolbar, type NodeToolbarProps as ReactFlowNodeToolbarProps } from '@xyflow/react';

export interface NodeToolbarProps extends ReactFlowNodeToolbarProps {
  actions?: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
}

export const NodeToolbar: React.FC<NodeToolbarProps> = ({
  actions = [],
  children,
  ...props
}) => {
  return (
    <ReactFlowNodeToolbar {...props}>
      <div className="flex items-center gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title={action.label}
          >
            {action.icon}
          </button>
        ))}
        {children}
      </div>
    </ReactFlowNodeToolbar>
  );
};

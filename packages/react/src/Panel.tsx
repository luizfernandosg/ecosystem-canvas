/**
 * Side Panel Component
 * Customizable side panel for canvas metadata/controls
 */

import React from 'react';
import { Panel as ReactFlowPanel, type PanelPosition } from '@xyflow/react';

export interface PanelProps {
  position?: PanelPosition;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const Panel: React.FC<PanelProps> = ({
  position = 'top-right',
  title,
  children,
  className = '',
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <ReactFlowPanel position={position} className={className}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm">
        {title && (
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
            {collapsible && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${
                    collapsed ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        {!collapsed && <div className="p-3">{children}</div>}
      </div>
    </ReactFlowPanel>
  );
};

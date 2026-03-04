/**
 * Canvas Toolbar Component
 * Customizable toolbar for canvas actions
 */

import React from 'react';
import { Panel, type PanelPosition } from '@xyflow/react';

export interface ToolbarProps {
  position?: PanelPosition;
  children?: React.ReactNode;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  position = 'top-left',
  children,
  className = '',
}) => {
  return (
    <Panel position={position} className={className}>
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        {children}
      </div>
    </Panel>
  );
};

export interface ToolbarButtonProps {
  icon: React.ReactNode;
  label?: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  onClick,
  active = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded transition-colors ${
        active
          ? 'bg-blue-100 text-blue-600'
          : 'hover:bg-gray-100 text-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={label}
    >
      {icon}
    </button>
  );
};

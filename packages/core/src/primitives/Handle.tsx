/**
 * Custom Handle Component
 * Enhanced version of React Flow's Handle with additional styling
 */

import React from 'react';
import { Handle as ReactFlowHandle, type HandleProps as ReactFlowHandleProps } from '@xyflow/react';

export interface HandleProps extends Omit<ReactFlowHandleProps, 'id'> {
  id?: string;
  label?: string;
  variant?: 'default' | 'capital' | 'data' | 'permission' | 'governance';
}

const variantColors = {
  default: 'bg-gray-400',
  capital: 'bg-green-500',
  data: 'bg-blue-500',
  permission: 'bg-purple-500',
  governance: 'bg-orange-500',
};

export const CustomHandle: React.FC<HandleProps> = ({
  id,
  label,
  variant = 'default',
  className = '',
  ...props
}) => {
  return (
    <div className="relative group">
      <ReactFlowHandle
        id={id}
        className={`!w-3 !h-3 !border-2 !border-white ${variantColors[variant]} ${className}`}
        {...props}
      />
      {label && (
        <div className="absolute hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap -top-8 left-1/2 -translate-x-1/2 z-10">
          {label}
        </div>
      )}
    </div>
  );
};

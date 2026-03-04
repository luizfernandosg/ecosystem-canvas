/**
 * Enhanced Minimap Component
 * Customizable minimap with additional features
 */

import React from 'react';
import { MiniMap as ReactFlowMiniMap, type MiniMapProps as ReactFlowMiniMapProps } from '@xyflow/react';
import { useTheme } from '@ecosystem/canvas-core/themes';

export interface MinimapProps extends Omit<ReactFlowMiniMapProps, 'nodeColor'> {
  showBorder?: boolean;
}

export const Minimap: React.FC<MinimapProps> = ({
  showBorder = true,
  ...props
}) => {
  const { theme } = useTheme();

  const nodeColor = (node: any) => {
    switch (node.data?.status) {
      case 'active':
        return theme.colors.active;
      case 'pending':
        return theme.colors.pending;
      case 'completed':
        return theme.colors.completed;
      case 'error':
        return theme.colors.error;
      case 'draft':
        return theme.colors.draft;
      case 'archived':
        return theme.colors.archived;
      default:
        return theme.colors.gray;
    }
  };

  return (
    <ReactFlowMiniMap
      nodeColor={nodeColor}
      maskColor={`${theme.colors.dark}20`}
      style={{
        backgroundColor: theme.colors.background,
        border: showBorder ? `2px solid ${theme.colors.border}` : 'none',
        borderRadius: theme.borders.radius,
      }}
      {...props}
    />
  );
};

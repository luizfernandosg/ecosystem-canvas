/**
 * EcosystemWidget - Embeddable miniapp wrapper for ecosystem canvas
 * Can be used as React component or embedded via iframe with PostMessage API
 */

import React, { useEffect, useState } from 'react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';
import type { NodeTypes, EdgeTypes } from '@xyflow/react';
import type { EcosystemWidgetProps, WidgetTheme } from './types';
import { postToParent, createParentMessageListener } from './postMessage';

export interface EcosystemWidgetComponentProps extends EcosystemWidgetProps {
  /** Node types to render (from integrations or fund-flows packages) */
  nodeTypes: NodeTypes;
  /** Edge types to render */
  edgeTypes: EdgeTypes;
  /** Nodes to display */
  nodes: CanvasNode[];
  /** Edges to display */
  edges: CanvasEdge[];
}

export const EcosystemWidget: React.FC<EcosystemWidgetComponentProps> = ({
  theme: initialTheme = 'regen',
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  showControls = true,
  showBackground = true,
  onNodeClick,
  onExport,
  onNavigate,
  iframeMode = false,
  className = '',
}) => {
  const [theme, setTheme] = useState<WidgetTheme>(initialTheme as WidgetTheme);
  const inIframe = typeof window !== 'undefined' && window.self !== window.top;
  const usePostMessage = iframeMode || inIframe;

  useEffect(() => {
    if (!usePostMessage) return;
    postToParent({ type: 'ECOSYSTEM_READY', payload: { theme, nodeCount: nodes.length, edgeCount: edges.length } });
  }, [usePostMessage, theme, nodes.length, edges.length]);

  useEffect(() => {
    if (!usePostMessage) return;
    return createParentMessageListener((msg) => {
      switch (msg.type) {
        case 'ECOSYSTEM_SET_THEME':
          if (msg.payload && typeof msg.payload === 'object' && 'theme' in msg.payload) {
            setTheme((msg.payload as { theme: WidgetTheme }).theme);
          }
          break;
        case 'ECOSYSTEM_FIT_VIEW':
          // Canvas handles fitView internally; parent can trigger via re-mount or future API
          break;
        default:
          break;
      }
    });
  }, [usePostMessage]);

  const handleNodeClick = React.useCallback(
    (_event: React.MouseEvent, node: unknown) => {
      const n = node as { id: string; data: unknown };
      onNodeClick?.(n.id, n.data);
      if (usePostMessage) {
        postToParent({ type: 'ECOSYSTEM_NODE_CLICK', payload: { nodeId: n.id, data: n.data } });
      }
    },
    [onNodeClick, usePostMessage]
  );

  return (
    <div className={`ecosystem-widget w-full h-full min-h-[300px] ${className}`}>
      <CanvasProvider theme={theme} initialNodes={nodes} initialEdges={edges}>
        <Canvas
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          showBackground={showBackground}
          showControls={showControls}
          fitView
          onNodeClick={handleNodeClick}
        />
      </CanvasProvider>
    </div>
  );
};

EcosystemWidget.displayName = 'EcosystemWidget';

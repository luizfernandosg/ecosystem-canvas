/**
 * Main Canvas Component
 * Wrapper around React Flow with custom features
 */

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type NodeTypes,
  type EdgeTypes,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCanvas } from './CanvasProvider';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

export interface CanvasProps {
  children?: React.ReactNode;
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  showBackground?: boolean;
  showControls?: boolean;
  fitView?: boolean;
  className?: string;
  onNodeClick?: (event: React.MouseEvent, node: unknown) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  children,
  nodeTypes,
  edgeTypes,
  showBackground = true,
  showControls = true,
  fitView = true,
  className = '',
  onNodeClick,
}) => {
  const { nodes, edges, setNodes, setEdges, setViewport, setSelection } = useCanvas();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds as any) as CanvasNode[]);
    },
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds as any) as CanvasEdge[]);
    },
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds as any) as CanvasEdge[]);
    },
    [setEdges]
  );

  const onSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
      setSelection({
        nodes: nodes.map((n) => n.id),
        edges: edges.map((e) => e.id),
      });
    },
    [setSelection]
  );

  const onMove = useCallback(
    (_event: any, viewport: any) => {
      setViewport(viewport);
    },
    [setViewport]
  );

  return (
    <div className={`w-full h-full ${className}`}>
      <ReactFlow
        nodes={nodes as any}
        edges={edges as any}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        onMove={onMove}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView={fitView}
        attributionPosition="bottom-left"
      >
        {showBackground && <Background />}
        {showControls && <Controls />}
        {children}
      </ReactFlow>
    </div>
  );
};

// Type for Canvas with sub-components
type CanvasComponent = React.FC<CanvasProps> & {
  Toolbar: React.FC<{ children: React.ReactNode }>;
  Minimap: React.FC<{ children: React.ReactNode }>;
  Panel: React.FC<{ children: React.ReactNode }>;
};

// Sub-components for composable API
const CanvasToolbar: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const CanvasMinimap: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const CanvasPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

// Attach sub-components
(Canvas as CanvasComponent).Toolbar = CanvasToolbar;
(Canvas as CanvasComponent).Minimap = CanvasMinimap;
(Canvas as CanvasComponent).Panel = CanvasPanel;

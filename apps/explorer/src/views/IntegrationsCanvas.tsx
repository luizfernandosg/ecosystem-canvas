import { useCallback, useEffect, useState } from 'react';
import { Canvas, CanvasProvider, useCanvas } from '@ecosystem/canvas-react';
import { ProtocolNode, ApplicationNode, InfraNode, IntegrationEdge } from '@ecosystem/canvas-integrations';
import { MockEcosystemAdapter, mockIntegrationsExpandable } from '@ecosystem/canvas-data';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

const nodeTypes = {
  protocol: ProtocolNode,
  application: ApplicationNode,
  infra: InfraNode,
};

const edgeTypes = {
  integration: IntegrationEdge,
};

function IntegrationsCanvasInner({ onNodeClickExternal }: { onNodeClickExternal?: (id: string, data: unknown) => void }) {
  const { nodes, edges, setNodes, setEdges } = useCanvas();
  const [, setExpandedNodes] = useState<Set<string>>(new Set());

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: unknown) => {
      const n = node as { id: string; data: unknown };
      onNodeClickExternal?.(n.id, n.data);
      const expandable = mockIntegrationsExpandable[n.id];
      if (expandable) {
        setExpandedNodes((prev) => {
          const next = new Set(prev);
          if (next.has(n.id)) {
            next.delete(n.id);
            setNodes((nds) => nds.filter((nd) => !expandable.nodes.some((sn: CanvasNode) => sn.id === nd.id)));
            setEdges((eds) => eds.filter((ed) => !expandable.edges.some((se: CanvasEdge) => se.id === ed.id)));
          } else {
            next.add(n.id);
            setNodes((nds) => [...nds, ...expandable.nodes]);
            setEdges((eds) => [...eds, ...expandable.edges]);
          }
          return next;
        });
      }
    },
    [setNodes, setEdges, onNodeClickExternal]
  );

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges, version: '1.0' }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'integrations-canvas.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full relative">
      <button
        onClick={handleExport}
        className="absolute top-2 right-2 z-10 px-2 py-1 text-xs bg-white border border-gray-300 rounded shadow hover:bg-gray-50"
      >
        Export JSON
      </button>
      <Canvas
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        showBackground
        showControls
        fitView
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}

interface IntegrationsCanvasProps {
  theme?: 'regen' | 'functional' | 'daocore';
  onNodeClickExternal?: (id: string, data: unknown) => void;
}

export function IntegrationsCanvas({ theme = 'regen', onNodeClickExternal }: IntegrationsCanvasProps) {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adapter = new MockEcosystemAdapter();
    adapter.load('integrations').then((result) => {
      setNodes(result.nodes);
      setEdges(result.edges);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading integrations...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <CanvasProvider theme={theme} initialNodes={nodes} initialEdges={edges}>
        <IntegrationsCanvasInner onNodeClickExternal={onNodeClickExternal} />
      </CanvasProvider>
    </div>
  );
}

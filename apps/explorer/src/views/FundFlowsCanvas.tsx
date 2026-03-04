import { useCallback, useEffect, useState } from 'react';
import { Canvas, CanvasProvider, useCanvas } from '@ecosystem/canvas-react';
import {
  FunderNode,
  ProgramNode,
  ProjectNode,
  TreasuryNode,
  YieldVaultNode,
  StreamNode,
  DomainRoundNode,
  DeliverableNode,
  CapitalFlowEdge,
} from '@ecosystem/canvas-fund-flows';
import { InfraNode } from '@ecosystem/canvas-integrations';
import {
  MockEcosystemAdapter,
  KarmaGAPAdapter,
  mockFundFlowsExpandable,
} from '@ecosystem/canvas-data';
import type { DataAdapter } from '@ecosystem/canvas-data';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

const nodeTypes = {
  funder: FunderNode,
  program: ProgramNode,
  project: ProjectNode,
  treasury: TreasuryNode,
  'yield-vault': YieldVaultNode,
  stream: StreamNode,
  'domain-round': DomainRoundNode,
  deliverable: DeliverableNode,
  infra: InfraNode,
};

const edgeTypes = {
  capital: CapitalFlowEdge,
};

function FundFlowsCanvasInner({ onNodeClickExternal }: { onNodeClickExternal?: (id: string, data: unknown) => void }) {
  const { nodes, edges, setNodes, setEdges } = useCanvas();

  const handleExport = useCallback(() => {
    const data = JSON.stringify({ nodes, edges, version: '1.0' }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fund-flows-canvas.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: unknown) => {
      const n = node as { id: string; data: unknown };
      onNodeClickExternal?.(n.id, n.data);
      const expandable = mockFundFlowsExpandable[n.id];
      if (expandable) {
        setNodes((nds) => {
          const expandedIds = new Set(expandable.nodes.map((sn: CanvasNode) => sn.id));
          const isExpanded = nds.some((nd) => expandedIds.has(nd.id));
          if (isExpanded) {
            return nds.filter((nd) => !expandedIds.has(nd.id));
          }
          return [...nds, ...expandable.nodes];
        });
        setEdges((eds) => {
          const expandedEdgeIds = new Set(expandable.edges.map((se: CanvasEdge) => se.id));
          const isExpanded = eds.some((ed) => expandedEdgeIds.has(ed.id));
          if (isExpanded) {
            return eds.filter((ed) => !expandedEdgeIds.has(ed.id));
          }
          return [...eds, ...expandable.edges];
        });
      }
    },
    [setNodes, setEdges, onNodeClickExternal]
  );

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

type DataSource = 'mock' | 'karma';

interface FundFlowsCanvasProps {
  theme?: 'regen' | 'functional' | 'daocore';
  onNodeClickExternal?: (id: string, data: unknown) => void;
}

export function FundFlowsCanvas({ theme = 'regen', onNodeClickExternal }: FundFlowsCanvasProps) {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<DataSource>('mock');

  useEffect(() => {
    setLoading(true);
    const adapter: DataAdapter =
      dataSource === 'karma' ? new KarmaGAPAdapter() : new MockEcosystemAdapter();
    adapter.load('fund-flows').then((result) => {
      setNodes(result.nodes);
      setEdges(result.edges);
      setLoading(false);
    });
  }, [dataSource]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <span className="text-sm text-gray-600">Data:</span>
        <select
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value as DataSource)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
        >
          <option value="mock">Mock (expandable)</option>
          <option value="karma">Karma GAP (Live)</option>
        </select>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-gray-500">Loading fund flows...</div>
        </div>
      ) : (
        <div className="flex-1 min-h-0">
          <CanvasProvider theme={theme} initialNodes={nodes} initialEdges={edges}>
            <FundFlowsCanvasInner onNodeClickExternal={onNodeClickExternal} />
          </CanvasProvider>
        </div>
      )}
    </div>
  );
}

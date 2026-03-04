import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import {
  FunderNode,
  ProgramNode,
  ProjectNode,
  CapitalFlowEdge,
} from '@ecosystem/canvas-fund-flows';
import { fundFlowNodes, fundFlowEdges } from '../data/fundFlowData';

const nodeTypes = {
  funder: FunderNode,
  program: ProgramNode,
  project: ProjectNode,
};

const edgeTypes = {
  capital: CapitalFlowEdge,
};

export function FundFlowExample() {
  return (
    <CanvasProvider theme="regen" initialNodes={fundFlowNodes} initialEdges={fundFlowEdges}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          showBackground
          showControls
        />
      </div>
    </CanvasProvider>
  );
}

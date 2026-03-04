import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { BaseNode } from '@ecosystem/canvas-core/primitives';
import { basicNodes, basicEdges } from '../data/basicData';

const nodeTypes = {
  base: BaseNode,
};

export function BasicCanvasExample() {
  return (
    <CanvasProvider theme="functional" initialNodes={basicNodes} initialEdges={basicEdges}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </div>
    </CanvasProvider>
  );
}

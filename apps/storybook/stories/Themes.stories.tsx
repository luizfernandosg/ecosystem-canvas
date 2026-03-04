import type { Meta, StoryObj } from '@storybook/react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { BaseNode } from '@ecosystem/canvas-core/primitives';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

const meta: Meta = {
  title: 'Themes',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const sampleNodes: CanvasNode[] = [
  {
    id: '1',
    type: 'base',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1', description: 'First node', status: 'active' },
  },
  {
    id: '2',
    type: 'base',
    position: { x: 300, y: 100 },
    data: { label: 'Node 2', description: 'Second node', status: 'pending' },
  },
  {
    id: '3',
    type: 'base',
    position: { x: 200, y: 250 },
    data: { label: 'Node 3', description: 'Third node', status: 'completed' },
  },
];

const sampleEdges: CanvasEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const nodeTypes = {
  base: BaseNode,
};

export const Functional: Story = {
  render: () => (
    <div style={{ width: '100%', height: '500px' }}>
      <CanvasProvider theme="functional" initialNodes={sampleNodes} initialEdges={sampleEdges}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </CanvasProvider>
    </div>
  ),
};

export const DAOCore: Story = {
  render: () => (
    <div style={{ width: '100%', height: '500px' }}>
      <CanvasProvider theme="daocore" initialNodes={sampleNodes} initialEdges={sampleEdges}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </CanvasProvider>
    </div>
  ),
};

export const Regen: Story = {
  render: () => (
    <div style={{ width: '100%', height: '500px' }}>
      <CanvasProvider theme="regen" initialNodes={sampleNodes} initialEdges={sampleEdges}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </CanvasProvider>
    </div>
  ),
};

export const Ocean: Story = {
  render: () => (
    <div style={{ width: '100%', height: '500px' }}>
      <CanvasProvider theme="ocean" initialNodes={sampleNodes} initialEdges={sampleEdges}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </CanvasProvider>
    </div>
  ),
};

export const Forest: Story = {
  render: () => (
    <div style={{ width: '100%', height: '500px' }}>
      <CanvasProvider theme="forest" initialNodes={sampleNodes} initialEdges={sampleEdges}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </CanvasProvider>
    </div>
  ),
};

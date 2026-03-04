import type { Meta, StoryObj } from '@storybook/react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { BaseNode } from '@ecosystem/canvas-core/primitives';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

const meta: Meta<typeof Canvas> = {
  title: 'Components/Canvas',
  component: Canvas,
  tags: ['autodocs'],
  decorators: [
    (Story, args) => (
      <div style={{ width: '100%', height: '600px' }}>
        <CanvasProvider
          theme={args.args.theme || 'functional'}
          initialNodes={args.args.initialNodes || []}
          initialEdges={args.args.initialEdges || []}
        >
          <Story />
        </CanvasProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Canvas>;

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

export const Default: Story = {
  args: {
    nodeTypes,
    initialNodes: sampleNodes,
    initialEdges: sampleEdges,
    theme: 'functional',
    fitView: true,
    showBackground: true,
    showControls: true,
  },
};

export const WithoutControls: Story = {
  args: {
    ...Default.args,
    showControls: false,
  },
};

export const WithoutBackground: Story = {
  args: {
    ...Default.args,
    showBackground: false,
  },
};

export const RegenTheme: Story = {
  args: {
    ...Default.args,
    theme: 'regen',
  },
};

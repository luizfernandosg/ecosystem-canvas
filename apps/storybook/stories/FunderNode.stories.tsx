import type { Meta, StoryObj } from '@storybook/react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { FunderNode, ProgramNode, ProjectNode, CapitalFlowEdge } from '@ecosystem/canvas-fund-flows';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

const meta: Meta<typeof FunderNode> = {
  title: 'Fund Flows/FunderNode',
  component: FunderNode,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '400px' }}>
        <CanvasProvider theme="regen">
          <Canvas
            nodeTypes={{ funder: FunderNode }}
            fitView
            showBackground
            showControls
          />
        </CanvasProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FunderNode>;

const funderNode: CanvasNode = {
  id: 'funder-1',
  type: 'funder',
  position: { x: 250, y: 150 },
  data: {
    name: 'Gitcoin',
    type: 'DAO',
    totalFunding: [
      { amount: '5000000', token: 'USD', chain: 'ethereum', usdValue: 5000000 },
    ],
    programs: 12,
  },
};

export const Default: Story = {
  args: {
    data: funderNode.data,
    selected: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '400px' }}>
        <CanvasProvider theme="regen" initialNodes={[funderNode]}>
          <Canvas
            nodeTypes={{ funder: FunderNode }}
            fitView
            showBackground
            showControls
          />
        </CanvasProvider>
      </div>
    ),
  ],
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
  decorators: Default.decorators,
};

export const WithLogo: Story = {
  args: {
    data: {
      ...funderNode.data,
      logo: 'https://via.placeholder.com/40',
    },
  },
  decorators: Default.decorators,
};

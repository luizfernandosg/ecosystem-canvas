import type { Meta, StoryObj } from '@storybook/react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { ProgramNode } from '@ecosystem/canvas-fund-flows';
import type { CanvasNode } from '@ecosystem/canvas-core';

const meta: Meta<typeof ProgramNode> = {
  title: 'Fund Flows/ProgramNode',
  component: ProgramNode,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgramNode>;

const programNode: CanvasNode = {
  id: 'program-1',
  type: 'program',
  position: { x: 250, y: 150 },
  data: {
    name: 'GG19 OSS Round',
    type: 'QuadraticFunding',
    totalFunding: [
      { amount: '500000', token: 'USD', chain: 'optimism', usdValue: 500000 },
    ],
    applications: 234,
    projects: 89,
    isActive: true,
  },
};

export const Default: Story = {
  args: {
    data: programNode.data,
    selected: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '400px' }}>
        <CanvasProvider theme="regen" initialNodes={[programNode]}>
          <Canvas
            nodeTypes={{ program: ProgramNode }}
            fitView
            showBackground
            showControls
          />
        </CanvasProvider>
      </div>
    ),
  ],
};

export const DirectGrants: Story = {
  args: {
    data: {
      ...programNode.data,
      type: 'DirectGrants',
      name: 'Direct Grants Program',
    },
  },
  decorators: Default.decorators,
};

export const RetroFunding: Story = {
  args: {
    data: {
      ...programNode.data,
      type: 'RetroFunding',
      name: 'Retroactive Funding Round',
    },
  },
  decorators: Default.decorators,
};

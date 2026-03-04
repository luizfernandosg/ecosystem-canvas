import type { Meta, StoryObj } from '@storybook/react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { ProjectNode } from '@ecosystem/canvas-fund-flows';
import type { CanvasNode } from '@ecosystem/canvas-core';

const meta: Meta<typeof ProjectNode> = {
  title: 'Fund Flows/ProjectNode',
  component: ProjectNode,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectNode>;

const projectNode: CanvasNode = {
  id: 'project-1',
  type: 'project',
  position: { x: 250, y: 150 },
  data: {
    name: 'Open Source Project',
    description: 'Building public goods infrastructure',
    team: 5,
    totalFunding: [
      { amount: '15000', token: 'USD', chain: 'optimism', usdValue: 15000 },
    ],
    milestones: 4,
    completedMilestones: 2,
  },
};

export const Default: Story = {
  args: {
    data: projectNode.data,
    selected: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '400px' }}>
        <CanvasProvider theme="regen" initialNodes={[projectNode]}>
          <Canvas
            nodeTypes={{ project: ProjectNode }}
            fitView
            showBackground
            showControls
          />
        </CanvasProvider>
      </div>
    ),
  ],
};

export const HighProgress: Story = {
  args: {
    data: {
      ...projectNode.data,
      milestones: 10,
      completedMilestones: 8,
    },
  },
  decorators: Default.decorators,
};

export const Completed: Story = {
  args: {
    data: {
      ...projectNode.data,
      milestones: 5,
      completedMilestones: 5,
    },
  },
  decorators: Default.decorators,
};

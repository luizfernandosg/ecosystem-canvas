import type { Meta, StoryObj } from '@storybook/react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import {
  FunderNode,
  ProgramNode,
  ProjectNode,
  CapitalFlowEdge,
} from '@ecosystem/canvas-fund-flows';
import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

const meta: Meta<typeof CapitalFlowEdge> = {
  title: 'Fund Flows/CapitalFlowEdge',
  component: CapitalFlowEdge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CapitalFlowEdge>;

const nodes: CanvasNode[] = [
  {
    id: 'funder-1',
    type: 'funder',
    position: { x: 250, y: 50 },
    data: {
      name: 'Gitcoin',
      type: 'DAO',
      totalFunding: [
        { amount: '5000000', token: 'USD', chain: 'ethereum', usdValue: 5000000 },
      ],
      programs: 12,
    },
  },
  {
    id: 'program-1',
    type: 'program',
    position: { x: 250, y: 200 },
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
  },
  {
    id: 'project-1',
    type: 'project',
    position: { x: 250, y: 350 },
    data: {
      name: 'Open Source Project',
      description: 'Building public goods',
      team: 5,
      totalFunding: [
        { amount: '15000', token: 'USD', chain: 'optimism', usdValue: 15000 },
      ],
      milestones: 4,
      completedMilestones: 2,
    },
  },
];

const edges: CanvasEdge[] = [
  {
    id: 'e-f1-p1',
    source: 'funder-1',
    target: 'program-1',
    type: 'capital',
    data: { amount: 500000, token: 'USD', velocity: 0.8, status: 'active' },
  },
  {
    id: 'e-p1-pr1',
    source: 'program-1',
    target: 'project-1',
    type: 'capital',
    data: { amount: 15000, token: 'USD', velocity: 0.6, status: 'completed' },
  },
];

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px' }}>
        <CanvasProvider theme="regen" initialNodes={nodes} initialEdges={edges}>
          <Canvas
            nodeTypes={{
              funder: FunderNode,
              program: ProgramNode,
              project: ProjectNode,
            }}
            edgeTypes={{ capital: CapitalFlowEdge }}
            fitView
            showBackground
            showControls
          />
        </CanvasProvider>
      </div>
    ),
  ],
};

export const ActiveFlow: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '500px' }}>
        <CanvasProvider
          theme="regen"
          initialNodes={nodes}
          initialEdges={[
            {
              ...edges[0],
              data: { ...edges[0].data, status: 'active', velocity: 1.0 },
            },
          ]}
        >
          <Canvas
            nodeTypes={{
              funder: FunderNode,
              program: ProgramNode,
              project: ProjectNode,
            }}
            edgeTypes={{ capital: CapitalFlowEdge }}
            fitView
            showBackground
            showControls
          />
        </CanvasProvider>
      </div>
    ),
  ],
};

import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

export const fundFlowNodes: CanvasNode[] = [
  {
    id: 'funder-1',
    type: 'funder',
    position: { x: 100, y: 100 },
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
    position: { x: 100, y: 300 },
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
    position: { x: 100, y: 500 },
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
  {
    id: 'project-2',
    type: 'project',
    position: { x: 400, y: 500 },
    data: {
      name: 'Climate Action',
      description: 'Carbon removal initiatives',
      team: 8,
      totalFunding: [
        { amount: '25000', token: 'USD', chain: 'optimism', usdValue: 25000 },
      ],
      milestones: 6,
      completedMilestones: 3,
    },
  },
];

export const fundFlowEdges: CanvasEdge[] = [
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
  {
    id: 'e-p1-pr2',
    source: 'program-1',
    target: 'project-2',
    type: 'capital',
    data: { amount: 25000, token: 'USD', velocity: 0.7, status: 'active' },
  },
];

/**
 * Mock ecosystem adapter - realistic static data based on actual ecosystem
 * Green Goods, ReFi DAO, Greenpill, Bloom, etc.
 */

import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';
import type { DataAdapter, AdapterResult } from '../types';

export const mockIntegrationsNodes: CanvasNode[] = [
  {
    id: 'green-goods',
    type: 'application',
    position: { x: 400, y: 300 },
    data: {
      name: 'Green Goods',
      description: 'Impact tracking and garden management for local hubs',
      protocols: ['Karma GAP', 'Hypercerts', 'Gardens', 'Octant', 'Hats', 'Cookie Jar', 'Unlock', 'RevNets'],
      status: 'active',
    },
  },
  {
    id: 'karma-gap',
    type: 'protocol',
    position: { x: 200, y: 100 },
    data: { name: 'Karma GAP', type: 'Karma GAP', status: 'active' },
  },
  {
    id: 'hypercerts',
    type: 'protocol',
    position: { x: 400, y: 100 },
    data: { name: 'Hypercerts', type: 'Hypercerts', status: 'active' },
  },
  {
    id: 'gardens',
    type: 'protocol',
    position: { x: 600, y: 100 },
    data: { name: 'Gardens', type: 'Gardens', status: 'active' },
  },
  {
    id: 'octant',
    type: 'protocol',
    position: { x: 200, y: 500 },
    data: { name: 'Octant', type: 'Octant', status: 'active' },
  },
  {
    id: 'safe',
    type: 'infra',
    position: { x: 600, y: 500 },
    data: { name: 'Gnosis Safe', type: 'multisig', chain: 'Ethereum', status: 'active' },
  },
  {
    id: 'hats',
    type: 'protocol',
    position: { x: 100, y: 300 },
    data: { name: 'Hats Protocol', type: 'Hats Protocol', status: 'active' },
  },
  {
    id: 'cookie-jar',
    type: 'application',
    position: { x: 700, y: 300 },
    data: {
      name: 'Cookie Jar',
      description: 'NFT-gated access with Hats',
      protocols: ['Hats Protocol'],
      status: 'active',
    },
  },
  {
    id: 'unlock',
    type: 'protocol',
    position: { x: 100, y: 500 },
    data: { name: 'Unlock Protocol', type: 'Unlock Protocol', status: 'active' },
  },
  {
    id: 'revnets',
    type: 'protocol',
    position: { x: 700, y: 100 },
    data: { name: 'RevNets', type: 'RevNets', status: 'planned' },
  },
];

/** Sub-nodes and edges revealed when a node is expanded */
export const mockIntegrationsExpandable: Record<
  string,
  { nodes: CanvasNode[]; edges: CanvasEdge[] }
> = {
  'karma-gap': {
    nodes: [
      {
        id: 'eas',
        type: 'infra',
        position: { x: 150, y: 50 },
        data: { name: 'EAS', type: 'attestation', description: 'Ethereum Attestation Service', status: 'active' },
      },
    ],
    edges: [
      { id: 'e-karma-eas', source: 'karma-gap', target: 'eas', type: 'integration', data: { connectionType: 'onchain' } },
    ],
  },
  octant: {
    nodes: [
      {
        id: 'octant-dai-vault',
        type: 'infra',
        position: { x: 250, y: 550 },
        data: { name: 'Octant DAI Vault', type: 'vault', chain: 'Ethereum', status: 'active' },
      },
      {
        id: 'octant-eth-vault',
        type: 'infra',
        position: { x: 350, y: 550 },
        data: { name: 'Octant ETH Vault', type: 'vault', chain: 'Ethereum', status: 'active' },
      },
    ],
    edges: [
      { id: 'e-octant-dai', source: 'octant', target: 'octant-dai-vault', type: 'integration', data: { connectionType: 'onchain' } },
      { id: 'e-octant-eth', source: 'octant', target: 'octant-eth-vault', type: 'integration', data: { connectionType: 'onchain' } },
    ],
  },
};

export const mockIntegrationsEdges: CanvasEdge[] = [
  { id: 'e-gg-karma', source: 'green-goods', target: 'karma-gap', type: 'integration', data: { connectionType: 'data' } },
  { id: 'e-gg-hypercerts', source: 'green-goods', target: 'hypercerts', type: 'integration', data: { connectionType: 'onchain' } },
  { id: 'e-gg-gardens', source: 'green-goods', target: 'gardens', type: 'integration', data: { connectionType: 'governance' } },
  { id: 'e-gg-octant', source: 'green-goods', target: 'octant', type: 'integration', data: { connectionType: 'onchain' } },
  { id: 'e-gg-hats', source: 'green-goods', target: 'hats', type: 'integration', data: { connectionType: 'api' } },
  { id: 'e-gg-cookie', source: 'green-goods', target: 'cookie-jar', type: 'integration', data: { connectionType: 'api' } },
  { id: 'e-gg-unlock', source: 'green-goods', target: 'unlock', type: 'integration', data: { connectionType: 'onchain' } },
  { id: 'e-gg-revnets', source: 'green-goods', target: 'revnets', type: 'integration', data: { connectionType: 'onchain' } },
  { id: 'e-gardens-safe', source: 'gardens', target: 'safe', type: 'integration', data: { connectionType: 'onchain' } },
  { id: 'e-octant-safe', source: 'octant', target: 'safe', type: 'integration', data: { connectionType: 'onchain' } },
  { id: 'e-karma-hypercerts', source: 'karma-gap', target: 'hypercerts', type: 'integration', data: { connectionType: 'data', direction: 'source-to-target' } },
];

export const mockFundFlowNodes: CanvasNode[] = [
  {
    id: 'funder-artisan',
    type: 'funder',
    position: { x: 100, y: 50 },
    data: {
      name: 'Artisan Pool',
      type: 'DAO',
      totalFunding: [{ amount: '33000', token: 'USD', chain: 'ethereum', usdValue: 33000 }],
      programs: 6,
    },
  },
  {
    id: 'funder-octant',
    type: 'funder',
    position: { x: 280, y: 50 },
    data: {
      name: 'Octant Vault',
      type: 'Foundation',
      totalFunding: [{ amount: '5000', token: 'DAI', chain: 'ethereum', usdValue: 5000 }],
      programs: 1,
    },
  },
  {
    id: 'funder-impact-stake',
    type: 'funder',
    position: { x: 460, y: 50 },
    data: {
      name: 'Impact Stake (Lido)',
      type: 'Foundation',
      totalFunding: [{ amount: '10', token: 'ETH', chain: 'ethereum', usdValue: 25000 }],
      programs: 1,
    },
  },
  {
    id: 'funder-bread',
    type: 'funder',
    position: { x: 640, y: 50 },
    data: {
      name: 'Bread Co-op',
      type: 'Cooperative',
      totalFunding: [{ amount: '15000', token: 'USD', chain: 'ethereum', usdValue: 15000 }],
      programs: 1,
    },
  },
  {
    id: 'program-gardens',
    type: 'program',
    position: { x: 150, y: 200 },
    data: {
      name: 'Gardens Conviction',
      type: 'QuadraticFunding',
      totalFunding: [{ amount: '15000', token: 'USD', chain: 'ethereum', usdValue: 15000 }],
      applications: 12,
      projects: 8,
      isActive: true,
    },
  },
  {
    id: 'program-octant-local',
    type: 'program',
    position: { x: 400, y: 200 },
    data: {
      name: 'Greenpill NYC Local',
      type: 'DirectGrants',
      totalFunding: [{ amount: '5000', token: 'USD', chain: 'ethereum', usdValue: 5000 }],
      applications: 5,
      projects: 3,
      isActive: true,
    },
  },
  {
    id: 'round-waste',
    type: 'domain-round',
    position: { x: 250, y: 200 },
    data: {
      name: 'Waste Round',
      domain: 'waste',
      totalFunding: [{ amount: '8000', token: 'USD', chain: 'ethereum', usdValue: 8000 }],
      projects: 4,
      isActive: true,
    },
  },
  {
    id: 'round-agroforestry',
    type: 'domain-round',
    position: { x: 550, y: 200 },
    data: {
      name: 'Agroforestry Round',
      domain: 'agroforestry',
      totalFunding: [{ amount: '12000', token: 'USD', chain: 'ethereum', usdValue: 12000 }],
      projects: 5,
      isActive: true,
    },
  },
  {
    id: 'project-1',
    type: 'project',
    position: { x: 100, y: 380 },
    data: {
      name: 'Mutual Aid Org',
      description: 'Brooklyn mutual aid',
      team: 4,
      totalFunding: [{ amount: '2000', token: 'USD', chain: 'ethereum', usdValue: 2000 }],
      milestones: 3,
      completedMilestones: 1,
    },
  },
  {
    id: 'project-2',
    type: 'project',
    position: { x: 350, y: 380 },
    data: {
      name: 'Agroforestry Initiative',
      description: 'Domain-specific round',
      team: 6,
      totalFunding: [{ amount: '5000', token: 'USD', chain: 'ethereum', usdValue: 5000 }],
      milestones: 4,
      completedMilestones: 2,
    },
  },
  {
    id: 'project-3',
    type: 'project',
    position: { x: 600, y: 380 },
    data: {
      name: 'Waste Reduction Hub',
      description: 'Local waste circularity',
      team: 3,
      totalFunding: [{ amount: '3000', token: 'USD', chain: 'ethereum', usdValue: 3000 }],
      milestones: 2,
      completedMilestones: 2,
    },
  },
];

export const mockFundFlowEdges: CanvasEdge[] = [
  { id: 'e-f1-p1', source: 'funder-artisan', target: 'program-gardens', type: 'capital', data: { amount: 15000, token: 'USD', velocity: 0.8, status: 'active' } },
  { id: 'e-f2-p2', source: 'funder-octant', target: 'program-octant-local', type: 'capital', data: { amount: 5000, token: 'USD', velocity: 0.6, status: 'active' } },
  { id: 'e-f3-p2', source: 'funder-impact-stake', target: 'program-octant-local', type: 'capital', data: { amount: 2500, token: 'ETH', velocity: 0.5, status: 'active' } },
  { id: 'e-f4-r2', source: 'funder-bread', target: 'round-agroforestry', type: 'capital', data: { amount: 5000, token: 'USD', velocity: 0.7, status: 'active' } },
  { id: 'e-f1-r1', source: 'funder-artisan', target: 'round-waste', type: 'capital', data: { amount: 8000, token: 'USD', velocity: 0.6, status: 'active' } },
  { id: 'e-p1-pr1', source: 'program-gardens', target: 'project-1', type: 'capital', data: { amount: 2000, token: 'USD', velocity: 0.6, status: 'completed' } },
  { id: 'e-p1-pr2', source: 'program-gardens', target: 'project-2', type: 'capital', data: { amount: 5000, token: 'USD', velocity: 0.7, status: 'active' } },
  { id: 'e-p2-pr1', source: 'program-octant-local', target: 'project-1', type: 'capital', data: { amount: 2000, token: 'USD', velocity: 0.6, status: 'active' } },
  { id: 'e-r1-pr3', source: 'round-waste', target: 'project-3', type: 'capital', data: { amount: 3000, token: 'USD', velocity: 0.8, status: 'completed' } },
  { id: 'e-r2-pr2', source: 'round-agroforestry', target: 'project-2', type: 'capital', data: { amount: 5000, token: 'USD', velocity: 0.7, status: 'active' } },
];

/** Sub-nodes and edges revealed when a fund flow node is expanded */
export const mockFundFlowsExpandable: Record<
  string,
  { nodes: CanvasNode[]; edges: CanvasEdge[] }
> = {
  'funder-octant': {
    nodes: [
      {
        id: 'vault-octant-dai',
        type: 'yield-vault',
        position: { x: 250, y: 120 },
        data: {
          name: 'Octant DAI Vault',
          type: 'DAI',
          balance: [{ amount: '3000', token: 'DAI', chain: 'ethereum', usdValue: 3000 }],
          apy: 4.2,
          chain: 'ethereum',
          recipients: 3,
        },
      },
      {
        id: 'vault-octant-eth',
        type: 'yield-vault',
        position: { x: 350, y: 120 },
        data: {
          name: 'Octant ETH Vault',
          type: 'ETH',
          balance: [{ amount: '2', token: 'ETH', chain: 'ethereum', usdValue: 5000 }],
          apy: 3.8,
          chain: 'ethereum',
          recipients: 2,
        },
      },
    ],
    edges: [
      { id: 'e-octant-dai', source: 'funder-octant', target: 'vault-octant-dai', type: 'capital', data: { amount: 3000, token: 'DAI', velocity: 0.5, status: 'active' } },
      { id: 'e-octant-eth', source: 'funder-octant', target: 'vault-octant-eth', type: 'capital', data: { amount: 5000, token: 'ETH', velocity: 0.5, status: 'active' } },
    ],
  },
  'funder-impact-stake': {
    nodes: [
      {
        id: 'split-refi',
        type: 'infra',
        position: { x: 420, y: 120 },
        data: { name: 'ReFi DAO', type: 'recipient', status: 'active' },
      },
      {
        id: 'split-greenpill',
        type: 'infra',
        position: { x: 500, y: 120 },
        data: { name: 'Greenpill', type: 'recipient', status: 'active' },
      },
      {
        id: 'split-bloom',
        type: 'infra',
        position: { x: 580, y: 120 },
        data: { name: 'Bloom', type: 'recipient', status: 'active' },
      },
    ],
    edges: [
      { id: 'e-is-refi', source: 'funder-impact-stake', target: 'split-refi', type: 'capital', data: { amount: 3333, token: 'ETH', velocity: 0.33, status: 'active' } },
      { id: 'e-is-gp', source: 'funder-impact-stake', target: 'split-greenpill', type: 'capital', data: { amount: 3333, token: 'ETH', velocity: 0.33, status: 'active' } },
      { id: 'e-is-bloom', source: 'funder-impact-stake', target: 'split-bloom', type: 'capital', data: { amount: 3334, token: 'ETH', velocity: 0.34, status: 'active' } },
    ],
  },
  'project-1': {
    nodes: [
      {
        id: 'del-1-0',
        type: 'deliverable',
        position: { x: 50, y: 450 },
        data: { name: 'Community outreach', description: 'Initial outreach', status: 'completed', milestoneIndex: 0 },
      },
      {
        id: 'del-1-1',
        type: 'deliverable',
        position: { x: 150, y: 450 },
        data: { name: 'Pilot program', description: 'Run pilot', status: 'in-progress', milestoneIndex: 1 },
      },
      {
        id: 'del-1-2',
        type: 'deliverable',
        position: { x: 250, y: 450 },
        data: { name: 'Impact report', description: 'Final report', status: 'pending', milestoneIndex: 2 },
      },
    ],
    edges: [
      { id: 'e-pr1-d0', source: 'project-1', target: 'del-1-0', type: 'capital', data: { status: 'completed' } },
      { id: 'e-pr1-d1', source: 'project-1', target: 'del-1-1', type: 'capital', data: { status: 'active' } },
      { id: 'e-pr1-d2', source: 'project-1', target: 'del-1-2', type: 'capital', data: { status: 'pending' } },
    ],
  },
  'project-2': {
    nodes: [
      {
        id: 'stream-sf-gardens',
        type: 'stream',
        position: { x: 300, y: 480 },
        data: { name: 'Superfluid → Gardens', recipient: 'Gardens pool', ratePerSecond: '0.001', token: 'USDC', status: 'active' },
      },
      {
        id: 'stream-sf-giveth',
        type: 'stream',
        position: { x: 400, y: 480 },
        data: { name: 'Superfluid → Giveth', recipient: 'Giveth project', ratePerSecond: '0.0005', token: 'USDC', status: 'active' },
      },
    ],
    edges: [
      { id: 'e-pr2-sf1', source: 'project-2', target: 'stream-sf-gardens', type: 'capital', data: { status: 'active' } },
      { id: 'e-pr2-sf2', source: 'project-2', target: 'stream-sf-giveth', type: 'capital', data: { status: 'active' } },
    ],
  },
};

export class MockEcosystemAdapter implements DataAdapter {
  id = 'mock-ecosystem';
  name = 'Mock Ecosystem Data';
  isLive = false;

  async load(view: 'integrations' | 'fund-flows'): Promise<AdapterResult> {
    if (view === 'integrations') {
      return {
        nodes: mockIntegrationsNodes,
        edges: mockIntegrationsEdges,
        metadata: {
          source: 'mock',
          lastUpdated: new Date().toISOString(),
          itemCount: mockIntegrationsNodes.length + mockIntegrationsEdges.length,
        },
      };
    }
    return {
      nodes: mockFundFlowNodes,
      edges: mockFundFlowEdges,
      metadata: {
        source: 'mock',
        lastUpdated: new Date().toISOString(),
        itemCount: mockFundFlowNodes.length + mockFundFlowEdges.length,
      },
    };
  }
}

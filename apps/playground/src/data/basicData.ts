import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';

export const basicNodes: CanvasNode[] = [
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
    data: { label: 'Node 3', description: 'Third node', status: 'active' },
  },
];

export const basicEdges: CanvasEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

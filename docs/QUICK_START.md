# Ecosystem Canvas - Quick Start Guide

## Installation

```bash
cd ecosystem-canvas
pnpm install
pnpm build
```

## Basic Usage

### 1. Create a Simple Canvas

```tsx
import React from 'react';
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { BaseNode } from '@ecosystem/canvas-core/primitives';

const nodes = [
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
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
];

const nodeTypes = {
  base: BaseNode,
};

function App() {
  return (
    <CanvasProvider theme="functional" initialNodes={nodes} initialEdges={edges}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas nodeTypes={nodeTypes} fitView showBackground showControls />
      </div>
    </CanvasProvider>
  );
}
```

### 2. Fund Flow Visualization

```tsx
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import {
  FunderNode,
  ProgramNode,
  ProjectNode,
  CapitalFlowEdge,
} from '@ecosystem/canvas-fund-flows';

const nodeTypes = {
  funder: FunderNode,
  program: ProgramNode,
  project: ProjectNode,
};

const edgeTypes = {
  capital: CapitalFlowEdge,
};

const fundFlowNodes = [
  {
    id: 'funder-1',
    type: 'funder',
    position: { x: 100, y: 100 },
    data: {
      name: 'Gitcoin',
      type: 'DAO',
      totalFunding: [{ amount: '5000000', token: 'USD', chain: 'ethereum', usdValue: 5000000 }],
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
      totalFunding: [{ amount: '500000', token: 'USD', chain: 'optimism', usdValue: 500000 }],
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
      totalFunding: [{ amount: '15000', token: 'USD', chain: 'optimism', usdValue: 15000 }],
      milestones: 4,
      completedMilestones: 2,
    },
  },
];

const fundFlowEdges = [
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

function FundFlowCanvas() {
  return (
    <CanvasProvider theme="regen" initialNodes={fundFlowNodes} initialEdges={fundFlowEdges}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          showBackground
          showControls
        />
      </div>
    </CanvasProvider>
  );
}
```

### 3. Using Themes

```tsx
import { CanvasProvider } from '@ecosystem/canvas-react';
import { useTheme } from '@ecosystem/canvas-core/themes';

// Available themes: 'functional', 'daocore', 'regen', 'ocean', 'forest'

function ThemeSwitcher() {
  const { themeId, setTheme } = useTheme();

  return (
    <div>
      <select value={themeId} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="functional">Functional</option>
        <option value="daocore">DAOcore</option>
        <option value="regen">Regen</option>
        <option value="ocean">Ocean (ReFi BCN)</option>
        <option value="forest">Forest (Regenerant)</option>
      </select>
    </div>
  );
}
```

### 4. Using Hooks

```tsx
import { useCanvasState, useCanvasLayout } from '@ecosystem/canvas-core/hooks';

function CanvasControls() {
  const { nodes, edges, addNode, clearCanvas } = useCanvasState();
  const { applyGridLayout } = useCanvasLayout();

  const handleAddNode = () => {
    addNode({
      id: `node-${nodes.length + 1}`,
      type: 'base',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Node ${nodes.length + 1}`, status: 'draft' },
    });
  };

  const handleLayoutGrid = () => {
    const layoutedNodes = applyGridLayout(nodes, 4, 150);
    // Apply layouted nodes to canvas
  };

  return (
    <div>
      <button onClick={handleAddNode}>Add Node</button>
      <button onClick={handleLayoutGrid}>Grid Layout</button>
      <button onClick={clearCanvas}>Clear</button>
      <p>Nodes: {nodes.length}, Edges: {edges.length}</p>
    </div>
  );
}
```

### 5. Custom Toolbar

```tsx
import { Canvas, CanvasProvider, Toolbar, ToolbarButton } from '@ecosystem/canvas-react';

function CustomCanvas() {
  return (
    <CanvasProvider theme="functional">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas fitView showBackground showControls>
          <Toolbar position="top-left">
            <ToolbarButton
              icon={<span>➕</span>}
              label="Add Node"
              onClick={() => console.log('Add node')}
            />
            <ToolbarButton
              icon={<span>🗑️</span>}
              label="Delete"
              onClick={() => console.log('Delete')}
            />
            <ToolbarButton
              icon={<span>📐</span>}
              label="Auto Layout"
              onClick={() => console.log('Layout')}
            />
          </Toolbar>
        </Canvas>
      </div>
    </CanvasProvider>
  );
}
```

## Available Packages

- `@ecosystem/canvas-core` - Core primitives, types, themes, hooks
- `@ecosystem/canvas-react` - React integration components
- `@ecosystem/canvas-fund-flows` - Fund flow visualization (complete)
- `@ecosystem/canvas-organizations` - Organizational structures (in development)
- `@ecosystem/canvas-learning-paths` - Learning pathways (in development)
- `@ecosystem/canvas-knowledge-graphs` - Knowledge graphs (in development)
- `@ecosystem/canvas-pipelines` - Integration pipelines (in development)

## Next Steps

1. Explore the `/docs` directory for detailed guides
2. Check `/apps/storybook` for component documentation (when available)
3. Review `/PROJECT_STATUS.md` for implementation roadmap
4. See integration guides in `/docs/integration-guides/` for project-specific usage

## Support

For questions and issues, refer to the main project documentation or open an issue in the repository.

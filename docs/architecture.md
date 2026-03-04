# Ecosystem Canvas - Architecture Documentation

## Overview

The Ecosystem Canvas Library is a unified React Flow-based visualization system designed to provide sophisticated, interconnected canvas views across the ReFi ecosystem. It synthesizes patterns from multiple projects into a cohesive, extensible framework.

---

## Architecture Principles

### 1. Composability
Every component works standalone or in combination. Packages can be used independently or together.

### 2. Type Safety
Full TypeScript coverage with Zod runtime validation ensures type correctness at compile-time and runtime.

### 3. Themeable
Consistent design system aligned with quartz-refi-template, supporting multiple visual identities.

### 4. Performant
Optimized for large graphs (500+ nodes) with virtualization and efficient rendering.

### 5. Standards-Based
Follows React Flow patterns and ecosystem standards (EIP-4824, DAOIP-5).

---

## Package Architecture

```
@ecosystem/canvas
├── core                    # Foundation layer
│   ├── primitives         # Base components
│   ├── types              # TypeScript definitions
│   ├── themes             # Design system
│   ├── hooks              # React hooks
│   └── utils              # Utilities
├── react                   # React integration
│   ├── Canvas             # Main component
│   ├── CanvasProvider     # Context
│   ├── Toolbar            # Controls
│   ├── Minimap            # Navigation
│   └── Panel              # Sidebars
└── domains                 # Domain-specific packages
    ├── fund-flows         # Capital visualization
    ├── organizations      # Org structures
    ├── learning-paths     # Education paths
    ├── knowledge-graphs   # Semantic nets
    └── pipelines          # Process flows
```

---

## Core Package Design

### Type System

The core type system provides base abstractions:

```typescript
interface CanvasNode<T = unknown> {
  id: string;
  type: string;
  position: Position;
  data: T;
  selected?: boolean;
  draggable?: boolean;
  // ... React Flow extensions
}

interface CanvasEdge<T = unknown> {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: T;
  animated?: boolean;
  // ... React Flow extensions
}
```

### Theme System

Five pre-built themes aligned with ecosystem design languages:

| Theme | Description | Use Case |
|-------|-------------|----------|
| **Functional** | Clean, minimal | General purpose |
| **DAOcore** | Bold, expressive | DAO OS integration |
| **Regen** | Earth tones | Regenerative projects |
| **Ocean** | Navy + sand | ReFi Barcelona |
| **Forest** | Green tones | Regenerant Catalunya |

Each theme provides:
- Color semantics (light, dark, highlight, etc.)
- Status colors (active, pending, completed, error)
- Flow colors (capital, data, permission, governance)
- Typography (title, body, mono fonts)
- Spacing and borders

### Primitives

Base components that all domain-specific nodes extend:

1. **BaseNode**: Foundation for all node types
2. **BaseEdge**: Foundation for all edge types
3. **CustomHandle**: Enhanced connection points
4. **NodeToolbar**: Contextual actions

### Utilities

Helper functions for common operations:

- **Geometry**: Distance, bounds, intersection calculations
- **Transform**: Node/edge creation, ID generation
- **Layout**: Grid, circular, tree algorithms

### Hooks

React hooks for canvas operations:

- `useCanvasState()`: Node/edge state management
- `useCanvasLayout()`: Apply layout algorithms
- `useCanvasSelection()`: Multi-select operations
- `useCanvasMetrics()`: Calculate canvas metrics

---

## React Integration Package

### Canvas Component

Main component wrapping React Flow:

```tsx
<CanvasProvider theme="regen">
  <Canvas
    nodeTypes={nodeTypes}
    edgeTypes={edgeTypes}
    fitView
    showBackground
    showControls
  >
    <Toolbar position="top-left" />
    <Minimap position="bottom-right" />
    <Panel position="right" title="Metrics" />
  </Canvas>
</CanvasProvider>
```

### Component Hierarchy

```
CanvasProvider (Context)
└── Canvas (React Flow Wrapper)
    ├── Toolbar (Optional)
    ├── Minimap (Optional)
    ├── Panel (Optional)
    └── Custom Children
```

---

## Domain Packages

### Fund Flows (`@ecosystem/canvas-fund-flows`)

**Purpose**: Visualize capital movement across grants and treasuries.

**Node Types**:
- `FunderNode`: Organizations providing capital
- `ProgramNode`: Grant programs
- `ProjectNode`: Funded projects
- `TreasuryNode`: Multi-sig treasuries

**Edge Types**:
- `CapitalFlowEdge`: Animated capital flows

**Data Model** (aligned with opengrants-os):
```typescript
interface FunderData {
  name: string;
  type: 'DAO' | 'Foundation' | 'Cooperative' | 'Project';
  totalFunding: TokenAmount[];
  programs: number;
}
```

### Organizations (`@ecosystem/canvas-organizations`)

**Purpose**: Visualize organizational structures and governance.

**Node Types**:
- `OrganizationNode`: Top-level entities
- `RoleNode`: Positions and permissions
- `TeamNode`: Working groups
- `ModuleNode`: Operational modules

**Edge Types**:
- `ReportsToEdge`: Reporting relationships
- `PermissionEdge`: Permission grants
- `MembershipEdge`: Role memberships

**Data Model** (aligned with organizational-os):
- EIP-4824 compliant identity
- Federated structure support
- Role-based access control

### Learning Paths (`@ecosystem/canvas-learning-paths`)

**Purpose**: Visualize educational content and learning journeys.

**Node Types**:
- `TrackNode`: Learning tracks
- `ModuleNode`: Educational modules
- `MilestoneNode`: Learning milestones

**Edge Types**:
- `PrerequisiteEdge`: Required dependencies
- `RecommendedEdge`: Suggested paths
- `RelatedEdge`: Conceptual links

**Data Model** (aligned with regen-toolkit-interface):
```typescript
interface ModuleData {
  type: 'playbook' | 'protocol-specific' | 'quick-start';
  difficulty: 'accessible' | 'intermediate' | 'advanced';
  timeline: string;
  impactAreas: string[];
}
```

### Knowledge Graphs (`@ecosystem/canvas-knowledge-graphs`)

**Purpose**: Visualize semantic relationships and knowledge structures.

**Node Types**:
- `ConceptNode`: Abstract concepts
- `DocumentNode`: Knowledge documents
- `EntityNode`: Named entities

**Edge Types**:
- `SemanticEdge`: Semantic relationships
- `ReferenceEdge`: Document references
- `TemporalEdge`: Time relationships

**Data Model** (aligned with koi-net-integration):
- RID system (Reference Identifiers)
- Neo4j graph structure
- ChromaDB vector embeddings

### Pipelines (`@ecosystem/canvas-pipelines`)

**Purpose**: Visualize integration flows and automation.

**Node Types**:
- `StageNode`: Pipeline stages
- `ToolNode`: Integration tools
- `DataSourceNode`: Data sources

**Edge Types**:
- `DataFlowEdge`: Data movement
- `TriggerEdge`: Event triggers
- `DependencyEdge`: Stage dependencies

---

## Layout Algorithms

### Available Algorithms

1. **Grid**: Regular grid pattern
2. **Circular**: Nodes in circle
3. **Tree**: Hierarchical tree
4. **Dagre**: Directed acyclic graph
5. **Force-Directed**: Physics-based
6. **Sankey**: Flow proportions
7. **Swimlane**: Parallel lanes

### Usage

```typescript
const { applyLayout } = useCanvasLayout();
const layoutedNodes = applyLayout(nodes, edges, 'tree');
```

---

## Overlay System

Visual overlays for system-wide analysis:

### Overlay Modes

1. **Heat Map**: Activity concentration
2. **Energy Flow**: Resource transformation
3. **Entropy**: Coordination/alignment
4. **Equilibrium**: System balance
5. **Progress**: Completion status

### Usage

```typescript
<Canvas overlayMode="heat-map" />
```

---

## Integration Guide

### With DAO OS

**Replace**: `apps/composer/src/components/DAOComposer.tsx`

```tsx
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import { TreasuryNode, FunderNode, CapitalFlowEdge } from '@ecosystem/canvas-fund-flows';

const nodeTypes = {
  treasury: TreasuryNode,
  funder: FunderNode,
};

const edgeTypes = {
  capital: CapitalFlowEdge,
};

function DAOComposer() {
  return (
    <CanvasProvider theme="daocore">
      <Canvas nodeTypes={nodeTypes} edgeTypes={edgeTypes} />
    </CanvasProvider>
  );
}
```

### With OpenGrants OS

**Add to**: `packages/frontend/`

```tsx
import { Canvas, CanvasProvider } from '@ecosystem/canvas-react';
import {
  FunderNode,
  ProgramNode,
  ProjectNode,
  CapitalFlowEdge,
} from '@ecosystem/canvas-fund-flows';

// Use all fund-flows components for grant visualization
```

### With Organizational OS

**Add to**: `packages/webapps/`

```tsx
import { OrganizationNode, RoleNode } from '@ecosystem/canvas-organizations';

// Visualize EIP-4824 organizational structures
```

### With Regen Toolkit Interface

**Replace**: `src/components/canvas/`

```tsx
import { TrackNode, ModuleNode } from '@ecosystem/canvas-learning-paths';

// Migrate existing canvas to use ecosystem-canvas
```

### With KOI-net Integration

**Add to**: `docs/dao-os-integration.md`

```tsx
import { ConceptNode, DocumentNode, SemanticEdge } from '@ecosystem/canvas-knowledge-graphs';

// Visualize knowledge graph relationships
```

---

## Performance Considerations

### Large Graphs (500+ nodes)

1. **Virtualization**: Only render visible nodes
2. **Memoization**: React.memo on node/edge components
3. **Debouncing**: Layout calculations
4. **Web Workers**: Heavy computations off main thread

### Best Practices

```tsx
// Memoize node types
const nodeTypes = useMemo(() => ({
  funder: FunderNode,
  program: ProgramNode,
}), []);

// Debounce layout
const debouncedLayout = useMemo(
  () => debounce((nodes, edges) => applyLayout(nodes, edges, 'tree'), 300),
  []
);
```

---

## Extensibility

### Adding Custom Node Types

```typescript
import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';

interface CustomNodeData {
  label: string;
  // ... custom properties
}

export const CustomNode = memo<NodeProps<CustomNodeData>>(({ data, selected }) => {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
```

### Adding Custom Edge Types

```typescript
import { memo } from 'react';
import type { EdgeProps } from '@xyflow/react';
import { BaseEdge, getBezierPath } from '@xyflow/react';

export const CustomEdge = memo<EdgeProps>(({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return <BaseEdge path={edgePath} />;
});
```

---

## Testing Strategy

### Unit Tests

```typescript
import { renderHook } from '@testing-library/react';
import { useCanvasState } from '@ecosystem/canvas-core/hooks';

test('useCanvasState adds node', () => {
  const { result } = renderHook(() => useCanvasState());
  act(() => {
    result.current.addNode({
      id: '1',
      type: 'base',
      position: { x: 0, y: 0 },
      data: { label: 'Test' },
    });
  });
  expect(result.current.nodes).toHaveLength(1);
});
```

### Integration Tests

Test complete canvas workflows with real data from consumer projects.

---

## Deployment

### Build

```bash
pnpm install
pnpm build
```

### Publish

```bash
cd packages/core
pnpm publish

cd ../react
pnpm publish

# ... for each package
```

### Versioning

Follow semantic versioning:
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

---

## Future Enhancements

### Planned Features

1. **AI-Assisted Layouts**: ML-based optimal positioning
2. **Collaborative Editing**: Real-time multiplayer
3. **Advanced Animations**: Framer Motion integration
4. **3D Visualizations**: Three.js integration
5. **Export Formats**: PDF, PowerPoint, Figma
6. **Accessibility**: Enhanced WCAG compliance
7. **Mobile Support**: Touch-optimized interactions

---

## Contributing

See individual package READMEs for contribution guidelines. All packages follow the same patterns established in the core and fund-flows packages.

---

## License

MIT License - See LICENSE file for details.

---

**Last Updated**: 2026-01-31
**Version**: 0.1.0
**Status**: Foundation Complete, Ready for Integration

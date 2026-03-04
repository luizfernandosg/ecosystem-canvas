# Ecosystem Canvas Library

A unified React Flow visualization library for ecosystem mapping, fund flows, and embeddable miniapps across the ReFi ecosystem.

## Overview

The Ecosystem Canvas Library provides:

- **Integrations Canvas**: Protocol relationship mapping (Green Goods, Karma GAP, Hypercerts, Gardens, Octant, etc.) with expand/collapse
- **Fund Flows Canvas**: Multi-level capital flows (funders → programs → projects → deliverables) with yield vaults, streams, domain rounds
- **Data layer**: Mock adapter + Karma GAP live API
- **Embeddable widget**: PostMessage API for iframe embedding in ReFi DAO and Regen Coordination sites

## Packages

- `@ecosystem/canvas-core` - Core primitives, types, themes, hooks
- `@ecosystem/canvas-react` - Canvas, Provider, Toolbar components
- `@ecosystem/canvas-integrations` - ProtocolNode, ApplicationNode, InfraNode, IntegrationEdge
- `@ecosystem/canvas-fund-flows` - FunderNode, ProgramNode, ProjectNode, YieldVaultNode, StreamNode, DomainRoundNode, DeliverableNode
- `@ecosystem/canvas-data` - MockEcosystemAdapter, KarmaGAPAdapter
- `@ecosystem/canvas-widget` - EcosystemWidget, PostMessage API

## Apps

- `apps/explorer` - Full PoC with Integrations and Fund Flows views, embed routes, Karma live data
- `apps/playground` - Development examples
- `apps/storybook` - Component stories

## Installation

```bash
pnpm install
```

## Development

```bash
# Start explorer dev server (port 8081)
pnpm explorer

# Build all packages
pnpm build

# Build explorer only
pnpm --filter @ecosystem/canvas-explorer build
```

## Embedding

Embed URLs: `/embed/integrations`, `/embed/fund-flows`

See `apps/explorer/EMBEDDING.md` for PostMessage API and iframe usage.

## Regen Toolkit Integration

- Integration profile: `03 Libraries/regen-toolkit/integrations/profiles/ecosystem-canvas-integration.md`
- Content-to-node crosswalk: `03 Libraries/regen-toolkit/integrations/crosswalks/toolkit-canvas-crosswalk-v1.md`

## License

MIT

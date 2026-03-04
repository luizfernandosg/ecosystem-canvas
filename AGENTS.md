# Ecosystem Canvas Agent Guide

Unified React Flow visualization library for ecosystem mapping and fund flows.

## Quick Facts
- **Type**: TypeScript monorepo (pnpm + Turborepo)
- **Stack**: React, TypeScript, React Flow (@xyflow/react)
- **Purpose**: Ecosystem visualization library
- **Status**: Foundation complete (3 packages), ready for integration

## Install
```bash
pnpm install
```

## Commands

### Root-Level Commands
```bash
pnpm install          # Install all dependencies
pnpm dev              # Run dev mode for all packages
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm test             # Run tests
pnpm typecheck        # Type check all packages
pnpm format           # Format code with Prettier
pnpm playground       # Run playground app
pnpm storybook        # Run Storybook
pnpm dev:all          # Run all dev tasks in parallel
```

### Package-Specific Commands
```bash
pnpm --filter @ecosystem/canvas-core dev      # Dev for specific package
pnpm --filter @ecosystem/canvas-react build   # Build specific package
```

## Project Structure
```
packages/
├── core/                    # ✅ Complete: Primitives, types, themes, hooks
├── react/                   # ✅ Complete: React integration (Canvas, Provider, Toolbar)
├── fund-flows/              # ✅ Complete: Fund flow visualization (nodes, edges)
├── organizations/           # 📁 Ready for implementation
├── learning-paths/          # 📁 Ready for implementation
├── knowledge-graphs/        # 📁 Ready for implementation
└── pipelines/               # 📁 Ready for implementation

apps/
├── playground/              # Vite-based dev playground
└── storybook/              # Storybook for component documentation
```

## Cursor AI Resources

### Project-Specific Resources

**Skills**: None (uses inherited resources)

**Agents**: None (uses root-level agents as needed)

**Rules**: None (follows root-level rules)

**Master Plans**:
- `PROJECT_STATUS.md` - Implementation status and roadmap
- `IMPLEMENTATION_COMPLETE.md` - Completion summary with metrics
- `docs/architecture.md` - System architecture and integration guides
- `docs/design-system.md` - Design system with 5 themes

### Inherited Resources

**From Root-Level** (`.cursor/` in Zettelkasten root):
- `refi-content-generation` - Generate ReFi ecosystem content
- `quick-push` - Quick git workflow operations
- `knowledge-curator` - Deep research and synthesis
- `meeting-processor` - Process meeting transcripts
- `docs-consolidator` - Consolidate documentation
- `project-reviewer` - Analyze project status

**From User-Level** (`~/.cursor/skills/`):
- `monorepo-operations` - Manage pnpm workspaces and Turborepo
- `git-workflows` - Git operations and PR creation
- `knowledge-synthesis` - Curate and synthesize content

## Context Gathering

### Essential Reading (First Pass)
1. This `AGENTS.md` file
2. `README.md` - Overview of unified React Flow visualization library
3. `PROJECT_STATUS.md` - Implementation status and roadmap
4. `IMPLEMENTATION_COMPLETE.md` - Completion summary with metrics

### Architecture Understanding
- Monorepo: `packages/` (core, react, fund-flows), `apps/` (playground, storybook)
- Completed packages: `@ecosystem/canvas-core`, `@ecosystem/canvas-react`, `@ecosystem/canvas-fund-flows`
- Design system: 5 themes aligned with ecosystem design (functional, daocore, regen, ocean, forest)
- Type-safe: Zod validation throughout

### Planning Context
- Status: Foundation complete (3 packages), ready for integration
- Next steps: Phases 2-8 (organizations, learning-paths, knowledge-graphs, pipelines, overlays, Storybook, integration guides)
- Integration readiness: DAO OS, OpenGrants OS, Organizational OS, Regen Toolkit, KOI-net

### Code Navigation
- **Core**: `packages/canvas-core/` (primitives, types, themes, hooks)
- **React**: `packages/canvas-react/` (Canvas, CanvasProvider, Toolbar, Minimap)
- **Fund Flows**: `packages/canvas-fund-flows/` (FunderNode, ProgramNode, ProjectNode, TreasuryNode)
- **Playground**: `apps/playground/` (Vite dev playground)

### Search Patterns
**When looking for component patterns**: Check `packages/canvas-react/` (React integration)  
**When working on fund flows**: See `packages/canvas-fund-flows/` (node types, edges)  
**When understanding themes**: Read `packages/canvas-core/` (5 ecosystem themes)

### Integration Points
- Depends on: React Flow (@xyflow/react), Zod validation
- Used by: dao-os (fund flow visualization), grants-os (grant flow visualization)
- Shares patterns with: dao-os (React Flow), grants-os (visualization needs)

**For Complete Context**: See root `CONTEXT-GATHERING-GUIDE.md` for ecosystem-canvas section.

## Development
Follow monorepo-operations patterns (user-level skill).

## Integration
Part of Zettelkasten system for ecosystem mapping tools. Ready for integration with DAO OS and OpenGrants OS.

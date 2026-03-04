# Research Gaps (Ecosystem Canvas PoC)

Findings and open questions from implementation.

## 1. Karma GAP API

- **Status**: Implemented via fetch (no SDK).
- **Shape**: `GET /v2/projects` returns list; `GET /v2/projects/{uid}` returns full project with `milestones` array.
- **Rate limits**: Unknown; no errors observed during development.
- **Auth**: Not required for read endpoints.
- **Project IDs**: No specific Green Goods/ReFi DAO project IDs documented; adapter fetches first 8–12 projects.

## 2. Octant V2 API

- **Status**: Not implemented.
- **Finding**: No public REST API found; may require contract reads or subgraph.
- **Next**: Research Octant subgraph or SDK for vault data.

## 3. Gardens subgraph

- **Status**: Not implemented.
- **Finding**: Conviction voting pools and funding allocations would require subgraph query.
- **Next**: Research Gardens subgraph schema and query format.

## 4. Hypercerts SDK

- **Status**: Not implemented.
- **Finding**: Minted hypercerts for Green Goods actions would need SDK or subgraph.
- **Next**: Evaluate Hypercerts SDK for fetching project attestations.

## 5. RevNets

- **Status**: Not implemented.
- **Finding**: Architecture still emerging.
- **Next**: Document interface requirements when available.

## 6. Superfluid subgraph

- **Status**: Not implemented.
- **Finding**: Stream data for real-time flow visualization would require subgraph.
- **Next**: Research Superfluid subgraph for stream queries.

## 7. Embeddable widget standards

- **Status**: Implemented (PostMessage, iframe).
- **Finding**: React component + iframe both work; PostMessage enables parent communication.
- **Next**: Evaluate Web Component for non-React sites if needed.

## 8. Layout algorithms

- **Status**: Using React Flow default (manual layout).
- **Finding**: For multi-level expandable graphs, dagre or elkjs could improve hierarchy.
- **Next**: Evaluate dagre vs elkjs for hierarchical fund flow layouts.

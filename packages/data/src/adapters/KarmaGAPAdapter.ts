/**
 * Karma GAP v2 API adapter - fetches real project and milestone data
 * Endpoint: gapapi.karmahq.xyz/v2/
 * Uses fetch for lightweight integration; @show-karma/karma-gap-sdk can be used for advanced features
 */

import type { CanvasNode, CanvasEdge } from '@ecosystem/canvas-core';
import type { DataAdapter, AdapterResult } from '../types';

const KARMA_API_BASE = 'https://gapapi.karmahq.xyz/v2';

interface KarmaProject {
  uid: string;
  chainID: number;
  owner: string;
  details?: {
    title?: string;
    description?: string;
    slug?: string;
    logoUrl?: string;
  };
  milestones?: Array<{
    uid?: string;
    title?: string;
    description?: string;
    status?: string;
    completedAt?: string;
  }>;
}

function projectToNode(project: KarmaProject, index: number): CanvasNode {
  const details = project.details ?? {};
  const milestones = project.milestones ?? [];
  const completed = milestones.filter((m) => m.status === 'done' || m.completedAt).length;

  return {
    id: `karma-${project.uid.slice(0, 16)}`,
    type: 'project',
    position: { x: 150 + (index % 4) * 220, y: 350 + Math.floor(index / 4) * 180 },
    data: {
      name: details.title ?? 'Untitled Project',
      description: (details.description ?? '').slice(0, 120),
      team: 1,
      totalFunding: [{ amount: '0', token: 'USD', chain: chainIdToName(project.chainID), usdValue: 0 }],
      milestones: milestones.length,
      completedMilestones: completed,
      karmaUid: project.uid,
      chainID: project.chainID,
    },
  };
}

function chainIdToName(chainId: number): string {
  const map: Record<number, string> = {
    1: 'ethereum',
    10: 'optimism',
    42161: 'arbitrum',
    42220: 'celo',
    8453: 'base',
  };
  return map[chainId] ?? `chain-${chainId}`;
}

export class KarmaGAPAdapter implements DataAdapter {
  id = 'karma-gap';
  name = 'Karma GAP (Live)';
  isLive = true;

  async load(view: 'integrations' | 'fund-flows'): Promise<AdapterResult> {
    if (view === 'integrations') {
      return {
        nodes: [],
        edges: [],
        metadata: {
          source: 'karma-gap',
          lastUpdated: new Date().toISOString(),
          itemCount: 0,
          note: 'Karma GAP adapter provides fund-flows data only',
        },
      };
    }

    try {
      const projects = await this.fetchProjects();
      const nodes = projects.map((p, i) => projectToNode(p, i));
      const edges = this.buildEdges(nodes);

      return {
        nodes,
        edges,
        metadata: {
          source: 'karma-gap',
          lastUpdated: new Date().toISOString(),
          itemCount: nodes.length + edges.length,
        },
      };
    } catch (err) {
      return {
        nodes: [],
        edges: [],
        metadata: {
          source: 'karma-gap',
          lastUpdated: new Date().toISOString(),
          error: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }

  private async fetchProjects(): Promise<KarmaProject[]> {
    const res = await fetch(`${KARMA_API_BASE}/projects?limit=12`);
    if (!res.ok) throw new Error(`Karma API error: ${res.status}`);
    const list: KarmaProject[] = await res.json();

    const withMilestones: KarmaProject[] = [];
    for (let i = 0; i < Math.min(list.length, 8); i++) {
      const p = list[i];
      try {
        const detailRes = await fetch(`${KARMA_API_BASE}/projects/${p.uid}`);
        if (detailRes.ok) {
          const full = (await detailRes.json()) as KarmaProject;
          withMilestones.push(full);
        } else {
          withMilestones.push(p);
        }
      } catch {
        withMilestones.push(p);
      }
    }
    return withMilestones;
  }

  private buildEdges(_nodes: CanvasNode[]): CanvasEdge[] {
    return [];
  }
}

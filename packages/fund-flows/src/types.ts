/**
 * Types for fund flow visualization
 * Based on opengrants-os grant types
 */

export interface TokenAmount extends Record<string, unknown> {
  amount: string;
  token: string;
  chain: string;
  usdValue?: number;
}

export interface FunderData extends Record<string, unknown> {
  name: string;
  type: 'DAO' | 'Foundation' | 'Cooperative' | 'Project';
  totalFunding: TokenAmount[];
  programs: number;
  logo?: string;
  website?: string;
}

export interface ProgramData extends Record<string, unknown> {
  name: string;
  type: 'QuadraticFunding' | 'DirectGrants' | 'RetroFunding' | 'Bounties';
  totalFunding: TokenAmount[];
  applications: number;
  projects: number;
  isActive: boolean;
}

export interface ProjectData extends Record<string, unknown> {
  name: string;
  description: string;
  team: number;
  totalFunding: TokenAmount[];
  milestones: number;
  completedMilestones: number;
}

export interface TreasuryData extends Record<string, unknown> {
  name: string;
  balance: TokenAmount[];
  signers: number;
  threshold: number;
  chain: string;
}

/** Yield-based vault (Octant, Impact Stake/Lido) */
export interface YieldVaultData extends Record<string, unknown> {
  name: string;
  type: 'DAI' | 'ETH' | 'USDC';
  balance: TokenAmount[];
  apy?: number;
  chain: string;
  recipients?: number;
}

/** Superfluid or other streaming flow */
export interface StreamData extends Record<string, unknown> {
  name: string;
  recipient: string;
  ratePerSecond: string;
  token: string;
  status: 'active' | 'paused' | 'completed';
}

/** Domain-specific funding round (waste, agroforestry, etc.) */
export interface DomainRoundData extends Record<string, unknown> {
  name: string;
  domain: string;
  totalFunding: TokenAmount[];
  projects: number;
  isActive: boolean;
}

/** Project deliverable / milestone */
export interface DeliverableData extends Record<string, unknown> {
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  milestoneIndex?: number;
}

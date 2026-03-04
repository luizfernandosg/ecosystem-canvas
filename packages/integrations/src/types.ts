/**
 * Types for integration map visualization
 * Protocol relationships, application integrations, infrastructure
 */

export type ProtocolType =
  | 'Karma GAP'
  | 'Hypercerts'
  | 'Gardens'
  | 'Octant'
  | 'Safe'
  | 'Hats Protocol'
  | 'EAS'
  | 'Unlock Protocol'
  | 'RevNets'
  | 'Cookie Jar'
  | 'Gitcoin'
  | 'Giveth';

export type IntegrationConnectionType = 'api' | 'onchain' | 'data' | 'governance';

export interface ProtocolData extends Record<string, unknown> {
  name: string;
  type: ProtocolType;
  description?: string;
  website?: string;
  status?: 'active' | 'planned' | 'deprecated';
  subIntegrations?: string[];
}

export interface ApplicationData extends Record<string, unknown> {
  name: string;
  description?: string;
  website?: string;
  protocols: string[];
  status?: 'active' | 'planned' | 'deprecated';
}

export interface InfraData extends Record<string, unknown> {
  name: string;
  type: 'multisig' | 'attestation' | 'vault' | 'identity';
  description?: string;
  chain?: string;
  status?: 'active' | 'planned' | 'deprecated';
}

export interface IntegrationEdgeData extends Record<string, unknown> {
  connectionType: IntegrationConnectionType;
  label?: string;
  direction?: 'bidirectional' | 'source-to-target' | 'target-to-source';
  status?: 'active' | 'planned' | 'deprecated';
}

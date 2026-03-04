/**
 * Widget configuration types
 */

export type WidgetTheme = 'functional' | 'daocore' | 'regen' | 'ocean' | 'forest';

export type CanvasView = 'integrations' | 'fund-flows';

export interface EcosystemWidgetProps {
  /** Which canvas view to display */
  view?: CanvasView;
  /** Theme for the canvas */
  theme?: WidgetTheme;
  /** Initial nodes (optional - can be loaded from adapter) */
  initialNodes?: unknown[];
  /** Initial edges (optional) */
  initialEdges?: unknown[];
  /** Callback when a node is clicked */
  onNodeClick?: (nodeId: string, nodeData: unknown) => void;
  /** Callback when export is requested */
  onExport?: (format: string) => void;
  /** Callback for navigation (e.g. deep-link to toolkit article) */
  onNavigate?: (url: string) => void;
  /** Whether to show controls (zoom, fit) */
  showControls?: boolean;
  /** Whether to show background grid */
  showBackground?: boolean;
  /** CSS class name for the container */
  className?: string;
  /** Enable iframe PostMessage mode */
  iframeMode?: boolean;
}

/**
 * PostMessage API for iframe embedding
 * Enables parent window (ReFi DAO, Regen Coordination sites) to communicate with embedded canvas
 */

export const WIDGET_ORIGIN = '*';

export type WidgetMessageType =
  | 'ECOSYSTEM_NODE_CLICK'
  | 'ECOSYSTEM_EXPORT'
  | 'ECOSYSTEM_NAVIGATE'
  | 'ECOSYSTEM_READY'
  | 'ECOSYSTEM_ERROR';

export type ParentMessageType =
  | 'ECOSYSTEM_SET_THEME'
  | 'ECOSYSTEM_SET_VIEW'
  | 'ECOSYSTEM_SET_DATA_SOURCE'
  | 'ECOSYSTEM_FIT_VIEW';

export interface WidgetOutMessage {
  type: WidgetMessageType;
  payload?: unknown;
  timestamp: number;
}

export interface ParentInMessage {
  type: ParentMessageType;
  payload?: unknown;
  timestamp?: number;
}

export function postToParent(message: Omit<WidgetOutMessage, 'timestamp'>): void {
  if (typeof window === 'undefined' || !window.parent || window.parent === window) return;
  try {
    window.parent.postMessage(
      { ...message, timestamp: Date.now() } as WidgetOutMessage,
      WIDGET_ORIGIN
    );
  } catch {
    // Cross-origin or other postMessage failure
  }
}

export function createParentMessageListener(
  handler: (message: ParentInMessage) => void
): () => void {
  const listener = (event: MessageEvent) => {
    const data = event.data;
    if (data && typeof data === 'object' && typeof data.type === 'string' && data.type.startsWith('ECOSYSTEM_')) {
      handler(data as ParentInMessage);
    }
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
}

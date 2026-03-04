/**
 * Embeddable view for iframe embedding
 * Minimal UI, PostMessage API enabled for parent communication
 * Routes: /embed/integrations, /embed/fund-flows
 */

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IntegrationsCanvas } from './IntegrationsCanvas';
import { FundFlowsCanvas } from './FundFlowsCanvas';

function postToParent(type: string, payload?: unknown) {
  try {
    window.parent?.postMessage?.({ type, payload, timestamp: Date.now() }, '*');
  } catch {
    /* ignore */
  }
}

export function EmbedView() {
  const location = useLocation();
  const [theme, setTheme] = useState<'regen' | 'functional' | 'daocore'>('regen');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (data?.type === 'ECOSYSTEM_SET_THEME' && data.payload?.theme) {
        setTheme(data.payload.theme);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const onNodeClick = useCallback((nodeId: string, data: unknown) => {
    postToParent('ECOSYSTEM_NODE_CLICK', { nodeId, data });
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      postToParent('ECOSYSTEM_READY', { theme });
    }
  }, [ready, theme]);

  const path = location.pathname.replace(/^\/embed/, '') || '/integrations';
  const isIntegrations = path === '/integrations' || path === '/' || path === '';

  return (
    <div className="w-full h-screen bg-white">
      {isIntegrations ? (
        <IntegrationsCanvas theme={theme} onNodeClickExternal={onNodeClick} />
      ) : (
        <FundFlowsCanvas theme={theme} onNodeClickExternal={onNodeClick} />
      )}
    </div>
  );
}

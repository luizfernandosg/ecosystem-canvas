import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { IntegrationsCanvas } from './views/IntegrationsCanvas';
import { FundFlowsCanvas } from './views/FundFlowsCanvas';
import { EmbedView } from './views/EmbedView';

function App() {
  const [theme, setTheme] = useState<'regen' | 'functional' | 'daocore'>('regen');

  return (
    <div className="flex flex-col w-full h-screen">
      <Routes>
        <Route path="/embed/*" element={<EmbedView />} />
        <Route
          path="/*"
          element={
            <>
              <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h1 className="text-xl font-semibold text-gray-900">Ecosystem Canvas Explorer</h1>
                <nav className="flex items-center gap-4">
                  <NavLink
                    to="/integrations"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    Integrations
                  </NavLink>
                  <NavLink
                    to="/fund-flows"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    Fund Flows
                  </NavLink>
                  <a
                    href="/embed/integrations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Embed
                  </a>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as 'regen' | 'functional' | 'daocore')}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="regen">Regen</option>
                    <option value="functional">Functional</option>
                    <option value="daocore">DAO Core</option>
                  </select>
                </nav>
              </header>
              <main className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={<IntegrationsCanvas theme={theme} />} />
                  <Route path="/integrations" element={<IntegrationsCanvas theme={theme} />} />
                  <Route path="/fund-flows" element={<FundFlowsCanvas theme={theme} />} />
                </Routes>
              </main>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

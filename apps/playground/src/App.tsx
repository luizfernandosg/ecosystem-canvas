import { useState } from 'react';
import { BasicCanvasExample } from './examples/BasicCanvasExample';
import { FundFlowExample } from './examples/FundFlowExample';
import { ThemeSwitcherExample } from './examples/ThemeSwitcherExample';

type ExampleType = 'basic' | 'fund-flow' | 'theme-switcher';

const examples: { id: ExampleType; label: string }[] = [
  { id: 'basic', label: 'Basic Canvas' },
  { id: 'fund-flow', label: 'Fund Flow Visualization' },
  { id: 'theme-switcher', label: 'Theme Switcher' },
];

function App() {
  const [activeExample, setActiveExample] = useState<ExampleType>('basic');

  const renderExample = () => {
    switch (activeExample) {
      case 'basic':
        return <BasicCanvasExample />;
      case 'fund-flow':
        return <FundFlowExample />;
      case 'theme-switcher':
        return <ThemeSwitcherExample />;
      default:
        return <BasicCanvasExample />;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          gap: '8px',
        }}
      >
        <h1 style={{ margin: 0, marginRight: '24px', fontSize: '20px', fontWeight: 600 }}>
          Ecosystem Canvas Playground
        </h1>
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setActiveExample(example.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: activeExample === example.id ? '#007bff' : 'white',
              color: activeExample === example.id ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeExample === example.id ? 600 : 400,
            }}
          >
            {example.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative' }}>{renderExample()}</div>
    </div>
  );
}

export default App;

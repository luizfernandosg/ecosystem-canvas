import type { Preview } from '@storybook/react';
import '@xyflow/react/dist/style.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'functional',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['functional', 'daocore', 'regen', 'ocean', 'forest'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

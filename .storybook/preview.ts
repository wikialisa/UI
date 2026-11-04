import { Preview } from '@storybook/html';
import '../tokens/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#F8FAFC' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#0F172A' },
      ],
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
};

export default preview;

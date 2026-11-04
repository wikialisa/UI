import { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|ts|html)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;

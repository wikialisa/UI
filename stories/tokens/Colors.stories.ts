import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Design System/Color Tokens',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Agriculture Solar Pump Design System — Color token palette (Solar, Agri, Sky, Neutral, Semantic)',
      },
    },
  },
};
export default meta;

const swatch = (name: string, value: string, cssVar: string) => `
  <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid #E2E8F0;">
    <div style="width:48px;height:48px;border-radius:8px;background:${value};border:1px solid rgba(0,0,0,0.08);flex-shrink:0;"></div>
    <div>
      <div style="font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#0F172A;">${name}</div>
      <div style="font-family:monospace;font-size:11px;color:#64748B;">${cssVar}</div>
      <div style="font-family:monospace;font-size:11px;color:#94A3B8;">${value}</div>
    </div>
  </div>
`;

const group = (title: string, swatches: string) => `
  <div style="margin-bottom:32px;">
    <h3 style="font-family:Inter,sans-serif;font-size:14px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px;">${title}</h3>
    ${swatches}
  </div>
`;

export const Solar: StoryObj = {
  render: () => group('Solar Brand', [
    swatch('Solar 50',  '#FFF9E6', '--color-solar-50'),
    swatch('Solar 100', '#FFF1B8', '--color-solar-100'),
    swatch('Solar 200', '#FFE480', '--color-solar-200'),
    swatch('Solar 300', '#FFD347', '--color-solar-300'),
    swatch('Solar 400', '#FFC01F', '--color-solar-400'),
    swatch('Solar 500 — Primary', '#E59800', '--color-solar-500'),
    swatch('Solar 600', '#C68200', '--color-solar-600'),
    swatch('Solar 700', '#9E6400', '--color-solar-700'),
  ].join('')),
};

export const Agriculture: StoryObj = {
  render: () => group('Agriculture (Agri) Brand', [
    swatch('Agri 50',  '#EBF7EE', '--color-agri-50'),
    swatch('Agri 100', '#C8EBD0', '--color-agri-100'),
    swatch('Agri 200', '#94D9A2', '--color-agri-200'),
    swatch('Agri 300', '#58C26E', '--color-agri-300'),
    swatch('Agri 400', '#2FA94B', '--color-agri-400'),
    swatch('Agri 500 — Primary Leaf Green', '#1B873F', '--color-agri-500'),
    swatch('Agri 600', '#146830', '--color-agri-600'),
    swatch('Agri 700', '#0F4E24', '--color-agri-700'),
  ].join('')),
};

export const Semantic: StoryObj = {
  render: () => group('Semantic Colors', [
    swatch('Success', '#16A34A', '--color-semantic-success'),
    swatch('Warning', '#D97706', '--color-semantic-warning'),
    swatch('Danger',  '#DC2626', '--color-semantic-danger'),
    swatch('Info',    '#2563EB', '--color-semantic-info'),
  ].join('')),
};

export const Sky: StoryObj = {
  render: () => group('Sky / Water Brand', [
    swatch('Sky 50',  '#F0F9FF', '--color-sky-50'),
    swatch('Sky 500 — Water Blue', '#0284C7', '--color-sky-500'),
    swatch('Sky 600', '#0369A1', '--color-sky-600'),
  ].join('')),
};

export const Neutral: StoryObj = {
  render: () => group('Neutral Scale', [
    swatch('Neutral 50',  '#F8FAFC', '--color-neutral-50'),
    swatch('Neutral 100', '#F1F5F9', '--color-neutral-100'),
    swatch('Neutral 200', '#E2E8F0', '--color-neutral-200'),
    swatch('Neutral 300', '#CBD5E1', '--color-neutral-300'),
    swatch('Neutral 400', '#94A3B8', '--color-neutral-400'),
    swatch('Neutral 500', '#64748B', '--color-neutral-500'),
    swatch('Neutral 600', '#475569', '--color-neutral-600'),
    swatch('Neutral 700', '#334155', '--color-neutral-700'),
    swatch('Neutral 800', '#1E293B', '--color-neutral-800'),
    swatch('Neutral 900', '#0F172A', '--color-neutral-900'),
  ].join('')),
};

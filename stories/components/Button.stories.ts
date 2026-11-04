import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Nút bấm đa dụng — 3 variant (primary, secondary, danger) × 3 size (sm, md, lg). Touch targets tuân theo tiêu chuẩn Farmer role: md=56px, lg=64px.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    label:   { control: 'text' },
    disabled:{ control: 'boolean' },
  },
};
export default meta;

type ButtonArgs = { variant: string; size: string; label: string; disabled: boolean };

const VARIANT_STYLES: Record<string, string> = {
  primary:   'background:#1B873F;color:#FFFFFF;border:none;box-shadow:0 4px 12px rgba(27,135,63,0.35);',
  secondary: 'background:#FFFFFF;color:#1B873F;border:2px solid #1B873F;box-shadow:0 2px 6px rgba(0,0,0,0.08);',
  danger:    'background:#DC2626;color:#FFFFFF;border:none;box-shadow:0 4px 12px rgba(220,38,38,0.35);',
  ghost:     'background:transparent;color:#1B873F;border:none;',
};

const SIZE_STYLES: Record<string, string> = {
  sm: 'height:40px;padding:0 20px;font-size:13px;border-radius:9999px;',
  md: 'height:56px;padding:0 28px;font-size:15px;border-radius:9999px;',
  lg: 'height:64px;padding:0 36px;font-size:17px;border-radius:9999px;font-weight:700;',
};

const buttonHTML = ({ variant = 'primary', size = 'md', label = 'Xác nhận', disabled = false }: Partial<ButtonArgs>) => `
  <button
    style="
      ${VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary}
      ${SIZE_STYLES[size] ?? SIZE_STYLES.md}
      font-family:'Inter',sans-serif;
      font-weight:600;
      cursor:${disabled ? 'not-allowed' : 'pointer'};
      opacity:${disabled ? '0.5' : '1'};
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      transition:opacity 0.15s;
      min-width:120px;
    "
    ${disabled ? 'disabled aria-disabled="true"' : ''}
  >
    ${label}
  </button>
`;

export const Primary: StoryObj<ButtonArgs> = {
  args: { variant: 'primary', size: 'md', label: 'Xác nhận', disabled: false },
  render: buttonHTML,
};

export const Danger: StoryObj<ButtonArgs> = {
  name: 'Danger (Emergency Stop)',
  args: { variant: 'danger', size: 'lg', label: '⛔ Dừng Khẩn Cấp', disabled: false },
  render: buttonHTML,
};

export const Secondary: StoryObj<ButtonArgs> = {
  args: { variant: 'secondary', size: 'md', label: 'Tắt Bơm', disabled: false },
  render: buttonHTML,
};

export const AllVariants: StoryObj = {
  name: 'All Variants',
  render: () => `
    <div style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#F8FAFC;border-radius:12px;">
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        ${buttonHTML({ variant: 'primary', size: 'sm', label: 'Small' })}
        ${buttonHTML({ variant: 'primary', size: 'md', label: 'Medium (56px)' })}
        ${buttonHTML({ variant: 'primary', size: 'lg', label: 'Large (64px)' })}
      </div>
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        ${buttonHTML({ variant: 'secondary', size: 'md', label: 'Secondary' })}
        ${buttonHTML({ variant: 'danger',    size: 'md', label: '⛔ Danger' })}
        ${buttonHTML({ variant: 'ghost',     size: 'md', label: 'Ghost' })}
        ${buttonHTML({ variant: 'primary',   size: 'md', label: 'Disabled', disabled: true })}
      </div>
    </div>
  `,
};

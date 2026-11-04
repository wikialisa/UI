import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/StatusChip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '14 trạng thái nghiệp vụ trạm bơm năng lượng mặt trời. Mỗi chip hiển thị trạng thái hiện tại của thiết bị.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: [
        'DRAFT','DISPATCHED','DELIVERED','INSTALLING','TESTING_PUMP',
        'QA_PENDING','QA_APPROVED','QA_REJECTED','ACTIVE_PUMPING',
        'SOLAR_INSUFFICIENT','FAULT_OVERHEAT','DRY_RUN_PROTECTION',
        'MAINTENANCE_DUE','OFFLINE_SYNC_PENDING',
      ],
    },
  },
};
export default meta;

const STATE_CONFIG: Record<string, { label: string; emoji: string; bg: string; color: string; border: string }> = {
  DRAFT:                { label: 'Hồ Sơ Mới',          emoji: '📋', bg: '#F1F5F9', color: '#334155', border: '#CBD5E1' },
  DISPATCHED:           { label: 'Đang Vận Chuyển',     emoji: '🚚', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  DELIVERED:            { label: 'Đã Bàn Giao',         emoji: '📦', bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  INSTALLING:           { label: 'Đang Lắp Đặt',        emoji: '🔧', bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
  TESTING_PUMP:         { label: 'Chạy Thử Nghiệm',     emoji: '💧', bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD' },
  QA_PENDING:           { label: 'Chờ Kiểm Định',       emoji: '🔍', bg: '#FEFCE8', color: '#A16207', border: '#FDE68A' },
  QA_APPROVED:          { label: 'Nghiệm Thu Đạt',      emoji: '✅', bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  QA_REJECTED:          { label: 'Lỗi Kỹ Thuật',        emoji: '❌', bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA' },
  ACTIVE_PUMPING:       { label: 'Đang Bơm',            emoji: '⚡', bg: '#EBF7EE', color: '#1B873F', border: '#94D9A2' },
  SOLAR_INSUFFICIENT:   { label: 'Nắng Yếu',            emoji: '⛅', bg: '#FFF9E6', color: '#9E6400', border: '#FFD347' },
  FAULT_OVERHEAT:       { label: 'Quá Nhiệt',           emoji: '🌡️', bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  DRY_RUN_PROTECTION:   { label: 'Giếng Gần Cạn',       emoji: '⚠️', bg: '#FFF9E6', color: '#D97706', border: '#FDE68A' },
  MAINTENANCE_DUE:      { label: 'Đến Hạn Bảo Dưỡng',  emoji: '🔩', bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
  OFFLINE_SYNC_PENDING: { label: 'Chờ Đồng Bộ',         emoji: '📶', bg: '#F8FAFC', color: '#64748B', border: '#CBD5E1' },
};

const chipHTML = (state: string) => {
  const cfg = STATE_CONFIG[state] ?? STATE_CONFIG['DRAFT'];
  return `
    <span style="
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:6px 14px;
      border-radius:9999px;
      background:${cfg.bg};
      color:${cfg.color};
      border:1.5px solid ${cfg.border};
      font-family:'Inter',sans-serif;
      font-size:14px;
      font-weight:700;
      line-height:1.5;
      white-space:nowrap;
      box-shadow:0 1px 3px rgba(0,0,0,0.08);
      letter-spacing:0.01em;
    ">
      <span aria-hidden="true" style="font-size:15px;">${cfg.emoji}</span>
      ${cfg.label}
    </span>
  `;
};

export const Default: StoryObj<{ state: string }> = {
  args: { state: 'ACTIVE_PUMPING' },
  render: ({ state }) => chipHTML(state),
};

export const AllStates: StoryObj = {
  name: 'All 14 States',
  render: () => `
    <div style="
      display:flex;
      flex-wrap:wrap;
      gap:12px;
      padding:24px;
      background:#F8FAFC;
      border-radius:12px;
      font-family:'Inter',sans-serif;
    ">
      ${Object.keys(STATE_CONFIG).map(chipHTML).join('')}
    </div>
  `,
};

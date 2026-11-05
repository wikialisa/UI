// src/data/brandToolkitData.ts
export interface CodeSnippet {
  label: string;
  language: string;
  code: string;
}

export interface BrandTool {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  snippets?: CodeSnippet[];
  links?: { label: string; url: string }[];
  tags?: string[];
}

export interface BrandPersona {
  id: string;
  title: string;
  titleVi: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  textColor: string;
  borderColor: string;
  bgLight: string;
  description: string;
  descriptionVi: string;
  quickstartSteps: string[];
  tools: BrandTool[];
}

export const BRAND_PERSONAS: BrandPersona[] = [
  // ─── 1. FRONT-END DEVELOPER ───────────────────────────────────────────────
  {
    id: 'frontend-dev',
    title: 'Front-End Developer',
    titleVi: 'Lập trình viên Front-End',
    emoji: '🎨',
    colorFrom: 'from-violet-500',
    colorTo: 'to-purple-700',
    textColor: 'text-violet-600 dark:text-violet-400',
    borderColor: 'border-violet-500/30',
    bgLight: 'bg-violet-500/8',
    description: 'Build pixel-perfect UI with WikiAlisa Design System, Tailwind tokens and React components.',
    descriptionVi: 'Xây dựng giao diện chuẩn pixel với Hệ thống Thiết kế WikiAlisa, token Tailwind và component React.',
    quickstartSteps: [
      'Clone repo: git clone https://github.com/wikialisa/UI && cd user',
      'Cài đặt dependencies: pnpm install',
      'Khởi động dev server: pnpm dev → localhost:5173',
      'Import component: from src/ui/primitives',
      'Áp dụng design token từ src/theme.css',
      'Chạy kiểm tra type: pnpm type-check',
      'Build production: pnpm build',
    ],
    tools: [
      {
        id: 'component-install',
        title: 'Component Library',
        description: 'Import component UI cơ bản từ hệ thống primitives của WikiAlisa.',
        badge: 'React 19',
        badgeColor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
        snippets: [
          {
            label: 'Import Primitives',
            language: 'tsx',
            code: `import { Button } from '@/ui/primitives/Button/Button';
import { Card } from '@/ui/primitives/Card/Card';
import { Badge } from '@/ui/primitives/Badge/Badge';
import { Input } from '@/ui/primitives/Input/Input';

// Usage example
export const PumpCard = ({ pump }) => (
  <Card variant="elevated">
    <Badge variant="success">{pump.status}</Badge>
    <Input label="Công suất (W)" value={pump.power} />
    <Button variant="primary" size="sm">Xem chi tiết</Button>
  </Card>
);`,
          },
          {
            label: 'Tailwind Config',
            language: 'js',
            code: `// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary:  '#10b981', // emerald-500
          dark:     '#059669', // emerald-600
          light:    '#d1fae5', // emerald-100
          accent:   '#5caa3c',
        },
        solar: {
          yellow: '#f59e0b',
          orange: '#ea580c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
    },
  },
};`,
          },
        ],
      },
      {
        id: 'design-tokens',
        title: 'Design Tokens (CSS Vars)',
        description: 'Các biến CSS toàn cục đồng bộ từ Figma Variables.',
        badge: 'src/theme.css',
        badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
        snippets: [
          {
            label: 'theme.css (trích)',
            language: 'css',
            code: `:root {
  /* ── Color Primitives ── */
  --color-brand-primary: #10b981;
  --color-brand-dark:    #059669;
  --color-solar-yellow:  #f59e0b;
  --color-alert-red:     #ef4444;

  /* ── Spacing Scale (8pt grid) ── */
  --space-1: 4px;  --space-2: 8px;
  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px;

  /* ── Typography ── */
  --font-size-xs:   0.75rem;  /* 12px */
  --font-size-sm:   0.875rem; /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg:   1.125rem; /* 18px */
  --font-size-xl:   1.25rem;  /* 20px */
  --font-size-2xl:  1.5rem;   /* 24px */

  /* ── Shadows ── */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,.08);
  --shadow-lg: 0 10px 40px rgba(0,0,0,.12);
}`,
          },
        ],
      },
    ],
  },

  // ─── 2. BACK-END DEVELOPER ────────────────────────────────────────────────
  {
    id: 'backend-dev',
    title: 'Back-End Developer',
    titleVi: 'Lập trình viên Back-End',
    emoji: '⚙️',
    colorFrom: 'from-orange-500',
    colorTo: 'to-red-700',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-500/30',
    bgLight: 'bg-orange-500/8',
    description: 'REST API contracts, MQTT topic hierarchy, TimescaleDB schema and Protobuf definitions.',
    descriptionVi: 'Hợp đồng REST API, hệ thống topic MQTT, schema TimescaleDB và định nghĩa Protobuf.',
    quickstartSteps: [
      'Đọc tài liệu kiến trúc: docs/system-architecture.md',
      'Cài đặt EMQX broker local: docker-compose up -d emqx',
      'Migrate database: pnpm db:migrate',
      'Chạy Telemetry Engine: go run ./cmd/telemetry',
      'Test MQTT publish: mosquitto_pub -t solar/+/telemetry -m \'{...}\'',
      'Xem API Swagger: http://localhost:8080/api/docs',
    ],
    tools: [
      {
        id: 'rest-api',
        title: 'REST API Endpoints',
        description: 'Danh sách API endpoints cốt lõi cho hệ thống Solar Pump.',
        badge: 'OpenAPI 3.1',
        badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
        snippets: [
          {
            label: 'Core API Routes',
            language: 'yaml',
            code: `# WikiAlisa Solar API — base: /api/v1
GET    /pumps                  # List all pumps (paginated)
GET    /pumps/{id}             # Pump detail + status
POST   /pumps                  # Register new pump
PATCH  /pumps/{id}/status      # Update pump status
GET    /pumps/{id}/telemetry   # Real-time metrics
GET    /orders                 # List delivery orders
POST   /orders                 # Create delivery order
PATCH  /orders/{id}/stage      # Advance lifecycle stage
GET    /afci/alerts            # Active AFCI alerts
POST   /afci/alerts/{id}/ack   # Acknowledge alert
GET    /reports/daily          # Daily energy yield
GET    /reports/farmers        # Farmer satisfaction scores`,
          },
          {
            label: 'JWT Auth Header',
            language: 'bash',
            code: `# Lấy JWT token
curl -X POST https://api.wikialisa.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"***"}'

# Dùng token trong mọi request
curl https://api.wikialisa.io/api/v1/pumps \\
  -H "Authorization: Bearer <JWT_TOKEN>" \\
  -H "X-WikiAlisa-Version: 2.4"`,
          },
        ],
      },
      {
        id: 'mqtt-schema',
        title: 'MQTT Topic Hierarchy',
        description: 'Cấu trúc topic MQTT cho dữ liệu telemetry và cảnh báo AFCI.',
        badge: 'MQTT 5.0 / TLS 1.3',
        badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
        snippets: [
          {
            label: 'Topic Structure',
            language: 'bash',
            code: `# Telemetry (1 Hz publish)
solar/{farm_id}/{pump_id}/telemetry
  → { vDc, iDc, pDc, vAc, iAc, pAc, freq, temp, ts }

# AFCI Alerts (event-driven)
solar/{farm_id}/{pump_id}/afci/alert
  → { severity: 0|1|2, type, faultCode, ts }

# Commands (server → device)
solar/{farm_id}/{pump_id}/cmd
  → { action: "reset"|"shutdown"|"ota", payload }

# Health (30s heartbeat)
solar/{farm_id}/{pump_id}/health
  → { uptime, rssi, fwVersion, ts }`,
          },
        ],
      },
      {
        id: 'db-schema',
        title: 'TimescaleDB DDL Schema',
        description: 'Schema cơ sở dữ liệu time-series cho telemetry năng lượng.',
        badge: 'TimescaleDB 2.x',
        badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        snippets: [
          {
            label: 'DDL SQL',
            language: 'sql',
            code: `-- Hypertable: Pump Telemetry
CREATE TABLE pump_telemetry (
  ts         TIMESTAMPTZ NOT NULL,
  farm_id    UUID        NOT NULL,
  pump_id    UUID        NOT NULL,
  v_dc       FLOAT4,  -- Voltage DC (V)
  i_dc       FLOAT4,  -- Current DC (A)
  p_dc       FLOAT4,  -- Power DC (W)
  v_ac       FLOAT4,  -- Voltage AC (V)
  i_ac       FLOAT4,  -- Current AC (A)
  p_ac       FLOAT4,  -- Power AC (W)
  freq       FLOAT4,  -- Frequency (Hz)
  temp_c     FLOAT4,  -- Temperature (°C)
  daily_kwh  FLOAT4   -- Daily yield (kWh)
);
SELECT create_hypertable('pump_telemetry','ts');
CREATE INDEX ON pump_telemetry(pump_id, ts DESC);

-- Continuous aggregate: hourly
CREATE MATERIALIZED VIEW telemetry_hourly
WITH (timescaledb.continuous) AS
SELECT time_bucket('1 hour', ts) AS bucket,
       pump_id,
       AVG(p_dc) AS avg_power_w,
       SUM(daily_kwh) AS total_kwh
FROM pump_telemetry
GROUP BY bucket, pump_id;`,
          },
        ],
      },
    ],
  },

  // ─── 3. FULL-STACK DEVELOPER ──────────────────────────────────────────────
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer',
    titleVi: 'Lập trình viên Full-Stack',
    emoji: '🔗',
    colorFrom: 'from-teal-500',
    colorTo: 'to-emerald-700',
    textColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-500/30',
    bgLight: 'bg-teal-500/8',
    description: 'Monorepo setup, pnpm workspaces, E2E data flow from MQTT edge to React dashboard.',
    descriptionVi: 'Cài đặt monorepo, pnpm workspaces, luồng dữ liệu E2E từ MQTT edge đến dashboard React.',
    quickstartSteps: [
      'Fork và clone monorepo từ github.com/wikialisa/UI',
      'Cài đặt: pnpm install (workspace root)',
      'Copy env: cp .env-rename .env → điền FIGMA_ACCESS_TOKEN',
      'Khởi động frontend: pnpm dev',
      'Khởi động mock API: pnpm api:mock',
      'Xem E2E flow: pnpm storybook',
      'Build tất cả: pnpm build && pnpm build:api',
    ],
    tools: [
      {
        id: 'monorepo-structure',
        title: 'Monorepo Structure',
        description: 'Cấu trúc pnpm workspace của dự án WikiAlisa.',
        badge: 'pnpm workspaces',
        badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
        snippets: [
          {
            label: 'pnpm-workspace.yaml',
            language: 'yaml',
            code: `packages:
  - 'apps/*'      # Next.js / Vite frontends
  - 'services/*'  # Go / Node microservices
  - 'packages/*'  # Shared: ui, utils, types

# Directory layout:
# apps/
#   web/          ← Vite React SPA (this repo)
#   admin/        ← Admin panel
# services/
#   telemetry/    ← Go: MQTT → TimescaleDB
#   notifications/← Node: alerts → WebSocket
# packages/
#   ui/           ← Shared React components
#   types/        ← Shared TypeScript interfaces
#   utils/        ← Shared utilities`,
          },
          {
            label: 'E2E Data Flow',
            language: 'ts',
            code: `// packages/types/src/telemetry.ts
export interface TelemetryPayload {
  ts: string;        // ISO-8601 timestamp
  farmId: string;    // UUID
  pumpId: string;    // UUID
  vDc: number;       // V
  iDc: number;       // A
  pDc: number;       // W
  vAc: number;       // V
  iAc: number;       // A
  pAc: number;       // W
  freq: number;      // Hz
  tempC: number;     // °C
  dailyKwh: number;  // kWh
  afciStatus: 0 | 1 | 2; // 0=OK,1=WARN,2=FAULT
}

// Hook to subscribe via WebSocket
export function useLiveTelemetry(pumpId: string) {
  const [data, setData] = useState<TelemetryPayload | null>(null);
  useEffect(() => {
    const ws = new WebSocket(\`wss://api.wikialisa.io/ws/\${pumpId}\`);
    ws.onmessage = (e) => setData(JSON.parse(e.data));
    return () => ws.close();
  }, [pumpId]);
  return data;
}`,
          },
        ],
      },
    ],
  },

  // ─── 4. LEAD DEVELOPER ────────────────────────────────────────────────────
  {
    id: 'lead-dev',
    title: 'Lead Developer',
    titleVi: 'Trưởng nhóm Lập trình',
    emoji: '🏗️',
    colorFrom: 'from-blue-500',
    colorTo: 'to-indigo-700',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500/30',
    bgLight: 'bg-blue-500/8',
    description: 'Architecture Decision Records, PR review standards, module dependency graph, code quality gates.',
    descriptionVi: 'Hồ sơ quyết định kiến trúc, tiêu chuẩn review PR, biểu đồ phụ thuộc module, cổng chất lượng code.',
    quickstartSteps: [
      'Review kiến trúc tổng thể trong docs/architecture/',
      'Thiết lập branch protection rules trên GitHub',
      'Cấu hình GitHub Actions CI/CD pipeline',
      'Đặt SLA targets trong monitoring dashboard',
      'Chạy pnpm type-check trước mỗi merge vào main',
      'Review module dependency graph hàng tuần',
    ],
    tools: [
      {
        id: 'adrs',
        title: 'Architecture Decision Records',
        description: 'Các quyết định kiến trúc quan trọng đã được ghi lại.',
        badge: 'ADR Log',
        badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        snippets: [
          {
            label: 'ADR Template',
            language: 'md',
            code: `# ADR-001: Dùng MQTT 5.0 thay vì HTTP Polling

## Trạng thái: Accepted

## Bối cảnh
- 10,000+ pump nodes gửi dữ liệu mỗi giây
- HTTP polling gây overhead kết nối quá lớn

## Quyết định
Dùng MQTT 5.0 với EMQX broker, TLS 1.3

## Hậu quả
✅ Giảm 90% network overhead vs HTTP
✅ Hỗ trợ 1M+ concurrent connections
⚠️  Cần infrastructure EMQX (K8s deployment)

## Thay thế đã xem xét
- WebSocket only: không scalable với > 50k nodes
- HTTP/2 SSE: unidirectional, không gửi commands`,
          },
          {
            label: 'PR Review Checklist',
            language: 'md',
            code: `## WikiAlisa PR Review Checklist
- [ ] pnpm type-check exit 0
- [ ] Không có console.log() trong production code
- [ ] Component có PropTypes / TypeScript interface
- [ ] Thêm unit test cho logic mới
- [ ] Mobile viewport 390px tested
- [ ] Dark mode tested
- [ ] Accessibility: aria-labels đúng
- [ ] Performance: không có unnecessary re-renders
- [ ] Design token dùng CSS vars, không hardcode màu
- [ ] Commit message theo Conventional Commits`,
          },
        ],
      },
      {
        id: 'module-deps',
        title: 'Module Dependency Graph',
        description: 'Biểu đồ phụ thuộc 11 module của hệ thống WikiAlisa.',
        badge: '11 Modules',
        badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
        snippets: [
          {
            label: 'Module Dependencies',
            language: 'ts',
            code: `// Module dependency map
const MODULE_DEPS = {
  'M01': [],                   // Auth — no deps
  'M02': ['M01'],              // Delivery ← Auth
  'M03': ['M01','M02'],        // Installation ← Auth,Delivery
  'M04': ['M03'],              // QA ← Installation
  'M05': ['M04'],              // Handover ← QA
  'M06': ['M05'],              // Farmer App ← Handover
  'M07': ['M03','M04'],        // Service ← Install,QA
  'M08': ['M03','M07'],        // Solar Monitor ← Install,Service
  'M09': ['M01'],              // Admin Panel ← Auth
  'M10': ['M08','M09'],        // Analytics ← Solar,Admin
  'M11': ['M10'],              // AI Insights ← Analytics
};`,
          },
        ],
      },
    ],
  },

  // ─── 5. ENGINEERING MANAGER ───────────────────────────────────────────────
  {
    id: 'engineering-manager',
    title: 'Engineering Manager',
    titleVi: 'Quản lý Kỹ thuật',
    emoji: '📊',
    colorFrom: 'from-slate-600',
    colorTo: 'to-slate-900',
    textColor: 'text-slate-600 dark:text-slate-300',
    borderColor: 'border-slate-500/30',
    bgLight: 'bg-slate-500/8',
    description: 'Sprint velocity, team RACI, SLA targets, roadmap timeline and OKR tracking dashboard.',
    descriptionVi: 'Vận tốc sprint, ma trận RACI, SLA, lộ trình và theo dõi OKR.',
    quickstartSteps: [
      'Review GitHub Project Roadmap (@WikiAlisa UI Roadmap)',
      'Kiểm tra CI/CD pipeline status hàng ngày',
      'Theo dõi bundle size (target < 400kB gzipped)',
      'Review velocity metrics hàng sprint (2 tuần)',
      'Phê duyệt SLA: AFCI < 50ms, Dashboard < 500ms',
      'Monthly: review ADR log và tech debt backlog',
    ],
    tools: [
      {
        id: 'sla-targets',
        title: 'SLA Performance Targets',
        description: 'Các chỉ tiêu hiệu suất và cam kết dịch vụ.',
        badge: 'SLA v2.4',
        badgeColor: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
        snippets: [
          {
            label: 'SLA Table',
            language: 'md',
            code: `| Metric                   | Target   | Critical |
|--------------------------|----------|----------|
| AFCI Alert Latency       | < 50ms   | < 100ms  |
| Dashboard Load (P95)     | < 500ms  | < 1s     |
| API Response (P99)       | < 200ms  | < 500ms  |
| MQTT Message Throughput  | 10K msg/s| 50K msg/s|
| System Uptime            | 99.9%    | 99.5%    |
| Data Loss (Offline mode) | 0%       | < 0.01%  |
| Mobile App Crash Rate    | < 0.1%   | < 0.5%   |`,
          },
          {
            label: 'RACI Matrix',
            language: 'md',
            code: `| Task                  | FE Dev | BE Dev | Lead | EM  | Designer | PM  |
|-----------------------|--------|--------|------|-----|----------|-----|
| UI Component Build    | R      | I      | A    | I   | C        | I   |
| API Design            | C      | R      | A    | I   | I        | C   |
| Architecture Decision | C      | C      | R    | A   | I        | I   |
| Feature Prioritization| I      | I      | C    | C   | C        | R   |
| Sprint Planning       | C      | C      | C    | A   | C        | R   |
| Design Review         | C      | I      | I    | I   | R        | A   |

R=Responsible, A=Accountable, C=Consulted, I=Informed`,
          },
        ],
      },
    ],
  },

  // ─── 6. DESIGNER ──────────────────────────────────────────────────────────
  {
    id: 'designer',
    title: 'Designer',
    titleVi: 'Nhà Thiết kế',
    emoji: '✏️',
    colorFrom: 'from-pink-500',
    colorTo: 'to-rose-700',
    textColor: 'text-pink-600 dark:text-pink-400',
    borderColor: 'border-pink-500/30',
    bgLight: 'bg-pink-500/8',
    description: 'Figma file key, design token JSON, color palette, typography scale, 8pt grid and component inventory.',
    descriptionVi: 'File key Figma, JSON token, bảng màu, thang chữ, lưới 8pt và danh mục component.',
    quickstartSteps: [
      'Mở Figma file: figma.com/file/eq0EA9dRSWfS2ivuFohJdg',
      'Duplicate file về workspace cá nhân/tổ chức',
      'Cập nhật .env: FIGMA_FILE_KEY=<your-key>',
      'Chạy script sync tokens: pnpm tokens:sync',
      'Export icon mới: pnpm icons:export',
      'Xem component preview: pnpm storybook',
    ],
    tools: [
      {
        id: 'figma-access',
        title: 'Figma File & Code Connect',
        description: 'Truy cập file Figma và cấu hình Code Connect.',
        badge: 'Figma Code Connect',
        badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
        snippets: [
          {
            label: 'figma.config.json',
            language: 'json',
            code: `{
  "codeConnect": {
    "include": ["src/ui/**/*.figma.ts"],
    "parser": "react"
  },
  "projects": [{
    "fileKey": "eq0EA9dRSWfS2ivuFohJdg",
    "label": "WikiAlisa Solar Design System"
  }]
}`,
          },
          {
            label: 'Color Palette JSON',
            language: 'json',
            code: `{
  "color": {
    "brand": {
      "primary":  { "value": "#10b981", "type": "color" },
      "dark":     { "value": "#059669", "type": "color" },
      "light":    { "value": "#d1fae5", "type": "color" },
      "accent":   { "value": "#5caa3c", "type": "color" }
    },
    "solar": {
      "yellow":   { "value": "#f59e0b", "type": "color" },
      "orange":   { "value": "#ea580c", "type": "color" }
    },
    "afci": {
      "ok":       { "value": "#10b981", "type": "color" },
      "warning":  { "value": "#f59e0b", "type": "color" },
      "fault":    { "value": "#ef4444", "type": "color" }
    },
    "neutral": {
      "50":  { "value": "#f8fafc", "type": "color" },
      "900": { "value": "#0f172a", "type": "color" }
    }
  }
}`,
          },
        ],
      },
      {
        id: 'type-scale',
        title: 'Typography Scale (8pt Grid)',
        description: 'Thang chữ và lưới 8pt của hệ thống thiết kế.',
        badge: 'Manrope / Inter',
        badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
        snippets: [
          {
            label: 'Type Scale',
            language: 'md',
            code: `Font: Manrope (headings) / Inter (body)
Grid: 8pt base unit

| Token   | Size | Weight | Line Height |
|---------|------|--------|-------------|
| xs      | 12px | 400    | 16px        |
| sm      | 14px | 400    | 20px        |
| base    | 16px | 400    | 24px        |
| lg      | 18px | 500    | 28px        |
| xl      | 20px | 600    | 28px        |
| 2xl     | 24px | 700    | 32px        |
| 3xl     | 30px | 700    | 36px        |
| 4xl     | 36px | 800    | 40px        |

Spacing: 4, 8, 12, 16, 24, 32, 48, 64px
Radius:  4, 8, 12, 16, 24px`,
          },
        ],
      },
    ],
  },

  // ─── 7. PRODUCT MANAGER ───────────────────────────────────────────────────
  {
    id: 'product-manager',
    title: 'Product Manager',
    titleVi: 'Quản lý Sản phẩm',
    emoji: '🎯',
    colorFrom: 'from-amber-500',
    colorTo: 'to-yellow-700',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-500/30',
    bgLight: 'bg-amber-500/8',
    description: 'Business objectives, success KPIs, user story templates, feature prioritization and MVP vs V2 scope.',
    descriptionVi: 'Mục tiêu kinh doanh, KPI thành công, mẫu user story, ưu tiên tính năng, phạm vi MVP vs V2.',
    quickstartSteps: [
      'Review GitHub Project Roadmap (9 roadmap items)',
      'Xác nhận MVP scope: M01–M06 (6 modules cốt lõi)',
      'Phân loại V2 scope: M07–M11 (AI, Analytics, Admin)',
      'Thiết lập KPI tracking trong dashboard',
      'Viết user story theo format INVEST',
      'Sprint planning: 2 tuần/sprint, velocity ~20 story points',
    ],
    tools: [
      {
        id: 'kpi-metrics',
        title: 'KPI & Success Metrics',
        description: 'Chỉ số đo lường thành công sản phẩm.',
        badge: 'OKR Q4-2026',
        badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
        snippets: [
          {
            label: 'KPI Dashboard',
            language: 'md',
            code: `## WikiAlisa Solar — KPI Q4-2026

### Operational Metrics
| KPI                       | Baseline | Target Q4 |
|---------------------------|----------|-----------|
| Installation time (days)  | 7 days   | ≤ 3 days  |
| Paper forms eliminated    | 100%     | 100%      |
| Real-time tracking uptime | -        | ≥ 99.9%   |
| QA defect catch rate      | 60%      | ≥ 90%     |

### User Satisfaction
| Metric                    | Target   |
|---------------------------|----------|
| Farmer satisfaction score | ≥ 4.5/5  |
| Field team NPS            | ≥ 50     |
| App crash-free rate       | ≥ 99.5%  |
| Support ticket resolution | < 24h    |`,
          },
          {
            label: 'User Story Template',
            language: 'md',
            code: `## User Story (INVEST format)

**Story ID:** US-042
**Epic:** E05 — Solar Telemetry Monitoring
**Role:** Kỹ thuật viên lắp đặt

---
**As a** kỹ thuật viên lắp đặt,
**I want to** xem trạng thái AFCI của tấm pin
  theo thời gian thực trên điện thoại,
**So that** tôi có thể phát hiện sự cố hồ quang
  điện ngay tại hiện trường.

### Acceptance Criteria
- [ ] Hiển thị indicator AFCI: OK / WARN / FAULT
- [ ] Alert xuất hiện trong < 2 giây
- [ ] Hoạt động ở chế độ ngoại tuyến (offline)
- [ ] Hỗ trợ màn hình 390 × 844px (iPhone 14)

**Story Points:** 5 | **Priority:** P0`,
          },
        ],
      },
    ],
  },

  // ─── 8. EDUCATOR ──────────────────────────────────────────────────────────
  {
    id: 'educator',
    title: 'Educator',
    titleVi: 'Giảng viên / Người Giáo dục',
    emoji: '📚',
    colorFrom: 'from-cyan-500',
    colorTo: 'to-sky-700',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgLight: 'bg-cyan-500/8',
    description: '6-stage curriculum, 20-step lifecycle, lab exercises, glossary and teaching resources.',
    descriptionVi: 'Chương trình 6 giai đoạn, vòng đời 20 bước, bài tập thực hành, bảng thuật ngữ và tài nguyên dạy học.',
    quickstartSteps: [
      'Đọc tài liệu Stage 01: docs/02_product_overview_vi.md',
      'Demo live prototype: wikialisa.github.io/UI/',
      'Chạy local: git clone + pnpm install + pnpm dev',
      'Dùng InteractivePrototypeBar để demo 20 bước',
      'Dạy từng module M01→M11 theo thứ tự vòng đời',
      'Bài tập: sinh viên tự implement 1 component mới',
    ],
    tools: [
      {
        id: 'curriculum',
        title: 'Chương trình Giảng dạy 6 Giai đoạn',
        description: 'Lộ trình học tập từ cơ bản đến triển khai thực tế.',
        badge: '6 Stages × 4 Labs',
        badgeColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
        snippets: [
          {
            label: 'Curriculum Outline',
            language: 'md',
            code: `# WikiAlisa Solar — Chương trình 6 Giai đoạn

## Stage 1: Product Discovery (Tuần 1-2)
- Phân tích nghiệp vụ nông nghiệp năng lượng mặt trời
- Xác định 5 vai trò người dùng (5 roles)
- Vẽ user journey map
- Lab: Viết problem statement

## Stage 2: Design System (Tuần 3-4)
- Figma Variables & Design Tokens
- Component Library: Primitive → Composition
- 8pt Grid System
- Lab: Clone & extend 1 component

## Stage 3: Mobile Development (Tuần 5-7)
- React Native / React PWA (mobile-first 390px)
- Offline-First với IndexedDB
- Role-based Navigation (5 tabs)
- Lab: Implement QA Checklist screen

## Stage 4: Backend & IoT (Tuần 8-10)
- MQTT protocol & TimescaleDB
- REST API design với OpenAPI
- AFCI fault detection algorithm
- Lab: Publish fake telemetry via MQTT

## Stage 5: Integration (Tuần 11-12)
- WebSocket real-time dashboard
- Cross-module state management
- E2E testing với Playwright
- Lab: Connect FE ↔ BE ↔ MQTT

## Stage 6: Deploy & Operations (Tuần 13-14)
- GitHub Actions CI/CD
- GitHub Pages static deploy
- Monitoring & SLA
- Lab: Deploy cá nhân lên GitHub Pages`,
          },
        ],
      },
      {
        id: 'glossary',
        title: 'Bảng Thuật ngữ Kỹ thuật',
        description: 'Giải thích thuật ngữ quan trọng song ngữ Việt–Anh.',
        badge: 'Bilingual Glossary',
        badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
        snippets: [
          {
            label: 'Glossary (trích)',
            language: 'md',
            code: `| Thuật ngữ      | Tiếng Việt                        | Mô tả |
|----------------|-----------------------------------|-------|
| AFCI           | Bộ ngắt hồ quang điện            | Phát hiện & ngắt mạch khi có hồ quang |
| MQTT           | Giao thức nhắn tin M2M            | Lightweight pub/sub cho IoT |
| Telemetry      | Dữ liệu đo từ xa                 | Dữ liệu sensor gửi về server |
| TimescaleDB    | CSDL chuỗi thời gian             | PostgreSQL extension cho time-series |
| Design Token   | Token thiết kế                   | Giá trị CSS var đồng bộ từ Figma |
| PWA            | Ứng dụng web tiến bộ             | Web app cài được như native app |
| Offline-First  | Ưu tiên ngoại tuyến              | App hoạt động không cần mạng |
| Protobuf       | Protocol Buffers                  | Nén dữ liệu nhị phân của Google |
| Microservices  | Kiến trúc vi dịch vụ             | Mỗi chức năng là 1 service độc lập |
| CI/CD          | Tích hợp & triển khai liên tục   | Tự động build, test, deploy |`,
          },
        ],
      },
    ],
  },

  // ─── 9. STUDENT ───────────────────────────────────────────────────────────
  {
    id: 'student',
    title: 'Student',
    titleVi: 'Học sinh / Sinh viên',
    emoji: '🎓',
    colorFrom: 'from-lime-500',
    colorTo: 'to-green-700',
    textColor: 'text-lime-600 dark:text-lime-400',
    borderColor: 'border-lime-500/30',
    bgLight: 'bg-lime-500/8',
    description: 'Getting started guide, local dev setup, first contribution and curated learning resources.',
    descriptionVi: 'Hướng dẫn bắt đầu, cài đặt môi trường, đóng góp đầu tiên và tài nguyên học tập.',
    quickstartSteps: [
      '1. Cài Git: git-scm.com + Node.js 20 LTS + pnpm',
      '2. Fork repo trên GitHub → github.com/wikialisa/UI',
      '3. Clone về máy: git clone https://github.com/<you>/UI',
      '4. Cài packages: cd user && pnpm install',
      '5. Chạy dev: pnpm dev → mở localhost:5173',
      '6. Khám phá code: src/pages/LandingPage.tsx',
      '7. Tạo PR đầu tiên: sửa 1 bug nhỏ hoặc thêm translation',
    ],
    tools: [
      {
        id: 'first-setup',
        title: 'Cài đặt Môi trường Lần đầu',
        description: 'Hướng dẫn từng bước thiết lập môi trường phát triển.',
        badge: 'Beginner Friendly',
        badgeColor: 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
        snippets: [
          {
            label: 'Setup Commands',
            language: 'bash',
            code: `# Step 1: Cài Node.js 20 LTS từ nodejs.org
# Step 2: Cài pnpm
npm install -g pnpm

# Step 3: Clone repo
git clone https://github.com/wikialisa/UI.git
cd UI/user

# Step 4: Cài packages
pnpm install

# Step 5: Chạy dev server
pnpm dev
# → Mở trình duyệt: http://localhost:5173

# Step 6: Build thử
pnpm type-check   # Kiểm tra TypeScript
pnpm build        # Build production`,
          },
          {
            label: 'First Contribution',
            language: 'bash',
            code: `# Tạo branch mới
git checkout -b feat/my-first-change

# Sửa code ví dụ:
# Mở src/pages/LandingPage.tsx
# Thêm một dòng mô tả mới

# Commit thay đổi
git add .
git commit -m "feat: add description to landing hero"

# Đẩy lên fork của bạn
git push origin feat/my-first-change

# Tạo Pull Request trên GitHub
# → Nhấn "Compare & pull request"`,
          },
        ],
      },
      {
        id: 'learning-resources',
        title: 'Tài nguyên Học tập',
        description: 'Danh sách tài liệu và khóa học được khuyến nghị.',
        badge: 'Curated Resources',
        badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
        snippets: [
          {
            label: 'Learning Path',
            language: 'md',
            code: `## Lộ trình học WikiAlisa Stack

### 1. HTML/CSS/JavaScript cơ bản
- MDN Web Docs: developer.mozilla.org
- freeCodeCamp.org (miễn phí, tiếng Anh)

### 2. React & TypeScript
- React Docs: react.dev (tiếng Anh)
- TypeScript Handbook: typescriptlang.org/docs
- Video: Fireship.io React in 100s

### 3. Tailwind CSS
- tailwindcss.com/docs (tài liệu chính thức)

### 4. Git & GitHub
- learngitbranching.js.org (tương tác)
- Pro Git Book: git-scm.com/book (miễn phí)

### 5. IoT & MQTT (nâng cao)
- mqtt.org/getting-started/
- HiveMQ MQTT Essentials (blog series)

### 6. Dự án thực hành
- Clone wikialisa/UI và thêm 1 feature mới
- Tham gia Hacktoberfest hàng năm`,
          },
        ],
      },
    ],
  },
];

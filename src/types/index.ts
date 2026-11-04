// src/types/index.ts
// WikiAlisa Smart Solar Platform - TypeScript Type Definitions

export type RoleType = 
  | 'delivery'
  | 'install'
  | 'qa'
  | 'service'
  | 'farmer'
  | 'admin';

export interface KpiMetric {
  label: string;
  val: string;
}

export interface FigmaScreenRef {
  name: string;
  node: string;
  img: string;
}

export interface ModuleDefinition {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  tag: string;
  color: string;
  icon: string;
  summary: string;
  roles: string[];
  kpis: KpiMetric[];
  figmaScreens: FigmaScreenRef[];
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  source: string;
  eventName: string;
  payload: Record<string, unknown>;
  latencyMs?: number;
}

export interface LifecycleStep {
  step: string;
  title: string;
  role: string;
  moduleSlug: string;
  description: string;
}

export interface SystemState {
  name: string;
  code: string;
  desc: string;
  color: string;
}

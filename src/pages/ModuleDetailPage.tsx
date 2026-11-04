// src/pages/ModuleDetailPage.tsx
import React, { useState } from 'react';
import { ModuleDefinition, TelemetryEvent } from '../types';
import { RoadmapPipeline } from '../components/RoadmapPipeline';
import { MobileSimulatorFrame } from '../components/MobileSimulatorFrame';
import { EventBusStream } from '../components/EventBusStream';
import { useModuleWorkspaces } from '../components/workspaces/ModuleWorkspaces';
import { Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

interface ModuleDetailPageProps {
  module: ModuleDefinition;
}

export const ModuleDetailPage: React.FC<ModuleDetailPageProps> = ({ module }) => {
  const [events, setEvents] = useState<TelemetryEvent[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      source: `MODULE_${module.id}_CLIENT`,
      eventName: 'SURFACE_INITIALIZED',
      payload: {
        moduleId: module.id,
        screenStandard: '390x844px',
        telemetryReady: true
      }
    }
  ]);

  const handleEmitEvent = (eventName: string, payload: Record<string, unknown>, source?: string) => {
    const newEvent: TelemetryEvent = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      source: source || `MOBILE_MODULE_${module.id}`,
      eventName,
      payload
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleClearEvents = () => {
    setEvents([]);
  };

  const workspaces = useModuleWorkspaces({
    moduleId: module.id,
    onEmitEvent: handleEmitEvent
  });

  return (
    <div className="space-y-12">
      
      {/* MODULE HERO */}
      <section className="pt-8 pb-10 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  PHÂN HỆ {module.id} / 11
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {module.tag}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  390 × 844px Mobile First
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {module.title}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mt-1">
                {module.titleEn}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl mt-3 leading-relaxed">
                {module.summary}
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Vai Trò Phụ Trách:
              </div>
              <div className="flex flex-wrap gap-1 max-w-xs">
                {module.roles.map((r, ri) => (
                  <span key={ri} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {module.kpis.map((k, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm">
                <div className="text-xs text-slate-500 dark:text-slate-400">{k.label}</div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  {k.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP PIPELINE (MOBILE ➔ ADMIN) */}
      <RoadmapPipeline 
        moduleId={module.id} 
        onEmitEvent={handleEmitEvent} 
      />

      {/* DUAL-SURFACE LIVE DEMO WORKSPACE */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Không Gian Tương Tác Kép
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Live Simulator: Mobile 390px ⇄ Tháp Chỉ Huy Admin
              </h2>
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              Chuẩn màn hình: 390 × 844px
            </div>
          </div>

          {/* 3 Columns: Left: Mobile Simulator | Right: Event Bus + Admin Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Column 1: Mobile Simulator (5 Cols on LG) */}
            <div className="lg:col-span-5 flex justify-center">
              <MobileSimulatorFrame 
                title={module.title}
                roleName={module.roles[0]}
              >
                {workspaces.mobile}
              </MobileSimulatorFrame>
            </div>

            {/* Column 2: Event Bus Stream + Admin Desk (7 Cols on LG) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Event Bus Stream */}
              <EventBusStream 
                events={events}
                onClear={handleClearEvents}
              />

              {/* Enterprise Admin Desk */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                {workspaces.admin}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIGMA HI-FI SCREENS CATALOG */}
      <section className="py-12 bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Đối Chiếu Thiết Kế Gốc
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Bộ Màn Hình Figma Hi-Fi Thuộc Phân Hệ {module.id}
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              File: eq0EA9dRSWfS2ivuFohJdg
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.figmaScreens.map((scr, idx) => (
              <div 
                key={idx}
                className="rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 bg-slate-200 dark:bg-slate-700 overflow-hidden relative group">
                  <img 
                    src={`assets/img/demo/${scr.img}`} 
                    alt={scr.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'assets/img/demo/1. Delivery Partner.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {scr.name}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                      Node: {scr.node}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Màn hình chuẩn 390 × 844px đã đồng bộ trong Design System.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

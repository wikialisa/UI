// src/components/MobileSimulatorFrame.tsx
import React from 'react';
import { Home, CheckSquare, MapPin, Bell, User, Wifi } from 'lucide-react';

interface MobileSimulatorFrameProps {
  title: string;
  roleName: string;
  children: React.ReactNode;
}

export const MobileSimulatorFrame: React.FC<MobileSimulatorFrameProps> = ({
  title,
  roleName,
  children
}) => {
  return (
    <div className="w-[390px] h-[780px] bg-white dark:bg-slate-900 rounded-[44px] shadow-2xl border-[8px] border-slate-800 dark:border-slate-800 flex flex-col overflow-hidden relative ring-1 ring-slate-900/10 dark:ring-white/10 select-none">
      
      {/* iOS Dynamic Notch & Status Bar */}
      <div className="h-10 bg-white dark:bg-slate-900 flex items-center justify-between px-6 pt-2 shrink-0 z-10 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">09:41</span>
        <div className="w-20 h-4 bg-slate-900 dark:bg-slate-800 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-950"></div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
          <span className="text-[10px] font-bold font-mono">5G</span>
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      </div>

      {/* App Bar Header */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            WA
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-none">
              {title}
            </div>
            <div className="text-[10px] text-slate-400 leading-none mt-0.5">
              {roleName}
            </div>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-emerald-500/20">
          ONLINE
        </span>
      </div>

      {/* Scrollable Screen Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* 5-Tab Bottom Navigation Bar */}
      <div className="h-14 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 shrink-0">
        <button className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Trang chủ</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <CheckSquare className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Tác vụ</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <MapPin className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Bản đồ</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <Bell className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Cảnh báo</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <User className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Hồ sơ</span>
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div className="h-4 bg-white dark:bg-slate-900 flex justify-center items-center pb-1 shrink-0">
        <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};

// src/components/InteractivePrototypeBar.tsx
import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { LIFECYCLE_STEPS } from '../data/lifecycleData';
import { MODULES_DATA } from '../data/modulesData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Package, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Layers
} from 'lucide-react';

export const InteractivePrototypeBar: React.FC = () => {
  const {
    activeModuleId,
    activeCluster,
    activeStep,
    networkMode,
    isAutoPlaying,
    handoverMessage,
    setCluster,
    setStep,
    setNetworkMode,
    nextLifecycleStep,
    prevLifecycleStep,
    resetEntireFlow,
    toggleAutoPlay,
    jumpToHandover
  } = usePrototype();

  const currentStepData = LIFECYCLE_STEPS[activeStep - 1] || LIFECYCLE_STEPS[0];
  const activeModule = MODULES_DATA.find(m => m.id === activeModuleId);

  // Find next logical module in lifecycle
  const currentStepIndex = activeStep - 1;
  const nextStepData = LIFECYCLE_STEPS[Math.min(LIFECYCLE_STEPS.length - 1, currentStepIndex + 1)];
  const nextModule = MODULES_DATA.find(m => m.slug === nextStepData.moduleSlug);

  return (
    <div className="bg-slate-900 text-white border-y border-slate-800 shadow-2xl relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        
        {/* ROW 1: CLUSTER SELECTION & SYSTEM CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* 3 Module Clusters */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Cụm Phân Hệ:
            </span>

            <button
              onClick={() => setCluster('cluster-1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCluster === 'cluster-1'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Cụm 1: Khởi Tạo & Định Danh</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">M1-M3</span>
            </button>

            <button
              onClick={() => setCluster('cluster-2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCluster === 'cluster-2'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Cụm 2: Triển Khai Thực Địa</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">M4-M6</span>
            </button>

            <button
              onClick={() => setCluster('cluster-3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCluster === 'cluster-3'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Cụm 3: Vận Hành & Khắc Phục</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">M7-M11</span>
            </button>
          </div>

          {/* Controller Actions: Play/Pause, Step Prev/Next, Network Mode */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Auto Play Demo */}
            <button
              onClick={toggleAutoPlay}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAutoPlaying
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Dừng Auto-Demo</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Chạy Toàn Trình (Auto)</span>
                </>
              )}
            </button>

            {/* Stepper Buttons */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={prevLifecycleStep}
                disabled={activeStep <= 1}
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent"
                title="Bước trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono font-bold text-emerald-400">
                {activeStep}/20
              </span>
              <button
                onClick={nextLifecycleStep}
                disabled={activeStep >= 20}
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent"
                title="Bước kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={resetEntireFlow}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
              title="Làm mới chu trình prototype"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Network Mode Simulator Toggle */}
            <div className="flex items-center gap-1 bg-slate-800/90 rounded-lg p-0.5 border border-slate-700 text-[11px]">
              <button
                onClick={() => setNetworkMode('online')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  networkMode === 'online'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>5G Online</span>
              </button>
              <button
                onClick={() => setNetworkMode('offline')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  networkMode === 'offline'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <WifiOff className="w-3 h-3 text-amber-400" />
                <span>Ngoại Tuyến</span>
              </button>
              <button
                onClick={() => setNetworkMode('syncing')}
                className={`px-2 py-1 rounded flex items-center gap-1 ${
                  networkMode === 'syncing'
                    ? 'bg-teal-500/20 text-teal-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <RefreshCw className="w-3 h-3 text-teal-400 animate-spin" />
                <span>Đồng Bộ</span>
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: REAL-TIME HANDOVER & LOGICAL STEP BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Step Info */}
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-mono font-bold shrink-0">
              {currentStepData.step}
            </span>
            <div className="text-xs">
              <span className="font-bold text-white mr-1.5">
                {currentStepData.title}
              </span>
              <span className="text-slate-400 hidden sm:inline">
                ({currentStepData.role}) — {currentStepData.description}
              </span>
            </div>
          </div>

          {/* Quick Cross-Module Handover Button */}
          {nextModule && nextModule.id !== activeModuleId && (
            <button
              onClick={() => jumpToHandover(nextModule.id, `👉 Chuyển giao tiếp theo: Kích hoạt ${nextModule.title}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 transition-colors shrink-0"
            >
              <span>Chuyển Sang {nextModule.tag} ({nextModule.title})</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          )}
        </div>

        {/* ROW 3: REAL-TIME HANDOVER NOTIFICATION */}
        {handoverMessage && (
          <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
              <span className="font-medium truncate">{handoverMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-400/70 font-mono ml-2 shrink-0">
              Live State Sync
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

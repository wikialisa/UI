// src/components/telemetry/SolarAfciDashboard.tsx
import React, { useState } from 'react';
import { usePrototype } from '../../context/PrototypeContext';
import { 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  RotateCcw, 
  Activity, 
  Database, 
  Server, 
  Cpu, 
  Search, 
  Bell, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

export const SolarAfciDashboard: React.FC = () => {
  const { solarTelemetry, triggerAfciFault, resetAfciFault, emitEvent } = usePrototype();
  const [activeTab, setActiveTab] = useState<'metrics' | 'schema' | 'architecture'>('metrics');

  const efficiency = solarTelemetry.pDc > 0 
    ? ((solarTelemetry.pAc / solarTelemetry.pDc) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden font-sans">
      
      {/* =========================================================================
          FIGMA 153:15417 TOP HEADER BAR
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500">Trang chủ</span>
          <span className="text-slate-400">/</span>
          <span className="font-bold text-slate-800 dark:text-white">Trang tổng quan</span>
          <span className="text-slate-400">/</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[11px] border border-emerald-500/20">
            Smart Solar & AFCI Telemetry
          </span>
        </div>

        {/* Search Bar + User Identity */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Tìm kiếm Inverter, sensor AFCI, mã lỗi..." 
              readOnly
              className="w-72 text-xs py-1.5 pl-8 pr-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <kbd className="absolute right-2 top-2 px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-slate-400">
              ⌘K
            </kbd>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-3">
            <div className="relative p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                RK
              </div>
              <div className="text-left hidden lg:block leading-none">
                <div className="text-xs font-bold text-slate-800 dark:text-white">Rajesh Kumar</div>
                <div className="text-[10px] text-slate-400">Quản trị hệ thống</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FIGMA 153:15417 STATS ROW (3 CORE KPIS)
          ========================================================================= */}
      <div className="p-6 space-y-6">
        
        {/* Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Giám Sát Năng Lượng Mặt Trời & An Toàn Hồ Quang AFCI
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Dòng dữ liệu viễn thông vi mô thời gian thực qua MQTT 5.0 / TLS 1.3 ➔ TimescaleDB ➔ WebSocket
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'metrics'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Telemetry Stream
            </button>
            <button 
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'schema'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              }`}
            >
              TimescaleDB Schema
            </button>
            <button 
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
              }`}
            >
              Hạ Tầng Microservices
            </button>
          </div>
        </div>

        {/* 3 Figma KPI Cards + AFCI Status Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* KPI 1: Orders (Figma: Tổng số đơn đặt hàng) */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border-l-4 border-blue-500 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Tổng số đơn đặt hàng</span>
              <span className="text-[10px] font-bold text-emerald-600 font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-xs">
                +12 tuần này
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">3,260</div>
            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-2 flex items-center gap-1">
              <span>Xem nhật ký hoạt động</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* KPI 2: Pending (Figma: Lệnh chờ xử lý) */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Lệnh chờ xử lý</span>
              <span className="text-[10px] font-bold text-red-500 font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-xs">
                -8 ngày qua
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">184</div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-2 flex items-center gap-1">
              <span>Xem tiến độ vận hành</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* KPI 3: Delivery Today (Figma: Hàng giao hôm nay) */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border-l-4 border-emerald-500 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Hàng giao hôm nay</span>
              <span className="text-[10px] font-bold text-slate-600 font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-xs">
                6 hoàn thành
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">28</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-2 flex items-center gap-1">
              <span>Theo dõi đoàn xe GPS</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* KPI 4: AFCI Real-time Circuit Interrupter Status */}
          <div className={`p-4 rounded-xl border-l-4 border shadow-sm transition-all ${
            solarTelemetry.afciStatus === 0
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-l-emerald-500 border-slate-200 dark:border-slate-800'
              : solarTelemetry.afciStatus === 1
              ? 'bg-amber-50/80 dark:bg-amber-950/30 border-l-amber-500 border-slate-200 dark:border-slate-800'
              : 'bg-red-50/90 dark:bg-red-950/40 border-l-red-600 border-red-500 animate-pulse'
          }`}>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold uppercase tracking-wider text-[10px]">Rơ-le AFCI Hồ Quang</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/10">
                UL 1699B
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {solarTelemetry.afciStatus === 0 && <ShieldCheck className="w-6 h-6 text-emerald-600" />}
              {solarTelemetry.afciStatus === 1 && <ShieldAlert className="w-6 h-6 text-amber-500" />}
              {solarTelemetry.afciStatus === 2 && <Flame className="w-6 h-6 text-red-600 animate-bounce" />}
              <div className="text-lg font-black font-mono">
                {solarTelemetry.afciStatus === 0 && <span className="text-emerald-600">NORMAL</span>}
                {solarTelemetry.afciStatus === 1 && <span className="text-amber-600">WARNING</span>}
                {solarTelemetry.afciStatus === 2 && <span className="text-red-600">TRIPPED</span>}
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 mt-2">
              Thời gian cắt: <strong>{solarTelemetry.afciResponseTimeMs}ms</strong> (&lt; 50ms)
            </div>
          </div>
        </div>

        {/* =========================================================================
            AFCI INTERACTIVE CONTROL & EMERGENCY CUTOFF SIMULATOR
            ========================================================================= */}
        <div className={`p-4 rounded-2xl border transition-all ${
          solarTelemetry.afciStatus === 2
            ? 'bg-red-950/20 border-red-500 text-red-900 dark:text-red-200'
            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-500/10 text-red-600 border border-red-500/20">
                  ARC FAULT CIRCUIT INTERRUPTER
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Thiết bị giám sát: {solarTelemetry.deviceId} (Site: {solarTelemetry.siteId})
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {solarTelemetry.afciStatus === 0 && (
                  '🟢 Hệ thống an toàn tuyệt đối. Cảm biến biến tần liên tục quét tín hiệu FFT tần số cao 100-150kHz để phát hiện phóng điện.'
                )}
                {solarTelemetry.afciStatus === 1 && (
                  '🟡 CẢNH BÁO: Phát hiện phổ nhiễu hồ quang vi mô vượt ngưỡng 142.5 kHz trên String #2. Đang tăng tần suất quét lên 1ms/lần.'
                )}
                {solarTelemetry.afciStatus === 2 && (
                  `🚨 ĐÃ NGẮT MẠCH KHẨN CẤP LÚC ${solarTelemetry.afciTripTimestamp}! Công tắc bán dẫn DC Isolator đã ngắt dòng điện trong ${solarTelemetry.afciResponseTimeMs}ms để dập tắt hồ quang.`
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => triggerAfciFault(2)}
                disabled={solarTelemetry.afciStatus === 2}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Mô Phỏng Sự Cố Hồ Quang (Trip &lt; 50ms)</span>
              </button>

              <button
                onClick={() => triggerAfciFault(1)}
                disabled={solarTelemetry.afciStatus !== 0}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Mô Phỏng Cảnh Báo Nhiễu</span>
              </button>

              <button
                onClick={resetAfciFault}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Đặt Lại Rơ-le (Reset Breaker)</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TAB CONTENT 1: REAL-TIME INVERTER TELEMETRY GAUGES
            ========================================================================= */}
        {activeTab === 'metrics' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              
              {/* V_DC */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Điện Áp DC (V_DC)</div>
                <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {solarTelemetry.vDc} V
                </div>
                <div className="text-[10px] text-slate-500">Giàn 14 Tấm Pin 550W</div>
              </div>

              {/* I_DC */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Dòng Điện DC (I_DC)</div>
                <div className={`text-xl font-black font-mono mt-0.5 ${
                  solarTelemetry.iDc === 0 ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {solarTelemetry.iDc} A
                </div>
                <div className="text-[10px] text-slate-500">
                  {solarTelemetry.afciStatus === 2 ? 'CẮT DÒNG (TRIPPED)' : 'Dòng tải định mức'}
                </div>
              </div>

              {/* P_DC */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Công Suất DC (P_DC)</div>
                <div className="text-xl font-black font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                  {solarTelemetry.pDc} W
                </div>
                <div className="text-[10px] text-slate-500">Bức xạ 940 W/m²</div>
              </div>

              {/* V_AC */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Điện Áp Lưới AC (V_AC)</div>
                <div className="text-xl font-black font-mono text-slate-800 dark:text-white mt-0.5">
                  {solarTelemetry.vAc} V
                </div>
                <div className="text-[10px] text-slate-500">Chuẩn 220V 1 Pha</div>
              </div>

              {/* P_AC */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Công Suất Ra AC (P_AC)</div>
                <div className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {solarTelemetry.pAc} W
                </div>
                <div className="text-[10px] text-slate-500">Hiệu suất: {efficiency}%</div>
              </div>

              {/* Frequency & Yield */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Sản Lượng Hôm Nay</div>
                <div className="text-xl font-black font-mono text-teal-600 dark:text-teal-400 mt-0.5">
                  {solarTelemetry.dailyYield} kWh
                </div>
                <div className="text-[10px] text-slate-500">Tần số: {solarTelemetry.frequency} Hz</div>
              </div>
            </div>

            {/* Live Data Stream Status Pill */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  MQTT 5.0 Broker: EMQX TLS 1.3
                </span>
                <span className="text-slate-400 font-mono">Định dạng: Google Protobuf v3</span>
                <span className="text-slate-400 font-mono">Độ trễ Ingestion: 12ms</span>
              </div>
              <div className="font-mono text-slate-500">
                TimescaleDB: Hypertable partitioned (1 day chunk)
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 2: TIMESCALEDB SCHEMA
            ========================================================================= */}
        {activeTab === 'schema' && (
          <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto space-y-2 border border-slate-800">
            <div className="text-emerald-400 font-bold mb-2">-- TimescaleDB Hypertable DDL Schema</div>
            <pre className="text-slate-300 leading-relaxed">{`CREATE TABLE solar_telemetry (
    time        TIMESTAMPTZ NOT NULL,
    site_id     UUID NOT NULL,
    device_id   VARCHAR(64) NOT NULL,
    v_dc        NUMERIC(6,2), -- Điện áp DC (V)
    i_dc        NUMERIC(6,2), -- Dòng điện DC (A)
    p_dc        NUMERIC(8,2), -- Công suất DC (W)
    v_ac        NUMERIC(6,2), -- Điện áp AC (V)
    i_ac        NUMERIC(6,2), -- Dòng điện AC (A)
    p_ac        NUMERIC(8,2), -- Công suất AC (W)
    frequency   NUMERIC(4,2), -- Tần số lưới (Hz)
    daily_yield NUMERIC(10,3),-- Sản lượng trong ngày (kWh)
    afci_status SMALLINT DEFAULT 0, -- 0: Normal, 1: Warning, 2: Tripped (Arc Detected)
    temperature NUMERIC(5,2)  -- Nhiệt độ thiết bị (°C)
);

SELECT create_hypertable('solar_telemetry', 'time');
CREATE INDEX idx_device_time ON solar_telemetry (device_id, time DESC);`}</pre>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 3: DISTRIBUTED MICROSERVICES ARCHITECTURE
            ========================================================================= */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">1. Edge & Ingestion</div>
              <p className="text-slate-500">
                MQTT 5.0 qua TLS 1.3. Gói tin nén bằng Google Protocol Buffers. Chịu tải hàng triệu Inverter qua EMQX cluster.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">2. Telemetry Engine</div>
              <p className="text-slate-500">
                Worker Go/Node.js xử lý dòng dữ liệu 1s/lần. Rule Engine đánh giá ngưỡng AFCI và gửi lệnh ngắt ngược lại &lt; 100ms.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">3. Lưu Trữ Kép</div>
              <p className="text-slate-500">
                TimescaleDB lưu chuỗi thời gian phân tích biểu đồ; PostgreSQL lưu quyền hạn & trạm bơm; Redis lưu Live Status.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white mb-1">4. Real-time Delivery</div>
              <p className="text-slate-500">
                WebSocket Server push trực tiếp dữ liệu công suất và tín hiệu hồ quang lên UIKit không độ trễ.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

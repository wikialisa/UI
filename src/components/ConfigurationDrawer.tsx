// src/components/ConfigurationDrawer.tsx
import React, { useState } from 'react';
import { usePrototype, ClusterType } from '../context/PrototypeContext';
import { MODULES_DATA } from '../data/modulesData';
import { RoleType } from '../types';
import { 
  Sliders, 
  X, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Radio, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Layers, 
  UserCheck, 
  Server, 
  ArrowRight,
  Database,
  Send,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  Smartphone,
  Navigation,
  Home,
  CheckSquare,
  MapPin,
  Bell,
  User,
  Settings
} from 'lucide-react';

interface ConfigurationDrawerProps {
  onSelectModule?: (slug: string | null) => void;
}

export const ConfigurationDrawer: React.FC<ConfigurationDrawerProps> = ({ onSelectModule }) => {
  const {
    activeModuleId,
    setModule,
    activeRole,
    setRole,
    mobileNavTab,
    setMobileNavTab,
    networkMode,
    setNetworkMode,
    order,
    updateOrder,
    solarTelemetry,
    triggerAfciFault,
    resetAfciFault,
    emitEvent,
    isConfigDrawerOpen,
    setIsConfigDrawerOpen,
    toggleConfigDrawer
  } = usePrototype();

  const [activeTab, setActiveTab] = useState<'network' | 'nav' | 'order' | 'telemetry' | 'gateway'>('network');
  const [tempPumpModel, setTempPumpModel] = useState(order.pumpModel);
  const [tempFarmerName, setTempFarmerName] = useState(order.farmerName);
  const [tempOrderId, setTempOrderId] = useState(order.id);
  const [isSyncingLive, setIsSyncingLive] = useState(false);

  // Quick module change handler
  const handleModuleClick = (moduleId: string) => {
    setModule(moduleId);
    const mod = MODULES_DATA.find(m => m.id === moduleId);
    if (mod && onSelectModule) {
      onSelectModule(mod.slug);
    }
    emitEvent('MODULE_SWITCHED_FROM_DRAWER', {
      targetModuleId: moduleId,
      moduleName: mod?.title
    }, 'CONFIG_DRAWER');
  };

  // Trigger manual cache flush
  const handleFlushCache = () => {
    setIsSyncingLive(true);
    setNetworkMode('syncing');
    emitEvent('OFFLINE_QUEUE_FLUSH_START', {
      queuedItems: order.offlineQueueCount,
      timestamp: new Date().toISOString()
    }, 'CONFIG_DRAWER');

    setTimeout(() => {
      updateOrder({ offlineQueueCount: 0 });
      setNetworkMode('online');
      setIsSyncingLive(false);
      emitEvent('OFFLINE_QUEUE_FLUSH_COMPLETE', {
        syncedToCloud: true,
        remainingQueue: 0
      }, 'CONFIG_DRAWER');
    }, 1200);
  };

  // Add 1 offline mock packet
  const handleAddOfflinePacket = () => {
    const nextCount = order.offlineQueueCount + 1;
    updateOrder({ offlineQueueCount: nextCount });
    emitEvent('LOCAL_CACHE_RECORDED', {
      totalStored: nextCount,
      storageEngine: 'IndexedDB / SQLite-WASM'
    }, 'CONFIG_DRAWER');
  };

  // Ping test MQTT packet
  const handlePingMqtt = () => {
    emitEvent('MQTT_PING_PACKET', {
      topic: `solar/site-cantho/${order.id.toLowerCase()}/heartbeat`,
      broker: 'emqx-cluster-01.wikialisa.io',
      qos: 1,
      payload: {
        vDc: solarTelemetry.vDc,
        iDc: solarTelemetry.iDc,
        frequency: solarTelemetry.frequency,
        temp: solarTelemetry.temperature,
        afciStatus: solarTelemetry.afciStatus
      }
    }, 'MQTT_BROKER_EMQX');
  };

  // Update order profile
  const handleSaveOrderConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrder({
      id: tempOrderId,
      pumpModel: tempPumpModel,
      farmerName: tempFarmerName
    });
    emitEvent('ORDER_PROFILE_CONFIGURED', {
      id: tempOrderId,
      pumpModel: tempPumpModel,
      farmerName: tempFarmerName
    }, 'CONFIG_DRAWER');
  };

  const activeModuleObj = MODULES_DATA.find(m => m.id === activeModuleId);

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. FLOATING GREEN TAB ON RIGHT VIEWPORT EDGE (MATCHING SCREENSHOT)    */}
      {/* ==================================================================== */}
      <div className="fixed right-0 top-1/3 -translate-y-1/2 z-50 flex items-center">
        <button
          onClick={toggleConfigDrawer}
          title="Mở menu mở rộng cài đặt cấu hình & giao tiếp"
          className="group relative flex items-center justify-center w-4 sm:w-5 h-24 sm:h-28 bg-gradient-to-b from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-900 rounded-l-xl shadow-2xl transition-all duration-300 hover:w-8 hover:shadow-emerald-500/40 border-y border-l border-emerald-300/60 cursor-pointer"
        >
          {/* Vertical handle grip line */}
          <div className="w-1 h-8 rounded-full bg-white/70 group-hover:hidden transition-all" />
          
          {/* Expanded icon on hover */}
          <Sliders className="w-4 h-4 text-slate-900 hidden group-hover:block transition-all animate-spin-slow" />

          {/* Floating Tooltip Label */}
          <span className="absolute right-10 whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl border border-slate-700">
            ⚙️ Cấu Hình Giao Tiếp & Điều Hướng
          </span>

          {/* Pulse notification dot */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* ==================================================================== */}
      {/* 2. BACKDROP OVERLAY                                                  */}
      {/* ==================================================================== */}
      {isConfigDrawerOpen && (
        <div 
          onClick={() => setIsConfigDrawerOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* ==================================================================== */}
      {/* 3. SLIDE-OVER DRAWER PANEL                                           */}
      {/* ==================================================================== */}
      <div 
        className={`fixed top-0 right-0 h-full w-[380px] sm:w-[460px] max-w-[95vw] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isConfigDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Cài Đặt & Cấu Hình Giao Tiếp
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Điều phối hai chiều: Mobile 390px ⇄ Hệ Thống Cloud
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsConfigDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION NAV TABS */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 px-2 py-1.5 gap-1 shrink-0 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('network')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'network'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Mạng & Offline</span>
          </button>

          <button
            onClick={() => setActiveTab('nav')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'nav'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Điều Hướng</span>
          </button>

          <button
            onClick={() => setActiveTab('order')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'order'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Đơn Hàng</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'telemetry'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>AFCI & IoT</span>
          </button>

          <button
            onClick={() => setActiveTab('gateway')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'gateway'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>MQTT</span>
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          
          {/* ================================================================ */}
          {/* TAB 1: NETWORK & OFFLINE-FIRST CONFIG                            */}
          {/* ================================================================ */}
          {activeTab === 'network' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[11px] block mb-2">
                  1. Chế Độ Kết Nối Mạng Thực Địa:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setNetworkMode('online');
                      emitEvent('NETWORK_MODE_CHANGED', { mode: 'online', protocol: '5G / TLS 1.3' }, 'DRAWER');
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-center font-bold transition-all ${
                      networkMode === 'online'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Wifi className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px]">5G Online</span>
                    <span className="text-[9px] text-slate-400 font-normal">Trực tuyến</span>
                  </button>

                  <button
                    onClick={() => {
                      setNetworkMode('offline');
                      emitEvent('NETWORK_MODE_CHANGED', { mode: 'offline', protocol: 'IndexedDB Local Cache' }, 'DRAWER');
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-center font-bold transition-all ${
                      networkMode === 'offline'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <WifiOff className="w-4 h-4 text-amber-500" />
                    <span className="text-[11px]">Ngoại Tuyến</span>
                    <span className="text-[9px] text-slate-400 font-normal">Cache cục bộ</span>
                  </button>

                  <button
                    onClick={() => {
                      setNetworkMode('syncing');
                      emitEvent('NETWORK_MODE_CHANGED', { mode: 'syncing', protocol: 'Delta Sync Stream' }, 'DRAWER');
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-center font-bold transition-all ${
                      networkMode === 'syncing'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 shadow-sm ring-1 ring-teal-500'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4 text-teal-500 animate-spin" />
                    <span className="text-[11px]">Đang Đồng Bộ</span>
                    <span className="text-[9px] text-slate-400 font-normal">Delta Sync</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  * Khi chọn <strong>Ngoại Tuyến</strong>, thanh trạng thái trên mô phỏng di động hiển thị <code>OFFLINE</code> và nhãn <code>• CACHE</code>.
                </p>
              </div>

              {/* OFFLINE QUEUE MANAGER */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-slate-800 dark:text-white">Bộ Đệm IndexedDB Ngoại Tuyến:</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {order.offlineQueueCount} gói tin
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddOfflinePacket}
                    className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>+1 Gói Tin Cache</span>
                  </button>

                  <button
                    onClick={handleFlushCache}
                    disabled={order.offlineQueueCount === 0 || isSyncingLive}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingLive ? 'animate-spin' : ''}`} />
                    <span>Xả Cache Lên Cloud</span>
                  </button>
                </div>
              </div>

              {/* ACTIVE ROLE SWITCHER */}
              <div>
                <label className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[11px] block mb-2">
                  2. Vai Trò Người Dùng Thực Địa (RBAC):
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'delivery', label: '1. Đối tác giao hàng (Delivery Partner)', module: '04' },
                    { id: 'install', label: '2. Kỹ thuật viên lắp đặt (Installation Tech)', module: '03' },
                    { id: 'qa', label: '3. Kiểm định viên chất lượng (QA Inspector)', module: '04' },
                    { id: 'farmer', label: '4. Nông dân chủ trạm bơm (Farmer Owner)', module: '06' },
                    { id: 'service', label: '5. Kỹ thuật viên dịch vụ bảo hành (Service Lead)', module: '07' },
                  ].map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id as RoleType);
                        emitEvent('ROLE_SWITCHED', { roleId: r.id, roleName: r.label }, 'DRAWER');
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between font-medium transition-all ${
                        activeRole === r.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{r.label}</span>
                      {activeRole === r.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: NAVIGATION & MOBILE SCREEN CONTROLLER                     */}
          {/* ================================================================ */}
          {activeTab === 'nav' && (
            <div className="space-y-5 animate-fadeIn">
              {/* MOBILE BOTTOM TAB CONTROLLER */}
              <div>
                <label className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[11px] block mb-2">
                  1. Điều Khiển Menu Tab Trên Mobile Simulator:
                </label>
                <div className="grid grid-cols-5 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {[
                    { id: 'home', label: 'Trang chủ', icon: Home },
                    { id: 'tasks', label: 'Tác vụ', icon: CheckSquare },
                    { id: 'map', label: 'Bản đồ', icon: MapPin },
                    { id: 'alerts', label: 'Cảnh báo', icon: Bell },
                    { id: 'profile', label: 'Hồ sơ', icon: User },
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setMobileNavTab(tab.id as any);
                          emitEvent('MOBILE_TAB_NAVIGATED', { tab: tab.id }, 'DRAWER');
                        }}
                        className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                          mobileNavTab === tab.id
                            ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[9px] mt-1">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  * Nhấn vào tab trên đây sẽ lập tức chuyển đổi màn hình tương ứng trong khung điện thoại iPhone 390px.
                </p>
              </div>

              {/* 11 MODULE SELECTOR */}
              <div>
                <label className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[11px] block mb-2">
                  2. Chuyển Phân Hệ Nhanh (11 Modules):
                </label>
                <div className="grid grid-cols-1 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {MODULES_DATA.map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleModuleClick(m.id)}
                      className={`text-left p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        m.id === activeModuleId
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono ${
                          m.id === activeModuleId ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'
                        }`}>
                          {m.id}
                        </span>
                        <div className="truncate">
                          <div className="truncate text-xs font-semibold">{m.title}</div>
                          <div className="text-[10px] text-slate-400">{m.tag}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: ORDER LIFECYCLE & SYSTEM STATUS                           */}
          {/* ================================================================ */}
          {activeTab === 'order' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[11px] block mb-2">
                  Trạng Thái Vòng Đời Đơn Hàng (POD & Delivery):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['PENDING', 'IN_TRANSIT', 'ARRIVED', 'POD_COMPLETED'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        updateOrder({ deliveryStatus: status });
                        emitEvent('ORDER_DELIVERY_STATUS_CHANGED', { deliveryStatus: status }, 'DRAWER');
                      }}
                      className={`p-2.5 rounded-xl border font-mono text-[11px] font-bold transition-all ${
                        order.deliveryStatus === status
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* EDIT ORDER PARAMETERS */}
              <form onSubmit={handleSaveOrderConfig} className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] font-bold text-slate-800 dark:text-white uppercase">
                  Cập Nhật Thông Tin Hiển Thị Trên Thẻ:
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">Mã Đơn Hàng (Order ID):</label>
                  <input
                    type="text"
                    value={tempOrderId}
                    onChange={e => setTempOrderId(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">Model Trạm Bơm:</label>
                  <input
                    type="text"
                    value={tempPumpModel}
                    onChange={e => setTempPumpModel(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-slate-500 block mb-1">Tên Nông Dân:</label>
                  <input
                    type="text"
                    value={tempFarmerName}
                    onChange={e => setTempFarmerName(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  Áp Dụng Lên Giao Diện Mobile
                </button>
              </form>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: AFCI & SOLAR TELEMETRY INJECTION                          */}
          {/* ================================================================ */}
          {activeTab === 'telemetry' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[11px] block mb-2">
                  Trạng Thái Cảnh Báo Hồ Quang Điện (AFCI):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={resetAfciFault}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold transition-all ${
                      solarTelemetry.afciStatus === 0
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px]">Bình Thường</span>
                    <span className="text-[9px] font-normal">Level 0: Safe</span>
                  </button>

                  <button
                    onClick={() => triggerAfciFault(1)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold transition-all ${
                      solarTelemetry.afciStatus === 1
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-[11px]">Cảnh Báo Sơ Cấp</span>
                    <span className="text-[9px] font-normal">Level 1: Warn</span>
                  </button>

                  <button
                    onClick={() => triggerAfciFault(2)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-bold transition-all ${
                      solarTelemetry.afciStatus === 2
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 ring-1 ring-red-500'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span className="text-[11px]">Ngắt Khẩn Cấp</span>
                    <span className="text-[9px] font-normal">Level 2: Trip</span>
                  </button>
                </div>
              </div>

              {/* TELEMETRY READINGS */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="text-[11px] font-bold text-slate-800 dark:text-white uppercase flex items-center justify-between">
                  <span>Chỉ Số Telemetry Thời Gian Thực:</span>
                  <span className="text-[10px] font-mono text-emerald-500">1 Hz Live</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500">Điện áp DC (V_dc):</div>
                    <div className="font-mono font-bold text-emerald-600 text-sm">{solarTelemetry.vDc} V</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500">Dòng điện DC (I_dc):</div>
                    <div className="font-mono font-bold text-emerald-600 text-sm">{solarTelemetry.iDc} A</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500">Công suất phát (P_dc):</div>
                    <div className="font-mono font-bold text-amber-500 text-sm">{solarTelemetry.pDc} W</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500">Nhiệt độ biến tần:</div>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">{solarTelemetry.temperature} °C</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => triggerAfciFault(2)}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20"
                  >
                    Bắn Lỗi Arc Fault (Simulate)
                  </button>
                  <button
                    onClick={resetAfciFault}
                    className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 5: MQTT BROKER & PROTOCOL GATEWAY                            */}
          {/* ================================================================ */}
          {activeTab === 'gateway' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-emerald-400 font-bold">EMQX MQTT 5.0 CLUSTER</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">CONNECTED</span>
                </div>

                <div className="text-[11px] space-y-1.5 text-slate-400">
                  <div>Endpoint: <span className="text-slate-200">emqx.wikialisa.io:8883</span></div>
                  <div>Security: <span className="text-emerald-400">TLS 1.3 / mTLS X.509</span></div>
                  <div>Protocol: <span className="text-cyan-400">MQTT 5.0 / Protobuf v3</span></div>
                  <div>Throughput: <span className="text-amber-400">12,480 msg/sec</span></div>
                  <div>Database: <span className="text-blue-400">TimescaleDB Hypertable</span></div>
                </div>

                <button
                  onClick={handlePingMqtt}
                  className="w-full mt-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 font-sans"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Bắn Gói Tin Mẫu MQTT Ping Đến EventBus</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* DRAWER FOOTER */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Phân Hệ Hiện Tại: <strong>M{activeModuleId}</strong>
            </span>
          </div>

          <button
            onClick={() => setIsConfigDrawerOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </>
  );
};

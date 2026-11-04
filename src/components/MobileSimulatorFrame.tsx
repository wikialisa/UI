// src/components/MobileSimulatorFrame.tsx
import React from 'react';
import { usePrototype } from '../context/PrototypeContext';
import { 
  Home, 
  CheckSquare, 
  MapPin, 
  Bell, 
  User, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Compass, 
  Navigation,
  Phone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

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
  const { 
    mobileNavTab, 
    setMobileNavTab, 
    networkMode, 
    order,
    emitEvent,
    jumpToHandover
  } = usePrototype();

  return (
    <div className="w-[390px] h-[780px] bg-white dark:bg-slate-900 rounded-[44px] shadow-2xl border-[8px] border-slate-800 dark:border-slate-800 flex flex-col overflow-hidden relative ring-1 ring-slate-900/10 dark:ring-white/10 select-none">
      
      {/* iOS Dynamic Notch & Status Bar */}
      <div className="h-10 bg-white dark:bg-slate-900 flex items-center justify-between px-6 pt-2 shrink-0 z-10 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">09:41</span>
        
        {/* Dynamic Island */}
        <div className="w-24 h-5 bg-slate-950 rounded-full flex items-center justify-between px-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] font-mono font-bold text-emerald-400 truncate max-w-[50px]">
            {order.id.slice(-7)}
          </span>
          <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
        </div>

        {/* Network & Battery Status */}
        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
          <span className="text-[10px] font-bold font-mono">
            {networkMode === 'offline' ? 'OFFLINE' : '5G'}
          </span>
          {networkMode === 'online' && <Wifi className="w-3.5 h-3.5 text-emerald-500" />}
          {networkMode === 'offline' && <WifiOff className="w-3.5 h-3.5 text-amber-500" />}
          {networkMode === 'syncing' && <RefreshCw className="w-3.5 h-3.5 text-teal-400 animate-spin" />}
        </div>
      </div>

      {/* App Bar Header */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
            WA
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-none">
              {title}
            </div>
            <div className="text-[10px] text-slate-400 leading-none mt-0.5">
              {roleName} • {order.farmerAddress.split(',')[0]}
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border flex items-center gap-1 ${
          networkMode === 'online'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
            : networkMode === 'offline'
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            networkMode === 'online' ? 'bg-emerald-500' : networkMode === 'offline' ? 'bg-amber-500' : 'bg-teal-400 animate-spin'
          }`}></span>
          {networkMode === 'online' ? 'ONLINE' : networkMode === 'offline' ? 'CACHE' : 'SYNCING'}
        </span>
      </div>

      {/* Scrollable Screen Content: Switches according to bottom tab */}
      <div className="flex-1 overflow-y-auto">
        {mobileNavTab === 'tasks' && children}

        {mobileNavTab === 'home' && (
          <div className="p-4 space-y-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                Thẻ Trạng Thái Hệ Thống
              </div>
              <div className="text-base font-black mt-1">Trạm Bơm: {order.pumpModel}</div>
              <div className="text-xs text-emerald-100 mt-0.5">Mã đơn: {order.id}</div>
              <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                <span>Nông Dân: <strong>{order.farmerName.split('(')[0]}</strong></span>
                <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-[10px]">
                  {order.deliveryStatus}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Lộ Trình Tác Vụ Cần Xử Lý
              </div>
              
              <div 
                onClick={() => setMobileNavTab('tasks')}
                className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 cursor-pointer hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                    Tác Vụ Hiện Tại: {title}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600">MỞ TÁC VỤ ➔</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Đang giao dịch trực tiếp với nông dân tại điểm lắp đặt.
                </div>
              </div>

              <div 
                onClick={() => setMobileNavTab('map')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 cursor-pointer hover:border-slate-400 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    Định Vị Điểm Bơm (GPS)
                  </span>
                  <span className="text-[10px] font-mono text-blue-500">XEM BẢN ĐỒ ➔</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Tọa độ: {order.farmerCoords} • Bán kính 50m
                </div>
              </div>
            </div>
          </div>
        )}

        {mobileNavTab === 'map' && (
          <div className="p-4 space-y-4">
            <div className="relative h-60 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700 flex flex-col justify-between p-3">
              {/* Simulated Map Canvas Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-black/70 text-white font-mono text-[10px] flex items-center gap-1">
                  <Compass className="w-3 h-3 text-emerald-400 animate-spin" />
                  GPS ACTIVE • 3.2m ACCURACY
                </span>
                <span className="px-2 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]">
                  CÒN 1.2 KM
                </span>
              </div>

              {/* Marker pin in center */}
              <div className="relative z-10 self-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
                  <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold font-mono bg-slate-900 text-white px-2 py-0.5 rounded shadow mt-1">
                  Điểm Bơm Nông Dân
                </span>
              </div>

              <div className="relative z-10 p-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{order.farmerAddress}</span>
                  <a href={`tel:${order.farmerPhone}`} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>Gọi</span>
                  </a>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Nông dân: {order.farmerName} ({order.farmerPhone})
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                emitEvent('GEOFENCE_ARRIVED', { coords: order.farmerCoords, accuracyM: 3.2 });
                setMobileNavTab('tasks');
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
            >
              <Navigation className="w-4 h-4" />
              <span>Xác Nhận Đã Đến Vị Trí Hiện Trường (Mở Tác Vụ)</span>
            </button>
          </div>
        )}

        {mobileNavTab === 'alerts' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Trung Tâm Cảnh Báo Thực Địa
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono font-bold">
                M09 Push
              </span>
            </div>

            <div className="p-3 rounded-xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20 text-xs">
              <div className="flex items-center justify-between font-bold text-red-600 dark:text-red-400">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Cảnh Báo Biến Tần E-04
                </span>
                <span className="text-[10px] font-mono">10:14:02</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                Phát hiện lưu lượng tụt dưới ngưỡng 5m³/h do cạn giếng hoặc cảm biến áp suất.
              </p>
              <button
                onClick={() => jumpToHandover('07', '👉 Điều động Kỹ thuật viên bảo trì xử lý sự cố E-04')}
                className="mt-2 text-[10px] font-bold text-red-600 dark:text-red-400 hover:underline"
              >
                MỞ PHIẾU DỊCH VỤ SỬA CHỮA (MODULE 07) ➔
              </button>
            </div>

            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đồng Bộ POD Thành Công
                </span>
                <span className="text-[10px] font-mono">09:55:12</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                Chứng từ số chữ ký nông dân đã tải lên Cloud & đối chiếu hợp lệ.
              </p>
            </div>
          </div>
        )}

        {mobileNavTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-base">
                NV
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Kỹ Sư Hiện Trường: Nguyễn Văn Kỹ
                </div>
                <div className="text-[11px] text-slate-500">ID: TECH-VN-882 • {roleName}</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Chứng chỉ TCVN 18 An toàn điện
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Trạng Thái Sẵn Sàng (On Duty):</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px]">
                  ĐANG TRỰC CA
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Bộ Nhớ Đệm Ngoại Tuyến:</span>
                <span className="font-mono text-[10px] text-slate-500">
                  {order.offlineQueueCount} gói tin đã lưu (IndexedDB)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Ngôn Ngữ Ứng Dụng:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                  Tiếng Việt (Chuẩn)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5-Tab Interactive Bottom Navigation Bar */}
      <div className="h-14 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 shrink-0">
        <button 
          onClick={() => setMobileNavTab('home')}
          className={`flex flex-col items-center transition-colors ${
            mobileNavTab === 'home'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Trang chủ</span>
        </button>

        <button 
          onClick={() => setMobileNavTab('tasks')}
          className={`flex flex-col items-center transition-colors relative ${
            mobileNavTab === 'tasks'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Tác vụ</span>
          <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>

        <button 
          onClick={() => setMobileNavTab('map')}
          className={`flex flex-col items-center transition-colors ${
            mobileNavTab === 'map'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Bản đồ</span>
        </button>

        <button 
          onClick={() => setMobileNavTab('alerts')}
          className={`flex flex-col items-center transition-colors relative ${
            mobileNavTab === 'alerts'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Cảnh báo</span>
          <span className="absolute -top-1 -right-0.5 px-1 rounded-full bg-red-500 text-white text-[8px] font-bold">
            1
          </span>
        </button>

        <button 
          onClick={() => setMobileNavTab('profile')}
          className={`flex flex-col items-center transition-colors ${
            mobileNavTab === 'profile'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Hồ sơ</span>
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div className="h-4 bg-white dark:bg-slate-900 flex justify-center items-center pb-1 shrink-0">
        <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};

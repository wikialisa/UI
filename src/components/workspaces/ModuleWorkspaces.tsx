// src/components/workspaces/ModuleWorkspaces.tsx
import React, { useState } from 'react';
import { usePrototype } from '../../context/PrototypeContext';
import { MODULES_DATA } from '../../data/modulesData';
import { SolarAfciDashboard } from '../telemetry/SolarAfciDashboard';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Camera, 
  QrCode, 
  Check, 
  X, 
  Play, 
  Power, 
  AlertTriangle, 
  Wrench, 
  Send, 
  Activity, 
  Clock, 
  HardHat, 
  WifiOff,
  ArrowRight,
  Truck,
  RotateCw,
  Sliders,
  Bell,
  User,
  ExternalLink,
  Layers,
  Radio,
  FileCheck
} from 'lucide-react';

export interface WorkspaceProps {
  moduleId: string;
}

export interface WorkspaceResult {
  mobile: React.ReactNode;
  admin: React.ReactNode;
}

export const useModuleWorkspaces = ({ moduleId }: WorkspaceProps): WorkspaceResult => {
  const {
    order,
    updateOrder,
    networkMode,
    setNetworkMode,
    emitEvent,
    jumpToHandover,
    activeRole,
    setRole
  } = usePrototype();

  // Local interaction states
  const [authRole, setAuthRole] = useState(activeRole);
  const [authPhone, setAuthPhone] = useState(order.farmerPhone || '0918 842 901');
  const [authMsg, setAuthMsg] = useState('');
  const [selectedPart, setSelectedPart] = useState('sensor');

  // RENDER BASED ON MODULE ID
  switch (moduleId) {
    // =========================================================================
    // MODULE 01: AUTHENTICATION & ONBOARDING
    // =========================================================================
    case '01':
      return {
        mobile: (
          <div className="p-4 space-y-4">
            <div className="text-center pt-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/30">
                WA
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white mt-2">WikiAlisa Solar</h4>
              <p className="text-[11px] text-slate-500">Cổng định danh lực lượng thực địa</p>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Chọn vai trò đăng nhập:
              </label>
              <select 
                value={authRole}
                onChange={e => setAuthRole(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none"
              >
                <option value="delivery">1. Đối tác giao hàng (Delivery Partner)</option>
                <option value="install">2. Đội ngũ lắp đặt (Installation Team)</option>
                <option value="qa">3. Kiểm tra viên QA (Inspector)</option>
                <option value="service">4. Kỹ thuật viên bảo hành (Service Tech)</option>
                <option value="farmer">5. Nông dân chủ trạm (Farmer)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                Số điện thoại đăng ký:
              </label>
              <input 
                type="tel" 
                value={authPhone}
                onChange={e => setAuthPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono outline-none"
              />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cấp Quyền Phần Cứng:</div>
              <div className="flex items-center justify-between">
                <span>📍 Định vị GPS (Bắt buộc)</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">Đã cấp</span>
              </div>
              <div className="flex items-center justify-between">
                <span>📷 Máy ảnh quét QR & Ảnh</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">Đã cấp</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setRole(authRole as any);
                updateOrder({ farmerPhone: authPhone });
                setAuthMsg('✓ Đăng nhập thành công! Đã cấp token JWT & đồng bộ quyền RBAC');
                emitEvent('AUTH_SESSION_CREATED', {
                  phone: authPhone,
                  role: authRole,
                  jwtExpiry: '24h'
                }, 'MOBILE_AUTH');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Xác Thực & Cấp Quyền RBAC</span>
            </button>

            {authMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {authMsg}
                </div>
                <button
                  onClick={() => jumpToHandover('04', '👉 Bắt đầu lộ trình: Kích hoạt Phân Hệ Giao Hàng (M04)')}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Chuyển Sang Module 04: Đối Tác Giao Hàng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trung Tâm Xác Thực & Phiên Hoạt Động (IAM Active Sessions)</h4>
                <p className="text-xs text-slate-500">Giám sát các phiên đăng nhập JWT thời gian thực của lực lượng thực địa</p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">RBAC Active</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500">Phiên Hoạt Động</div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">38 Thiết Bị</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500">Tỷ Lệ Khớp OTP</div>
                <div className="text-base font-bold text-emerald-600 font-mono mt-0.5">99.82%</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500">Vi Phạm Địa Lý</div>
                <div className="text-base font-bold text-slate-400 font-mono mt-0.5">0 Cảnh Báo</div>
              </div>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 02: GLOBAL NAVIGATION MATRIX
    // =========================================================================
    case '02':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">
              Bản Đồ Điều Hướng 11 Phân Hệ
            </div>
            <div className="grid grid-cols-1 gap-2">
              {MODULES_DATA.map((m) => (
                <div
                  key={m.id}
                  onClick={() => jumpToHandover(m.id, `👉 Chuyển đến ${m.title}`)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold flex items-center justify-center">
                      {m.id}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
                        {m.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{m.tag}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ma Trận Điều Hướng & Kiểm Soát Truy Cập</h4>
            <p className="text-xs text-slate-500">Phân quyền 5 nhóm vai trò thực địa trên 49 màn hình chuẩn Figma</p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300">
              [NAV_ORCHESTRATOR] 11 Routes Loaded • Hash Router Active • Zero Blank Pages
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 03: ROLE-BASED DASHBOARDS
    // =========================================================================
    case '03':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Chọn Dashboard Vai Trò Để Trải Nghiệm:
            </div>
            <div className="space-y-2">
              <button
                onClick={() => jumpToHandover('04', '👉 Mở Dashboard Giao Hàng')}
                className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left hover:bg-amber-500/20 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                  <span>1. Dashboard Đối Tác Giao Hàng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Đơn hàng hôm nay: 4 đơn • 1 đơn đang chờ xác thực OTP
                </div>
              </button>

              <button
                onClick={() => jumpToHandover('05', '👉 Mở Dashboard Lắp Đặt')}
                className="w-full p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-left hover:bg-blue-500/20 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-blue-700 dark:text-blue-400">
                  <span>2. Dashboard Đội Ngũ Lắp Đặt</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Checklist thi công • Kiểm tra vật tư • Đo lưu lượng bơm
                </div>
              </button>

              <button
                onClick={() => jumpToHandover('06', '👉 Mở Dashboard QA')}
                className="w-full p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-left hover:bg-purple-500/20 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-400">
                  <span>3. Dashboard Kiểm Tra Viên QA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Kiểm định Geofence GPS • Nghiệm thu 18 điều kiện an toàn
                </div>
              </button>

              <button
                onClick={() => jumpToHandover('08', '👉 Mở Dashboard Nông Dân')}
                className="w-full p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left hover:bg-emerald-500/20 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <span>4. Dashboard Nông Dân Chủ Trạm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Điều khiển bơm 1 chạm • Giám sát nước tưới & công suất
                </div>
              </button>
            </div>
          </div>
        ),
        admin: (
          <SolarAfciDashboard />
        )
      };

    // =========================================================================
    // MODULE 04: DELIVERY FLOW
    // =========================================================================
    case '04':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-700 dark:text-amber-400">Đơn hàng: {order.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  order.deliveryStatus === 'POD_COMPLETED' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {order.deliveryStatus === 'POD_COMPLETED' ? 'ĐÃ HOÀN TẤT' : 'ĐANG GIAO'}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-white">{order.pumpModel}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{order.farmerAddress}</div>
            </div>

            {/* Del 06: QR Serial */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>1. Quét Mã QR Serial Kiện Hàng</span>
                <span className={`text-[10px] font-bold ${order.qrScanned ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {order.qrScanned ? '✓ Đã quét' : 'Chưa quét'}
                </span>
              </div>
              <button 
                onClick={() => {
                  updateOrder({ qrScanned: true });
                  emitEvent('BARCODE_SCANNED', { serial: order.serialNumber });
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Bật Camera Quét Barcode Kiện Hàng</span>
              </button>
              {order.qrScanned && (
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1.5">
                  ✓ Serial: {order.serialNumber} (Đã xác minh)
                </div>
              )}
            </div>

            {/* Del 05: OTP */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">2. Nhập OTP Người Nhận Hàng</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={order.customerOtp} 
                  readOnly 
                  className="w-2/3 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white text-center font-bold"
                />
                <button 
                  onClick={() => {
                    updateOrder({ otpVerified: true });
                    emitEvent('OTP_VERIFIED', { otp: order.customerOtp, match: true });
                  }}
                  className="w-1/3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Khớp OTP
                </button>
              </div>
              {order.otpVerified && (
                <div className="text-[10px] text-emerald-600 font-bold mt-1">
                  ✓ OTP chính xác! Đã khớp danh tính nông dân
                </div>
              )}
            </div>

            {/* Del 08: Signature */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                <span>3. Chữ Ký Số Người Nhận (POD)</span>
                <span className="text-[10px] text-slate-400">
                  {order.signatureCaptured ? 'Đã ký' : 'Chờ ký'}
                </span>
              </div>
              <div 
                onClick={() => updateOrder({ signatureCaptured: true })}
                className="h-14 w-full bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-xs text-emerald-600 italic cursor-pointer"
              >
                {order.signatureCaptured ? 'Nguyễn Văn Nông (Ký điện tử SHA-256)' : 'Chạm vào đây để ký nhận'}
              </div>
            </div>

            {/* Del 11: Complete Button */}
            <button 
              onClick={() => {
                updateOrder({ deliveryStatus: 'POD_COMPLETED', signatureCaptured: true, qrScanned: true, otpVerified: true });
                emitEvent('POD_COMPLETED', {
                  orderId: order.id,
                  handedOverAt: new Date().toLocaleTimeString('vi-VN')
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Xác Nhận Hoàn Tất Bàn Giao (POD)</span>
            </button>

            {/* CROSS-MODULE CONNECTION TO MODULE 05 */}
            {order.deliveryStatus === 'POD_COMPLETED' && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  🎉 Bàn giao thành công! Bộ linh kiện trạm bơm đã sẵn sàng lắp đặt.
                </div>
                <button
                  onClick={() => jumpToHandover('05', '👉 Chuyển giao Đội Lắp Đặt: Tiếp nhận trạm bơm đã kiểm tra Serial và POD!')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Chuyển Sang Module 05: Đội Ngũ Lắp Đặt</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trung Tâm Điều Phối Kho Vận (Dispatch Portal)</h4>
                <p className="text-xs text-slate-500">Giám sát xe giao hàng & biên bản POD ký nhận số</p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">Live Tracking</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex justify-between font-bold">
                <span>Vận đơn: {order.id}</span>
                <span className="text-emerald-600 font-mono">{order.deliveryStatus}</span>
              </div>
              <div>Nông dân: <strong>{order.farmerName}</strong></div>
              <div>Địa chỉ: {order.farmerAddress}</div>
              <div>Mã Serial: <code className="text-emerald-600">{order.serialNumber}</code></div>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 05: INSTALLATION FLOW
    // =========================================================================
    case '05':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-blue-700 dark:text-blue-400">Thi Công Lắp Đặt Trạm Bơm</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500 text-white font-bold">
                  {order.installStatus}
                </span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                Serial Tiếp Nhận: <strong className="font-mono text-emerald-600">{order.serialNumber}</strong>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-200 uppercase text-[10px] tracking-wider">
                Checklist Kỹ Thuật (4 Tiêu Chuẩn):
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={order.installChecklist.mountFrame15Deg}
                  onChange={e => updateOrder({
                    installChecklist: { ...order.installChecklist, mountFrame15Deg: e.target.checked }
                  })}
                  className="rounded text-emerald-500"
                />
                <span>1. Giàn khung cố định nghiêng 15° hướng Nam</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={order.installChecklist.pvWiringChecked}
                  onChange={e => updateOrder({
                    installChecklist: { ...order.installChecklist, pvWiringChecked: e.target.checked }
                  })}
                  className="rounded text-emerald-500"
                />
                <span>2. Đấu nối cáp DC MC4 tiêu chuẩn chống nước</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={order.installChecklist.inverterVfdMounted}
                  onChange={e => updateOrder({
                    installChecklist: { ...order.installChecklist, inverterVfdMounted: e.target.checked }
                  })}
                  className="rounded text-emerald-500"
                />
                <span>3. Tủ biến tần VFD lắp trong bóng râm, có quạt tản nhiệt</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={order.installChecklist.groundingResistUnder4Ohm}
                  onChange={e => updateOrder({
                    installChecklist: { ...order.installChecklist, groundingResistUnder4Ohm: e.target.checked }
                  })}
                  className="rounded text-emerald-500"
                />
                <span>4. Cọc tiếp địa đạt chuẩn điện trở &lt; 4 Ohm</span>
              </label>
            </div>

            {/* Pump Flow Rate Test */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>Thử Nghiệm Lưu Lượng Bơm Nước:</span>
                <span className="font-mono text-emerald-600 font-bold">
                  {order.pumpFlowRate > 0 ? `${order.pumpFlowRate} m³/h (ĐẠT)` : 'Chưa test'}
                </span>
              </div>
              <button
                onClick={() => {
                  updateOrder({ pumpFlowRate: 35.4, installStatus: 'COMPLETED' });
                  emitEvent('FLOW_TEST_COMPLETED', {
                    flowRateM3H: 35.4,
                    rpm: 2850,
                    pressureBar: 3.2
                  });
                }}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Kích Hoạt Chạy Thử & Đo Lưu Lượng</span>
              </button>
            </div>

            {/* CROSS-MODULE CONNECTION TO MODULE 06 */}
            {order.installStatus === 'COMPLETED' && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ⚡ Lưu lượng đạt 35.4 m³/h — Đã gửi biên bản sang bộ phận Kiểm định QA!
                </div>
                <button
                  onClick={() => jumpToHandover('06', '👉 Chuyển giao Kiểm Tra Viên QA: Audit vị trí GPS và nghiệm thu 18 điều kiện an toàn điện!')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Chuyển Sang Module 06: Kiểm Tra Viên QA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trung Tâm Giám Sát Tiến Độ Lắp Đặt & Thi Công Hiện Trường</h4>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <div>Trạm Bơm: <strong>{order.pumpModel}</strong></div>
              <div>Lưu Lượng Kiểm Tra: <strong className="text-blue-600">{order.pumpFlowRate} m³/h</strong></div>
              <div>Trạng Thái: <span className="font-bold text-emerald-600">{order.installStatus}</span></div>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 06: QA INSPECTION FLOW
    // =========================================================================
    case '06':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-purple-700 dark:text-purple-400">Kiểm Định Kỹ Thuật & Nghiệm Thu</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  order.qaStatus === 'APPROVED' ? 'bg-emerald-500 text-white' : 'bg-purple-500 text-white'
                }`}>
                  {order.qaStatus}
                </span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                Trạm: {order.pumpModel} • Nông dân: {order.farmerName.split('(')[0]}
              </div>
            </div>

            {/* Geofence Verification */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-center justify-between font-bold mb-1">
                <span>1. Đối Chiếu Vị Trí Vệ Tinh (GPS):</span>
                <span className="text-emerald-600 font-mono">Sai số: {order.qaDistanceDelta}m (&lt; 5m ĐẠT)</span>
              </div>
              <div className="text-[11px] text-slate-500">Tọa độ: {order.farmerCoords}</div>
            </div>

            {/* Electrical Standards */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="flex items-center justify-between font-bold mb-1">
                <span>2. 18 Tiêu Chí Kỹ Thuật TCVN An Toàn Điện:</span>
                <span className="text-emerald-600 font-bold">18/18 ĐẠT</span>
              </div>
              <div className="text-[11px] text-slate-500">Điện áp hở mạch Voc = 420V • Dòng ngắn mạch Isc = 11.2A</div>
            </div>

            {/* Approve / Reject Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  updateOrder({ qaStatus: 'APPROVED', subsidyGranted: true });
                  emitEvent('INSPECTION_APPROVED', {
                    subsidyStatus: 'READY_TO_DISBURSE',
                    approvedBy: 'QA-INSPECTOR-MINH'
                  });
                }}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Phê Duyệt Nghiệm Thu</span>
              </button>

              <button
                onClick={() => {
                  updateOrder({ qaStatus: 'REWORK' });
                  emitEvent('INSPECTION_REJECTED', { reason: 'Yêu cầu kiểm tra siết lại đầu cosse' });
                }}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow"
              >
                <X className="w-4 h-4" />
                <span>Yêu Cầu Làm Lại</span>
              </button>
            </div>

            {/* CROSS-MODULE CONNECTION TO MODULE 08 */}
            {order.qaStatus === 'APPROVED' && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  🏆 Nghiệm thu hoàn tất! Đã mở khóa trợ cấp & bàn giao trạm bơm cho Nông dân.
                </div>
                <button
                  onClick={() => jumpToHandover('08', '👉 Kích hoạt Trạm Bơm cho Nông Dân: Bật/Tắt tưới 1 chạm trên di động!')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Chuyển Sang Module 08: Ứng Dụng Nông Dân</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cổng Phê Duyệt Giải Ngân Nguồn Vốn Trợ Cấp Năng Lượng</h4>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <div>Trạng Thái Thẩm Định: <strong className="text-purple-600">{order.qaStatus}</strong></div>
              <div>Mở Khóa Trợ Cấp: <strong>{order.subsidyGranted ? 'ĐÃ PHÊ DUYỆT (35.000.000 VNĐ)' : 'CHỜ DUYỆT'}</strong></div>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 07: SERVICE & WARRANTY FLOW
    // =========================================================================
    case '07':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-red-700 dark:text-red-400">Phiếu Sửa Chữa Lưu Động: TCK-E04</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  order.serviceTicketStatus === 'RESOLVED' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {order.serviceTicketStatus === 'RESOLVED' ? 'ĐÃ ĐÓNG PHIẾU' : 'ĐANG XỬ LÝ'}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-white">
                Sự Cố: Cảnh báo E-04 (Lưu lượng tụt áp)
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Nông dân: {order.farmerName} ({order.farmerPhone})</div>
            </div>

            {/* Spare Parts Selection */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block mb-1">
                Xuất Linh Kiện Thay Thế Từ Kho Xe Lưu Động:
              </label>
              <select 
                value={selectedPart}
                onChange={e => setSelectedPart(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium"
              >
                <option value="sensor">Cảm biến áp lực nước & dò cạn (Flow Switch 24V)</option>
                <option value="capacitor">Tụ bù biến tần VFD 5.5kW</option>
                <option value="connector">Bộ giắc cắm MC4 chịu nhiệt IP68</option>
              </select>
            </div>

            {/* Resolve Button */}
            <button
              onClick={() => {
                updateOrder({ serviceTicketStatus: 'RESOLVED', serviceReplacedPart: selectedPart, activeAlarm: null });
                emitEvent('TICKET_RESOLVED', {
                  ticketId: 'TCK-E04',
                  replacedPart: selectedPart,
                  farmerRating: 5
                });
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <Wrench className="w-4 h-4" />
              <span>Thay Thế Linh Kiện & Đóng Phiếu Sửa Chữa</span>
            </button>

            {/* CROSS-MODULE CONNECTION TO MODULE 08 */}
            {order.serviceTicketStatus === 'RESOLVED' && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  🔧 Đã thay thế linh kiện & khôi phục áp lực bơm — Đóng phiếu thành công!
                </div>
                <button
                  onClick={() => jumpToHandover('08', '👉 Đã sửa chữa hoàn tất: Nông dân đánh giá 5 sao dịch vụ!')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Quay Lại Module 08: Nông Dân Nghiệm Thu & Đánh Giá</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trung Tâm Quản Lý Bảo Hành & Tồn Kho Xe Dịch Vụ Lưu Động</h4>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <div>Phiếu Sự Cố: <strong>TCK-E04</strong></div>
              <div>Linh Kiện Cấp Phát: <code className="text-emerald-600">{order.serviceReplacedPart || selectedPart}</code></div>
              <div>Đánh Giá Dịch Vụ: <strong className="text-amber-500">5.0 ★★★★★</strong></div>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 08: FARMER APP FLOW
    // =========================================================================
    case '08':
      return {
        mobile: (
          <div className="p-4 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                Trạm Bơm Mặt Trời: {order.pumpModel}
              </div>
              <h4 className="text-base font-black mt-0.5">{order.farmerName.split('(')[0]}</h4>
              
              <div className="my-4">
                <button 
                  onClick={() => {
                    const nextState = !order.farmerPumpRunning;
                    updateOrder({ farmerPumpRunning: nextState });
                    emitEvent(nextState ? 'PUMP_START_COMMAND' : 'PUMP_STOP_COMMAND', {
                      mode: 'SOLAR_DIRECT',
                      user: order.farmerName
                    });
                  }}
                  className={`w-24 h-24 mx-auto rounded-full font-black text-xs shadow-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                    order.farmerPumpRunning 
                      ? 'bg-emerald-400 text-slate-950 ring-4 ring-white animate-pulse'
                      : 'bg-white text-emerald-600'
                  }`}
                >
                  <Power className="w-6 h-6 text-emerald-500" />
                  <span>{order.farmerPumpRunning ? 'ĐANG BƠM' : 'BẬT BƠM'}</span>
                </button>
              </div>

              <div className="flex items-center justify-around text-xs border-t border-emerald-400/40 pt-2.5">
                <div>
                  <div className="text-[10px] text-emerald-200">Công Suất Nắng</div>
                  <div className="font-bold font-mono">4.2 kW</div>
                </div>
                <div className="w-px h-6 bg-emerald-400/40"></div>
                <div>
                  <div className="text-[10px] text-emerald-200">Lưu Lượng Nước</div>
                  <div className="font-bold font-mono">{order.farmerPumpRunning ? '35.2 m³/h' : '0 m³/h'}</div>
                </div>
              </div>
            </div>

            {/* SIMULATE INVERTER ALARM E-04 TRIGGER */}
            <div className="p-3 rounded-xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-red-600">
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Mô Phỏng Cảnh Báo Lỗi Biến Tần E-04
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Hệ thống phát hiện lưu lượng tụt dưới 5m³/h, tự động ngắt bảo vệ động cơ.
              </p>
              <button
                onClick={() => {
                  updateOrder({ activeAlarm: 'E-04', serviceTicketStatus: 'OPEN' });
                  jumpToHandover('07', '👉 Báo hỏng khẩn cấp: Điều động Kỹ thuật viên bảo trì SLA 24h!');
                }}
                className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow"
              >
                <span>Gửi Phiếu Sửa Chữa Sang Module 07 (Kỹ Thuật Viên)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Giám Sát Nước Nông Nghiệp & Mạng Lưới Trạm Bơm</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="text-slate-400">Trạng Thái Bơm</div>
                <div className="text-base font-bold text-emerald-600 font-mono">
                  {order.farmerPumpRunning ? 'RUNNING' : 'STANDBY'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="text-slate-400">Lưu Lượng</div>
                <div className="text-base font-bold text-blue-600 font-mono">
                  {order.farmerPumpRunning ? '35.2 m³/h' : '0 m³/h'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="text-slate-400">Độ Ẩm Đất</div>
                <div className="text-base font-bold text-teal-600 font-mono">42% (Chuẩn)</div>
              </div>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 09: NOTIFICATIONS FLOW
    // =========================================================================
    case '09':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-1">
              Trung Tâm Thông Báo & Cảnh Báo Push
            </div>

            <div className="p-3 rounded-xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20 text-xs space-y-1">
              <div className="flex justify-between font-bold text-red-600">
                <span>⚡ Cảnh Báo Biến Tần E-04</span>
                <span className="font-mono text-[10px]">10:14:02</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Phát hiện giếng cạn nước tại Thốt Nốt, Cần Thơ.
              </p>
              <button
                onClick={() => jumpToHandover('07', '👉 Mở phiếu xử lý sự cố')}
                className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <span>Xem Phiếu Sửa Chữa (Module 07)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs space-y-1">
              <div className="flex justify-between font-bold text-emerald-600">
                <span>✓ Nghiệm Thu Đạt Chuẩn</span>
                <span className="font-mono text-[10px]">09:30:15</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Kiểm định viên Minh đã duyệt trạm bơm số {order.id}.
              </p>
            </div>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cổng Phát Sóng Thông Báo Khẩn (Broadcast Push)</h4>
            <button
              onClick={() => {
                emitEvent('BROADCAST_ALERT_SENT', {
                  title: 'Bão áp thấp nhiệt đới',
                  action: 'Khuyến cáo hạ độ cao pin mặt trời'
                });
              }}
              className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
            >
              Phát Sóng Khẩn Cấp Đến 1.200 Thiết Bị Thực Địa
            </button>
          </div>
        )
      };

    // =========================================================================
    // MODULE 10: PROFILE & SHIFT MANAGEMENT
    // =========================================================================
    case '10':
      return {
        mobile: (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-base">
                NV
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Kỹ Sư Hiện Trường: Nguyễn Văn Kỹ
                </div>
                <div className="text-[11px] text-slate-500">ID: TECH-VN-882 • Đội Kỹ Thuật Số 4</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Bật/Tắt Ca Trực (On Duty):</span>
                <button
                  onClick={() => {
                    const next = !order.technicianOnDuty;
                    updateOrder({ technicianOnDuty: next });
                    emitEvent('SHIFT_STATUS_CHANGED', { onDuty: next });
                  }}
                  className={`px-3 py-1 rounded-full font-bold font-mono text-[10px] ${
                    order.technicianOnDuty ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                  }`}
                >
                  {order.technicianOnDuty ? 'ĐANG TRỰC' : 'NGHỈ CA'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Bộ Nhớ Đệm Ngoại Tuyến:</span>
                <span className="font-mono text-[10px] text-slate-500">IndexedDB: 0 gói tin</span>
              </div>
            </div>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Bảng Chấm Công & Điều Động Ca Trực Kỹ Sư</h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs">
              Kỹ Sư Nguyễn Văn Kỹ: <strong className={order.technicianOnDuty ? 'text-emerald-600' : 'text-slate-400'}>
                {order.technicianOnDuty ? 'SẴN SÀNG NHẬN ĐIỀU ĐỘNG' : 'NGOÀI CA TRỰC'}
              </strong>
            </div>
          </div>
        )
      };

    // =========================================================================
    // MODULE 11: EDGE CASES & OFFLINE-FIRST
    // =========================================================================
    case '11':
    default:
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs mb-1 font-bold text-amber-700 dark:text-amber-400">
                <span>Mô Phỏng Chế Độ Ngoại Tuyến (Offline)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-white">
                  {networkMode.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Vùng sâu vùng xa mất sóng viễn thông — lưu trữ toàn bộ chữ ký, ảnh và tọa độ vào SQLite/IndexedDB.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setNetworkMode(networkMode === 'offline' ? 'online' : 'offline');
                  emitEvent('NETWORK_MODE_CHANGED', { mode: networkMode === 'offline' ? 'online' : 'offline' });
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow ${
                  networkMode === 'offline' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white'
                }`}
              >
                {networkMode === 'offline' ? '✓ Đang Ngoại Tuyến (Bấm để bật lại Online)' : 'Mô Phỏng Mất Mạng Ngoại Tuyến (Offline)'}
              </button>

              <button
                onClick={() => {
                  setNetworkMode('syncing');
                  emitEvent('OFFLINE_QUEUE_SYNC_STARTED', { count: 3 });
                  setTimeout(() => {
                    setNetworkMode('online');
                    emitEvent('OFFLINE_QUEUE_SYNC_COMPLETED', { syncedItems: 3 });
                  }, 1200);
                }}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đồng Bộ Hàng Đợi Lên Cloud (Sync Now)</span>
              </button>
            </div>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cổng Tiếp Nhận Hàng Đợi Đồng Bộ Ngoại Tuyến</h4>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300">
              [SYNC_ENGINE] Giao thức Vector Clock & CRDTs đảm bảo không xung đột dữ liệu khi thiết bị thực địa kết nối mạng trở lại.
            </div>
          </div>
        )
      };
  }
};

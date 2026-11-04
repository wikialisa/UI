// src/components/workspaces/ModuleWorkspaces.tsx
import React, { useState, useRef } from 'react';
import { TelemetryEvent } from '../../types';
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
  WifiOff 
} from 'lucide-react';

export interface WorkspaceProps {
  moduleId: string;
  onEmitEvent: (eventName: string, payload: Record<string, unknown>, source?: string) => void;
}

export interface WorkspaceResult {
  mobile: React.ReactNode;
  admin: React.ReactNode;
}

export const useModuleWorkspaces = ({ moduleId, onEmitEvent }: WorkspaceProps): WorkspaceResult => {
  // Module 01: Auth State
  const [authRole, setAuthRole] = useState('delivery');
  const [authPhone, setAuthPhone] = useState('0988 123 456');
  const [authOtp, setAuthOtp] = useState(['7', '8', '2', '9', '1', '0']);
  const [authMsg, setAuthMsg] = useState('');
  const [activeSessions, setActiveSessions] = useState([
    { id: 'USR-DEL-104', role: 'Đối tác Giao Hàng', device: 'iPhone 14 (390x844)', time: '10:14:02', status: 'ACTIVE' },
    { id: 'USR-INS-028', role: 'Đội Ngũ Lắp Đặt', device: 'Samsung S23', time: '09:55:18', status: 'ACTIVE' },
    { id: 'USR-QA-009', role: 'Kiểm Tra Viên QA', device: 'iPad Mini', time: '09:12:44', status: 'ACTIVE' }
  ]);

  // Module 02: Navigation State
  const [navRole, setNavRole] = useState('delivery');

  // Module 03: Dashboards State
  const [dashTab, setDashTab] = useState('del');

  // Module 04: Delivery State
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isPodCompleted, setIsPodCompleted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Module 05: Installation State
  const [flowRate, setFlowRate] = useState<string>('0.0 m³/h');
  const [isInstallHandedOver, setIsInstallHandedOver] = useState(false);

  // Module 06: QA State
  const [geofenceVerified, setGeofenceVerified] = useState(false);
  const [qaStatus, setQaStatus] = useState<'PENDING' | 'APPROVED' | 'REWORK'>('PENDING');

  // Module 07: Service State
  const [selectedPart, setSelectedPart] = useState('sensor');
  const [ticketStatus, setTicketStatus] = useState<'OPEN' | 'RESOLVED'>('OPEN');

  // Module 08: Farmer State
  const [isPumpOn, setIsPumpOn] = useState(false);

  // Module 09: Notifications State
  const [broadcastAlert, setBroadcastAlert] = useState<string | null>(null);

  // Module 10: Profile State
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Module 11: Edge Cases State
  const [activeEdgeCase, setActiveEdgeCase] = useState<string | null>(null);

  // Handlers
  const handleAuthSubmit = () => {
    setAuthMsg('✓ Đăng nhập thành công! Đã cấp token JWT & đồng bộ quyền RBAC');
    const newSession = {
      id: 'USR-MBL-' + Math.floor(100 + Math.random() * 900),
      role: authRole === 'delivery' ? 'Đối tác Giao Hàng' : authRole === 'install' ? 'Đội Lắp Đặt' : 'Kỹ Thuật Viên',
      device: 'iPhone 14 (390x844)',
      time: new Date().toLocaleTimeString('vi-VN'),
      status: 'JUST NOW'
    };
    setActiveSessions([newSession, ...activeSessions]);
    onEmitEvent('AUTH_SESSION_CREATED', {
      userId: newSession.id,
      phone: authPhone,
      role: newSession.role,
      jwtExpiry: '24h'
    }, 'MOBILE_AUTH');
  };

  const handleQrScan = () => {
    setIsQrScanned(true);
    onEmitEvent('BARCODE_SCANNED', {
      serial: 'SLRP-5500-VN-2026-X89',
      equipment: 'Solar Pump 5.5HP',
      gps: '12.7214° N, 108.0642° E'
    }, 'MOBILE_DELIVERY');
  };

  const handleVerifyOtp = () => {
    setIsOtpVerified(true);
    onEmitEvent('OTP_VERIFIED', { orderId: 'DEL-9821', otp: '649201' }, 'MOBILE_DELIVERY');
  };

  const handleDeliveryComplete = () => {
    setIsPodCompleted(true);
    onEmitEvent('POD_COMPLETED', {
      orderId: 'DEL-9821',
      serialVerified: true,
      otpMatch: true,
      signatureCaptured: true,
      handedOverAt: new Date().toLocaleTimeString('vi-VN')
    }, 'MOBILE_DELIVERY');
  };

  const handlePumpFlowTest = () => {
    setFlowRate('Đang đo...');
    setTimeout(() => {
      setFlowRate('35.4 m³/h (ĐẠT CHUẨN)');
      onEmitEvent('FLOW_TEST_COMPLETED', {
        stationId: 'STATION-248',
        flowRate: 35.4,
        rpm: 2850,
        pressureBar: 3.2
      }, 'MOBILE_INSTALL');
    }, 600);
  };

  const handleHandoverToQa = () => {
    setIsInstallHandedOver(true);
    onEmitEvent('HANDOVER_TO_QA', {
      stationId: 'STATION-248',
      teamId: 'TEAM-INS-04',
      readyForAudit: true
    }, 'MOBILE_INSTALL');
  };

  const handleGeofenceFix = () => {
    setGeofenceVerified(true);
    onEmitEvent('GEOFENCE_VERIFIED', {
      stationId: 'STATION-248',
      distanceMeters: 4.2,
      pass: true
    }, 'MOBILE_QA');
  };

  const handleQaApprove = () => {
    setQaStatus('APPROVED');
    onEmitEvent('INSPECTION_APPROVED', {
      stationId: 'STATION-248',
      inspector: 'QA-LE-VAN-MINH',
      subsidyStatus: 'READY_TO_DISBURSE'
    }, 'MOBILE_QA');
  };

  const handleQaReject = () => {
    setQaStatus('REWORK');
    onEmitEvent('INSPECTION_REJECTED', {
      stationId: 'STATION-248',
      reason: 'Dây nối đất chưa siết chặt'
    }, 'MOBILE_QA');
  };

  const handleResolveTicket = () => {
    setTicketStatus('RESOLVED');
    onEmitEvent('TICKET_RESOLVED', {
      ticketId: 'SRV-109',
      replacedPart: selectedPart,
      customerRating: 5
    }, 'MOBILE_SERVICE');
  };

  const handleTogglePump = () => {
    const nextState = !isPumpOn;
    setIsPumpOn(nextState);
    if (nextState) {
      onEmitEvent('PUMP_START_COMMAND', {
        stationId: 'STATION-248',
        mode: 'SOLAR_DIRECT',
        targetHz: 50
      }, 'MOBILE_FARMER');
    } else {
      onEmitEvent('PUMP_STOP_COMMAND', {
        stationId: 'STATION-248',
        mode: 'MANUAL_STOP'
      }, 'MOBILE_FARMER');
    }
  };

  const handleDispatchPush = () => {
    setBroadcastAlert('⚡ CẢNH BÁO NẮNG ĐỈNH ĐIỂM: Bức xạ 980 W/m². Khuyến nghị kích hoạt bơm tối đa công suất!');
    onEmitEvent('EMERGENCY_PUSH_DISPATCHED', {
      audience: 'ALL_FIELD_USERS',
      channels: ['FCM', 'APNS', 'SMS_FALLBACK'],
      deliveryRate: '99.9%'
    }, 'ADMIN_BROADCAST');
  };

  // RENDER BASED ON MODULE ID
  switch (moduleId) {
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
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Chọn vai trò đăng nhập:</label>
              <select 
                value={authRole}
                onChange={e => setAuthRole(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium outline-none"
              >
                <option value="delivery">1. Đối tác giao hàng (Delivery)</option>
                <option value="install">2. Đội ngũ lắp đặt (Installation)</option>
                <option value="qa">3. Kiểm tra viên QA (Inspector)</option>
                <option value="service">4. Kỹ thuật viên bảo hành (Service)</option>
                <option value="farmer">5. Nông dân chủ trạm (Farmer)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">Số điện thoại đăng ký:</label>
              <input 
                type="tel" 
                value={authPhone}
                onChange={e => setAuthPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Mã OTP (6 chữ số):</label>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Mẫu: 782910</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {authOtp.map((dig, idx) => (
                  <input 
                    key={idx}
                    type="text" 
                    maxLength={1} 
                    value={dig}
                    readOnly
                    className="w-full text-center text-sm font-bold p-2 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-mono"
                  />
                ))}
              </div>
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
              onClick={handleAuthSubmit}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Xác Thực & Khởi Tạo Phiên Làm Việc</span>
            </button>

            {authMsg && (
              <div className="text-center text-[11px] text-emerald-600 dark:text-emerald-400 font-bold animate-fadeIn">
                {authMsg}
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
              <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">RBAC Enforced</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5">User ID</th>
                    <th className="p-2.5">Vai Trò (Role)</th>
                    <th className="p-2.5">Thiết Bị</th>
                    <th className="p-2.5">Thời Gian</th>
                    <th className="p-2.5">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activeSessions.map((s, i) => (
                    <tr key={s.id + i} className={i === 0 && s.status === 'JUST NOW' ? 'bg-emerald-500/10 animate-pulse' : ''}>
                      <td className="p-2.5 font-mono font-bold text-emerald-600">{s.id}</td>
                      <td className="p-2.5 text-slate-800 dark:text-slate-200">{s.role}</td>
                      <td className="p-2.5 text-slate-500">{s.device}</td>
                      <td className="p-2.5 text-slate-400 font-mono">{s.time}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'JUST NOW' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500">Phiên Hoạt Động (Active JWT)</div>
                <div className="text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">{142 + activeSessions.length - 3} Users</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500">OTP Thành Công 24h</div>
                <div className="text-base font-bold text-emerald-600 font-mono mt-0.5">99.82%</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500">Cảnh Báo Vị Trí</div>
                <div className="text-base font-bold text-slate-400 font-mono mt-0.5">0 Vi Phạm</div>
              </div>
            </div>
          </div>
        )
      };

    case '04':
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-700 dark:text-amber-400">Đơn hàng: DEL-9821</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  isPodCompleted ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {isPodCompleted ? 'ĐÃ HOÀN TẤT' : 'ĐANG GIAO'}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-white">Bơm Solar 5.5HP — Thôn 4, Cư M'gar, Đắk Lắk</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Khách hàng: Nguyễn Văn Nông (0912 345 678)</div>
            </div>

            {/* Del 06: QR Serial */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>1. Quét Mã QR Serial Kiện Hàng</span>
                <span className={`text-[10px] font-bold ${isQrScanned ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isQrScanned ? '✓ Đã quét' : 'Chưa quét'}
                </span>
              </div>
              <button 
                onClick={handleQrScan}
                className="w-full py-2 px-3 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Bật Camera Quét Barcode Kiện Hàng</span>
              </button>
              {isQrScanned && (
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1.5">
                  ✓ Serial: SLRP-5500-VN-2026-X89
                </div>
              )}
            </div>

            {/* Del 05: OTP */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">2. Nhập OTP Người Nhận Hàng</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value="649201" 
                  readOnly 
                  className="w-2/3 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-white"
                />
                <button 
                  onClick={handleVerifyOtp}
                  className="w-1/3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Khớp OTP
                </button>
              </div>
              {isOtpVerified && (
                <div className="text-[10px] text-emerald-600 font-bold mt-1">
                  ✓ OTP chính xác! Đã khớp danh tính người nhận
                </div>
              )}
            </div>

            {/* Del 08: Signature */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                <span>3. Chữ Ký Số Người Nhận (POD)</span>
                <span className="text-[10px] text-slate-400">Đã chụp</span>
              </div>
              <div className="h-16 w-full bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-xs font-script text-emerald-600 italic">
                Nguyễn Văn Nông (Ký điện tử)
              </div>
            </div>

            {/* Del 11: Complete */}
            <button 
              onClick={handleDeliveryComplete}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Xác Nhận Hoàn Tất Bàn Giao (Del 11)</span>
            </button>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trung Tâm Điều Phối Kho Vận & Chuỗi Cung Ứng (Dispatch Portal)</h4>
                <p className="text-xs text-slate-500">Giám sát lộ trình 38 xe giao hàng & biên bản POD ký nhận số</p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">Fleet Live Tracker</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5">Mã Vận Đơn</th>
                    <th className="p-2.5">Điểm Đến & Nông Dân</th>
                    <th className="p-2.5">Mã Serial Bơm</th>
                    <th className="p-2.5">Tài Xế Giao</th>
                    <th className="p-2.5">Trạng Thái POD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-mono font-bold text-amber-600">DEL-9821</td>
                    <td className="p-2.5 text-slate-800 dark:text-slate-200">Cư M'gar, Đắk Lắk (N.V. Nông)</td>
                    <td className="p-2.5 font-mono text-slate-500">
                      {isQrScanned ? <strong className="text-emerald-600">SLRP-5500-VN-2026-X89</strong> : 'Chờ quét...'}
                    </td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300">Trần Văn Tài (Xe 47B)</td>
                    <td className="p-2.5">
                      {isPodCompleted ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white animate-bounce">
                          DELIVERED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600">
                          IN TRANSIT
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {isPodCompleted && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ Biên Bản Giao Hàng Số (Digital POD #DEL-9821)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date().toLocaleTimeString('vi-VN')}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Xác thực OTP: <strong className="text-emerald-600">Thành Công (649201)</strong> | Chữ ký số SHA-256 đã kích hoạt bàn giao sang Đội Lắp Đặt.
                </div>
              </div>
            )}
          </div>
        )
      };

    case '08':
      return {
        mobile: (
          <div className="p-4 space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-500/20 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Trạm Bơm Mặt Trời #248</div>
              <h4 className="text-base font-black mt-0.5">Vườn Cà Phê 2.5 Héc-ta</h4>
              
              <div className="my-4">
                <button 
                  onClick={handleTogglePump}
                  className={`w-24 h-24 mx-auto rounded-full font-black text-xs shadow-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                    isPumpOn 
                      ? 'bg-emerald-400 text-slate-950 ring-4 ring-white animate-pulse'
                      : 'bg-white text-emerald-600'
                  }`}
                >
                  <Power className="w-6 h-6 text-emerald-500" />
                  <span>{isPumpOn ? 'ĐANG BƠM' : 'BẬT BƠM'}</span>
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
                  <div className="font-bold font-mono">{isPumpOn ? '34.8 m³/h' : '0 m³/h'}</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                <span>Hẹn Giờ Tưới Tự Động:</span>
                <span className="text-emerald-600 font-mono">08:00 - 15:30</span>
              </div>
              <div className="text-[10px] text-slate-400">Tự động ngắt khi nắng yếu hoặc giếng cạn nước (Bảo vệ E-04)</div>
            </div>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Giám Sát Hạn Mức Nước Nông Nghiệp & Mạng Lưới Trạm Bơm</h4>
                <p className="text-xs text-slate-500">Dữ liệu viễn thông IoT gửi về mỗi 5 giây từ biến tần VFD</p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-600 border border-green-500/20">IoT Live Feed</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-400">Trạng Thái Bơm #248</div>
                <div className={`text-base font-bold font-mono mt-0.5 ${isPumpOn ? 'text-emerald-500' : 'text-slate-400'}`}>
                  {isPumpOn ? 'ĐANG BƠM (RUNNING)' : 'ĐÃ TẮT (STANDBY)'}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-400">Lưu Lượng Thời Gian Thực</div>
                <div className="text-base font-bold text-blue-600 font-mono mt-0.5">{isPumpOn ? '34.8 m³/h' : '0 m³/h'}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-400">Hạn Mức Nước Còn Lại</div>
                <div className="text-base font-bold text-emerald-600 font-mono mt-0.5">85% Quota</div>
              </div>
            </div>
          </div>
        )
      };

    default:
      // Generic high-fidelity template for modules 02, 03, 05, 06, 07, 09, 10, 11
      return {
        mobile: (
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800 dark:text-white">Thao Tác Thực Địa Module {moduleId}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-white font-bold">ONLINE</span>
              </div>
              <p className="text-xs text-slate-500">Mô phỏng tương tác giao diện 390 × 844px</p>
            </div>

            <button 
              onClick={() => onEmitEvent(`MODULE_${moduleId}_ACTION`, {
                moduleId,
                timestamp: new Date().toLocaleTimeString('vi-VN'),
                status: 'EXECUTED_SUCCESSFULLY'
              }, `MOBILE_${moduleId}`)}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kích Hoạt Tác Vụ Đồng Bộ Sang Admin</span>
            </button>
          </div>
        ),
        admin: (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tháp Quản Trị Enterprise: Phân Hệ {moduleId}</h4>
                <p className="text-xs text-slate-500">Bảng điều phối và giám sát thời gian thực</p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20">Live Pipeline</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              [ENTERPRISE_GATEWAY] Đang lắng nghe kênh WebSocket từ các thiết bị di động 390px thuộc Phân Hệ {moduleId}.
            </div>
          </div>
        )
      };
  }
};

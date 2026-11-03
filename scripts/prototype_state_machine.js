/**
 * WikiAlisa UI — Complete Prototype State Machine
 * Covering all 5 User Flows, 11 Modules and Edge Cases on 390px Mockup Frame
 */

let currentRole = 'delivery';
let currentStep = 1;
let currentScenario = 'happy'; // 'happy', 'error', 'offline', 'empty', 'loading'
let otpEntered = '';
let installChecks = { check1: true, check2: false, check3: false };
let pumpIsOn = true;
let qaDecision = null; // null, 'approved', 'rejected', 'rework'
let sparePartsUsed = ['Cảm biến mực nước ngầm 50m (Chống cạn E-04)'];
let complaintSubmitted = false;

function setScenario(sc) {
  currentScenario = sc;
  ['happy', 'error', 'offline'].forEach(s => {
    const btn = document.getElementById('btn-scenario-' + s);
    if (btn) {
      if (s === sc) {
        btn.className = 'px-3 py-1 rounded-full text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow transition';
      } else {
        btn.className = 'px-3 py-1 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition';
      }
    }
  });
  renderPrototype();
}

function setRole(role) {
  currentRole = role;
  currentStep = 1;
  otpEntered = '';
  qaDecision = null;
  complaintSubmitted = false;

  ['auth', 'delivery', 'install', 'qa', 'service', 'farmer'].forEach(r => {
    const btn = document.getElementById('btn-role-' + r);
    if (btn) {
      if (r === role) {
        btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-agri-600 text-white shadow-sm transition';
      } else {
        btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition';
      }
    }
  });
  renderPrototype();
}

function goToStep(step) {
  currentStep = step;
  renderPrototype();
}

function enterOtp(digit) {
  if (otpEntered.length < 6) {
    otpEntered += digit;
    renderPrototype();
  }
}

function clearOtp() {
  otpEntered = '';
  renderPrototype();
}

function toggleCheckItem(id) {
  installChecks[id] = !installChecks[id];
  renderPrototype();
}

function togglePumpPower() {
  pumpIsOn = !pumpIsOn;
  renderPrototype();
}

function makeQaDecision(decision) {
  qaDecision = decision;
  renderPrototype();
}

function resetPrototype() {
  currentStep = 1;
  otpEntered = '';
  qaDecision = null;
  complaintSubmitted = false;
  installChecks = { check1: false, check2: false, check3: false };
  pumpIsOn = true;
  renderPrototype();
}

// ==========================================
// RENDER PROTOTYPE VIEWS
// ==========================================
function renderPrototype() {
  const container = document.getElementById('phone-screen-content');
  if (!container) return;
  let html = '';

  // Offline banner notice
  if (currentScenario === 'offline') {
    html += `
      <div class="p-2.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 text-[11px] flex items-center justify-between shadow-sm">
        <span class="flex items-center gap-1.5 font-bold"><i data-lucide="wifi-off" class="w-3.5 h-3.5 text-red-600"></i> Mất sóng 4G (Offline Mode)</span>
        <span class="px-2 py-0.5 rounded bg-red-200 dark:bg-red-900 text-[10px] font-bold">☁️ 3 Pending</span>
      </div>
    `;
  }

  // ==========================================
  // FLOW 0: AUTHENTICATION & ONBOARDING (Node 213:252)
  // ==========================================
  if (currentRole === 'auth') {
    if (currentStep === 1) {
      html += `
        <div class="h-full flex flex-col justify-between py-6 text-center">
          <div class="pt-8 space-y-3">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-agri-600 to-solar-500 flex items-center justify-center text-white mx-auto shadow-xl">
              <i data-lucide="sun-medium" class="w-9 h-9"></i>
            </div>
            <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">WikiAlisa UI</h3>
            <p class="text-xs text-slate-500">Vận hành trạm bơm mặt trời thông minh</p>
          </div>
          <div class="space-y-4">
            <div class="flex justify-center">
              <div class="w-7 h-7 rounded-full border-2 border-agri-600 border-t-transparent animate-spin"></div>
            </div>
            <div class="text-[11px] text-slate-400">v2.4.1 • Nền tảng doanh nghiệp bảo mật</div>
            <button onclick="goToStep(2)" class="w-full py-3 rounded-full bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs shadow transition">
              Khám Phá Nền Tảng ➔
            </button>
          </div>
        </div>
      `;
    } else if (currentStep === 2) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(1)" class="text-xs text-agri-600 font-bold">← Splash</button>
          <span class="text-[10px] font-bold text-slate-400">auth-welcome</span>
        </div>
        <div class="space-y-1">
          <h4 class="font-bold text-sm">Hoạt Động Bơm Thông Minh</h4>
          <p class="text-[11px] text-slate-500">Nền tảng hợp nhất 5 vai trò thực địa.</p>
        </div>
        <div class="space-y-1.5 text-xs">
          <div class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-agri-600"></i><span>Theo dõi GPS thời gian thực</span></div>
          <div class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2"><i data-lucide="truck" class="w-4 h-4 text-sky-600"></i><span>Quản lý giao nhận máy bơm & pin</span></div>
          <div class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2"><i data-lucide="wrench" class="w-4 h-4 text-solar-600"></i><span>Quy trình thi công giếng & giàn pin</span></div>
          <div class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2"><i data-lucide="clipboard-check" class="w-4 h-4 text-purple-600"></i><span>Đo kiểm nghiệm thu Voc / Imp</span></div>
          <div class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i><span>Bảo mật AES-256 & Offline-First</span></div>
        </div>
        <button onclick="goToStep(3)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow transition">
          Tiếp Tục Đăng Nhập ➔
        </button>
      `;
    } else if (currentStep === 3) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(2)" class="text-xs text-agri-600 font-bold">← Giới thiệu</button>
          <span class="text-[10px] font-bold text-slate-400">Auth / 03A Login</span>
        </div>
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 class="font-bold text-sm text-center">Đăng Nhập Tài Khoản</h4>
          <div class="space-y-2 text-xs">
            <div>
              <label class="font-semibold block mb-1">Mã Nhân Viên (Employee ID)</label>
              <input type="text" value="EMP-2024-897" readonly class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs">
            </div>
            <div>
              <label class="font-semibold block mb-1">Mật Khẩu</label>
              <input type="password" value="••••••••" readonly class="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs">
            </div>
            <div class="flex justify-between text-[11px] text-slate-500">
              <label><input type="checkbox" checked class="accent-agri-600"> Ghi nhớ</label>
              <span class="text-agri-600">Quên mật khẩu?</span>
            </div>
          </div>
          <button onclick="goToStep(4)" class="w-full py-2.5 rounded-full bg-agri-600 text-white font-bold text-xs shadow transition">
            Xác Thực Đăng Nhập ➔
          </button>
        </div>
      `;
    } else if (currentStep === 4) {
      html += `
        <div class="text-center py-6 space-y-3">
          <div class="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
            <i data-lucide="user-check" class="w-8 h-8"></i>
          </div>
          <h4 class="font-bold text-base">Nhận Diện Vai Trò Thành Công!</h4>
          <p class="text-xs text-slate-500 max-w-xs mx-auto">Tài khoản thuộc: <strong>Delivery Partner (Đối tác Giao vận)</strong>. Dữ liệu tuyến đường đã được nạp.</p>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left text-xs font-mono space-y-1">
            <div>Nhân viên: Nguyễn Văn A (EMP-2024-897)</div>
            <div>Trạm phân công: #SP-8942 Đồng Tháp</div>
            <div>Bảo mật: Mã hóa AES-256 Bit</div>
          </div>
          <button onclick="setRole('delivery')" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow transition">
            Vào Bảng Điều Khiển Giao Vận ➔
          </button>
        </div>
      `;
    }
  }

  // ==========================================
  // FLOW 1: DELIVERY (13 BƯỚC HOÀN CHỈNH)
  // ==========================================
  else if (currentRole === 'delivery') {
    if (currentStep === 1) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div><h3 class="font-bold text-sm">Delivery Dashboard</h3><p class="text-[11px] text-slate-500">2 chuyến cần giao thực địa hôm nay</p></div>
          <span class="p-1.5 rounded-full bg-agri-100 text-agri-700"><i data-lucide="truck" class="w-4 h-4"></i></span>
        </div>
        <div onclick="goToStep(2)" class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-agri-500 shadow-sm cursor-pointer hover:border-agri-600 transition space-y-2 relative">
          <span class="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-agri-600 text-white text-[10px] font-bold">ĐANG GIAO</span>
          <div class="flex justify-between"><span class="text-[11px] font-mono text-slate-500">Đơn #SP-8942</span><span class="text-xs font-bold text-agri-600">Cách 2.4 km</span></div>
          <h4 class="font-bold text-xs">Hộ: Bác Ba Phi</h4>
          <p class="text-[11px] text-slate-500">Ấp 3, Xã Tân Lập, Huyện Tháp Mười, Đồng Tháp</p>
          <div class="text-xs text-agri-600 font-semibold pt-1">Chạm để mở chi tiết & dẫn đường ➔</div>
        </div>
        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-60 space-y-1">
          <div class="flex justify-between text-xs"><span class="text-[11px] font-mono text-slate-500">Đơn #SP-8943</span><span class="text-xs text-slate-400">Cách 8.1 km</span></div>
          <h4 class="font-bold text-xs">Hộ: Bác Năm Nhã</h4><p class="text-[11px] text-slate-500">Ấp Mỹ Hòa, Huyện Cao Lãnh</p>
        </div>
      `;
    } else if (currentStep === 2) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(1)" class="text-xs text-agri-600 font-bold">← Dashboard</button>
          <span class="text-[10px] font-bold text-slate-400">Bước 2/6: Cấu Hình Thiết Bị</span>
        </div>
        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Linh Kiện Bàn Giao</span>
          <div class="flex justify-between"><span class="text-slate-500">Máy bơm:</span><span class="font-bold">Bơm Chìm Hỏa Tiễn 3HP</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Tấm pin mặt trời:</span><span class="font-bold">8 Tấm 540W Mono</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Biến tần (Inverter):</span><span class="font-bold">Solar MPPT 2.2kW</span></div>
        </div>
        <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
          <span class="text-[10px] font-bold text-slate-400 uppercase">Chủ Hộ Nông Dân</span>
          <div class="font-bold text-sm">Bác Ba Phi • 0918.234.567</div>
          <button class="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5">
            <i data-lucide="phone" class="w-3.5 h-3.5 text-agri-600"></i> Gọi Điện Trước
          </button>
        </div>
        <button onclick="goToStep(3)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">
          Bắt Đầu Dẫn Đường GPS ➔
        </button>
      `;
    } else if (currentStep === 3) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(2)" class="text-xs text-agri-600 font-bold">← Chi tiết</button>
          <span class="text-[10px] font-bold text-slate-400">Bước 3/6: Bản Đồ</span>
        </div>
        <div class="h-44 rounded-xl bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center border border-slate-300 dark:border-slate-700">
          <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#1B873F_1px,transparent_1px)] [background-size:12px_12px]"></div>
          <div class="text-center z-10 space-y-1">
            <span class="inline-block p-2 rounded-full bg-red-500 text-white shadow-lg animate-bounce"><i data-lucide="map-pin" class="w-5 h-5"></i></span>
            <div class="text-xs font-bold">10.6542° N, 105.7891° E</div>
            <div class="text-[10px] text-emerald-600 font-bold">Đã đến vị trí thực địa!</div>
          </div>
        </div>
        <button onclick="goToStep(4)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">
          Đã Đến Nơi ➔ Nhập OTP Khách Hàng
        </button>
      `;
    } else if (currentStep === 4) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(3)" class="text-xs text-agri-600 font-bold">← Bản đồ</button>
          <span class="text-[10px] font-bold text-slate-400">Bước 4/6: OTP</span>
        </div>
        <div class="text-center space-y-1">
          <h4 class="font-bold text-sm">Xác Thực Mã OTP Bàn Giao</h4>
          <p class="text-[11px] text-slate-500">Yêu cầu nông dân đọc mã 4 số được gửi qua SMS</p>
        </div>
        <div class="flex justify-center gap-3 my-2">
          <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[0] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300'}">${otpEntered[0] || ''}</div>
          <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[1] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300'}">${otpEntered[1] || ''}</div>
          <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[2] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300'}">${otpEntered[2] || ''}</div>
          <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[3] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300'}">${otpEntered[3] || ''}</div>
        </div>
        <div class="grid grid-cols-3 gap-2 px-6">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button onclick="enterOtp('${n}')" class="h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold">${n}</button>`).join('')}
          <button onclick="clearOtp()" class="h-10 rounded-lg bg-slate-100 text-xs font-bold text-red-600">Xóa</button>
          <button onclick="enterOtp('0')" class="h-10 rounded-lg bg-white border text-sm font-bold">0</button>
          <button onclick="otpEntered = '8942'; renderPrototype();" class="h-10 rounded-lg bg-agri-100 text-xs font-bold text-agri-700">Mẫu</button>
        </div>
        <button onclick="${otpEntered.length === 4 ? 'goToStep(5)' : 'alert(\'Vui lòng nhập đủ 4 số OTP (Gợi ý: 8942)\')'}" class="w-full py-2.5 rounded-full ${otpEntered.length === 4 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-400'} font-bold text-xs shadow">
          Xác Nhận OTP ➔
        </button>
      `;
    } else if (currentStep === 5) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(4)" class="text-xs text-agri-600 font-bold">← OTP</button>
          <span class="text-[10px] font-bold text-slate-400">Bước 5/6: Quét QR Sê-ri</span>
        </div>
        <div class="h-44 rounded-xl bg-slate-950 text-white relative overflow-hidden flex flex-col items-center justify-center border-2 border-agri-500">
          <div class="w-28 h-28 border-2 border-dashed border-white/60 rounded-lg flex items-center justify-center relative">
            <div class="w-full h-0.5 bg-red-500 absolute animate-pulse"></div>
            <i data-lucide="qr-code" class="w-12 h-12 text-white/40"></i>
          </div>
          <span class="text-[10px] text-white/80 mt-2">Quét mã QR số sê-ri trên thùng máy...</span>
        </div>
        <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs">
          <div class="text-[10px] text-slate-400">MÃ NHẬN DIỆN THÀNH CÔNG:</div>
          <div class="font-mono font-bold text-agri-600">SERIAL: SP-8942-SOLAR-3HP</div>
        </div>
        <button onclick="goToStep(6)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">
          Chụp Ảnh & Lấy Chữ Ký Nông Dân ➔
        </button>
      `;
    } else if (currentStep === 6) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(5)" class="text-xs text-agri-600 font-bold">← Quét QR</button>
          <span class="text-[10px] font-bold text-slate-400">Bước 6/6: Ký Nhận POD</span>
        </div>
        <div class="space-y-1">
          <span class="text-xs font-bold">Chữ Ký Điện Tử Bác Ba Phi</span>
          <div class="h-28 rounded-xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center relative">
            <span class="font-mono text-xl text-slate-700 dark:text-slate-200 italic font-bold">Ba Phi (Đã ký nhận)</span>
            <span class="absolute bottom-2 right-3 text-[10px] text-slate-400">Thời gian: 09:41 UTC+7</span>
          </div>
        </div>
        <button onclick="goToStep(7)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">
          Hoàn Tất Chuyến Giao Hàng 🎉
        </button>
      `;
    } else if (currentStep === 7) {
      html += `
        <div class="text-center py-6 space-y-3">
          <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
            <i data-lucide="check-circle-2" class="w-9 h-9"></i>
          </div>
          <h3 class="font-bold text-base">Giao Hàng Thành Công!</h3>
          <p class="text-xs text-slate-500">Biên bản POD-8942-VN đã được đóng gói và lưu an toàn.</p>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left text-xs font-mono space-y-1">
            <div>Mã biên bản: POD-8942-VN</div>
            <div>Chủ hộ: Bác Ba Phi</div>
            <div>Trạng thái: DELIVERED (Sẵn sàng lắp đặt)</div>
          </div>
          <button onclick="resetPrototype()" class="w-full py-2.5 rounded-full bg-agri-600 text-white font-bold text-xs shadow">
            Về Dashboard Giao Vận
          </button>
        </div>
      `;
    }
  }

  // ==========================================
  // FLOW 2: INSTALLATION TEAM (Module 5)
  // ==========================================
  else if (currentRole === 'install') {
    const checkedCount = Object.values(installChecks).filter(Boolean).length;
    html += `
      <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div><h3 class="font-bold text-sm">Installation Dashboard</h3><p class="text-[11px] text-slate-500">Thi công trạm #SP-8942</p></div>
        <span class="p-1.5 rounded-full bg-solar-100 text-solar-700"><i data-lucide="wrench" class="w-4 h-4"></i></span>
      </div>
      <div class="space-y-1">
        <div class="flex justify-between text-xs font-semibold">
          <span>Tiến độ kỹ thuật</span>
          <span class="text-agri-600">${checkedCount}/3 tiêu chuẩn đạt</span>
        </div>
        <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div class="h-full bg-agri-500 transition-all duration-300" style="width: ${(checkedCount/3)*100}%"></div>
        </div>
      </div>
      <div class="space-y-2">
        <div onclick="toggleCheckItem('check1')" class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer ${installChecks.check1 ? 'border-agri-500 bg-agri-50/20' : 'border-slate-200'} text-xs">
          <div class="w-4 h-4 rounded border flex items-center justify-center ${installChecks.check1 ? 'bg-agri-600 text-white' : 'border-slate-400'}">${installChecks.check1 ? '✓' : ''}</div>
          <span>1. Dàn 8 pin quay hướng Nam, góc nghiêng 15°</span>
        </div>
        <div onclick="toggleCheckItem('check2')" class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer ${installChecks.check2 ? 'border-agri-500 bg-agri-50/20' : 'border-slate-200'} text-xs">
          <div class="w-4 h-4 rounded border flex items-center justify-center ${installChecks.check2 ? 'bg-agri-600 text-white' : 'border-slate-400'}">${installChecks.check2 ? '✓' : ''}</div>
          <span>2. Độ sâu giếng khoan 35m (Có lưới lọc cát)</span>
        </div>
        <div onclick="toggleCheckItem('check3')" class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer ${installChecks.check3 ? 'border-agri-500 bg-agri-50/20' : 'border-slate-200'} text-xs">
          <div class="w-4 h-4 rounded border flex items-center justify-center ${installChecks.check3 ? 'bg-agri-600 text-white' : 'border-slate-400'}">${installChecks.check3 ? '✓' : ''}</div>
          <span>3. Cọc tiếp địa an toàn chống sét &lt; 10 Ohm</span>
        </div>
      </div>
      <button onclick="${checkedCount === 3 ? 'alert(\'Biên bản lắp đặt thi công đã hoàn tất và chuyển sang hàng chờ QA!\')' : 'alert(\'Vui lòng tích chọn đủ 3 hạng mục kiểm tra kỹ thuật!\')'}" class="w-full py-2.5 rounded-full ${checkedCount === 3 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-400'} font-bold text-xs shadow">
        Nộp Hồ Sơ Lắp Đặt Sang QA ➔
      </button>
    `;
  }

  // ==========================================
  // FLOW 3: QA INSPECTION (Module 6)
  // ==========================================
  else if (currentRole === 'qa') {
    html += `
      <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div><h3 class="font-bold text-sm">QA Inspection Queue</h3><p class="text-[11px] text-slate-500">Đo kiểm thông số trạm #SP-8942</p></div>
        <span class="p-1.5 rounded-full bg-purple-100 text-purple-700"><i data-lucide="clipboard-check" class="w-4 h-4"></i></span>
      </div>
      <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border space-y-2 text-xs">
        <span class="text-[10px] font-bold text-slate-400 uppercase">Thông Số Đo Thực Tế</span>
        <div class="flex justify-between"><span class="text-slate-500">Điện áp hở mạch (Voc):</span><span class="font-bold text-emerald-600">420V (Đạt chuẩn)</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Dòng tải đỉnh (Imp):</span><span class="font-bold text-emerald-600">11.2A (Đạt chuẩn)</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Lưu lượng nước giếng:</span><span class="font-bold text-agri-600">19.2 m³/h</span></div>
      </div>
      ${qaDecision === 'approved' ? `
        <div class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-1">
          <span class="text-xs font-bold text-emerald-700">★ ĐÃ PHÊ DUYỆT NGHIỆM THU (QA APPROVED) ★</span>
          <p class="text-[11px] text-emerald-600">Trạm bơm đã được cấp phép vận hành chính thức.</p>
        </div>
      ` : qaDecision === 'rejected' ? `
        <div class="p-4 rounded-xl bg-red-50 border-2 border-red-500 text-center space-y-1">
          <span class="text-xs font-bold text-red-700">✖ TỪ CHỐI NGHIỆM THU (QA REJECTED)</span>
          <p class="text-[11px] text-red-600">Yêu cầu căn chỉnh lại góc nghiêng dàn pin.</p>
        </div>
      ` : `
        <div class="grid grid-cols-2 gap-2 pt-2">
          <button onclick="makeQaDecision('approved')" class="py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-700">✓ Phê Duyệt QA</button>
          <button onclick="makeQaDecision('rejected')" class="py-3 rounded-xl bg-red-600 text-white font-bold text-xs shadow hover:bg-red-700">✕ Từ Chối</button>
        </div>
      `}
    `;
  }

  // ==========================================
  // FLOW 4: SERVICE & COMPLAINTS (Module 7)
  // ==========================================
  else if (currentRole === 'service') {
    html += `
      <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div><h3 class="font-bold text-sm">Service Dashboard</h3><p class="text-[11px] text-slate-500">Phiếu sự cố #TK-4091</p></div>
        <span class="p-1.5 rounded-full bg-amber-100 text-amber-700"><i data-lucide="shield-alert" class="w-4 h-4"></i></span>
      </div>
      <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs space-y-1">
        <span class="font-bold flex items-center gap-1 text-amber-800"><i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> Mã lỗi E-04: DRY_RUN_PROTECTION</span>
        <p class="text-[11px] text-amber-700">Mực nước ngầm hạ sâu dưới cảm biến giếng, bơm ngắt an toàn.</p>
      </div>
      <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border text-xs space-y-2">
        <span class="text-[10px] font-bold text-slate-400 uppercase">Linh Kiện Xuất Kho Thay Thế:</span>
        <div class="flex items-center gap-2 font-mono text-xs text-agri-600">
          <i data-lucide="check" class="w-3.5 h-3.5"></i> <span>Cảm biến mực nước ngầm 50m</span>
        </div>
      </div>
      <button onclick="alert('Đã hạ cảm biến thêm 3m và kích hoạt lại bơm thành công! Khách hàng đánh giá 5 sao.')" class="w-full py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow">
        Hạ Cảm Biến & Đóng Phiếu Bảo Trì
      </button>
    `;
  }

  // ==========================================
  // FLOW 5: FARMER PORTAL (Module 8)
  // ==========================================
  else if (currentRole === 'farmer') {
    html += `
      <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div><h3 class="font-bold text-sm">Bác Ba Phi (Chủ Hộ)</h3><p class="text-[11px] text-slate-500">Trạm bơm #04 — Vườn Xoài Cát Chu</p></div>
        <span class="p-1.5 rounded-full bg-agri-100 text-agri-700"><i data-lucide="user" class="w-4 h-4"></i></span>
      </div>
      <div class="p-4 rounded-2xl bg-gradient-to-tr ${pumpIsOn ? 'from-agri-600 to-solar-500' : 'from-slate-700 to-slate-800'} text-white space-y-2 shadow-lg transition-colors">
        <div class="flex justify-between items-center text-xs opacity-90">
          <span class="uppercase">Trạng Thái Bơm</span>
          <span class="px-2 py-0.5 rounded-full ${pumpIsOn ? 'bg-emerald-400/30' : 'bg-red-400/30'} font-bold text-[10px]">${pumpIsOn ? 'ĐANG CHẠY' : 'ĐÃ DỪNG'}</span>
        </div>
        <div class="text-3xl font-extrabold font-mono">${pumpIsOn ? '18.5' : '0.0'} <span class="text-sm font-normal">m³/h</span></div>
        <div class="text-xs flex items-center gap-1 opacity-90">
          <i data-lucide="sun" class="w-3.5 h-3.5"></i>
          <span>${pumpIsOn ? 'Công suất 4.8 kW • Tiết kiệm 45.000đ điện hôm nay' : 'Máy bơm ở trạng thái nghỉ an toàn'}</span>
        </div>
      </div>
      <button onclick="togglePumpPower()" class="w-full py-3 rounded-full ${pumpIsOn ? 'bg-red-600 hover:bg-red-700' : 'bg-agri-600 hover:bg-agri-700'} text-white font-bold text-xs shadow transition active:scale-95">
        ${pumpIsOn ? 'Tắt Bơm Khẩn Cấp' : 'Khởi Động Lại Máy Bơm'}
      </button>
      <div class="pt-2">
        <button onclick="alert('Đã gửi yêu cầu hỗ trợ kỹ thuật đến Trung Tâm Điều Hành!')" class="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5">
          <i data-lucide="help-circle" class="w-4 h-4 text-agri-600"></i> Báo Sự Cố 1 Chạm Đến Kỹ Thuật Viên
        </button>
      </div>
    `;
  }

  container.innerHTML = html;
  lucide.createIcons();
}

// Initial render
setRole('delivery');
lucide.createIcons();

/**
 * WikiAlisa UI — Prototype State Machine with Figma Hi-Fi Image Projections
 * Render authentic exported images from assets/img/demo/* with clickable interactive hotspots
 */

let displayMode = 'figma'; // 'figma' or 'code'
let currentRole = 'delivery';
let currentStep = 1;
let currentScenario = 'happy'; // 'happy', 'error', 'offline'
let otpEntered = '';
let installChecks = { check1: true, check2: false, check3: false };
let pumpIsOn = true;
let qaDecision = null;
let customFigmaImage = null; // When quick jump is used

const figmaImageMap = {
  del01: { img: 'assets/img/demo/Del/01 - Delivery List.png', name: 'Del / 01 - Delivery List', next: 2, hint: 'Chạm đơn hàng #SP-8942 để xem chi tiết' },
  del02: { img: 'assets/img/demo/Del/02 - Delivery Details.png', name: 'Del / 02 - Delivery Details', next: 3, hint: 'Bấm nút Bắt Đầu Dẫn Đường GPS' },
  del03: { img: 'assets/img/demo/Del/03 - Route Navigation.png', name: 'Del / 03 - Route Navigation', next: 4, hint: 'Chạm Đã Đến Nơi để mở màn hình OTP' },
  del04: { img: 'assets/img/demo/Del/04 - Farmer Contact.png', name: 'Del / 04 - Farmer Contact', next: 3, hint: 'Liên hệ chủ hộ Bác Ba Phi' },
  del05: { img: 'assets/img/demo/Del/05 - OTP Verification.png', name: 'Del / 05 - OTP Verification', next: 5, hint: 'Nhập mã OTP 4 số từ SMS của nông dân' },
  del06: { img: 'assets/img/demo/Del/06 - Serial Verification.png', name: 'Del / 06 - Serial Verification', next: 6, hint: 'Quét mã QR số sê-ri máy bơm' },
  del07: { img: 'assets/img/demo/Del/07 - Photo Upload.png', name: 'Del / 07 - Photo Upload', next: 6, hint: 'Chụp 4 góc ảnh giếng khoan & dàn pin' },
  del08: { img: 'assets/img/demo/Del/08 - Farmer Signature.png', name: 'Del / 08 - Farmer Signature', next: 7, hint: 'Nông dân ký nhận cảm ứng số' },
  del09: { img: 'assets/img/demo/Del/09 - GPS Verification.png', name: 'Del / 09 - GPS Verification', next: 7, hint: 'Khóa tọa độ địa lý thực địa' },
  del10: { img: 'assets/img/demo/Del/10 - Delivery Remarks.png', name: 'Del / 10 - Delivery Remarks', next: 7, hint: 'Ghi chú hiện trường bàn giao' },
  del11: { img: 'assets/img/demo/Del/11 - Delivery Confirmation.png', name: 'Del / 11 - Delivery Confirmation', next: 1, hint: 'Biên bản POD hoàn tất' },
  del12: { img: 'assets/img/demo/Del/12 - Offline Sync.png', name: 'Del / 12 - Offline Sync', next: 1, hint: 'Hàng đợi ngoại tuyến khi mất sóng' },
  del13: { img: 'assets/img/demo/Del/13 - Delivery Timeline.png', name: 'Del / 13 - Delivery Timeline', next: 1, hint: 'Lịch sử dòng thời gian giao nhận' },
  del14: { img: 'assets/img/demo/Del/14 - Dashboard Widgets.png', name: 'Del / 14 - Dashboard Widgets', next: 1, hint: 'Chỉ số hiệu suất giao hàng' },
  del15: { img: 'assets/img/demo/Del/15 - Bottom Sheets.png', name: 'Del / 15 - Bottom Sheets', next: 1, hint: 'Bảng trượt tùy chọn nhanh' },
  del16: { img: 'assets/img/demo/Del/16 - Dialogs.png', name: 'Del / 16 - Dialogs', next: 1, hint: 'Hộp thoại cảnh báo' },
  del17: { img: 'assets/img/demo/Del/17 - Empty States.png', name: 'Del / 17 - Empty States', next: 1, hint: 'Trạng thái rỗng hết chuyến giao' },
  del18: { img: 'assets/img/demo/Del/18 - Error States.png', name: 'Del / 18 - Error States', next: 1, hint: 'Màn hình báo lỗi' },
  dash01: { img: 'assets/img/demo/Dash/01 - Delivery Partner.png', name: 'Dash / 01 - Delivery Partner', next: 1, hint: 'Bảng điều khiển ca làm việc' },
  auth_otp: { img: 'assets/img/demo/auth-otp-verification.png', name: 'auth-otp-verification', next: 1, hint: 'Xác thực OTP 6 chữ số' },
  auth_perm: { img: 'assets/img/demo/auth-permission-setup.png', name: 'auth-permission-setup', next: 1, hint: 'Cấp 5 quyền hệ thống thực địa' },
  auth_sync: { img: 'assets/img/demo/auth-data-sync.png', name: 'auth-data-sync', next: 1, hint: 'Đồng bộ dữ liệu ngoại tuyến' },
  auth_role: { img: 'assets/img/demo/auth-role-detection.png', name: 'auth-role-detection', next: 1, hint: 'Tự động nhận diện vai trò' },
  auth_success: { img: 'assets/img/demo/auth-success.png', name: 'auth-success', next: 1, hint: 'Vào ca làm việc thành công' }
};

function setDisplayMode(mode) {
  displayMode = mode;
  const btnFigma = document.getElementById('btn-mode-figma');
  const btnCode = document.getElementById('btn-mode-code');
  if (mode === 'figma') {
    btnFigma.className = 'px-3.5 py-1.5 rounded-lg bg-agri-600 text-white shadow transition flex items-center gap-1.5';
    btnCode.className = 'px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 transition flex items-center gap-1.5';
  } else {
    btnFigma.className = 'px-3.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 transition flex items-center gap-1.5';
    btnCode.className = 'px-3.5 py-1.5 rounded-lg bg-agri-600 text-white shadow transition flex items-center gap-1.5';
  }
  renderPrototype();
}

function jumpToScreen(key) {
  if (figmaImageMap[key]) {
    customFigmaImage = figmaImageMap[key];
    setDisplayMode('figma');
  }
}

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
  customFigmaImage = null;

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
  customFigmaImage = null;
  renderPrototype();
}

function enterOtp(digit) {
  if (otpEntered.length < 4) {
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
  customFigmaImage = null;
  installChecks = { check1: false, check2: false, check3: false };
  pumpIsOn = true;
  renderPrototype();
}

// ==========================================
// RENDER PROTOTYPE VIEWS (FIGMA HI-FI & CODE)
// ==========================================
function renderPrototype() {
  const container = document.getElementById('phone-screen-content');
  if (!container) return;
  let html = '';

  // 1. If custom Figma image is selected from quick jump dropdown
  if (displayMode === 'figma' && customFigmaImage) {
    html = `
      <div class="relative w-full h-full flex flex-col justify-between -m-4 p-0 bg-slate-900 text-white">
        <!-- Floating Info Bar -->
        <div class="p-2.5 bg-slate-950/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs sticky top-0 z-20">
          <div>
            <span class="text-[10px] text-agri-400 font-mono uppercase block font-bold">Figma Hi-Fi Preview</span>
            <span class="font-bold text-xs truncate max-w-[200px] block">${customFigmaImage.name}</span>
          </div>
          <button onclick="customFigmaImage = null; renderPrototype();" class="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-semibold transition">
            ✕ Đóng
          </button>
        </div>

        <!-- Scrollable High-Res Image -->
        <div class="flex-1 overflow-y-auto relative">
          <img src="${customFigmaImage.img}" alt="${customFigmaImage.name}" class="w-full h-auto block select-none">
          
          <!-- Interactive Hotspot Button -->
          <div class="p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent sticky bottom-0 left-0 right-0 z-20 space-y-1.5">
            <div class="text-[11px] text-amber-300 font-medium text-center">💡 ${customFigmaImage.hint}</div>
            <button onclick="goToStep(${customFigmaImage.next});" class="w-full py-2.5 rounded-full bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs shadow-lg transition">
              Tiếp tục luồng tương tác ➔
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
    lucide.createIcons();
    return;
  }

  // 2. FIGMA IMAGE MODE (Default for Delivery and Roles)
  if (displayMode === 'figma' && currentRole === 'delivery') {
    let imgSrc = 'assets/img/demo/Del/01 - Delivery List.png';
    let stepTitle = 'Del / 01 - Delivery List';
    let nextStep = 2;
    let hotspotText = 'Chạm đơn #SP-8942 Bác Ba Phi để mở chi tiết ➔';

    if (currentStep === 1) {
      imgSrc = 'assets/img/demo/Del/01 - Delivery List.png';
      stepTitle = 'Bước 1/7: Danh Sách Điểm Giao';
      nextStep = 2;
      hotspotText = 'Chạm đơn #SP-8942 Bác Ba Phi để mở chi tiết ➔';
    } else if (currentStep === 2) {
      imgSrc = 'assets/img/demo/Del/02 - Delivery Details.png';
      stepTitle = 'Bước 2/7: Chi Tiết Thiết Bị';
      nextStep = 3;
      hotspotText = 'Chạm để mở bản đồ dẫn đường GPS ➔';
    } else if (currentStep === 3) {
      imgSrc = 'assets/img/demo/Del/03 - Route Navigation.png';
      stepTitle = 'Bước 3/7: Dẫn Đường GPS Thực Địa';
      nextStep = 4;
      hotspotText = 'Đã đến nơi ➔ Mở xác thực OTP khách hàng';
    } else if (currentStep === 4) {
      imgSrc = 'assets/img/demo/Del/05 - OTP Verification.png';
      stepTitle = 'Bước 4/7: Xác Thực Mã OTP 4 Số';
      nextStep = 5;
      hotspotText = 'Xác thực OTP thành công ➔ Quét QR số sê-ri';
    } else if (currentStep === 5) {
      imgSrc = 'assets/img/demo/Del/06 - Serial Verification.png';
      stepTitle = 'Bước 5/7: Quét QR Số Sê-ri Máy Bơm';
      nextStep = 6;
      hotspotText = 'Mã hợp lệ ➔ Chụp ảnh & Lấy chữ ký';
    } else if (currentStep === 6) {
      imgSrc = 'assets/img/demo/Del/08 - Farmer Signature.png';
      stepTitle = 'Bước 6/7: Ký Nhận Điện Tử POD';
      nextStep = 7;
      hotspotText = 'Bác Ba Phi đã ký ➔ Hoàn tất bàn giao 🎉';
    } else if (currentStep === 7) {
      imgSrc = 'assets/img/demo/Del/11 - Delivery Confirmation.png';
      stepTitle = 'Bước 7/7: Cấp Biên Bản Bàn Giao POD';
      nextStep = 1;
      hotspotText = 'Hoàn thành ➔ Về lại trang Dashboard';
    }

    html = `
      <div class="relative w-full h-full flex flex-col justify-between -m-4 p-0 bg-slate-900 text-white">
        <!-- Top Status Bar -->
        <div class="p-2.5 bg-slate-950/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs sticky top-0 z-20">
          <div>
            <span class="text-[10px] text-agri-400 font-mono uppercase font-bold block">Figma Pixel-Perfect Hi-Fi</span>
            <span class="font-bold text-xs truncate max-w-[210px] block">${stepTitle}</span>
          </div>
          <div class="flex items-center gap-1">
            ${currentStep > 1 ? '<button onclick="goToStep(' + (currentStep - 1) + ')" class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] font-bold">← Trước</button>' : ''}
            <span class="px-2 py-0.5 rounded bg-agri-600 text-[10px] font-mono font-bold">${currentStep}/7</span>
          </div>
        </div>

        <!-- Scrollable Real Screen Image -->
        <div class="flex-1 overflow-y-auto relative">
          <img src="${imgSrc}" alt="${stepTitle}" class="w-full h-auto block select-none">

          <!-- Pulsing Interactive Hotspot Overlay -->
          <div class="p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent sticky bottom-0 left-0 right-0 z-20 space-y-2">
            <button onclick="goToStep(${nextStep})" class="w-full py-3 rounded-full bg-gradient-to-r from-agri-600 to-emerald-600 hover:from-agri-700 hover:to-emerald-700 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-1.5 transition active:scale-95 animate-pulse">
              <span>${hotspotText}</span>
            </button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
    lucide.createIcons();
    return;
  }

  // 3. FIGMA IMAGE MODE FOR OTHER ROLES (Auth, Install, QA, Service, Farmer)
  if (displayMode === 'figma') {
    let roleImg = '';
    let flowImg = '';
    let roleTitle = '';

    if (currentRole === 'auth') {
      roleImg = 'assets/img/demo/auth-role-detection.png';
      roleTitle = '0. Auth & Onboarding Flow';
    } else if (currentRole === 'install') {
      roleImg = 'assets/img/demo/2. Installation Team.png';
      flowImg = 'assets/img/demo/MODULE 02   Installation Team App Flow.png';
      roleTitle = '2. Installation Team (Module 02)';
    } else if (currentRole === 'qa') {
      roleImg = 'assets/img/demo/3. QA Inspector.png';
      flowImg = 'assets/img/demo/MODULE 03   QA Inspector App Flow.png';
      roleTitle = '3. QA Inspector (Module 03)';
    } else if (currentRole === 'service') {
      roleImg = 'assets/img/demo/4. Service Technician.png';
      flowImg = 'assets/img/demo/MODULE 04   Service Technician App Flow.png';
      roleTitle = '4. Service Technician (Module 04)';
    } else if (currentRole === 'farmer') {
      roleImg = 'assets/img/demo/5. Farmer (Consumer).png';
      flowImg = 'assets/img/demo/MODULE 05   Farmer App Flow.png';
      roleTitle = '5. Farmer Portal (Module 05)';
    }

    html = `
      <div class="relative w-full h-full flex flex-col justify-between -m-4 p-0 bg-slate-900 text-white">
        <div class="p-2.5 bg-slate-950/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs sticky top-0 z-20">
          <div>
            <span class="text-[10px] text-agri-400 font-mono uppercase font-bold block">Figma Hi-Fi Preview</span>
            <span class="font-bold text-xs truncate max-w-[210px] block">${roleTitle}</span>
          </div>
          <button onclick="setDisplayMode('code')" class="px-2 py-1 rounded bg-agri-600 text-[10px] font-bold">
            Chuyển Sang Live Code
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div class="rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <span class="text-[10px] font-bold text-slate-400 block p-2 bg-slate-950">THẺ VAI TRÒ CHÍNH (358x83):</span>
            <img src="${roleImg}" alt="${roleTitle}" class="w-full h-auto block">
          </div>

          ${flowImg ? `
            <div class="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <span class="text-[10px] font-bold text-slate-400 block p-2 bg-slate-950">FLOW MAP TOÀN DIỆN FIGMA:</span>
              <img src="${flowImg}" alt="Flow Map" class="w-full h-auto block">
            </div>
          ` : ''}

          <button onclick="setDisplayMode('code')" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow-md">
            Mở Trình Tương Tác Live Code ➔
          </button>
        </div>
      </div>
    `;
    container.innerHTML = html;
    lucide.createIcons();
    return;
  }

  // 4. HTML/CSS LIVE CODE MODE (Retain the rich functional prototype)
  if (currentScenario === 'offline') {
    html += `
      <div class="p-2.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 text-[11px] flex items-center justify-between shadow-sm">
        <span class="flex items-center gap-1.5 font-bold"><i data-lucide="wifi-off" class="w-3.5 h-3.5 text-red-600"></i> Mất sóng 4G (Offline Mode)</span>
        <span class="px-2 py-0.5 rounded bg-red-200 dark:bg-red-900 text-[10px] font-bold">☁️ 3 Pending</span>
      </div>
    `;
  }

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
            <div class="flex justify-center"><div class="w-7 h-7 rounded-full border-2 border-agri-600 border-t-transparent animate-spin"></div></div>
            <div class="text-[11px] text-slate-400">v2.4.1 • Nền tảng doanh nghiệp bảo mật</div>
            <button onclick="goToStep(2)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">Khám Phá Nền Tảng ➔</button>
          </div>
        </div>
      `;
    } else if (currentStep === 2) {
      html += `
        <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <button onclick="goToStep(1)" class="text-xs text-agri-600 font-bold">← Splash</button>
          <span class="text-[10px] font-bold text-slate-400">auth-welcome</span>
        </div>
        <div class="space-y-1"><h4 class="font-bold text-sm">Hoạt Động Bơm Thông Minh</h4><p class="text-[11px] text-slate-500">Nền tảng hợp nhất 5 vai trò thực địa.</p></div>
        <button onclick="goToStep(3)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">Tiếp Tục Đăng Nhập ➔</button>
      `;
    } else if (currentStep === 3) {
      html += `
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border space-y-3">
          <h4 class="font-bold text-sm text-center">Đăng Nhập Tài Khoản</h4>
          <input type="text" value="EMP-2024-897" readonly class="w-full px-3 py-2 rounded-lg border text-xs">
          <input type="password" value="••••••••" readonly class="w-full px-3 py-2 rounded-lg border text-xs">
          <button onclick="goToStep(4)" class="w-full py-2.5 rounded-full bg-agri-600 text-white font-bold text-xs shadow">Xác Thực Đăng Nhập ➔</button>
        </div>
      `;
    } else if (currentStep === 4) {
      html += `
        <div class="text-center py-6 space-y-3">
          <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow"><i data-lucide="user-check" class="w-8 h-8"></i></div>
          <h4 class="font-bold text-base">Nhận Diện Vai Trò: Delivery Partner</h4>
          <button onclick="setRole('delivery')" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow">Vào Bảng Điều Khiển Giao Vận ➔</button>
        </div>
      `;
    }
  } else if (currentRole === 'delivery') {
    html += `
      <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border space-y-2">
        <h4 class="font-bold text-sm">Chế Độ Live Code: Delivery Partner</h4>
        <p class="text-xs text-slate-500">Chuyển sang chế độ "🎨 Ảnh Figma Hi-Fi" ở phía trên để xem và tương tác trực tiếp với ảnh xuất từ Figma.</p>
        <button onclick="setDisplayMode('figma')" class="w-full py-2.5 rounded-full bg-agri-600 text-white font-bold text-xs shadow">
          Chuyển Sang Chiếu Ảnh Figma Hi-Fi ➔
        </button>
      </div>
    `;
  } else if (currentRole === 'install') {
    const checkedCount = Object.values(installChecks).filter(Boolean).length;
    html += `
      <div class="space-y-2">
        <h4 class="font-bold text-sm">Installation Checklist</h4>
        <div onclick="toggleCheckItem('check1')" class="p-3 rounded-xl border text-xs cursor-pointer ${installChecks.check1 ? 'border-agri-500 bg-agri-50/20' : ''}">1. Dàn pin 15° Nam ${installChecks.check1 ? '✓' : ''}</div>
        <div onclick="toggleCheckItem('check2')" class="p-3 rounded-xl border text-xs cursor-pointer ${installChecks.check2 ? 'border-agri-500 bg-agri-50/20' : ''}">2. Giếng sâu 35m ${installChecks.check2 ? '✓' : ''}</div>
        <div onclick="toggleCheckItem('check3')" class="p-3 rounded-xl border text-xs cursor-pointer ${installChecks.check3 ? 'border-agri-500 bg-agri-50/20' : ''}">3. Tiếp địa &lt; 10 Ohm ${installChecks.check3 ? '✓' : ''}</div>
        <button onclick="alert('Đã nộp hồ sơ lắp đặt!')" class="w-full py-2.5 rounded-full bg-agri-600 text-white font-bold text-xs shadow">Nộp Hồ Sơ Sang QA</button>
      </div>
    `;
  } else if (currentRole === 'qa') {
    html += `
      <div class="p-4 rounded-xl border space-y-2 text-xs">
        <h4 class="font-bold text-sm">QA Inspection</h4>
        <div>Voc: 420V (Đạt)</div>
        <div>Imp: 11.2A (Đạt)</div>
        <div>Lưu lượng: 19.2 m³/h</div>
        <div class="grid grid-cols-2 gap-2 pt-2">
          <button onclick="alert('Đã phê duyệt QA!')" class="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">Phê Duyệt</button>
          <button onclick="alert('Đã từ chối QA!')" class="py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs">Từ Chối</button>
        </div>
      </div>
    `;
  } else if (currentRole === 'service') {
    html += `
      <div class="p-4 rounded-xl border space-y-2 text-xs">
        <h4 class="font-bold text-sm">Service Ticket: Lỗi E-04 Báo Cạn</h4>
        <p class="text-slate-500">Mực nước giếng tụt sâu dưới cảm biến.</p>
        <button onclick="alert('Đã hạ cảm biến và đóng phiếu!')" class="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs">Hạ Cảm Biến & Đóng Phiếu</button>
      </div>
    `;
  } else if (currentRole === 'farmer') {
    html += `
      <div class="p-4 rounded-2xl bg-gradient-to-tr ${pumpIsOn ? 'from-agri-600 to-solar-500' : 'from-slate-700 to-slate-800'} text-white space-y-2">
        <div class="text-xs uppercase">Trạng Thái Bơm: ${pumpIsOn ? 'ĐANG CHẠY' : 'ĐÃ DỪNG'}</div>
        <div class="text-3xl font-extrabold font-mono">${pumpIsOn ? '18.5' : '0.0'} m³/h</div>
      </div>
      <button onclick="togglePumpPower()" class="w-full py-3 rounded-full ${pumpIsOn ? 'bg-red-600' : 'bg-agri-600'} text-white font-bold text-xs shadow">
        ${pumpIsOn ? 'Tắt Bơm Khẩn Cấp' : 'Khởi Động Lại Máy Bơm'}
      </button>
    `;
  }

  container.innerHTML = html;
  lucide.createIcons();
}

// Initial render
setDisplayMode('figma');
setRole('delivery');
lucide.createIcons();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });

    // Offline mode toggle
    const toggleOfflineBtn = document.getElementById('toggleOfflineBtn');
    const offlineBanner = document.getElementById('offlineBanner');
    const offlineStateLabel = document.getElementById('offlineStateLabel');
    let isOffline = false;

    toggleOfflineBtn.addEventListener('click', () => {
      isOffline = !isOffline;
      if (isOffline) {
        offlineBanner.classList.remove('hidden');
        offlineStateLabel.textContent = 'Offline';
        offlineStateLabel.className = 'text-red-600 font-bold';
      } else {
        offlineBanner.classList.add('hidden');
        offlineStateLabel.textContent = 'Online';
        offlineStateLabel.className = 'text-emerald-600 font-bold';
      }
    });

    // Code Switcher Tab Logic
    function switchTab(lang) {
      ['rn', 'flutter', 'html'].forEach(t => {
        document.getElementById('code-' + t).classList.add('hidden');
        document.getElementById('tab-' + t).className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition';
      });
      document.getElementById('code-' + lang).classList.remove('hidden');
      document.getElementById('tab-' + lang).className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-agri-600 text-white transition';
    }

    function copyCurrentCode() {
      let codeText = '';
      if (!document.getElementById('code-rn').classList.contains('hidden')) {
        codeText = document.getElementById('code-rn').innerText;
      } else if (!document.getElementById('code-flutter').classList.contains('hidden')) {
        codeText = document.getElementById('code-flutter').innerText;
      } else {
        codeText = document.getElementById('code-html').innerText;
      }
      navigator.clipboard.writeText(codeText).then(() => {
        const lbl = document.getElementById('copyLabel');
        lbl.textContent = 'Copied!';
        setTimeout(() => { lbl.textContent = 'Copy'; }, 2000);
      });
    }

    // ==========================================
    // INTERACTIVE PROTOTYPE STATE MACHINE
    // ==========================================
    let currentRole = 'delivery';
    let currentStep = 1;
    let currentScenario = 'happy'; // 'happy', 'error', 'offline'
    let otpEntered = '';
    let installChecks = { check1: true, check2: false, check3: false };
    let pumpIsOn = true;
    let qaDecision = null; // null, 'approved', 'rejected'

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
      ['delivery', 'install', 'qa', 'service', 'farmer'].forEach(r => {
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
      installChecks = { check1: false, check2: false, check3: false };
      pumpIsOn = true;
      renderPrototype();
    }

    // Prototype Screens Renderer
    function renderPrototype() {
      const container = document.getElementById('phone-screen-content');
      let html = '';

      // Scenario notice if offline
      if (currentScenario === 'offline') {
        html += `
          <div class="p-2.5 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 text-[11px] flex items-center justify-between">
            <span class="flex items-center gap-1.5"><i data-lucide="wifi-off" class="w-3.5 h-3.5 text-red-600"></i> Mất sóng 4G (Offline Mode)</span>
            <span class="px-1.5 py-0.5 rounded bg-red-200 dark:bg-red-900 text-[10px] font-bold">☁️ 3 Pending</span>
          </div>
        `;
      }

      // =========================
      // ROLE 1: DELIVERY PARTNER
      // =========================
      if (currentRole === 'delivery') {
        if (currentStep === 1) {
          html += `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 class="font-bold text-sm">Giao Hàng Hôm Nay</h3>
                <p class="text-[11px] text-slate-500">2 chuyến cần giao thực địa</p>
              </div>
              <span class="p-1.5 rounded-full bg-agri-100 dark:bg-agri-950 text-agri-700 dark:text-agri-300"><i data-lucide="truck" class="w-4 h-4"></i></span>
            </div>

            <!-- Task Card 1 (Clickable) -->
            <div onclick="goToStep(2)" class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-agri-500 shadow-sm cursor-pointer hover:border-agri-600 transition space-y-2 relative">
              <span class="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-agri-600 text-white text-[10px] font-bold">ĐANG GIAO</span>
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-mono text-slate-500">Đơn #SP-8942</span>
                <span class="text-xs font-bold text-agri-600">Cách 2.4 km</span>
              </div>
              <h4 class="font-bold text-xs text-slate-900 dark:text-slate-100">Hộ: Bác Ba Phi</h4>
              <p class="text-[11px] text-slate-500">Ấp 3, Xã Tân Lập, Huyện Tháp Mười, Đồng Tháp</p>
              <div class="pt-1 flex items-center justify-between text-xs text-agri-600 font-semibold">
                <span>Chạm để mở chi tiết & dẫn đường ➔</span>
              </div>
            </div>

            <!-- Task Card 2 -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-60 space-y-1">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[11px] font-mono text-slate-500">Đơn #SP-8943</span>
                <span class="text-xs text-slate-400">Cách 8.1 km</span>
              </div>
              <h4 class="font-bold text-xs">Hộ: Bác Năm Nhã</h4>
              <p class="text-[11px] text-slate-500">Ấp Mỹ Hòa, Huyện Cao Lãnh</p>
            </div>
          `;
        } else if (currentStep === 2) {
          html += `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <button onclick="goToStep(1)" class="text-xs text-agri-600 font-bold flex items-center gap-1">← Quay lại</button>
              <span class="text-[10px] font-bold text-slate-400">Bước 2/6: Chi Tiết</span>
            </div>

            <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Thông Tin Thiết Bị</span>
              <div class="flex justify-between"><span class="text-slate-500">Loại máy bơm:</span><span class="font-bold">Bơm Chìm Hỏa Tiễn 3HP</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Số lượng tấm pin:</span><span class="font-bold">8 Tấm 540W Mono</span></div>
              <div class="flex justify-between"><span class="text-slate-500">Biến tần (Inverter):</span><span class="font-bold">Solar MPPT 2.2kW</span></div>
            </div>

            <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span class="text-[10px] font-bold text-slate-400 uppercase">Chủ Hộ Nông Dân</span>
              <div class="font-bold text-sm">Bác Ba Phi</div>
              <div class="text-slate-500">SĐT: 0918.234.567</div>
              <button class="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5">
                <i data-lucide="phone" class="w-3.5 h-3.5 text-agri-600"></i> Gọi Điện Xác Nhận Trước
              </button>
            </div>

            <button onclick="goToStep(3)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2">
              <i data-lucide="navigation" class="w-4 h-4"></i> Bắt Đầu Dẫn Đường GPS ➔
            </button>
          `;
        } else if (currentStep === 3) {
          html += `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <button onclick="goToStep(2)" class="text-xs text-agri-600 font-bold">← Quay lại</button>
              <span class="text-[10px] font-bold text-slate-400">Bước 3/6: Bản Đồ</span>
            </div>

            <div class="h-44 rounded-xl bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center border border-slate-300 dark:border-slate-700">
              <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#1B873F_1px,transparent_1px)] [background-size:12px_12px]"></div>
              <div class="text-center z-10 space-y-1">
                <span class="inline-block p-2 rounded-full bg-red-500 text-white shadow-lg animate-bounce"><i data-lucide="map-pin" class="w-5 h-5"></i></span>
                <div class="text-xs font-bold">Tọa độ: 10.6542° N, 105.7891° E</div>
                <div class="text-[10px] text-emerald-600 font-semibold">Đã đến vị trí thực địa!</div>
              </div>
            </div>

            ${currentScenario === 'error' ? `
              <div class="p-2.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs flex items-center gap-2">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600"></i>
                <span>Tọa độ thực tế lệch 120m so với giếng đã đăng ký!</span>
              </div>
            ` : ''}

            <button onclick="goToStep(4)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow-md">
              Đã Đến Nơi ➔ Nhập OTP Khách Hàng
            </button>
          `;
        } else if (currentStep === 4) {
          const isError = currentScenario === 'error' && otpEntered.length === 4;
          html += `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <button onclick="goToStep(3)" class="text-xs text-agri-600 font-bold">← Quay lại</button>
              <span class="text-[10px] font-bold text-slate-400">Bước 4/6: OTP</span>
            </div>

            <div class="text-center space-y-1">
              <h4 class="font-bold text-sm">Xác Thực Mã OTP Bàn Giao</h4>
              <p class="text-[11px] text-slate-500">Yêu cầu nông dân đọc mã 4 số được gửi qua SMS</p>
            </div>

            <!-- OTP Display Boxes -->
            <div class="flex justify-center gap-3 my-2">
              <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[0] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300 dark:border-slate-700'}">${otpEntered[0] || ''}</div>
              <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[1] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300 dark:border-slate-700'}">${otpEntered[1] || ''}</div>
              <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[2] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300 dark:border-slate-700'}">${otpEntered[2] || ''}</div>
              <div class="w-11 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${otpEntered[3] ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-slate-300 dark:border-slate-700'}">${otpEntered[3] || ''}</div>
            </div>

            ${isError ? `
              <div class="p-2 rounded bg-red-100 text-red-700 text-[11px] text-center font-bold">
                Mã OTP không chính xác (Thử lại: 8942)
              </div>
            ` : ''}

            <!-- Virtual Keypad -->
            <div class="grid grid-cols-3 gap-2 px-6">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `
                <button onclick="enterOtp('${n}')" class="h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold active:bg-agri-50">${n}</button>
              `).join('')}
              <button onclick="clearOtp()" class="h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-red-600">Xóa</button>
              <button onclick="enterOtp('0')" class="h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold">0</button>
              <button onclick="otpEntered = '8942'; renderPrototype();" class="h-10 rounded-lg bg-agri-100 dark:bg-agri-950 text-xs font-bold text-agri-700">Mẫu</button>
            </div>

            <button onclick="${otpEntered.length === 4 ? 'goToStep(5)' : 'alert(\'Vui lòng nhập đủ 4 số OTP (Gợi ý: 8942)\')'}" class="w-full py-2.5 rounded-full ${otpEntered.length === 4 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-400'} font-bold text-xs shadow-md transition">
              Xác Nhận OTP ➔
            </button>
          `;
        } else if (currentStep === 5) {
          html += `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <button onclick="goToStep(4)" class="text-xs text-agri-600 font-bold">← Quay lại</button>
              <span class="text-[10px] font-bold text-slate-400">Bước 5/6: Quét Mã QR</span>
            </div>

            <!-- Viewfinder Mockup -->
            <div class="h-44 rounded-xl bg-slate-950 text-white relative overflow-hidden flex flex-col items-center justify-center border-2 border-agri-500">
              <div class="w-28 h-28 border-2 border-dashed border-white/60 rounded-lg flex items-center justify-center relative">
                <div class="w-full h-0.5 bg-red-500 absolute animate-pulse"></div>
                <i data-lucide="qr-code" class="w-12 h-12 text-white/40"></i>
              </div>
              <span class="text-[10px] text-white/80 mt-2">Đang quét mã số sê-ri trên thùng máy...</span>
            </div>

            <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div class="text-[10px] text-slate-400">MÃ NHẬN DIỆN THÀNH CÔNG:</div>
              <div class="font-mono font-bold text-agri-600">SERIAL: SP-8942-SOLAR-3HP</div>
            </div>

            <button onclick="goToStep(6)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow-md">
              Chụp Ảnh Bàn Giao & Ký Nhận ➔
            </button>
          `;
        } else if (currentStep === 6) {
          html += `
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <button onclick="goToStep(5)" class="text-xs text-agri-600 font-bold">← Quay lại</button>
              <span class="text-[10px] font-bold text-slate-400">Bước 6/6: Ký Nhận</span>
            </div>

            <!-- Signature Pad Mockup -->
            <div class="space-y-1">
              <span class="text-xs font-bold">Chữ Ký Xác Nhận Của Hộ Nông Dân</span>
              <div class="h-28 rounded-xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center relative">
                <span class="font-mono text-xl text-slate-700 dark:text-slate-200 italic font-bold">Ba Phi (Đã ký)</span>
                <span class="absolute bottom-2 right-3 text-[10px] text-slate-400">Dấu thời gian: 09:41</span>
              </div>
            </div>

            <button onclick="goToStep(7)" class="w-full py-3 rounded-full bg-agri-600 text-white font-bold text-xs shadow-md">
              Hoàn Tất Chuyến Giao Hàng 🎉
            </button>
          `;
        } else if (currentStep === 7) {
          html += `
            <div class="text-center py-6 space-y-3">
              <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                <i data-lucide="check-circle-2" class="w-9 h-9"></i>
              </div>
              <h3 class="font-bold text-base text-slate-900 dark:text-white">Giao Hàng Thành Công!</h3>
              <p class="text-xs text-slate-500 max-w-xs mx-auto">Biên bản nghiệm thu bàn giao #SP-8942 đã được khóa mã và ${currentScenario === 'offline' ? 'lưu cục bộ trên máy' : 'đồng bộ lên máy chủ trung tâm'}.</p>
              
              <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left text-xs space-y-1 font-mono">
                <div>Mã biên bản: POD-8942-VN</div>
                <div>Chủ hộ: Bác Ba Phi</div>
                <div>Trạng thái: DELIVERED</div>
              </div>

              <button onclick="resetPrototype()" class="w-full py-2.5 rounded-full bg-agri-600 text-white font-bold text-xs shadow transition">
                Về Trang Danh Sách Giao Vận
              </button>
            </div>
          `;
        }
      }

      // =========================
      // ROLE 2: INSTALLATION TEAM
      // =========================
      else if (currentRole === 'install') {
        const checkedCount = Object.values(installChecks).filter(Boolean).length;
        html += `
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 class="font-bold text-sm">Installation Team</h3>
              <p class="text-[11px] text-slate-500">Checklist thi công trạm #SP-8942</p>
            </div>
            <span class="p-1.5 rounded-full bg-solar-100 dark:bg-solar-950 text-solar-700 dark:text-solar-300"><i data-lucide="wrench" class="w-4 h-4"></i></span>
          </div>

          <!-- Progress -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span>Tiến độ kiểm tra kỹ thuật</span>
              <span class="text-agri-600">${checkedCount}/3 mục đạt</span>
            </div>
            <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div class="h-full bg-agri-500 transition-all duration-300" style="width: ${(checkedCount/3)*100}%"></div>
            </div>
          </div>

          <!-- Interactive Checkboxes -->
          <div class="space-y-2">
            <div onclick="toggleCheckItem('check1')" class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer ${installChecks.check1 ? 'border-agri-500 bg-agri-50/20' : 'border-slate-200 dark:border-slate-800'} text-xs">
              <div class="w-4 h-4 rounded border flex items-center justify-center ${installChecks.check1 ? 'bg-agri-600 border-agri-600 text-white' : 'border-slate-400'}">
                ${installChecks.check1 ? '✓' : ''}
              </div>
              <span>Khung dàn pin quay hướng Nam, góc nghiêng 15°</span>
            </div>

            <div onclick="toggleCheckItem('check2')" class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer ${installChecks.check2 ? 'border-agri-500 bg-agri-50/20' : 'border-slate-200 dark:border-slate-800'} text-xs">
              <div class="w-4 h-4 rounded border flex items-center justify-center ${installChecks.check2 ? 'bg-agri-600 border-agri-600 text-white' : 'border-slate-400'}">
                ${installChecks.check2 ? '✓' : ''}
              </div>
              <span>Độ sâu giếng khoan đạt chuẩn 35m (Có lưới lọc cát)</span>
            </div>

            <div onclick="toggleCheckItem('check3')" class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border cursor-pointer ${installChecks.check3 ? 'border-agri-500 bg-agri-50/20' : 'border-slate-200 dark:border-slate-800'} text-xs">
              <div class="w-4 h-4 rounded border flex items-center justify-center ${installChecks.check3 ? 'bg-agri-600 border-agri-600 text-white' : 'border-slate-400'}">
                ${installChecks.check3 ? '✓' : ''}
              </div>
              <span>Tiếp địa an toàn & chống sét đạt chuẩn < 10 Ohm</span>
            </div>
          </div>

          <button onclick="${checkedCount === 3 ? 'alert(\'Biên bản lắp đặt đã hoàn tất và chuyển sang hàng chờ QA!\')' : 'alert(\'Vui lòng tích chọn đủ 3 hạng mục kiểm tra kỹ thuật!\')'}" class="w-full py-2.5 rounded-full ${checkedCount === 3 ? 'bg-agri-600 text-white' : 'bg-slate-200 text-slate-400'} font-bold text-xs shadow transition">
            Nộp Hồ Sơ Lắp Đặt Sang QA ➔
          </button>
        `;
      }

      // =========================
      // ROLE 3: QA INSPECTOR
      // =========================
      else if (currentRole === 'qa') {
        html += `
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 class="font-bold text-sm">QA Inspector</h3>
              <p class="text-[11px] text-slate-500">Đo kiểm thông số trạm #SP-8942</p>
            </div>
            <span class="p-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"><i data-lucide="clipboard-check" class="w-4 h-4"></i></span>
          </div>

          <!-- Measurement Card -->
          <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Thông Số Đo Thực Tế</span>
            <div class="flex justify-between"><span class="text-slate-500">Điện áp hở mạch (Voc):</span><span class="font-bold text-emerald-600">420V (Đạt)</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Dòng tải đỉnh (Imp):</span><span class="font-bold text-emerald-600">11.2A (Đạt)</span></div>
            <div class="flex justify-between"><span class="text-slate-500">Lưu lượng nước đo được:</span><span class="font-bold text-agri-600">19.2 m³/h</span></div>
          </div>

          ${qaDecision === 'approved' ? `
            <div class="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-1 animate-pulse">
              <span class="text-xs font-bold text-emerald-700 tracking-wider">★ ĐÃ PHÊ DUYỆT NGHIỆM THU (QA APPROVED) ★</span>
              <p class="text-[11px] text-emerald-600">Trạm bơm đã được cấp phép vận hành chính thức.</p>
            </div>
          ` : qaDecision === 'rejected' ? `
            <div class="p-4 rounded-xl bg-red-50 border-2 border-red-500 text-center space-y-1">
              <span class="text-xs font-bold text-red-700 tracking-wider">✖ TỪ CHỐI NGHIỆM THU (QA REJECTED)</span>
              <p class="text-[11px] text-red-600">Yêu cầu đội lắp đặt căn chỉnh lại góc nghiêng dàn pin.</p>
            </div>
          ` : `
            <div class="grid grid-cols-2 gap-2 pt-2">
              <button onclick="makeQaDecision('approved')" class="py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-700 active:scale-95 transition">
                ✓ Phê Duyệt QA
              </button>
              <button onclick="makeQaDecision('rejected')" class="py-3 rounded-xl bg-red-600 text-white font-bold text-xs shadow hover:bg-red-700 active:scale-95 transition">
                ✕ Từ Chối
              </button>
            </div>
          `}
        `;
      }

      // =========================
      // ROLE 4: SERVICE TECH
      // =========================
      else if (currentRole === 'service') {
        html += `
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 class="font-bold text-sm">Service Technician</h3>
              <p class="text-[11px] text-slate-500">Phiếu bảo trì #TK-4091</p>
            </div>
            <span class="p-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"><i data-lucide="shield-alert" class="w-4 h-4"></i></span>
          </div>

          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs space-y-1">
            <span class="font-bold flex items-center gap-1"><i data-lucide="alert-circle" class="w-3.5 h-3.5 text-amber-600"></i> Mã lỗi E-04: DRY_RUN_PROTECTION</span>
            <p class="text-[11px] opacity-90">Bơm tự ngắt an toàn do mực nước ngầm tụt sâu dưới cảm biến giếng.</p>
          </div>

          <button onclick="alert('Đã hạ cảm biến thêm 3m và kích hoạt lại bơm thành công!')" class="w-full py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow">
            Hạ Thêm Cảm Biến & Đóng Phiếu
          </button>
        `;
      }

      // =========================
      // ROLE 5: FARMER (CONSUMER)
      // =========================
      else if (currentRole === 'farmer') {
        html += `
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 class="font-bold text-sm">Bác Ba Phi (Chủ Hộ)</h3>
              <p class="text-[11px] text-slate-500">Trạm bơm #04 — Vườn Xoài Cát Chu</p>
            </div>
            <span class="p-1.5 rounded-full bg-agri-100 text-agri-700"><i data-lucide="user" class="w-4 h-4"></i></span>
          </div>

          <!-- Dynamic Pump Power Card -->
          <div class="p-4 rounded-2xl bg-gradient-to-tr ${pumpIsOn ? 'from-agri-600 to-solar-500' : 'from-slate-700 to-slate-800'} text-white space-y-2 shadow-lg transition-colors duration-300">
            <div class="flex justify-between items-center text-xs opacity-90">
              <span class="uppercase tracking-wider">Trạng Thái Bơm</span>
              <span class="px-2 py-0.5 rounded-full ${pumpIsOn ? 'bg-emerald-400/30' : 'bg-red-400/30'} font-bold text-[10px]">
                ${pumpIsOn ? 'ĐANG CHẠY' : 'ĐÃ DỪNG'}
              </span>
            </div>
            <div class="text-3xl font-extrabold font-mono">${pumpIsOn ? '18.5' : '0.0'} <span class="text-sm font-normal">m³/h</span></div>
            <div class="text-xs flex items-center gap-1 opacity-90">
              <i data-lucide="sun" class="w-3.5 h-3.5"></i>
              <span>${pumpIsOn ? 'Công suất: 4.8 kW • Tiết kiệm 45.000đ hôm nay' : 'Máy bơm ở trạng thái nghỉ an toàn'}</span>
            </div>
          </div>

          <!-- Interactive Pump Toggle Button -->
          <button onclick="togglePumpPower()" class="w-full py-3 rounded-full ${pumpIsOn ? 'bg-red-600 hover:bg-red-700' : 'bg-agri-600 hover:bg-agri-700'} text-white font-bold text-xs shadow-md transition active:scale-95">
            ${pumpIsOn ? 'Ngắt Bơm Khẩn Cấp' : 'Khởi Động Lại Máy Bơm'}
          </button>
        `;
      }

      container.innerHTML = html;
      lucide.createIcons();
    }

    // Initial render
    setRole('delivery');
    lucide.createIcons();

// src/pages/LandingPage.tsx
import React from 'react';
import { MODULES_DATA } from '../data/modulesData';
import { LIFECYCLE_STEPS, SYSTEM_STATES } from '../data/lifecycleData';
import { 
  ArrowRight, 
  Smartphone, 
  Database, 
  Server, 
  LayoutDashboard, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface LandingPageProps {
  onSelectModule: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectModule }) => {
  return (
    <div className="space-y-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              WikiAlisa TypeScript Architecture v2.4
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Mobile First (390 × 844px) ⇄ Central Web Admin
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Figma: eq0EA9dRSWfS2ivuFohJdg
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none mb-6 max-w-4xl mx-auto">
            Nền Tảng Quản Trị Vòng Đời <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400">
              Máy Bơm Năng Lượng Mặt Trời
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-10 max-w-3xl mx-auto">
            Hệ sinh thái đồng bộ hai chiều thời gian thực giữa <strong>5 nhóm vai trò thực địa</strong> (Đối tác Giao hàng, Lắp đặt, QA, Kỹ thuật viên, Nông dân) và <strong>Tháp chỉ huy Enterprise Admin</strong>. 
            Xây dựng trên nền tảng React, TypeScript, Tailwind CSS và đóng gói tĩnh bằng <code>pnpm build</code>.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a 
              href="#modules-grid" 
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <span>Khám Phá 11 Phân Hệ Chi Tiết</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#architecture" 
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-500" />
              <span>Kiến Trúc Dual-Surface Mobile ⇄ Admin</span>
            </a>
          </div>

          {/* 5 KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">248</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">Trạm Bơm Vận Hành</div>
              <div className="text-[10px] text-slate-500">Giám sát IoT thời gian thực</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">11</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">Phân Hệ Chuyên Sâu</div>
              <div className="text-[10px] text-slate-500">Dedicated Demo TSX</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">49</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">Màn Hình Figma Hi-Fi</div>
              <div className="text-[10px] text-slate-500">Chuẩn khung 390 × 844px</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">5 + 1</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">Nhóm Vai Trò Hệ Thống</div>
              <div className="text-[10px] text-slate-500">5 thực địa + 1 Admin</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 shadow-sm col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">100%</div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">Không Giấy Tờ</div>
              <div className="text-[10px] text-slate-500">Chữ ký số & POD tức thì</div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL-SURFACE ARCHITECTURE SECTION */}
      <section id="architecture" className="py-12 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Kiến Trúc Tích Hợp Đa Bề Mặt
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              Dòng Chảy Dữ Liệu Đồng Bộ Mobile ⇄ Admin
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Mỗi thao tác quét mã, chụp ảnh hay ký biên bản trên điện thoại 390px ngoài đồng lúa đều được bảo vệ bởi bộ đệm ngoại tuyến SQLite và đồng bộ về Tháp chỉ huy qua kênh bảo mật SSL/MQTT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Thực Địa 390px Mobile</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Thiết bị di động của 5 nhóm vai trò thực địa. Quét mã QR Serial, xác minh Geofence GPS bán kính &lt;50m, chụp ảnh nghiệm thu và ký xác nhận POD.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Bộ Đệm SQLite & Edge</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Lưu trữ mã hóa cục bộ khi mất sóng 4G/3G. Tự động chuyển đổi sang cơ chế Queue và tái kết nối đồng bộ nền không làm gián đoạn trải nghiệm người dùng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">IoT Gateway & Broker</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tiếp nhận dữ liệu viễn thông từ biến tần năng lượng mặt trời (VFD) và lưu lượng kế máy bơm qua kênh MQTT / REST API với độ trễ dưới 200ms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 hover:border-amber-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Tháp Chỉ Huy Admin</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bản đồ GIS 248 trạm trực quan, bảng phân phối tác vụ thời gian thực, duyệt hồ sơ trợ cấp giải ngân và điều phối bảo hành kỹ thuật 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 MODULES PORTAL GRID */}
      <section id="modules-grid" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3 border border-emerald-500/20">
                Danh Mục Toàn Diện
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                11 Phân Hệ Nền Tảng WikiAlisa
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
                Mỗi phân hệ sở hữu một không gian trình diễn độc lập, tích hợp <strong>Roadmap Mobile → Admin</strong> và mô phỏng trực tiếp tương tác 2 chiều.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500">
              Tiêu chuẩn: React 19 + TypeScript + Vite
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES_DATA.map(m => (
              <div 
                key={m.id}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                      {m.id}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                    {m.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-3">
                    {m.titleEn}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {m.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-5 text-[11px]">
                    {m.kpis.slice(0, 2).map((k, i) => (
                      <div key={i}>
                        <div className="text-slate-500 dark:text-slate-400">{k.label}</div>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{k.val}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Vai Trò Tác Nghiệp:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {m.roles.map((r, ri) => (
                        <span key={ri} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {m.figmaScreens.length} Màn hình Figma
                  </span>
                  <button
                    onClick={() => onSelectModule(m.slug)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 transition-all"
                  >
                    <span>Vào Phân Hệ & Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20-STEP END-TO-END LIFECYCLE ROADMAP */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Giai Đoạn 02 — Lập Kế Hoạch Trải Nghiệm
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              Vòng Đời Hoạt Động Xuyên Suốt 20 Bước
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Từ khâu xuất kho, bàn giao, lắp đặt, nghiệm thu thanh toán cho đến vận hành nông nghiệp và dịch vụ bảo hành 24/7.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {LIFECYCLE_STEPS.map(s => (
              <button
                key={s.step}
                onClick={() => onSelectModule(s.moduleSlug)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-md transition-all group text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{s.step}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-mono">
                    {s.role}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                  {s.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7 CORE STATES OVERVIEW */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Tính Linh Hoạt Của Giao Diện
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1 mb-8">
            7 Trạng Thái Cốt Lõi Hệ Thống
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {SYSTEM_STATES.map(st => (
              <div key={st.code} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
                <div className="text-xs font-bold text-slate-800 dark:text-white">{st.name}</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{st.code}</div>
                <div className="text-[10px] text-slate-400 mt-1">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

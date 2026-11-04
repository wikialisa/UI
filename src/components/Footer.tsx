// src/components/Footer.tsx
import React from 'react';
import { MODULES_DATA } from '../data/modulesData';
import { ChevronLeft, ChevronRight, Home, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentModuleId: string | null;
  onSelectModule: (slug: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentModuleId, onSelectModule }) => {
  const currentIndex = currentModuleId 
    ? MODULES_DATA.findIndex(m => m.id === currentModuleId) 
    : -1;
  const prevModule = currentIndex > 0 ? MODULES_DATA[currentIndex - 1] : null;
  const nextModule = currentIndex >= 0 && currentIndex < MODULES_DATA.length - 1 ? MODULES_DATA[currentIndex + 1] : null;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Previous & Next Module Switcher (Only visible in module pages) */}
        {currentModuleId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12 border-b border-slate-800 mb-12">
            <div>
              {prevModule ? (
                <button
                  onClick={() => onSelectModule(prevModule.slug)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:bg-slate-600 transition-colors shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phân Hệ Trước</div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {prevModule.id}. {prevModule.title}
                    </div>
                  </div>
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-800/20 border border-slate-800/40 text-slate-500 text-xs flex items-center gap-2">
                  <span>Đây là phân hệ đầu tiên (01 - Authentication)</span>
                </div>
              )}
            </div>

            <div>
              {nextModule ? (
                <button
                  onClick={() => onSelectModule(nextModule.slug)}
                  className="w-full flex items-center justify-end gap-3 p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition-all group text-right"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phân Hệ Tiếp Theo</div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {nextModule.id}. {nextModule.title}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:bg-slate-600 transition-colors shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => onSelectModule(null)}
                  className="w-full flex items-center justify-end gap-3 p-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition-all group text-right"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hoàn Tất 11 Phân Hệ</div>
                    <div className="text-sm font-semibold text-emerald-400">Về Trang Chủ Landing Portal</div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Brand Information & Site Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                WA
              </div>
              <span className="font-bold text-white text-lg tracking-tight">WikiAlisa Smart Solar Platform</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Nền tảng chuyển đổi số toàn diện cho hệ thống máy bơm nước năng lượng mặt trời phục vụ nông nghiệp thông minh. 
              Kết nối đồng bộ thời gian thực từ ứng dụng di động 390px ngoài hiện trường đến tháp chỉ huy Enterprise Admin.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-mono">
                Figma: eq0EA9dRSWfS2ivuFohJdg
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-blue-400 font-mono">
                49 Screens
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">11 Phân Hệ Nền Tảng</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {MODULES_DATA.slice(0, 6).map(m => (
                <li key={m.id}>
                  <button
                    onClick={() => onSelectModule(m.slug)}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {m.id}. {m.titleEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Mở Rộng & Vận Hành</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {MODULES_DATA.slice(6).map(m => (
                <li key={m.id}>
                  <button
                    onClick={() => onSelectModule(m.slug)}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {m.id}. {m.titleEn}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onSelectModule(null)}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  → Trang Chủ Tổng Quan
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 WikiAlisa (
            <a href="https://github.com/wikialisa/UI" target="_blank" rel="noreferrer" className="hover:text-slate-300 underline">
              wikialisa/UI
            </a>
            ). Tiêu chuẩn thiết kế 390 × 844px Mobile First.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              TypeScript + TSX + Vite Built
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

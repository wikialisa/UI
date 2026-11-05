// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import { usePrototype } from '../context/PrototypeContext';
import { Sun, Moon, ChevronDown, Home, ExternalLink, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  currentModuleId: string | null;
  onSelectModule: (slug: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentModuleId, onSelectModule }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { toggleConfigDrawer } = usePrototype();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const activeModule = MODULES_DATA.find(m => m.id === currentModuleId);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Subtitle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onSelectModule(null)}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              WA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">WikiAlisa</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Solar Hub v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none">
                Smart Solar & Pump Lifecycle Platform
              </p>
            </div>
          </button>

          {/* Quick Anchor Links */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => onSelectModule(null)} 
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              11 Phân Hệ
            </button>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <a
              href="#brand-toolkit"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors whitespace-nowrap"
            >
              🎨 Bộ Công Cụ
            </a>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Dual-Surface (390px ⇄ Admin)
            </span>
          </div>
        </div>

        {/* Right Actions: 11-Module Dropdown + Theme Switcher */}
        <div className="flex items-center gap-2.5">
          
          {/* Module Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                Phân hệ: <strong>{activeModule ? `Module ${activeModule.id}` : 'Chọn Phân Hệ'}</strong>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 z-50 p-2 divide-y divide-slate-100 dark:divide-slate-800"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    11 Phân Hệ Nền Tảng
                  </div>
                  {MODULES_DATA.map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectModule(m.slug);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors ${
                        m.id === currentModuleId
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                        m.id === currentModuleId
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        ${m.id}
                      </span>
                      <span className="truncate">{m.title}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-1.5">
                  <button
                    onClick={() => {
                      onSelectModule(null);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    Về Trang Chủ Landing Portal
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Landing Portal Home Button */}
          {currentModuleId && (
            <button
              onClick={() => onSelectModule(null)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang Chủ</span>
            </button>
          )}

          {/* Configuration Drawer Trigger */}
          <button
            onClick={toggleConfigDrawer}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg shadow-sm transition-all"
            title="Mở menu mở rộng cài đặt cấu hình & giao tiếp hai chiều"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Cài Đặt Cấu Hình</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Chuyển chế độ Sáng / Tối"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/wikialisa/UI"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="GitHub Repository"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

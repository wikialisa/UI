// src/ui/compositions/RoleTabBar/RoleTabBar.tsx
import React from 'react';
import { Home, CheckSquare, MapPin, Bell, User } from 'lucide-react';

export interface RoleTabBarProps {
  activeTab: 'home' | 'tasks' | 'map' | 'alerts' | 'profile';
  onTabChange: (tab: 'home' | 'tasks' | 'map' | 'alerts' | 'profile') => void;
  badgeCount?: number;
}

export const RoleTabBar: React.FC<RoleTabBarProps> = ({
  activeTab,
  onTabChange,
  badgeCount = 0
}) => {
  const tabs: Array<{ id: 'home' | 'tasks' | 'map' | 'alerts' | 'profile'; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }> = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'tasks', label: 'Tác vụ', icon: CheckSquare },
    { id: 'map', label: 'Bản đồ', icon: MapPin },
    { id: 'alerts', label: 'Cảnh báo', icon: Bell, badge: badgeCount },
    { id: 'profile', label: 'Hồ sơ', icon: User }
  ];

  return (
    <div className="h-14 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 select-none">
      {tabs.map(tab => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center relative transition-colors ${
              isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <IconComponent className="w-4 h-4" />
              {tab.badge && tab.badge > 0 ? (
                <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[8px] font-bold rounded-full bg-rose-500 text-white">
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[9px] font-bold mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

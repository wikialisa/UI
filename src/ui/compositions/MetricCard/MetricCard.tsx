// src/ui/compositions/MetricCard/MetricCard.tsx
import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  color = 'emerald'
}) => {
  const colorStyles = {
    emerald: 'text-emerald-600 dark:text-emerald-400',
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    amber: 'text-amber-600 dark:text-amber-400',
    rose: 'text-rose-600 dark:text-rose-400'
  }[color];

  return (
    <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/80 shadow-sm text-center">
      <div className={`text-2xl sm:text-3xl font-black font-mono ${colorStyles}`}>
        {value}
      </div>
      <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1">
        {label}
      </div>
      {subtext && (
        <div className="text-[10px] text-slate-500 mt-0.5">
          {subtext}
        </div>
      )}
    </div>
  );
};

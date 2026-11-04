// src/ui/primitives/Input/Input.tsx
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="w-full text-left space-y-1">
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        className={`w-full px-3 py-2 text-xs rounded-xl border transition-all outline-none font-sans ${
          error
            ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
        } disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800 ${className}`}
        {...props}
      />
      {error ? (
        <div className="text-[10px] font-medium text-rose-500">{error}</div>
      ) : hint ? (
        <div className="text-[10px] text-slate-400">{hint}</div>
      ) : null}
    </div>
  );
};

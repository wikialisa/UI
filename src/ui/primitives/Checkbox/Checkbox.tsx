// src/ui/primitives/Checkbox/Checkbox.tsx
import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <label htmlFor={inputId} className={`inline-flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700 dark:text-slate-300 ${className}`}>
      <input
        type="checkbox"
        id={inputId}
        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all cursor-pointer"
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

// src/ui/primitives/Card/Card.tsx
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7'
  }[padding];

  const variantStyles = {
    default: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm',
    subtle: 'bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800',
    bordered: 'bg-transparent border-2 border-slate-200 dark:border-slate-700'
  }[variant];

  return (
    <div
      className={`rounded-2xl transition-all ${paddingStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

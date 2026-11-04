// src/ui/layout/Grid.tsx
import React from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
}

export const Grid: React.FC<GridProps> = ({
  cols = 3,
  gap = 'md',
  children,
  className = '',
  ...props
}) => {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12'
  }[cols];

  const gapStyles = {
    sm: 'gap-2',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  }[gap];

  return (
    <div className={`grid ${colStyles} ${gapStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

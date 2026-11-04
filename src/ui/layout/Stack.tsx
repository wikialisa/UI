// src/ui/layout/Stack.tsx
import React from 'react';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'between' | 'end';
}

export const Stack: React.FC<StackProps> = ({
  direction = 'col',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  children,
  className = '',
  ...props
}) => {
  const dirStyle = direction === 'row' ? 'flex-row' : 'flex-col';
  const gapStyle = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }[gap];

  const alignStyle = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }[align];

  const justifyStyle = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between',
    end: 'justify-end'
  }[justify];

  return (
    <div className={`flex ${dirStyle} ${gapStyle} ${alignStyle} ${justifyStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Generated React SVG Icon Component for Figma SDS
import React from 'react';

export interface IconCheckProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const IconCheck: React.FC<IconCheckProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

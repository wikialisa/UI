// Generated React SVG Icon Component for Figma SDS
import React from 'react';

export interface IconZapProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const IconZap: React.FC<IconZapProps> = ({ size = 20, className = '', ...props }) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

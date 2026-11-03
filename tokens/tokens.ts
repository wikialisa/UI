/**
 * Agriculture Solar Pump Design System
 * React Native & TypeScript Tokens
 */

export const colors = {
  brand: {
    solar: {
      50: '#FFF9E6',
      100: '#FFF1B8',
      500: '#E59800', // Primary Solar Gold
      600: '#C68200',
    },
    agri: {
      50: '#EBF7EE',
      100: '#C8EBD0',
      500: '#1B873F', // Primary Agri Green
      600: '#146830',
      700: '#0F4E24',
    },
    sky: {
      50: '#F0F9FF',
      500: '#0284C7', // Pumping Blue
    },
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  semantic: {
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    info: '#2563EB',
  },
  surface: {
    page: '#F8FAFC',
    card: '#FFFFFF',
    elevated: '#FFFFFF',
    offline: '#FEF2F2',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#94A3B8',
    inverse: '#FFFFFF',
  },
  border: {
    subtle: '#E2E8F0',
    focus: '#1B873F',
  },
} as const;

export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  96: 96,
  128: 128,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const typography = {
  fontFamily: 'Inter',
  displayXL: { fontSize: 48, lineHeight: 56, fontWeight: '700' as const },
  displayL: { fontSize: 40, lineHeight: 48, fontWeight: '700' as const },
  heading1: { fontSize: 32, lineHeight: 38, fontWeight: '600' as const },
  heading2: { fontSize: 28, lineHeight: 34, fontWeight: '600' as const },
  heading3: { fontSize: 24, lineHeight: 30, fontWeight: '600' as const },
  heading4: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const },
  bodyL: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyM: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  bodyS: { fontSize: 13, lineHeight: 18, fontWeight: '400' as const },
  button: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '700' as const },
} as const;

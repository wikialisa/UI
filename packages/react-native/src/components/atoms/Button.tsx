import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, radius, typography } from '../../../../tokens/tokens';

export type ButtonVariant = 'primary' | 'solar' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? colors.brand.agri[500] : '#FFFFFF'} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.textBase, styles[`text_${variant}`], styles[`text_${size}`]]}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing[8],
    minHeight: 48, // WCAG Touch Target 48pt
  },
  primary: { backgroundColor: colors.brand.agri[500] },
  solar: { backgroundColor: colors.brand.solar[500] },
  secondary: { backgroundColor: colors.neutral[100], borderWidth: 1, borderColor: colors.neutral[300] },
  danger: { backgroundColor: colors.semantic.danger },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  sm: { paddingHorizontal: spacing[12], minHeight: 36 },
  md: { paddingHorizontal: spacing[20], minHeight: 48 },
  lg: { paddingHorizontal: spacing[24], minHeight: 56 },
  textBase: { ...typography.button },
  text_primary: { color: '#FFFFFF' },
  text_solar: { color: '#FFFFFF' },
  text_secondary: { color: colors.text.primary },
  text_danger: { color: '#FFFFFF' },
  text_ghost: { color: colors.brand.agri[500] },
  text_sm: { fontSize: 13 },
  text_md: { fontSize: 15 },
  text_lg: { fontSize: 16 },
});

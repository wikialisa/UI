import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

export interface ToastBannerProps {
  variant: ToastVariant;
  message: string;
}

export const ToastBanner: React.FC<ToastBannerProps> = ({ variant, message }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          container: styles.successContainer,
          text: styles.successText,
          icon: '✓',
        };
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
          icon: '⚠',
        };
      case 'error':
        return {
          container: styles.errorContainer,
          text: styles.errorText,
          icon: '✕',
        };
      case 'info':
      default:
        return {
          container: styles.infoContainer,
          text: styles.infoText,
          icon: 'ℹ',
        };
    }
  };

  const v = getVariantStyles();

  return (
    <View style={[styles.container, v.container]}>
      <Text style={[styles.icon, v.text]}>{v.icon}</Text>
      <Text style={[styles.message, v.text]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 4,
  },
  icon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  successContainer: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  successText: {
    color: '#15803d',
  },
  warningContainer: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  warningText: {
    color: '#b45309',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
  },
  infoContainer: {
    backgroundColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  infoText: {
    color: '#0369a1',
  },
});

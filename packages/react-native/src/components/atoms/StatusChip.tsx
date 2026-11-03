import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../../../tokens/tokens';

export type PumpDomainStatus =
  | 'DRAFT'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'INSTALLING'
  | 'TESTING_PUMP'
  | 'QA_PENDING'
  | 'QA_APPROVED'
  | 'QA_REJECTED'
  | 'ACTIVE_PUMPING'
  | 'SOLAR_INSUFFICIENT'
  | 'FAULT_OVERHEAT'
  | 'DRY_RUN_PROTECTION'
  | 'MAINTENANCE_DUE'
  | 'OFFLINE_SYNC_PENDING';

interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  dotColor?: string;
  label: string;
}

const statusConfigMap: Record<PumpDomainStatus, StatusConfig> = {
  DRAFT: { bg: colors.neutral[100], text: colors.neutral[700], border: colors.neutral[300], label: 'Đăng Ký Mới' },
  DISPATCHED: { bg: colors.brand.sky[50], text: colors.brand.sky[500], border: '#BAE6FD', label: 'Đang Giao Vận' },
  DELIVERED: { bg: colors.brand.agri[50], text: colors.brand.agri[600], border: '#BBF7D0', label: 'Đã Bàn Giao' },
  INSTALLING: { bg: colors.brand.solar[50], text: colors.brand.solar[600], border: '#FDE68A', label: 'Đang Lắp Đặt' },
  TESTING_PUMP: { bg: colors.brand.sky[50], text: colors.brand.sky[500], border: '#93C5FD', label: 'Đang Thử Nước' },
  QA_PENDING: { bg: '#F3E8FF', text: '#7E22CE', border: '#E9D5FF', label: 'Chờ Duyệt QA' },
  QA_APPROVED: { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC', dotColor: '#16A34A', label: 'QA Đạt Chuẩn' },
  QA_REJECTED: { bg: '#FEE2E2', text: '#B91C1C', border: '#FCA5A5', label: 'QA Từ Chối' },
  ACTIVE_PUMPING: { bg: '#ECFDF5', text: '#047857', border: '#6EE7B7', dotColor: '#10B981', label: 'Đang Bơm Nước' },
  SOLAR_INSUFFICIENT: { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D', label: 'Nắng Yếu' },
  FAULT_OVERHEAT: { bg: '#FEE2E2', text: '#DC2626', border: '#F87171', label: 'Quá Nhiệt' },
  DRY_RUN_PROTECTION: { bg: '#FFE4E6', text: '#BE123C', border: '#FDA4AF', label: 'Giếng Cạn Nước' },
  MAINTENANCE_DUE: { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5', label: 'Đến Hạn Bảo Trì' },
  OFFLINE_SYNC_PENDING: { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA', label: 'Chờ Đồng Bộ' },
};

export interface StatusChipProps {
  status: PumpDomainStatus;
  style?: ViewStyle;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, style }) => {
  const config = statusConfigMap[status] || statusConfigMap.DRAFT;

  return (
    <View style={[styles.chip, { backgroundColor: config.bg, borderColor: config.border }, style]}>
      {config.dotColor && <View style={[styles.dot, { backgroundColor: config.dotColor }]} />}
      <Text style={[styles.text, { color: config.text }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[4],
    borderRadius: radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../../../../tokens/tokens';
import { Button } from '../atoms/Button';
import { StatusChip, PumpDomainStatus } from '../atoms/StatusChip';

export interface PumpKpiCardProps {
  pumpName: string;
  pumpSerial: string;
  solarKw: number;
  waterFlowRate: number;
  status: PumpDomainStatus;
  onControlPress?: () => void;
  style?: ViewStyle;
}

export const PumpKpiCard: React.FC<PumpKpiCardProps> = ({
  pumpName,
  pumpSerial,
  solarKw,
  waterFlowRate,
  status,
  onControlPress,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.serial}>{pumpSerial}</Text>
          <Text style={styles.name}>{pumpName}</Text>
        </View>
        <StatusChip status={status} />
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricSolar}>
          <Text style={styles.metricLabel}>Công Suất Pin</Text>
          <Text style={styles.metricValueSolar}>{solarKw.toFixed(1)} <Text style={styles.unit}>kW</Text></Text>
        </View>

        <View style={styles.metricWater}>
          <Text style={styles.metricLabel}>Lưu Lượng Nước</Text>
          <Text style={styles.metricValueWater}>{waterFlowRate.toFixed(1)} <Text style={styles.unit}>m³/h</Text></Text>
        </View>
      </View>

      {/* Action */}
      {onControlPress && (
        <Button
          label="Điều Khiển Máy Bơm"
          variant="primary"
          onPress={onControlPress}
          style={styles.actionBtn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface.card,
    borderRadius: radius.md,
    padding: spacing[16],
    borderWidth: 1,
    borderColor: colors.border.subtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[16],
  },
  serial: {
    ...typography.overline,
    color: colors.text.muted,
  },
  name: {
    ...typography.heading4,
    color: colors.text.primary,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing[12],
    marginBottom: spacing[16],
  },
  metricSolar: {
    flex: 1,
    backgroundColor: colors.brand.solar[50],
    padding: spacing[12],
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  metricWater: {
    flex: 1,
    backgroundColor: colors.brand.sky[50],
    padding: spacing[12],
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  metricLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  metricValueSolar: {
    ...typography.displayL,
    fontSize: 24,
    lineHeight: 30,
    color: colors.brand.solar[600],
    marginTop: 4,
  },
  metricValueWater: {
    ...typography.displayL,
    fontSize: 24,
    lineHeight: 30,
    color: colors.brand.sky[500],
    marginTop: 4,
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  actionBtn: {
    marginTop: spacing[4],
  },
});

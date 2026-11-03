import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../../../tokens/tokens';

export interface OfflineBannerProps {
  isOffline: boolean;
  pendingSyncCount?: number;
  message?: string;
  style?: ViewStyle;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline,
  pendingSyncCount = 0,
  message = 'Chế độ ngoại tuyến. Ảnh chụp & biên bản nghiệm thu được lưu cục bộ.',
  style,
}) => {
  if (!isOffline) return null;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.message}>{message}</Text>
      {pendingSyncCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>☁️ {pendingSyncCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.offline,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: radius.sm,
    padding: spacing[12],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[8],
  },
  message: {
    flex: 1,
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 16,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#991B1B',
  },
});

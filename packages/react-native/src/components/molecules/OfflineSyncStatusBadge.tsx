import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export interface OfflineSyncStatusBadgeProps {
  isOnline: boolean;
  pendingCount: number;
  isSyncing?: boolean;
  onPressSync?: () => void;
}

export const OfflineSyncStatusBadge: React.FC<OfflineSyncStatusBadgeProps> = ({
  isOnline,
  pendingCount,
  isSyncing = false,
  onPressSync,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressSync}
      disabled={!isOnline || isSyncing || pendingCount === 0}
      style={[
        styles.container,
        isOnline ? (pendingCount > 0 ? styles.onlinePending : styles.onlineSynced) : styles.offline,
      ]}
    >
      <View style={styles.leftRow}>
        <View
          style={[
            styles.dot,
            isOnline ? (pendingCount > 0 ? styles.dotAmber : styles.dotGreen) : styles.dotRed,
          ]}
        />
        <Text style={styles.statusText}>
          {!isOnline
            ? `Offline (${pendingCount} pending)`
            : isSyncing
            ? 'Đang đồng bộ...'
            : pendingCount > 0
            ? `${pendingCount} bản ghi chờ đồng bộ`
            : 'Đã đồng bộ máy chủ'}
        </Text>
      </View>

      {isSyncing ? (
        <ActivityIndicator size="small" color="#1B873F" />
      ) : isOnline && pendingCount > 0 ? (
        <View style={styles.actionPill}>
          <Text style={styles.actionText}>Đồng bộ ngay</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
    marginVertical: 4,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotGreen: {
    backgroundColor: '#10B981',
  },
  dotAmber: {
    backgroundColor: '#F59E0B',
  },
  dotRed: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
  onlineSynced: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  onlinePending: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  offline: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  actionPill: {
    backgroundColor: '#1B873F',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

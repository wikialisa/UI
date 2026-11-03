import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { DeliveryScreen } from './roles/DeliveryScreen';
import { InstallationScreen } from './roles/InstallationScreen';
import { QaInspectorScreen } from './roles/QaInspectorScreen';
import { ServiceTechnicianScreen } from './roles/ServiceTechnicianScreen';
import { FarmerScreen } from './roles/FarmerScreen';
import { AuthScreen } from './roles/AuthScreen';

export type UserRole = 'delivery' | 'install' | 'qa' | 'service' | 'farmer' | 'auth';

export interface MobileSimulatorFrameProps {
  initialRole?: UserRole;
  isOffline?: boolean;
}

export const MobileSimulatorFrame: React.FC<MobileSimulatorFrameProps> = ({
  initialRole = 'delivery',
  isOffline = false,
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);

  const renderActiveScreen = () => {
    switch (role) {
      case 'delivery': return <DeliveryScreen />;
      case 'install': return <InstallationScreen />;
      case 'qa': return <QaInspectorScreen />;
      case 'service': return <ServiceTechnicianScreen />;
      case 'farmer': return <FarmerScreen />;
      case 'auth': return <AuthScreen />;
      default: return <DeliveryScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* 390px x 844px Mobile Mockup Frame */}
      <View style={styles.phoneFrame}>
        {/* iOS Status Bar (9:41) with Dynamic Island */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>9:41</Text>
          <View style={styles.dynamicIsland} />
          <View style={styles.statusIcons}>
            <Text style={styles.iconText}>📶</Text>
            <Text style={styles.iconText}>📡</Text>
            <Text style={styles.iconText}>🔋</Text>
          </View>
        </View>

        {/* Offline Warning Banner */}
        {isOffline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>⚠️ Chế độ ngoại tuyến (1 bản ghi chờ sync)</Text>
          </View>
        )}

        {/* Screen Dynamic Body */}
        <View style={styles.screenBody}>
          {renderActiveScreen()}
        </View>

        {/* iOS Home Indicator Bar */}
        <View style={styles.homeIndicatorContainer}>
          <View style={styles.homeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  phoneFrame: {
    width: 390,
    height: 844,
    borderRadius: 48,
    backgroundColor: '#0F172A',
    borderWidth: 4,
    borderColor: '#1E293B',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  statusBar: {
    height: 44,
    backgroundColor: '#020617',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  statusTime: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dynamicIsland: {
    width: 96,
    height: 18,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  iconText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  offlineBanner: {
    backgroundColor: '#991B1B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  offlineText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  screenBody: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  homeIndicatorContainer: {
    height: 24,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicator: {
    width: 134,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
  },
});

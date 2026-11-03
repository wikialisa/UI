import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const InstallationScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [checks, setChecks] = useState({ check1: true, check2: false, check3: false });
  const [pumpTesting, setPumpTesting] = useState<boolean>(true);

  const toggleCheck = (key: 'check1' | 'check2' | 'check3') => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {step > 1 && (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Đội Lắp Đặt Thực Địa (Install)</Text>
          <Text style={styles.subtitle}>Bước {step}/3 • Trạm Số 04</Text>
        </View>
        <View style={styles.badge}><Text style={styles.badgeText}>INSTALL</Text></View>
      </View>

      {step === 1 && (
        <View style={styles.stepBox}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Nhiệm vụ bàn giao công trình</Text>
            <Text style={styles.boldText}>Trạm Bơm 5 HP • Giếng Sâu 35m</Text>
            <Text style={styles.infoText}>Hộ nông dân: Ramesh Kumar • Huyện Rajpur</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Danh mục nghiệm thu an toàn</Text>
            <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('check1')}>
              <Text style={styles.checkLabel}>1. Dàn pin quay đúng 15° Nam</Text>
              <Text style={checks.check1 ? styles.checkOk : styles.checkWait}>{checks.check1 ? '✓ Đạt' : '○ Chưa'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('check2')}>
              <Text style={styles.checkLabel}>2. Cáp DC đấu nối kín nước IP68</Text>
              <Text style={checks.check2 ? styles.checkOk : styles.checkWait}>{checks.check2 ? '✓ Đạt' : '○ Chưa'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkRow} onPress={() => toggleCheck('check3')}>
              <Text style={styles.checkLabel}>3. Cọc tiếp địa chống sét &lt; 10 Ohm</Text>
              <Text style={checks.check3 ? styles.checkOk : styles.checkWait}>{checks.check3 ? '✓ Đạt' : '○ Chưa'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
            <Text style={styles.primaryBtnText}>Tiến Hành Thử Máy & Đo Điện Áp ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepBox}>
          <View style={styles.monitorBox}>
            <View style={styles.monitorHeader}>
              <Text style={styles.monitorTitle}>⚡ BIẾN TẦN SOLARPUMP PRO</Text>
              <Text style={pumpTesting ? styles.statusActive : styles.statusIdle}>
                {pumpTesting ? '● ĐANG BƠM' : '○ TẠM DỪNG'}
              </Text>
            </View>

            <View style={styles.grid2}>
              <View style={styles.metricCell}>
                <Text style={styles.metricLabel}>Điện áp Voc</Text>
                <Text style={styles.metricVal}>418 V</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricLabel}>Dòng điện Imp</Text>
                <Text style={styles.metricVal}>11.4 A</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricLabel}>Công suất DC</Text>
                <Text style={styles.metricValGreen}>{pumpTesting ? '4.76 kW' : '0.0 kW'}</Text>
              </View>
              <View style={styles.metricCell}>
                <Text style={styles.metricLabel}>Lưu lượng nước</Text>
                <Text style={styles.metricValSky}>{pumpTesting ? '18.5 m³/h' : '0.0 m³/h'}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.toggleBtn, pumpTesting ? styles.btnDanger : styles.btnSuccess]}
              onPress={() => setPumpTesting(!pumpTesting)}
            >
              <Text style={styles.primaryBtnText}>{pumpTesting ? 'Tắt Thử Máy' : 'Bật Thử Máy Bơm'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(3)}>
            <Text style={styles.primaryBtnText}>Nộp Hồ Sơ Kỹ Thuật Sang QA ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepBox}>
          <View style={styles.successIcon}><Text style={styles.checkBig}>✓</Text></View>
          <Text style={styles.successTitle}>Hồ Sơ Lắp Đặt Đã Chuyển Sang QA</Text>
          <Text style={styles.successSub}>Biên bản kiểm tra điện áp & lưu lượng đã ghi nhận vào hàng đợi QA Inspector.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
            <Text style={styles.primaryBtnText}>Về Màn Hình Chính Lắp Đặt</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderBottomWidth: 1, borderColor: '#E2E8F0', paddingBottom: 10 },
  backBtn: { padding: 6, marginRight: 6 },
  backText: { fontSize: 22, fontWeight: 'bold', color: '#15803D' },
  headerTitles: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 11, color: '#64748B' },
  badge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#B45309' },
  stepBox: { gap: 12 },
  cardHeader: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', gap: 4 },
  card: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' },
  boldText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  infoText: { fontSize: 12, color: '#334155' },
  checkRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8 },
  checkLabel: { fontSize: 12, color: '#1E293B' },
  checkOk: { fontSize: 12, fontWeight: 'bold', color: '#15803D' },
  checkWait: { fontSize: 12, color: '#94A3B8' },
  primaryBtn: { backgroundColor: '#15803D', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  monitorBox: { backgroundColor: '#0F172A', padding: 14, borderRadius: 14, gap: 10 },
  monitorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  monitorTitle: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  statusActive: { color: '#4ADE80', fontSize: 10, fontWeight: 'bold' },
  statusIdle: { color: '#F87171', fontSize: 10, fontWeight: 'bold' },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metricCell: { width: '48%', backgroundColor: '#1E293B', padding: 10, borderRadius: 8, alignItems: 'center' },
  metricLabel: { color: '#94A3B8', fontSize: 10 },
  metricVal: { color: '#F59E0B', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
  metricValGreen: { color: '#10B981', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
  metricValSky: { color: '#38BDF8', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
  toggleBtn: { height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnDanger: { backgroundColor: '#DC2626' },
  btnSuccess: { backgroundColor: '#15803D' },
  successIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  checkBig: { fontSize: 32, color: '#15803D', fontWeight: 'bold' },
  successTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  successSub: { fontSize: 11, color: '#64748B', textAlign: 'center' },
});

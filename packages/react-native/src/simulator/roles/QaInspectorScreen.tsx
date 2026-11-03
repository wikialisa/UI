import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export const QaInspectorScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [decision, setDecision] = useState<'approved' | 'rejected' | 'rework' | null>(null);

  const handleMakeDecision = (dec: 'approved' | 'rejected' | 'rework') => {
    setDecision(dec);
    setStep(3);
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
          <Text style={styles.title}>Kiểm Định Chất Lượng QA (Audit)</Text>
          <Text style={styles.subtitle}>Bước {step}/3 • Tiêu Chuẩn TCVN</Text>
        </View>
        <View style={styles.badge}><Text style={styles.badgeText}>QA AUDIT</Text></View>
      </View>

      {step === 1 && (
        <View style={styles.stepBox}>
          <TouchableOpacity style={styles.card} onPress={() => setStep(2)}>
            <View style={styles.cardHeader}>
              <Text style={styles.boldText}>Trạm Bơm Số 04 (Vườn Xoài)</Text>
              <View style={styles.qaPill}><Text style={styles.qaPillText}>Chờ QA</Text></View>
            </View>
            <Text style={styles.infoText}>Lắp đặt bởi: Đội Kỹ Thuật 02</Text>
            <Text style={styles.infoText}>Số sê-ri: <Text style={styles.monoText}>SPC-2024-08471</Text> (5 HP)</Text>
            <Text style={styles.linkText}>Bấm để tiến hành thẩm định ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepBox}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Bộ tiêu chí kiểm định kỹ thuật</Text>
            <View style={styles.itemRow}><Text style={styles.label}>Độ nghiêng dàn pin 15° Nam</Text><Text style={styles.passText}>ĐẠT (15.2°)</Text></View>
            <View style={styles.itemRow}><Text style={styles.label}>Trở kháng tiếp địa chống sét</Text><Text style={styles.passText}>ĐẠT (6.8 Ω)</Text></View>
            <View style={styles.itemRow}><Text style={styles.label}>Tự ngắt chống cạn (Dry-run)</Text><Text style={styles.passText}>ĐẠT (12s ngắt)</Text></View>
            <View style={styles.itemRow}><Text style={styles.label}>Lưu lượng tại 850 W/m²</Text><Text style={styles.passText}>ĐẠT (18.5 m³/h)</Text></View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.approveBtn} onPress={() => handleMakeDecision('approved')}>
              <Text style={styles.btnTextWhite}>✓ Phê Duyệt Nghiệm Thu (Approve)</Text>
            </TouchableOpacity>
            <View style={styles.grid2}>
              <TouchableOpacity style={styles.reworkBtn} onPress={() => handleMakeDecision('rework')}>
                <Text style={styles.btnTextWhite}>Yêu Cầu Rework</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectBtn} onPress={() => handleMakeDecision('rejected')}>
                <Text style={styles.btnTextWhite}>Từ Chối (Reject)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepBox}>
          <View style={[styles.successIcon, decision === 'rejected' && styles.iconRed, decision === 'rework' && styles.iconAmber]}>
            <Text style={styles.checkBig}>{decision === 'approved' ? '✓' : decision === 'rejected' ? '✕' : '⚠'}</Text>
          </View>
          <Text style={styles.successTitle}>
            {decision === 'approved' ? 'Đã Phê Duyệt Nghiệm Thu!' : decision === 'rejected' ? 'Đã Từ Chối Nghiệm Thu' : 'Đã Yêu Cầu Rework'}
          </Text>
          <Text style={styles.successSub}>
            Quyết định của kỹ sư QA đã được cập nhật vào hồ sơ quản trị hệ thống.
          </Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
            <Text style={styles.btnTextWhite}>Về Hàng Đợi Kiểm Định</Text>
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
  badge: { backgroundColor: '#F3E8FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#7E22CE' },
  stepBox: { gap: 12 },
  card: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  boldText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  infoText: { fontSize: 11, color: '#64748B' },
  monoText: { fontFamily: 'monospace', fontWeight: 'bold' },
  qaPill: { backgroundColor: '#F3E8FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  qaPillText: { color: '#7E22CE', fontSize: 10, fontWeight: '700' },
  linkText: { fontSize: 11, fontWeight: '700', color: '#15803D', marginTop: 4 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#F1F5F9' },
  label: { fontSize: 12, color: '#334155' },
  passText: { fontSize: 11, fontWeight: 'bold', color: '#15803D' },
  actions: { gap: 8, marginTop: 4 },
  approveBtn: { backgroundColor: '#15803D', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  grid2: { flexDirection: 'row', gap: 8 },
  reworkBtn: { flex: 1, backgroundColor: '#F59E0B', height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  rejectBtn: { flex: 1, backgroundColor: '#DC2626', height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnTextWhite: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  primaryBtn: { backgroundColor: '#15803D', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  successIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  iconRed: { backgroundColor: '#FEE2E2' },
  iconAmber: { backgroundColor: '#FEF3C7' },
  checkBig: { fontSize: 32, color: '#15803D', fontWeight: 'bold' },
  successTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  successSub: { fontSize: 11, color: '#64748B', textAlign: 'center' },
});

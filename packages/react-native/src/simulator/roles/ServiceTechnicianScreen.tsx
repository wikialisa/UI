import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const ServiceTechnicianScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedPart, setSelectedPart] = useState<boolean>(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {step > 1 && (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Kỹ Thuật Bảo Trì (Service)</Text>
          <Text style={styles.subtitle}>Bước {step}/3 • Xử Lý Sự Cố</Text>
        </View>
        <View style={styles.badge}><Text style={styles.badgeText}>SERVICE</Text></View>
      </View>

      {step === 1 && (
        <View style={styles.stepBox}>
          <TouchableOpacity style={styles.cardAlert} onPress={() => setStep(2)}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardCodeRed}>🚨 #CMP-2024-156</Text>
              <View style={styles.urgentPill}><Text style={styles.urgentText}>Khẩn Cấp</Text></View>
            </View>
            <Text style={styles.boldText}>Bơm Không Hoạt Động (Mã Lỗi E-04)</Text>
            <Text style={styles.infoText}>Khách hàng: Ramesh Kumar • Làng Rajpur</Text>
            <Text style={styles.subText}>Hiện tượng: Báo cạn giếng sai lệch sau đợt mưa giông.</Text>
            <Text style={styles.linkText}>Tiếp nhận sửa chữa ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepBox}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Linh kiện thay thế bảo hành</Text>
            <TouchableOpacity
              style={[styles.partRow, selectedPart && styles.partRowSelected]}
              onPress={() => setSelectedPart(!selectedPart)}
            >
              <View style={styles.partInfo}>
                <Text style={styles.boldText}>Cảm biến giếng sâu 50m (SEN-WL-50M)</Text>
                <Text style={styles.infoText}>Chống cạn E-04 • Bảo hành 2 năm</Text>
              </View>
              <Text style={styles.checkText}>{selectedPart ? '✓ Đã chọn' : '○ Chọn'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(3)}>
            <Text style={styles.primaryBtnText}>Hoàn Tất Thay Thế & Đóng Phiếu ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepBox}>
          <View style={styles.successIcon}><Text style={styles.checkBig}>✓</Text></View>
          <Text style={styles.successTitle}>Đã Đóng Phiếu CMP-2024-156!</Text>
          <Text style={styles.successSub}>Máy bơm đã được thay cảm biến mới, hoạt động bình thường 18.5 m³/h.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
            <Text style={styles.primaryBtnText}>Về Danh Sách Phiếu Sự Cố</Text>
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
  badge: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#DC2626' },
  stepBox: { gap: 12 },
  cardAlert: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#DC2626', gap: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardCodeRed: { fontSize: 13, fontWeight: '700', color: '#DC2626' },
  urgentPill: { backgroundColor: '#FEE2E2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  urgentText: { color: '#DC2626', fontSize: 10, fontWeight: 'bold' },
  boldText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  infoText: { fontSize: 11, color: '#475569' },
  subText: { fontSize: 11, color: '#DC2626' },
  linkText: { fontSize: 11, fontWeight: '700', color: '#15803D', marginTop: 4 },
  card: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' },
  partRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8 },
  partRowSelected: { borderColor: '#15803D', backgroundColor: '#F0FDF4' },
  partInfo: { flex: 1 },
  checkText: { fontSize: 12, fontWeight: 'bold', color: '#15803D' },
  primaryBtn: { backgroundColor: '#15803D', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  successIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  checkBig: { fontSize: 32, color: '#15803D', fontWeight: 'bold' },
  successTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  successSub: { fontSize: 11, color: '#64748B', textAlign: 'center' },
});

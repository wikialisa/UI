import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';

export const FarmerScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isPumping, setIsPumping] = useState<boolean>(true);
  const [complaintText, setComplaintText] = useState<string>('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {step > 1 && (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Cổng Nông Dân (Farmer)</Text>
          <Text style={styles.subtitle}>Chủ Hộ: Ramesh Kumar</Text>
        </View>
        <View style={styles.badge}><Text style={styles.badgeText}>FARMER</Text></View>
      </View>

      {step === 1 && (
        <View style={styles.stepBox}>
          {/* Main Pump Gauge Card */}
          <View style={[styles.gaugeCard, !isPumping && styles.gaugeCardOff]}>
            <View style={styles.gaugeHeader}>
              <Text style={styles.gaugeTitle}>TRẠM BƠM VƯỜN XOÀI (5 HP)</Text>
              <Text style={styles.gaugeStatus}>{isPumping ? '● ĐANG BƠM NƯỚC' : '○ TẠM DỪNG'}</Text>
            </View>
            <Text style={styles.gaugeVal}>{isPumping ? '18.5' : '0.0'} <Text style={styles.unitText}>m³/h</Text></Text>
            <View style={styles.gaugeFooter}>
              <Text style={styles.footerText}>Công suất: {isPumping ? '4.8 kW' : '0.0 kW'}</Text>
              <Text style={styles.footerText}>Hôm nay: 74.5 m³</Text>
            </View>
          </View>

          {/* Remote Switch Action */}
          <TouchableOpacity
            style={[styles.primaryBtn, isPumping ? styles.btnDanger : styles.btnSuccess]}
            onPress={() => setIsPumping(!isPumping)}
          >
            <Text style={styles.primaryBtnText}>
              {isPumping ? 'Tạm Dừng Bơm Nước' : 'Khởi Động Bơm Nước'}
            </Text>
          </TouchableOpacity>

          {/* Trouble Report Trigger */}
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(2)}>
            <Text style={styles.secondaryBtnText}>❓ Báo Cáo Sự Cố & Hỗ Trợ Kỹ Thuật</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepBox}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Gửi yêu cầu hỗ trợ kỹ thuật</Text>
            <Text style={styles.label}>Hiện tượng gặp phải:</Text>
            <View style={styles.selectBox}><Text style={styles.infoText}>Bơm không lên nước dù nắng gắt</Text></View>

            <Text style={styles.label}>Chi tiết sự cố:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Mô tả hiện tượng gặp phải..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
              value={complaintText}
              onChangeText={setComplaintText}
            />
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              Alert.alert('Thành công', 'Đã gửi yêu cầu kỹ thuật tới tổng đài hỗ trợ nông dân!');
              setStep(1);
            }}
          >
            <Text style={styles.primaryBtnText}>Gửi Yêu Cầu Hỗ Trợ ➔</Text>
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
  badge: { backgroundColor: '#E0F2FE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#0369A1' },
  stepBox: { gap: 12 },
  gaugeCard: { backgroundColor: '#15803D', padding: 16, borderRadius: 16, gap: 8 },
  gaugeCardOff: { backgroundColor: '#334155' },
  gaugeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gaugeTitle: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 },
  gaugeStatus: { color: '#BBF7D0', fontSize: 10, fontWeight: 'bold' },
  gaugeVal: { color: '#FFFFFF', fontSize: 36, fontWeight: 'bold', fontFamily: 'monospace' },
  unitText: { fontSize: 14, fontWeight: 'normal' },
  gaugeFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  footerText: { color: 'rgba(255,255,255,0.85)', fontSize: 11 },
  primaryBtn: { height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  btnSuccess: { backgroundColor: '#15803D' },
  btnDanger: { backgroundColor: '#DC2626' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  secondaryBtn: { height: 42, borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  secondaryBtnText: { color: '#334155', fontSize: 12, fontWeight: '600' },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#0F172A' },
  label: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  selectBox: { padding: 10, backgroundColor: '#F8FAFC', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  infoText: { fontSize: 12, color: '#0F172A' },
  textArea: { height: 80, padding: 10, backgroundColor: '#F8FAFC', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', fontSize: 12, textAlignVertical: 'top' },
});

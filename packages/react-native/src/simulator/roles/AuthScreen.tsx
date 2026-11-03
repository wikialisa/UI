import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';

export const AuthScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState<string>('EMP-DEL-2024-047');
  const [otpCode, setOtpCode] = useState<string>('8942');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {step === 1 && (
        <View style={styles.splashBox}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>☀️</Text>
          </View>
          <Text style={styles.brandTitle}>WikiAlisa UI</Text>
          <Text style={styles.brandSubtitle}>Nền Tảng Năng Lượng Mặt Trời Nông Nghiệp</Text>
          <View style={styles.versionBadge}><Text style={styles.versionText}>v2.4.1 Enterprise Security</Text></View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
            <Text style={styles.btnTextWhite}>Bắt Đầu Đăng Nhập ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepBox}>
          <Text style={styles.headerTitle}>Đăng Nhập Ca Làm Việc</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Mã nhân viên / SĐT:</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput style={styles.input} value="••••••••" secureTextEntry />
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(3)}>
            <Text style={styles.btnTextWhite}>Xác Thực Danh Tính ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={styles.splashBox}>
          <View style={styles.successIcon}><Text style={styles.checkIcon}>👤</Text></View>
          <Text style={styles.roleSub}>Tự động nhận diện vai trò</Text>
          <Text style={styles.roleTitle}>Nhân Viên Giao Vận (Delivery Partner)</Text>
          <Text style={styles.unitText}>Đơn vị: Đội Vận Tải Nông Nghiệp Vùng 2</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
            <Text style={styles.btnTextWhite}>Khởi Động Ca Làm Việc ➔</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, justifyContent: 'center', minHeight: 460 },
  splashBox: { alignItems: 'center', gap: 10, paddingVertical: 20 },
  logoCircle: { width: 64, height: 64, borderRadius: 20, backgroundColor: '#15803D', alignItems: 'center', justifyContent: 'center' },
  logoIcon: { fontSize: 32 },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  brandSubtitle: { fontSize: 12, color: '#64748B', textAlign: 'center' },
  versionBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
  versionText: { fontSize: 10, fontWeight: 'bold', color: '#475569' },
  primaryBtn: { width: '100%', backgroundColor: '#15803D', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  btnTextWhite: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  stepBox: { gap: 12 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', textAlign: 'center', marginBottom: 8 },
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  label: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  input: { height: 40, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 10, fontSize: 12, backgroundColor: '#F8FAFC' },
  successIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center' },
  checkIcon: { fontSize: 28 },
  roleSub: { fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' },
  roleTitle: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', textAlign: 'center' },
  unitText: { fontSize: 12, color: '#64748B' },
});

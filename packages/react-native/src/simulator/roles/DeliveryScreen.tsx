import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';

export const DeliveryScreen: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState<string>('');
  const [photosUploaded, setPhotosUploaded] = useState<boolean[]>([false, false, false, false]);
  const [hasSigned, setHasSigned] = useState<boolean>(false);

  const handleEnterOtpDigit = (digit: string) => {
    if (otp.length < 4) setOtp(prev => prev + digit);
  };

  const handleBackspaceOtp = () => {
    setOtp(prev => prev.slice(0, -1));
  };

  const togglePhoto = (idx: number) => {
    setPhotosUploaded(prev => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top App Header */}
      <View style={styles.header}>
        {step > 1 && (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        )}
        <View style={styles.headerTitles}>
          <Text style={styles.title}>Giao Hàng Thực Địa (Del)</Text>
          <Text style={styles.subtitle}>Bước {step}/7 • Đơn #SP-2024-0847</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>DELIVERY</Text>
        </View>
      </View>

      {/* STEP 1: Del 01 - Delivery Task List */}
      {step === 1 && (
        <View style={styles.stepBox}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Tìm kiếm nông dân, mã đơn..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity style={styles.card} onPress={() => setStep(2)}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardCode}>📦 #SP-2024-0847</Text>
              <View style={styles.pendingPill}><Text style={styles.pendingText}>Chờ Giao</Text></View>
            </View>
            <Text style={styles.farmerName}>Hộ Nông Dân: Ramesh Kumar (Bác Ba Phi)</Text>
            <Text style={styles.farmerAddress}>Thôn 3, Làng Rajpur • Máy bơm 5 HP (35m)</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.distance}>📍 Cách 12.5 km (~25 phút)</Text>
              <Text style={styles.linkText}>Chi tiết ➔</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
            <Text style={styles.primaryBtnText}>Tiếp Nhận Đơn Hàng ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2: Del 02 - Manifest & Equipment Specs */}
      {step === 2 && (
        <View style={styles.stepBox}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Thông tin chủ hộ</Text>
            <Text style={styles.boldText}>Ramesh Kumar (Bác Ba Phi)</Text>
            <Text style={styles.infoText}>📞 0912.345.678 • Thôn 3, Làng Rajpur</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Danh mục 3 kiện trên xe</Text>
            <View style={styles.itemRow}><Text>1× Biến Tần SolarPump Pro 5.5kW</Text><Text style={styles.checkText}>✓ Đủ</Text></View>
            <View style={styles.itemRow}><Text>8× Tấm Pin Mặt Trời Mono 550W</Text><Text style={styles.checkText}>✓ Đủ</Text></View>
            <View style={styles.itemRow}><Text>1× Bơm Chìm Hỏa Tiễn 5 HP</Text><Text style={styles.checkText}>✓ Đủ</Text></View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(3)}>
            <Text style={styles.primaryBtnText}>Bắt Đầu Dẫn Đường GPS ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 3: Del 03 - GPS Route Navigation */}
      {step === 3 && (
        <View style={styles.stepBox}>
          <View style={styles.mapBox}>
            <Text style={styles.mapText}>Bản đồ GPS dẫn đường thực địa (12.5 km)</Text>
            <View style={styles.turnBox}>
              <Text style={styles.turnTitle}>↱ Rẽ phải sau 200m</Text>
              <Text style={styles.turnSub}>Đường bê tông kênh thủy lợi Làng Rajpur</Text>
            </View>
          </View>
          <View style={styles.gpsRow}>
            <Text style={styles.coordText}>Tọa độ GPS: 26.8467° N, 80.9462° E</Text>
            <Text style={styles.gpsLock}>Khóa GPS ±3m</Text>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(4)}>
            <Text style={styles.primaryBtnText}>Đã Đến Nơi ➔ Mở Xác Thực OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 4: Del 05 - OTP Verification */}
      {step === 4 && (
        <View style={styles.stepBox}>
          <Text style={styles.centerTitle}>Nhập Mã Xác Thực OTP</Text>
          <Text style={styles.centerSubtitle}>Mã 4 số gửi tới SMS số 0912.***.678 của nông dân</Text>

          <View style={styles.otpRow}>
            {[0, 1, 2, 3].map(i => (
              <View key={i} style={[styles.otpCell, otp.length > i && styles.otpCellFilled]}>
                <Text style={styles.otpChar}>{otp[i] || ''}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={() => setOtp('8942')}>
            <Text style={styles.quickFillText}>⚡ Nhập nhanh mã: 8942</Text>
          </TouchableOpacity>

          <View style={styles.keypad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
              <TouchableOpacity key={d} style={styles.keyBtn} onPress={() => handleEnterOtpDigit(d)}>
                <Text style={styles.keyText}>{d}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.keyBtn} onPress={() => setOtp('')}>
              <Text style={styles.keyTextSmall}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={() => handleEnterOtpDigit('0')}>
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyBtn} onPress={handleBackspaceOtp}>
              <Text style={styles.keyTextSmall}>⌫</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, otp.length < 4 && styles.btnDisabled]}
            disabled={otp.length < 4}
            onPress={() => setStep(5)}
          >
            <Text style={styles.primaryBtnText}>Xác Thực OTP ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 5: Del 06 & 07 - Serial Scan & Photos */}
      {step === 5 && (
        <View style={styles.stepBox}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Mã số sê-ri máy bơm (Quét QR)</Text>
            <View style={styles.serialBox}>
              <Text style={styles.serialCode}>SPC-2024-08471</Text>
              <Text style={styles.checkText}>✓ Đã khớp</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Chụp 4 góc ảnh hạ hàng</Text>
            <View style={styles.photoGrid}>
              {['Mặt máy bơm', 'Tem thông số', 'Kiện tấm pin', 'Toàn cảnh'].map((lbl, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.photoSlot, photosUploaded[idx] && styles.photoSlotDone]}
                  onPress={() => togglePhoto(idx)}
                >
                  <Text style={styles.photoText}>{photosUploaded[idx] ? '✓ Đã chụp' : `📷 ${lbl}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(6)}>
            <Text style={styles.primaryBtnText}>Thu Thập Chữ Ký Nông Dân ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 6: Del 08 - Digital Signature */}
      {step === 6 && (
        <View style={styles.stepBox}>
          <Text style={styles.sectionTitle}>Chữ ký điện tử nông dân Ramesh Kumar</Text>
          <View style={styles.sigBox}>
            <TouchableOpacity style={styles.autoSignBtn} onPress={() => setHasSigned(!hasSigned)}>
              <Text style={styles.linkText}>⚡ Ký tự động</Text>
            </TouchableOpacity>
            <Text style={[styles.sigPreview, !hasSigned && styles.sigPlaceholder]}>
              {hasSigned ? 'Ramesh Kumar' : 'Vùng cảm ứng ký tay hoặc bút Stylus'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, !hasSigned && styles.btnDisabled]}
            disabled={!hasSigned}
            onPress={() => setStep(7)}
          >
            <Text style={styles.primaryBtnText}>Hoàn Tất Biên Bản POD ➔</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 7: Del 11 - Confirmation POD Success */}
      {step === 7 && (
        <View style={styles.stepBox}>
          <View style={styles.successIcon}><Text style={styles.checkBig}>✓</Text></View>
          <Text style={styles.successTitle}>Giao Hàng Thành Công!</Text>
          <Text style={styles.successSub}>Biên bản điện tử POD-8947-VN đã được lưu an toàn.</Text>

          <View style={styles.card}>
            <Text style={styles.rowItem}><Text style={styles.boldText}>Mã POD:</Text> POD-8947-VN</Text>
            <Text style={styles.rowItem}><Text style={styles.boldText}>Người nhận:</Text> Ramesh Kumar</Text>
            <Text style={styles.rowItem}><Text style={styles.boldText}>Máy bơm:</Text> SPC-2024-08471</Text>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
            <Text style={styles.primaryBtnText}>Về Danh Sách Đơn Giao (Del 01)</Text>
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
  badge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#166534' },
  stepBox: { gap: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 10, height: 40 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 12, color: '#0F172A' },
  card: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardCode: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  pendingPill: { backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  pendingText: { color: '#B45309', fontSize: 10, fontWeight: '700' },
  farmerName: { fontSize: 12, fontWeight: '600', color: '#1E293B' },
  farmerAddress: { fontSize: 11, color: '#64748B' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 6, borderTopWidth: 1, borderColor: '#F1F5F9' },
  distance: { fontSize: 11, color: '#475569' },
  linkText: { fontSize: 11, fontWeight: '700', color: '#15803D' },
  primaryBtn: { backgroundColor: '#15803D', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  btnDisabled: { opacity: 0.5 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#64748B', textTransform: 'uppercase' },
  boldText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  infoText: { fontSize: 12, color: '#334155' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  checkText: { color: '#15803D', fontWeight: 'bold', fontSize: 12 },
  mapBox: { height: 180, backgroundColor: '#1E293B', borderRadius: 12, padding: 12, justifyContent: 'space-between' },
  mapText: { color: '#94A3B8', fontSize: 11 },
  turnBox: { backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: 8, borderRadius: 8 },
  turnTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  turnSub: { color: '#CBD5E1', fontSize: 10 },
  gpsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  coordText: { fontSize: 11, color: '#475569', fontFamily: 'monospace' },
  gpsLock: { fontSize: 10, color: '#166534', fontWeight: 'bold', backgroundColor: '#DCFCE7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  centerTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  centerSubtitle: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 10 },
  otpCell: { width: 44, height: 48, borderRadius: 8, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  otpCellFilled: { borderColor: '#15803D', backgroundColor: '#F0FDF4' },
  otpChar: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  quickFillText: { color: '#15803D', textAlign: 'center', fontSize: 11, fontWeight: '700' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, maxWidth: 240, alignSelf: 'center', marginTop: 8 },
  keyBtn: { width: 70, height: 44, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  keyText: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' },
  keyTextSmall: { fontSize: 12, fontWeight: 'bold', color: '#64748B' },
  serialBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F5F9', padding: 8, borderRadius: 8 },
  serialCode: { fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  photoSlot: { width: '48%', height: 60, borderRadius: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: '#94A3B8', alignItems: 'center', justifyContent: 'center' },
  photoSlotDone: { borderColor: '#15803D', backgroundColor: '#F0FDF4' },
  photoText: { fontSize: 11, color: '#475569' },
  sigBox: { height: 120, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 8, justifyContent: 'center', alignItems: 'center' },
  autoSignBtn: { alignSelf: 'flex-end' },
  sigPreview: { fontSize: 22, fontStyle: 'italic', color: '#15803D', fontWeight: 'bold' },
  sigPlaceholder: { fontSize: 11, fontStyle: 'normal', color: '#94A3B8', fontWeight: 'normal' },
  successIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  checkBig: { fontSize: 32, color: '#15803D', fontWeight: 'bold' },
  successTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
  successSub: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  rowItem: { fontSize: 12, color: '#334155' },
});

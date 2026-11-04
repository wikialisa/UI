---
name: wikialisa-install
description: >-
  Use when working on Installation Team screens, checklist flows, or field documentation UI
  in the WikiAlisa UI project — covers 14 screens (INS-01..05), panel alignment, wiring diagrams,
  geo-tagged photo capture, first-run pump test, and offline sync for installation crews.
---

# WikiAlisa — Installation Team Role Skill

Activated when building, reviewing, or documenting UI for the **Đội Lắp Đặt (Installation Team)** role.

---

## 1. Vai trò & Phạm vi

- **Người dùng**: Kỹ sư / thợ kỹ thuật lắp đặt hệ thống bơm mặt trời tại thực địa.
- **Trạng thái chip liên quan**: `INSTALLING` → `TESTING_PUMP` → `QA_PENDING`
- **Màn hình chính thức**: `pages/06-High-Fidelity-UI/installation-team-screens.md`
- **Số màn hình**: 14 (INS-01 → INS-05)

---

## 2. Luồng 14 Màn Hình Chuẩn

```
INS-01-DASH (Tổng quan) → INS-01-TASK-LIST
  → INS-02-CHECKLIST (12 mục) → INS-02-PANEL-ALIGN (góc 15°)
  → INS-02-WELL-DEPTH → INS-02-WIRING (sơ đồ đấu nối)
  → INS-03-PHOTO-CAPTURE (4 góc) → INS-03-PHOTO-GALLERY → INS-03-SIGNATURE
  → INS-04-POWER-ON → INS-04-PUMP-TEST → INS-04-COMPLETE
  → INS-05-OFFLINE → INS-05-SYNC
```

---

## 3. Quy Tắc Thiết Kế Bắt Buộc

| Quy tắc | Giá trị |
|---|---|
| Khung màn hình | 390 × 844 px |
| Touch target tối thiểu | 48 × 48 pt |
| Màu chính role | `color.brand.solar.500` (#E59800) |
| Màu checklist hoàn thành | `color.semantic.success` (#16A34A) |
| Màu cảnh báo kỹ thuật | `color.semantic.warning` (#D97706) |
| Progress bar | `color.brand.agri.500` nền `color.neutral.200` |

---

## 4. Checklist Kỹ Thuật Chuẩn (12 Mục — INS-02-CHECKLIST)

Mỗi mục có trạng thái: `PASS` (✓ xanh) / `FAIL` (✗ đỏ) / `N/A` (gạch ngang xám).

```
1. Khung dàn pin hướng Nam, góc nghiêng 15°
2. Không có bóng che trong 6 giờ/ngày (9h–15h)
3. Độ sâu giếng khoan ≥ 30m
4. Lưu lượng giếng ≥ 3 m³/h
5. Tiếp địa an toàn: điện trở ≤ 4Ω
6. Cáp DC chịu nhiệt ≥ 90°C, dây PV đúng chuẩn
7. Inverter lắp nơi thoáng mát, nhiệt độ < 45°C
8. Đấu nối DC+/DC− đúng cực
9. Đấu nối AC L/N/PE đúng chuẩn
10. Cầu dao CB hoạt động
11. Đèn LED inverter sáng xanh khi cấp điện
12. Lưu lượng bơm thực tế ≥ 90% thiết kế
```

---

## 5. Components Ưu Tiên Cho Role Này

- **Checklist rows**: `Components/Selection/Checkbox` + `Components/Lists/List Item`
- **Progress bar**: `Components/Feedback/Progress` (linear)
- **Stepper 4 bước**: `Components/Navigation/Stepper`
- **Camera geo-tag**: `Components/Upload/Upload` (camera variant)
- **Signature pad**: `Components/Upload/Upload` (signature variant)
- **Wiring diagram**: Static SVG inline (không dùng external asset)
- **Offline banner**: `Components/Feedback/Banner` (danger)
- **Submit to QA dialog**: `Components/Dialogs/Dialog`

---

## 6. Code Conventions

### React Native
```tsx
// File: src/screens/installation/ChecklistScreen.tsx
// ChecklistItem type: { id: string; label: string; status: 'PASS' | 'FAIL' | 'NA' | 'PENDING' }
// Photo: react-native-camera hoặc expo-camera, geoTag từ expo-location
// Signature: react-native-signature-canvas
```

### HTML / Tailwind
```html
<!-- Checklist item: flex items-center gap-2 p-3 rounded-xl bg-white border -->
<!-- Checkbox accent: accent-agri-600 -->
<!-- Progress bar: w-full h-1.5 bg-slate-200 rounded-full > div bg-agri-500 -->
<!-- Panel angle display: font-mono text-2xl font-bold text-solar-600 -->
```

---

## 7. Quy Trình Làm Việc Khi Được Kích Hoạt

1. Đọc spec tại [`pages/06-High-Fidelity-UI/installation-team-screens.md`](pages/06-High-Fidelity-UI/installation-team-screens.md).
2. Xác nhận trạng thái chip đúng theo luồng (`INSTALLING` → `TESTING_PUMP` → `QA_PENDING`).
3. Kiểm tra token màu tại [`tokens/tokens.json`](tokens/tokens.json).
4. Bắt buộc có progress indicator (stepper hoặc progress bar) để người dùng biết mình đang ở bước nào.
5. Mọi ảnh chụp phải có GPS metadata — không cho phép upload ảnh không có geotag.
6. Nút "Gửi lên QA" chỉ active khi **tất cả 12 mục checklist** đã có trạng thái khác `PENDING`.

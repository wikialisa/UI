---
name: wikialisa-delivery
description: >-
  Use when working on Delivery Partner screens, flows, or code in the WikiAlisa UI project —
  covers the 18-screen delivery flow (Del/01-18), QR scan, GPS handoff, OTP verification,
  offline sync, and React Native / Flutter / HTML code conventions for this role.
---

# WikiAlisa — Delivery Partner Role Skill

Activated when building, reviewing, or documenting UI for the **Đối Tác Giao Hàng (Delivery Partner)** role.

---

## 1. Vai trò & Phạm vi

- **Người dùng**: Tài xế giao kiện bơm năng lượng mặt trời đến hộ nông dân.
- **Trạng thái chip liên quan**: `DISPATCHED` → `DELIVERED`
- **Màn hình chính thức**: `pages/06-High-Fidelity-UI/delivery-partner-screens.md`
- **Số màn hình**: 18 (Del/01 → Del/18)

---

## 2. Luồng 18 Màn Hình Chuẩn

```
Dash → Del/01 List → Del/02 Details → Del/03 GPS Nav → Del/04 Contact
  → Del/05 OTP → Del/06 Serial QR → Del/07 Photo (4 góc) → Del/08 Signature
  → Del/09 GPS Lock → Del/10 Remarks → Del/11 Confirmation
  → Del/12 Offline Sync → Del/13 Timeline → Del/14–18 Sheets/Dialogs/Errors
```

---

## 3. Quy Tắc Thiết Kế Bắt Buộc

| Quy tắc | Giá trị |
|---|---|
| Khung màn hình | 390 × 844 px |
| Touch target tối thiểu | 48 × 48 pt |
| Font size body | ≥ 14px (`typography.bodyM`) |
| Màu chính role | `color.brand.agri.500` (#1B873F) |
| Màu GPS / bản đồ | `color.brand.sky.500` (#0284C7) |
| Spacing baseline | 8pt grid (`tokens/tokens.json`) |
| Accessibility | WCAG 2.1 AA — contrast ratio ≥ 4.5:1 |

---

## 4. Components Ưu Tiên Cho Role Này

- **QR Scanner placeholder**: `Components/Upload/Upload` (camera variant)
- **GPS button**: `Components/Buttons/Button` (sky-500 background)
- **OTP input**: `Components/Inputs/OTP Input`
- **Signature pad**: `Components/Upload/Upload` (signature variant)
- **Offline banner**: `Components/Feedback/Banner` (danger)
- **Sync counter badge**: `Components/Badges/Badge` (☁️ count)
- **Delivery timeline**: `Components/Timeline/Timeline Item`
- **Confirmation dialog**: `Components/Dialogs/Dialog`

---

## 5. Code Conventions

### React Native
```tsx
// File path: src/screens/delivery/DeliveryListScreen.tsx
// Import tokens from: ../../tokens  (tokens.ts)
// Status type: 'DISPATCHED' | 'DELIVERED'
// Touch target: minHeight: 48, minWidth: 48 (always)
// GPS action: useLocation() hook, request permission before use
```

### Flutter (Dart)
```dart
// File: lib/screens/delivery/delivery_list_screen.dart
// Import: import 'package:app/tokens.dart';
// Status enum: DeliveryStatus.dispatched, DeliveryStatus.delivered
// Min tap target: SizedBox(height: 48) wrapper on all interactive elements
```

### HTML / Tailwind
```html
<!-- Role color: bg-agri-500 hover:bg-agri-600 -->
<!-- GPS button: bg-sky-500 hover:bg-sky-600 -->
<!-- Min touch: min-h-[48px] min-w-[48px] -->
<!-- Offline: bg-red-50 border-red-200 text-red-800 -->
```

---

## 6. Quy Trình Làm Việc Khi Được Kích Hoạt

1. **Đọc spec màn hình** liên quan trong [`pages/06-High-Fidelity-UI/delivery-partner-screens.md`](pages/06-High-Fidelity-UI/delivery-partner-screens.md).
2. **Kiểm tra tokens** tại [`tokens/tokens.json`](tokens/tokens.json) — không dùng màu hex cứng.
3. **Tra cứu component** tại [`pages/10-Components/README.md`](pages/10-Components/README.md).
4. **Viết code** theo platform được yêu cầu (RN / Flutter / HTML), áp dụng đúng token name.
5. **Kiểm tra** Touch Target 48pt, offline state, và contrast trước khi hoàn thành.

---

## 7. Offline-First Checklist

Mọi màn hình Delivery Partner phải vượt qua kiểm tra sau:
- [ ] Hoạt động được khi không có mạng (hiển thị Offline Banner)
- [ ] Dữ liệu form lưu cục bộ (AsyncStorage / SQLite / SharedPreferences)
- [ ] Sync counter cập nhật đúng khi có dữ liệu chờ
- [ ] Gửi dữ liệu lên server khi kết nối trở lại

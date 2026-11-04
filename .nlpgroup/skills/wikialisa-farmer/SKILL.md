---
name: wikialisa-farmer
description: >-
  Use when working on Farmer Portal screens, pump control UI, energy monitoring dashboards,
  or emergency stop flows in the WikiAlisa UI project — covers 12 screens (FAR-01..04),
  simplified UX for non-tech users, large touch targets (56pt+), and Vietnamese accessibility notes.
---

# WikiAlisa — Farmer Portal Role Skill

Activated when building, reviewing, or documenting UI for the **Chủ Hộ Nông Dân (Farmer)** role.

---

## 1. Vai trò & Phạm vi

- **Người dùng**: Chủ hộ nông dân — thường không rành công nghệ, sử dụng điện thoại Android phổ thông.
- **Trạng thái chip liên quan**: `ACTIVE_PUMPING` | `DRY_RUN_PROTECTION` | `FAULT_OVERHEAT` | `OFFLINE_SYNC_PENDING`
- **Màn hình chính thức**: `pages/06-High-Fidelity-UI/farmer-screens.md`
- **Số màn hình**: 12 (FAR-01 → FAR-04)

---

## 2. Luồng 12 Màn Hình Chuẩn

```
FAR-01-DASH (màn hình chính) → FAR-01-STATUS-CARD → FAR-01-DAILY-STATS
  → FAR-02-PUMP-ON (xác nhận bật) → FAR-02-PUMP-OFF → FAR-02-EMERGENCY-STOP
  → FAR-03-SOLAR-POWER (gauge) → FAR-03-WATER-FLOW → FAR-03-SAVINGS
  → FAR-04-REPORT-ISSUE → FAR-04-CALL-SUPPORT → FAR-04-TICKET-SENT
```

---

## 3. Quy Tắc Accessibility Đặc Biệt Cho Farmer Role

> ⚠️ **Đây là role có yêu cầu accessibility nghiêm ngặt nhất.**

| Quy tắc | Giá trị tối thiểu | Lý do |
|---|---|---|
| Touch target nút chính | **56 × 56 pt** (lớn hơn chuẩn 48pt) | Người dùng cao tuổi, đeo găng tay |
| Touch target nút khẩn cấp | **64 × 64 pt** | Tắt bơm khẩn cấp không được bỏ lỡ |
| Font size body text | ≥ **16px** | Nhiều người dùng thị lực kém |
| Font size heading | ≥ **20px** | Đọc nhanh ngoài trời nắng |
| Contrast ratio | ≥ **4.5:1** (text), ≥ **3:1** (large text) | WCAG 2.1 AA |
| Icon luôn có label | **Bắt buộc** | Không dùng icon standalone |
| Số bước tối đa | **3 bước** từ màn hình chính đến bất kỳ action nào | Ít bước = ít nhầm lẫn |
| Ngôn ngữ | **Tiếng Việt thuần** — không dùng tiếng Anh kỹ thuật | Ưu tiên từ địa phương |

---

## 4. Ngôn Ngữ Hiển Thị Cho Nông Dân

| Thuật ngữ kỹ thuật | Thay bằng |
|---|---|
| `ACTIVE_PUMPING` | "Bơm Đang Chạy" + ✅ |
| `DRY_RUN_PROTECTION` | "Giếng Gần Cạn — Bơm Đã Tắt" + ⚠️ |
| `FAULT_OVERHEAT` | "Máy Bị Nóng — Đang Tự Bảo Vệ" + 🌡️ |
| `OFFLINE_SYNC_PENDING` | "Chưa Có Mạng" + 📶 |
| `kW` (kilowatt) | "kW điện" hoặc hiển thị cùng icon mặt trời |
| `m³/h` | "khối nước / giờ" hoặc icon giọt nước |
| `Voc`, `Isc`, `Imp` | **Không hiển thị** — chỉ dùng cho QA/Tech |

---

## 5. Màn Hình Chính (FAR-01-DASH) — Layout Ưu Tiên

```
┌─────────────────────────────┐
│  Xin chào, Bác Ba Phi 👋     │  ← heading2 (28px)
│  Trạm bơm số 04             │  ← bodyM (14px), muted
├─────────────────────────────┤
│  ╔═══════════════════════╗  │
│  ║  🟢 ĐANG BƠM          ║  │  ← Status card lớn, gradient agri→solar
│  ║  18.5 m³/h  •  4.8kW  ║  │  ← displayL (40px), font-mono
│  ║  ☀️ Tiết kiệm 45.000đ  ║  │  ← bodyS (13px)
│  ╚═══════════════════════╝  │
├─────────────────────────────┤
│  [  Tắt Bơm  ] [ ⛔ Khẩn ]  │  ← h-14 (56px), grid-cols-2
└─────────────────────────────┘
```

---

## 6. Components Ưu Tiên Cho Role Này

- **Main status card**: `Components/Dashboard/KPI Widget` (gradient agri-600 → solar-500)
- **Pump ON/OFF button**: `Components/Buttons/Button` (h-14 = 56px, border-radius: full)
- **Emergency stop**: `Components/Buttons/Button` (danger, h-16 = 64px — to nhất trang)
- **Energy gauge**: `Components/Dashboard/KPI Widget` (solar variant)
- **Water flow chart**: Simple bar chart, không cần thư viện phức tạp
- **Report issue options**: `Components/Selection/Radio Button` (hình ảnh minh họa)
- **Call support**: `Components/Buttons/Button` (sky-500, icon phone)
- **Savings card**: `Components/Cards/Card` (agri-50 background)

---

## 7. Code Conventions

### React Native
```tsx
// File: src/screens/farmer/FarmerDashboardScreen.tsx
// Nguyên tắc: KHÔNG hiển thị thuật ngữ kỹ thuật (Voc, Isc, kW thuần)
// Button size: minHeight: 56, minWidth: 56 (nút thường); minHeight: 64 (emergency stop)
// Emergency stop: requires 2-step confirm dialog trước khi thực hiện
// Text: Tiếng Việt, font Inter weight 500+ cho tất cả body text
```

### Flutter (Dart)
```dart
// minimumSize: Size.fromHeight(56) — nút thường
// minimumSize: Size.fromHeight(64) — emergency stop
// Màu Emergency Stop: SolarPumpColors.semantic.danger (#DC2626)
// Luôn có Semantics widget với label tiếng Việt rõ ràng
```

### HTML / Tailwind
```html
<!-- Pump control buttons: h-14 rounded-full font-bold text-sm -->
<!-- Emergency: h-16 rounded-full bg-red-600 hover:bg-red-700 font-bold text-base -->
<!-- Status card: p-4 rounded-2xl bg-gradient-to-tr from-agri-600 to-solar-500 text-white -->
<!-- KPI number: text-3xl font-extrabold font-mono -->
```

---

## 8. Quy Trình Làm Việc Khi Được Kích Hoạt

1. Đọc spec tại [`pages/06-High-Fidelity-UI/farmer-screens.md`](pages/06-High-Fidelity-UI/farmer-screens.md).
2. **Luôn kiểm tra**: font ≥ 16px, touch target ≥ 56px, không có thuật ngữ kỹ thuật.
3. Emergency Stop: **bắt buộc** có confirmation dialog 2 bước trước khi thực hiện.
4. Mọi trạng thái lỗi phải hiển thị bằng tiếng Việt đơn giản + emoji minh họa.
5. Tối đa 3 bước từ màn hình chính → bất kỳ hành động nào.
6. Test giao diện ở độ sáng màn hình 50% (giả lập sử dụng ngoài trời nắng).

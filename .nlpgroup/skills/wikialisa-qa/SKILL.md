---
name: wikialisa-qa
description: >-
  Use when working on QA Inspector screens, electrical measurement forms, approve/reject flows,
  or defect annotation UI in the WikiAlisa UI project — covers 12 screens (QA-01..05),
  Voc/Isc/Imp measurement inputs, photo annotation, and QA_APPROVED / QA_REJECTED state transitions.
---

# WikiAlisa — QA Inspector Role Skill

Activated when building, reviewing, or documenting UI for the **Kiểm Định Viên QA (QA Inspector)** role.

---

## 1. Vai trò & Phạm vi

- **Người dùng**: Kiểm định viên chất lượng — cấp phép đưa trạm vào vận hành chính thức.
- **Trạng thái chip liên quan**: `QA_PENDING` → `QA_APPROVED` | `QA_REJECTED`
- **Màn hình chính thức**: `pages/06-High-Fidelity-UI/qa-inspector-screens.md`
- **Số màn hình**: 12 (QA-01 → QA-05)

---

## 2. Luồng 12 Màn Hình Chuẩn

```
QA-01-DASH → QA-01-QUEUE (danh sách QA_PENDING)
  → QA-02-VOC-IMP (đo điện) → QA-02-INVERTER → QA-02-PUMP-FLOW
  → QA-03-PANEL-PHOTO → QA-03-DEFECT-MARK (annotate) → QA-03-REPORT-DRAFT
  → QA-04-APPROVE ──→ QA-04-SUCCESS (ACTIVE_PUMPING)
  → QA-04-REJECT  ──→ gửi thông báo về đội lắp đặt (QA_REJECTED)
QA-05-HISTORY (lịch sử)
```

---

## 3. Ngưỡng Chấp Nhận Kỹ Thuật (Pass/Fail Thresholds)

| Thông số | Ngưỡng Pass | Chip khi fail |
|---|---|---|
| Voc (điện áp hở mạch) | ± 5% so với datasheet | `QA_REJECTED` |
| Isc (dòng ngắn mạch) | ± 5% so với datasheet | `QA_REJECTED` |
| Imp (dòng tải đỉnh) | ± 5% so với datasheet | `QA_REJECTED` |
| Lưu lượng thực tế | ≥ 95% lưu lượng thiết kế | `QA_REJECTED` |
| Hiệu suất hệ thống | ≥ 90% | Cảnh báo vàng |

Khi nhập số liệu, **tự động highlight đỏ** nếu lệch vượt ngưỡng, **highlight xanh** nếu đạt.

---

## 4. Lý Do Từ Chối Chuẩn (8 Lý Do — QA-04-REJECT)

```
1. Điện áp Voc/Isc lệch > 5%
2. Lưu lượng thực tế < 95% thiết kế
3. Khung dàn pin lắp sai góc / hướng
4. Mối nối dây điện không đạt chuẩn
5. Không có tiếp địa hoặc điện trở tiếp địa > 4Ω
6. Phát hiện hot-spot trên tấm pin
7. Ảnh nghiệm thu không đủ / không rõ
8. Khác (ghi chú tự do)
```

---

## 5. Components Ưu Tiên Cho Role Này

- **Measurement inputs**: `Components/Inputs/Text Field` (type=number, unit suffix: V / A / m³/h)
- **Pass/Fail indicator**: `Components/Chips/Status Chip` (QA_APPROVED = emerald, QA_REJECTED = red)
- **Photo annotate**: `Components/Upload/Upload` + SVG overlay với tap-to-circle
- **Approve dialog**: `Components/Dialogs/Dialog` (primary = `color.semantic.success`)
- **Reject dialog**: `Components/Dialogs/Dialog` (primary = `color.semantic.danger`)
- **Rejection reasons**: `Components/Selection/Checkbox` (multi-select)
- **KPI progress %**: `Components/Feedback/Progress` (linear, color theo pass/fail)
- **Out-of-spec toast**: `Components/Feedback/Snackbar` (danger variant)

---

## 6. Code Conventions

### React Native
```tsx
// File: src/screens/qa/MeasurementScreen.tsx
// Type: MeasurementResult = { voc: number; isc: number; imp: number; flowRate: number }
// Validation: isWithinThreshold(actual, target, tolerancePct = 5)
// Color logic: actual/target >= 0.95 ? colors.semantic.success : colors.semantic.danger
```

### HTML / Tailwind
```html
<!-- Pass value: text-emerald-600 font-bold -->
<!-- Fail value: text-red-600 font-bold animate-pulse -->
<!-- Approve button: bg-emerald-600 hover:bg-emerald-700 -->
<!-- Reject button: bg-red-600 hover:bg-red-700 -->
<!-- Measurement row: flex justify-between text-xs py-2 border-b border-slate-100 -->
```

---

## 7. Quy Trình Làm Việc Khi Được Kích Hoạt

1. Đọc spec tại [`pages/06-High-Fidelity-UI/qa-inspector-screens.md`](pages/06-High-Fidelity-UI/qa-inspector-screens.md).
2. Mọi form đo lường phải có **validation inline** (không chờ submit mới báo lỗi).
3. Nút "Phê Duyệt QA" chỉ active khi **tất cả thông số đạt ngưỡng Pass**.
4. Khi từ chối: bắt buộc chọn ít nhất 1 lý do trong 8 lý do chuẩn.
5. Sau phê duyệt: trạng thái tự động chuyển `QA_APPROVED` → `ACTIVE_PUMPING`.
6. Sau từ chối: thông báo đẩy về ứng dụng đội lắp đặt, trạng thái → `QA_REJECTED`.

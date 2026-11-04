---
name: wikialisa-service
description: >-
  Use when working on Service Technician screens, fault diagnosis UI, maintenance checklists,
  or parts replacement logs in the WikiAlisa UI project — covers 13 screens (SVC-01..05),
  inverter error codes, DRY_RUN_PROTECTION and FAULT_OVERHEAT state handling, and ticket management.
---

# WikiAlisa — Service Technician Role Skill

Activated when building, reviewing, or documenting UI for the **Kỹ Thuật Viên Dịch Vụ (Service Tech)** role.

---

## 1. Vai trò & Phạm vi

- **Người dùng**: Kỹ thuật viên xử lý sự cố và bảo trì định kỳ các trạm bơm đang hoạt động.
- **Trạng thái chip liên quan**: `FAULT_OVERHEAT` | `DRY_RUN_PROTECTION` | `MAINTENANCE_DUE` → `ACTIVE_PUMPING`
- **Màn hình chính thức**: `pages/06-High-Fidelity-UI/service-tech-screens.md`
- **Số màn hình**: 13 (SVC-01 → SVC-05)

---

## 2. Luồng 13 Màn Hình Chuẩn

```
SVC-01-DASH → SVC-01-TICKET-LIST → SVC-01-TICKET-DETAIL
  → SVC-02-FAULT-CODES (tra cứu mã lỗi)
  → SVC-02-DRY-RUN (nếu DRY_RUN_PROTECTION)
  → SVC-02-OVERHEAT (nếu FAULT_OVERHEAT)
  → SVC-03-PARTS-LOG (ghi linh kiện)
  → SVC-03-PHOTO-BEFORE → SVC-03-PHOTO-AFTER (split view)
  → SVC-03-CLOSE-TICKET
  → SVC-04-PM-CHECKLIST (bảo trì định kỳ) → SVC-04-PM-COMPLETE
  → SVC-05-OFFLINE-TICKET (làm việc ngoại tuyến)
```

---

## 3. Bảng Mã Lỗi Inverter Phổ Biến (SVC-02-FAULT-CODES)

| Mã | Mô tả | Hành động xử lý |
|---|---|---|
| E01 | Quá điện áp DC (Overvolt) | Kiểm tra số chuỗi pin, ngắt 1 chuỗi |
| E03 | Thấp điện áp DC (Undervolt) | Kiểm tra cầu chì DC, mối nối |
| E07 | Quá nhiệt inverter (Overheat) | Tăng thông gió, vệ sinh quạt |
| E09 | Lỗi tiếp địa (Ground Fault) | Đo điện trở tiếp địa, kiểm tra cách điện |
| E12 | Mất kết nối tải (Load Loss) | Kiểm tra cầu dao AC, cáp bơm |
| E15 | Khô cạn bơm (Dry-Run) | Kiểm tra mực nước giếng, reset cảm biến |
| E18 | Lỗi cảm biến nhiệt | Thay thế thermistor inverter |
| E21 | Mất đồng bộ lưới | Kiểm tra kết nối lưới điện |

---

## 4. Danh Mục Linh Kiện Có Thể Thay Thế (SVC-03-PARTS-LOG)

```
- Inverter (biến tần) — ghi số seri cũ/mới
- Cảm biến mực nước (float sensor / pressure sensor)
- Cánh bơm / impeller
- Cáp DC PV (ghi tiết diện mm², chiều dài m)
- Quạt làm mát inverter
- Cầu dao CB (ghi ampere)
- Thermistor / cảm biến nhiệt
- Tấm pin mặt trời (ghi mã module, công suất Wp)
```

---

## 5. Components Ưu Tiên Cho Role Này

- **Fault alert banner**: `Components/Feedback/Banner` (`color.semantic.danger`)
- **Fault code search**: `Components/Inputs/Text Field` (search/lookup variant)
- **Parts form**: `Components/Inputs/Text Field` + `Components/Inputs/Dropdown`
- **Before/After photo**: `Components/Upload/Upload` (x2, split-view layout)
- **Ticket status chip**: `Components/Chips/Status Chip` (`FAULT_OVERHEAT`, `DRY_RUN_PROTECTION`, `MAINTENANCE_DUE`)
- **PM checklist**: `Components/Selection/Checkbox`
- **Close ticket dialog**: `Components/Dialogs/Dialog`
- **Repair timeline**: `Components/Timeline/Timeline Item`

---

## 6. Code Conventions

### React Native
```tsx
// File: src/screens/service/FaultDiagnosisScreen.tsx
// FaultStatus: 'FAULT_OVERHEAT' | 'DRY_RUN_PROTECTION' | 'MAINTENANCE_DUE'
// ErrorCode type: { code: string; description: string; action: string; severity: 'critical' | 'warning' }
// Before/After photo: store as { before: PhotoFile; after: PhotoFile } — cả hai bắt buộc trước khi đóng phiếu
```

### HTML / Tailwind
```html
<!-- DRY_RUN banner: bg-rose-50 border-rose-200 text-rose-900 -->
<!-- OVERHEAT banner: bg-red-50 border-red-200 text-red-900 -->
<!-- MAINTENANCE_DUE banner: bg-yellow-50 border-yellow-200 text-yellow-900 -->
<!-- Step number circle: w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold -->
<!-- Close ticket button: bg-slate-800 text-white (chỉ active sau khi có ảnh before + after) -->
```

---

## 7. Quy Trình Làm Việc Khi Được Kích Hoạt

1. Đọc spec tại [`pages/06-High-Fidelity-UI/service-tech-screens.md`](pages/06-High-Fidelity-UI/service-tech-screens.md).
2. Xác định loại sự cố từ chip trạng thái: `FAULT_OVERHEAT`, `DRY_RUN_PROTECTION`, hay `MAINTENANCE_DUE`.
3. Hiển thị đúng banner cảnh báo màu sắc tương ứng theo loại sự cố.
4. Mục "Đóng Phiếu" chỉ enable sau khi có đủ: ảnh before, ảnh after, log linh kiện.
5. Sau đóng phiếu: trạng thái tự chuyển về `ACTIVE_PUMPING`.
6. Offline: tất cả form và ảnh lưu cục bộ, sync khi có mạng.

# 📁 07 — Web Admin Panel: Operations & KPI Dashboard

Bảng điều khiển quản trị **Desktop Web** dành cho cấp quản lý vận hành, quản lý kho và điều phối viên.
Thiết kế chuẩn **Desktop 1440px**, sidebar 240px, content area fluid. Hỗ trợ dark mode.

---

## Tổng Quan Layout

```text
┌──────────────────────────────────────────────────────────┐
│  Sidebar 240px  │          Main Content Area             │
│  ─────────────  │  ──────────────────────────────────    │
│  WikiAlisa Logo │  Top Header (Breadcrumb + User Menu)   │
│  Navigation     │                                        │
│  ─────────────  │  Page Content                         │
│  • Dashboard    │                                        │
│  • Operations   │                                        │
│  • Inventory    │                                        │
│  • Dispatch     │                                        │
│  • Reports      │                                        │
│  • Settings     │                                        │
└──────────────────────────────────────────────────────────┘
```

---

## Danh Sách Màn Hình (Admin Panel — Web Desktop)

### Module ADM-01: Dashboard Tổng Quan (Executive Dashboard)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `ADM-01-OVERVIEW` | Dashboard Chính | 4 KPI cards hàng đầu: tổng trạm bơm hoạt động, trạm sự cố, đơn hàng đang giao, phiếu QA chờ duyệt. Map tổng quan toàn quốc. |
| `ADM-01-MAP` | Bản Đồ Phân Bố Trạm Bơm | Interactive map (Leaflet/Mapbox) hiển thị marker màu theo trạng thái: xanh (active), vàng (maintenance_due), đỏ (fault), xám (offline). Filter theo tỉnh/huyện. |
| `ADM-01-ALERTS` | Bảng Cảnh Báo Thời Gian Thực | Live feed cảnh báo: FAULT_OVERHEAT, DRY_RUN_PROTECTION, OFFLINE_SYNC_PENDING. Timestamp, địa chỉ trạm, nút Giao Việc Ngay. |

---

### Module ADM-02: Quản Lý Vận Hành (Operations Management)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `ADM-02-PUMP-LIST` | Danh Sách Toàn Bộ Trạm Bơm | Table có phân trang (50/trang): ID trạm, địa chỉ, tên nông dân, trạng thái, ngày lắp, kỹ thuật viên phụ trách. Sort/filter đa chiều. Xuất CSV. |
| `ADM-02-PUMP-DETAIL` | Chi Tiết Trạm Bơm | Panel 3 cột: thông tin thiết bị, lịch sử trạng thái (timeline), biểu đồ sản lượng điện & nước 30 ngày. Tab chuyển giữa Tổng quan / Lịch sử / Tài liệu. |
| `ADM-02-STATUS-CHANGE` | Thay Đổi Trạng Thái Hàng Loạt | Select nhiều trạm (checkbox), dropdown chuyển trạng thái, xác nhận. Audit log ghi lại thay đổi. |

---

### Module ADM-03: Quản Lý Kho Vật Tư (Inventory Management)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `ADM-03-INVENTORY` | Tổng Quan Tồn Kho | Card tồn kho theo danh mục: Tấm pin (pcs), Inverter (units), Bơm chìm (units), Cáp DC (m), Cảm biến (pcs). Alert đỏ khi tồn kho < ngưỡng tối thiểu. |
| `ADM-03-ITEM-LIST` | Danh Sách Vật Tư Chi Tiết | Table: mã vật tư, tên, nhà cung cấp, số lượng, vị trí kho, ngày nhập cuối. Filter theo danh mục, tìm kiếm theo mã. |
| `ADM-03-STOCK-IN` | Nhập Kho | Form nhập kho: chọn vật tư, số lượng, số lô, ngày sản xuất, ghi chú. QR scanner tích hợp. |
| `ADM-03-STOCK-OUT` | Xuất Kho (Giao Cho Đội) | Form xuất kho gắn với phiếu giao vận: chọn tài xế, danh sách kiện hàng. Tự động trừ tồn kho. |

---

### Module ADM-04: Điều Phối Giao Vận (Dispatch & Logistics)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `ADM-04-DISPATCH-BOARD` | Bảng Điều Phối | Kanban board: Chờ Xử Lý → Đã Giao Việc → Đang Giao → Đã Nhận → Lắp Đặt → QA → Hoàn Thành. Kéo thả phiếu giữa các cột. |
| `ADM-04-CREATE-ORDER` | Tạo Đơn Giao Hàng Mới | Wizard 3 bước: (1) Chọn nông dân & địa chỉ, (2) Chọn thiết bị từ kho, (3) Chỉ định tài xế & ngày giao. |
| `ADM-04-DRIVER-TRACKING` | Theo Dõi Tài Xế Thời Gian Thực | Map hiển thị vị trí GPS của tài xế đang giao hàng. Estimated arrival time. Timeline chuyến giao. |

---

### Module ADM-05: KPI Dashboard (Energy & Water Analytics)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `ADM-05-ENERGY-KPI` | KPI Năng Lượng Mặt Trời | Biểu đồ tổng sản lượng điện (MWh) theo tháng. Hiệu suất trung bình hệ thống (%). So sánh kỳ trước. Export PDF/Excel. |
| `ADM-05-WATER-KPI` | KPI Lưu Lượng Nước Sạch | Tổng m³ nước bơm tháng hiện tại vs. kế hoạch. Biểu đồ theo vùng địa lý (heatmap). Top 10 trạm sản lượng cao nhất. |
| `ADM-05-SAVINGS` | Báo Cáo Tiết Kiệm Chi Phí | Bảng tổng hợp: tiền điện tiết kiệm toàn bộ nông dân (VNĐ/tháng), quy đổi CO₂ tránh phát thải (tấn). Xuất báo cáo PDF. |

---

### Module ADM-06: Quản Lý Người Dùng & Phân Quyền (User & Role Management)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `ADM-06-USERS` | Danh Sách Người Dùng | Table: tên, email, số điện thoại, vai trò (5 roles), trạng thái tài khoản, lần đăng nhập cuối. Tìm kiếm & lọc. |
| `ADM-06-INVITE` | Mời Nhân Viên Mới | Form gửi invite: email, vai trò mặc định, ghi chú. Gửi OTP kích hoạt qua SMS. |
| `ADM-06-AUDIT-LOG` | Nhật Ký Hoạt Động Hệ Thống | Table log: user, action, đối tượng (trạm bơm / vật tư / phiếu), thời gian, IP. Filter 7/30/90 ngày. |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop HD | ≥ 1440px | Sidebar cố định 240px, content fluid |
| Desktop | 1024–1439px | Sidebar cố định 200px |
| Tablet | 768–1023px | Sidebar thu gọn (icon-only 56px) |
| Mobile | < 768px | Sidebar ẩn, hamburger menu |

---

## Token & Component Mapping

| UI Element | Token / Component |
|---|---|
| KPI summary cards | `Components/Dashboard/KPI Widget` |
| Status chips bảng | `Components/Chips/Status Chip` (tất cả 14 trạng thái) |
| Data tables | Native HTML table + `color.neutral.50` header |
| Kanban cards | `Components/Cards/Card` |
| Alert live feed | `Components/Feedback/Banner` |
| Form inputs | `Components/Inputs/Text Field` + `Components/Inputs/Dropdown` |
| Create order wizard | `Components/Navigation/Stepper` |
| Activity timeline | `Components/Timeline/Timeline Item` |
| Export button | `Components/Buttons/Button` (ghost variant) |

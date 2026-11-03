# 📁 06 — High-Fidelity UI: Nhóm 3 — Kiểm Định Viên QA (QA Inspector)

Giao diện chi tiết cho **Kiểm Định Viên Chất Lượng (QA Inspector)** — nhân sự chịu trách nhiệm
nghiệm thu và cấp phép đưa trạm bơm vào vận hành chính thức.
Tất cả màn hình **390 × 844px**, lưới 8pt, Touch Target 48pt, tuân thủ WCAG 2.1 AA.

---

## Danh Sách Màn Hình (QA Inspector — 12 Màn Hình)

### Module QA-01: Tổng Quan & Hàng Đợi (Dashboard & Queue)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `QA-01-DASH` | Bảng Điều Khiển QA | Tổng hàng đợi: số phiếu cần nghiệm thu hôm nay, tuần này. KPI tỷ lệ phê duyệt. Badge cảnh báo khi có phiếu quá hạn 24h. |
| `QA-01-QUEUE` | Danh Sách Nghiệm Thu Đang Chờ | List trạng thái `QA_PENDING` có sắp xếp theo ưu tiên (Khẩn, Bình thường). Swipe-to-assign. |

---

### Module QA-02: Biên Bản Đo Kiểm Điện (Electrical Measurement)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `QA-02-VOC-IMP` | Đo Điện Áp Voc & Dòng Imp | Form nhập kết quả đo đa chuỗi: Voc (V), Isc (A), Vmp (V), Imp (A). So sánh tự động với thông số datasheet. Highlight màu đỏ nếu lệch >5%. |
| `QA-02-INVERTER` | Kiểm Tra Inverter | Nhập: tần số AC (Hz), điện áp lưới (V), hệ số công suất (PF). Xác nhận đèn trạng thái LED xanh. |
| `QA-02-PUMP-FLOW` | Kiểm Tra Lưu Lượng Thực Tế | Nhập lưu lượng đo được (m³/h) và áp suất (bar). Tự tính % so với thiết kế. Chip xanh nếu đạt ≥95%. |

---

### Module QA-03: Tài Liệu Nghiệm Thu (Inspection Documentation)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `QA-03-PANEL-PHOTO` | Chụp Ảnh Chất Lượng Tấm Pin | Camera với overlay khung chuẩn. Zoom hỗ trợ phát hiện vết nứt, bụi bẩn, mảng bóng (hot-spot). |
| `QA-03-DEFECT-MARK` | Đánh Dấu Khuyết Điểm | Ảnh preview với tính năng tap-to-annotate: vẽ khoanh đỏ vào vùng lỗi. Text label ngắn gọn. |
| `QA-03-REPORT-DRAFT` | Soạn Biên Bản Nghiệm Thu | Rich-text nhẹ: tóm tắt kết quả, nhận xét chất lượng, danh sách lỗi cần sửa (nếu có). |

---

### Module QA-04: Phê Duyệt / Từ Chối (Approve / Reject)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `QA-04-APPROVE` | Phê Duyệt QA | Dialog xác nhận: tóm tắt điểm đo, nút "Phê Duyệt & Đóng Dấu". Chuyển trạng thái sang `QA_APPROVED` → `ACTIVE_PUMPING`. |
| `QA-04-REJECT` | Từ Chối & Gửi Làm Lại | Dialog chọn lý do từ chối (checkbox 8 lý do chuẩn), trường ghi chú tự do. Gửi thông báo về đội lắp đặt. Trạng thái → `QA_REJECTED`. |
| `QA-04-SUCCESS` | Xác Nhận Thành Công | Màn hình toàn màn hình xanh: số phiếu nghiệm thu, thời gian đóng dấu, tên kiểm định viên. Nút Tiếp Theo. |

---

### Module QA-05: Lịch Sử & Thống Kê (History & Analytics)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `QA-05-HISTORY` | Lịch Sử Nghiệm Thu | Danh sách có phân trang: phiếu đã phê duyệt/từ chối, lọc theo tuần/tháng. |

---

## Token & Component Mapping

| UI Element | Token / Component |
|---|---|
| Measurement input fields | `Components/Inputs/Text Field` (type=number, unit suffix) |
| Pass/Fail result indicator | `Components/Chips/Status Chip` (`QA_APPROVED` / `QA_REJECTED`) |
| Camera annotate overlay | `Components/Upload/Upload` + SVG overlay layer |
| Approve dialog | `Components/Dialogs/Dialog` (primary action = `color.semantic.success`) |
| Reject dialog | `Components/Dialogs/Dialog` (primary action = `color.semantic.danger`) |
| Rejection reason checklist | `Components/Selection/Checkbox` |
| KPI percentage bar | `Components/Feedback/Progress` |
| Out-of-spec warning | `Components/Feedback/Snackbar` (danger variant) |

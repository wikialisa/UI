# 📁 06 — High-Fidelity UI: Nhóm 4 — Kỹ Thuật Viên Dịch Vụ (Service Technician)

Giao diện chi tiết cho **Kỹ Thuật Viên Dịch Vụ (Service Tech)** — nhân sự xử lý sự cố, bảo trì
định kỳ và thay thế linh kiện cho các trạm bơm năng lượng mặt trời đã đưa vào vận hành.
Tất cả màn hình **390 × 844px**, lưới 8pt, Touch Target 48pt.

---

## Danh Sách Màn Hình (Service Tech — 13 Màn Hình)

### Module SVC-01: Tổng Quan & Phiếu Yêu Cầu (Dashboard & Tickets)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `SVC-01-DASH` | Bảng Điều Khiển Bảo Trì | Tổng phiếu đang mở, số cảnh báo `FAULT_OVERHEAT`, số trạm `DRY_RUN_PROTECTION`. Map mini hiện vị trí các trạm sự cố. |
| `SVC-01-TICKET-LIST` | Danh Sách Phiếu Bảo Trì | List phiếu theo mức độ ưu tiên: Khẩn (đỏ) / Thông thường (xanh). Chip trạng thái `MAINTENANCE_DUE` / `FAULT_OVERHEAT`. |
| `SVC-01-TICKET-DETAIL` | Chi Tiết Phiếu Sự Cố | Thông tin trạm: địa chỉ, nông dân liên hệ, mã lỗi inverter (E01/E03/E07), timestamp cảnh báo đầu tiên. |

---

### Module SVC-02: Chẩn Đoán Sự Cố (Fault Diagnosis)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `SVC-02-FAULT-CODES` | Tra Cứu Mã Lỗi Biến Tần | Searchable list 50+ mã lỗi phổ biến (E01: Overvolt, E03: Undervolt, E07: Overheat, E12: Ground Fault). Hướng dẫn xử lý từng mã. |
| `SVC-02-DRY-RUN` | Cảnh Báo Khô Cạn Bơm | Màn hình đặc biệt khi `DRY_RUN_PROTECTION` kích hoạt: hướng dẫn kiểm tra mực nước giếng, reset cảm biến. Banner cảnh báo đỏ nổi bật. |
| `SVC-02-OVERHEAT` | Cảnh Báo Quá Nhiệt | Cảnh báo `FAULT_OVERHEAT`: nhiệt độ inverter hiện tại (°C), ngưỡng an toàn, hướng dẫn tăng thông gió, cách reset. |

---

### Module SVC-03: Nhật Ký Sửa Chữa & Thay Thế Linh Kiện

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `SVC-03-PARTS-LOG` | Nhật Ký Thay Thế Linh Kiện | Form ghi thay thế: loại linh kiện (Inverter/Cảm biến/Cánh bơm/Cáp DC), số seri cũ/mới, ngày thay, tên kỹ thuật viên. |
| `SVC-03-PHOTO-BEFORE` | Chụp Ảnh Trước Sửa Chữa | Camera với label "Trước khi sửa". Ảnh lưu kèm GPS, timestamp. Bắt buộc trước khi lưu phiếu. |
| `SVC-03-PHOTO-AFTER` | Chụp Ảnh Sau Sửa Chữa | Camera với label "Sau khi sửa". So sánh trước/sau trong cùng màn hình (split-view 50/50). |
| `SVC-03-CLOSE-TICKET` | Đóng Phiếu Sự Cố | Tóm tắt công việc, thời gian xử lý, linh kiện đã dùng, chi phí ước tính. Nút Đóng Phiếu chuyển trạng thái → `ACTIVE_PUMPING`. |

---

### Module SVC-04: Bảo Trì Định Kỳ (Preventive Maintenance)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `SVC-04-PM-CHECKLIST` | Checklist Bảo Trì Định Kỳ | 15 mục bảo trì: vệ sinh tấm pin, siết bulông khung, kiểm tra cáp, đo Voc/Imp định kỳ, mức dầu (nếu có). Trạng thái `MAINTENANCE_DUE`. |
| `SVC-04-PM-COMPLETE` | Hoàn Thành Bảo Trì | Xác nhận lịch bảo trì tiếp theo (3/6/12 tháng). Gửi báo cáo về quản trị viên. |

---

### Module SVC-05: Ngoại Tuyến

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `SVC-05-OFFLINE-TICKET` | Làm Việc Ngoại Tuyến | Tất cả thao tác điền form, chụp ảnh vẫn hoạt động. Sync khi có kết nối. Sync counter `☁️ 5`. |

---

## Token & Component Mapping

| UI Element | Token / Component |
|---|---|
| Fault alert banner | `Components/Feedback/Banner` (`color.semantic.danger`) |
| Fault code search | `Components/Inputs/Text Field` (search variant) |
| Parts replacement form | `Components/Inputs/Text Field` + `Components/Inputs/Dropdown` |
| Before/After photo | `Components/Upload/Upload` |
| Ticket status chip | `Components/Chips/Status Chip` (`FAULT_OVERHEAT`, `DRY_RUN_PROTECTION`, `MAINTENANCE_DUE`) |
| Maintenance checklist | `Components/Selection/Checkbox` |
| Close ticket dialog | `Components/Dialogs/Dialog` |
| Timeline sự cố | `Components/Timeline/Timeline Item` |

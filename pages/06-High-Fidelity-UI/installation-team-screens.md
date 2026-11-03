# 📁 06 — High-Fidelity UI: Nhóm 2 — Đội Lắp Đặt (Installation Team)

Giao diện chi tiết cho **Đội Kỹ Thuật Lắp Đặt** trạm bơm năng lượng mặt trời tại thực địa.
Tất cả màn hình được thiết kế theo chuẩn **390 × 844px**, lưới 8pt, Touch Target 48pt.

---

## Danh sách màn hình (Installation Team — 14 Màn Hình)

### Module INS-01: Bảng Điều Khiển Lắp Đặt (Dashboard)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `INS-01-DASH` | Dashboard Lắp Đặt Hôm Nay | Danh sách việc cần làm hôm nay, tổng tiến độ (3/5 trạm). Badge thông báo 1 trạm ưu tiên. |
| `INS-01-TASK-LIST` | Danh Sách Công Việc | ListView các phiếu lắp đặt: địa chỉ, công suất bơm, thời hạn hoàn thành. Pull-to-refresh khi offline. |

---

### Module INS-02: Quy Trình Lắp Đặt (Installation Workflow)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `INS-02-CHECKLIST` | Bảng Kiểm Tra Kỹ Thuật | Checklist 12 mục: góc nghiêng dàn pin 15°, hướng Nam đúng, độ sâu giếng ≥ 30m, cáp tiếp địa, kiểm tra inverter. Checkbox có trạng thái PASS/FAIL/N/A. |
| `INS-02-PANEL-ALIGN` | Canh Chỉnh Góc Tấm Pin | Overlay hỗ trợ canh 15° bằng góc la bàn. Hiển thị góc hiện tại vs. mục tiêu. Nút Lưu kết quả đo. |
| `INS-02-WELL-DEPTH` | Đo Độ Sâu Giếng | Nhập kết quả đo (m), ghi chú tình trạng giếng (đục, khô, bình thường). Lưu kèm GPS. |
| `INS-02-WIRING` | Sơ Đồ Đấu Nối Điện | Sơ đồ tĩnh màu (DC+/DC−, AC L/N/PE). Highlight bước đang thực hiện. Cảnh báo an toàn điện. |

---

### Module INS-03: Tài Liệu Thực Địa (Field Documentation)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `INS-03-PHOTO-CAPTURE` | Chụp Ảnh Nghiệm Thu (4 góc) | Camera view với hướng dẫn góc chụp (Trước, Sau, Trái, Phải). Geo-tag tự động. Thumbnail preview. |
| `INS-03-PHOTO-GALLERY` | Thư Viện Ảnh Công Trình | Grid ảnh đã chụp kèm timestamp và GPS. Swipe để xóa. Upload button với trạng thái (pending/uploading/done). |
| `INS-03-SIGNATURE` | Chữ Ký Xác Nhận Lắp Đặt | Ô ký tên điện tử của đội trưởng lắp đặt. Nút xóa và lưu. Hiển thị ngày giờ khi ký. |

---

### Module INS-04: Kiểm Tra Vận Hành Lần Đầu (First Run Test)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `INS-04-POWER-ON` | Khởi Động Hệ Thống Lần Đầu | Checklist khởi động: bật CB điện, đèn LED inverter xanh, đồng hồ Voc đọc được. Trạng thái chip `TESTING_PUMP`. |
| `INS-04-PUMP-TEST` | Kiểm Tra Bơm Lần Đầu | Hiển thị lưu lượng thực tế (m³/h), công suất tiêu thụ (kW), áp suất hệ thống (bar). So sánh với thông số thiết kế. |
| `INS-04-COMPLETE` | Hoàn Thành Lắp Đặt | Màn hình xác nhận thành công. Số phiếu công trình, ảnh đại diện, nút Gửi lên QA để chuyển trạng thái `QA_PENDING`. |

---

### Module INS-05: Ngoại Tuyến & Đồng Bộ (Offline & Sync)

| Frame ID | Tên Màn Hình | Mô Tả |
|---|---|---|
| `INS-05-OFFLINE` | Chế Độ Ngoại Tuyến | Offline Banner đỏ nhạt phía trên. Vẫn cho phép điền checklist và chụp ảnh. Sync counter `☁️ 7`. |
| `INS-05-SYNC` | Đồng Bộ Dữ Liệu | Progress bar đồng bộ từng mục (ảnh 1/4, checklist, chữ ký). Toast xanh khi hoàn tất. |

---

## Token & Component Mapping

| UI Element | Token / Component |
|---|---|
| Checklist item row | `Components/Lists/List Item` + `Components/Selection/Checkbox` |
| Status badge trạng thái | `Components/Chips/Status Chip` (`INSTALLING`, `TESTING_PUMP`, `QA_PENDING`) |
| Camera placeholder | `Components/Upload/Upload` |
| Offline banner | `Components/Feedback/Banner` |
| Progress upload | `Components/Feedback/Progress` |
| Confirmation dialog | `Components/Dialogs/Dialog` |
| Action button 48pt | `Components/Buttons/Button` (`agri-500`, `border-radius: full`) |
| GPS lock indicator | `color.brand.sky.500` + `Components/Badges/Badge` |
